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

// Manual fixes for specific exercises with confirmed bugs
const SPECIFIC_FIXES = {
  // Exercise 8401: Bug - operator precedence. 
  // Original: assert 'open(' in __source__ and '"w"' in __source__ or "'w'" in __source__
  // This evaluates as: (A and B) or C, so if user writes 'w' (single quotes) it always passes
  // regardless of whether open() is there. Fix by adding parentheses.
  8401: `assert 'open(' in __source__ and ('"w"' in __source__ or "'w'" in __source__), 'Debes abrir el archivo en modo w'\nassert 'json.dump(config' in __source__, 'Usa json.dump() pasando config y f'`,

  // Exercise 9203: count of 'Paso with single quotes won't match "Paso" with double quotes
  // Fix: also check for double-quoted version and sum both counts
  9203: `assert (__source__.count("    print('Paso") + __source__.count('    print("Paso') + __source__.count("\\tprint('Paso") + __source__.count('\\tprint("Paso')) >= 3, 'Las 3 instrucciones deben estar indentadas igual'`,
};

async function main() {
  console.log('Aplicando correcciones específicas a ejercicios problemáticos...\n');
  
  let updated = 0;
  let errors = 0;

  for (const [idStr, newTestCode] of Object.entries(SPECIFIC_FIXES)) {
    const id = parseInt(idStr);
    
    const { error } = await supabase
      .from('exercises')
      .update({ test_code: newTestCode })
      .eq('id', id);

    if (error) {
      console.error(`❌ Error al actualizar ejercicio ${id}:`, error.message);
      errors++;
    } else {
      console.log(`✅ Ejercicio ${id} actualizado correctamente`);
      updated++;
    }
  }

  console.log(`\nResultado: ${updated} actualizados, ${errors} errores`);
}

main();
