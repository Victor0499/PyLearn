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

// Restore the output_check values that were incorrectly trimmed.
// These exercises intentionally have leading spaces in their expected output:
//   2201 - rstrip() exercise: original string has leading spaces, rstrip only removes trailing
//   2703 - rjust() exercise: right-justification adds leading spaces intentionally
//
// For exercise 4803, the trailing \n removal was correct (Python's print adds it).
const RESTORES = {
  2201: '  Python es genial',   // rstrip() keeps leading spaces - was incorrectly trimmed
  2703: '      $99.99',         // rjust() adds leading padding - was incorrectly trimmed
};

async function main() {
  console.log('Restaurando output_check incorrectamente modificados...\n');

  let updated = 0;
  let errors = 0;

  for (const [idStr, correctOutputCheck] of Object.entries(RESTORES)) {
    const id = parseInt(idStr);

    const { error } = await supabase
      .from('exercises')
      .update({ output_check: correctOutputCheck })
      .eq('id', id);

    if (error) {
      console.error(`❌ Error al restaurar ejercicio ${id}:`, error.message);
      errors++;
    } else {
      console.log(`✅ Ejercicio ${id} restaurado a: '${correctOutputCheck}'`);
      updated++;
    }
  }

  console.log(`\nResultado: ${updated} restaurados, ${errors} errores`);
}

main();
