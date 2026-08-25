import { mkdir, readFile, writeFile } from 'node:fs/promises';
const sql = await readFile('/tmp/supabase_ged_seed.sql', 'utf8');
const statements = sql.split(/\n\n(?=insert |commit;)/g).filter((statement) => statement.trim() !== 'begin;' && statement.trim() !== 'commit;');
const maxBytes = 420_000;
const batches = [];
let current = [];
let size = 0;
for (const statement of statements) {
  const bytes = Buffer.byteLength(statement, 'utf8') + 2;
  if (current.length && size + bytes > maxBytes) {
    batches.push(current.join('\n\n'));
    current = [];
    size = 0;
  }
  current.push(statement);
  size += bytes;
}
if (current.length) batches.push(current.join('\n\n'));
await mkdir('/tmp/supabase-ged-batches', { recursive: true });
for (let index = 0; index < batches.length; index += 1) {
  await writeFile(`/tmp/supabase-ged-batches/batch-${String(index + 1).padStart(2, '0')}.sql`, `begin;\n\n${batches[index]}\n\ncommit;`);
}
await writeFile('/tmp/supabase-ged-batches/manifest.json', JSON.stringify({ count: batches.length, files: batches.map((_, index) => `/tmp/supabase-ged-batches/batch-${String(index + 1).padStart(2, '0')}.sql`) }, null, 2));
console.log(JSON.stringify({ count: batches.length, sizes: batches.map((batch) => Buffer.byteLength(batch, 'utf8')) }));
