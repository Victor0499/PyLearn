"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { UserPlus, Eye, EyeOff, BookOpen, GraduationCap, School } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("estudiante");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    setLoading(true);
    try {
      await register(username, email, password, role);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative">

      {/* SVG Code Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* LIGHT MODE */}
        <svg className="absolute inset-0 w-full h-full dark:hidden" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="code-pattern-light-register" x="0" y="0" width="340" height="270" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
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
          <rect width="100%" height="100%" fill="url(#code-pattern-light-register)" opacity="0.50" />
        </svg>

        {/* DARK MODE */}
        <svg className="absolute inset-0 w-full h-full hidden dark:block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="code-pattern-dark-register" x="0" y="0" width="340" height="270" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
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
          <rect width="100%" height="100%" fill="url(#code-pattern-dark-register)" opacity="0.18" />
        </svg>

        {/* Glow accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg shadow-blue-500/30">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            PyLearn Platform
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Crea tu cuenta y empieza a aprender</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-black dark:border-slate-800 rounded-2xl p-8 shadow-2xl relative">

          {/* ThemeToggle — esquina superior derecha de la card */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Crear Cuenta</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Usuario</label>
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
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-black dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-black dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className={`w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors pr-11 ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : confirmPassword && password === confirmPassword
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : 'border-black dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Las contraseñas no coinciden</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-green-500 text-xs mt-1">✓ Las contraseñas coinciden</p>
              )}
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Soy un...</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("estudiante")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === "estudiante"
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-black dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 hover:border-blue-400"
                    }`}
                >
                  <GraduationCap className="w-6 h-6 mb-1.5" />
                  <span className="text-sm font-medium">Estudiante</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("profesor")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === "profesor"
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                    : "border-black dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 hover:border-indigo-400"
                    }`}
                >
                  <School className="w-6 h-6 mb-1.5" />
                  <span className="text-sm font-medium">Profesor</span>
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
                  <UserPlus className="w-4 h-4 mr-2" />
                  Crear Cuenta
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 dark:text-slate-500 text-sm mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
