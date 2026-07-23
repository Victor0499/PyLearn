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
  const ids = [9202, 9203];
  for (const id of ids) {
    const { data, error } = await supabase
      .from('exercises')
      .select('id, title, test_code, initial_code')
      .eq('id', id)
      .single();

    if (error) { console.error('Error:', error); continue; }
    
    console.log(`\n=== EXERCISE ${id}: ${data.title} ===`);
    console.log('\n--- initial_code ---');
    console.log(JSON.stringify(data.initial_code));
    console.log('\n--- test_code ---');
    console.log(JSON.stringify(data.test_code));
    console.log('\n--- test_code (raw) ---');
    console.log(data.test_code);
  }
}

main();
