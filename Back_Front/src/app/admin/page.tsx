"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LogOut, ShieldAlert, Users, BookOpen, Code, Trash2, Ban,
  CheckCircle, XCircle, ChevronDown, ChevronRight, PenSquare,
  Save, X, Plus, Loader2, Eye, ArrowLeft, AlertTriangle,
  GitBranch, Layers, Cpu, Database
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
type Tab = "users" | "catalog";
/* ------------------------------------------------------------------ */
/* TYPES                                                                */
/* ------------------------------------------------------------------ */
interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
}

interface ModuleItem {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  color_gradient: string;
  is_locked: boolean;
}

interface LessonSummary { id: number; title: string; module_id: number; order_index: number; }

interface Exercise {
  id: number;
  title: string;
  difficulty: string;
  difficulty_color: string;
  instructions: string;
  initial_code: string;
  output_check: string | null;
  test_code: string | null;
  hint: string | null;
  solution_code: string | null;
  order_index: number;
}

interface LessonDetail extends LessonSummary { theory: string; exercises: Exercise[]; }

/* ------------------------------------------------------------------ */
/* CONFIRM MODAL                                                         */
/* ------------------------------------------------------------------ */
function ConfirmModal({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
          <p className="text-slate-900 dark:text-slate-200 text-sm">{msg}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:border-slate-500 transition-colors text-sm">Cancelar</button>
          <button onClick={onConfirm} className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors text-sm">Confirmar</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* USERS TAB                                                            */
/* ------------------------------------------------------------------ */
function UsersTab({ token }: { token: string }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<null | { msg: string; action: () => void }>(null);
  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setUsers(await res.json());
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const toggleBan = async (u: AdminUser) => {
    const action = async () => {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: u.id, is_active: !u.is_active }),
      });
      setConfirm(null);
      fetchUsers();
    };
    setConfirm({ msg: `¿${u.is_active ? "Banear" : "Desbanear"} a "${u.username}"?`, action });
  };

  const deleteUser = async (u: AdminUser) => {
    const action = async () => {
      await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: u.id }),
      });
      setConfirm(null);
      fetchUsers();
    };
    setConfirm({ msg: `¿Eliminar permanentemente a "${u.username}"? Esta acción no se puede deshacer.`, action });
  };

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const roleBadge = (role: string) => {
    const map: Record<string, string> = {
      admin: "bg-red-500/20 text-red-400 border-red-500/30",
      profesor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      estudiante: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    };
    return map[role] || "bg-slate-500/20 text-slate-500 dark:text-slate-400 border-slate-500/30";
  };

  return (
    <div>
      {confirm && <ConfirmModal msg={confirm.msg} onConfirm={confirm.action} onCancel={() => setConfirm(null)} />}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gestión de Usuarios</h2>
        <span className="text-sm text-slate-500 dark:text-slate-500">{users.length} usuarios registrados</span>
      </div>

      <input
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Buscar por nombre, email o rol..."
        className="w-full mb-4 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500/50 transition-colors"
      />

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-red-400 animate-spin" /></div>
      ) : (
        <div className="space-y-2">
          {filtered.map(u => (
            <div key={u.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${u.is_active ? "bg-white dark:bg-slate-900/60 border-slate-300 dark:border-slate-800" : "bg-red-950/20 border-red-900/40 opacity-70"}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white shrink-0">
                {u.username[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{u.username}</span>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-bold ${roleBadge(u.role)}`}>{u.role}</span>
                  {!u.is_active && <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-red-500/20 text-red-400 border-red-500/30 font-bold">BANEADO</span>}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 truncate">{u.email}</p>
              </div>
              <div className="hidden sm:block text-xs text-slate-600 text-right shrink-0">
                <div>Registro: {new Date(u.date_joined).toLocaleDateString()}</div>
                <div>Último: {u.last_login ? new Date(u.last_login).toLocaleDateString() : "—"}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleBan(u)}
                  title={u.is_active ? "Banear usuario" : "Desbanear usuario"}
                  className={`p-2 rounded-lg border transition-all ${u.is_active ? "border-yellow-700/50 text-yellow-500 hover:bg-yellow-500/10" : "border-emerald-700/50 text-emerald-500 hover:bg-emerald-500/10"}`}
                >
                  {u.is_active ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                </button>
                {u.role !== 'admin' && (
                  <button onClick={() => deleteUser(u)} title="Eliminar usuario" className="p-2 rounded-lg border border-red-800/50 text-red-500 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CATALOG TAB                                                          */
/* ------------------------------------------------------------------ */
function CatalogTab({ token }: { token: string }) {
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [editingLesson, setEditingLesson] = useState<LessonDetail | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/curriculum?type=modules", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setModules);
  }, [token]);

  const loadLessons = async (moduleId: number) => {
    if (expandedModule === moduleId) { setExpandedModule(null); return; }
    setExpandedModule(moduleId);
    const res = await fetch(`/api/admin/curriculum?type=lessons&moduleId=${moduleId}`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setLessons(prev => {
      const others = prev.filter(l => l.module_id !== moduleId);
      return [...others, ...data];
    });
  };

  const openLesson = async (lessonId: number) => {
    const res = await fetch(`/api/admin/curriculum?type=lesson&lessonId=${lessonId}`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    data.exercises = (data.exercises || []).sort((a: Exercise, b: Exercise) => a.order_index - b.order_index);
    setEditingLesson(data);
  };

  const saveLesson = async () => {
    if (!editingLesson) return;
    setSaving(true);
    await fetch("/api/admin/curriculum", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ table: "lessons", id: editingLesson.id, data: { title: editingLesson.title, theory: editingLesson.theory } }),
    });
    setSaving(false);
  };

  const saveExercise = async (ex: Exercise) => {
    setSaving(true);
    await fetch("/api/admin/curriculum", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        table: "exercises", id: ex.id,
        data: { title: ex.title, instructions: ex.instructions, initial_code: ex.initial_code, hint: ex.hint, output_check: ex.output_check, test_code: ex.test_code, solution_code: ex.solution_code }
      }),
    });
    setSaving(false);
  };

  const getIcon = (name: string) => {
    switch(name) {
      case 'Code': return <Code className="w-8 h-8 text-blue-400" />;
      case 'GitBranch': return <GitBranch className="w-8 h-8 text-emerald-400" />;
      case 'Layers': return <Layers className="w-8 h-8 text-orange-400" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-rose-400" />;
      case 'Database': return <Database className="w-8 h-8 text-red-400" />;
      default: return <BookOpen className="w-8 h-8 text-slate-900 dark:text-white" />;
    }
  };

  if (editingLesson) {
    return (
      <div>
        <button onClick={() => setEditingLesson(null)} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white mb-6 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </button>
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="flex-1">
            <label className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1 block">Título de la lección</label>
            <input
              value={editingLesson.title}
              onChange={e => setEditingLesson({ ...editingLesson, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-lg font-bold focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>
          <button onClick={saveLesson} disabled={saving} className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all shrink-0">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Guardar
          </button>
        </div>

        <div className="mb-8">
          <label className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1 block">Teoría (Markdown)</label>
          <textarea
            value={editingLesson.theory}
            onChange={e => setEditingLesson({ ...editingLesson, theory: e.target.value })}
            rows={10}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm font-mono focus:outline-none focus:border-red-500/50 transition-colors resize-y"
          />
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><Code className="w-5 h-5 text-red-400" /> Ejercicios ({editingLesson.exercises.length})</h3>
        <div className="space-y-4">
          {editingLesson.exercises.map((ex, idx) => (
            <ExerciseCard key={ex.id} exercise={ex} idx={idx} onSave={saveExercise} saving={saving}
              onChange={(updated) => setEditingLesson({
                ...editingLesson,
                exercises: editingLesson.exercises.map(e => e.id === updated.id ? updated : e)
              })}
            />
          ))}
        </div>
      </div>
    );
  }

  if (expandedModule) {
    const mod = modules.find(m => m.id === expandedModule);
    return (
      <div>
        <button onClick={() => setExpandedModule(null)} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white mb-6 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a los módulos
        </button>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mod?.color_gradient} flex items-center justify-center`}>
            <div className="scale-75">{mod && getIcon(mod.icon_name)}</div>
          </div>
          Módulo {expandedModule}: {mod?.title}
        </h2>
        <div className="border border-slate-300 dark:border-slate-800 rounded-xl divide-y divide-slate-800/50 bg-white dark:bg-slate-900/40 overflow-hidden">
          {lessons.filter(l => l.module_id === expandedModule).map(l => (
            <button key={l.id} onClick={() => openLesson(l.id)}
              className="w-full flex items-center gap-3 px-6 py-4 hover:bg-slate-100 dark:bg-slate-800/60 transition-colors text-left group"
            >
              <span className="text-sm text-slate-500 dark:text-slate-500 font-mono w-8 shrink-0">#{l.id}</span>
              <span className="text-base text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:text-white transition-colors flex-1 font-semibold">{l.title}</span>
              <PenSquare className="w-5 h-5 text-slate-600 group-hover:text-red-400 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Catálogo de Módulos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map(m => (
          <div
            key={m.id}
            onClick={() => loadLessons(m.id)}
            className="relative group rounded-2xl border transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 cursor-pointer"
          >
            <div className={`h-28 bg-gradient-to-br ${m.color_gradient} flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                {getIcon(m.icon_name)}
              </div>
            </div>

            <div className="p-6">
              <div className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-500 uppercase mb-2">Módulo {m.id}</div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-tight">{m.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{m.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExerciseCard({ exercise, idx, onSave, onChange, saving }: {
  exercise: Exercise; idx: number;
  onSave: (ex: Exercise) => void;
  onChange: (ex: Exercise) => void;
  saving: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-800 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-4 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:bg-slate-800/60 transition-colors text-left">
        {open ? <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-500 shrink-0" />}
        <span className="text-xs text-slate-500 dark:text-slate-500 font-mono shrink-0">{idx + 1}.</span>
        <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{exercise.title}</span>
        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-bold ${
          exercise.difficulty_color === 'green' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
          exercise.difficulty_color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
          'bg-red-500/20 text-red-400 border-red-500/30'}`}>
          {exercise.difficulty}
        </span>
      </button>
      {open && (
        <div className="border-t border-slate-300 dark:border-slate-800 p-5 space-y-4 bg-slate-50 dark:bg-slate-950/40">
          <Field label="Título" value={exercise.title} onChange={v => onChange({ ...exercise, title: v })} />
          <Field label="Instrucciones" value={exercise.instructions} onChange={v => onChange({ ...exercise, instructions: v })} multiline />
          <Field label="Código Inicial" value={exercise.initial_code} onChange={v => onChange({ ...exercise, initial_code: v })} multiline mono />
          <Field label="Pista (hint)" value={exercise.hint || ""} onChange={v => onChange({ ...exercise, hint: v })} multiline />
          <Field label="output_check (regex)" value={exercise.output_check || ""} onChange={v => onChange({ ...exercise, output_check: v })} />
          <Field label="test_code (Python)" value={exercise.test_code || ""} onChange={v => onChange({ ...exercise, test_code: v })} multiline mono />
          <Field label="Código de Solución (Visible solo para Admin)" value={exercise.solution_code || ""} onChange={v => onChange({ ...exercise, solution_code: v })} multiline mono />
          <button onClick={() => onSave(exercise)} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all">
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Guardar ejercicio
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, multiline, mono }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; mono?: boolean }) {
  return (
    <div>
      <label className="text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1 block">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={4}
          className={`w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm focus:outline-none focus:border-red-500/50 transition-colors resize-y ${mono ? "font-mono" : ""}`} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 text-sm focus:outline-none focus:border-red-500/50 transition-colors" />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN ADMIN PAGE                                                      */
/* ------------------------------------------------------------------ */
export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("users");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.push("/login");
    if (typeof window !== "undefined") setToken(localStorage.getItem("access_token") || "");
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "users", label: "Gestión de Usuarios", icon: <Users className="w-4 h-4" /> },
    { id: "catalog", label: "Catálogo de Lecciones", icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans">
      {/* Header */}
      <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-300 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50 shrink-0">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <span className="font-bold text-white text-lg leading-none">Py</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-sky-600 dark:from-white dark:via-slate-200 dark:to-sky-400 bg-clip-text text-transparent hidden sm:block group-hover:brightness-110 transition-all">
            Py<span className="text-sky-500 dark:text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.2)] dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">Learn</span>
            <span className="text-xs font-medium ml-2 text-slate-400 dark:text-slate-500 uppercase tracking-wider">Admin</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-700/50">
            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{user.username}</span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/30 font-bold">Admin</span>
          </div>
          <ThemeToggle />
          <button onClick={logout} className="p-2 text-slate-500 dark:text-slate-500 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-full transition-colors" title="Cerrar Sesión">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-12 flex-1 w-full">
        {/* Hero Banner */}
        <div className="relative rounded-2xl bg-emerald-900/20 border border-emerald-500/20 p-6 mb-8 overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-3">
                Control Total <ShieldAlert className="w-7 h-7 text-emerald-500" />
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg">Bienvenido al panel de control supremo de PyLearn. Gestiona usuarios, edita lecciones y personaliza los ejercicios en tiempo real.</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-300 dark:border-slate-800 pb-0">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-xl transition-all border-b-2 -mb-px ${
                tab === t.id
                  ? "text-blue-400 border-blue-500 bg-blue-500/5"
                  : "text-slate-500 dark:text-slate-500 border-transparent hover:text-slate-700 dark:text-slate-300"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "users" && <UsersTab token={token} />}
        {tab === "catalog" && <CatalogTab token={token} />}
      </main>
      <Footer />
    </div>
  );
}
