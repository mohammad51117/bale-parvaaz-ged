import { useEffect, useState } from "react";

export type PersistentGroup = {
  id: string;
  section: string;
  topic: string;
  questionStart: number;
  questionEnd: number;
  rangeLabel: string;
  contextType: string;
  marker: string;
  context: string;
  sourcePages: number[];
  visualPage?: number | null;
  questions: { number: number; text: string }[];
};

export type PersistentQuestion = {
  id: string;
  number: number;
  groupId: string;
  section: string;
  topic: string;
  reference: string;
  prompt: string;
  choices: { label: string; text: string }[];
  correctLabel: string | null;
  answerLine: string;
  explanation: string;
  sourcePage: number;
};

export type PersistentWorkbookSource = {
  id: string;
  title: string;
  shortTitle: string;
  pageLabel: string;
  note: string;
};

export type PersistentStudyLibrary = {
  groups: PersistentGroup[];
  questions: PersistentQuestion[];
  sourcesById: Record<string, PersistentWorkbookSource>;
  sourcePageUrls: Record<string, string>;
  branding: Record<string, string>;
  counts: { books: number; sources: number; groups: number; questions: number; assets: number };
};

type SupabaseRow = Record<string, unknown>;

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "");
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

async function selectRows(table: string, columns: string) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [] as SupabaseRow[];
  const rows: SupabaseRow[] = [];
  for (let offset = 0; ; offset += 1000) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(columns)}&limit=1000&offset=${offset}`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!response.ok) throw new Error(`Supabase ${table} request failed (${response.status})`);
    const page = (await response.json()) as SupabaseRow[];
    rows.push(...page);
    if (page.length < 1000) return rows;
  }
}

const asString = (value: unknown) => typeof value === "string" ? value : "";
const asNumber = (value: unknown, fallback = 0) => typeof value === "number" ? value : Number(value ?? fallback) || fallback;
const asChoices = (value: unknown) => Array.isArray(value) ? value.map((choice) => ({ label: asString((choice as SupabaseRow).label), text: asString((choice as SupabaseRow).text) })) : [];

export async function loadPersistentStudyLibrary(): Promise<PersistentStudyLibrary | null> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;
  const [books, sources, groups, questions, assets, branding] = await Promise.all([
    selectRows("ged_books", "id"),
    selectRows("ged_workbook_sources", "id,book_id,title,short_title,page_label,note"),
    selectRows("ged_question_groups", "id,source_id,section,topic,question_start,question_end,range_label,context_type,marker,context,source_pages,visual_page"),
    selectRows("ged_questions", "id,group_id,number,section,topic,reference,prompt,choices,correct_label,answer_line,explanation,source_page"),
    selectRows("ged_assets", "id,asset_type,source_id,page_number,url,alt_text"),
    selectRows("ged_branding", "key,value"),
  ]);

  const questionsByGroup = new Map<string, PersistentQuestion[]>();
  const normalizedQuestions = questions.map((row) => {
    const question: PersistentQuestion = {
      id: asString(row.id), number: asNumber(row.number), groupId: asString(row.group_id), section: asString(row.section), topic: asString(row.topic) || "General practice", reference: asString(row.reference), prompt: asString(row.prompt), choices: asChoices(row.choices), correctLabel: row.correct_label == null ? null : asString(row.correct_label), answerLine: asString(row.answer_line), explanation: asString(row.explanation), sourcePage: asNumber(row.source_page),
    };
    const list = questionsByGroup.get(question.groupId) ?? [];
    list.push(question);
    questionsByGroup.set(question.groupId, list);
    return question;
  });

  const normalizedGroups = groups.map((row) => {
    const groupId = asString(row.id);
    const groupQuestions = (questionsByGroup.get(groupId) ?? []).sort((a, b) => a.number - b.number);
    return {
      id: groupId, section: asString(row.section), topic: asString(row.topic) || groupQuestions[0]?.topic || "General practice", questionStart: asNumber(row.question_start), questionEnd: asNumber(row.question_end), rangeLabel: asString(row.range_label), contextType: asString(row.context_type), marker: asString(row.marker), context: asString(row.context), sourcePages: Array.isArray(row.source_pages) ? row.source_pages.map((page) => asNumber(page)).filter(Boolean) : [], visualPage: row.visual_page == null ? null : asNumber(row.visual_page), questions: groupQuestions.map((question) => ({ number: question.number, text: question.prompt })),
    } satisfies PersistentGroup;
  });

  const sourcesById: Record<string, PersistentWorkbookSource> = {};
  for (const row of sources) sourcesById[asString(row.id)] = { id: asString(row.id), title: asString(row.title), shortTitle: asString(row.short_title), pageLabel: asString(row.page_label), note: asString(row.note) };
  const sourcePageUrls: Record<string, string> = {};
  for (const row of assets) if (asString(row.asset_type) === "source_page" && row.source_id != null && row.page_number != null) sourcePageUrls[`${asString(row.source_id)}:${asNumber(row.page_number)}`] = asString(row.url);
  const brandingByKey: Record<string, string> = {};
  for (const row of branding) brandingByKey[asString(row.key)] = asString(row.value);

  return { groups: normalizedGroups, questions: normalizedQuestions, sourcesById, sourcePageUrls, branding: brandingByKey, counts: { books: books.length, sources: sources.length, groups: groups.length, questions: questions.length, assets: assets.length } };
}

export function usePersistentStudyLibrary() {
  const [data, setData] = useState<PersistentStudyLibrary | null>(null);
  const [loading, setLoading] = useState(Boolean(SUPABASE_URL && SUPABASE_KEY));
  useEffect(() => {
    let active = true;
    if (!SUPABASE_URL || !SUPABASE_KEY) return () => { active = false; };
    loadPersistentStudyLibrary().then((library) => { if (active) setData(library); }).catch((error) => console.warn("[Supabase] Falling back to bundled study data:", error)).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return { data, loading };
}
