"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ChevronLeft, Users, BookOpen, Loader2, ChevronDown,
  ChevronUp, School, LogOut, Trophy, Clock, Activity
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LessonProgress {
  lesson_id: number;
  exercises_done: number;
  last_activity: string | null;
}

interface Student {
  student_id: number;
  username: string;
  email: string;
  joined_at: string;
  total_exercises_completed: number;
  last_activity: string | null;
  lessons: LessonProgress[];
}

interface ClassroomData {
  classroom: { id: number; name: string; code: string };
  students: Student[];
}

function ProgressBadge({ count }: { count: number }) {
  if (count === 0) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 border border-slate-600/40">
      Sin iniciar
    </span>
  );
  if (count < 10) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
      En progreso
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
      Activo
    </span>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });
}

export default function ClassroomDetail() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<ClassroomData | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [inviteMsg, setInviteMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setInviteMsg(null);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`/api/classroom/${id}/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: inviteEmail })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al invitar al estudiante');
      setInviteMsg({ type: 'success', text: 'Invitación enviada correctamente' });
      setInviteEmail('');
    } catch (err: any) {
      setInviteMsg({ type: 'error', text: err.message });
    } finally {
      setInviting(false);
    }
  };

  useEffect(() => {
    if (!loading && (!user || user.role !== "profesor")) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== "profesor" || !id) return;
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(`/api/classroom/${id}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener los datos de la clase.");
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [user, id]);

  if (loading || !user) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;

  const avgCompleted = data?.students.length
    ? Math.round(data.students.reduce((s, st) => s + st.total_exercises_completed, 0) / data.students.length)
    : 0;

  const mostActive = data?.students.length
    ? data.students.reduce((best, s) => s.total_exercises_completed > best.total_exercises_completed ? s : best, data.students[0])
    : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-300 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition-all duration-300">
            <span className="font-bold text-slate-900 dark:text-white text-lg leading-none group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">Py</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hidden sm:block group-hover:brightness-125 transition-all duration-300">
            PyLearn – Panel Profesor
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700/50">
            <School className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{user.username}</span>
          </div>
          <ThemeToggle />
          <button onClick={logout} className="p-2 text-slate-500 dark:text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <button
          onClick={() => router.push("/profesor")}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Volver a mis clases
        </button>

        {fetching ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-32 text-red-400">{error}</div>
        ) : data ? (
          <>
            {/* Encabezado de la clase */}
            <div className="mb-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{data.classroom.name}</h2>
                  <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-sm font-mono font-bold px-3 py-1 rounded-lg tracking-widest">
                    {data.classroom.code}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">Progreso detallado de los estudiantes inscritos en esta clase.</p>
              </div>

              {/* Formulario de invitación */}
              <form onSubmit={handleInvite} className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-4 min-w-[300px]">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Invitar Estudiante</h3>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="correo@estudiante.com"
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 w-full"
                  />
                  <button
                    type="submit"
                    disabled={inviting || !inviteEmail.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Invitar"}
                  </button>
                </div>
                {inviteMsg && (
                  <p className={`text-xs mt-2 ${inviteMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {inviteMsg.text}
                  </p>
                )}
              </form>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-500/15 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.students.length}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Estudiantes inscritos</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{avgCompleted}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Promedio de ejercicios completados</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-500/15 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white truncate">{mostActive?.username ?? "—"}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Estudiante más activo</p>
                </div>
              </div>
            </div>

            {/* Tabla de estudiantes */}
            <section>
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Detalle por estudiante
              </h3>

              {data.students.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-16 text-center">
                  <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Ningún estudiante se ha unido a esta clase aún.</p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">Comparte el código <span className="font-mono text-indigo-400">{data.classroom.code}</span> para que se inscriban.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.students
                    .sort((a, b) => b.total_exercises_completed - a.total_exercises_completed)
                    .map((student, idx) => {
                      const isExpanded = expandedStudent === student.student_id;
                      return (
                        <div
                          key={student.student_id}
                          className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                        >
                          {/* Fila principal */}
                          <div
                            className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-100 dark:bg-slate-800/40 transition-colors"
                            onClick={() => setExpandedStudent(isExpanded ? null : student.student_id)}
                          >
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-slate-900 dark:text-white font-bold text-sm shrink-0">
                                #{idx + 1}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-900 dark:text-white truncate">{student.username}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 truncate">{student.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 shrink-0 ml-4">
                              <div className="text-right hidden sm:block">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">{student.total_exercises_completed}</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-500">ejercicios</p>
                              </div>
                              <div className="hidden md:block">
                                <ProgressBadge count={student.total_exercises_completed} />
                              </div>
                              <div className="text-right hidden lg:block">
                                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  <span>{formatDate(student.last_activity).split(",")[0]}</span>
                                </div>
                              </div>
                              {isExpanded
                                ? <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                                : <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-500" />
                              }
                            </div>
                          </div>

                          {/* Detalle expandido */}
                          {isExpanded && (
                            <div className="border-t border-slate-300 dark:border-slate-800 px-5 pb-5 pt-4 bg-slate-50 dark:bg-slate-950/40">
                              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500 mb-3">
                                Lecciones con progreso registrado
                              </p>
                              {student.lessons.length === 0 ? (
                                <p className="text-slate-500 dark:text-slate-500 text-sm">Este estudiante aún no ha completado ningún ejercicio.</p>
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {student.lessons.map((lesson) => (
                                    <div
                                      key={lesson.lesson_id}
                                      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3"
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-mono text-indigo-400">Lección #{lesson.lesson_id}</span>
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">{lesson.exercises_done} ej.</span>
                                      </div>
                                      {lesson.last_activity && (
                                        <p className="text-[10px] text-slate-600 truncate">{formatDate(lesson.last_activity)}</p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="mt-4 flex items-center gap-4 pt-3 border-t border-slate-300 dark:border-slate-800">
                                <p className="text-xs text-slate-500 dark:text-slate-500">
                                  Inscrito el {formatDate(student.joined_at)}
                                </p>
                                <span className="text-slate-700">·</span>
                                <p className="text-xs text-slate-500 dark:text-slate-500">
                                  Última actividad: {formatDate(student.last_activity)}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
