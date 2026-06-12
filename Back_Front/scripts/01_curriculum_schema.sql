-- ==============================================================================
-- SCRIPT DE MIGRACIÓN: CURRÍCULO A SUPABASE
-- Ejecuta este script en el SQL Editor de tu Dashboard de Supabase.
-- ==============================================================================

-- 1. Crear tabla de Módulos
CREATE TABLE IF NOT EXISTS public.modules (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL, -- Nombre del icono de Lucide (ej: 'Code', 'GitBranch')
    color_gradient TEXT NOT NULL, -- Clases de Tailwind (ej: 'from-blue-600 to-indigo-600')
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crear tabla de Lecciones
CREATE TABLE IF NOT EXISTS public.lessons (
    id INTEGER PRIMARY KEY, -- Usamos el ID original que ya tienen (ej: 1, 92, 495)
    module_id INTEGER REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    theory TEXT NOT NULL,
    order_index INTEGER NOT NULL, -- Para mantener el orden lógico de enseñanza
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Crear tabla de Ejercicios
CREATE TABLE IF NOT EXISTS public.exercises (
    id INTEGER PRIMARY KEY, -- Usamos el ID original (ej: 101, 102)
    lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    difficulty_color TEXT NOT NULL,
    instructions TEXT NOT NULL,
    initial_code TEXT NOT NULL,
    output_check TEXT, -- Puede ser null si se usa test_code
    test_code TEXT, -- Puede ser null si se usa output_check
    hint TEXT,
    order_index INTEGER NOT NULL, -- Para mantener el orden de los ejercicios
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Habilitar RLS (Row Level Security)
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

-- 5. Crear políticas para permitir lectura pública a cualquier usuario autenticado
CREATE POLICY "Permitir lectura de módulos a todos" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Permitir lectura de lecciones a todos" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Permitir lectura de ejercicios a todos" ON public.exercises FOR SELECT USING (true);

-- (Nota: La escritura, actualización y borrado se hará mediante el backend con el Supabase Service Role Key)
