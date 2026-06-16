"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect solo corre en el cliente, por lo que esto nos asegura que 
  // tengamos acceso al tema correcto antes de renderizar (evita hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2.5 text-slate-400 rounded-xl border border-slate-300 dark:border-slate-700 transition-all opacity-50 cursor-default">
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200 shadow-sm"
      title="Cambiar tema"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
