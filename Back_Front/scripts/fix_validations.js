const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// --- Parse env ---
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length > 0 && !key.startsWith('#')) {
    acc[key.trim()] = val.join('=').trim().replace(/^"|"$/g, '');
  }
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

// --- Helper: normalizes a test_code string to fix common strict patterns ---
function fixTestCode(testCode, exerciseId) {
  if (!testCode) return testCode;

  let fixed = testCode;

  // 1. Fix __source__ string comparison for quoted strings:
  //    assert 'pc.login("1234")' in __source__ or "pc.login('1234')" in __source__
  //    Pattern: 'someMethod("value")' in __source__ -> also allow single quotes variant
  //    We make these checks use a helper that checks both quote styles.
  
  // 2. Fix indentation checks that require exactly 4 spaces.
  //    assert '    print(' in __source__ -> allow tab too
  fixed = fixed.replace(
    /assert '    print\(/g,
    "assert ('    print(' in __source__ or '\\tprint('"
  );
  fixed = fixed.replace(
    /assert __source__\.count\('    print\('([^)]*)\) == (\d+)/g,
    (match, content, count) =>
      `assert __source__.count('    print(${content}) + __source__.count('\\tprint(${content}) == ${count}`
  );

  // 3. Fix the 3-Paso indentation test (Lección 8.5)
  if (fixed.includes("count('    print('Paso')") || fixed.includes("count('\\tprint('Paso')")) {
    fixed = `assert (__source__.count("    print('Paso") + __source__.count("\\tprint('Paso")) >= 3, 'Las 3 instrucciones deben estar indentadas igual'`;
  }

  // 4. Fix the overly strict "no leading spaces" assertion from Lección 8.5
  //    assert '  mensaje' not in __source__ and '    print' not in __source__
  //    This is too strict because correct code might have indentation. 
  //    Only applies to the lesson about removing indentation - let's check by context.
  // (We'll leave this one as-is since it's teaching a specific concept)

  // 5. Fix: function defs with or without space before colon
  //    Most already handle 'def foo(self):' or 'def foo(self) :' - looks fine
  
  // 6. Fix string value comparisons that check with specific quotes:
  //    assert curso == 'Python' -> allow both 'Python' and "Python"
  //    This runs in the Python runtime so it's fine - variable values don't depend on quotes.
  //    These assertions are OK.

  // 7. Fix: 'pc.login("1234")' in __source__ or "pc.login('1234')" in __source__
  //    Pattern already handled by DB entries that use 'or' - looks OK.

  return fixed;
}

// --- Fix output_check: trim trailing/leading whitespace/newlines ---
function fixOutputCheck(outputCheck) {
  if (!outputCheck) return outputCheck;
  return outputCheck.trim();
}

// --- Main ---
async function main() {
  console.log('Cargando ejercicios desde Supabase...');
  const { data: exercises, error } = await supabase
    .from('exercises')
    .select('id, test_code, output_check, title')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error al cargar ejercicios:', error);
    return;
  }

  console.log(`Total de ejercicios: ${exercises.length}`);

  let updated = 0;
  let errors = 0;
  const changes = [];

  for (const ex of exercises) {
    const newTestCode = fixTestCode(ex.test_code, ex.id);
    const newOutputCheck = fixOutputCheck(ex.output_check);

    const testChanged = newTestCode !== ex.test_code;
    const outputChanged = newOutputCheck !== ex.output_check;

    if (testChanged || outputChanged) {
      const updatePayload = {};
      if (testChanged) updatePayload.test_code = newTestCode;
      if (outputChanged) updatePayload.output_check = newOutputCheck;

      const { error: updateError } = await supabase
        .from('exercises')
        .update(updatePayload)
        .eq('id', ex.id);

      if (updateError) {
        console.error(`Error al actualizar ejercicio ${ex.id} (${ex.title}):`, updateError.message);
        errors++;
      } else {
        changes.push({
          id: ex.id,
          title: ex.title,
          testChanged,
          outputChanged,
          oldOutputCheck: ex.output_check,
          newOutputCheck,
        });
        updated++;
      }
    }
  }

  console.log(`\n✅ Actualizados: ${updated} ejercicios`);
  console.log(`❌ Errores: ${errors}`);
  console.log('\nCambios realizados:');
  changes.forEach(c => {
    const parts = [];
    if (c.testChanged) parts.push('test_code');
    if (c.outputChanged) parts.push(`output_check: '${c.oldOutputCheck}' -> '${c.newOutputCheck}'`);
    console.log(`  [${c.id}] ${c.title}: ${parts.join(' | ')}`);
  });
}

main();
