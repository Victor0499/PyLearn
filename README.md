# PyLearn Platform 🐍🎓

PyLearn es una plataforma educativa modular diseñada para enseñar programación en Python de manera interactiva. Cuenta con un diseño moderno, roles de usuario (Estudiante/Profesor) y un entorno de ejecución de código en vivo directamente en el navegador.

## 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos partes principales, orquestadas mediante Docker:

1. **Frontend (Next.js):** 
   - Interfaz de usuario responsiva y moderna ("Midnight Blue").
   - Integración con `Pyodide` para ejecutar código Python en el lado del cliente (sin consumir recursos del servidor).
   - Uso de `Monaco Editor` para una experiencia de escritura de código profesional.

2. **Backend (Django + Django REST Framework):**
   - API robusta para la gestión de usuarios y autenticación.
   - Seguridad mediante JSON Web Tokens (JWT).
   - Base de datos conectada a Supabase (PostgreSQL) para persistencia de datos y progreso.

## 🚀 Cómo iniciar el proyecto (Docker)

La forma recomendada de ejecutar el proyecto es utilizando Docker Compose.

1. Abre la aplicación **Docker Desktop** en tu computadora y asegúrate de que el motor ("Engine") esté en verde.
2. Abre una terminal en la carpeta principal del proyecto.
3. Ejecuta el siguiente comando para levantar ambos contenedores (Frontend y Backend) en segundo plano:

```bash
docker-compose up -d --build
```

### Puertos utilizados:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000

## 👥 Roles de Usuario

La plataforma soporta dos tipos de roles al momento del registro:
- **Estudiante:** Puede acceder a las lecciones, leer la teoría y completar los ejercicios interactivos.
- **Profesor:** Tiene las mismas capacidades que el estudiante, pero en el futuro contará con un panel de administración para supervisar el progreso y crear/editar contenido.

## 🛠️ Tecnologías Clave

- **Python & Django** (Backend)
- **React & Next.js** (Frontend)
- **Tailwind CSS v4** (Estilos)
- **Docker** (Contenedorización)
- **Supabase** (Base de Datos)
- **Pyodide** (WebAssembly Python Sandbox)
