"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft, Mail, AlertTriangle, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsGoogleAccount(false);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Algo salió mal");
      }

      if (data.isGoogle) {
        setIsGoogleAccount(true);
      } else {
        setSuccessMessage(data.message || "Enlace de recuperación generado con éxito.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="flex items-center space-x-2 mb-6">
            <Link href="/login" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Recuperar Contraseña</h2>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {isGoogleAccount ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Cuenta vinculada a Google</h3>
                  <p className="text-slate-700 dark:text-slate-300">
                    Tu cuenta está registrada a través de Google. Por favor, inicia sesión usando Google.
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-xs">
                    Si olvidaste tu contraseña de Google, puedes restablecerla directamente en el centro de recuperación de cuentas de Google.
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all text-sm"
              >
                Volver al Inicio de Sesión
              </Link>
            </div>
          ) : successMessage ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Solicitud Procesada</h3>
                  <p className="text-slate-700 dark:text-slate-300">
                    Si el correo ingresado se encuentra registrado directamente en la aplicación, recibirás un enlace para restablecer tu contraseña.
                  </p>
                  {process.env.NODE_ENV === "development" && (
                    <p className="text-blue-400 mt-3 text-xs bg-blue-950/40 p-2 rounded border border-blue-900/50">
                      <strong>Entorno de desarrollo:</strong> Hemos impreso el enlace de restablecimiento en la consola de la terminal.
                    </p>
                  )}
                </div>
              </div>
              <Link
                href="/login"
                className="w-full flex items-center justify-center py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-lg transition-colors text-sm"
              >
                Volver al Inicio de Sesión
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                Ingresa el correo electrónico asociado a tu cuenta para recibir un enlace de recuperación.
              </p>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-4 py-2.5 pl-11 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    required
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-500" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Enviar Enlace de Recuperación"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
