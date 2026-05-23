# PyLearn Platform 🐍🎓

PyLearn es una plataforma educativa modular diseñada para enseñar programación en Python de manera interactiva. Cuenta con un diseño moderno tipo "Midnight Blue", roles de usuario (Estudiante/Profesor) y un entorno de ejecución de código en vivo directamente en el navegador — sin necesidad de instalar Python.

## 🏗️ Arquitectura del Proyecto

El proyecto es una aplicación **fullstack con Next.js**, orquestada mediante Docker:

- **Next.js (App Router):** Maneja tanto el frontend como el backend (API Routes).
  - Interfaz de usuario responsiva y moderna con diseño oscuro.
  - API propia para autenticación y gestión de progreso del usuario.
  - Integración con `Pyodide` para ejecutar código Python directamente en el navegador (WebAssembly), sin consumir recursos del servidor.
  - `Monaco Editor` para una experiencia de escritura de código profesional.

- **Supabase (PostgreSQL):** Base de datos en la nube para persistencia de usuarios, sesiones y progreso de aprendizaje.

- **Docker:** Contenedorización del entorno de desarrollo para garantizar consistencia entre máquinas.

## 🚀 Cómo iniciar el proyecto

### Opción 1 — Con Docker (recomendado)

1. Abre **Docker Desktop** y asegúrate de que el motor esté activo (ícono verde).
2. Crea el archivo `Back_Front/.env.local` con tus credenciales de Supabase (ver sección de variables de entorno).
3. Desde la carpeta raíz del proyecto, ejecuta:

```bash
docker compose up -d --build
```

4. Abre tu navegador en: **http://localhost:3000**

### Opción 2 — Sin Docker (desarrollo local)

```bash
cd Back_Front
npm install
npm run dev
```

Abre **http://localhost:3000** en tu navegador.

## 🔑 Variables de Entorno

Crea el archivo `Back_Front/.env.local` con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
JWT_SECRET=tu_secreto_jwt
```

> ⚠️ Nunca subas este archivo a GitHub. Ya está protegido por el `.gitignore`.

## 👥 Roles de Usuario

- **Estudiante:** Accede a las lecciones, lee la teoría y completa ejercicios interactivos con retroalimentación inmediata.
- **Profesor:** Mismas capacidades que el estudiante. En el futuro contará con un panel para supervisar el progreso y gestionar contenido.

## 📚 Módulos del Curso

El curso está organizado en módulos progresivos:

- **Módulo 1 — Fundamentos de Python:** Variables, tipos de datos, operadores, estructuras de control, funciones y más.
- **Módulo 2 — Python Intermedio:** Listas, diccionarios, funciones avanzadas, manejo de errores y más.

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| **Next.js 15** | Framework fullstack (frontend + API) |
| **React 19** | Biblioteca de UI |
| **Tailwind CSS v4** | Estilos y diseño responsive |
| **Supabase** | Base de datos PostgreSQL en la nube |
| **Pyodide** | Ejecución de Python en el navegador (WebAssembly) |
| **Monaco Editor** | Editor de código integrado (mismo que VS Code) |
| **Docker** | Contenedorización del entorno de desarrollo |

## 📁 Estructura del Proyecto

```
AppWeb/
├── Back_Front/          # Aplicación Next.js (fullstack)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Dashboard principal
│   │   │   ├── learn/page.tsx    # Lecciones y ejercicios
│   │   │   ├── login/page.tsx    # Inicio de sesión
│   │   │   ├── register/page.tsx # Registro de usuario
│   │   │   └── api/              # API Routes (auth, progreso, lecciones)
│   │   ├── components/           # Componentes reutilizables
│   │   ├── context/              # Contexto de autenticación
│   │   ├── hooks/                # Hooks personalizados (Pyodide, progreso)
│   │   └── lib/                  # Configuración de Supabase y auth
│   └── Dockerfile.dev
├── docker-compose.yml   # Configuración de Docker
└── .gitignore           # Archivos excluidos de Git
```
