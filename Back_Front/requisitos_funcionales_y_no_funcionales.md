# Requisitos del Sistema: Plataforma PyLearn

Este documento detalla los requisitos funcionales y no funcionales de la plataforma interactiva de aprendizaje de Python (PyLearn).

---

## 1. Requisitos Funcionales

Los requisitos funcionales describen lo que el sistema *debe hacer*, es decir, sus características, funciones y cómo debe comportarse ante las interacciones del usuario.

### 1.1. Gestión de Usuarios y Autenticación
*   **RF-01:** El sistema debe permitir el registro y autenticación de usuarios mediante correo electrónico/contraseña y OAuth (Google).
*   **RF-02:** El sistema debe soportar un mecanismo seguro de recuperación de contraseñas mediante enlaces enviados por correo electrónico.
*   **RF-03:** El sistema debe implementar control de acceso basado en tres (3) roles principales: Administrador, Profesor y Estudiante.

### 1.2. Módulo de Estudiantes (Ruta de Aprendizaje)
*   **RF-04:** El sistema debe presentar un panel (dashboard) visual con la progresión del estudiante dividida por módulos.
*   **RF-05:** El sistema debe restringir el acceso a módulos avanzados (bloqueo progresivo) hasta que el estudiante haya completado al 100% los módulos previos.
*   **RF-06:** El sistema debe proporcionar un Entorno Interactivo de Aprendizaje (Aula) que muestre simultáneamente la teoría de la lección, un editor de código y una consola de salida simulada.
*   **RF-07:** El sistema debe permitir la ejecución de código Python directamente en el navegador web del usuario y capturar la salida estándar (`stdout`) o los errores (`stderr`).
*   **RF-08:** El sistema debe proporcionar retroalimentación pedagógica automatizada analizando los errores generados (ej. `SyntaxError`, `NameError`) y mostrando ventanas modales con diagnósticos formateados y sugerencias de corrección.
*   **RF-09:** El sistema debe validar el código del estudiante contra resultados esperados (salida de texto literal o pruebas unitarias ocultas).
*   **RF-10:** El sistema debe incluir un mecanismo de ayuda que permita al estudiante solicitar una "Pista" y, en última instancia, revelar la solución óptima del ejercicio.

### 1.3. Módulo de Profesores (Gestión de Aulas)
*   **RF-11:** El sistema debe permitir a los usuarios con rol de Profesor crear múltiples "Clases" o "Aulas", generando un código de invitación único de 6 caracteres.
*   **RF-12:** El sistema debe permitir al profesor enviar invitaciones directas a estudiantes registrados, o permitir que los estudiantes se unan usando el código de clase.
*   **RF-13:** El sistema debe proveer al profesor un panel analítico para visualizar la lista de estudiantes inscritos en sus clases y el progreso detallado de cada uno (lecciones completadas).

### 1.4. Módulo de Administración (Gestión de Contenido)
*   **RF-14:** El sistema debe proveer un panel de administración restringido exclusivamente al rol Admin.
*   **RF-15:** El sistema debe permitir al administrador gestionar el catálogo educativo, lo que incluye editar títulos, descripciones, contenido Markdown de las lecciones y el código base de los ejercicios en tiempo real.
*   **RF-16:** El sistema debe permitir al administrador gestionar las cuentas de usuario registradas en la plataforma, con capacidades para ver métricas, eliminar cuentas o banear usuarios.

---

## 2. Requisitos No Funcionales

Los requisitos no funcionales describen *cómo* el sistema debe realizar sus funciones (rendimiento, usabilidad, seguridad, etc.).

### 2.1. Rendimiento y Eficiencia
*   **RNF-01:** La ejecución del código Python debe realizarse del lado del cliente (Client-Side) utilizando WebAssembly (motor Pyodide) para garantizar un tiempo de respuesta en milisegundos y eliminar la latencia de red en la evaluación.
*   **RNF-02:** El sistema debe utilizar renderizado del lado del servidor (SSR) o generación estática (SSG) a través del framework Next.js para optimizar los tiempos de carga inicial de las páginas.

