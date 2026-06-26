"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { LogIn, Eye, EyeOff, BookOpen, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showBackBtn, setShowBackBtn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('from=landing')) {
      setShowBackBtn(true);
    }
  }, []);

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError((err as Error).message);
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative">
      {/* Back Button */}
      {showBackBtn && (
        <Link 
          href="/" 
          className="absolute top-6 left-6 p-2 bg-white dark:bg-slate-900 border border-black dark:border-slate-800 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all z-50 flex items-center gap-2 pr-4 group"
        >
          <div className="bg-slate-200 dark:bg-slate-800 p-1.5 rounded-full group-hover:bg-slate-300 dark:group-hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Volver</span>
        </Link>
      )}

      {/* Code pattern background (like WhatsApp chat) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Base glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        {/* SVG pattern — LIGHT MODE */}
        <svg className="absolute inset-0 w-full h-full dark:hidden" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="code-pattern-light" x="0" y="0" width="340" height="270" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
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
          <rect width="100%" height="100%" fill="url(#code-pattern-light)" opacity="0.50" />
        </svg>

        {/* SVG pattern — DARK MODE */}
        <svg className="absolute inset-0 w-full h-full hidden dark:block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="code-pattern-dark" x="0" y="0" width="340" height="270" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
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
          <rect width="100%" height="100%" fill="url(#code-pattern-dark)" opacity="0.18" />
        </svg>
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
          <p className="text-slate-700 dark:text-slate-400 mt-1 text-sm">Aprende Python de forma interactiva</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-black dark:border-slate-800 rounded-2xl p-8 shadow-2xl relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Iniciar Sesión</h2>
            <ThemeToggle />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre de usuario"
                className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-black dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Contraseña
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-black dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          <div className="relative mt-6 mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">O continuar con</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-900 font-medium rounded-lg shadow-sm border border-black dark:border-slate-700 transition-all disabled:opacity-50"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </>
            )}
          </button>

          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-6">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

