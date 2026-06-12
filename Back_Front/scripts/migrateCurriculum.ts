import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Faltan variables de entorno de Supabase en .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Importar los archivos compilados dinámicamente o definirlos aquí
// Como son archivos TS y esto es un script de NodeJS, usaremos una estrategia mixta.
// Para evitar problemas importando TS crudo en un script MJS, leeremos los módulos importando
// el transpilado o haremos un require usando ts-node.

// Dado que este script lo ejecutaré desde antigravity, usaré ts-node
import { module1Lessons } from '../src/app/learn/data/module1.js';
import { module2Lessons } from '../src/app/learn/data/module2.js';
import { module3Lessons } from '../src/app/learn/data/module3.js';
import { module4Lessons } from '../src/app/learn/data/module4.js';
import { module5Lessons } from '../src/app/learn/data/module5.js';

const modulesConfig = [
  {
    id: 1,
    title: "Conceptos Básicos",
    description: "Aprende qué son las variables, tipos de datos, y cómo imprimir texto en la consola.",
    icon_name: "Code",
    color_gradient: "from-blue-600 to-indigo-600",
    is_locked: false,
  },
  {
    id: 2,
    title: "Control de Flujo",
    description: "Descubre cómo tomar decisiones con 'if' y repetir acciones con 'for' y 'while'.",
    icon_name: "GitBranch",
    color_gradient: "from-indigo-600 to-purple-600",
    is_locked: false,
  },
  {
    id: 3,
    title: "Colecciones de Datos",
    description: "Domina listas, matrices y diccionarios para manejar grandes cantidades de información.",
    icon_name: "Layers",
    color_gradient: "from-purple-600 to-pink-600",
    is_locked: false,
  },
  {
    id: 4,
    title: "Funciones y Modularidad",
    description: "Crea tu propio código reutilizable y aprende a manejar errores como un profesional.",
    icon_name: "Cpu",
    color_gradient: "from-pink-600 to-rose-600",
    is_locked: false,
  },
  {
    id: 5,
    title: "Archivos y POO",
    description: "Interactúa con archivos reales y descubre el poder de la Programación Orientada a Objetos.",
    icon_name: "Database",
    color_gradient: "from-rose-600 to-orange-600",
    is_locked: false,
  }
];

const lessonsMap = {
  1: module1Lessons,
  2: module2Lessons,
  3: module3Lessons,
  4: module4Lessons,
  5: module5Lessons,
};

async function migrate() {
  console.log("Iniciando migración...");

  // 1. Insertar Módulos
  console.log("Insertando Módulos...");
  for (const mod of modulesConfig) {
    const { error } = await supabase.from('modules').upsert(mod);
    if (error) console.error("Error modulo:", error);
  }

  // 2. Insertar Lecciones y Ejercicios
  for (const [modIdStr, lessonsArray] of Object.entries(lessonsMap)) {
    const moduleId = parseInt(modIdStr);
    console.log(`\nInsertando lecciones del módulo ${moduleId}...`);

    for (let lIdx = 0; lIdx < lessonsArray.length; lIdx++) {
      const lesson = lessonsArray[lIdx];
      
      // Insertar lección
      const { error: lessonError } = await supabase.from('lessons').upsert({
        id: lesson.id,
        module_id: moduleId,
        title: lesson.title,
        theory: lesson.theory,
        order_index: lIdx
      });

      if (lessonError) {
        console.error(`Error lección ${lesson.id}:`, lessonError);
        continue;
      }

      // Insertar ejercicios
      for (let eIdx = 0; eIdx < lesson.exercises.length; eIdx++) {
        const exercise = lesson.exercises[eIdx];
        const { error: exerciseError } = await supabase.from('exercises').upsert({
          id: exercise.id,
          lesson_id: lesson.id,
          title: exercise.title,
          difficulty: exercise.difficulty,
          difficulty_color: exercise.difficultyColor,
          instructions: exercise.instructions,
          initial_code: exercise.initialCode,
          output_check: (exercise as any).outputCheck || null,
          test_code: (exercise as any).testCode || null,
          hint: exercise.hint || null,
          order_index: eIdx
        });

        if (exerciseError) {
          console.error(`Error ejercicio ${exercise.id}:`, exerciseError);
        }
      }
    }
  }

  console.log("\n¡Migración Completada!");
}

migrate();