### 2.2. Usabilidad e Interfaz de Usuario (UX/UI)
*   **RNF-03:** La interfaz gráfica debe tener un diseño moderno, estético e intuitivo, haciendo uso de paletas de colores armoniosas, transparencias (glassmorphism) y micro-animaciones para mejorar la interacción.
*   **RNF-04:** El sistema debe ser completamente responsivo (Responsive Design), adaptándose fluidamente a dispositivos móviles, tablets y monitores de escritorio.
*   **RNF-05:** El sistema debe ofrecer la capacidad de alternar entre "Modo Claro" y "Modo Oscuro" adaptando los colores de toda la interfaz y del editor de código automáticamente.
*   **RNF-06:** El editor de código debe proporcionar una experiencia de desarrollo profesional similar a Visual Studio Code (basado en Monaco Editor), incluyendo resaltado de sintaxis, sangría automática y numeración de líneas.

### 2.3. Seguridad
*   **RNF-07:** Todas las interacciones con la base de datos y endpoints protegidos deben estar aseguradas mediante autenticación basada en tokens web JSON (JWT).
*   **RNF-08:** La arquitectura de ejecución de código mediante WebAssembly debe garantizar un entorno completamente aislado (Sandbox) en el navegador del usuario, mitigando cualquier riesgo de inyección de código malicioso en los servidores (prevención de RCE).
*   **RNF-09:** Las contraseñas de los usuarios deben almacenarse de forma encriptada en la base de datos utilizando algoritmos de hashing robustos (ej. bcrypt).

### 2.4. Mantenibilidad, Escalabilidad y Arquitectura
*   **RNF-10:** El código base debe utilizar TypeScript para asegurar un tipado estricto y reducir la cantidad de errores de ejecución durante el desarrollo.
*   **RNF-11:** El sistema debe ser fácil de desplegar y escalar, operando en un entorno de contenedores (Docker) que aisle los servicios de frontend/backend y la base de datos relacional (PostgreSQL).
*   **RNF-12:** El diseño del software debe seguir una arquitectura basada en componentes reutilizables en el frontend (React) y rutas API limpias en el backend (Next.js App Router).

---

## 3. Requisitos de Usuario

Los requisitos de usuario describen las necesidades, expectativas y restricciones desde la perspectiva de las personas que interactuarán directamente con el sistema.

### 3.1. Estudiantes
*   **RU-01 (Accesibilidad sin configuración):** El estudiante necesita poder programar y practicar inmediatamente sin tener que instalar lenguajes de programación, editores o librerías en su propia computadora. Todo debe funcionar en el navegador web.
*   **RU-02 (Curva de aprendizaje):** El estudiante necesita recibir diagnósticos comprensibles y en lenguaje natural cuando comete un error de código, para evitar la frustración que generan los mensajes de error técnicos tradicionales.
*   **RU-03 (Autonomía):** El estudiante requiere un sentido de progreso claro (barras de porcentaje, módulos bloqueados) y herramientas de auto-ayuda (sistema de pistas) para avanzar a su propio ritmo.

### 3.2. Profesores
*   **RU-04 (Gestión de grupos):** El profesor necesita una manera eficiente de agrupar a múltiples estudiantes en "Aulas" y evitar que se mezclen con estudiantes de otros grupos.
*   **RU-05 (Monitoreo):** El profesor requiere visualizar rápidamente quiénes han completado los ejercicios y quiénes están rezagados, sin necesidad de corregir o evaluar manualmente cada línea de código escrita por sus alumnos.

### 3.3. Administradores
*   **RU-06 (Gestión dinámica):** El administrador necesita poder modificar el currículo de aprendizaje (textos, código inicial, pruebas de validación) a través de una interfaz gráfica sin tener que alterar el código fuente del proyecto ni realizar despliegues (deployments) técnicos.

---

## 4. Requisitos de Entorno

Los requisitos de entorno definen el contexto tecnológico, tanto a nivel de hardware como de software, necesario para que el sistema opere y sea desarrollado correctamente.

### 4.1. Entorno del Cliente (Usuario Final)
*   **RE-01 (Navegador Web):** El sistema requiere un navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge o Apple Safari en sus versiones recientes) con soporte completo para **WebAssembly (WASM)** y ejecución de JavaScript habilitada.
*   **RE-02 (Hardware del Cliente):** Aunque el procesamiento se realiza en el dispositivo del usuario, no se requieren procesadores de alta gama, pero se recomienda un mínimo de **4 GB de memoria RAM** para cargar y operar fluidamente el motor Pyodide y el editor Monaco en el navegador.
*   **RE-03 (Conexión a Internet):** Se requiere conexión constante a internet para sincronizar el progreso, autenticar y descargar la paquetería inicial de WebAssembly.

