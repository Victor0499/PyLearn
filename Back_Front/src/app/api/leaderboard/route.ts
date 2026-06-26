import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    
    // Consultar todos los estudiantes y sus ejercicios completados
    // Se usa un join con api_userprofile para filtrar por rol 'estudiante'
    // Y se traen los registros de api_userprogress que esten completados
    const { data: users, error } = await supabaseAdmin
      .from('auth_user')
      .select(`
        id, 
        username, 
        api_userprofile!inner(role), 
        api_userprogress(id, completed)
      `)
      .eq('api_userprofile.role', 'estudiante');

    if (error) {
      console.error("Supabase Error:", error);
      throw error;
    }

    // Procesar datos para contar ejercicios completados por cada usuario
    const rankedUsers = users.map((user: any) => {
      // Filtrar solo los progresos completados (por si acaso vienen algunos en false, aunque nuestro schema los inserta como true)
      const completedExercises = user.api_userprogress ? user.api_userprogress.filter((p: any) => p.completed === true).length : 0;
      return {
        id: user.id,
        username: user.username,
        score: completedExercises
      };
    });

    // Ordenar de mayor a menor score, en caso de empate ordenar alfabeticamente
    rankedUsers.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.username.localeCompare(b.username);
    });
    
    let result = rankedUsers;
    if (limitParam) {
       const limit = parseInt(limitParam, 10);
       if (!isNaN(limit)) {
         result = result.slice(0, limit);
       }
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al obtener el leaderboard' }, { status: 500 });
  }
}
