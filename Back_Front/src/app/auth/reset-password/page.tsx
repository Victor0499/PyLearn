"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Key, Eye, EyeOff, CheckCircle } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Token de recuperación ausente o no válido.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Falta el token de recuperación en la URL.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al restablecer la contraseña");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">¡Contraseña restablecida!</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Tu contraseña ha sido actualizada con éxito. Ya puedes iniciar sesión con tu nueva credencial.
            </p>
          </div>
        </div>
        <Link
          href="/login"
          className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all text-sm text-center"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
        Ingresa tu nueva contraseña para acceder de nuevo a tu cuenta.
      </p>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Nueva Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            className="w-full px-4 py-2.5 pl-11 pr-11 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            required
            disabled={!token}
          />
          <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-500" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
            disabled={!token}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          Confirmar Nueva Contraseña
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite tu contraseña"
            className="w-full px-4 py-2.5 pl-11 pr-11 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            required
            disabled={!token}
          />
          <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-500" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
            disabled={!token}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !token}
        className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all mt-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Restablecer Contraseña"
        )}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg shadow-blue-500/30">
            <BookOpen className="w-8 h-8 text-slate-900 dark:text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            PyLearn Platform
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Aprende Python de forma interactiva</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Restablecer Contraseña</h2>

          <Suspense fallback={<div className="text-slate-500 dark:text-slate-400 text-sm text-center">Cargando formulario...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
