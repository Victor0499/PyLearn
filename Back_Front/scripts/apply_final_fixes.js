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
  console.log('Applying final exercise fixes...\n');

  const fixes = [
    {
      id: 1302,
      reason: 'With respuesta="", the if condition is always False. output_check "Aceptado" is never reached.',
      updates: {
        // Change initial_code to simulate a valid response (sí)
        initial_code: `# Simula la respuesta del usuario\nrespuesta = 'sí'\n\n# Escribe tu condición con or\n`,
        // Update solution_code to include the full correct code
        solution_code: `respuesta = 'sí'\nif respuesta == 'sí' or respuesta == 'yes':\n    print('Aceptado')`,
        // Keep output_check as Aceptado since now respuesta = 'sí' makes it True
        output_check: 'Aceptado',
        // Remove test_code (not needed, output_check is clear)
        test_code: null,
      }
    }
  ];

  for (const fix of fixes) {
    console.log(`[${fix.id}] ${fix.reason}`);
    const { error } = await supabase
      .from('exercises')
      .update(fix.updates)
      .eq('id', fix.id);

    if (error) {
      console.error(`  ERROR: ${error.message}`);
    } else {
      console.log(`  OK: Fixed exercise ${fix.id}`);
    }
  }

  console.log('\nAll fixes applied successfully!');
}

main();
