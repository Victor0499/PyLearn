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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan variables de entorno");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchExercises() {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .order('lesson_id', { ascending: true })
    .order('order_index', { ascending: true });

  if (error) {
    console.error("Error fetching exercises:", error);
    return;
  }

  fs.writeFileSync('exercises_dump.json', JSON.stringify(data, null, 2));
  console.log(`Guardados ${data.length} ejercicios en exercises_dump.json`);
}

fetchExercises();
