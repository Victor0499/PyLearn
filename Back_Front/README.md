# PyLearn Platform - Frontend

Este es el lado del cliente (Frontend) de la Plataforma PyLearn, construido con [Next.js](https://nextjs.org/) y React.

## 🚀 Empezando

Para iniciar el servidor de desarrollo localmente (si no estás usando Docker):

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes empezar a editar la plataforma modificando `src/app/page.tsx`. La página se actualizará automáticamente a medida que edites el archivo.

## 📚 Tecnologías Utilizadas

- **Next.js (App Router):** Framework principal de React.
- **Tailwind CSS v4:** Para los estilos, diseño oscuro y responsive.
- **Pyodide:** Para ejecutar código Python directamente en el navegador mediante WebAssembly.
- **Monaco Editor:** El mismo editor de código que usa VS Code, incrustado en la web.
- **React Markdown:** Para renderizar la teoría y las lecciones.
- **React Syntax Highlighter:** Para colorear el código de ejemplo en las lecciones (tema `vscDarkPlus`).

## 🛠️ Estructura del Proyecto

- `src/app/page.tsx`: Pantalla principal donde se ven las lecciones y el editor de código.
- `src/app/login/` y `src/app/register/`: Pantallas de autenticación.
- `src/context/AuthContext.js`: Maneja la sesión del usuario (Estudiante o Profesor) mediante tokens JWT.
- `src/hooks/usePyodide.js`: Hook personalizado para cargar e interactuar con el entorno de Python.

## 🚢 Despliegue

La forma más fácil de desplegar tu aplicación Next.js es utilizar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
