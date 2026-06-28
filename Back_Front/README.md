# 🐍 PyLearn — Plataforma Educativa Interactiva de Python

PyLearn es una plataforma web educativa fullstack para aprender Python desde cero, diseñada para estudiantes, profesores y administradores. Cuenta con un editor de código en el navegador, un sistema de aulas virtuales (tipo Google Classroom), ranking de progreso y gestión de contenido curricular.

---

## 🖥️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | **Next.js 16 (App Router)** |
| Lenguaje | **TypeScript** |
| Estilos | **Tailwind CSS v4** |
| Base de Datos | **Supabase (PostgreSQL)** |
| Autenticación | **JWT personalizado + Google OAuth 2.0** |
| Ejecución de Python | **Pyodide (WebAssembly)** |
| Editor de Código | **Monaco Editor** (el motor de VS Code) |
| Iconos | **Lucide React** |
| Email | **Nodemailer (SMTP Gmail)** |
| Contenedor local | **Docker + Docker Compose** |

---

## 🚀 Inicio Rápido

### Opción 1 — Docker (Recomendado)

```bash
# En la raíz del proyecto (donde está docker-compose.yml)
docker compose up
```

### Opción 2 — Sin Docker

```bash
# Dentro de Back_Front/
npm install
npm run dev
```

La app estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Estructura del Proyecto

```
Back_Front/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Landing Page principal
│   │   ├── login/                 # Inicio de sesión (usuario/contraseña + Google)
│   │   ├── register/              # Registro de cuenta (Estudiante o Profesor)
│   │   ├── dashboard/             # Panel del estudiante (progreso, aulas, invitaciones)
│   │   ├── learn/                 # Módulo de aprendizaje con lecciones y ejercicios
│   │   ├── leaderboard/           # Ranking global de estudiantes
│   │   ├── admin/                 # Panel de administración (usuarios, currículum)
│   │   ├── profesor/              # Panel de profesor (aulas, invitar estudiantes)
│   │   │   └── clase/[id]/        # Detalle de aula (miembros, código de unión, invitaciones)
│   │   ├── auth/                  # Callbacks de OAuth (Google)
│   │   └── api/                   # Rutas del backend (API REST)
│   │       ├── auth/              # Login, registro, Google OAuth, recuperación de contraseña
│   │       ├── modules/           # Listar módulos con progreso del estudiante
│   │       ├── curriculum/        # Lecciones y ejercicios por módulo
│   │       ├── exercises/         # Validación de ejercicios con test_code
│   │       ├── progress/          # Guardar y consultar progreso del estudiante
│   │       ├── leaderboard/       # Ranking calculado en tiempo real
│   │       ├── classroom/         # Gestión de aulas (crear, unirse, invitar, responder)
│   │       └── admin/             # Gestión de usuarios y currículum (solo admins)
│   ├── components/                # Componentes reutilizables
│   │   ├── Navbar.tsx             # Barra de navegación con rol dinámico
│   │   ├── ThemeToggle.tsx        # Botón de modo claro/oscuro
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.tsx        # Estado global de sesión del usuario
│   ├── hooks/
│   │   └── usePyodide.js          # Hook para ejecutar Python con Pyodide/WASM
│   └── lib/
│       ├── supabase.ts            # Cliente de Supabase (anon + service role)
│       └── auth.ts                # Funciones de firma/verificación de JWT
├── scripts/                       # Scripts SQL de migración de base de datos
│   ├── 01_curriculum_schema.sql   # Crear tablas: modules, lessons, exercises
│   ├── 02_add_solution_code.sql   # Añadir columna solution_code a exercises
│   ├── 03_password_reset.sql      # Crear tabla api_passwordresettoken
│   ├── 04_classroom_invitations.sql # Crear tabla api_classroom_invitation
│   └── 05_cleanup_migration.sql   # Limpieza: eliminar tablas legacy y recablear FKs
└── next.config.ts
```

---

## 🗄️ Base de Datos (Supabase)

El proyecto usa **10 tablas** en Supabase (PostgreSQL), organizadas en 4 ecosistemas:

### 👤 Usuarios y Seguridad
- `auth_user` — Datos de acceso (email, username, password, etc.)
- `api_userprofile` — Rol del usuario (`estudiante`, `profesor`, `admin`)
- `api_passwordresettoken` — Tokens de recuperación de contraseña (expirables)

### 📚 Currículum
- `modules` — Módulos de aprendizaje (ej. "Introducción", "Control de Flujo")
- `lessons` — Lecciones con teoría en Markdown
- `exercises` — Ejercicios prácticos con `test_code` para validación automática

### 📊 Progreso
- `api_userprogress` — Historial de ejercicios completados por cada estudiante

### 🏫 Aulas Virtuales
- `api_classroom` — Aulas creadas por profesores (con código único de unión)
- `api_classroom_member` — Estudiantes miembros de cada aula
- `api_classroom_invitation` — Invitaciones directas (Pendiente / Aceptada / Rechazada)

> Para inicializar la base de datos en un Supabase nuevo, ejecuta los scripts de la carpeta `scripts/` en orden en el SQL Editor de Supabase.

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` dentro de `Back_Front/` con las siguientes variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT
JWT_SECRET=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (SMTP Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu@gmail.com
EMAIL_PASS=tu_app_password
EMAIL_FROM=PyLearn <tu@gmail.com>

# URL de la app (cambiar en producción)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 👥 Roles de Usuario

| Rol | Acceso |
|-----|--------|
| **Estudiante** | Landing, Dashboard, Learn, Leaderboard |
| **Profesor** | Todo lo anterior + Panel de Aulas (crear, gestionar e invitar estudiantes) |
| **Admin** | Todo lo anterior + Panel de Administración (usuarios y currículum) |

---

## 🌟 Funcionalidades Principales

- ✅ Registro e inicio de sesión (usuario/contraseña y Google OAuth)
- ✅ Recuperación de contraseña por email
- ✅ Editor de código Python en el navegador (Monaco + Pyodide/WASM)
- ✅ Sistema de lecciones con teoría en Markdown y ejercicios prácticos
- ✅ Validación automática de código con `test_code`
- ✅ Seguimiento de progreso por módulo y lección
- ✅ Ranking global de estudiantes en tiempo real
- ✅ Modo claro / oscuro con transición suave
- ✅ Aulas virtuales: el profesor crea un aula y comparte un código de unión
- ✅ Sistema de invitaciones directas (el profesor busca al estudiante por nombre/email)
- ✅ Panel de administración para gestionar usuarios y contenido curricular
- ✅ Diseño responsive para desktop y móvil

---

## 📋 Scripts de Desarrollo

```bash
npm run dev    # Servidor de desarrollo en http://localhost:3000
npm run build  # Compilar para producción (verifica errores de TypeScript)
npm run start  # Iniciar servidor de producción (después de build)
npm run lint   # Ejecutar ESLint
```
