"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePyodide } from "@/hooks/usePyodide";
import CodeEditor from "@/components/CodeEditor";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { Play, CheckCircle, Circle, Terminal, BookOpen, AlertCircle, LogOut, GraduationCap, School, Lock, Trophy, XCircle, X, Menu, ArrowLeft, ChevronRight, ChevronsRight, ChevronsLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";







function DifficultyBadge({ color, label }: { color: string; label: string }) {
  const map: Record<string, string> = {
    green: "bg-green-500/15 text-green-400 border-green-500/30",
    yellow: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    red: "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${map[color]}`}>{label}</span>;
}

function LearnContent({ lessons }: { lessons: any[] }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { isReady, runCode } = usePyodide();
  const { saveProgress } = useProgress();

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeExercise, setActiveExercise] = useState(0);
  const [allCodes, setAllCodes] = useState<string[][]>([]);
  const [allOutputs, setAllOutputs] = useState(() => lessons.map((l: any) => l.exercises.map(() => "")));
  const [allErrors, setAllErrors] = useState(() => lessons.map((l: any) => l.exercises.map(() => "")));
  const [allSuccesses, setAllSuccesses] = useState<boolean[][]>([]);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(() => lessons.map((l: any) => l.exercises.map(() => false)));
  const [errorModal, setErrorModal] = useState<{ title: string; message: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [mobileView, setMobileView] = useState<'theory' | 'exercises'>('theory');
  const [tabNeedsScroll, setTabNeedsScroll] = useState(false);
  const [tabScrollEnd, setTabScrollEnd] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = tabsRef.current;
    const btn = tabBtnRefs.current[activeExercise];
    if (container && btn) {
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.clientWidth;
      const target = btnLeft - containerWidth / 2 + btnWidth / 2;
      container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }
  }, [activeExercise]);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);

  useEffect(() => {
    if (tabsRef.current) {
      const el = tabsRef.current;
      const needs = el.scrollWidth > el.clientWidth;
      setTabNeedsScroll(needs);
      setTabScrollEnd(!needs);
    }
  }, [activeLessonIdx]);

  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch("/api/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          localStorage.clear();
          router.push("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to load progress");
        const data = await res.json();

        const restored = lessons.map(l => l.exercises.map(() => user.role === 'admin'));
        const restoredCodes = lessons.map((l: any) => l.exercises.map((e: any) => (user.role === 'admin' && e.solutionCode) ? e.solutionCode : e.initialCode));
        data.forEach((p: { lesson_id: number; exercise_id: number; completed: boolean; code_snapshot: string }) => {
          for (let li = 0; li < lessons.length; li++) {
            for (let ei = 0; ei < lessons[li].exercises.length; ei++) {
              if (lessons[li].id === p.lesson_id && lessons[li].exercises[ei].id === p.exercise_id && p.completed) {
                restored[li][ei] = true;
                if (p.code_snapshot) restoredCodes[li][ei] = p.code_snapshot;
              }
            }
          }
        });
        setAllSuccesses(restored);
        setAllCodes(restoredCodes);

        if (user.role !== 'admin') {
          let foundIncomplete = false;
          for (let li = 0; li < lessons.length; li++) {
            for (let ei = 0; ei < lessons[li].exercises.length; ei++) {
              if (!restored[li][ei]) {
                setActiveLessonIdx(li);
                setActiveExercise(ei);
                foundIncomplete = true;
                break;
              }
            }
            if (foundIncomplete) break;
          }
        }

        setProgressLoaded(true);
      } catch (err) {
        console.error("Error loading progress:", err);
        setAllSuccesses(lessons.map(l => l.exercises.map(() => user.role === 'admin')));
        setAllCodes(lessons.map((l: any) => l.exercises.map((e: any) => (user.role === 'admin' && e.solutionCode) ? e.solutionCode : e.initialCode)));
        setProgressLoaded(true);
      }
    };

    loadProgress();
  }, [user]);

  if (loading || !user || allCodes.length === 0) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />
  );

  const lesson = lessons[activeLessonIdx];
  const exercises = lesson.exercises;
  const currentEx = exercises[activeExercise];
  const codes = allCodes[activeLessonIdx];
  const outputs = allOutputs[activeLessonIdx];
  const errors = allErrors[activeLessonIdx];
  const successes = allSuccesses[activeLessonIdx];
  const completedCount = successes.filter(Boolean).length;

  const switchLesson = (idx: number) => {
    setActiveLessonIdx(idx);
    setActiveExercise(0);
    tabBtnRefs.current = [];
    setIsSidebarOpen(false);
    setMobileView('theory');
  };

  const updateLessonState = (setter: any, updater: (arr: any[]) => any[]) => {
    setter((prev: any[][]) => { const n = prev.map(a => [...a]); n[activeLessonIdx] = updater(n[activeLessonIdx]); return n; });
  };

  const handleRun = async () => {
    setRunning(true);
    const result = await runCode(codes[activeExercise], currentEx.testCode || "");
    const out = result.output?.trim() || "";

    updateLessonState(setAllOutputs, a => { a[activeExercise] = result.output || ""; return a; });
    updateLessonState(setAllErrors, a => { a[activeExercise] = result.error || ""; return a; });

    if (result.error) {
      const raw = result.error;
      let title = "¡Ups! Algo salió mal", message = raw;
      if (raw.includes("AssertionError:")) {
        title = "❌ Ejercicio incorrecto";
        const m = raw.match(/AssertionError: (.+)/); message = m ? m[1] : "Respuesta incorrecta.";
      } else if (raw.includes("SyntaxError:")) {
        title = "⚠️ Error de Sintaxis";
        const m = raw.match(/SyntaxError: (.+)/); message = `Error de escritura: ${m?.[1] || ""}.\nRevisa paréntesis y comillas.`;
      } else if (raw.includes("NameError:")) {
        title = "🔍 Variable no encontrada";
        const m = raw.match(/NameError: (.+)/); message = `${m?.[1] || raw}.\nDefine todas las variables correctamente.`;
      }
      setErrorModal({ title, message });
      updateLessonState(setAllSuccesses, a => { a[activeExercise] = false; return a; });
    } else if (currentEx.outputCheck) {
      if (out === currentEx.outputCheck) {
        updateLessonState(setAllSuccesses, a => { a[activeExercise] = true; return a; });
        saveProgress(lesson.id, currentEx.id, codes[activeExercise]);
      } else {
        setErrorModal({ title: "❌ El mensaje no coincide", message: `Esperado:\n'${currentEx.outputCheck}'\n\nObtenido:\n'${out}'\n\nRevisa mayúsculas y espacios.` });
        updateLessonState(setAllSuccesses, a => { a[activeExercise] = false; return a; });
      }
    } else {
      updateLessonState(setAllSuccesses, a => { a[activeExercise] = true; return a; });
      saveProgress(lesson.id, currentEx.id, codes[activeExercise]);
    }
    setRunning(false);
  };

  const codeComponents: any = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" className="rounded-md" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-orange-200 dark:border-slate-700/50" {...props}>{children}</code>
      );
    }
  };

  return (
    <div className="flex h-[100dvh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans overflow-hidden">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-black dark:border-slate-800 flex flex-col shrink-0 transform transition-all duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isDesktopSidebarOpen ? 'lg:w-72' : 'lg:w-0 lg:border-r-0 lg:overflow-hidden'} w-72`}>
        <div className="p-5 border-b border-black dark:border-slate-800 relative flex items-center justify-between min-w-[288px]">
          <Link href={user?.role === 'admin' ? '/admin' : user?.role === 'profesor' ? '/profesor' : '/dashboard'} className="inline-block hover:opacity-80 transition-opacity">
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-blue-400" /> Dashboard
            </h1>
          </Link>
          {/* Sidebar collapse button (mobile & desktop) */}
          <button
            onClick={() => { setIsDesktopSidebarOpen(false); setIsSidebarOpen(false); }}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 dark:bg-slate-300 dark:hover:bg-slate-200 transition-colors"
            title="Ocultar panel"
          >
            <ChevronsLeft className="w-4 h-4 text-slate-200 dark:text-slate-800" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-3">
          <div className="mb-4">
            {lessons.map((l, idx) => {
              const done = allSuccesses[idx]?.filter(Boolean).length || 0;
              const total = l.exercises.length;
              const isActive = idx === activeLessonIdx;

              let isLocked = false;
              if (user.role === 'estudiante' && idx > 0) {
                const prevDone = allSuccesses[idx - 1]?.filter(Boolean).length || 0;
                const prevTotal = lessons[idx - 1].exercises.length;
                if (prevDone < prevTotal) {
                  isLocked = true;
                }
              }

              return (
                <button key={l.id}
                  onClick={() => !isLocked && switchLesson(idx)}
                  className={`w-full flex items-center px-4 py-3 transition-colors text-left ${isActive
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-2 border-blue-500'
                      : isLocked
                        ? 'opacity-50 cursor-not-allowed text-slate-400 dark:text-slate-600 bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-100 dark:hover:bg-slate-800/50'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-slate-800/50'
                    }`}>
                  {isLocked ? (
                    <Lock className="w-4 h-4 mr-3 shrink-0 text-slate-400 dark:text-slate-600" />
                  ) : done === total ? (
                    <CheckCircle className="w-4 h-4 mr-3 shrink-0 text-green-400" />
                  ) : (
                    <Circle className="w-4 h-4 mr-3 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium leading-snug">{l.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                      {isLocked ? 'Desbloquea la anterior' : `${done}/${total} ejercicios`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t border-black dark:border-slate-800">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500 mb-2">
            <span>Progreso lección</span>
            <span className="text-blue-400 font-medium">{completedCount}/{exercises.length}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(completedCount / exercises.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="py-2.5 lg:py-0 lg:h-14 bg-white dark:bg-slate-900 border-b border-black dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between px-4 lg:px-6 shrink-0 gap-2.5 lg:gap-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white shrink-0">
              <Menu className="w-5 h-5" />
            </button>
            {/* Desktop expand button — shown only when sidebar is hidden */}
            {!isDesktopSidebarOpen && (
              <button
                onClick={() => setIsDesktopSidebarOpen(true)}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 dark:bg-slate-300 dark:hover:bg-slate-200 transition-colors shrink-0"
                title="Mostrar panel"
              >
                <ChevronsRight className="w-4 h-4 text-slate-200 dark:text-slate-800" />
              </button>
            )}
            <h2 className="text-sm lg:text-base font-semibold leading-snug truncate lg:text-clip">{lesson.title}</h2>
          </div>
          <div className="flex items-center w-full lg:w-auto space-x-2 sm:space-x-3 shrink-0 pl-8 lg:pl-0">
            <div className="flex items-center text-xs">
              <div className={`w-2 h-2 rounded-full mr-1.5 ${isReady ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
              <span className="hidden sm:inline">{isReady ? 'Entorno Listo' : 'Inicializando...'}</span>
              <span className="sm:hidden text-[10px] text-slate-700 dark:text-slate-300">{isReady ? 'Listo' : 'Cargando'}</span>
            </div>
            <div className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
              {user.role === 'profesor' ? <School className="w-3.5 h-3.5 text-indigo-400 hidden sm:block shrink-0" /> : <GraduationCap className="w-3.5 h-3.5 text-blue-400 hidden sm:block shrink-0" />}
              <span className="text-[11px] sm:text-sm text-slate-700 dark:text-slate-300 font-medium truncate max-w-[60px] sm:max-w-[120px] shrink">{user.username}</span>
              <span className={`hidden sm:inline-block text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border ${user.role === 'profesor' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                {user.role === 'profesor' ? 'Profesor' : 'Estudiante'}
              </span>
            </div>
            <ThemeToggle />
            <button onClick={logout} className="flex items-center text-slate-500 dark:text-slate-500 hover:text-red-400 transition-colors text-xs ml-auto">
              <LogOut className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </header>

        {/* Mobile View Tabs */}
        <div className="flex lg:hidden border-b border-black dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <button
            onClick={() => setMobileView('theory')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${mobileView === 'theory' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-900/10' : 'border-transparent text-slate-500 dark:text-slate-400'}`}>
            Teoría
          </button>
          <button
            onClick={() => setMobileView('exercises')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${mobileView === 'exercises' ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-900/10' : 'border-transparent text-slate-500 dark:text-slate-400'}`}>
            Ejercicios
          </button>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Theory */}
          <div className={`${mobileView === 'theory' ? 'flex' : 'hidden'} lg:flex absolute inset-0 lg:static flex-col border-r border-black dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shrink-0 z-10 lg:z-0 transition-all duration-300 ${isDesktopSidebarOpen ? 'lg:w-[42%]' : 'lg:w-1/2'}`}>
            <div className="flex items-center px-6 py-3 border-b border-black dark:border-slate-800 bg-white dark:bg-slate-900/60">
              <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Teoría</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-slate dark:prose-invert prose-blue prose-sm max-w-none">
                <ReactMarkdown components={codeComponents}>{lesson.theory}</ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Exercises */}
          <div className={`${mobileView === 'exercises' ? 'flex' : 'hidden'} lg:flex absolute inset-0 lg:static lg:flex-1 flex-col bg-slate-50 dark:bg-slate-950 overflow-y-auto z-10 lg:z-0`}>
            {/* Tabs */}
            <div className="relative">
              <div ref={tabsRef} className="flex border-b border-black dark:border-slate-800 bg-white dark:bg-slate-900/60 shrink-0 overflow-x-auto"
                onWheel={(e) => {
                  e.preventDefault();
                  e.currentTarget.scrollLeft += e.deltaY;
                }}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  setTabScrollEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 5);
                }}>
                {exercises.map((ex: any, i: number) => (
                  <button key={ex.id} ref={(el) => { tabBtnRefs.current[i] = el; }} onClick={() => setActiveExercise(i)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap shrink-0 ${activeExercise === i ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-900/10' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}>
                    {successes[i] ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
                    Ejercicio {i + 1}
                  </button>
                ))}
              </div>
              {tabNeedsScroll && !tabScrollEnd && (
                <button
                  onClick={() => {
                    if (tabsRef.current) tabsRef.current.scrollLeft += 200;
                  }}
                  className="absolute top-1.5 right-1 w-8 h-8 rounded-lg flex items-center justify-center transition-all scale-110 bg-slate-100 dark:bg-slate-800"
                  style={{ filter: "drop-shadow(0 0 4px #F58400) drop-shadow(0 0 10px #F58400) drop-shadow(0 0 20px rgba(245,132,0,0.6))", zIndex: 10 }}
                >
                  <ChevronRight className="w-7 h-7" style={{ color: "#F58400" }} />
                </button>
              )}
            </div>

            {/* Instructions */}
            <div className="px-5 py-3 bg-white dark:bg-slate-900/40 border-b border-black dark:border-slate-800 shrink-0 overflow-y-auto max-h-[30vh] md:max-h-[40vh] lg:max-h-[35vh] custom-scrollbar">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{currentEx.title}</span>
                <DifficultyBadge color={currentEx.difficultyColor} label={currentEx.difficulty} />
              </div>
              <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-700 dark:text-slate-300">
                <ReactMarkdown components={codeComponents}>{currentEx.instructions}</ReactMarkdown>
              </div>
              <button onClick={() => { const nh = showHint.map(a => [...a]); nh[activeLessonIdx][activeExercise] = !nh[activeLessonIdx][activeExercise]; setShowHint(nh); }}
                className="mt-1 text-xs text-amber-600 dark:text-yellow-500/70 hover:text-amber-700 dark:hover:text-yellow-400 transition-colors">
                {showHint[activeLessonIdx][activeExercise] ? '▲ Ocultar pista' : '💡 Ver pista'}
              </button>
              {showHint[activeLessonIdx][activeExercise] && (
                <div className="mt-2 text-xs text-amber-800 dark:text-yellow-400/80 bg-amber-50 dark:bg-yellow-500/5 border border-amber-300 dark:border-yellow-500/20 rounded-lg px-3 py-2 font-medium">{currentEx.hint}</div>
              )}
            </div>

            {/* Editor toolbar */}
            <div className="flex items-center justify-end px-4 py-2 bg-white dark:bg-slate-900 border-b border-black dark:border-slate-800 shrink-0">
              <button onClick={handleRun} disabled={!isReady || running}
                className="flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-medium rounded-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all">
                {running ? <div className="w-3.5 h-3.5 mr-1.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
                Ejecutar y Verificar
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col min-h-[300px] relative">
              <CodeEditor code={codes[activeExercise]}
                onChange={(v: string | undefined) => { const n = allCodes.map(a => [...a]); n[activeLessonIdx][activeExercise] = v || ""; setAllCodes(n); }}
                disabled={!isReady} />
            </div>

            {/* Terminal */}
            <div className="h-28 lg:h-36 bg-slate-900 dark:bg-black border-t border-black dark:border-slate-800 p-3 font-mono text-xs overflow-y-auto shrink-0">
              <div className="flex items-center text-slate-400 mb-1.5">
                <Terminal className="w-3.5 h-3.5 mr-1.5" /><span>Salida de Consola</span>
              </div>
              {outputs[activeExercise] && <div className="text-green-400 whitespace-pre-wrap">{outputs[activeExercise]}</div>}
              {errors[activeExercise] && <div className="text-red-400 whitespace-pre-wrap border-l-2 border-red-500 pl-2 mt-1">{errors[activeExercise]}</div>}
              {successes[activeExercise] && (
                <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" />¡Ejercicio completado correctamente!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <XCircle className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center mb-3">{errorModal.title}</h3>
            <div className="bg-slate-100 dark:bg-slate-800/80 border border-black dark:border-slate-700 rounded-xl p-4 mb-5">
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">{errorModal.message}</p>
            </div>
            <p className="text-slate-500 dark:text-slate-500 text-xs text-center mb-5">💡 Usa el botón <span className="text-amber-600 dark:text-yellow-400">"Ver pista"</span> si necesitas ayuda.</p>
            <button onClick={() => setErrorModal(null)}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-black dark:border-slate-600 text-slate-900 dark:text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
              <X className="w-4 h-4" />Cerrar e Intentar de Nuevo
            </button>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {completedCount === exercises.length && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 border border-black dark:border-slate-700 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
              <Trophy className="w-8 h-8 text-slate-900 dark:text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">¡Felicidades!</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Completaste todos los ejercicios de <strong className="text-slate-900 dark:text-white">"{lesson.title}"</strong>.</p>
            <button onClick={() => updateLessonState(setAllSuccesses, a => a.map(() => false))}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all">
              Seguir Practicando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LearnPageWrapper() {
  const searchParams = useSearchParams();
  const modId = searchParams.get('moduleId') || '1';

  const [lessons, setLessons] = useState<any[] | null>(null);

  useEffect(() => {
    fetch(`/api/curriculum?moduleId=${modId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLessons(data);
        } else {
          console.error("Error loading lessons", data);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [modId]);

  if (!lessons) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-500">Cargando módulo desde base de datos...</div>;
  }

  return <LearnContent key={modId} lessons={lessons} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-500">Cargando módulo...</div>}>
      <LearnPageWrapper />
    </Suspense>
  );
}

