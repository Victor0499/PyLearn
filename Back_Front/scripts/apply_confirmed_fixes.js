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

const CONFIRMED_FIXES = [
  {
    id: 2503,
    field: 'output_check',
    // Bug: swapcase of "eL bLoQuEo De MaYuScUlAs Es UnA PeSaDiLlA!" is wrong in DB
    // Correct: "El BlOqUeO dE mAyUsCuLaS eS uNa pEsAdIlLa!"
    // DB had: "El BlOqUeO dE mAyUsClAs eS uNa pEsAdIlLa!" (missing 'Cu' in mAyUsCuLaS)
    value: 'El BlOqUeO dE mAyUsCuLaS eS uNa pEsAdIlLa!',
    reason: 'Typo in swapcase result: "mAyUsClAs" should be "mAyUsCuLaS"',
  },
  {
    id: 2801,
    field: 'output_check',
    // Bug: "programacion en python".count('o') = 2 (not 3)
    // The 'o' in "programación" has only 1 regular 'o'; 'ó' != 'o'
    // Plus 'o' in "python" = 1. Total = 2.
    value: '2',
    reason: '"programación en python".count("o") == 2, not 3. The ó is not counted as o.',
  },
];

async function main() {
  console.log('Applying confirmed output_check fixes...\n');

  for (const fix of CONFIRMED_FIXES) {
    console.log(`Fixing exercise ${fix.id}: ${fix.reason}`);
    const { error } = await supabase
      .from('exercises')
      .update({ [fix.field]: fix.value })
      .eq('id', fix.id);

    if (error) {
      console.error(`  ERROR: ${error.message}`);
    } else {
      console.log(`  OK: Set ${fix.field} = "${fix.value}"`);
    }
  }

  console.log('\nDone.');
}

main();
