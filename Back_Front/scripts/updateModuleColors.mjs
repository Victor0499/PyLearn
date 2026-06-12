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

// Gradientes diagonales: del color original a una versión más oscura y profunda
const moduleColors = [
  { id: 1, color: 'linear-gradient(135deg, #9AE630, #4A8A0A)' }, // Lima → Verde oscuro
  { id: 2, color: 'linear-gradient(135deg, #7C86FF, #3B2FCC)' }, // Lavanda → Índigo profundo
  { id: 3, color: 'linear-gradient(135deg, #2B7FFF, #003DB8)' }, // Azul → Azul marino
  { id: 4, color: 'linear-gradient(135deg, #FFDF20, #E07800)' }, // Amarillo → Naranja dorado
  { id: 5, color: 'linear-gradient(135deg, #E12AFB, #7B00CC)' }, // Magenta → Púrpura profundo
];

async function updateColors() {
  for (const mc of moduleColors) {
    const { error } = await supabase
      .from('modules')
      .update({ color_gradient: mc.color })
      .eq('id', mc.id);

    if (error) {
      console.log(`❌ Error en módulo ${mc.id}: ${error.message}`);
    } else {
      console.log(`✅ Módulo ${mc.id} actualizado con gradiente.`);
    }
  }
  console.log('\n🎉 Gradientes aplicados.');
}

updateColors();
