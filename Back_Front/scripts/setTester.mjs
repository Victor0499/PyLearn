import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function setTesterRole() {
  const username = 'Victor0499';

  // Buscar el usuario en auth_user
  const { data: user, error: findError } = await supabase
    .from('auth_user')
    .select('id, username')
    .ilike('username', username)
    .single();

  if (findError || !user) {
    console.error('❌ Usuario no encontrado:', findError?.message);
    process.exit(1);
  }

  console.log(`✅ Usuario encontrado: ${user.username} (id: ${user.id})`);

  // Ver perfil actual
  const { data: profile } = await supabase
    .from('api_userprofile')
    .select('*')
    .eq('user_id', user.id)
    .single();

  console.log('Perfil actual:', profile);

  // Cambiar rol a tester en api_userprofile
  const { error: updateError } = await supabase
    .from('api_userprofile')
    .update({ role: 'tester' })
    .eq('user_id', user.id);

  if (updateError) {
    console.error('❌ Error al actualizar rol:', updateError.message);
    process.exit(1);
  }

  console.log(`🎉 Rol de "${user.username}" actualizado a "tester" exitosamente.`);
  console.log('   → Verá todos los módulos desbloqueados.');
  console.log('   → Tendrá experiencia de estudiante (sin panel admin).');
  console.log('   → Los ejercicios aparecerán sin resolver.');
}

setTesterRole();
