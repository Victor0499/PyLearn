
ALTER TABLE public.api_userprogress 
  DROP CONSTRAINT IF EXISTS api_userprogress_lesson_id_fkey,
  DROP CONSTRAINT IF EXISTS api_userprogress_exercise_id_fkey;


ALTER TABLE public.api_userprogress 
  ADD CONSTRAINT api_userprogress_lesson_id_fkey 
  FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;

ALTER TABLE public.api_userprogress 
  ADD CONSTRAINT api_userprogress_exercise_id_fkey 
  FOREIGN KEY (exercise_id) REFERENCES public.exercises(id) ON DELETE CASCADE;


DROP TABLE IF EXISTS public.api_exercisetest CASCADE;
DROP TABLE IF EXISTS public.api_exercise CASCADE;
DROP TABLE IF EXISTS public.api_lesson CASCADE;
DROP TABLE IF EXISTS public.api_module CASCADE;
DROP TABLE IF EXISTS public.api_level CASCADE;

