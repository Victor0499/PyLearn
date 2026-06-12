Módulo 1: Fundamentos de Programación (La Base)
Este módulo se enfoca en que el estudiante entienda la lógica computacional y la sintaxis más limpia de Python.

Introducción al entorno: Qué es Python, cómo funciona el intérprete y el uso de comentarios.

Variables y Tipos de Datos Básicos: Enteros (int), flotantes (float), cadenas de texto (str) y booleanos (bool).

Operadores: Aritméticos (+, -, *, /, //, %, ), de comparación (==, !=, >, <) y lógicos (and, or, not).

Control de Flujo: Estructuras condicionales (if, elif, else).

Bucles e Iteración: Ciclos while y ciclos for (uso de range()). Control de bucles con break y continue.

Módulo 2: Estructuras de Datos y Colecciones
Aprender a organizar y manipular conjuntos de datos en memoria.

Listas (list): Indexación, slicing (rebanado), métodos de listas (append, pop, insert, sort).

Tuplas (tuple): Inmutabilidad y empaquetado/desempaquetado de variables.

Diccionarios (dict): Estructuras clave-valor, métodos avanzados (get, keys, values, items).

Conjuntos (set): Unicidad de elementos y operaciones matemáticas de conjuntos (unión, intersección, diferencia).

Comprensión de Colecciones (Comprehensions): List, dict y set comprehensions (una de las características más amadas de Python).

Módulo 3: Modularización y Funciones
Dejar de escribir scripts planos y empezar a crear código reutilizable.

Definición de Funciones: Sintaxis básica con def y el uso de return.

Argumentos y Parámetros: Parámetros por posición, por nombre (keywords), valores por defecto, y argumentos variables (*args y kwargs).

Ámbito de Variables (Scope): Variables locales, globales y la palabra clave global.

Funciones Lambda y Funciones de Orden Superior: Funciones anónimas, uso de map(), filter() y reduce().

Módulos y Paquetes: Importación de código (import, from ... import), estructura de un paquete y el uso de la Biblioteca Estándar (módulos como math, random, datetime).

Módulo 4: Manejo de Errores y Archivos (I/O)
Cómo hacer que la aplicación sea robusta ante fallos e interactúe con el sistema operativo.

Gestión de Excepciones: Bloques try, except, else y finally. Captura de excepciones específicas y creación de excepciones personalizadas (raise).

Persistencia de Datos: Lectura y escritura de archivos de texto (.txt) usando el manejador de contexto with (Context Managers).

Formatos de Datos Comunes: Manipulación nativa de archivos JSON y archivos CSV.

Módulo 5: Programación Orientada a Objetos (POO)
El paradigma central para construir software a gran escala.

Clases y Objetos: Definición de clases, el constructor __init__ y el significado de self.

Atributos y Métodos: Atributos de instancia vs. atributos de clase. Métodos de instancia, métodos de clase (@classmethod) y métodos estáticos (@staticmethod).

Los 4 Pilares de la POO:

Encapsulamiento: Atributos privados/protegidos (uso de _ y __) y decoradores @property (getters y setters).

Abstracción: Clases y métodos abstractos usando el módulo abc.

Herencia: Herencia simple y múltiple, orden de resolución de métodos (MRO) y uso de super().

Polimorfismo: Modificación del comportamiento de métodos en subclases.

Métodos Mágicos (Dunder Methods): Personalización de clases con __str__, __repr__, __len__, __eq__, etc.

Módulo 6: Python Avanzado y Características del Lenguaje
Conceptos que diferencian a un programador junior de uno senior.

Iteradores y Generadores: El protocolo de iteración (__iter__, __next__), expresiones generadoras y la palabra clave yield para manejo eficiente de memoria.

Decoradores: Funciones que modifican el comportamiento de otras funciones (conceptos de closures y decoradores con argumentos).

Administradores de Contexto Personalizados: Crear bloques with propios usando clases (__enter__, __exit__) o el decorador @contextmanager.

Tipado Dinámico Estricto (Type Hinting): Uso del módulo typing para documentar tipos de datos y validación estática con herramientas como mypy.

Metaprogramación Básica: Entender el funcionamiento de las metaclasas (cómo se crean las clases a sí mismas).

Módulo 7: Concurrencia y Asincronía
Optimización del rendimiento para tareas pesadas o de alta espera (I/O bound).

Hilos vs. Procesos: Diferencias entre threading (bueno para operaciones de red/disco) y multiprocessing (bueno para operaciones intensivas de CPU).

El GIL (Global Interpreter Lock): Qué es el bloqueo global de Python y cómo afecta la ejecución en paralelo.

Programación Asíncrona (asyncio): Funciones asíncronas (async def), suspensión de ejecución (await), el Event Loop y manejo de tareas concurrentes.

Nivel 1: Fundamentos (Lecciones 1 a 15)
El objetivo aquí es dominar la lógica básica y perderle el miedo a la sintaxis.

Lección 1: Hola Mundo y Comentarios -> Tu primer script, la función print() y cómo usar # para documentar código.

Lección 2: Cajas de Almacenamiento (Variables) -> Crear variables, reglas para nombrarlas y el operador de asignación (=).

Lección 3: Textos y Cadenas (str) -> Declarar strings, concatenación con + e introducción básica a las f-strings.

Lección 4: Números en Python (int y float) -> Diferencia entre números enteros y decimales.

Lección 5: Operaciones Matemáticas Básicas -> Suma, resta, multiplicación y división tradicional (/).

Lección 6: Operaciones Matemáticas Avanzadas -> División entera (//), residuo/módulo (%) y exponenciación ().

Lección 7: Valores Verdaderos y Falsos (bool) -> El tipo de dato booleano (True y False).

Lección 8: Preguntas al Código (Operadores de Comparación) -> Uso de >, <, ==, !=, >=, <=.

Lección 8.5: La Importancia de la Indentación -> Comprender cómo Python agrupa el código mediante espacios.

Lección 9: Tomando Decisiones Básicas (if / else) -> Bifurcar el flujo del código según una condición.

Lección 10: Múltiples Caminos (elif) -> Evaluar más de dos opciones en una estructura condicional.

Lección 11: Combinando Condiciones (Operadores Lógicos) -> Uso de and, or y not para lógica compleja.

Lección 12: Repetición Controlada (Bucle while) -> Ejecutar código continuamente mientras una condición sea verdadera.

Lección 13: Contadores y Rangos (range) -> Entender la función range(inicio, fin, paso) para generar secuencias.

Lección 14: Recorriendo Elementos (Bucle for) -> Iterar de forma limpia sobre rangos y secuencias.

Lección 15: Rompiendo Ciclos (break y continue) -> Cómo detener un bucle antes de tiempo o saltarse una iteración.

Nivel 2: Estructuras de Datos y Funciones (Lecciones 16 a 30)
Aquí el estudiante aprende a manejar grupos de datos y a reutilizar su código.

Lección 16: Listas Básicas -> Crear listas, acceder a elementos por índice (positivo y negativo).

Lección 17: Modificando Listas -> Métodos esenciales: append(), insert(), remove() y pop().

Lección 18: Rebanando Listas (Slicing) -> Extraer subconjuntos de listas usando lista[inicio:fin:paso].

Lección 19: Listas Inmutables (Tuplas) -> Qué son las tuplas, por qué existen y el desempaquetado de variables.

Lección 20: Diccionarios: Clave-Valor -> Estructurar datos como objetos del mundo real usando dict.

Lección 21: Métodos de Diccionarios -> Uso seguro con .get(), y recorrido con .keys(), .values() e .items().

Lección 22: Conjuntos (set) -> Evitar duplicados y entender la utilidad de los conjuntos.

Lección 23: Operaciones de Conjuntos -> Unión, intersección y diferencia de datos.

Lección 24: Comprensión de Listas (List Comprehensions) -> Sintaxis elegante de una sola línea para crear listas.

Lección 25: Tus Propios Bloques (Funciones Básicas) -> Definir funciones con def y retornar valores con return.

Lección 26: Parámetros por Nombre y por Defecto -> Hacer funciones más flexibles configurando valores iniciales.

Lección 27: Argumentos Flexibles (*args y kwargs) -> Crear funciones que acepten un número indeterminado de argumentos.

Lección 28: El Alcance de las Variables (Scope) -> Entender la diferencia entre variables locales y globales.

Lección 29: Funciones Anónimas (Lambda) -> Crear funciones rápidas de una sola línea.

Lección 30: Funciones como Herramientas (map y filter) -> Pasar funciones como argumentos de otras funciones.

Nivel 3: Robustez, Archivos y Objetos (Lecciones 31 a 45)
Preparando al estudiante para crear programas reales, organizados y resistentes a errores.

Lección 31: Importar Módulos (import) -> Reutilizar código usando la biblioteca estándar (math, random).

Lección 32: Cuando Todo Falla (try / except) -> Capturar errores comunes para que la app web no colapse.

Lección 33: Control de Errores Avanzado -> Uso de else, finally y cómo lanzar tus propios errores con raise.

Lección 34: Manejo de Archivos (Lectura y Escritura) -> Guardar y leer datos en archivos .txt usando with open().

Lección 35: Intercambio de Datos con JSON -> Leer y escribir archivos en formato JSON para interactuar con la web.

Lección 36: Pensando en Objetos (Clases e Instancias) -> Introducción al molde (Clase) y al objeto real (Instancia).

Lección 37: Inicializando Objetos (El constructor __init__) -> Configurar el estado inicial de un objeto usando self.

Lección 38: Métodos de Instancia -> Darle "acciones" o comportamientos a los objetos.

Lección 39: Métodos de Clase y Estáticos -> Uso de @classmethod y @staticmethod.

Lección 40: Proteger tus Datos (Encapsulamiento) -> Atributos privados con doble guion bajo (__) y el decorador @property.

Lección 41: Reutilizar Moldes (Herencia) -> Crear clases hijas que hereden propiedades de clases padres.

Lección 42: Herencia Múltiple y super() -> Cómo interactúan varias clases padres y el orden de resolución (MRO).

Lección 43: Formas Múltiples (Polimorfismo) -> Compartir el mismo nombre de método pero con comportamientos diferentes.

Lección 44: Clases Abstractas -> Crear contratos estrictos para tus clases usando el módulo abc.

Lección 45: Métodos Mágicos (Dunder Methods) -> Personalizar cómo responde tu objeto a funciones como print() (__str__) o len() (__len__).

Nivel 4: Python Profesional y Avanzado (Lecciones 46 a 60)
Herramientas y conceptos de nivel senior y optimización.

Lección 46: Ahorrando Memoria (Iteradores y Generadores) -> Entender el protocolo de iteración y crear flujos de datos eficientes.

Lección 47: La palabra clave yield -> Escribir funciones generadoras paso a paso.

Lección 48: Modificando Funciones (Decoradores Básicos) -> Entender qué es un decorador y cómo envuelve a una función.

Lección 49: Decoradores Avanzados -> Crear decoradores que acepten argumentos para configuraciones dinámicas.

Lección 50: Administradores de Contexto Propios -> Crear bloques with personalizados usando __enter__ y __exit__.

Lección 51: Tipado en Python (Type Hinting) -> Indicar explícitamente los tipos de datos para prevenir bugs en equipos grandes.

Lección 52: Entornos Virtuales (venv y pip) -> Aislar las librerías de cada proyecto en la computadora.

Lección 53: Pruebas Unitarias Básicas (unittest) -> Escribir tus primeros tests automáticos para asegurar que el código funcione.

Nivel 5: Modularidad y Funciones (Lecciones 71 a 76)
La base para crear código reutilizable y estructurado.

Lección 71: Tu primera Función (def) -> Qué es una función, cómo se define con `def` y cómo se llama.
Lección 72: Retornando valores (return) -> Diferencia entre imprimir (print) y devolver un valor útil con `return`.
Lección 73: Parámetros y Argumentos Básicos -> Funciones que reciben información para trabajar (posicionales y por defecto).
Lección 74: Argumentos Flexibles (*args y **kwargs) -> Cómo aceptar una cantidad infinita de argumentos en tus funciones.
Lección 75: Alcance de Variables (Scope) -> Diferencia entre variables locales y globales (y por qué evitar las globales).
Lección 76: Funciones Anónimas (lambda) -> Escribir mini-funciones de una sola línea para tareas rápidas.

Nivel 6: Estructuras de Datos Complementarias (Lecciones 77 a 80)
Completando el conocimiento de las colecciones en Python.

Lección 77: Tuplas (tuple) -> Estructuras inmutables, desempaquetado de variables y cuándo usarlas en lugar de listas.
Lección 78: Conjuntos (set) Básicos -> Crear sets y entender su propiedad de eliminación automática de duplicados.
Lección 79: Operaciones con Conjuntos -> Unión, intersección y diferencia matemática aplicada a la programación.
Lección 80: Map y Filter -> Usar funciones como herramientas sobre colecciones para transformar datos rápidamente.

Nivel 7: Interacción con el Mundo Real (Archivos) (Lecciones 81 a 84)
Guardando la información de manera persistente en la computadora.

Lección 81: Lectura de Archivos de Texto -> Uso de `open()` y el bloque seguro `with open(...)` para leer `.txt`.
Lección 82: Escritura de Archivos -> Los modos de apertura 'w' (write) y 'a' (append) para guardar datos en texto.
Lección 83: El formato JSON -> Qué es JSON y por qué es el estándar universal del intercambio de datos en la web.
Lección 84: Lectura y Escritura de JSON -> Uso del módulo `json` (`dump`, `load`) para guardar diccionarios en archivos.

Nivel 8: Programación Orientada a Objetos (POO) (Lecciones 85 a 91)
El paradigma esencial para proyectos grandes y profesionales.

Lección 85: Introducción a la POO (Clases e Instancias) -> Entender el concepto del "molde" (clase) y el objeto creado.
Lección 86: El Constructor y el estado (__init__ y self) -> Cómo inicializar los datos de un objeto al momento de crearlo.
Lección 87: Métodos de Instancia -> Dándole comportamiento y acciones a tus objetos.
Lección 88: Encapsulamiento Básico -> Ocultar datos sensibles usando atributos "privados" (doble guion bajo).
Lección 89: Métodos de Clase y Estáticos -> Diferencia entre afectar a un objeto particular y afectar a la clase en general.
Lección 90: Herencia (Reutilizando código) -> Crear clases "hijas" que heredan métodos y atributos de clases "padres".
Lección 91: Polimorfismo y Dunder Methods -> Sobrescribir métodos y usar magia como `__str__` para imprimir objetos.
