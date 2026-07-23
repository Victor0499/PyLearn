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
  console.log('Fixing literal \\n in exercise 7102...');

  // The incorrect literal string
  const wrongOutput = '¡Peligro, sistema inestable!\\n¡Peligro, sistema inestable!\\n¡Peligro, sistema inestable!';
  
  // The correct string with actual newlines
  const correctOutput = '¡Peligro, sistema inestable!\n¡Peligro, sistema inestable!\n¡Peligro, sistema inestable!';

  const { error } = await supabase
    .from('exercises')
    .update({ output_check: correctOutput })
    .eq('id', 7102);

  if (error) {
    console.error(`ERROR: ${error.message}`);
  } else {
    console.log(`OK: Fixed exercise 7102`);
  }
}

main();
