# Diagramas del Sistema (PyLearn)

---

## 1. Diagrama de Casos de Uso

A continuación se presenta el modelo de Casos de Uso del sistema, el cual describe las interacciones entre los diferentes actores (tipos de usuarios) y la plataforma.

```mermaid
flowchart LR
    %% Definición de Actores
    Estudiante(("Estudiante"))
    Profesor(("Profesor"))
    Admin(("Administrador"))

    %% Casos de uso - Autenticación
    subgraph Autenticación ["Autenticación"]
        UC1(["Registrarse"])
        UC2(["Iniciar Sesión (Local/Google)"])
        UC3(["Recuperar Contraseña"])
    end

    %% Accesos de Autenticación
    Estudiante --> UC1
    Estudiante --> UC2
    Estudiante --> UC3

    Profesor --> UC1
    Profesor --> UC2
    Profesor --> UC3

    Admin --> UC2

    %% Casos de uso - Aprendizaje
    subgraph Estudiantes ["Aula Interactiva (Estudiantes)"]
        UC4(["Unirse a un Aula con Código"])
        UC5(["Navegar Módulos y Lecciones"])
        UC6(["Ejecutar Código Python en Navegador"])
        UC7(["Solicitar Pista"])
    end

    Estudiante --> UC4
    Estudiante --> UC5
    Estudiante --> UC6
    Estudiante --> UC7

    %% Casos de uso - Profesorado
    subgraph Profesores ["Gestión Docente (Profesores)"]
        UC8(["Crear Nueva Aula Virtual"])
        UC9(["Obtener Código de Invitación"])
        UC10(["Monitorear Progreso de Alumnos"])
        UC11(["Eliminar Aula"])
    end

    Profesor --> UC8
    Profesor --> UC9
    Profesor --> UC10
    Profesor --> UC11

    %% Casos de uso - Administración
    subgraph Administradores ["Panel de Control (Administradores)"]
        UC12(["Gestionar Usuarios (Banear/Eliminar)"])
        UC13(["Modificar Contenido de Módulos"])
        UC14(["Editar Ejercicios y Teoría"])
    end

    Admin --> UC12
    Admin --> UC13
    Admin --> UC14
```

### Especificación de Actores

1. **Estudiante:** El usuario principal del sistema. Su objetivo es aprender a programar consumiendo el currículo y experimentando en el editor.
2. **Profesor:** Un usuario con permisos para agrupar estudiantes en "Aulas". Su objetivo principal es monitorear qué tanto avanzan sus grupos.
3. **Administrador:** El superusuario de la plataforma. Su objetivo es mantener el sistema operando, gestionando las cuentas conflictivas y actualizando el material de estudio.

### Relaciones Principales

*   **Autonomía del Estudiante:** El estudiante puede realizar todas las tareas de aprendizaje de forma autodidacta. Sin embargo, puede optar por `Unirse a un Aula` si pertenece a una institución.
*   **Aislamiento Docente:** El profesor únicamente puede monitorear a los alumnos de sus propias aulas. No tiene acceso al currículo global para editarlo.
*   **Control Total Administrativo:** El Administrador gestiona el currículo y las cuentas, pero no interactúa en las aulas como los profesores.

---

## 2. Modelo Entidad-Relación (MER)

Este diagrama representa la estructura completa de la base de datos relacional (PostgreSQL), obtenida directamente de los scripts SQL y el código fuente del proyecto.

