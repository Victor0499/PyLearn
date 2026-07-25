"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Play, LogOut, GraduationCap, School, Lock, BookOpen, Code, Trophy, Star, Users, ArrowRight, Loader2, Check, GitBranch, Layers, Cpu, Database, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

interface MyClass {
  id: number;
  name: string;
  code: string;
  teacher_username: string;
  joined_at: string;
}

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [moduleProgress, setModuleProgress] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [dynamicModules, setDynamicModules] = useState<any[]>([]);
  const [myClasses, setMyClasses] = useState<MyClass[]>([]);
  const [joinCode, setJoinCode] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinMsg, setJoinMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role === 'profesor') router.push('/profesor');
    if (!loading && user?.role === 'admin') router.push('/admin');
    // tester role stays on dashboard (no redirect)
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== 'estudiante') return;
    const token = localStorage.getItem('access_token');
    
    // Cargar clases
    fetch('/api/classroom/mine', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setMyClasses(Array.isArray(data) ? data : []))
      .catch(() => {});
      
    // Cargar invitaciones
    fetch('/api/classroom/invitations', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setInvitations(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [user]);

  const handleRespondInvitation = async (invId: number, action: 'accept' | 'reject') => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`/api/classroom/invitations/${invId}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setInvitations(prev => prev.filter(inv => inv.id !== invId));
        if (action === 'accept') {
          // Recargar clases
          fetch('/api/classroom/mine', { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.ok ? r.json() : [])
            .then(data => setMyClasses(Array.isArray(data) ? data : []));
        }
      }
    } catch (e) {}
  };

  const handleJoinClass = async () => {
    if (!joinCode.trim()) return;
    setJoining(true);
    setJoinMsg(null);
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch('/api/classroom/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ code: joinCode.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setJoinMsg({ text: data.message, ok: true });
        setJoinCode('');
        setMyClasses((prev) => [
          { id: data.classroom.id, name: data.classroom.name, code: data.classroom.code, teacher_username: '', joined_at: new Date().toISOString() },
          ...prev,
        ]);
      } else {
        setJoinMsg({ text: data.error, ok: false });
      }
    } catch {
      setJoinMsg({ text: 'Error de conexión.', ok: false });
    } finally {
      setJoining(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    const loadModulesAndProgress = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const [modRes, progRes] = await Promise.all([
          fetch("/api/modules"),
          fetch("/api/progress", { headers: { Authorization: `Bearer ${token}` } })
        ]);
        if (!modRes.ok || !progRes.ok) throw new Error("Failed");
        
        const modulesData = await modRes.json();
        const progressData = await progRes.json();

        const progress: Record<number, number> = {};
        const result: Record<number, number> = {};

        modulesData.forEach((m: any) => {
           if (user.role === 'admin' || user.role === 'tester') {
             result[m.id] = 100;
             return;
           }

           progress[m.id] = 0;
           if (m.totalExercises === 0) {
             result[m.id] = 0;
             return;
           }
           
           progressData.forEach((p: { lesson_id: number; exercise_id: number; completed: boolean }) => {
             if (m.lessonIds.includes(p.lesson_id) && p.completed) {
               progress[m.id] = (progress[m.id] || 0) + 1;
             }
           });
           
           result[m.id] = Math.round((progress[m.id] / m.totalExercises) * 100);
        });
        
        setModuleProgress(result);
        setDynamicModules(modulesData);
      } catch (err) {
        console.error("Error loading dashboard progress:", err);
      }
    };

    loadModulesAndProgress();
  }, [user]);

  if (loading || !user) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />
  );

  const iconStyle = { filter: 'drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black)' };

  const getIcon = (name: string) => {
    switch(name) {
      case 'Code': return <Code className="w-8 h-8 text-slate-900 dark:text-white" style={iconStyle} />;
      case 'GitBranch': return <GitBranch className="w-8 h-8 text-slate-900 dark:text-white" style={iconStyle} />;
      case 'Layers': return <Layers className="w-8 h-8 text-slate-900 dark:text-white" style={iconStyle} />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-slate-900 dark:text-white" style={iconStyle} />;
      case 'Database': return <Database className="w-8 h-8 text-slate-900 dark:text-white" style={iconStyle} />;
      default: return <BookOpen className="w-8 h-8 text-slate-900 dark:text-white" style={iconStyle} />;
    }
  };

  const modules = dynamicModules.map((m, idx) => ({
    ...m,
    icon: getIcon(m.icon_name),
    color: m.color_gradient,
    progress: moduleProgress[m.id] || 0,
    // Bloquear si el módulo anterior no tiene 100% (y no es el primer módulo), a menos que sea admin
    locked: (user.role === 'admin' || user.role === 'tester') ? false : (m.is_locked || (idx > 0 && (moduleProgress[dynamicModules[idx - 1].id] || 0) < 100))
  }));

  const hasStarted = modules.some(m => m.progress > 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans relative">
      {/* Code pattern background (like WhatsApp chat) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* SVG pattern — LIGHT MODE */}
        <svg className="absolute inset-0 w-full h-full dark:hidden" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="code-pattern-light-student" x="0" y="0" width="340" height="270" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
              <text x="10" y="30" fontFamily="monospace" fontSize="17" fill="#334155">def saludo():</text>
              <text x="36" y="54" fontFamily="monospace" fontSize="17" fill="#334155">return &quot;Hola&quot;</text>
              <text x="185" y="78" fontFamily="monospace" fontSize="17" fill="#334155">if x &gt; 0:</text>
              <text x="210" y="102" fontFamily="monospace" fontSize="17" fill="#334155">print(x)</text>
              <text x="5" y="130" fontFamily="monospace" fontSize="17" fill="#334155">class PyLearn:</text>
              <text x="195" y="152" fontFamily="monospace" fontSize="17" fill="#334155">import os</text>
              <text x="10" y="176" fontFamily="monospace" fontSize="16" fill="#334155">for i in range(10):</text>
              <text x="5" y="214" fontFamily="monospace" fontSize="30" fill="#334155" opacity="0.8">{`{}`}</text>
              <text x="58" y="214" fontFamily="monospace" fontSize="30" fill="#334155" opacity="0.8">{`[]`}</text>
              <text x="112" y="214" fontFamily="monospace" fontSize="30" fill="#334155" opacity="0.8">{`()`}</text>
              <text x="185" y="214" fontFamily="monospace" fontSize="17" fill="#334155">lambda x: x*2</text>
              <text x="10" y="244" fontFamily="monospace" fontSize="16" fill="#334155" opacity="0.6"># comentario</text>
              <text x="185" y="260" fontFamily="monospace" fontSize="16" fill="#334155">while True:</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#code-pattern-light-student)" opacity="0.50" />
        </svg>

        {/* SVG pattern — DARK MODE */}
        <svg className="absolute inset-0 w-full h-full hidden dark:block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="code-pattern-dark-student" x="0" y="0" width="340" height="270" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
              <text x="10" y="30" fontFamily="monospace" fontSize="17" fill="#94a3b8">def saludo():</text>
              <text x="36" y="54" fontFamily="monospace" fontSize="17" fill="#94a3b8">return &quot;Hola&quot;</text>
              <text x="185" y="78" fontFamily="monospace" fontSize="17" fill="#94a3b8">if x &gt; 0:</text>
              <text x="210" y="102" fontFamily="monospace" fontSize="17" fill="#94a3b8">print(x)</text>
              <text x="5" y="130" fontFamily="monospace" fontSize="17" fill="#94a3b8">class PyLearn:</text>
              <text x="195" y="152" fontFamily="monospace" fontSize="17" fill="#94a3b8">import os</text>
              <text x="10" y="176" fontFamily="monospace" fontSize="16" fill="#94a3b8">for i in range(10):</text>
              <text x="5" y="214" fontFamily="monospace" fontSize="30" fill="#94a3b8" opacity="0.7">{`{}`}</text>
              <text x="58" y="214" fontFamily="monospace" fontSize="30" fill="#94a3b8" opacity="0.7">{`[]`}</text>
              <text x="112" y="214" fontFamily="monospace" fontSize="30" fill="#94a3b8" opacity="0.7">{`()`}</text>
              <text x="185" y="214" fontFamily="monospace" fontSize="17" fill="#94a3b8">lambda x: x*2</text>
              <text x="10" y="244" fontFamily="monospace" fontSize="16" fill="#94a3b8" opacity="0.5"># comentario</text>
              <text x="185" y="260" fontFamily="monospace" fontSize="16" fill="#94a3b8">while True:</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#code-pattern-dark-student)" opacity="0.18" />
        </svg>
      </div>

      <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-black dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 lg:px-10 sticky top-0 z-50 shrink-0 gap-2">
        <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer shrink-0" onClick={() => router.push('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform shrink-0">
            <span className="font-bold text-white text-lg leading-none">Py</span>
          </div>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-sky-600 dark:from-white dark:via-slate-200 dark:to-sky-400 bg-clip-text text-transparent group-hover:brightness-110 transition-all">
            Py<span className="text-sky-500 dark:text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.2)] dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">Learn</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-black dark:border-slate-700/50 min-w-0">
            {user.role === 'profesor' ? <School className="w-4 h-4 text-indigo-400 shrink-0" /> : <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />}
            <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium truncate">{user.username}</span>
            <span className={user.role === 'profesor' ? "hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/30"}>
              {user.role === 'profesor' ? 'Profesor' : 'Estudiante'}
            </span>
          </div>
          {/* Desktop controls */}
          <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
            <button onClick={() => router.push('/leaderboard')} className="flex flex-col items-center justify-center px-2 py-1 text-slate-500 dark:text-slate-500 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-yellow-500/10 rounded-xl transition-all group shrink-0" title="Ranking">
              <Trophy className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[9px] font-bold mt-0.5 uppercase tracking-wider">Ranking</span>
            </button>
            <ThemeToggle />
            <button onClick={logout} className="p-2 text-slate-500 dark:text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors" title="Cerrar Sesión">
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-full transition-all focus:outline-none"
              title="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown popover */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 w-48 bg-white dark:bg-slate-900 border border-black dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => { router.push('/leaderboard'); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-yellow-500/10 hover:text-yellow-500 rounded-xl transition-all"
            >
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Ranking</span>
            </button>
            <div className="flex items-center justify-between px-3 py-2 border-t border-b border-slate-100 dark:border-slate-800 my-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tema</span>
              <ThemeToggle />
            </div>
            <button
              onClick={() => { logout(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-12 flex-1 w-full">
        <section className="mb-16">
          <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-black dark:border-slate-800 p-8 lg:p-12 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
              <div className="max-w-2xl flex-1">
                <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                  {hasStarted ? '¡Hola de nuevo' : '¡Bienvenido'}, <span className="text-blue-400">{user.username}</span>!
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 leading-relaxed pr-0 lg:pr-8">
                  {hasStarted 
                    ? 'Tu entorno interactivo está listo. Continúa justo donde te quedaste y sigue construyendo tus habilidades de programación.'
                    : 'Tu entorno interactivo está listo. Comienza tu primera lección y da el primer paso en el mundo de la programación con Python.'}
                </p>

                <button
                  onClick={() => {
                    const activeMod = modules.find(m => !m.locked && m.progress < 100)?.id || 1;
                    router.push('/learn?moduleId=' + activeMod);
                  }}
                  className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg border border-black dark:border-transparent hover:bg-blue-50 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300 dark:hover:border-transparent transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-slate-900 dark:text-white fill-white" />
                  </div>
                  {hasStarted ? 'Continuar Aprendiendo' : 'Comenzar a Aprender'}
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
                    className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-black dark:border-slate-800 transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 relative z-10"
                  />
                </div>

                {/* Chat Bubble on the right */}
                <div className="group/bubble relative -ml-6 bg-slate-100 dark:bg-slate-800 border-2 border-[#25FABA]/40 hover:border-[#25FABA] text-slate-900 dark:text-slate-200 p-5 rounded-2xl shadow-2xl hover:shadow-[0_0_20px_rgba(37,250,186,0.6)] max-w-[240px] z-20 transform hover:-translate-y-1 transition-all duration-300">
                  <p className="text-sm font-medium leading-relaxed">
                    ¡Hssss!  Soy <span className="text-[#25FABA] font-bold drop-shadow-[0_0_8px_rgba(37,250,186,0.5)]">Noodle</span>. <br />
                    Estoy aquí para acompañarte paso a paso en tu ruta de aprendizaje de Python.
                  </p>
                  {/* Little tail for the speech bubble pointing left */}
                  <div className="absolute top-1/2 -left-[10px] w-[18px] h-[18px] bg-slate-100 dark:bg-slate-800 border-l-2 border-t-2 border-[#25FABA]/40 group-hover/bubble:border-[#25FABA] transform -rotate-45 -translate-y-1/2 transition-colors duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Mis Clases (solo estudiantes) */}
        {user.role === 'estudiante' && (
          <section className="mb-14">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              Mis Clases
            </h3>

            {/* Invitaciones */}
            {invitations.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  Tienes {invitations.length} invitación{invitations.length > 1 ? 'es' : ''} pendiente{invitations.length > 1 ? 's' : ''}
                </h4>
                <div className="flex flex-col gap-3">
                  {invitations.map((inv) => (
                    <div key={inv.id} className="bg-white dark:bg-slate-900 border border-blue-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-slate-900 dark:text-white font-medium">Te han invitado a unirte a <span className="font-bold text-blue-500 dark:text-blue-400">{inv.classroom_name}</span></p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Prof. {inv.teacher_username}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRespondInvitation(inv.id, 'reject')}
                          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 dark:hover:text-white rounded-lg text-sm font-medium transition-colors border border-transparent dark:border-slate-700"
                        >
                          Rechazar
                        </button>
                        <button
                          onClick={() => handleRespondInvitation(inv.id, 'accept')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Aceptar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unirse a clase */}
            <div className="bg-white dark:bg-slate-900 border border-black dark:border-slate-800 rounded-2xl p-6 mb-5">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Ingresa el código de invitación de tu profesor</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => { setJoinCode(e.target.value.toUpperCase()); setJoinMsg(null); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoinClass()}
                  placeholder="Ej. PY4A2Z"
                  maxLength={6}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border border-black dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 font-mono tracking-widest uppercase focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-base sm:text-lg w-full"
                />
                <button
                  onClick={handleJoinClass}
                  disabled={joining || !joinCode.trim()}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/20 w-full sm:w-auto"
                >
                  {joining ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  Unirse
                </button>
              </div>
              {joinMsg && (
                <p className={`mt-3 text-sm flex items-center gap-2 ${joinMsg.ok ? 'text-emerald-400' : 'text-red-400'}`}>
                  {joinMsg.ok && <Check className="w-4 h-4" />}
                  {joinMsg.text}
                </p>
              )}
            </div>
            {/* Lista de clases */}
            {myClasses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myClasses.map((cls) => (
                  <div key={cls.id} className="bg-white dark:bg-slate-900 border border-black dark:border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 truncate">{cls.name}</h4>
                    {cls.teacher_username && (
                      <p className="text-xs text-slate-500 dark:text-slate-500 mb-3 flex items-center gap-1">
                        <School className="w-3 h-3" /> Prof. {cls.teacher_username}
                      </p>
                    )}
                    <span className="text-xs font-mono font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-lg">
                      {cls.code}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ruta de Aprendizaje</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {modules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => !mod.locked && router.push('/learn?moduleId=' + mod.id)}
                className={mod.locked ? "relative group rounded-2xl border transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900 border-black dark:border-slate-800 cursor-not-allowed" : "relative group rounded-2xl border transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900 border-black dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer"}
              >
                {/* Overlay to wash out locked cards without making them transparent to the page background */}
                {mod.locked && <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/60 z-20 pointer-events-none"></div>}

                <div className="h-32 flex items-center justify-center relative overflow-hidden">
                  {/* Solid background to prevent page background from showing through the transparent mod.color */}
                  <div className="absolute inset-0 bg-white dark:bg-slate-900"></div>
                  {/* Transparent gradient color over the solid background */}
                  <div className="absolute inset-0" style={{ background: mod.color }}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    {mod.locked ? <Lock className="w-12 h-12 text-slate-900 dark:text-white/50" /> : mod.icon}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-500 uppercase mb-2">Módulo {mod.id}</div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-tight">{mod.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{mod.description}</p>
                </div>

                <div className="px-6 pb-6 mt-auto">
                  {!mod.locked ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-blue-400">Progreso</span>
                        <span className="text-slate-700 dark:text-slate-300">{mod.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: mod.progress + "%" }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 w-max px-3 py-1.5 rounded-lg">
                      <Lock className="w-3 h-3 mr-1.5" /> Bloqueado
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


