import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PyLearn Platform",
  description: "Plataforma Interactiva para Aprender Python",
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.className} ${geistMono.variable} antialiased dark:bg-slate-950 dark:text-slate-200 bg-slate-50 text-slate-900 transition-colors duration-300`}>
        <Script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js" strategy="beforeInteractive" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
