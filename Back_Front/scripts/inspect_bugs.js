const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length > 0 && !key.startsWith('#')) {
    acc[key.trim()] = val.join('=').trim().replace(/^"|"$/g, '');
  }
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  // Check these specific exercises for bugs
  const ids = [2503, 2801, 8202];
  const { data, error } = await supabase
    .from('exercises')
    .select('id, lesson_id, title, initial_code, solution_code, test_code, output_check')
    .in('id', ids);

  if (error) { console.error(error); return; }

  data.sort((a, b) => a.id - b.id);
  data.forEach(ex => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`[${ex.id}] L${ex.lesson_id} - ${ex.title}`);
    console.log(`\n--- initial_code ---\n${ex.initial_code}`);
    console.log(`\n--- solution_code ---\n${ex.solution_code}`);
    console.log(`\n--- output_check ---\n${JSON.stringify(ex.output_check)}`);
    console.log(`\n--- test_code ---\n${ex.test_code}`);
  });
}

main();
