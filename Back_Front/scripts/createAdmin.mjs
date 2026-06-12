import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars manually since we are outside Next.js context
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
});

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_SERVICE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Faltan variables de entorno de Supabase en .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function hashPassword(password) {
  const iterations = 870000;
  const salt = crypto.randomBytes(12).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 22);
  const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const hash = derivedKey.toString('base64');
  return `pbkdf2_sha256$${iterations}$${salt}$${hash}`;
}

async function createAdmin() {
  const username = 'admin_01pl';
  const email = 'admin01pl@pylearn.com';
  const password = 'admin94413210';

  console.log(`Creando administrador: ${username}...`);

  const hashedPassword = hashPassword(password);

  // 1. Insert into auth_user
  const { data: user, error: userError } = await supabaseAdmin
    .from('auth_user')
    .insert([
      {
        username,
        email,
        password: hashedPassword,
        first_name: '',
        last_name: '',
        is_superuser: true,
        is_staff: true,
        is_active: true,
        date_joined: new Date().toISOString()
      }
    ])
    .select('id')
    .single();

  if (userError) {
    console.error("Error creando auth_user:", userError.message);
    process.exit(1);
  }

  // 2. Insert into api_userprofile
  const { error: profileError } = await supabaseAdmin
    .from('api_userprofile')
    .insert([
      {
        user_id: user.id,
        role: 'admin'
      }
    ]);

  if (profileError) {
    console.error("Error creando api_userprofile:", profileError.message);
    process.exit(1);
  }

  console.log("✅ ¡Administrador creado con éxito!");
  console.log(`Usuario: ${username}`);
  console.log(`Email: ${email}`);
  console.log(`Contraseña: ${password}`);
}

createAdmin();
