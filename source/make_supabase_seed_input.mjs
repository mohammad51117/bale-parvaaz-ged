import { readFile, writeFile } from 'node:fs/promises';
const query = await readFile('/tmp/supabase_ged_seed.sql', 'utf8');
await writeFile('/tmp/supabase_ged_seed_input.json', JSON.stringify({ project_id: 'rmglelcdiumvwpiurtjj', query }));
console.log(`Prepared ${query.length} SQL characters`);
