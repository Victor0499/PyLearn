"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, GraduationCap, BookOpen } from "lucide-react";
import { Suspense } from "react";

type Stage = "loading" | "role_select" | "completing" | "error";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<Stage>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [googleAccessToken, setGoogleAccessToken] = useState("");
  const [selectedRole, setSelectedRole] = useState<"estudiante" | "profesor" | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (error) {
        setErrorMsg("Inicio de sesión con Google cancelado.");
        setStage("error");
        setTimeout(() => router.push("/login"), 2500);
        return;
      }

      if (!code) {
        setErrorMsg("No se recibió el código de autorización de Google.");
        setStage("error");
        setTimeout(() => router.push("/login"), 2500);
        return;
      }

      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error en autenticación");

        if (data.isNewUser) {
          // Usuario nuevo: guardar token y pedir rol y usuario
          setGoogleAccessToken(data.googleAccessToken);
          
          // Pre-cargar sugerencia de nombre de usuario desde el email
          const baseName = data.email ? data.email.split("@")[0] : "";
          const sanitizedName = baseName.replace(/[^a-zA-Z0-9_]/g, "");
          setUsername(sanitizedName);
          
          setStage("role_select");
        } else {
          // Usuario existente: iniciar sesión directamente
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          localStorage.setItem("user", JSON.stringify(data.user));
          window.location.href = data.user.role === 'admin' ? '/admin' : data.user.role === 'profesor' ? '/profesor' : '/';
        }
      } catch (err) {
        setErrorMsg((err as Error).message);
        setStage("error");
        setTimeout(() => router.push("/login"), 3000);
      }
    };
    handleCallback();
  }, [router, searchParams]);

  const handleCompleteRegistration = async () => {
    if (!selectedRole) return;
    if (!username.trim()) {
      setErrorMsg("Por favor, ingresa un nombre de usuario.");
      return;
    }
    
    setErrorMsg("");
    setStage("completing");

    try {
      const res = await fetch("/api/auth/google/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleAccessToken, role: selectedRole, username: username.trim() })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al completar el registro");

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = data.user.role === 'profesor' ? '/profesor' : '/';
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStage("role_select"); // Regresamos al selector para corregir el nombre de usuario
    }
  };

  // ─── UI: cargando ────────────────────────────────────────────
  if (stage === "loading" || stage === "completing") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-900 dark:text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <h2 className="text-xl font-semibold">
            {stage === "completing" ? "Creando tu cuenta..." : "Completando inicio de sesión..."}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Por favor espera un momento.</p>
        </div>
      </div>
    );
  }

  // ─── UI: error ───────────────────────────────────────────────
  if (stage === "error") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-900 dark:text-white">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center max-w-sm">
          <p className="font-semibold mb-2">Error de Autenticación</p>
          <p className="text-sm">{errorMsg}</p>
          <p className="text-xs mt-3 text-slate-500 dark:text-slate-500">Redirigiendo a login...</p>
        </div>
      </div>
    );
  }

  // ─── UI: selección de rol ────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg shadow-blue-500/25">
            <GraduationCap className="w-7 h-7 text-slate-900 dark:text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">¡Bienvenido a PyLearn!</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Antes de continuar, dinos cómo vas a usar la plataforma</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Estudiante */}
          <button
            onClick={() => setSelectedRole("estudiante")}
            className={`relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              selectedRole === "estudiante"
                ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                : "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 hover:border-slate-600 hover:bg-slate-100 dark:bg-slate-800"
            }`}
          >
            {selectedRole === "estudiante" && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-slate-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole === "estudiante" ? "bg-blue-500/20" : "bg-slate-200 dark:bg-slate-700"}`}>
              <BookOpen className={`w-6 h-6 ${selectedRole === "estudiante" ? "text-blue-400" : "text-slate-500 dark:text-slate-400"}`} />
            </div>
            <div className="text-center">
              <p className={`font-semibold text-sm ${selectedRole === "estudiante" ? "text-blue-400" : "text-slate-700 dark:text-slate-300"}`}>Estudiante</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Aprendo Python</p>
            </div>
          </button>

          {/* Profesor */}
          <button
            onClick={() => setSelectedRole("profesor")}
            className={`relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
              selectedRole === "profesor"
                ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                : "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 hover:border-slate-600 hover:bg-slate-100 dark:bg-slate-800"
            }`}
          >
            {selectedRole === "profesor" && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-slate-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole === "profesor" ? "bg-emerald-500/20" : "bg-slate-200 dark:bg-slate-700"}`}>
              <GraduationCap className={`w-6 h-6 ${selectedRole === "profesor" ? "text-emerald-400" : "text-slate-500 dark:text-slate-400"}`} />
            </div>
            <div className="text-center">
              <p className={`font-semibold text-sm ${selectedRole === "profesor" ? "text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>Profesor</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Enseño Python</p>
            </div>
          </button>
        </div>

        {/* Nombre de Usuario */}
        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Nombre de Usuario
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errorMsg) setErrorMsg("");
            }}
            placeholder="Elige tu nombre de usuario"
            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            required
          />
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            Este nombre identificará tu perfil y soluciones de código.
          </p>
        </div>

        <button
          onClick={handleCompleteRegistration}
          disabled={!selectedRole || !username.trim()}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200"
        >
          Continuar como {selectedRole ? (selectedRole === "estudiante" ? "Estudiante" : "Profesor") : "..."}
        </button>

        <p className="text-center text-xs text-slate-600 mt-4">
          Podrás cambiar esto más adelante desde tu perfil
        </p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
