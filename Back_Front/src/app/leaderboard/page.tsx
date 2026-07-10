"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Trophy, Medal, ArrowLeft, Loader2, Award } from "lucide-react";

interface RankedUser {
  id: number;
  username: string;
  score: number;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [rankedUsers, setRankedUsers] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);

  const getReturnPath = () => {
    if (!user) return "/";
    if (user.role === 'profesor') return "/profesor";
    if (user.role === 'admin') return "/admin";
    return "/dashboard";
  };

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(r => r.json())
      .then(data => {
        setRankedUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching leaderboard:", err);
        setLoading(false);
      });
  }, []);

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return "from-yellow-400 to-amber-600 shadow-yellow-500/50 text-white border-yellow-200 dark:border-yellow-700/50"; // Oro
      case 1: return "from-slate-300 to-slate-400 shadow-slate-400/50 text-slate-800 dark:text-slate-900 border-slate-100 dark:border-slate-500/50"; // Plata
      case 2: return "from-orange-400 to-rose-700 shadow-orange-600/50 text-white border-orange-300 dark:border-orange-800/50"; // Cobre
      default: return "";
    }
  };

  const getRankStyle = (index: number) => {
    if (index === 0) return "bg-yellow-50 dark:bg-gradient-to-br dark:from-yellow-900/20 dark:to-amber-900/10 border-black dark:border-yellow-900/50 transform scale-105 z-10 shadow-xl shadow-yellow-500/10";
    if (index === 1) return "bg-slate-100 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-800/80 border-black dark:border-slate-700 shadow-lg";
    if (index === 2) return "bg-orange-50 dark:bg-gradient-to-br dark:from-orange-900/20 dark:to-rose-900/10 border-black dark:border-orange-900/40 shadow-lg shadow-orange-500/10";
    return "bg-white dark:bg-slate-900 border-black dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-sky-500/30 selection:text-sky-600 relative">
      
      {/* Code pattern background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* SVG pattern — LIGHT MODE */}
        <svg className="absolute inset-0 w-full h-full dark:hidden" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="code-pattern-light-leaderboard" x="0" y="0" width="340" height="270" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
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
          <rect width="100%" height="100%" fill="url(#code-pattern-light-leaderboard)" opacity="0.50" />
        </svg>

        {/* SVG pattern — DARK MODE */}
        <svg className="absolute inset-0 w-full h-full hidden dark:block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="code-pattern-dark-leaderboard" x="0" y="0" width="340" height="270" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
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
          <rect width="100%" height="100%" fill="url(#code-pattern-dark-leaderboard)" opacity="0.18" />
        </svg>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-black dark:border-slate-800 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-white text-lg leading-none">Py</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-sky-600 dark:from-white dark:via-slate-200 dark:to-sky-400 bg-clip-text text-transparent hidden sm:block">
              PyLearn
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href={getReturnPath()} className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-yellow-500/10 rounded-full mb-2">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Ranking Global
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Compite con otros estudiantes de PyLearn completando lecciones y ejercicios. ¡Demuestra quién es el mejor programador!
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-sky-500 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Cargando clasificación...</p>
          </div>
        ) : rankedUsers.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/50 border border-black dark:border-slate-800 rounded-3xl">
            <Award className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aún no hay puntuaciones</h3>
            <p className="text-slate-500 dark:text-slate-400">¡Sé el primero en completar un ejercicio y aparecer en el Ranking!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Top 3 Podium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:items-end">
              {/* Plata (2do) */}
              {rankedUsers[1] && (
                <div className={`rounded-3xl border p-6 flex flex-col items-center text-center transition-transform ${getRankStyle(1)} order-2 md:order-1 h-[220px] justify-between`}>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center border-2 mb-2 shadow-lg ${getMedalColor(1)}`}>
                    <span className="font-black text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 truncate w-full px-2">{rankedUsers[1].username}</h3>
                    <p className="text-slate-500 text-sm font-medium">{rankedUsers[1].score} ejercicios</p>
                  </div>
                </div>
              )}
              
              {/* Oro (1er) */}
              {rankedUsers[0] && (
                <div className={`rounded-3xl border p-8 flex flex-col items-center text-center transition-transform ${getRankStyle(0)} order-1 md:order-2 h-[260px] justify-between`}>
                  <div className="absolute -top-6">
                    <Trophy className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                  </div>
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center border-4 mb-2 shadow-xl mt-4 ${getMedalColor(0)}`}>
                    <span className="font-black text-3xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 truncate w-full px-2">{rankedUsers[0].username}</h3>
                    <p className="text-yellow-700 text-sm font-bold uppercase tracking-widest">{rankedUsers[0].score} ejercicios</p>
                  </div>
                </div>
              )}

              {/* Bronce (3er) */}
              {rankedUsers[2] && (
                <div className={`rounded-3xl border p-6 flex flex-col items-center text-center transition-transform ${getRankStyle(2)} order-3 h-[200px] justify-between`}>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center border-2 mb-2 shadow-lg ${getMedalColor(2)}`}>
                    <span className="font-black text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 truncate w-full px-2">{rankedUsers[2].username}</h3>
                    <p className="text-slate-500 text-sm font-medium">{rankedUsers[2].score} ejercicios</p>
                  </div>
                </div>
              )}
            </div>

            {/* Rest of the list */}
            {rankedUsers.length > 3 && (
              <div className="bg-white dark:bg-slate-900 border border-black dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="divide-y divide-black dark:divide-slate-800">
                  {rankedUsers.slice(3).map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between p-3 sm:p-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors gap-2">
                      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                        <span className="w-6 sm:w-8 text-center text-slate-400 dark:text-slate-500 font-bold text-base sm:text-lg shrink-0">
                          #{index + 4}
                        </span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 border border-black dark:border-slate-700 flex items-center justify-center text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                          {user.username[0].toUpperCase()}
                        </div>
                        <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                          {user.username}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-base whitespace-nowrap">
                          {user.score} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
