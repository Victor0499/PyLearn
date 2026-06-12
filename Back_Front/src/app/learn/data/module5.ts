// Módulo 5: Archivos y POO

export const module5Lessons = [
  {
    id: 81,
    title: "Lectura de Archivos de Texto",
    module: "Interacción con el Mundo Real",
    theory: `## 1. ¿Por qué leer archivos?
Hasta ahora, todos los datos que usamos se "olvidan" al cerrar el programa. Los archivos nos permiten guardar información de forma **persistente** en el disco duro, y leerla cuando sea necesario.

## 2. La función open()
Para abrir un archivo usamos \`open(nombre_archivo, modo)\`.
El modo de lectura es \`'r'\` (de *read*, leer).

\`\`\`python
archivo = open("notas.txt", "r")
contenido = archivo.read()
print(contenido)
archivo.close()  # ¡Importante! Siempre debes cerrarlo.
\`\`\`

> ⚠️ Olvidar \`close()\` puede corromper archivos o desperdiciar memoria.

## 3. El bloque with open() — La forma correcta
Para evitar olvidar el \`close()\`, Python tiene el **administrador de contexto** \`with\`. Al terminar el bloque, Python cierra el archivo **automáticamente**.

\`\`\`python
with open("notas.txt", "r") as f:
    contenido = f.read()
    print(contenido)
# El archivo ya está cerrado aquí, automáticamente.
\`\`\`

## 4. Métodos de lectura
- **\`f.read()\`** → Lee todo el contenido como un único string.
- **\`f.readlines()\`** → Lee todas las líneas y las devuelve como una **lista**.
- **\`f.readline()\`** → Lee solo la primera línea pendiente.
`,
    exercises: [
      {
        id: 8101,
        title: "Ejercicio 1: Leer todo el contenido (read())",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "El código ya creó el archivo `mensaje.txt`. Tu tarea es abrirlo con `open(\"mensaje.txt\", \"r\")`, leer todo su contenido con `.read()` guardándolo en la variable `contenido`, cerrarlo con `.close()`, y finalmente imprimirlo con `print(contenido)`.",
        initialCode: "# Paso previo: creamos el archivo (no lo modifiques)\nwith open('mensaje.txt', 'w') as f:\n    f.write('Hola desde un archivo!')\n\n# Tu turno: abre, lee, cierra e imprime\n",
        outputCheck: "Hola desde un archivo!",
        testCode: "assert 'open(' in __source__, 'Debes usar la función open()'\nassert '.read()' in __source__, 'Debes usar el método .read()'\nassert '.close()' in __source__, 'Debes cerrar el archivo con .close()'",
        hint: "archivo = open('mensaje.txt', 'r')\ncontenido = archivo.read()\narchivo.close()\nprint(contenido)"
      },
      {
        id: 8102,
        title: "Ejercicio 2: La forma correcta (with open)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "El código ya creó `poema.txt`. Usa el bloque `with open(\"poema.txt\", \"r\") as f:` para leer su contenido. Dentro del bloque, llama a `f.read()` y guárdalo en `texto`. Fuera del bloque (sin indentar), imprime `texto`.",
        initialCode: "# Archivo ya creado:\nwith open('poema.txt', 'w') as f:\n    f.write('Rosas son rojas\\nVioletas son azules\\nPython es increíble\\n¡Y tú también!')\n\n# Tu turno: usa with open() para leer\n",
        outputCheck: "Rosas son rojas\nVioletas son azules\nPython es increíble\n¡Y tú también!",
        testCode: "assert 'with open(' in __source__, 'Debes usar el bloque with open()'\nassert '\"r\"' in __source__ or \"'r'\" in __source__, 'Debes abrir en modo lectura r'\nassert '.read()' in __source__, 'Usa f.read() para leer el contenido'",
        hint: "with open('poema.txt', 'r') as f:\n    texto = f.read()\nprint(texto)"
      },
      {
        id: 8103,
        title: "Ejercicio 3: Leer línea por línea (readlines())",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El archivo `lista_compras.txt` ya fue creado. Usa `with open` para abrirlo y usa `.readlines()` para obtener todas las líneas como una **lista** en la variable `lineas`. Luego imprime cuántas líneas tiene con `print(len(lineas))`.",
        initialCode: "# Archivo ya creado:\nwith open('lista_compras.txt', 'w') as f:\n    f.write('Manzanas\\nPan\\nLeche\\nHuevos\\nQueso')\n\n# Tu turno: usa readlines() y cuenta las líneas\n",
        outputCheck: "5",
        testCode: "assert '.readlines()' in __source__, 'Debes usar el método .readlines()'\nassert 'len(' in __source__, 'Debes usar len() para contar las líneas'\nassert 'lineas' in locals(), 'Guarda las líneas en la variable lineas'",
        hint: "with open('lista_compras.txt', 'r') as f:\n    lineas = f.readlines()\nprint(len(lineas))"
      },
      {
        id: 8104,
        title: "Ejercicio 4: Procesando líneas (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "El archivo `calificaciones.txt` tiene notas separadas por líneas. Lee el archivo con `readlines()`, convierte cada línea a número entero con `int(linea.strip())` dentro de un `for`, acumúlalas en `total` y al final imprime el **promedio** dividiendo total entre el número de líneas.",
        initialCode: "# Archivo ya creado:\nwith open('calificaciones.txt', 'w') as f:\n    f.write('90\\n85\\n78\\n92\\n88')\n\n# Tu turno: lee las notas, súmalas y calcula el promedio\ntotal = 0\n\n",
        outputCheck: "86.6",
        testCode: "assert '.readlines()' in __source__ or 'for' in __source__, 'Debes leer y recorrer las líneas'\nassert 'total' in locals(), 'Usa la variable total para acumular'\nassert 'strip()' in __source__ or 'int(' in __source__, 'Convierte cada línea a entero con int()'",
        hint: "with open('calificaciones.txt', 'r') as f:\n    lineas = f.readlines()\nfor linea in lineas:\n    total = total + int(linea.strip())\nprint(round(total / len(lineas), 1))"
      }
    ]
  },
  {
    id: 82,
    title: "Escritura de Archivos",
    module: "Interacción con el Mundo Real",
    theory: `## 1. Escribir en un archivo: el modo 'w'
Para crear un archivo y escribir en él, usamos \`open()\` con el modo \`'w'\` (de *write*).

\`\`\`python
with open("diario.txt", "w") as f:
    f.write("Hoy aprendí a escribir archivos en Python.")
\`\`\`

> ⚠️ **Cuidado:** El modo \`'w'\` **borra todo el contenido existente** y empieza desde cero. Si el archivo no existe, lo crea.

## 2. Agregar contenido: el modo 'a'
Para añadir texto **sin borrar** lo que ya existe, usamos el modo \`'a'\` (de *append*, agregar).

\`\`\`python
with open("diario.txt", "a") as f:
    f.write("\\nEste texto se agrega sin borrar el anterior.")
\`\`\`

## 3. Escribir múltiples líneas: writelines()
\`f.writelines(lista)\` escribe una lista de strings de una sola vez.

\`\`\`python
tareas = ["Estudiar Python\\n", "Hacer ejercicio\\n", "Leer un libro\\n"]
with open("tareas.txt", "w") as f:
    f.writelines(tareas)
\`\`\`

> **Nota:** A diferencia de \`print()\`, \`f.write()\` NO añade automáticamente un salto de línea al final. Tienes que incluirlo tú con \`\\n\`.
`,
    exercises: [
      {
        id: 8201,
        title: "Ejercicio 1: Tu primer archivo escrito (modo 'w')",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Usa `with open(\"bienvenida.txt\", \"w\") as f:` para crear un archivo. Dentro del bloque, usa `f.write(\"Bienvenido a Python!\")` para escribir ese mensaje. Luego, fuera del bloque, ábrelo en modo lectura `'r'` e imprime su contenido para verificarlo.",
        initialCode: "# Paso 1: Escribe en el archivo bienvenida.txt\n\n\n# Paso 2: Ábrelo en modo 'r' e imprime su contenido\n",
        outputCheck: "Bienvenido a Python!",
        testCode: "assert '\"w\"' in __source__ or \"'w'\" in __source__, 'Debes usar el modo w para escribir'\nassert 'f.write(' in __source__, 'Debes usar f.write() para escribir'\nassert '\"r\"' in __source__ or \"'r'\" in __source__, 'Debes leer el archivo para verificarlo'",
        hint: "with open('bienvenida.txt', 'w') as f:\n    f.write('Bienvenido a Python!')\nwith open('bienvenida.txt', 'r') as f:\n    print(f.read())"
      },
      {
        id: 8202,
        title: "Ejercicio 2: El modo 'w' sobreescribe todo",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El código ya creó `agenda.txt` con el texto `'Lunes: Reunión'`. Tu tarea es abrirlo en modo `'w'` y escribir `'Martes: Descanso'`. Luego léelo e imprímelo. Verás que el texto original **desapareció** y fue reemplazado.",
        initialCode: "# Archivo creado con contenido inicial:\nwith open('agenda.txt', 'w') as f:\n    f.write('Lunes: Reunión')\n\n# Tu turno: sobreescribe con 'Martes: Descanso'\n\n\n# Lee e imprime para verificar\n",
        outputCheck: "Martes: Descanso",
        testCode: "assert __source__.count(\"'w'\") >= 2 or __source__.count('\"w\"') >= 2 or (__source__.count(\"'w'\") + __source__.count('\"w\"')) >= 2, 'Debes abrir el archivo en modo w una segunda vez para sobreescribir'\nassert 'Martes: Descanso' in __source__, 'Escribe el texto Martes: Descanso'",
        hint: "with open('agenda.txt', 'w') as f:\n    f.write('Martes: Descanso')\nwith open('agenda.txt', 'r') as f:\n    print(f.read())"
      },
      {
        id: 8203,
        title: "Ejercicio 3: Agregar sin borrar (modo 'a')",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El archivo `historial.txt` ya tiene la línea `'Entrada 1: Python'`. Usa el modo `'a'` para agregar una segunda línea `'\\nEntrada 2: Archivos'` sin borrar la primera. Luego léelo e imprímelo completo.",
        initialCode: "# Archivo con contenido inicial:\nwith open('historial.txt', 'w') as f:\n    f.write('Entrada 1: Python')\n\n# Tu turno: AGREGA 'Entrada 2: Archivos' sin borrar la primera línea\n\n\n# Lee e imprime todo el archivo\n",
        outputCheck: "Entrada 1: Python\nEntrada 2: Archivos",
        testCode: "assert \"'a'\" in __source__ or '\"a\"' in __source__, 'Debes usar el modo a (append) para agregar sin borrar'\nassert 'Entrada 2: Archivos' in __source__, 'Debes escribir la segunda entrada'",
        hint: "with open('historial.txt', 'a') as f:\n    f.write('\\nEntrada 2: Archivos')\nwith open('historial.txt', 'r') as f:\n    print(f.read())"
      },
      {
        id: 8204,
        title: "Ejercicio 4: Lista de tareas con writelines() (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Tienes la lista `tareas = ['Estudiar Python\\n', 'Hacer ejercicio\\n', 'Leer un libro\\n']`. Usa `f.writelines(tareas)` dentro de un bloque `with open('mis_tareas.txt', 'w')` para escribir la lista completa de una vez. Luego lee e imprime el archivo. Presta atención a que los `\\n` ya están incluidos en la lista.",
        initialCode: "tareas = ['Estudiar Python\\n', 'Hacer ejercicio\\n', 'Leer un libro\\n']\n\n# Escribe la lista completa con writelines()\n\n\n# Lee e imprime el archivo\n",
        outputCheck: "Estudiar Python\nHacer ejercicio\nLeer un libro",
        testCode: "assert 'writelines(' in __source__, 'Debes usar f.writelines() para escribir la lista'\nassert 'mis_tareas.txt' in __source__, 'Escribe en el archivo mis_tareas.txt'",
        hint: "with open('mis_tareas.txt', 'w') as f:\n    f.writelines(tareas)\nwith open('mis_tareas.txt', 'r') as f:\n    print(f.read())"
      }
    ]
  },
  {
    id: 83,
    title: "El Formato JSON",
    module: "Interacción con el Mundo Real",
    theory: `## 1. ¿Qué es JSON?
**JSON** (JavaScript Object Notation) es un formato de texto diseñado para intercambiar datos entre sistemas. Aunque nació en JavaScript, hoy es el **estándar universal** en aplicaciones web, APIs y bases de datos.

Se parece mucho a los diccionarios de Python, pero tiene reglas propias:
- Las **claves** siempre deben ir entre comillas dobles \`""\`.
- Los valores pueden ser: strings, números, booleanos (\`true\`/\`false\`), listas o nulos (\`null\`).

\`\`\`json
{
    "nombre": "Ana",
    "edad": 25,
    "activa": true
}
\`\`\`

## 2. El módulo json
Python incluye el módulo \`json\` en su biblioteca estándar. Solo necesitas importarlo.

\`\`\`python
import json
\`\`\`

## 3. json.dumps() — Diccionario → Texto JSON
\`json.dumps(diccionario)\` convierte un diccionario Python en un **string de texto** con formato JSON.

\`\`\`python
import json
usuario = {"nombre": "Leo", "edad": 30}
texto_json = json.dumps(usuario)
print(texto_json)
# '{"nombre": "Leo", "edad": 30}'
print(type(texto_json))  # <class 'str'>
\`\`\`

## 4. json.loads() — Texto JSON → Diccionario
\`json.loads(string)\` hace el proceso inverso: convierte un string JSON en un **diccionario Python** con el que puedes trabajar.

\`\`\`python
texto = '{"nombre": "Leo", "edad": 30}'
datos = json.loads(texto)
print(datos["nombre"])  # Leo
\`\`\`
`,
    exercises: [
      {
        id: 8301,
        title: "Ejercicio 1: Diccionario a JSON (dumps)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Importa el módulo `json`. Tienes el diccionario `producto = {\"nombre\": \"Laptop\", \"precio\": 999, \"disponible\": True}`. Usa `json.dumps(producto)` para convertirlo a string JSON y guárdalo en la variable `texto_json`. Luego imprime `texto_json`.",
        initialCode: "# Importa json\n\n\nproducto = {\"nombre\": \"Laptop\", \"precio\": 999, \"disponible\": True}\n\n# Convierte a JSON string con dumps() y guarda en texto_json\n\n\n# Imprime texto_json\n",
        outputCheck: "{\"nombre\": \"Laptop\", \"precio\": 999, \"disponible\": true}",
        testCode: "assert 'import json' in __source__, 'Debes importar el módulo json'\nassert 'json.dumps(' in __source__, 'Usa json.dumps() para convertir'\nassert 'texto_json' in locals(), 'Guarda el resultado en texto_json'",
        hint: "import json\nproducto = {\"nombre\": \"Laptop\", \"precio\": 999, \"disponible\": True}\ntexto_json = json.dumps(producto)\nprint(texto_json)"
      },
      {
        id: 8302,
        title: "Ejercicio 2: JSON a Diccionario (loads)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes el string `datos_json = '{\"ciudad\": \"Lima\", \"pais\": \"Peru\", \"poblacion\": 10000000}'`. Usa `json.loads(datos_json)` para convertirlo a un diccionario Python y guárdalo en `datos`. Luego imprime el valor de la clave `\"ciudad\"`.",
        initialCode: "import json\ndatos_json = '{\"ciudad\": \"Lima\", \"pais\": \"Peru\", \"poblacion\": 10000000}'\n\n# Convierte a diccionario con loads() y guarda en datos\n\n\n# Imprime el valor de la clave 'ciudad'\n",
        outputCheck: "Lima",
        testCode: "assert 'json.loads(' in __source__, 'Usa json.loads() para convertir el string'\nassert 'datos' in locals(), 'Guarda el resultado en la variable datos'\nassert datos['ciudad'] == 'Lima', 'El diccionario no tiene el valor correcto'",
        hint: "datos = json.loads(datos_json)\nprint(datos['ciudad'])"
      },
      {
        id: 8303,
        title: "Ejercicio 3: JSON legible (indent)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El parámetro `indent` de `json.dumps()` hace el JSON más legible formateando con sangría. Toma el diccionario `config` que ya está definido y conviértelo con `json.dumps(config, indent=4)`. Guárdalo en `bonito` e imprímelo.",
        initialCode: "import json\nconfig = {\n    \"app\": \"PyLearn\",\n    \"version\": \"2.0\",\n    \"modulos\": [\"Básico\", \"Intermedio\", \"Avanzado\"]\n}\n\n# Convierte a JSON con indent=4 y guarda en 'bonito'\n\n\n# Imprime bonito\n",
        outputCheck: "{\n    \"app\": \"PyLearn\",\n    \"version\": \"2.0\",\n    \"modulos\": [\n        \"B\\u00e1sico\",\n        \"Intermedio\",\n        \"Avanzado\"\n    ]\n}",
        testCode: "assert 'indent' in __source__, 'Usa el parámetro indent en json.dumps()'\nassert 'indent=4' in __source__ or 'indent = 4' in __source__, 'El valor del indent debe ser 4'\nassert 'bonito' in locals(), 'Guarda el resultado en la variable bonito'",
        hint: "bonito = json.dumps(config, indent=4)\nprint(bonito)"
      },
      {
        id: 8304,
        title: "Ejercicio 4: Ida y vuelta (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Demuestra que comprendes el ciclo completo. Tienes el diccionario `jugador`. **Paso 1:** Conviértelo a string JSON con `dumps()` y guárdalo en `en_json`. **Paso 2:** Recupéralo de vuelta con `loads()` y guárdalo en `recuperado`. **Paso 3:** Imprime el nombre del jugador accediendo a `recuperado[\"nombre\"]`.",
        initialCode: "import json\njugador = {\"nombre\": \"Cloud\", \"nivel\": 50, \"clase\": \"Guerrero\"}\n\n# Paso 1: Convierte a JSON string\n\n\n# Paso 2: Convierte de vuelta a diccionario\n\n\n# Paso 3: Imprime el nombre del jugador\n",
        outputCheck: "Cloud",
        testCode: "assert 'json.dumps(' in __source__, 'Paso 1: usa json.dumps()'\nassert 'json.loads(' in __source__, 'Paso 2: usa json.loads()'\nassert 'recuperado' in locals(), 'Guarda el resultado de loads() en recuperado'\nassert recuperado['nombre'] == 'Cloud', 'El nombre recuperado debe ser Cloud'",
        hint: "en_json = json.dumps(jugador)\nrecuperado = json.loads(en_json)\nprint(recuperado['nombre'])"
      }
    ]
  },
  {
    id: 84,
    title: "Lectura y Escritura de JSON",
    module: "Interacción con el Mundo Real",
    theory: `## 1. JSON y Archivos
En la lección anterior vimos cómo convertir un diccionario a un string JSON (\`dumps\`) y viceversa (\`loads\`).
Pero lo más común es **guardar o leer ese JSON directamente de un archivo**. Para eso usamos \`json.dump()\` y \`json.load()\`.

> Fíjate que a estas funciones **les falta la "s"** final (que significaba *string*). Estas trabajan con *archivos* directamente.

## 2. Escribir un archivo JSON: json.dump()
\`json.dump(datos, archivo)\` toma un diccionario y lo escribe automáticamente en un archivo en formato JSON.

\`\`\`python
import json

usuario = {"nombre": "Ana", "edad": 25}

with open("datos.json", "w") as f:
    json.dump(usuario, f)  # Guarda el diccionario en el archivo
\`\`\`

## 3. Leer un archivo JSON: json.load()
\`json.load(archivo)\` lee el contenido de un archivo JSON y lo convierte automáticamente a un diccionario o lista en Python.

\`\`\`python
import json

with open("datos.json", "r") as f:
    usuario = json.load(f)

print(usuario["nombre"])  # Ana
\`\`\`
`,
    exercises: [
      {
        id: 8401,
        title: "Ejercicio 1: Guardar configuraciones (dump)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes un diccionario `config = {\"tema\": \"oscuro\", \"volumen\": 80}`. Usa `with open('config.json', 'w') as f:` para crear un archivo. Luego usa `json.dump(config, f)` para guardar el diccionario en él.",
        initialCode: "import json\nconfig = {\"tema\": \"oscuro\", \"volumen\": 80}\n\n# Abre config.json en modo 'w' y usa json.dump()\n\n\n\n# Comprobación (no lo borres)\nwith open('config.json', 'r') as f:\n    print(f.read())\n",
        outputCheck: "{\"tema\": \"oscuro\", \"volumen\": 80}",
        testCode: "assert 'open(' in __source__ and '\"w\"' in __source__ or \"'w'\" in __source__, 'Debes abrir el archivo en modo w'\nassert 'json.dump(config' in __source__, 'Usa json.dump() pasando config y f'",
        hint: "with open('config.json', 'w') as f:\n    json.dump(config, f)"
      },
      {
        id: 8402,
        title: "Ejercicio 2: Cargar un archivo (load)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "El código ya creó un archivo `inventario.json` con algunos ítems. Tu tarea es abrir el archivo en modo lectura `'r'`, usar `json.load(f)` para cargar los datos en la variable `inventario` y luego imprimir cuántas 'Pociones' hay (`inventario[\"Pociones\"]`).",
        initialCode: "import json\n# Archivo ya creado:\nwith open('inventario.json', 'w') as f:\n    f.write('{\"Pociones\": 5, \"Gemas\": 100}')\n\n# Tu turno: usa with open() en modo 'r' y json.load()\n\n\n# Imprime la cantidad de Pociones\n",
        outputCheck: "5",
        testCode: "assert 'json.load(' in __source__, 'Usa json.load(f) para cargar el archivo'\nassert 'inventario[\"Pociones\"]' in __source__ or \"inventario['Pociones']\" in __source__, 'Imprime el valor de Pociones del diccionario cargado'",
        hint: "with open('inventario.json', 'r') as f:\n    inventario = json.load(f)\nprint(inventario['Pociones'])"
      },
      {
        id: 8403,
        title: "Ejercicio 3: Modificar un JSON",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes un archivo `usuario.json` (ya creado). Para modificar un JSON, siempre debes seguir tres pasos: **1) Leerlo** con `load()`, **2) Modificar** el diccionario en memoria, **3) Sobreescribirlo** con `dump()`. Cambia la edad del usuario a 31 y vuelve a guardar.",
        initialCode: "import json\nwith open('usuario.json', 'w') as f:\n    f.write('{\"nombre\": \"Leo\", \"edad\": 30}')\n\n# Paso 1: Leer el archivo con json.load() guardando en 'datos'\nwith open('usuario.json', 'r') as f:\n    datos = json.load(f)\n\n# Paso 2: Modifica la edad a 31 en el diccionario 'datos'\n\n\n# Paso 3: Abre el archivo en modo 'w' y guárdalo de nuevo con json.dump()\n\n\n# Verificación (no lo borres)\nwith open('usuario.json', 'r') as f:\n    print(f.read())\n",
        outputCheck: "{\"nombre\": \"Leo\", \"edad\": 31}",
        testCode: "assert 'datos[\"edad\"] = 31' in __source__ or \"datos['edad'] = 31\" in __source__, 'Modifica la edad en el diccionario datos'\nassert 'json.dump(datos, f)' in __source__, 'Usa json.dump() para guardar los cambios'",
        hint: "datos['edad'] = 31\nwith open('usuario.json', 'w') as f:\n    json.dump(datos, f)"
      },
      {
        id: 8404,
        title: "Ejercicio 4: Calcular desde un JSON (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "El archivo `ventas.json` contiene una **lista de diccionarios**. Cárgalo con `json.load()`. Luego, usa un bucle para sumar todos los valores bajo la clave `\"monto\"` de cada venta y guarda el total en `total_ventas`. Imprime `total_ventas`.",
        initialCode: "import json\n# Archivo ya creado (lista de diccionarios):\nwith open('ventas.json', 'w') as f:\n    f.write('[{\"id\": 1, \"monto\": 150}, {\"id\": 2, \"monto\": 350}, {\"id\": 3, \"monto\": 200}]')\n\n# Abre el archivo y suma los montos\ntotal_ventas = 0\n\n\n# Imprime el total\n",
        outputCheck: "700",
        testCode: "assert 'json.load(' in __source__, 'Carga el archivo con json.load()'\nassert 'for ' in __source__, 'Usa un bucle for para recorrer la lista de ventas'\nassert 'total_ventas' in locals(), 'Guarda la suma en total_ventas'\nassert total_ventas == 700, 'La suma debe ser 700'",
        hint: "with open('ventas.json', 'r') as f:\n    ventas = json.load(f)\nfor venta in ventas:\n    total_ventas += venta['monto']\nprint(total_ventas)"
      }
    ]
  },
  {
    id: 85,
    title: "Introducción a la POO (Clases e Instancias)",
    module: "Programación Orientada a Objetos",
    theory: `## 1. ¿Qué es la POO?
La **Programación Orientada a Objetos (POO)** es una forma de programar donde agrupamos datos y funciones que pertenecen a una misma entidad dentro de un "paquete" llamado **Objeto**.
Hasta ahora, trabajábamos con variables sueltas y funciones sueltas. En la POO, todo está conectado.

## 2. La Clase (El "Molde")
Una **Clase** es como el plano de un arquitecto o un molde de galletas. No es una casa ni es una galleta real, solo define **cómo van a ser**.
Se define usando la palabra \`class\` seguida del nombre (por convención, con Mayúscula Inicial).

\`\`\`python
class Perro:
    pass  # pass significa "no hagas nada por ahora"
\`\`\`

## 3. La Instancia (El Objeto Creado)
Una **Instancia** u **Objeto** es la galleta real creada a partir de ese molde. Para crearla, llamamos a la clase como si fuera una función: \`NombreClase()\`.

\`\`\`python
mi_perrito = Perro()  # Instanciamos la clase
\`\`\`

## 4. Atributos "Al Vuelo"
Una vez que tienes tu objeto creado, puedes pegarle "etiquetas" con información usando un punto \`.\`. A estas variables dentro de un objeto se les llama **atributos**.

\`\`\`python
mi_perrito.nombre = "Firulais"
mi_perrito.edad = 3
print(mi_perrito.nombre)  # Firulais
\`\`\`

> **Nota:** Cada instancia es independiente. Si creas \`otro_perrito = Perro()\`, este no se llamará Firulais a menos que tú se lo asignes.
`,
    exercises: [
      {
        id: 8501,
        title: "Ejercicio 1: Tu primer Molde",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una clase vacía llamada `Gato`. Recuerda usar la palabra `class`, empezar el nombre con mayúscula y usar dos puntos `:`. En la siguiente línea, indentada, escribe `pass` para indicar que la clase está vacía por ahora.",
        initialCode: "# Define la clase Gato vacía usando pass\n\n",
        outputCheck: "",
        testCode: "assert 'class Gato:' in __source__ or 'class Gato :' in __source__ or 'class Gato():' in __source__, 'Debes definir la clase Gato'\nassert 'pass' in __source__, 'Usa la palabra pass dentro de la clase'",
        hint: "class Gato:\n    pass"
      },
      {
        id: 8502,
        title: "Ejercicio 2: Creando un Objeto (Instanciar)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Ya tienes la clase `Vehiculo` definida. Crea un objeto (una instancia) de esta clase llamando a `Vehiculo()` y guárdalo en la variable `mi_coche`. Luego imprime el tipo del objeto usando `print(type(mi_coche))`.",
        initialCode: "class Vehiculo:\n    pass\n\n# Crea una instancia y guárdala en mi_coche\n\n\n# Imprime type(mi_coche)\n",
        outputCheck: "<class '__main__.Vehiculo'>",
        testCode: "assert 'mi_coche' in locals(), 'Debes crear la variable mi_coche'\nassert str(type(mi_coche)) == \"<class '__main__.Vehiculo'>\", 'mi_coche debe ser una instancia de Vehiculo'\nassert 'type(mi_coche)' in __source__, 'Imprime el tipo del objeto'",
        hint: "mi_coche = Vehiculo()\nprint(type(mi_coche))"
      },
      {
        id: 8503,
        title: "Ejercicio 3: Atributos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la clase vacía `Libro` con `pass`. Instánciala y guárdala en `mi_libro`. Luego, asígnale dos atributos usando el punto: `mi_libro.titulo = \"1984\"` y `mi_libro.autor = \"George Orwell\"`. Finalmente imprime ambos atributos separados por un guion (ej. `print(mi_libro.titulo + \" - \" + mi_libro.autor)`).",
        initialCode: "# 1. Crea la clase Libro\n\n\n# 2. Crea la instancia mi_libro\n\n\n# 3. Asígnale titulo ('1984') y autor ('George Orwell')\n\n\n# 4. Imprime titulo - autor\n",
        outputCheck: "1984 - George Orwell",
        testCode: "assert 'class Libro' in __source__, 'Define la clase Libro'\nassert 'mi_libro' in locals(), 'Crea la instancia mi_libro'\nassert getattr(mi_libro, 'titulo', None) == '1984', 'El titulo debe ser 1984'\nassert getattr(mi_libro, 'autor', None) == 'George Orwell', 'El autor debe ser George Orwell'",
        hint: "class Libro:\n    pass\nmi_libro = Libro()\nmi_libro.titulo = '1984'\nmi_libro.autor = 'George Orwell'\nprint(mi_libro.titulo + ' - ' + mi_libro.autor)"
      },
      {
        id: 8504,
        title: "Ejercicio 4: Objetos Independientes",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La clase `Jugador` está definida. Crea **dos** instancias distintas: `jugador1 = Jugador()` y `jugador2 = Jugador()`. Asígnale a `jugador1.nombre = \"Mario\"` y a `jugador2.nombre = \"Luigi\"`. Imprime `jugador1.nombre` y luego en otra línea imprime `jugador2.nombre`. ¡Verás que no se mezclan!",
        initialCode: "class Jugador:\n    pass\n\n# Crea jugador1 con nombre 'Mario'\n\n\n# Crea jugador2 con nombre 'Luigi'\n\n\n# Imprime los nombres\n",
        outputCheck: "Mario\nLuigi",
        testCode: "assert 'jugador1 = ' in __source__, 'Crea jugador1'\nassert 'jugador2 = ' in __source__, 'Crea jugador2'\nassert getattr(jugador1, 'nombre', None) == 'Mario', 'jugador1.nombre debe ser Mario'\nassert getattr(jugador2, 'nombre', None) == 'Luigi', 'jugador2.nombre debe ser Luigi'",
        hint: "jugador1 = Jugador()\njugador1.nombre = 'Mario'\njugador2 = Jugador()\njugador2.nombre = 'Luigi'\nprint(jugador1.nombre)\nprint(jugador2.nombre)"
      },
      {
        id: 8505,
        title: "Ejercicio 5: La Tienda (Reto Integrador)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Pon a prueba lo aprendido. 1) Define una clase vacía `Producto`. 2) Crea una instancia `prod1` y dale el atributo `precio = 15`. 3) Crea otra instancia `prod2` y dale el atributo `precio = 25`. 4) Crea una variable `total` que sume los precios de ambos objetos (`prod1.precio + prod2.precio`) e imprime ese total.",
        initialCode: "# 1. Crea la clase Producto vacía\n\n\n# 2. Crea prod1 y ponle precio = 15\n\n\n# 3. Crea prod2 y ponle precio = 25\n\n\n# 4. Suma los precios e imprime el total\n",
        outputCheck: "40",
        testCode: "assert 'class Producto' in __source__, 'Debes crear la clase Producto'\nassert 'prod1' in locals() and 'prod2' in locals(), 'Debes crear prod1 y prod2'\nassert getattr(prod1, 'precio', 0) == 15, 'prod1.precio debe ser 15'\nassert getattr(prod2, 'precio', 0) == 25, 'prod2.precio debe ser 25'\nassert 'prod1.precio + prod2.precio' in __source__ or 'prod2.precio + prod1.precio' in __source__ or 'precio + prod' in __source__, 'Debes sumar los precios directamente desde los objetos'",
        hint: "class Producto:\n    pass\nprod1 = Producto()\nprod1.precio = 15\nprod2 = Producto()\nprod2.precio = 25\ntotal = prod1.precio + prod2.precio\nprint(total)"
      }
    ]
  },
  {
    id: 86,
    title: "El Constructor y el Estado (__init__ y self)",
    module: "Programación Orientada a Objetos",
    theory: `## 1. El problema de los atributos sueltos
En la lección anterior, creábamos un objeto y luego le pegábamos atributos por fuera (\`mi_perro.nombre = "Rex"\`). 
Esto funciona, pero es peligroso: ¿qué pasa si se te olvida ponerle el nombre y luego intentas imprimirlo? ¡El programa dará un error!

## 2. El Método Constructor: __init__
Para asegurar que todo objeto nazca con sus datos listos, usamos un método especial llamado **constructor**. En Python, este método siempre se llama \`__init__\` (con doble guion bajo a cada lado).
Se ejecuta **automáticamente** en el instante en que creas la instancia.

\`\`\`python
class Guerrero:
    def __init__(self):
        self.energia = 100
        print("¡Guerrero creado!")

# Al ejecutar esto, se llama a __init__ y se imprime el mensaje
g1 = Guerrero()
print(g1.energia)  # 100
\`\`\`

## 3. ¿Qué rayos es "self"?
Notarás que el primer parámetro de \`__init__\` siempre es \`self\`. 
\`self\` es la forma que tiene el objeto de decir **"Yo mismo"**.
Cuando escribes \`self.energia = 100\`, estás diciendo: "A *este* objeto específico, ponle 100 de energía".

## 4. Pasando parámetros al Constructor
La magia real ocurre cuando permites que el molde reciba datos al momento de construir el objeto.

\`\`\`python
class Mascota:
    # self siempre va primero, luego los datos que quieres pedir
    def __init__(self, nombre, especie):
        self.nombre = nombre
        self.especie = especie

# Ahora es OBLIGATORIO pasarle el nombre y la especie
mi_mascota = Mascota("Rex", "Perro")
print(mi_mascota.nombre)  # Rex
\`\`\`
`,
    exercises: [
      {
        id: 8601,
        title: "Ejercicio 1: El Constructor Básico",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea la clase `Personaje`. Dentro, define el método `def __init__(self):` (¡no olvides la indentación y los dos puntos!). Dentro del constructor, asigna `self.vida = 100`. Finalmente, fuera de la clase, crea la instancia `hero = Personaje()` e imprime `hero.vida`.",
        initialCode: "# 1. Define la clase Personaje y su __init__(self)\n\n\n\n# 2. Crea la instancia hero y muestra su vida\n",
        outputCheck: "100",
        testCode: "assert 'class Personaje' in __source__, 'Debes crear la clase Personaje'\nassert 'def __init__(self):' in __source__ or 'def __init__(self) :' in __source__, 'Define el método __init__ con self'\nassert 'self.vida = 100' in __source__, 'Asigna 100 a self.vida'\nassert getattr(hero, 'vida', 0) == 100, 'La vida del héroe debe ser 100'",
        hint: "class Personaje:\n    def __init__(self):\n        self.vida = 100\n\nhero = Personaje()\nprint(hero.vida)"
      },
      {
        id: 8602,
        title: "Ejercicio 2: Constructor con Parámetros",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Completa la clase `Libro`. Su `__init__` debe recibir `self`, `titulo` y `autor`. Dentro del método, guarda esos parámetros en el objeto usando `self.titulo = titulo` y `self.autor = autor`. Luego, crea `mi_libro = Libro(\"1984\", \"Orwell\")` e imprímelo como: `print(mi_libro.titulo)`.",
        initialCode: "class Libro:\n    # Define __init__ recibiendo self, titulo y autor\n    \n        # Guarda los atributos en self\n        \n        \n# Crea mi_libro pasando \"1984\" y \"Orwell\"\n\n\n# Imprime el titulo\n",
        outputCheck: "1984",
        testCode: "assert 'def __init__(self, titulo, autor):' in __source__ or 'def __init__(self,titulo,autor):' in __source__, 'El constructor debe recibir self, titulo y autor'\nassert 'self.titulo = titulo' in __source__, 'Debes asignar self.titulo'\nassert getattr(mi_libro, 'titulo', '') == '1984', 'El titulo del libro debe ser 1984'",
        hint: "class Libro:\n    def __init__(self, titulo, autor):\n        self.titulo = titulo\n        self.autor = autor\n\nmi_libro = Libro('1984', 'Orwell')\nprint(mi_libro.titulo)"
      },
      {
        id: 8603,
        title: "Ejercicio 3: Estado Independiente",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La clase `Coche` ya tiene su constructor listo. Crea dos instancias: `coche1` pasándole `\"Ford\", \"Rojo\"`, y `coche2` pasándole `\"Toyota\", \"Azul\"`. Luego imprime el color del `coche2`.",
        initialCode: "class Coche:\n    def __init__(self, marca, color):\n        self.marca = marca\n        self.color = color\n\n# Crea coche1 ('Ford', 'Rojo')\n\n\n# Crea coche2 ('Toyota', 'Azul')\n\n\n# Imprime el color de coche2\n",
        outputCheck: "Azul",
        testCode: "assert getattr(coche1, 'marca', '') == 'Ford', 'coche1 debe ser Ford'\nassert getattr(coche2, 'color', '') == 'Azul', 'El color de coche2 debe ser Azul'\nassert 'print(coche2.color)' in __source__ or 'print (coche2.color)' in __source__, 'Debes imprimir el color de coche2'",
        hint: "coche1 = Coche('Ford', 'Rojo')\ncoche2 = Coche('Toyota', 'Azul')\nprint(coche2.color)"
      },
      {
        id: 8604,
        title: "Ejercicio 4: La Cuenta Bancaria (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea la clase `Cuenta`. Su `__init__` debe recibir `self`, `titular` y `saldo`. Crea la instancia `mi_cuenta = Cuenta(\"Ana\", 500)`. Luego, simula un depósito: **suma 200** directamente al atributo saldo de tu objeto (`mi_cuenta.saldo += 200`). Imprime el saldo final.",
        initialCode: "# 1. Crea la clase Cuenta y su constructor\n\n\n\n# 2. Crea mi_cuenta para 'Ana' con 500\n\n\n# 3. Súmale 200 al saldo de mi_cuenta\n\n\n# 4. Imprime mi_cuenta.saldo\n",
        outputCheck: "700",
        testCode: "assert 'class Cuenta' in __source__, 'Define la clase Cuenta'\nassert 'def __init__' in __source__, 'Define el constructor'\nassert getattr(mi_cuenta, 'titular', '') == 'Ana', 'El titular debe ser Ana'\nassert mi_cuenta.saldo == 700, 'El saldo final debe ser 700'",
        hint: "class Cuenta:\n    def __init__(self, titular, saldo):\n        self.titular = titular\n        self.saldo = saldo\n\nmi_cuenta = Cuenta('Ana', 500)\nmi_cuenta.saldo += 200\nprint(mi_cuenta.saldo)"
      }
    ]
  },
  {
    id: 87,
    title: "Métodos de Instancia",
    module: "Programación Orientada a Objetos",
    theory: `## 1. Dándole comportamiento a tus objetos
Hasta ahora, nuestros objetos solo guardan datos (atributos como \`nombre\` o \`vida\`). ¡Pero un objeto también puede hacer cosas!
Las funciones que viven dentro de una clase se llaman **Métodos**.

## 2. El parámetro self en los métodos
Al igual que en \`__init__\`, **todos** los métodos de instancia deben recibir \`self\` como primer parámetro. Así el método sabe sobre qué objeto está trabajando.

\`\`\`python
class Pato:
    def hacer_sonido(self):
        print("¡Cuac!")

lucas = Pato()
lucas.hacer_sonido()  # Imprime: ¡Cuac!
\`\`\`
> **Fíjate:** Al llamar al método (\`lucas.hacer_sonido()\`), ¡no tienes que pasarle nada! Python envía a \`lucas\` automáticamente al parámetro \`self\`.

## 3. Accediendo a los propios datos
La verdadera utilidad de los métodos es que pueden acceder a los atributos del objeto usando \`self\`.

\`\`\`python
class Usuario:
    def __init__(self, nombre):
        self.nombre = nombre

    def saludar(self):
        # Usamos self.nombre para saber de quién hablamos
        print(f"Hola, soy {self.nombre}")

user = Usuario("Ana")
user.saludar()  # Hola, soy Ana
\`\`\`

## 4. Modificando el propio estado
Los métodos también pueden modificar los atributos. Así es como los objetos "viven" e interactúan.

\`\`\`python
class Cuenta:
    def __init__(self, saldo):
        self.saldo = saldo
        
    def depositar(self, cantidad):
        self.saldo += cantidad  # Modificamos el propio saldo
\`\`\`
`,
    exercises: [
      {
        id: 8701,
        title: "Ejercicio 1: Tu primer método",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "En la clase `Robot`, crea un método llamado `saludar(self)`. Dentro, simplemente imprime `\"Hola, humano\"`. Luego, llama a ese método desde la instancia `r1` usando `r1.saludar()`.",
        initialCode: "class Robot:\n    # Define el método saludar(self) aquí\n    \n\nr1 = Robot()\n# Llama al método saludar de r1\n",
        outputCheck: "Hola, humano",
        testCode: "assert 'def saludar(self)' in __source__ or 'def saludar(self):' in __source__, 'Define el método saludar(self)'\nassert 'r1.saludar()' in __source__, 'Debes llamar al método desde la instancia'",
        hint: "class Robot:\n    def saludar(self):\n        print('Hola, humano')\n\nr1 = Robot()\nr1.saludar()"
      },
      {
        id: 8702,
        title: "Ejercicio 2: Usando tus propios datos",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "La clase `Perro` ya tiene nombre en el constructor. Crea un método `ladrar(self)` que imprima: `\"¡Guau! Soy \" + self.nombre`. Luego crea a `mi_perro = Perro(\"Rex\")` y llama a `mi_perro.ladrar()`.",
        initialCode: "class Perro:\n    def __init__(self, nombre):\n        self.nombre = nombre\n        \n    # Crea el método ladrar(self)\n    \n\n# Crea mi_perro llamándose 'Rex'\n\n# Llama a ladrar()\n",
        outputCheck: "¡Guau! Soy Rex",
        testCode: "assert 'def ladrar(self):' in __source__ or 'def ladrar(self) :' in __source__, 'Debes crear el método ladrar'\nassert 'self.nombre' in __source__, 'Usa self.nombre en el print'\nassert getattr(mi_perro, 'nombre', '') == 'Rex', 'mi_perro se debe llamar Rex'\nassert 'mi_perro.ladrar()' in __source__, 'Llama al método ladrar()'",
        hint: "class Perro:\n    def __init__(self, nombre):\n        self.nombre = nombre\n    def ladrar(self):\n        print('¡Guau! Soy ' + self.nombre)\n\nmi_perro = Perro('Rex')\nmi_perro.ladrar()"
      },
      {
        id: 8703,
        title: "Ejercicio 3: Alterando el estado",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "En la clase `Personaje`, crea un método `recibir_daño(self, cantidad)` que reciba la cantidad de daño y la **reste** a `self.vida`. Prueba creando el personaje con 100 de vida inicial, llámale a `recibir_daño(30)` y luego imprime su vida final.",
        initialCode: "class Personaje:\n    def __init__(self):\n        self.vida = 100\n        \n    # Crea recibir_daño(self, cantidad) que reste a self.vida\n    \n\nhero = Personaje()\n# Quítale 30 de daño\n\n# Imprime su vida final\n",
        outputCheck: "70",
        testCode: "assert 'def recibir_daño(' in __source__ or 'def recibir_dano(' in __source__, 'Define el método recibir_daño'\nassert '-=' in __source__ or 'self.vida - cantidad' in __source__, 'Debes restar la cantidad a self.vida'\nassert hero.vida == 70, 'La vida final debe ser 70'",
        hint: "class Personaje:\n    def __init__(self):\n        self.vida = 100\n    def recibir_daño(self, cantidad):\n        self.vida -= cantidad\n\nhero = Personaje()\nhero.recibir_daño(30)\nprint(hero.vida)"
      },
      {
        id: 8704,
        title: "Ejercicio 4: Múltiples acciones (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Terminemos la `Cuenta`. Agrega **dos métodos**: `depositar(self, monto)` (suma al saldo) y `retirar(self, monto)` (resta al saldo). Crea la cuenta con 100 de saldo inicial, deposita 50, retira 20 y finalmente imprime el saldo.",
        initialCode: "class Cuenta:\n    def __init__(self, saldo):\n        self.saldo = saldo\n        \n    # def depositar(self, monto):\n    \n    # def retirar(self, monto):\n\n\nmi_cuenta = Cuenta(100)\n# Deposita 50\n\n# Retira 20\n\n# Imprime el saldo\n",
        outputCheck: "130",
        testCode: "assert 'def depositar(' in __source__, 'Falta depositar'\nassert 'def retirar(' in __source__, 'Falta retirar'\nassert mi_cuenta.saldo == 130, 'El saldo final debe ser 130 (100 + 50 - 20)'",
        hint: "class Cuenta:\n    def __init__(self, saldo):\n        self.saldo = saldo\n    def depositar(self, monto):\n        self.saldo += monto\n    def retirar(self, monto):\n        self.saldo -= monto\n\nmi_cuenta = Cuenta(100)\nmi_cuenta.depositar(50)\nmi_cuenta.retirar(20)\nprint(mi_cuenta.saldo)"
      }
    ]
  },
  {
    id: 88,
    title: "Encapsulamiento Básico",
    module: "Programación Orientada a Objetos",
    theory: `## 1. El peligro del acceso público
En Python, los atributos que hemos creado (como \`self.vida\`) son **públicos**. Esto significa que cualquiera puede modificarlos desde afuera, ¡incluso para hacer trampa!

\`\`\`python
hero = Personaje()
hero.vida = 9999999  # ¡Trampa! Modificó el atributo directamente.
\`\`\`

## 2. Atributos Privados (El doble guion bajo)
Para "proteger" un atributo y evitar que sea modificado desde afuera, en Python le ponemos **dos guiones bajos** al principio de su nombre (\`__\`). Esto se llama **Encapsulamiento**.

\`\`\`python
class CajaFuerte:
    def __init__(self):
        self.__secreto = "1234"  # Atributo privado

mi_caja = CajaFuerte()
# print(mi_caja.__secreto)  <-- ESTO DA ERROR. No puedes acceder desde afuera.
\`\`\`

## 3. ¿Cómo usamos lo privado entonces?
Si el atributo está protegido, la única forma de interactuar con él es usando los **métodos de la propia clase**. A estos métodos se les suele llamar *Getters* (para obtener) y *Setters* (para modificar).

\`\`\`python
class Cuenta:
    def __init__(self, saldo):
        self.__saldo = saldo  # Privado
        
    def ver_saldo(self):
        # El método SÍ puede acceder al atributo porque está dentro de la clase
        return self.__saldo
        
mi_cuenta = Cuenta(100)
print(mi_cuenta.ver_saldo())  # 100
\`\`\`

## 4. Validando datos con métodos
El encapsulamiento nos permite poner "aduanas" o reglas. Si alguien quiere cambiar el saldo, debe usar un método, y ese método puede verificar que no sea un número negativo.
`,
    exercises: [
      {
        id: 8801,
        title: "Ejercicio 1: Tu primer atributo privado",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "En la clase `Diario`, crea el constructor (`__init__`) y define un atributo privado llamado `self.__secreto = \"Amo Python\"`. Luego, crea el método `leer(self)` que simplemente imprima `self.__secreto`. Finalmente, crea la instancia `mi_diario = Diario()` y llama al método `mi_diario.leer()`.",
        initialCode: "class Diario:\n    # 1. Define __init__ con el atributo privado __secreto\n    \n\n    # 2. Define el método leer(self) que lo imprima\n    \n\n# 3. Instancia y llama a leer()\n",
        outputCheck: "Amo Python",
        testCode: "assert 'self.__secreto' in __source__, 'Debes crear el atributo privado __secreto'\nassert 'def leer(self):' in __source__ or 'def leer(self) :' in __source__, 'Debes crear el método leer'\nassert 'mi_diario.leer()' in __source__, 'Debes instanciar y llamar a leer()'",
        hint: "class Diario:\n    def __init__(self):\n        self.__secreto = 'Amo Python'\n    def leer(self):\n        print(self.__secreto)\n\nmi_diario = Diario()\nmi_diario.leer()"
      },
      {
        id: 8802,
        title: "Ejercicio 2: Evitando trampas",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "La clase `Banco` tiene `self.__dinero = 1000`. Alguien intentó hacer trampa poniendo `banco.__dinero = 5000` desde afuera (lo cual en Python crea una variable inútil, pero NO cambia el atributo privado original). Crea el método `ver_dinero(self)` que imprima el verdadero `self.__dinero`. Llámalo al final para ver que la trampa falló.",
        initialCode: "class Banco:\n    def __init__(self):\n        self.__dinero = 1000\n        \n    # Crea ver_dinero(self)\n    \n\nmi_banco = Banco()\nmi_banco.__dinero = 5000  # Trampa fallida\n\n# Llama a ver_dinero() para revelar el saldo real\n",
        outputCheck: "1000",
        testCode: "assert 'def ver_dinero(self):' in __source__ or 'def ver_dinero(self) :' in __source__, 'Define ver_dinero'\nassert 'print(self.__dinero)' in __source__, 'Imprime el atributo privado original'\nassert 'mi_banco.ver_dinero()' in __source__, 'Llama al método al final'",
        hint: "class Banco:\n    def __init__(self):\n        self.__dinero = 1000\n    def ver_dinero(self):\n        print(self.__dinero)\n\nmi_banco = Banco()\nmi_banco.__dinero = 5000\nmi_banco.ver_dinero()"
      },
      {
        id: 8803,
        title: "Ejercicio 3: Validando datos (Setters)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "En la clase `Termostato`, tienes `self.__temperatura = 20`. Crea un método `ajustar(self, grados)` que reciba un número. Dentro, usa un `if`: si `grados` está entre 10 y 30 (inclusive), actualiza `self.__temperatura`. Luego imprime `self.__temperatura` sin importar si cambió o no. Afuera, llama a `termostato.ajustar(50)` y luego `termostato.ajustar(25)`.",
        initialCode: "class Termostato:\n    def __init__(self):\n        self.__temperatura = 20\n        \n    # Crea ajustar(self, grados)\n    \n\ntermostato = Termostato()\n# Intenta ajustar a 50 (no debería cambiar)\n\n# Intenta ajustar a 25 (sí debería cambiar)\n",
        outputCheck: "20\n25",
        testCode: "assert 'def ajustar(self' in __source__, 'Crea el método ajustar'\nassert 'if ' in __source__ and '10' in __source__ and '30' in __source__, 'Usa un if para validar entre 10 y 30'\nassert 'termostato.ajustar(50)' in __source__, 'Llama a ajustar con 50'\nassert 'termostato.ajustar(25)' in __source__, 'Llama a ajustar con 25'",
        hint: "class Termostato:\n    def __init__(self):\n        self.__temperatura = 20\n    def ajustar(self, grados):\n        if grados >= 10 and grados <= 30:\n            self.__temperatura = grados\n        print(self.__temperatura)\n\ntermostato = Termostato()\ntermostato.ajustar(50)\ntermostato.ajustar(25)"
      },
      {
        id: 8804,
        title: "Ejercicio 4: Sistema de Login (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Diseña la clase `Sistema`. En su `__init__`, crea `self.__password = \"root\"`. Crea el método `login(self, intento)`. Si `intento` es igual a `self.__password`, imprime `\"Acceso concedido\"`. Si no, imprime `\"Acceso denegado\"`. Afuera, crea `pc = Sistema()` y llama a `pc.login(\"1234\")` y luego a `pc.login(\"root\")`.",
        initialCode: "class Sistema:\n    # Define __init__ y el atributo privado\n    \n    # Define login(self, intento)\n    \n\npc = Sistema()\n# Intenta login con '1234'\n\n# Intenta login con 'root'\n",
        outputCheck: "Acceso denegado\nAcceso concedido",
        testCode: "assert 'self.__password' in __source__, 'Usa self.__password en el constructor'\nassert 'def login(self, intento):' in __source__ or 'def login(self,intento):' in __source__, 'Crea el método login'\nassert 'Acceso concedido' in __source__ and 'Acceso denegado' in __source__, 'Maneja ambos casos con if/else'\nassert 'pc.login(\"1234\")' in __source__ or \"pc.login('1234')\" in __source__, 'Llama a login con 1234'",
        hint: "class Sistema:\n    def __init__(self):\n        self.__password = 'root'\n    def login(self, intento):\n        if intento == self.__password:\n            print('Acceso concedido')\n        else:\n            print('Acceso denegado')\n\npc = Sistema()\npc.login('1234')\npc.login('root')"
      }
    ]
  },
  {
    id: 89,
    title: "Métodos de Clase y Estáticos",
    module: "Programación Orientada a Objetos",
    theory: `## 1. Atributos de Clase vs Atributos de Instancia
Hasta ahora, hemos usado atributos que pertenecen a cada *objeto* (e.g. cada Perro tiene su propio \`nombre\`). 
Pero ¿y si queremos un dato compartido por **toda la clase**? A eso se le llama **Atributo de Clase**.

\`\`\`python
class Alien:
    cantidad = 0  # Pertenece a la clase entera, no a un alien específico

    def __init__(self):
        Alien.cantidad += 1  # Cada vez que nace uno, sumamos 1 al total
\`\`\`

## 2. Métodos de Clase (@classmethod)
Si quieres modificar un atributo de la clase (en lugar del objeto), usas un método de clase. En lugar de \`self\`, estos reciben \`cls\` (la clase misma) y se decoran con \`@classmethod\`.

\`\`\`python
class Alien:
    cantidad = 0
    
    @classmethod
    def cuantos_hay(cls):
        print(f"Hay {cls.cantidad} aliens vivos.")

Alien.cuantos_hay()  # Se llama directo desde la clase, sin crear objetos
\`\`\`

## 3. Métodos Estáticos (@staticmethod)
A veces quieres poner una función dentro de una clase solo por organización, pero que no necesite acceder ni al objeto (\`self\`) ni a la clase (\`cls\`). Estos se decoran con \`@staticmethod\`.

\`\`\`python
class Calculadora:
    @staticmethod
    def sumar(a, b):
        return a + b

print(Calculadora.sumar(5, 10))  # 15
\`\`\`
`,
    exercises: [
      {
        id: 8901,
        title: "Ejercicio 1: Atributo de Clase",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea la clase `Contador`. Declara un atributo de clase `cuenta = 0` directamente bajo el nombre de la clase. En el constructor (`__init__`), aumenta `Contador.cuenta += 1`. Crea dos instancias (`c1 = Contador()` y `c2 = Contador()`). Imprime `Contador.cuenta`.",
        initialCode: "class Contador:\n    # 1. Crea el atributo de clase cuenta = 0\n    \n    # 2. Crea el __init__ que sume 1 a Contador.cuenta\n    \n\n# 3. Crea c1 y c2\n\n# 4. Imprime Contador.cuenta\n",
        outputCheck: "2",
        testCode: "assert 'cuenta = 0' in __source__, 'Debes crear el atributo cuenta'\nassert 'Contador.cuenta += 1' in __source__ or 'Contador.cuenta = Contador.cuenta + 1' in __source__, 'Suma 1 a Contador.cuenta en el init'\nassert 'print(Contador.cuenta)' in __source__, 'Imprime Contador.cuenta'",
        hint: "class Contador:\n    cuenta = 0\n    def __init__(self):\n        Contador.cuenta += 1\n\nc1 = Contador()\nc2 = Contador()\nprint(Contador.cuenta)"
      },
      {
        id: 8902,
        title: "Ejercicio 2: El Método de Clase",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa el decorador `@classmethod`. En la clase `Alien`, crea el método `ver_cantidad(cls)` y haz que devuelva (`return`) el valor de `cls.cantidad`. Luego, llama a `print(Alien.ver_cantidad())`.",
        initialCode: "class Alien:\n    cantidad = 42\n    \n    # Usa @classmethod\n    # def ver_cantidad(cls):\n        \n\n# Imprime el resultado de Alien.ver_cantidad()\n",
        outputCheck: "42",
        testCode: "assert '@classmethod' in __source__, 'Usa el decorador @classmethod'\nassert 'def ver_cantidad(cls):' in __source__ or 'def ver_cantidad(cls) :' in __source__, 'El método debe recibir cls'\nassert 'return cls.cantidad' in __source__, 'Devuelve cls.cantidad'\nassert 'print(Alien.ver_cantidad())' in __source__, 'Imprime el llamado al método'",
        hint: "class Alien:\n    cantidad = 42\n    @classmethod\n    def ver_cantidad(cls):\n        return cls.cantidad\n\nprint(Alien.ver_cantidad())"
      },
      {
        id: 8903,
        title: "Ejercicio 3: El Método Estático",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa el decorador `@staticmethod`. En la clase `Math`, crea un método `restar(a, b)` que no reciba ni `self` ni `cls`. Solo devuelve `a - b`. Fuera de la clase, imprime el resultado de `Math.restar(20, 5)`.",
        initialCode: "class Math:\n    # Usa @staticmethod\n    # def restar(a, b):\n        \n\n# Imprime Math.restar(20, 5)\n",
        outputCheck: "15",
        testCode: "assert '@staticmethod' in __source__, 'Usa el decorador @staticmethod'\nassert 'def restar(a, b):' in __source__ or 'def restar(a,b):' in __source__, 'El método NO debe recibir self ni cls'\nassert 'print(Math.restar(20, 5))' in __source__, 'Llama al método estático correctamente'",
        hint: "class Math:\n    @staticmethod\n    def restar(a, b):\n        return a - b\n\nprint(Math.restar(20, 5))"
      },
      {
        id: 8904,
        title: "Ejercicio 4: Ajuste Salarial (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "La clase `Empleado` tiene un `sueldo_base = 1000`. Crea el método de clase `@classmethod def cambiar_base(cls, nuevo)` que asigne el nuevo valor a `cls.sueldo_base`. Fuera de la clase, crea `emp1 = Empleado()` y llama a `Empleado.cambiar_base(1200)`. Finalmente imprime `Empleado.sueldo_base` y `emp1.sueldo_base` (ambos deben imprimir 1200 porque es un atributo compartido).",
        initialCode: "class Empleado:\n    sueldo_base = 1000\n    \n    # Define el @classmethod\n    \n\n# 1. Crea la instancia emp1\n\n# 2. Llama a Empleado.cambiar_base(1200)\n\n# 3. Imprime Empleado.sueldo_base\n\n# 4. Imprime emp1.sueldo_base\n",
        outputCheck: "1200\n1200",
        testCode: "assert '@classmethod' in __source__, 'Falta el decorador'\nassert 'def cambiar_base(cls, nuevo)' in __source__ or 'def cambiar_base(cls,nuevo)' in __source__, 'Define cambiar_base con cls'\nassert 'cls.sueldo_base = nuevo' in __source__, 'Asigna el nuevo sueldo'\nassert 'Empleado.cambiar_base(1200)' in __source__, 'Ejecuta el cambio de base'",
        hint: "class Empleado:\n    sueldo_base = 1000\n    @classmethod\n    def cambiar_base(cls, nuevo):\n        cls.sueldo_base = nuevo\n\nemp1 = Empleado()\nEmpleado.cambiar_base(1200)\nprint(Empleado.sueldo_base)\nprint(emp1.sueldo_base)"
      }
    ]
  },
  {
    id: 90,
    title: "Herencia (Parte 1)",
    module: "Programación Orientada a Objetos",
    theory: `## 1. No repitas código: Hereda
A veces quieres crear una clase que es muy parecida a otra, pero con un par de extras. En lugar de copiar y pegar todo, puedes usar **Herencia**.
Una clase "Hija" hereda todos los métodos y atributos de una clase "Padre".

\`\`\`python
class Vehiculo:
    def arrancar(self):
        print("Brum brum...")

# La clase Moto hereda de Vehiculo poniendo (Vehiculo)
class Moto(Vehiculo):
    pass

mi_moto = Moto()
mi_moto.arrancar()  # ¡Brum brum...! (Lo heredó gratis)
\`\`\`

## 2. Heredando Constructores (__init__)
Si la clase padre tiene un constructor, la hija también lo hereda. Si creas una instancia de la hija, debes pasarle los parámetros que pedía el padre.

\`\`\`python
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

class Gato(Animal):
    pass

gato = Gato("Michi")
print(gato.nombre)  # Michi
\`\`\`

## 3. Añadiendo comportamiento nuevo
La clase hija puede tener sus propios métodos, los cuales no existen en el padre.
\`\`\`python
class Pajaro(Animal):
    def volar(self):
        print("¡Estoy volando!")

p = Pajaro("Piolin")
p.volar()
\`\`\`

## 4. Sobreescritura (Polimorfismo Básico)
Si el hijo define un método con **el mismo nombre** que un método del padre, el del hijo "aplasta" (sobreescribe) al del padre cuando usas al hijo.
\`\`\`python
class Perro(Animal):
    def hablar(self):
        print("¡Guau!")
\`\`\`
`,
    exercises: [
      {
        id: 9001,
        title: "Ejercicio 1: Heredar un método",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Se te da la clase `Vehiculo` con el método `encender()`. Define una clase llamada `Coche` que herede de `Vehiculo` (usa la sintaxis `class Coche(Vehiculo): pass`). Luego crea una instancia de Coche y llama a `encender()`.",
        initialCode: "class Vehiculo:\n    def encender(self):\n        print('Motor en marcha')\n\n# 1. Crea la clase Coche que herede de Vehiculo\n\n\n# 2. Crea mi_coche = Coche()\n\n\n# 3. Llama a mi_coche.encender()\n",
        outputCheck: "Motor en marcha",
        testCode: "assert 'class Coche(Vehiculo)' in __source__, 'Coche debe heredar de Vehiculo'\nassert 'mi_coche.encender()' in __source__, 'Llama al método heredado encender()'",
        hint: "class Coche(Vehiculo):\n    pass\nmi_coche = Coche()\nmi_coche.encender()"
      },
      {
        id: 9002,
        title: "Ejercicio 2: Heredar atributos",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "La clase `Ave` asigna `self.tiene_plumas = True` en su constructor. Define la clase `Pato(Ave): pass`. Luego crea un pato e imprime su atributo `tiene_plumas`.",
        initialCode: "class Ave:\n    def __init__(self):\n        self.tiene_plumas = True\n\n# 1. Define Pato heredando de Ave\n\n\n# 2. Crea donald = Pato()\n\n\n# 3. Imprime donald.tiene_plumas\n",
        outputCheck: "True",
        testCode: "assert 'class Pato(Ave)' in __source__, 'Pato debe heredar de Ave'\nassert 'donald = Pato()' in __source__, 'Crea la instancia de Pato'\nassert 'print(donald.tiene_plumas)' in __source__, 'Imprime el atributo heredado'",
        hint: "class Pato(Ave):\n    pass\ndonald = Pato()\nprint(donald.tiene_plumas)"
      },
      {
        id: 9003,
        title: "Ejercicio 3: Comportamiento extra",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La clase `Usuario` tiene `login()`. Define `class Admin(Usuario):` y dentro crea un nuevo método `banear(self)` que imprima `\"Usuario baneado\"`. Fuera, crea `admin = Admin()` y llama primero a `login()` y luego a `banear()`.",
        initialCode: "class Usuario:\n    def login(self):\n        print('Entrando al sistema')\n\n# 1. Define class Admin(Usuario)\n    # 2. Define def banear(self)\n        \n\n# 3. Crea admin, llama a login() y a banear()\n",
        outputCheck: "Entrando al sistema\nUsuario baneado",
        testCode: "assert 'class Admin(Usuario):' in __source__, 'Admin hereda de Usuario'\nassert 'def banear(self):' in __source__ or 'def banear(self) :' in __source__, 'Crea el método banear'\nassert 'admin.login()' in __source__ and 'admin.banear()' in __source__, 'Llama a ambos métodos'",
        hint: "class Admin(Usuario):\n    def banear(self):\n        print('Usuario baneado')\n\nadmin = Admin()\nadmin.login()\nadmin.banear()"
      },
      {
        id: 9004,
        title: "Ejercicio 4: Sobreescritura simple (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "La clase `Enemigo` tiene el método `hablar(self)` que imprime `\"Grrr\"`. Crea `class Jefe(Enemigo):` pero **sobreescribe** el método `hablar(self)` para que imprima `\"¡Te destruiré!\"`. Crea un `Enemigo` y un `Jefe`, y haz que ambos hablen en ese orden.",
        initialCode: "class Enemigo:\n    def hablar(self):\n        print('Grrr')\n\n# 1. Crea class Jefe(Enemigo)\n    # 2. Sobreescribe def hablar(self)\n        \n\n# 3. Crea un enemigo normal y hazlo hablar\n\n\n# 4. Crea un jefe y hazlo hablar\n",
        outputCheck: "Grrr\n¡Te destruiré!",
        testCode: "assert 'class Jefe(Enemigo):' in __source__, 'Crea el Jefe'\nassert 'def hablar(self):' in __source__ and __source__.count('def hablar(self):') >= 2, 'Debes sobreescribir hablar'\nassert '¡Te destruiré!' in __source__, 'El jefe debe decir la frase correcta'",
        hint: "class Jefe(Enemigo):\n    def hablar(self):\n        print('¡Te destruiré!')\n\ne = Enemigo()\ne.hablar()\nj = Jefe()\nj.hablar()"
      }
    ]
  },
  {
    id: 91,
    title: "Herencia (Parte 2)",
    module: "Programación Orientada a Objetos",
    theory: `## 1. No borres al padre, expándelo: super()
A veces quieres sobreescribir un método, pero **no quieres perder lo que hacía el padre**. Para llamar al método original del padre desde adentro del hijo, usamos \`super()\`.

\`\`\`python
class Persona:
    def saludar(self):
        print("Hola.")

class Estudiante(Persona):
    def saludar(self):
        super().saludar()  # Llama al saludar() de Persona
        print("Y además, soy estudiante.")

e = Estudiante()
e.saludar()
# Imprime:
# Hola.
# Y además, soy estudiante.
\`\`\`

## 2. El uso más común: super().__init__()
Casi siempre usamos \`super()\` en el constructor. Así, dejamos que el padre inicialice sus cosas, y luego nosotros añadimos nuestros propios atributos extras.

\`\`\`python
class Vehiculo:
    def __init__(self, marca):
        self.marca = marca

class Avion(Vehiculo):
    def __init__(self, marca, altitud_max):
        super().__init__(marca)  # El padre guarda la marca
        self.altitud = altitud_max  # Nosotros guardamos la altitud

a = Avion("Boeing", 10000)
print(a.marca, a.altitud)  # Boeing 10000
\`\`\`

## 3. Polimorfismo Básico
El **Polimorfismo** significa "muchas formas". En POO, ocurre cuando tienes una lista de objetos diferentes (Perros, Gatos, Vacas) que comparten un mismo método padre (\`hablar()\`), y puedes recorrerlos en un bucle llamando al mismo método, pero cada uno responde a su manera.

## 4. Métodos Mágicos (Dunder Methods): __str__
Python tiene métodos especiales con dobles guiones bajos (Dunder = Double Under). Ya conoces \`__init__\`. Otro muy útil es \`__str__\`, que define **cómo se debe imprimir tu objeto** cuando haces \`print(objeto)\`.

\`\`\`python
class Libro:
    def __init__(self, titulo):
        self.titulo = titulo
        
    def __str__(self):
        return f"Libro: {self.titulo}"

mi_libro = Libro("1984")
print(mi_libro)  # ¡Imprime "Libro: 1984" en lugar de <__main__.Libro object at 0x... >!
\`\`\`
`,
    exercises: [
      {
        id: 9101,
        title: "Ejercicio 1: Extendiendo un método",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "La clase `Vehiculo` tiene un método `describir()`. Crea la clase `Coche(Vehiculo)`. Sobreescribe `describir(self)` llamando a `super().describir()` y luego imprimiendo `\"Tiene 4 ruedas\"`. Crea un `Coche` y descríbelo.",
        initialCode: "class Vehiculo:\n    def describir(self):\n        print('Es una máquina para viajar')\n\n# 1. Crea class Coche(Vehiculo)\n    # 2. Define describir(self)\n        # 3. Llama a super().describir()\n        \n\n# 4. Crea mi_coche = Coche() y llama a describir()\n",
        outputCheck: "Es una máquina para viajar\nTiene 4 ruedas",
        testCode: "assert 'super().describir()' in __source__, 'Llama a super().describir()'\nassert 'Tiene 4 ruedas' in __source__, 'Imprime el texto extra del Coche'\nassert 'mi_coche.describir()' in __source__, 'Llama a describir()'",
        hint: "class Coche(Vehiculo):\n    def describir(self):\n        super().describir()\n        print('Tiene 4 ruedas')\n\nmi_coche = Coche()\nmi_coche.describir()"
      },
      {
        id: 9102,
        title: "Ejercicio 2: super().__init__()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La clase `Figura` guarda el `color`. Define `Circulo(Figura)`. Su `__init__` debe recibir `self, color, radio`. Usa `super().__init__(color)` para guardar el color, y luego guarda `self.radio = radio`. Instancia `c = Circulo(\"Rojo\", 5)` e imprime `c.color` y `c.radio`.",
        initialCode: "class Figura:\n    def __init__(self, color):\n        self.color = color\n\n# Crea Circulo(Figura)\n    # __init__(self, color, radio):\n        # super().__init__(...)\n        \n\n# Crea el Circulo 'Rojo', 5 e imprime sus dos atributos\n",
        outputCheck: "Rojo\n5",
        testCode: "assert 'def __init__(self, color, radio)' in __source__ or 'def __init__(self,color,radio)' in __source__, 'El init recibe 3 parámetros'\nassert 'super().__init__(color)' in __source__, 'Llama al init del padre'\nassert 'self.radio = radio' in __source__, 'Guarda el radio'\nassert c.color == 'Rojo' and c.radio == 5, 'El círculo debe ser Rojo y de radio 5'",
        hint: "class Circulo(Figura):\n    def __init__(self, color, radio):\n        super().__init__(color)\n        self.radio = radio\n\nc = Circulo('Rojo', 5)\nprint(c.color)\nprint(c.radio)"
      },
      {
        id: 9103,
        title: "Ejercicio 3: Polimorfismo en acción",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tenes las clases `Gato` y `Perro`. Ambas tienen un método `sonido()`. Se te da una lista llamada `animales` que contiene un gato y un perro. Usa un bucle `for` para recorrer la lista, y llama al método `sonido()` de cada animal.",
        initialCode: "class Gato:\n    def sonido(self):\n        print('Miau')\n\nclass Perro:\n    def sonido(self):\n        print('Guau')\n\nanimales = [Gato(), Perro()]\n\n# Usa un for para recorrer animales y hacer que cada uno emita su sonido\n",
        outputCheck: "Miau\nGuau",
        testCode: "assert 'for ' in __source__, 'Debes usar un bucle for'\nassert '.sonido()' in __source__, 'Debes llamar al método sonido()'",
        hint: "for a in animales:\n    a.sonido()"
      },
      {
        id: 9104,
        title: "Ejercicio 4: El Mago (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Juntemos todo. `Personaje` pide `vida` y `ataque`. Crea la clase `Mago(Personaje)`. Su `__init__` debe pedir `self, vida, ataque, mana`. Usa `super().__init__(vida, ataque)` para la base, y asigna `self.mana = mana`. Crea `merlin = Mago(100, 20, 50)`. Imprime su vida, ataque y maná.",
        initialCode: "class Personaje:\n    def __init__(self, vida, ataque):\n        self.vida = vida\n        self.ataque = ataque\n\n# 1. Crea Mago(Personaje)\n    # 2. Define su constructor con self, vida, ataque, mana\n        # 3. Usa super()\n        # 4. Asigna el mana\n\n# 5. Instancia merlin con 100, 20, 50\n\n# 6. Imprime los tres atributos (uno por línea)\n",
        outputCheck: "100\n20\n50",
        testCode: "assert 'class Mago(Personaje)' in __source__, 'Crea el Mago'\nassert 'super().__init__(vida, ataque)' in __source__ or 'super().__init__(vida,ataque)' in __source__, 'Llama al padre correctamente'\nassert getattr(merlin, 'mana', 0) == 50, 'El mana debe ser 50'\nassert merlin.vida == 100 and merlin.ataque == 20, 'Atributos base incorrectos'",
        hint: "class Mago(Personaje):\n    def __init__(self, vida, ataque, mana):\n        super().__init__(vida, ataque)\n        self.mana = mana\n\nmerlin = Mago(100, 20, 50)\nprint(merlin.vida)\nprint(merlin.ataque)\nprint(merlin.mana)"
      },
      {
        id: 9105,
        title: "Ejercicio 5: La Magia de __str__",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La clase `Pelicula` tiene su título y director en el constructor. Si imprimes `p` ahora mismo, verás algo feo en memoria. Define el método `def __str__(self):` y haz que **devuelva** el string `f\"{self.titulo} dirigida por {self.director}\"`. Luego usa `print(p)` para ver la magia.",
        initialCode: "class Pelicula:\n    def __init__(self, titulo, director):\n        self.titulo = titulo\n        self.director = director\n        \n    # Define __str__(self) aquí\n    \n\np = Pelicula('Inception', 'Nolan')\n# Imprime el objeto p\n",
        outputCheck: "Inception dirigida por Nolan",
        testCode: "assert 'def __str__(self):' in __source__ or 'def __str__(self) :' in __source__, 'Debes definir __str__'\nassert 'return ' in __source__, '__str__ debe usar return, no print'\nassert 'print(p)' in __source__, 'Debes imprimir el objeto p directamente'",
        hint: "class Pelicula:\n    def __init__(self, titulo, director):\n        self.titulo = titulo\n        self.director = director\n    def __str__(self):\n        return f'{self.titulo} dirigida por {self.director}'\n\np = Pelicula('Inception', 'Nolan')\nprint(p)"
      }
    ]
  }
];
