"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Play, LogOut, GraduationCap, School, Lock, BookOpen, Code, Trophy, Star } from "lucide-react";

const LESSONS_PER_MODULE: Record<number, { lessonIds: number[]; totalExercises: number }> = {
  1: { lessonIds: [1, 2, 3, 4, 5, 6, 7, 14, 15, 18, 19], totalExercises: 41 },
  2: { lessonIds: [8, 9, 10, 11, 12, 13, 16, 17], totalExercises: 25 },
  3: { lessonIds: [], totalExercises: 0 },
  4: { lessonIds: [], totalExercises: 0 },
};

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [moduleProgress, setModuleProgress] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch("/api/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        const progress: Record<number, number> = {};
        const totalExercisesPerModule: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

        // Calcular total de ejercicios por módulo usando LESSONS_PER_MODULE
        for (const [modId, cfg] of Object.entries(LESSONS_PER_MODULE)) {
          const mid = Number(modId);
          totalExercisesPerModule[mid] = cfg.totalExercises;
        }

        // Contar ejercicios completados
        for (const [modId, cfg] of Object.entries(LESSONS_PER_MODULE)) {
          const mid = Number(modId);
          progress[mid] = 0;
          if (totalExercisesPerModule[mid] === 0) continue;

          // Verificar si el progreso se guarda por lesson_id o por exercise_id
          data.forEach((p: { lesson_id: number; exercise_id: number; completed: boolean }) => {
            if (cfg.lessonIds.includes(p.lesson_id) && p.completed) {
              progress[mid] = (progress[mid] || 0) + 1;
            }
          });
        }

        const result: Record<number, number> = {};
        for (const [modId] of Object.entries(LESSONS_PER_MODULE)) {
          const mid = Number(modId);
          result[mid] = totalExercisesPerModule[mid] > 0 ? Math.round((progress[mid] / totalExercisesPerModule[mid]) * 100) : 0;
        }
        setModuleProgress(result);
      } catch (err) {
        console.error("Error loading dashboard progress:", err);
      }
    };

    loadProgress();
  }, [user]);

  if (loading || !user) return (
    <div className="min-h-screen bg-slate-950" />
  );

  const modules = [
    {
      id: 1,
      title: "Conceptos Básicos",
      description: "Aprende qué son las variables, tipos de datos, y cómo imprimir texto en la consola.",
      icon: <Code className="w-8 h-8 text-blue-400" />,
      color: "from-blue-600 to-indigo-600",
      progress: moduleProgress[1],
      locked: false,
    },
    {
      id: 2,
      title: "Estructuras de Control",
      description: "Domina el flujo de tu programa usando condiciones (if/else) y bucles (for/while).",
      icon: <BookOpen className="w-8 h-8 text-emerald-400" />,
      color: "from-emerald-600 to-teal-600",
      progress: moduleProgress[2],
      locked: moduleProgress[1] < 100,
    },
    {
      id: 3,
      title: "Funciones Modulares",
      description: "Crea bloques de código reutilizables para hacer tus programas más eficientes.",
      icon: <Trophy className="w-8 h-8 text-orange-400" />,
      color: "from-orange-500 to-red-500",
      progress: moduleProgress[3],
      locked: true,
    },
    {
      id: 4,
      title: "Estructuras de Datos",
      description: "Aprende a usar Listas, Diccionarios y Tuplas para almacenar grandes cantidades de información.",
      icon: <Star className="w-8 h-8 text-purple-400" />,
      color: "from-purple-600 to-fuchsia-600",
      progress: moduleProgress[4],
      locked: true,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/50 transition-all duration-300">
            <span className="font-bold text-white text-lg leading-none group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Py</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 hidden sm:block group-hover:brightness-125 transition-all duration-300">
            PyLearn Platform
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
            {user.role === 'profesor' ? <School className="w-4 h-4 text-indigo-400" /> : <GraduationCap className="w-4 h-4 text-blue-400" />}
            <span className="text-sm text-slate-300 font-medium">{user.username}</span>
            <span className={user.role === 'profesor' ? "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/30"}>
              {user.role === 'profesor' ? 'Profesor' : 'Estudiante'}
            </span>
          </div>
          <button onClick={logout} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors" title="Cerrar Sesión">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-12">
        <section className="mb-16">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 lg:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
              <div className="max-w-2xl flex-1">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                  ¡Hola de nuevo, <span className="text-blue-400">{user.username}</span>!
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed pr-0 lg:pr-8">
                  Tu entorno interactivo está listo. Continúa justo donde te quedaste y sigue construyendo tus habilidades de programación.
                </p>
                
                <button 
                  onClick={() => router.push('/learn')}
                  className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                  Continuar Aprendiendo
                </button>
              </div>

              {/* Noodle Mascot & Chat Bubble (Right Side) */}
              <div className="hidden lg:flex shrink-0 items-center relative z-20">
                {/* Mascot Image */}
                <div className="w-56 h-56 xl:w-72 xl:h-72 relative group z-10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <img 
                    src="/noodle.jpg" 
                    alt="Noodle, la mascota de PyLearn" 
                    className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-slate-800 transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 relative z-10"
                  />
                </div>

                {/* Chat Bubble on the right */}
                <div className="group/bubble relative -ml-6 bg-slate-800 border-2 border-[#25FABA]/40 hover:border-[#25FABA] text-slate-200 p-5 rounded-2xl shadow-2xl hover:shadow-[0_0_20px_rgba(37,250,186,0.6)] max-w-[240px] z-20 transform hover:-translate-y-1 transition-all duration-300">
                  <p className="text-sm font-medium leading-relaxed">
                    ¡Hssss! 🐍 Soy <span className="text-[#25FABA] font-bold drop-shadow-[0_0_8px_rgba(37,250,186,0.5)]">Noodle</span>. <br/>
                    Estoy aquí para acompañarte paso a paso en tu ruta de aprendizaje de Python.
                  </p>
                  {/* Little tail for the speech bubble pointing left */}
                  <div className="absolute top-1/2 -left-[10px] w-[18px] h-[18px] bg-slate-800 border-l-2 border-t-2 border-[#25FABA]/40 group-hover/bubble:border-[#25FABA] transform -rotate-45 -translate-y-1/2 transition-colors duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Ruta de Aprendizaje</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => !mod.locked && router.push('/learn')}
                className={mod.locked ? "relative group rounded-2xl border transition-all duration-300 overflow-hidden bg-slate-900/50 border-slate-800/50 cursor-not-allowed opacity-75" : "relative group rounded-2xl border transition-all duration-300 overflow-hidden bg-slate-900 border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer"}
              >
                <div className={`h-32 bg-gradient-to-br ${mod.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    {mod.locked ? <Lock className="w-12 h-12 text-white/50" /> : mod.icon}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Módulo {mod.id}</div>
                  <h4 className="text-lg font-bold text-white mb-3 leading-tight">{mod.title}</h4>
                  <p className="text-sm text-slate-400 line-clamp-2">{mod.description}</p>
                </div>

                <div className="px-6 pb-6 mt-auto">
                  {!mod.locked ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-blue-400">Progreso</span>
                        <span className="text-slate-300">{mod.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: mod.progress + "%" }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-800/50 w-max px-3 py-1.5 rounded-lg">
                      <Lock className="w-3 h-3 mr-1.5" /> Bloqueado
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
