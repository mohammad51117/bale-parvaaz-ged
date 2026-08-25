import { readFile, writeFile } from 'node:fs/promises';
const batchPath = process.argv[2];
const outputPath = process.argv[3];
if (!batchPath || !outputPath) throw new Error('Usage: make_supabase_batch_input.mjs <batch.sql> <input.json>');
const query = await readFile(batchPath, 'utf8');
await writeFile(outputPath, JSON.stringify({ project_id: 'rmglelcdiumvwpiurtjj', query }));
console.log(`Prepared ${query.length} SQL characters from ${batchPath}`);
