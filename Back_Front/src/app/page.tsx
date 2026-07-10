"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import {
  ArrowRight, BookOpen, Laptop, Users, CheckCircle,
  Terminal, Play, Code, Star, GitBranch, MessageSquare,
  Video, Loader2, Trophy, Medal, Award
} from "lucide-react";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeCode, setActiveCode] = useState("hola");
  const [consoleOutput, setConsoleOutput] = useState("Haz clic en \"Ejecutar Código\" para ver el resultado aquí...");
  const [isRunning, setIsRunning] = useState(false);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard?limit=5')
      .then(r => r.json())
      .then(data => {
        setTopUsers(data);
        setLoadingLeaderboard(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingLeaderboard(false);
      });
  }, []);

  const examples: Record<string, string> = {
    hola: `def saludar(nombre):\n    return f"¡Hola, {nombre}! Bienvenido a PyLearn."\n\n# Ejecuta tu primer código en Python\nprint(saludar("Futuro Programador"))`,
    bucle: `# Imprimir números del 1 al 5 usando un bucle 'for'\nprint("Iniciando contador...")\nfor i in range(1, 6):\n    print(f"Número actual: {i}")\n\nprint("¡Bucle completado con éxito!")`,
    clase: `# Función para verificar si un número es par o impar\ndef es_par(numero):\n    if numero % 2 == 0:\n        return True\n    return False\n\nnumero_a_evaluar = 24\nresultado = es_par(numero_a_evaluar)\nprint(f"¿El número {numero_a_evaluar} es par?: {resultado}")`
  };

  const outputs: Record<string, string> = {
    hola: `> python main.py\n¡Hola, Futuro Programador! Bienvenido a PyLearn.`,
    bucle: `> python main.py\nIniciando contador...\nNúmero actual: 1\nNúmero actual: 2\nNúmero actual: 3\nNúmero actual: 4\nNúmero actual: 5\n¡Bucle completado con éxito!`,
    clase: `> python main.py\n¿El número 24 es par?: True`
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput("Compilando y ejecutando...");
    setTimeout(() => {
      setConsoleOutput(outputs[activeCode]);
      setIsRunning(false);
    }, 800);
  };

  const formatCodeHTML = (code: string) => {
    // Basic syntax highlighting simulation
    return code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/#(.*)/g, '<span class="text-slate-400 dark:text-slate-500 font-normal italic">#$1</span>')
      .replace(/\b(def|return|for|in|if|print)\b/g, '<span class="text-fuchsia-600 dark:text-pink-400 font-semibold">$1</span>')
      .replace(/\b(range)\b/g, '<span class="text-sky-600 dark:text-sky-400">$1</span>')
      .replace(/(["'])(.*?)\1/g, '<span class="text-emerald-600 dark:text-amber-300">"$2"</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-amber-600 dark:text-orange-400">$1</span>');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-sky-500/30 selection:text-sky-600 dark:selection:text-sky-300">
      <style dangerouslySetInnerHTML={{
        __html: `
        .bg-dynamic {
          background-attachment: fixed;
          background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.04) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(56, 189, 248, 0.04) 0%, transparent 50%);
        }
        .dark .bg-dynamic {
          background-image: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(56, 189, 248, 0.1) 0%, transparent 50%);
        }
      `}} />
      <div className="bg-dynamic flex-grow">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-black dark:border-slate-800 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer min-w-0 shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <span className="font-bold text-white text-lg sm:text-xl leading-none">Py</span>
              </div>
              <span className="hidden sm:block text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-sky-600 dark:from-white dark:via-slate-200 dark:to-sky-400 bg-clip-text text-transparent">
                Py<span className="text-sky-500 dark:text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.2)] dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">Learn</span>
              </span>
            </div>



            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />

              {!loading && user ? (
                <button onClick={() => router.push('/dashboard')} className="px-4 py-2.5 text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-sky-500/20">
                  Ir a mi Dashboard
                </button>
              ) : (
                <>
                  <Link href="/login?from=landing" className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold bg-[#FFD43B] dark:bg-blue-600 text-black dark:text-white border border-black dark:border-transparent rounded-lg transition-all transform hover:-translate-y-0.5 hover:bg-[#FFCA2C] dark:hover:bg-blue-500 shadow-md whitespace-nowrap shrink-0">
                    Comenzar Gratis
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        <main>
          {/* HERO */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-20 lg:pt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 dark:border-sky-400/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
                  <span className="flex h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse"></span>
                  <span>Plataforma Educativa de Siguiente Generación</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  Domina el lenguaje del <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    futuro con PyLearn
                  </span>
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Aprende Python desde cero con lecciones dinámicas, desafíos en tiempo real y un potente ecosistema de aulas virtuales diseñado para estudiantes, profesores y entusiastas del código.
                </p>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
                  {!loading && user ? (
                    <button onClick={() => router.push('/dashboard')} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold rounded-xl hover:-translate-y-1 transition-transform shadow-lg shadow-sky-500/20 flex items-center justify-center space-x-2">
                      <span>Continuar Aprendiendo</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <>
                      <a href="#caracteristicas" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900/60 border border-black dark:border-slate-800 hover:border-black dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-xl transition-colors flex items-center justify-center">
                        Ver Características
                      </a>
                      <a href="#classroom" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900/60 border border-black dark:border-slate-800 hover:border-black dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium rounded-xl transition-colors flex items-center justify-center">
                        Aula Virtual
                      </a>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-500 dark:border-white max-w-md mx-auto lg:mx-0">
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold ">+80</p>
                    <p className="text-xs text-slate-500">Lecciones Prácticas</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold">100%</p>
                    <p className="text-xs text-slate-500">Ejecución Web</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold">Class</p>
                    <p className="text-xs text-slate-500">Gestión Docente</p>
                  </div>
                </div>
              </div>

              {/* CONSOLA INTERACTIVA */}
              <div className="lg:col-span-5 w-full">
                <div className="bg-white dark:bg-slate-950 rounded-2xl border border-black dark:border-slate-800 shadow-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.05)] dark:shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                  <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-black dark:border-slate-800/80">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                      <Code className="w-3 h-3 text-sky-500" /> main.py
                    </span>
                    <div className="text-xs text-slate-500 font-mono">PyLearn Interpreter</div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/40 px-4 py-2 flex items-center space-x-2 overflow-x-auto border-b border-black dark:border-slate-900 text-xs">
                    <span className="text-slate-400 whitespace-nowrap">Ejemplos:</span>
                    {["hola", "bucle", "clase"].map(key => (
                      <button
                        key={key}
                        onClick={() => { setActiveCode(key); setConsoleOutput("Haz clic en \"Ejecutar Código\" para ver el resultado aquí..."); }}
                        className={`px-2 py-1 rounded font-mono ${activeCode === key ? 'bg-slate-200 dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-slate-400 dark:border-slate-700' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                      >
                        {key === 'hola' ? 'Hola_Mundo.py' : key === 'bucle' ? 'Contador.py' : 'Funciones.py'}
                      </button>
                    ))}
                  </div>

                  <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto h-52 bg-slate-50/50 dark:bg-slate-950/70 text-slate-800 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: formatCodeHTML(examples[activeCode]) }} />

                  <div className="bg-slate-100 dark:bg-slate-900 border-t border-black dark:border-slate-800 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-emerald-500" /> Consola de Salida
                      </span>
                      <button onClick={handleRunCode} className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 text-xs font-bold rounded-md transition-all shadow-md flex items-center space-x-1.5">
                        {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
                        <span>Ejecutar Código</span>
                      </button>
                    </div>
                    <div className="bg-white dark:bg-slate-950 rounded-lg p-3 h-24 font-mono text-xs overflow-y-auto border border-black dark:border-slate-800 text-slate-700 dark:text-slate-300">
                      {consoleOutput.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* LEADERBOARD PREVIEW */}
          <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl border border-black dark:border-slate-800 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-xs font-semibold uppercase tracking-wider">
                    <Trophy className="w-4 h-4" />
                    <span>Salón de la Fama</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                    Los Mejores de PyLearn
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Compite con la comunidad, resuelve ejercicios y sube de posición. Estos son los estudiantes que están liderando la tabla de posiciones actualmente.
                  </p>
                  <Link href="/leaderboard" className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md">
                    <Award className="w-5 h-5" />
                    <span>Ver Ranking Completo</span>
                  </Link>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-black dark:border-slate-800 p-6 shadow-inner">
                  <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" /> Top 5 Estudiantes
                  </h3>
                  
                  {loadingLeaderboard ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-3">
                      <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                      <span className="text-sm text-slate-500">Cargando puntuaciones...</span>
                    </div>
                  ) : topUsers.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">Aún no hay puntuaciones</div>
                  ) : (
                    <div className="space-y-3">
                      {topUsers.map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-slate-900 rounded-xl border border-black dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow gap-2">
                          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                              index === 0 ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                              index === 1 ? 'bg-slate-100 text-slate-700 border border-black' :
                              index === 2 ? 'bg-orange-100 text-orange-700 border border-orange-400' :
                              'bg-slate-50 dark:bg-slate-800 text-slate-500 border border-black dark:border-slate-700'
                            }`}>
                              {index + 1}
                            </div>
                            <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate">{user.username}</span>
                          </div>
                          <div className="font-mono text-sky-600 dark:text-sky-400 font-bold bg-sky-50 dark:bg-sky-900/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-xs sm:text-sm border border-sky-100 dark:border-sky-800/50 whitespace-nowrap shrink-0">
                            {user.score} pts
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section id="caracteristicas" className="py-20 border-t border-black dark:border-slate-900/60 bg-slate-50 dark:bg-slate-950/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-xs font-bold text-sky-600 dark:text-sky-400 tracking-wider uppercase">Un ecosistema completo</h2>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Todo lo que necesitas para dominar Python</p>
                <p className="text-slate-500 dark:text-slate-400">
                  Hemos fusionado la interactividad de un compilador en la nube con la estructura formal de una academia de clases.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-black dark:border-slate-800/80 hover:border-sky-300 dark:hover:border-slate-700/60 shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Lecciones Interactivas</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Aprende teoría explicada paso a paso. No solo lees; modificas ejemplos de código directamente sobre la lección para asimilar conceptos rápidamente.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-black dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-slate-700/60 shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Ejercicios y Desafíos</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Resuelve desafíos algorítmicos autoevaluados. Nuestro sistema verifica tu código en segundos y te brinda feedback inmediato sobre errores.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-black dark:border-slate-800/80 hover:border-purple-300 dark:hover:border-slate-700/60 shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Gestión Estilo Classroom</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    ¿Eres docente? Crea aulas, asigna tareas de programación, haz seguimiento en tiempo real del progreso de tus alumnos y califica sus códigos de forma centralizada.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CLASSROOM */}
          <section id="classroom" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                    <Users className="w-4 h-4" />
                    <span>PyLearn Classroom</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                    Aulas Virtuales integradas para Profesores y Estudiantes
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Inspirado en plataformas educativas líderes, pero optimizado al 100% para enseñar a programar. Olvídate de recibir códigos en capturas de pantalla o correos electrónicos.
                  </p>
                  <ul className="space-y-3">
                    {["Crea clases, asigna lecciones y califica proyectos.", "Monitoreo de las respuestas de tus estudiantes.", "Retroalimentación directa sobre líneas específicas de código."].map((text, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-7">
                  <div className="bg-white dark:bg-slate-900 border border-slate-700 dark:border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/5 rounded-full blur-2xl"></div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black dark:border-white pb-4 mb-6 relative z-10">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Módulo 1: Fundamentos de Python</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Progreso del curso &bull; Nivel: <strong className="text-sky-600 dark:text-sky-400">Principiante</strong></p>
                      </div>
                      <span className="mt-2 sm:mt-0 px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold w-fit">
                        Rol: Estudiante
                      </span>
                    </div>

                    <div className="space-y-4 relative z-10">
                      <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-black dark:border-slate-800/80 flex items-center justify-between hover:border-sky-300 dark:hover:border-sky-500/50 transition-colors group">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Code className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Lección: Estructuras de Control</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Condicionales if, elif, else</p>
                          </div>
                        </div>
                        <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/20 dark:bg-emerald-500/10 px-3 py-1.5 rounded-md font-bold shadow-sm">Continuar</span>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-black dark:border-slate-800/80 flex items-center justify-between opacity-75">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                            <Star className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Desafío: Calculadora Básica</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Requiere completar lecciones previas</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-md font-medium">Bloqueado</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-black dark:border-white relative z-10">
                      <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">Tus Logros Recientes</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-2.5 bg-slate-50/80 dark:bg-slate-950/30 rounded-lg border border-black dark:border-slate-800/40 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-sm">🏆</div>
                            <span className="text-slate-700 dark:text-slate-200 font-medium">Primer Código</span>
                          </div>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Desbloqueado</span>
                        </div>
                        <div className="flex items-center justify-between p-2.5 bg-slate-50/80 dark:bg-slate-950/30 rounded-lg border border-black dark:border-slate-800/40 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shadow-sm">🔥</div>
                            <span className="text-slate-700 dark:text-slate-200 font-medium">Racha de 3 días</span>
                          </div>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Activa</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}




