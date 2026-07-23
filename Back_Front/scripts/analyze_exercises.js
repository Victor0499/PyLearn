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

async function main() {
  const { data: exercises, error } = await supabase
    .from('exercises')
    .select('id, lesson_id, title, test_code, output_check, solution_code, initial_code, hint')
    .order('lesson_id', { ascending: true })
    .order('order_index', { ascending: true });

  if (error) { console.error(error); return; }

  const problems = [];

  for (const ex of exercises) {
    const issues = [];

    // Check 1: output_check that has trailing newline or spaces
    if (ex.output_check && ex.output_check !== ex.output_check.trim()) {
      issues.push(`output_check has leading/trailing whitespace: '${ex.output_check}'`);
    }

    // Check 2: test_code uses __source__ with very rigid quote checks
    if (ex.test_code && ex.test_code.includes('__source__')) {
      // Check for single-quote-only string matchers that should also accept double quotes
      const quoteOnlyMatches = ex.test_code.match(/assert '.*?(?:"|').*?' in __source__/g);
      if (quoteOnlyMatches) {
        // These check for a specific quote style in the code - could fail if user uses different quotes
        const problematic = quoteOnlyMatches.filter(m => 
          // Only flag ones that check string literals with quotes inside
          (m.includes('"') || m.includes("'")) && !m.includes(' or ')
        );
        if (problematic.length > 0) {
          issues.push(`Rigid quote check in __source__: ${problematic[0]}`);
        }
      }
    }

    // Check 3: test_code asserts exact string with == for string variables  
    if (ex.test_code) {
      // Check for assertions like: assert var == 'SomeValue', "message"
      // These are fine since the variable value doesn't depend on how user wrote code
    }

    // Check 4: solution_code doesn't match test_code (self-consistency test)
    if (ex.solution_code && ex.test_code) {
      // Flag exercises where solution has print statements but test checks output_check
      if (!ex.output_check && !ex.test_code && ex.solution_code.includes('print(')) {
        issues.push('Has print but no validation method');
      }
    }

    // Check 5: output_check exercises - is the expected output matching solution?
    if (ex.output_check && ex.solution_code) {
      // The solution should produce the output_check when run
      // We can't run Python here, but we can check for obvious mismatches
      // e.g. solution prints 'Hola' but output_check is 'hello'
    }

    // Check 6: test_code that checks for specific indentation (problematic)
    if (ex.test_code && (ex.test_code.includes("count('    print") || ex.test_code.includes("'    print('"))) {
      issues.push('Checks exact 4-space indentation which may reject tabs');
    }

    // Check 7: instructions asking for specific output but no validation
    if (!ex.output_check && !ex.test_code && ex.solution_code && ex.solution_code.includes('print(')) {
      issues.push('No validation despite having print statements in solution');
    }

    if (issues.length > 0) {
      problems.push({
        id: ex.id,
        lesson_id: ex.lesson_id,
        title: ex.title,
        issues,
        test_code: ex.test_code ? ex.test_code.substring(0, 200) : null,
        output_check: ex.output_check,
      });
    }
  }

  console.log(`\n⚠️  Ejercicios con posibles problemas: ${problems.length} / ${exercises.length}\n`);
  
  // Group by lesson
  const byLesson = {};
  problems.forEach(p => {
    if (!byLesson[p.lesson_id]) byLesson[p.lesson_id] = [];
    byLesson[p.lesson_id].push(p);
  });

  Object.keys(byLesson).sort((a,b) => a-b).forEach(lid => {
    const group = byLesson[lid];
    console.log(`\n📚 Lección ${lid} (${group.length} problemas):`);
    group.forEach(p => {
      console.log(`  [${p.id}] ${p.title}`);
      p.issues.forEach(i => console.log(`    ⚠ ${i}`));
    });
  });

  fs.writeFileSync('exercises_problems.json', JSON.stringify(problems, null, 2));
  console.log('\n✅ Reporte guardado en exercises_problems.json');
}

main();
