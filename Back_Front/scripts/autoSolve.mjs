import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Cargar variables de entorno manualmente desde .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
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

const GEMINI_API_KEY = process.argv[2];
if (!GEMINI_API_KEY) {
  console.error("Por favor, pasa tu API key como argumento: node scripts/autoSolve.mjs TU_API_KEY");
  process.exit(1);
}

async function getSolutionFromGemini(exercise, retries = 5) {
  const prompt = `Eres un profesor de programación en Python básico.
Tu tarea es escribir EXCLUSIVAMENTE el código Python correcto y funcional que resuelve el siguiente ejercicio interactivo.
IMPORTANTE:
- SOLO devuelve el código Python.
- NO uses formato de markdown (no escribas \`\`\`python ni \`\`\`).
- El código debe empezar directamente en la primera línea.
- Si hay "Código inicial", debes continuar o corregir a partir de él, pero tu respuesta debe ser el código COMPLETO final que el alumno ejecutaría.
- Tu código debe cumplir las reglas de validación dadas.

--- DATOS DEL EJERCICIO ---
Título: ${exercise.title}
Instrucciones: ${exercise.instructions}
Código Inicial (Plantilla):
${exercise.initial_code || "(vacío)"}

Validación (Salida esperada de consola / Regex): ${exercise.output_check || "No hay validación de consola"}
Validación (Código Test Oculto): ${exercise.test_code || "No hay test de código oculto"}
`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2 }
        })
      });

      if (response.status === 429) {
        const errBody = await response.json().catch(() => ({}));
        const details = errBody?.error?.details || [];
        const retryInfo = details.find(d => d['@type']?.includes('RetryInfo'));
        const delaySec = retryInfo?.retryDelay
          ? parseFloat(retryInfo.retryDelay.replace('s', ''))
          : 65;
        const waitMs = Math.ceil(delaySec * 1000) + 3000;
        console.log(`  ⏳ Rate limit (intento ${attempt}/${retries}). Esperando ${Math.ceil(waitMs / 1000)}s...`);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }

      if (!response.ok) {
        throw new Error("HTTP " + response.status + " " + (await response.text()).slice(0, 200));
      }

      const data = await response.json();
      let text = data.candidates[0].content.parts[0].text;
      text = text.replace(/^```python\n?/m, '').replace(/^```\n?/m, '').replace(/```$/m, '').trim();
      return text;

    } catch (error) {
      if (attempt === retries) {
        console.error(`  ❌ Error definitivo para ID ${exercise.id}:`, error.message);
        return null;
      }
      console.log(`  ⚠️ Error en intento ${attempt}/${retries}, reintentando en 20s...`);
      await new Promise(r => setTimeout(r, 20000));
    }
  }
  return null;
}

async function run() {
  console.log("Obteniendo ejercicios de la base de datos...");
  const { data: exercises, error } = await supabaseAdmin
    .from('exercises')
    .select('*')
    .order('id');

  if (error) {
    console.error("Error obteniendo ejercicios:", error);
    return;
  }

  // Filtrar los que ya tienen solución (por si se interrumpe y se reanuda)
  const pending = exercises.filter(e => !e.solution_code || e.solution_code.trim() === '');
  console.log(`Se encontraron ${exercises.length} ejercicios. ${pending.length} pendientes de solucionar.`);

  for (let i = 0; i < pending.length; i++) {
    const ex = pending[i];
    console.log(`[${i + 1}/${pending.length}] Resolviendo Ejercicio ID ${ex.id}: ${ex.title}...`);

    const solution = await getSolutionFromGemini(ex);
    if (solution) {
      const { error: updateError } = await supabaseAdmin
        .from('exercises')
        .update({ solution_code: solution })
        .eq('id', ex.id);

      if (updateError) {
        console.error("Error guardando en BD:", updateError);
      } else {
        console.log("✅ Guardado.");
      }
    } else {
      console.log("❌ Falló la generación para este ejercicio.");
    }

    // 5 segundos entre peticiones para respetar el límite de 15 RPM
    await new Promise(r => setTimeout(r, 5000));
  }

  console.log("¡Terminado!");
}

run();

//node scripts/autoSolve.mjs <API_KEY>
