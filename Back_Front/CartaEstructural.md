# Carta Estructural del Proyecto (PyLearn)

A continuación se detalla la estructura principal de directorios y archivos de la plataforma (ubicada en la carpeta `Back_Front`), indicando la función de cada componente bajo la arquitectura Next.js (App Router).

```text
Back_Front/
├── src/
│   ├── app/                    # Configuración de rutas (App Router)
│   │   ├── admin/
│   │   │   └── page.tsx        # Panel de administrador (Gestión de currículo y usuarios)
│   │   ├── api/                # Endpoints del Backend (Route Handlers)
│   │   │   ├── auth/           # Lógica de Autenticación (Login, Registro, OAuth)
│   │   │   ├── classroom/      # Lógica de gestión de aulas y profesores
│   │   │   ├── leaderboard/    # Endpoint para extraer y ordenar el Top Estudiantes
│   │   │   ├── modules/        # Lógica de carga del currículo (Lecciones, Ejercicios)
│   │   │   └── progress/       # Lógica de guardado y consulta de progreso
│   │   ├── auth/
│   │   │   ├── callback/       # Manejo de la redirección de Google OAuth
│   │   │   ├── forgot-password/# Formulario de solicitud de recuperación
│   │   │   └── reset-password/ # Formulario de restablecimiento de contraseña
│   │   ├── learn/
│   │   │   └── page.tsx        # Aula Interactiva (Teoría, Monaco Editor, Consola)
│   │   ├── leaderboard/
│   │   │   └── page.tsx        # Página pública del Salón de la Fama / Ranking Global
│   │   ├── login/
│   │   │   └── page.tsx        # Interfaz de Inicio de Sesión
│   │   ├── profesor/
│   │   │   ├── clase/[id]/     # Detalles y métricas de alumnos de un aula específica
│   │   │   └── page.tsx        # Panel de profesor (Dashboard de gestión)
│   │   ├── register/
│   │   │   └── page.tsx        # Interfaz de Registro de Usuarios
│   │   ├── layout.tsx          # Plantilla principal, fuentes e inyección de Pyodide
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Panel principal del Estudiante (Ruta de aprendizaje)
│   │   ├── globals.css         # Estilos base y directivas de Tailwind CSS
│   │   └── page.tsx            # Landing Page de la plataforma
│   ├── components/             # Componentes de Interfaz (UI) reutilizables
│   │   ├── CodeEditor.js       # Envoltorio e inicialización de Monaco Editor
│   │   ├── Footer.tsx          # Pie de página dinámico y responsivo
│   │   ├── ThemeProvider.tsx   # Configuración del contexto de modo oscuro/claro
│   │   └── ThemeToggle.tsx     # Botón interruptor (switch) de cambio de tema
│   │
│   ├── context/                # Contextos de Estado Global (React Context)
│   │   └── AuthContext.js      # Manejo de la sesión en cliente, tokens y roles
│   │
│   ├── hooks/                  # Custom Hooks (Lógica de React aislada)
│   │   └── usePyodide.js       # Hook que inicializa WASM y compila código Python
│   │
│   └── lib/                    # Librerías, utilidades y conexiones
│       ├── db.ts               # Conector oficial hacia PostgreSQL
│       └── supabase.js         # Cliente de configuración de Supabase
│
├── scripts/                    # Scripts de mantenimiento, base de datos y utilidades
│   ├── 01_curriculum_schema.sql# Esquemas DDL y tablas de la base de datos
│   ├── runMigrate.mjs          # Script ejecutor de migraciones SQL
│   ├── createAdmin.mjs         # Herramienta de consola para crear superusuarios
│   └── autoSolve.mjs           # Script utilitario para automatización o testing
│
├── public/                     # Archivos estáticos directos al cliente
│   ├── noodle.jpg              # Mascota/Avatar virtual de la plataforma (Noodle)
│   └── ...                     
│
├── package.json                # Lista de dependencias (Next.js, Pyodide, Tailwind, etc)
├── tailwind.config.ts          # Configuración del motor de estilos Tailwind CSS
├── Dockerfile.dev              # Receta de construcción del contenedor de Node.js
└── requisitos_...md            # Documentación técnica de la plataforma
```
