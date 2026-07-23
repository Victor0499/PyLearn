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

// Clean, correct test_codes for the indentation exercises.
// Uses a Python helper approach: check if ANY line (after the first) starts with spaces or tab.
// This is more robust than checking for literal '    print(' in the source string.
const FIXES = {
  // Exercise 9202: "Creando un bloque"
  // The user must indent print('Acceso concedido') inside the if True: block.
  // We check that the source contains an indented print( - either 4 spaces or a tab.
  9202: `indented = any(line.startswith('    ') or line.startswith('\\t') for line in __source__.split('\\n') if line.strip().startswith('print('))
assert indented, 'Debes indentar el print dentro del if (pon 4 espacios o un tab antes de print)'`,

  // Exercise 9203: "Bloque múltiple"  
  // The user must indent all 3 print('Paso X') lines inside the if True: block.
  9203: `indented_prints = [line for line in __source__.split('\\n') if line.strip().startswith("print('Paso") and (line.startswith('    ') or line.startswith('\\t'))]
assert len(indented_prints) >= 3, 'Las 3 instrucciones deben estar indentadas igual (con 4 espacios o tab)'`,
};

async function main() {
  console.log('Corrigiendo test_code de ejercicios de indentacion...\n');

  for (const [idStr, newTestCode] of Object.entries(FIXES)) {
    const id = parseInt(idStr);

    console.log(`Actualizando ejercicio ${id}...`);
    console.log('Nuevo test_code:\n' + newTestCode + '\n');

    const { error } = await supabase
      .from('exercises')
      .update({ test_code: newTestCode })
      .eq('id', id);

    if (error) {
      console.error(`❌ Error al actualizar ejercicio ${id}:`, error.message);
    } else {
      console.log(`✅ Ejercicio ${id} corregido exitosamente\n`);
    }
  }
}

main();