```mermaid
erDiagram
    auth_user {
        int id PK
        string username
        string email
        string password
        boolean is_active
        boolean is_superuser
        timestamp last_login
        timestamp date_joined
    }

    api_userprofile {
        int id PK
        int user_id FK
        string role
    }

    api_passwordresettoken {
        int id PK
        int user_id FK
        string token
        timestamp created_at
        timestamp expires_at
    }

    modules {
        int id PK
        string title
        string description
        string icon_name
        string color_gradient
        boolean is_locked
        timestamp created_at
    }

    lessons {
        int id PK
        int module_id FK
        string title
        text theory
        int order_index
        timestamp created_at
    }

    exercises {
        int id PK
        int lesson_id FK
        string title
        string difficulty
        text instructions
        text initial_code
        text solution_code
        text output_check
        text test_code
        text hint
        int order_index
        timestamp created_at
    }

    api_userprogress {
        int id PK
        int user_id FK
        int lesson_id FK
        int exercise_id FK
        text submitted_code
        boolean completed
        timestamp completed_at
    }

    api_classroom {
        int id PK
        int teacher_id FK
        string name
        string code
        timestamp created_at
    }

    api_classroom_member {
        int id PK
        int classroom_id FK
        int student_id FK
        timestamp joined_at
    }

    api_classroom_invitation {
        int id PK
        int classroom_id FK
        int student_id FK
        string status
        timestamp created_at
    }

    auth_user ||--|| api_userprofile : "tiene perfil"
    auth_user ||--o{ api_passwordresettoken : "solicita token"
    auth_user ||--o{ api_userprogress : "registra progreso"
    auth_user ||--o{ api_classroom : "imparte como profesor"
    auth_user ||--o{ api_classroom_member : "pertenece como alumno"
    auth_user ||--o{ api_classroom_invitation : "recibe invitacion"

    modules ||--o{ lessons : "contiene"
    lessons ||--o{ exercises : "incluye"
    lessons ||--o{ api_userprogress : "es completada en"
    exercises ||--o{ api_userprogress : "es completado en"

    api_classroom ||--o{ api_classroom_member : "agrupa"
    api_classroom ||--o{ api_classroom_invitation : "genera"
```

---

## 3. Descripción de Entidades

| Entidad | Descripción |
|---|---|
| `auth_user` | Tabla central. Almacena credenciales de todos los usuarios del sistema. |
| `api_userprofile` | Extiende `auth_user` (1:1) con el campo `role`: `estudiante`, `profesor` o `admin`. |
| `api_passwordresettoken` | Tokens temporales de recuperación de contraseña. Expiran en 1 hora. |
| `modules` | Agrupa lecciones bajo un tema (ej: Variables, Funciones). Contiene metadatos visuales. |
| `lessons` | Pertenecen a un módulo. Contienen el texto teórico en Markdown del Aula Interactiva. |
| `exercises` | Pertenecen a una lección. Contienen enunciado, código inicial y lógica de validación. |
| `api_userprogress` | Registra qué ejercicios completó cada usuario, cuándo y el código que envió. |
| `api_classroom` | Aulas virtuales creadas por profesores con un código único de 6 caracteres. |
| `api_classroom_member` | Relación N:M entre aulas y alumnos (tabla de membresía). |
| `api_classroom_member` | Relación N:M entre aulas y alumnos (tabla de membresía). |
| `api_classroom_invitation` | Invitaciones directas de profesor a estudiante. Estado: `pending`, `accepted`, `rejected`. |

---

## 4. Código DBML para dbdiagram.io

