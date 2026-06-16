import { createClient } from '@supabase/supabase-js';

// Cliente para uso en el servidor (con permisos de administrador, bypasa RLS)
export const supabaseAdmin = typeof window === 'undefined' 
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  : (null as any);

// Cliente para uso en el navegador (acceso público con RLS activo)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
