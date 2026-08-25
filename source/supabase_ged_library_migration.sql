create extension if not exists pgcrypto;

create table if not exists public.ged_books (
  id text primary key,
  title text not null,
  edition text,
  source_pages integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ged_workbook_sources (
  id text primary key,
  book_id text references public.ged_books(id) on delete set null,
  title text not null,
  short_title text not null,
  page_label text not null,
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ged_question_groups (
  id text primary key,
  source_id text references public.ged_workbook_sources(id) on delete cascade,
  section text not null,
  topic text,
  question_start integer not null,
  question_end integer not null,
  range_label text not null,
  context_type text not null,
  marker text,
  context text,
  source_pages integer[] not null default '{}',
  visual_page integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ged_questions (
  id text primary key,
  group_id text not null references public.ged_question_groups(id) on delete cascade,
  number integer not null,
  section text not null,
  topic text,
  reference text,
  prompt text not null,
  choices jsonb not null default '[]'::jsonb,
  correct_label text,
  answer_line text,
  explanation text,
  source_page integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_id, number)
);

create table if not exists public.ged_assets (
  id text primary key,
  asset_type text not null,
  book_id text references public.ged_books(id) on delete set null,
  source_id text references public.ged_workbook_sources(id) on delete set null,
  page_number integer,
  url text not null,
  alt_text text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ged_branding (
  key text primary key,
  value text not null,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists ged_question_groups_source_idx on public.ged_question_groups(source_id);
create index if not exists ged_questions_group_idx on public.ged_questions(group_id);
create index if not exists ged_assets_source_page_idx on public.ged_assets(source_id, page_number);

alter table public.ged_books enable row level security;
alter table public.ged_workbook_sources enable row level security;
alter table public.ged_question_groups enable row level security;
alter table public.ged_questions enable row level security;
alter table public.ged_assets enable row level security;
alter table public.ged_branding enable row level security;

do $$ begin
  create policy "GED books are publicly readable" on public.ged_books for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "GED workbooks are publicly readable" on public.ged_workbook_sources for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "GED groups are publicly readable" on public.ged_question_groups for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "GED questions are publicly readable" on public.ged_questions for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "GED assets are publicly readable" on public.ged_assets for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "GED branding is publicly readable" on public.ged_branding for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;