### 4.2. Entorno de Servidor (Producción y Desarrollo)
*   **RE-04 (Orquestación):** El servidor de despliegue debe contar con **Docker** y **Docker Compose** instalados para orquestar la infraestructura aislada.
*   **RE-05 (Motor de Backend):** El entorno debe soportar **Node.js (versión 20 o superior)** para la ejecución óptima del servidor basado en Next.js (App Router).
*   **RE-06 (Base de Datos):** El servidor debe contar con el motor de base de datos relacional **PostgreSQL (versión 15 o superior)**.
*   **RE-07 (Sistema Operativo):** Tanto para desarrollo local (Windows con WSL2, macOS, Linux) como para producción, el entorno debe ser compatible con la ejecución nativa de contenedores Linux.

---

## 5. Tecnologías Empleadas (Stack Tecnológico)

El proyecto está construido sobre un ecosistema moderno de JavaScript/TypeScript, utilizando las siguientes herramientas principales:

### 5.1. Frontend y Backend (Framework Principal)
*   **Next.js (v16.2.x):** Framework full-stack utilizado como el núcleo del proyecto. Se encarga de:
    *   **Frontend:** Renderizado de React, manejo de rutas en el cliente, optimización de recursos y sistema de layouts (App Router).
    *   **Backend:** A través de las *Route Handlers* (`/api/...`), expone los endpoints seguros que conectan con la base de datos para la autenticación, progreso y gestión de aulas.
*   **React (v19.2.x):** Librería para construir la interfaz de usuario basada en componentes reutilizables y gestionar el estado de la aplicación (ej. el estado del editor y modales de feedback).
*   **TypeScript (v5.x):** Superconjunto de JavaScript que añade tipado estático, utilizado en todo el proyecto para prevenir errores en tiempo de desarrollo y asegurar estructuras predecibles.

### 5.2. Interfaz de Usuario y Diseño
*   **Tailwind CSS (v4.x):** Framework de CSS utilitario utilizado para diseñar toda la interfaz, implementar el esquema de colores, gestionar la responsividad (móviles/escritorio) y alternar entre los modos oscuro y claro (`next-themes`).
*   **Lucide React (v1.11.x):** Librería que provee toda la iconografía vectorial (SVG) de la plataforma, aportando un diseño limpio y moderno.
*   **React Markdown (v10.1.x) & Syntax Highlighter:** Librerías utilizadas para procesar el texto de la base de datos escrito en formato Markdown y renderizarlo estéticamente en el aula interactiva (teoría, negritas, enlaces, fragmentos de código formateados).

### 5.3. Entorno Interactivo de Código (Core Pedagógico)
*   **Monaco Editor (@monaco-editor/react v4.7.x):** Componente web oficial que incrusta el editor de *Visual Studio Code* dentro del navegador del usuario. Se encarga de ofrecer el área de texto para programar, con inteligencia de código (autocompletado, resaltado de sintaxis).
*   **Pyodide (v0.25.x - v0.29.x):** Motor de ejecución fundamental para el proyecto. Es un puerto del intérprete oficial de CPython a **WebAssembly**. Se utiliza para ejecutar el código Python introducido por el estudiante de manera nativa, segura y ultrarrápida dentro del propio navegador, sin enviar el código a un backend.

### 5.4. Base de Datos y Autenticación
*   **PostgreSQL (v15+):** Motor de base de datos relacional donde se almacena el currículo (módulos, lecciones, ejercicios), las cuentas de usuario, y el registro de progreso y aulas.
*   **JSON Web Tokens (jsonwebtoken v9.0.x):** Estándar de la industria utilizado para crear tokens seguros y firmados (JWT). Se encarga de mantener y validar las sesiones de los usuarios en cada llamada a la API, sin tener que guardar estado en la memoria del servidor.

### 5.5. Infraestructura
*   **Docker & Docker Compose:** Herramientas de contenerización utilizadas para orquestar la aplicación (empaquetando el entorno de Node.js) junto con el contenedor de la base de datos (PostgreSQL), garantizando que el proyecto funcione idénticamente en cualquier computadora.