Copia el siguiente bloque completo y pégalo en [dbdiagram.io](https://dbdiagram.io) para generar el diagrama visual de la base de datos.

```
// PyLearn - Modelo de Base de Datos
// Generado para: https://dbdiagram.io

Table auth_user {
  id        integer   [pk, increment]
  username  varchar   [not null, unique]
  email     varchar   [not null, unique]
  password  varchar   [not null]
  first_name varchar
  last_name  varchar
  is_active    boolean [default: true]
  is_superuser boolean [default: false]
  last_login   timestamp
  date_joined  timestamp [default: `now()`]
}

Table api_userprofile {
  id      integer [pk, increment]
  user_id integer [not null, ref: - auth_user.id]
  role    varchar [not null, note: 'estudiante | profesor | admin']
}

Table api_passwordresettoken {
  id         integer   [pk, increment]
  user_id    integer   [not null, ref: > auth_user.id]
  token      varchar   [not null, unique]
  created_at timestamp [default: `now()`]
  expires_at timestamp [not null]
}

Table modules {
  id             integer [pk, increment]
  title          varchar [not null]
  description    text    [not null]
  icon_name      varchar [not null]
  color_gradient varchar [not null]
  is_locked      boolean [default: false]
  created_at     timestamp [default: `now()`]
}

Table lessons {
  id          integer [pk]
  module_id   integer [not null, ref: > modules.id]
  title       varchar [not null]
  theory      text    [not null]
  order_index integer [not null]
  created_at  timestamp [default: `now()`]
}

Table exercises {
  id               integer [pk]
  lesson_id        integer [not null, ref: > lessons.id]
  title            varchar [not null]
  difficulty       varchar [not null]
  difficulty_color varchar [not null]
  instructions     text    [not null]
  initial_code     text    [not null]
  solution_code    text
  output_check     text
  test_code        text
  hint             text
  order_index      integer [not null]
  created_at       timestamp [default: `now()`]
}

Table api_userprogress {
  id             integer   [pk, increment]
  user_id        integer   [not null, ref: > auth_user.id]
  lesson_id      integer   [not null, ref: > lessons.id]
  exercise_id    integer   [not null, ref: > exercises.id]
  submitted_code text
  completed      boolean   [default: false]
  completed_at   timestamp [default: `now()`]
}

Table api_classroom {
  id         integer   [pk, increment]
  teacher_id integer   [not null, ref: > auth_user.id]
  name       varchar   [not null]
  code       varchar   [not null, unique, note: 'Código único de 6 caracteres']
  created_at timestamp [default: `now()`]
}

Table api_classroom_member {
  id           integer   [pk, increment]
  classroom_id integer   [not null, ref: > api_classroom.id]
  student_id   integer   [not null, ref: > auth_user.id]
  joined_at    timestamp [default: `now()`]

  indexes {
    (classroom_id, student_id) [unique]
  }
}

Table api_classroom_invitation {
  id           integer   [pk, increment]
  classroom_id integer   [not null, ref: > api_classroom.id]
  student_id   integer   [not null, ref: > auth_user.id]
  status       varchar   [default: 'pending', note: 'pending | accepted | rejected']
  created_at   timestamp [default: `now()`]

  indexes {
    (classroom_id, student_id) [unique]
  }
}
```

---

## 5. Diagrama de Secuencia

Este diagrama modela el flujo principal de la plataforma: **La ejecución interactiva de código, validación y guardado de progreso.** Ilustra cómo interactúan el estudiante, el frontend (React), el motor de ejecución local (Pyodide en WebAssembly) y el backend (Supabase).

```mermaid
sequenceDiagram
    actor E as Estudiante
    participant UI as Interfaz (Frontend)
    participant C as Editor (Monaco)
    participant P as Motor Pyodide (WASM)
    participant BD as Backend (API/Supabase)

    E->>UI: Ingresa a una lección
    UI->>BD: GET /api/exercises (Obtener ejercicio)
    BD-->>UI: Retorna detalles (Enunciado, Código inicial, Test)
    UI->>C: Carga el código inicial en el editor
    
    E->>C: Escribe su solución en Python
    E->>UI: Clic en botón "Ejecutar"
    
    UI->>UI: Redirige sys.stdout para capturar prints
    UI->>P: Envía el código Python a evaluar
    
    alt Error de Sintaxis / Lógica
        P-->>UI: Retorna Excepción (SyntaxError, NameError, etc.)
        UI->>UI: Analizador Pedagógico clasifica el error
        UI-->>E: Muestra Modal de Error con pistas orientativas
    else Ejecución Exitosa
        P-->>UI: Retorna salida estándar (stdout)
        UI-->>E: Muestra resultado en Consola Simulada
        
        opt Validación Automática (Test Code)
            UI->>P: Ejecuta tests ocultos sobre el código
            alt Test Falla
                P-->>UI: AssertionError
                UI-->>E: Modal: "Lógica incorrecta, intenta de nuevo"
            else Test Exitoso
                P-->>UI: True (Validación superada)
                UI-->>E: Modal de Éxito ("¡Excelente!")
                
                UI->>BD: POST /api/progress (Registrar victoria)
                BD-->>UI: 200 OK (Progreso guardado)
                UI->>UI: Desbloquea el siguiente ejercicio
            end
        end
    end
```

---

## 6. Diagrama de Actividades

Este diagrama detalla el **flujo de comportamiento continuo** (workflow) que sigue un Estudiante desde que entra a la plataforma hasta que completa un módulo. Demuestra los ciclos de intento, error, retroalimentación y éxito en el aprendizaje interactivo.

```mermaid
flowchart TD
    %% Definición de estilos para simular un diagrama de actividades UML clásico
    classDef action fill:#f1f5f9,stroke:#64748b,stroke-width:2px,color:#0f172a
    classDef decision fill:#fef08a,stroke:#eab308,stroke-width:2px,color:#854d0e
    classDef startend fill:#0f172a,stroke:#0f172a,color:#fff

    %% Nodos Inicial y Final
    Start((Inicio)):::startend
    End(((Fin))):::startend

    %% Acciones
    Login(Iniciar Sesión):::action
    Select(Seleccionar Módulo y Lección):::action
    Theory(Leer Material Teórico):::action
    Code(Escribir Código en Python):::action
    Run(Hacer clic en 'Ejecutar'):::action
    Feedback(Analizar Feedback Pedagógico):::action
    ShowHint(Ver Pista / Solución):::action
    Save(Registrar Progreso en BD):::action

    %% Puntos de Decisión
    CheckLock{¿Módulo<br>Bloqueado?}:::decision
    CheckSyntax{¿Error de<br>Sintaxis?}:::decision
    CheckTest{¿Pasa Pruebas<br>Lógicas?}:::decision
    Hint{¿Se rinde /<br>Pide pista?}:::decision
    CheckNext{¿Hay más<br>ejercicios?}:::decision

    %% Flujo lógico
    Start --> Login --> Select --> CheckLock
    
    CheckLock -- "Sí (Debe completar previos)" --> Select
    CheckLock -- "No" --> Theory --> Code --> Run --> CheckSyntax

    CheckSyntax -- "Sí" --> Feedback
    CheckSyntax -- "No" --> CheckTest

    CheckTest -- "No" --> Feedback
    CheckTest -- "Sí" --> Save

    Feedback --> Hint
    Hint -- "No" --> Code
    Hint -- "Sí" --> ShowHint --> Code

    Save --> CheckNext
    CheckNext -- "Sí" --> Code
    CheckNext -- "No (Módulo Terminado)" --> End
```

---

## 7. Diagrama de Componentes

Este diagrama muestra la arquitectura física y lógica del sistema. Detalla cómo se separan las responsabilidades entre el Frontend (lo que se ejecuta en el navegador del usuario), el Backend (servidor de Next.js) y la infraestructura de datos e integraciones externas.

```mermaid
flowchart TB
    %% Definición de estilos
    classDef client fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0f172a
    classDef server fill:#fce7f3,stroke:#db2777,stroke-width:2px,color:#0f172a
    classDef database fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#0f172a
    classDef external fill:#f3f4f6,stroke:#4b5563,stroke-width:2px,color:#0f172a

    %% Agrupaciones (Subgrafos)
    subgraph Cliente ["Cliente (Navegador Web)"]
        UI["Componentes Interfaz<br>(React / Tailwind CSS)"]:::client
        Editor["Editor de Código<br>(Monaco Editor)"]:::client
        WASM["Motor de Ejecución<br>(Pyodide / WASM)"]:::client
        Context["Gestor de Estado Global<br>(AuthContext)"]:::client
    end

    subgraph Servidor ["Backend (Servidor Node.js / Next.js)"]
        API_Auth["Controlador Auth<br>(/api/auth/*)"]:::server
        API_Prog["Controlador Progreso<br>(/api/progress)"]:::server
        API_Class["Controlador Aulas<br>(/api/classroom/*)"]:::server
        Mailer["Gestor de Correos<br>(Nodemailer)"]:::server
    end

    subgraph Infraestructura ["Infraestructura Supabase"]
        DB[("Base de Datos<br>(PostgreSQL)")]:::database
        Auth_Supabase{"Servicio de Identidad<br>(Supabase Auth)"}:::database
    end

    subgraph Externos ["Servicios de Terceros"]
        SMTP["Servidor SMTP<br>(ej: Gmail)"]:::external
        OAuth["Autenticación Social<br>(Google OAuth)"]:::external
    end

    %% Relaciones Internas en el Cliente
    UI <--> Context
    UI --- Editor
    Editor -- "Inyecta script" --> WASM
    WASM -- "Devuelve consola" --> UI

    %% Peticiones del Cliente al Servidor
    UI -- "Peticiones HTTP REST" --> API_Prog
    UI -- "Peticiones HTTP REST" --> API_Class
    Context -- "Login / Registro" --> API_Auth

    %% Relaciones Servidor - Infraestructura
    API_Auth -- "Gestiona usuarios y tokens" --> Auth_Supabase
    API_Prog -- "Lectura / Escritura" --> DB
    API_Class -- "Lectura / Escritura" --> DB
    
    %% Llamadas de Integración
    API_Auth -- "Solicita envío de token" --> Mailer
    Mailer -- "Conexión TLS" --> SMTP
    Auth_Supabase -- "Valida proveedor" --> OAuth
```
