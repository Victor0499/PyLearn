"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  School, LogOut, Plus, Copy, Check, Users, ChevronRight,
  BookOpen, Loader2, X
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

interface Classroom {
  id: number;
  name: string;
  code: string;
  created_at: string;
  student_count: number;
}

export default function ProfesorDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [classes, setClasses] = useState<Classroom[]>([]);
  const [fetching, setFetching] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal "Nueva Clase"
  const [showModal, setShowModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "profesor")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || user.role !== "profesor") return;
    const fetchClasses = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch("/api/classroom", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setClasses(data);
        }
      } finally {
        setFetching(false);
      }
    };
    fetchClasses();
  }, [user]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateClass = async () => {
    if (!newClassName.trim()) {
      setCreateError("El nombre de la clase no puede estar vacío.");
      return;
    }
    setCreating(true);
    setCreateError("");
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch("/api/classroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newClassName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCreateError(data.error || "Error al crear la clase.");
      } else {
        setClasses((prev) => [data, ...prev]);
        setShowModal(false);
        setNewClassName("");
      }
    } catch {
      setCreateError("Error de conexión. Intenta de nuevo.");
    } finally {
      setCreating(false);
    }
  };

  if (loading || !user) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      {/* Navbar / Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-sky-500 to-indigo-500 text-white p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">PyLearn</span>
            <span className="px-2 py-0.5 ml-2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              Profesor
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          <button
            onClick={logout}
            className="p-2 text-slate-500 dark:text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-10 flex-1 w-full">
        {/* Banner de bienvenida */}
        <div className="relative rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/30 border border-indigo-500/20 p-8 mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Bienvenido, <span className="text-indigo-400">{user.username}</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Desde aquí puedes gestionar tus clases y monitorear el progreso de tus estudiantes.
              </p>
              <div className="flex gap-6 mt-5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{classes.length}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Clases activas</p>
                </div>
                <div className="w-px bg-slate-200 dark:bg-slate-700" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalStudents}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Estudiantes totales</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => { setShowModal(true); setCreateError(""); setNewClassName(""); }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 shrink-0"
            >
              <Plus className="w-5 h-5" />
              Nueva Clase
            </button>
          </div>
        </div>

        {/* Lista de clases */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200 mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Mis Clases
          </h3>

          {fetching ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            </div>
          ) : classes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-16 text-center">
              <School className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">Aún no has creado ninguna clase</p>
              <p className="text-slate-500 dark:text-slate-500 text-sm">Haz clic en &quot;Nueva Clase&quot; para empezar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="group bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5"
                >
                  {/* Nombre */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{cls.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        Creada {new Date(cls.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                      <Users className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{cls.student_count}</span>
                    </div>
                  </div>

                  {/* Código de invitación */}
                  <div className="bg-slate-100 dark:bg-slate-800/80 rounded-xl p-3 mb-5">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-2">Código de invitación</p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-2xl font-bold tracking-[0.3em] text-indigo-400 font-mono">
                        {cls.code}
                      </span>
                      <button
                        onClick={() => handleCopyCode(cls.code)}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/40 border border-indigo-500/30 transition-colors"
                      >
                        {copiedCode === cls.code ? (
                          <><Check className="w-3.5 h-3.5" /> Copiado</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copiar</>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Botón ver clase */}
                  <button
                    onClick={() => router.push(`/profesor/clase/${cls.id}`)}
                    className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-700 py-2.5 rounded-xl transition-all duration-200 group-hover:bg-indigo-600/20 group-hover:text-indigo-300 group-hover:border-indigo-500/30 border border-slate-300 dark:border-slate-700"
                  >
                    Ver progreso de la clase
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal Nueva Clase */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nueva Clase</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              Nombre de la clase
            </label>
            <input
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateClass()}
              placeholder="Ej. Programación I – Sección A"
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors mb-2"
              autoFocus
            />
            {createError && (
              <p className="text-red-400 text-sm mb-3">{createError}</p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-500 mb-6">
              Se generará automáticamente un código único de 6 caracteres para que tus estudiantes puedan unirse.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateClass}
                disabled={creating}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {creating ? "Creando..." : "Crear Clase"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
