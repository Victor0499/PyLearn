-- Añadir la columna solution_code a la tabla exercises
ALTER TABLE exercises
ADD COLUMN IF NOT EXISTS solution_code TEXT;
