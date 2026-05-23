# Requerimientos - PyLearn Platform

## Estado Actual del Proyecto
Fecha de inicio del seguimiento: 03/05/2026

---

## Lo Implementado

### Autenticación
- [✔] Registro de usuario con roles (Estudiante / Profesor)
- [✔] Login con JWT
- [✔] Endpoint `/api/auth/me/` para obtener datos del usuario
- [✔] Logout en frontend
- [✔] Contexto de autenticación (`AuthContext`) en frontend
- [✔] Redirección protegida: si no hay usuario autenticado, redirige a `/login`

### Frontend - Dashboard
- [✔] Header con logo "PyLearn", nombre de usuario, rol y botón de logout
- [✔] Banner de bienvenida con mascota "Noodle"
- [✔] Ruta de aprendizaje con módulos (tarjetas interactivas)
- [✔] 4 módulos definidos: Conceptos Básicos, Estructuras de Control, Funciones Modulares, Estructuras de Datos
- [✔] Progreso visual por módulo (barra de progreso)
- [✔] Módulos bloqueados/desbloqueados
- [✔] Progreso porcentual real obtenido desde la base de datos
- [✔] Desbloqueo de módulo 2 al completar módulo 1 al 100%

### Frontend - Aprendizaje (Lecciones)
- [✔] Sidebar con lista de lecciones y progreso
- [✔] Vista de teoría con renderizado Markdown
- [✔] Editor de código Monaco Editor
- [✔] Ejecución de código Python en el navegador con Pyodide
- [✔] Terminal de salida de consola
- [✔] 3 lecciones creadas:
  1. Variables y la función `print()`
  2. Operaciones con Cadenas de Texto
  3. Palabras Reservadas
- [✔] 3 ejercicios por lección (Básico, Intermedio, Reto)
- [✔] Validación de ejercicios con `testCode` (assertions) y `outputCheck`
- [✔] Modal de errores con categorización (SyntaxError, NameError, AssertionError)
- [✔] Modal de felicitación al completar una lección
- [✔] Sistema de pistas por ejercicio
- [✔] Tabs para ejercicios
- [✔] Diseño responsive con tabs de Teoría/Ejercicios en móvil

### Backend (Django)
- [✔] Modelos creados:
  - `UserProfile` (role: estudiante/profesor)
  - `Level` (BASIC, INTERMEDIATE, ADVANCED)
  - `Module` (módulos dentro de niveles)
  - `Lesson` (lecciones con `theory_markdown` y `resources`)
  - `Exercise` (ejercicios con tipo, instrucciones, código inicial)
  - `ExerciseTest` (código de validación por ejercicio)
  - `UserProgress` (progreso del usuario por ejercicio)
- [✔] Serializers para los modelos
- [✔] Endpoints de autenticación (Register, Login, Me)
- [ ] Endpoints CRUD para lecciones, módulos y ejercicios (pendiente)
- [✔] Endpoints para guardar y consultar progreso del usuario
- [✔] Persistencia de progreso: se guarda al completar ejercicio y se restaura al recargar o iniciar sesión
- [✔] Restauración del código escrito por el usuario

### Infraestructura
- [✔] Docker Compose con frontend y backend
- [✔] Base de datos configurada con Supabase (PostgreSQL)
- [✔] Variables de entorno en `.env`

---

## Pendiente / Por Implementar

### Contenido
- [ ] Completar las lecciones de los módulos restantes:
  - Módulo 2: Estructuras de Control (if/else, for, while)
  - Módulo 3: Funciones Modulares
  - Módulo 4: Estructuras de Datos (Listas, Diccionarios, Tuplas)
- [ ] Conectar las lecciones del frontend con los modelos del backend (actualmente están hardcodeadas)

### Funcionalidades
- [ ] Panel de administración para profesores
- [✔] Guardar progreso del usuario en la base de datos
- [✔] Desbloqueo de módulos según progreso
- [ ] CRUD de contenido desde el backend (admin panel de Django)
- [✔] Persistencia del código escrito por el usuario
- [ ] Estadísticas de progreso del estudiante
- [ ] Sistema de logros / badges
- [ ] Sistema de puntuación

### Mejoras
- [ ] Tests unitarios (backend y frontend)
- [ ] Validación más robusta de ejercicios
- [ ] Manejo de errores más descriptivos
- [ ] Mejorar la carga inicial de Pyodide (indicador de progreso)
- [ ] Soporte offline

---

## Historial de Cambios

| Fecha | Cambio |
|-------|--------|
| 03/05/2026 | Creación del documento de requerimientos |
| 03/05/2026 | Lección 3 "Palabras Reservadas" agregada |
| 03/05/2026 | Progreso persistente: guardado y restauración al recargar/reiniciar sesión |
| 03/05/2026 | Dashboard con progreso porcentual real por módulo |
