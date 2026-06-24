export default function Footer() {
  return (
    <footer className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-300 dark:border-slate-800 flex items-center justify-center px-6 lg:px-10 mt-auto shrink-0 sticky bottom-0 z-50">
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        &copy; {new Date().getFullYear()} PyLearn. Todos los derechos reservados.
      </p>
    </footer>
  );
}
