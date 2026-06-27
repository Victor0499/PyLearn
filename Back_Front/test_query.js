const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log('Buscando username tonyhornett45...');
  const { data, error } = await supabase.from('auth_user').select('*').ilike('username', 'tonyhornett45');
  console.log('Result ilike:', data, error);
  
  const { data: d2, error: e2 } = await supabase.from('auth_user').select('*').eq('username', 'tonyhornett45');
  console.log('Result eq:', d2, e2);
  
  const { data: d3, error: e3 } = await supabase.from('auth_user').select('*');
  console.log('All users:', d3.map(u => u.username));
}
run();
