"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext({
  user: /** @type {{ role: string; username: string } | null} */ (null),
  loading: true,
  login: async (/** @type {string} */ _username, /** @type {string} */ _password) => { },
  register: async (/** @type {string} */ _username, /** @type {string} */ _email, /** @type {string} */ _password, /** @type {string} */ _role) => { },
  logout: () => { },
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    router.push(data.user.role === 'admin' ? '/admin' : data.user.role === 'profesor' ? '/profesor' : '/');  // tester and estudiante go to '/
  };

  const register = async (username, email, password, role) => {

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al registrarse");
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    router.push(data.user.role === 'admin' ? '/admin' : data.user.role === 'profesor' ? '/profesor' : '/');  // tester and estudiante go to '/
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
