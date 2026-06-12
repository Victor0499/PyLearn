// Módulo 4: Funciones y Modularidad

export const module4Lessons = [
  {
    id: 68,
    title: "La instrucción import",
    module: "Módulos y Bibliotecas",
    theory: `## 1. Conceptos Fundamentales
- **Módulo**: Es un archivo con extensión \`.py\` que contiene definiciones de código (funciones, variables). Sirve para fragmentar un programa extenso.
- **Biblioteca**: Es una colección de múltiples módulos organizados bajo un propósito común.
- **Instrucción \`import\`**: Es el mecanismo para incorporar módulos externos o nativos a tu script.

> **Convención Esencial:** Por buena práctica, todas las declaraciones \`import\` deben ir **estrictamente al inicio del archivo**, antes de cualquier otra lógica.

## 2. Las 4 Alternativas de Sintaxis (usando \`math\`)

### Método 1: Importar completo
Se introduce todo el espacio de nombres. Debes usar el nombre del módulo seguido de un punto \`.\` para acceder a sus funciones.
\`\`\`python
import math
print(math.sqrt(9)) # 3.0
\`\`\`

### Método 2: Importar con Alias (\`as\`)
Si el nombre es largo, puedes renombrarlo localmente para simplificar.
\`\`\`python
import math as m
print(m.sqrt(16)) # 4.0
\`\`\`

### Método 3: Importar elementos específicos
Extraes únicamente las funciones que necesitas. Se invocan directamente sin el prefijo del módulo.
\`\`\`python
from math import sqrt, sin
print(sqrt(25)) # 5.0
\`\`\`

### Método 4: Importar TODO (Evitarlo)
El asterisco \`*\` inyecta todas las funciones al entorno local. Es **mala práctica** porque consume memoria y puede causar colisiones de nombres con tus propias funciones.
\`\`\`python
from math import *
print(sqrt(36)) # 6.0
\`\`\``,
    exercises: [
      {
        id: 6801,
        title: "Ejercicio 1: Importar completo",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Usa el Método 1 para importar el módulo \`math\` completo. Luego utiliza su función \`sqrt()\` para imprimir la raíz cuadrada de \`81\`.",
        initialCode: "# 1. Importa math\n\n# 2. Imprime la raíz cuadrada de 81 usando math.sqrt()\n",
        outputCheck: "9.0",
        testCode: "assert 'import math' in __source__\nassert 'math.sqrt(' in __source__\nassert 'from' not in __source__",
        hint: "import math\nprint(math.sqrt(81))"
      },
      {
        id: 6802,
        title: "Ejercicio 2: Uso de alias",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Aplica el Método 2 para importar \`math\` con el alias \`m\`. A continuación, usa ese alias para calcular e imprimir la raíz cuadrada de \`100\` (\`m.sqrt()\`).",
        initialCode: "# Importa math con el alias 'm'\n\n# Imprime la raíz cuadrada de 100 usando el alias\n",
        outputCheck: "10.0",
        testCode: "assert 'import math as m' in __source__\nassert 'm.sqrt(' in __source__",
        hint: "import math as m\nprint(m.sqrt(100))"
      },
      {
        id: 6803,
        title: "Ejercicio 3: Elementos específicos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa el Método 3 (\`from ... import\`) para importar **únicamente** la función \`pow\` del módulo \`math\`. Esta función eleva una base a un exponente. Imprime el resultado de elevar \`2\` a la \`3\` usando \`pow(2, 3)\` directamente sin prefijos.",
        initialCode: "# Importa solo 'pow' desde 'math'\n\n# Imprime pow(2, 3)\n",
        outputCheck: "8.0",
        testCode: "assert 'from math import pow' in __source__\nassert 'math.pow' not in __source__",
        hint: "from math import pow\nprint(pow(2, 3))"
      },
      {
        id: 6804,
        title: "Ejercicio 4: El peligroso comodín",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Aunque sea mala práctica, es importante que sepas reconocer el Método 4. Usa el comodín \`*\` para importar todo desde \`math\`. Luego, imprime el valor de la variable \`pi\` (que viene incluida en math) de forma directa sin prefijos.",
        initialCode: "# Importa todo desde math usando el comodín *\n\n# Imprime el valor de pi\n",
        outputCheck: "",
        testCode: "assert 'from math import *' in __source__ or \"from math import *\" in __source__\nassert 'print(pi)' in __source__.replace(' ', '')",
        hint: "from math import *\nprint(pi)"
      }
    ]
  },
  {
    id: 69,
    title: "El módulo random – Números aleatorios",
    module: "Módulos y Bibliotecas",
    theory: `## 1. El Módulo random y la Pseudoaleatoriedad
El módulo \`random\` viene incorporado por defecto en la biblioteca estándar de Python (no requiere instalaciones externas) y proporciona herramientas para generar **números pseudoaleatorios**. 

Se les llama *pseudoaleatorios* porque se calculan mediante un algoritmo matemático, pero simulan perfectamente el azar para aplicaciones comunes (juegos, sorteos, simulaciones).

## 2. Las 3 Funciones Clave

### A. \`randint(a, b)\`
Devuelve un número entero aleatorio dentro del rango **inclusivo** \`[a, b]\`.
*Particularidad:* Tanto el límite inferior como el superior tienen la posibilidad de salir sorteados.
\`\`\`python
import random
print(random.randint(1, 100)) # Ej: 85
\`\`\`

### B. \`random()\`
Devuelve un número de punto flotante (decimal) aleatorio en el rango \`[0.0, 1.0)\`.
*Particularidad:* No acepta ningún argumento. El 1.0 está estrictamente **excluido**.
\`\`\`python
import random
print(random.random()) # Ej: 0.71239...
\`\`\`

### C. \`randrange(start, stop, step)\`
Devuelve un elemento al azar a partir de un rango con saltos (igual a la función \`range()\`).
*Particularidad:* El valor \`stop\` está **excluido**. Es ideal para forzar patrones, por ejemplo, obtener solo números pares o impares.
\`\`\`python
import random
print(random.randrange(0, 100, 2)) # Ej: 64 (siempre par)
\`\`\`

El uso de \`random\` es fundamental para romper el comportamiento lineal y predecible de los programas de cómputo.`,
    exercises: [
      {
        id: 6901,
        title: "Ejercicio 1: Tirar un dado",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Simulemos un dado de 6 caras. Importa el módulo \`random\`. Usa la función \`randint()\` para generar un entero aleatorio entre \`1\` y \`6\` (ambos inclusive). Guárdalo en la variable \`dado\` e imprime el resultado de la variable.",
        initialCode: "# Importa random\n\n# Genera el número con randint() en la variable 'dado'\n\n# Imprímela\n",
        outputCheck: "",
        testCode: "assert 'import random' in __source__\nassert 'randint(' in __source__\nassert 'dado' in locals()\nassert isinstance(dado, int) and 1 <= dado <= 6",
        hint: "import random\ndado = random.randint(1, 6)\nprint(dado)"
      },
      {
        id: 6902,
        title: "Ejercicio 2: Porcentaje decimal",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Usa la función \`random()\` (que no recibe parámetros) del módulo \`random\` para generar un decimal entre \`0.0\` y \`0.999...\`. Guárdalo en la variable \`probabilidad\` y luego imprímelo.",
        initialCode: "import random\n\n# Genera el decimal con random() en la variable 'probabilidad'\n\n# Imprímela\n",
        outputCheck: "",
        testCode: "assert 'random.random()' in __source__\nassert 'probabilidad' in locals()\nassert isinstance(probabilidad, float) and 0.0 <= probabilidad < 1.0",
        hint: "probabilidad = random.random()\nprint(probabilidad)"
      },
      {
        id: 6903,
        title: "Ejercicio 3: Número par al azar",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa la función \`randrange()\` del módulo \`random\` para generar un número aleatorio **par** entre \`0\` y \`20\` (el 20 excluido). Recuerda usar los parámetros \`start=0\`, \`stop=20\`, \`step=2\`. Guárdalo en la variable \`par\` e imprímela.",
        initialCode: "import random\n\n# Genera el número par con randrange en la variable 'par'\n\n# Imprímela\n",
        outputCheck: "",
        testCode: "assert 'randrange(' in __source__\nassert 'par' in locals()\nassert isinstance(par, int) and 0 <= par < 20 and par % 2 == 0",
        hint: "par = random.randrange(0, 20, 2)\nprint(par)"
      }
    ]
  },
  {
    id: 70,
    title: "Manejo de excepciones (try - except)",
    module: "Manejo de Errores",
    theory: `## 1. ¿Qué es una Excepción?
Una excepción es un evento o error imprevisto que ocurre durante la ejecución de un programa e interrumpe su flujo normal. Si no se maneja, el programa se detiene de forma abrupta mostrando un error técnico (*Traceback*).

El **manejo de excepciones** permite anticipar, detectar y responder a estos fallos de forma controlada, garantizando que el programa continúe funcionando o termine de manera amigable para el usuario.

## 2. Estructura y Palabras Reservadas
El flujo completo se compone de cuatro bloques. \`try\` y \`except\` son obligatorios, mientras que \`else\` y \`finally\` son opcionales.

- **\`try\` (Intentar)**: Aloja el código que tiene riesgo de fallar.
- **\`except\` (Excepción)**: Se activa **únicamente** si ocurre un error dentro del \`try\`. Captura el tipo de error específico.
  - *Uso de \`as\`*: Permite asignar el mensaje de error original a una variable local (ej. \`except ValueError as e:\`).
  - *Uso de \`Exception\`*: Clase genérica para capturar cualquier error desconocido.
- **\`else\` (Opcional)**: Se ejecuta **solo si** el bloque \`try\` finalizó con éxito (sin errores).
- **\`finally\` (Opcional)**: Se ejecuta **siempre**, sin importar si hubo error o no. Ideal para limpiar variables o cerrar conexiones.

## 3. Ejemplo de Código
\`\`\`python
try:
    numero = int("Hola")
    resultado = 50 // numero
except ValueError as vve:
    print(f"[ValueError] Ingresa un número entero. Error: {vve}")
except ZeroDivisionError as zde:
    print(f"[ZeroDivisionError] No dividas por cero. Error: {zde}")
except Exception as e:
    print(f"[Error] Detalles: {e}")
else:
    print("¡Operación exitosa!")
finally:
    print("Fin del programa.")
\`\`\``,
    exercises: [
      {
        id: 7001,
        title: "Ejercicio 1: Capturando ZeroDivisionError",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Escribe un bloque \`try\` que intente dividir \`10 / 0\`. Luego, agrega un bloque \`except ZeroDivisionError:\` que imprima exactamente el mensaje: \`No se puede dividir por cero\`.",
        initialCode: "# Crea el bloque try-except aquí\n",
        outputCheck: "No se puede dividir por cero",
        testCode: "assert 'try:' in __source__\nassert 'except ZeroDivisionError:' in __source__",
        hint: "try:\n    10 / 0\nexcept ZeroDivisionError:\n    print('No se puede dividir por cero')"
      },
      {
        id: 7002,
        title: "Ejercicio 2: Uso de 'as' para leer el error",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dentro de un \`try\`, intenta convertir el texto \`\"Python\"\` a entero usando \`int(\"Python\")\`. Luego, usa \`except ValueError as e:\` para capturar el fallo. Dentro del except, imprime el error contenido en la variable \`e\`.",
        initialCode: "# Crea tu bloque try-except as e:\n",
        outputCheck: "",
        testCode: "assert 'try:' in __source__\nassert 'except ValueError as ' in __source__\nassert 'int(' in __source__",
        hint: "try:\n    int('Python')\nexcept ValueError as e:\n    print(e)"
      },
      {
        id: 7003,
        title: "Ejercicio 3: El comodín Exception",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Supongamos que intentas sumar un número y un texto (\`5 + \"Hola\"\`), lo cual dará error. Usa \`try\` para la suma y un \`except Exception as error:\` genérico. Dentro del except, imprime la variable \`error\`.",
        initialCode: "# Crea el try-except genérico\n",
        outputCheck: "",
        testCode: "assert 'try:' in __source__\nassert 'except Exception as ' in __source__",
        hint: "try:\n    5 + 'Hola'\nexcept Exception as error:\n    print(error)"
      },
      {
        id: 7004,
        title: "Ejercicio 4: El flujo completo",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Escribe la estructura completa: \n1. En el \`try\`, imprime \`\"Intentando...\"\`.\n2. Añade un \`except Exception:\` genérico con un \`pass\`.\n3. En el \`else\`, imprime \`\"Todo bien\"\`.\n4. En el \`finally\`, imprime \`\"Proceso terminado\"\`.\n\n*Nota: Como no hay error en el try, el except será ignorado y el else se ejecutará.*",
        initialCode: "# Construye try, except, else y finally\n",
        outputCheck: "Intentando...\nTodo bien\nProceso terminado",
        testCode: "assert 'try:' in __source__\nassert 'except ' in __source__\nassert 'else:' in __source__\nassert 'finally:' in __source__",
        hint: "try:\n    print('Intentando...')\nexcept Exception:\n    pass\nelse:\n    print('Todo bien')\nfinally:\n    print('Proceso terminado')"
      }
    ]
  },
  {
    id: 71,
    title: "Tu primera Función (def)",
    module: "Funciones Modulares",
    theory: `## 1. ¿Qué es una Función?
Imagina que tienes un bloque de código que usas muchas veces en tu programa. En lugar de copiar y pegar ese código una y otra vez, puedes guardarlo dentro de una "caja" con un nombre. A esa caja le llamamos **Función**.

## 2. Definir una Función (\`def\`)
Para crear una función en Python, usamos la palabra reservada \`def\`, seguida del nombre que queramos darle a la función, paréntesis \`()\` y dos puntos \`:\`.
Todo el código que pertenezca a la función debe ir **indentado** (con un tabulador o 4 espacios).

\`\`\`python
def saludar():
    print("¡Hola a todos!")
    print("Bienvenidos al curso de Python.")
\`\`\`

## 3. Llamar a la Función
Escribir \`def\` solo *crea* la función, pero **no la ejecuta**. Para que el código dentro de la función corra, tienes que "llamarla" por su nombre, incluyendo los paréntesis.

\`\`\`python
# Definimos la función
def saludar():
    print("¡Hola a todos!")

# Llamamos a la función para que se ejecute
saludar()
\`\`\`

Si llamas a \`saludar()\` tres veces, el mensaje se imprimirá tres veces. ¡Esa es la magia de reutilizar código!`,
    exercises: [
      {
        id: 7101,
        title: "Ejercicio 1: Tu primera función",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una función llamada \`mensaje()\` que imprima la frase \`Amo programar en Python\`. ¡Recuerda llamarla al final para que el mensaje aparezca en pantalla!",
        initialCode: "# Define tu función y luego llámala\n",
        outputCheck: "Amo programar en Python",
        testCode: "assert 'mensaje' in locals(), 'Debes definir la función mensaje()'\nassert callable(mensaje), 'mensaje debe ser una función (usa def)'",
        hint: "def mensaje():\n    print('Amo programar en Python')\n\nmensaje()"
      },
      {
        id: 7102,
        title: "Ejercicio 2: Llamadas múltiples",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes definida una función llamada \`advertencia()\`. Tu misión es llamarla (ejecutarla) exactamente **3 veces** consecutivas debajo de su definición.",
        initialCode: "def advertencia():\n    print('¡Peligro, sistema inestable!')\n\n# Llama a la función 3 veces aquí debajo\n",
        outputCheck: "¡Peligro, sistema inestable!\\n¡Peligro, sistema inestable!\\n¡Peligro, sistema inestable!",
        testCode: "assert 'advertencia()' in __source__, 'Debes llamar a advertencia()'\nassert __source__.count('advertencia()') >= 3, 'Debes llamar a advertencia() al menos 3 veces'",
        hint: "Escribe advertencia() tres veces en líneas separadas."
      },
      {
        id: 7103,
        title: "Ejercicio 3: El orden de ejecución",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "El código actual llama a la función antes de definirla, lo que causa un error. Arregla el código moviendo la llamada \`despedida()\` debajo de la definición de la función.",
        initialCode: "# Arregla el orden para que funcione\ndespedida()\n\ndef despedida():\n    print('¡Hasta pronto!')\n",
        outputCheck: "¡Hasta pronto!",
        testCode: "assert 'despedida' in locals(), 'Debes mantener la función despedida()'",
        hint: "Mueve la línea despedida() al final del código, después del bloque def."
      }
    ]
  },
  {
    id: 72,
    title: "Retornando valores (return)",
    module: "Funciones Modulares",
    theory: `## 1. El gran secreto: \`print()\` vs \`return\`
Hasta ahora, hemos usado \`print()\` para mostrar resultados en pantalla. Pero \`print()\` es solo un "espejismo visual" para el humano; el programa **no puede** usar ni recordar ese valor impreso después.

Si queremos que una función calcule un dato y nos lo "devuelva" para guardarlo en una variable o seguir haciendo cálculos matemáticos con él, debemos usar la palabra mágica **\`return\`**.

## 2. Cómo usar \`return\`
Cuando Python lee la palabra \`return\`, la función se detiene inmediatamente y "escupe" el valor hacia afuera.

\`\`\`python
def obtener_pi():
    return 3.14159

# Guardamos el valor que la función nos devolvió
numero_pi = obtener_pi()
print(numero_pi)  # 3.14159
\`\`\`

## 3. ¿Por qué es tan importante?
Imagina que quieres multiplicar el resultado de una función por dos:

**❌ Con print() (Falla):**
\`\`\`python
def dar_diez():
    print(10)

resultado = dar_diez() * 2 # ¡ERROR! No se puede multiplicar None por 2.
\`\`\`

**✅ Con return (Funciona):**
\`\`\`python
def dar_diez():
    return 10

resultado = dar_diez() * 2 # ¡Perfecto! El resultado es 20.
\`\`\`
`,
    exercises: [
      {
        id: 7201,
        title: "Ejercicio 1: Tu primer retorno",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una función llamada \`obtener_nombre()\` que contenga un \`return\` con el texto \`'Python'\`. Afuera de la función, llama a la función guardando su resultado en una variable llamada \`nombre\` y luego imprímela.",
        initialCode: "# Escribe tu función y usa el return\n\n",
        outputCheck: "Python",
        testCode: "assert 'obtener_nombre' in locals(), 'Debes definir la función obtener_nombre()'\nassert 'return' in __source__, 'Debes usar la palabra return'\nassert 'nombre' in locals(), 'Debes guardar el resultado en la variable nombre'",
        hint: "def obtener_nombre():\n    return 'Python'\n\nnombre = obtener_nombre()\nprint(nombre)"
      },
      {
        id: 7202,
        title: "Ejercicio 2: Calculadora Interna",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes una función \`calcular_area()\`. Dentro de ella hay dos variables (\`base = 10\` y \`altura = 5\`). Tu objetivo es devolver el resultado de multiplicarlas usando \`return\`. Luego, fuera de la función, guarda la llamada en la variable \`area\` e imprímela.",
        initialCode: "def calcular_area():\n    base = 10\n    altura = 5\n    # Haz el return de la multiplicación aquí\n\n\n# Llama a la función e imprime\n",
        outputCheck: "50",
        testCode: "assert 'return ' in __source__, 'Falta usar return dentro de la función'\nassert 'area' in locals(), 'Falta la variable area afuera'\nassert area == 50, 'El cálculo del área es incorrecto'",
        hint: "Dentro de la función: return base * altura\nAfuera de la función: area = calcular_area()\nprint(area)"
      },
      {
        id: 7203,
        title: "Ejercicio 3: Retorno Múltiple y Condicionales",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Las funciones pueden tomar decisiones antes de retornar. Tienes la función \`obtener_estado()\`. Usa un condicional \`if\` para que si la variable \`nota\` es mayor o igual a \`6\`, retorne el texto \`'Aprobado'\`. Si no, usa un \`else\` que retorne \`'Reprobado'\`. Al final, llama la función y usa print para ver el resultado.",
        initialCode: "def obtener_estado():\n    nota = 8\n    # Escribe el if/else y retorna el texto adecuado\n\n\n# Llama a la función e imprímela\n",
        outputCheck: "Aprobado",
        testCode: "assert 'return ' in __source__, 'Debes usar return'\nassert __source__.count('return') >= 2, 'Debes tener un return en el if y otro en el else'",
        hint: "if nota >= 6:\n    return 'Aprobado'\nelse:\n    return 'Reprobado'"
      },
      {
        id: 7204,
        title: "Ejercicio 4: Arreglando la Máquina",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Un programador novato escribió la función \`obtener_descuento()\` usando \`print(20)\` en lugar de devolverlo. Esto está rompiendo el cálculo del \`precio_final\` porque se intenta restar un 'vacío' (None). Cambia el \`print\` por un \`return\` para que el cálculo matemático se ejecute y dé 80.",
        initialCode: "def obtener_descuento():\n    print(20)  # ¡Cámbialo por un return!\n\nprecio_final = 100 - obtener_descuento()\nprint(precio_final)\n",
        outputCheck: "80",
        testCode: "assert 'return 20' in __source__, 'Debes usar return 20'\nassert 'print(20)' not in __source__, 'Debes borrar el print(20) de la función'",
        hint: "Borra print(20) y escribe return 20 en su lugar."
      }
    ]
  },
  {
    id: 73,
    title: "Parámetros y Argumentos Básicos",
    module: "Funciones Modulares",
    theory: `## 1. ¿Qué son los Parámetros?
Hasta ahora, nuestras funciones siempre hacían exactamente lo mismo. Pero, ¿qué pasa si queremos que una función salude a diferentes personas? Para eso usamos los **Parámetros**.
Los parámetros son "variables vacías" que pones entre los paréntesis al crear la función. Luego, al llamar a la función, le pasas los datos reales (llamados **Argumentos**).

\`\`\`python
# 'nombre' es el parámetro
def saludar_a(nombre):
    print(f"¡Hola, {nombre}!")

# 'Ana' y 'Luis' son los argumentos
saludar_a("Ana")   # Imprime: ¡Hola, Ana!
saludar_a("Luis")  # Imprime: ¡Hola, Luis!
\`\`\`

## 2. Argumentos Posicionales
Si tu función tiene varios parámetros, Python los asignará **en el orden exacto** en el que los envíes. A esto se le llama argumentos posicionales.

\`\`\`python
def restar(a, b):
    return a - b

print(restar(10, 3)) # Resultado: 7 (a=10, b=3)
print(restar(3, 10)) # Resultado: -7 (a=3, b=10)
\`\`\`

## 3. Parámetros por Defecto (Opcionales)
Puedes asignarle un valor inicial a un parámetro usando \`=\`. Si la persona no envía ese dato al llamar a la función, Python usará el valor por defecto.

\`\`\`python
def presentar(nombre, pais="Desconocido"):
    return f"{nombre} es de {pais}"

print(presentar("Carlos", "México")) # Carlos es de México
print(presentar("Laura"))            # Laura es de Desconocido
\`\`\`
> **⚠️ Regla de Oro:** Los parámetros por defecto **siempre** deben ir al final, a la derecha de los parámetros obligatorios.`,
    exercises: [
      {
        id: 7301,
        title: "Ejercicio 1: Un solo parámetro",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Modifica la función \`doble(numero)\` para que retorne (con \`return\`) el número multiplicado por 2. Luego, fuera de la función, llama a la función pasándole el número \`5\` como argumento e imprime el resultado.",
        initialCode: "def doble(numero):\n    # Haz el return de la multiplicación aquí\n\n\n# Llama a la función e imprime el resultado\n",
        outputCheck: "10",
        testCode: "assert 'return' in __source__, 'Debes usar return en la función'\nassert 'doble(5)' in __source__, 'Debes llamar a la función con el argumento 5'",
        hint: "Dentro: return numero * 2\nFuera: print(doble(5))"
      },
      {
        id: 7302,
        title: "Ejercicio 2: Múltiples Posicionales",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea una función \`calcular_total(precio, cantidad)\`. La función debe retornar la multiplicación del precio por la cantidad. Luego, llama a la función pasándole \`20\` de precio y \`4\` de cantidad, y usa \`print()\` para mostrar el resultado.",
        initialCode: "# Crea tu función y luego llámala con 20 y 4\n\n",
        outputCheck: "80",
        testCode: "assert 'calcular_total' in locals(), 'Debes crear la función calcular_total'\nassert callable(calcular_total), 'calcular_total debe ser una función'\nassert 'calcular_total(20, 4)' in __source__ or 'calcular_total(20,4)' in __source__, 'Debes llamar a la función con 20 y 4'",
        hint: "def calcular_total(precio, cantidad):\n    return precio * cantidad\n\nprint(calcular_total(20, 4))"
      },
      {
        id: 7303,
        title: "Ejercicio 3: Valores por Defecto",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes la función \`crear_perfil(nombre, edad=18)\`. Llama a la función **dos veces** y muéstralas con \`print()\`: la primera vez pásale solo el nombre \`\"Juan\"\`. La segunda vez pásale \`\"María\"\` y la edad \`25\`.",
        initialCode: "def crear_perfil(nombre, edad=18):\n    return f'{nombre} tiene {edad} años'\n\n# Llama a la función e imprime sus 2 resultados abajo\n",
        outputCheck: "Juan tiene 18 años\nMaría tiene 25 años",
        testCode: "assert 'crear_perfil(\"Juan\")' in __source__ or \"crear_perfil('Juan')\" in __source__, 'Llama la función solo con Juan'\nassert 'crear_perfil(\"María\", 25)' in __source__ or \"crear_perfil('María', 25)\" in __source__ or 'crear_perfil(\"María\",25)' in __source__, 'Llama la función con María y 25'",
        hint: "print(crear_perfil('Juan'))\nprint(crear_perfil('María', 25))"
      },
      {
        id: 7304,
        title: "Ejercicio 4: La Regla de Oro",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "El siguiente código da error porque rompe la regla de oro: un parámetro con valor por defecto (\`rol='Usuario'\`) está ANTES de un parámetro obligatorio (\`nombre\`). Arregla el orden en los paréntesis de la definición para que el código funcione.",
        initialCode: "# Arregla los parámetros del def (rol debe ir al final)\ndef registro(rol='Usuario', nombre):\n    return f'Bienvenido {nombre}, tu rol es {rol}'\n\nprint(registro('Ana'))\n",
        outputCheck: "Bienvenido Ana, tu rol es Usuario",
        testCode: "assert 'def registro(nombre, rol=\"Usuario\"):' in __source__ or \"def registro(nombre, rol='Usuario'):\" in __source__, 'El orden debe ser primero nombre y luego rol'",
        hint: "Cambia \`def registro(rol='Usuario', nombre):\` por \`def registro(nombre, rol='Usuario'):\`"
      }
    ]
  },
  {
    id: 74,
    title: "Argumentos Flexibles (*args y **kwargs)",
    module: "Funciones Modulares",
    theory: `## 1. El límite de los parámetros normales
Hasta ahora, si creamos una función \`def sumar(a, b):\`, solo podemos pasarle exactamente 2 números. Si queremos sumar 5, 10 o 100 números, tendríamos que crear muchísimos parámetros. ¡Es agotador!
Python tiene un "comodín" para aceptar una cantidad **infinita** de argumentos.

## 2. Los infinitos *args (Argumentos Posicionales)
Al poner un asterisco \`*\` antes del nombre de un parámetro (por convención se usa \`*args\`), Python agrupará todos los valores que le pases en una **Tupla** (como una lista inmutable).

\`\`\`python
def listar_invitados(*args):
    # args ahora es una tupla: ("Ana", "Luis", "Carlos")
    for invitado in args:
        print(f"Ha llegado: {invitado}")

listar_invitados("Ana", "Luis", "Carlos") # Puedes pasar los que quieras
\`\`\`

## 3. Los infinitos **kwargs (Argumentos de Palabra Clave)
Si pones dos asteriscos \`**\` (por convención \`**kwargs\`), Python agrupará los datos que le pases *con nombre* en un **Diccionario**.

\`\`\`python
def mostrar_perfil(**kwargs):
    # kwargs ahora es un diccionario: {"nombre": "Leo", "edad": 25, "pais": "Peru"}
    for clave, valor in kwargs.items():
        print(f"{clave}: {valor}")

mostrar_perfil(nombre="Leo", edad=25, pais="Peru")
\`\`\`
`,
    exercises: [
      {
        id: 7401,
        title: "Ejercicio 1: Tu primera lista infinita (*args)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una función llamada \`multiplicador_infinito(*args)\` que multiplique todos los números de la tupla \`args\`. La variable \`total = 1\` ya está creada. Usa un bucle \`for numero in args:\` para multiplicar \`total\` por \`numero\`. Al final, devuelve el \`total\` con \`return\`. Fuera de la función, llama a \`multiplicador_infinito(2, 3, 4)\` e imprime el resultado.",
        initialCode: "def multiplicador_infinito(*args):\n    total = 1\n    # Escribe tu bucle for aquí\n\n\n# Llama a la función e imprime\n",
        outputCheck: "24",
        testCode: "assert 'multiplicador_infinito' in locals(), 'Debes definir multiplicador_infinito'\nassert 'for ' in __source__, 'Debes usar un bucle for'\nassert 'return ' in __source__, 'Debes retornar el total'",
        hint: "Dentro de la función: for numero in args:\\n    total = total * numero\\nreturn total\\n\\nFuera: print(multiplicador_infinito(2, 3, 4))"
      },
      {
        id: 7402,
        title: "Ejercicio 2: La función sum() y *args",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Python tiene una función mágica llamada \`sum(lista_o_tupla)\`. Crea una función llamada \`suma_total(*numeros)\` que simplemente retorne \`sum(numeros)\`. Luego llama a la función pasándole los números \`10, 20, 30\` y muéstralos en consola.",
        initialCode: "# Crea suma_total(*numeros) y llama a sum()\n\n",
        outputCheck: "60",
        testCode: "assert 'suma_total' in locals(), 'Falta definir suma_total'\nassert 'sum(' in __source__, 'Usa la función interna sum()'",
        hint: "def suma_total(*numeros):\\n    return sum(numeros)\\n\\nprint(suma_total(10, 20, 30))"
      },
      {
        id: 7403,
        title: "Ejercicio 3: Perfiles Flexibles (**kwargs)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes la función \`crear_ficha(**datos)\`. Usa un bucle \`for clave, valor in datos.items():\` para imprimir cada propiedad de este modo: \`print(f\"La clave es {clave} y el valor es {valor}\")\`. Luego, llama a la función pasándole \`nombre=\"Batman\", ciudad=\"Gotica\", vehiculo=\"Batmovil\"\`.",
        initialCode: "def crear_ficha(**datos):\n    # Haz tu bucle for aquí adentro\n\n\n# Llama a la función pasándole los datos\n",
        outputCheck: "La clave es nombre y el valor es Batman\nLa clave es ciudad y el valor es Gotica\nLa clave es vehiculo y el valor es Batmovil",
        testCode: "assert 'datos.items()' in __source__, 'Usa .items() para recorrer el diccionario kwargs'\nassert 'Batman' in __source__ and 'Gotica' in __source__, 'Debes llamar a la función con esos datos exactos'",
        hint: "for clave, valor in datos.items():\\n    print(f'La clave es {clave} y el valor es {valor}')\\n\\ncrear_ficha(nombre='Batman', ciudad='Gotica', vehiculo='Batmovil')"
      },
      {
        id: 7404,
        title: "Ejercicio 4: Combinando Todo (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "¡Vamos a armar un robot! Arregla los parámetros (firma de la función) en el código. El orden oficial en Python SIEMPRE es: parámetros normales, luego \`*args\` y finalmente \`**kwargs\`. Arregla el \`def\` para que el código funcione.",
        initialCode: "# Arregla el orden dentro de los paréntesis del def\ndef construir_robot(**caracteristicas, nombre, *piezas):\n    print(f'Construyendo a {nombre}')\n    print(f'Piezas: {piezas}')\n    print(f'Extras: {caracteristicas}')\n\nconstruir_robot('Optimus', 'Láser', 'Ruedas', color='Azul', vida=100)\n",
        outputCheck: "Construyendo a Optimus\nPiezas: ('Láser', 'Ruedas')\nExtras: {'color': 'Azul', 'vida': 100}",
        testCode: "assert 'def construir_robot(nombre, *piezas, **caracteristicas):' in __source__ or 'def construir_robot(nombre,*piezas,**caracteristicas):' in __source__, 'El orden debe ser: nombre, *piezas, **caracteristicas'",
        hint: "Modifica el def para que sea: def construir_robot(nombre, *piezas, **caracteristicas):"
      }
    ]
  },
  {
    id: 75,
    title: "Alcance de Variables (Scope)",
    module: "Funciones Modulares",
    theory: `## 1. El Universo de las Variables (Scope)
Imagina que las funciones son como "casas" cerradas. Lo que pasa dentro de la casa, se queda dentro de la casa. A esto le llamamos **Alcance Local**. Las variables que creas fuera de cualquier función existen en el "mundo abierto" y tienen un **Alcance Global**.

## 2. Variables Locales
Si creas una variable **dentro** de un \`def\`, esa variable solo existirá mientras la función se ejecuta. Una vez que la función termina, la variable ¡desaparece!

\`\`\`python
def crear_secreto():
    mensaje = "Hola" # Variable Local

print(mensaje) # ¡ERROR! 'mensaje' no existe aquí afuera.
\`\`\`

## 3. Variables Globales
Si creas una variable **fuera**, las funciones pueden "verla" y leerla sin problema.

\`\`\`python
gravedad = 9.8 # Variable Global

def calcular_caida():
    print(f"La gravedad es {gravedad}") # Esto funciona perfecto
\`\`\`

## 4. Modificar Globales (El lado oscuro)
Por defecto, no puedes *modificar* una variable global desde adentro de una función. Si lo intentas, Python creará una copia local temporal. Para modificar la original, debes usar la palabra \`global\`.

\`\`\`python
puntos = 0

def ganar_puntos():
    global puntos  # Le avisamos a Python que usaremos la global
    puntos = puntos + 10

ganar_puntos()
print(puntos) # Ahora es 10
\`\`\`
> **⚠️ Cuidado:** Usar \`global\` se considera una "mala práctica" porque hace que el código sea muy difícil de rastrear. ¡Úsalo solo si es estrictamente necesario!`,
    exercises: [
      {
        id: 7501,
        title: "Ejercicio 1: El muro local (NameError)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "El código intenta imprimir la variable \`oro\` fuera de la función, pero da un error porque \`oro\` es local. Arregla el código borrando el \`print(oro)\` de abajo, y haciendo que la función **retorne** el valor de \`oro\`. Luego llama la función e imprime el resultado.",
        initialCode: "def minar():\n    oro = 50\n    # Haz el return aquí\n\n\nprint(oro)  # ¡Borra esto! Da error.\n",
        outputCheck: "50",
        testCode: "assert 'return oro' in __source__, 'Debes retornar oro'\nassert 'print(oro)' not in __source__, 'Borra la línea print(oro)'",
        hint: "Dentro: return oro\\nFuera: print(minar())"
      },
      {
        id: 7502,
        title: "Ejercicio 2: Leyendo las estrellas (Global)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Hay una variable global \`nombre_juego = \"Zelda\"\`. Crea una función llamada \`mostrar_juego()\` que use un \`print()\` para imprimir esa variable global desde adentro. Finalmente, llama a la función.",
        initialCode: "nombre_juego = 'Zelda'\n\n# Escribe la función mostrar_juego() aquí\n\n\n# Llama a la función\n",
        outputCheck: "Zelda",
        testCode: "assert 'mostrar_juego' in locals(), 'Debes definir la función mostrar_juego()'\nassert 'nombre_juego' in __source__, 'Debes usar la variable nombre_juego'",
        hint: "def mostrar_juego():\\n    print(nombre_juego)\\n\\nmostrar_juego()"
      },
      {
        id: 7503,
        title: "Ejercicio 3: Clones Inofensivos (Shadowing)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes la variable global \`nivel = 1\`. En la función \`jugar_trampa()\` creaste la variable local \`nivel = 99\`. Llama a la función, y abajo imprime la variable global \`nivel\`. Verás que la global sigue valiendo 1 porque la de adentro era un 'clon local'.",
        initialCode: "nivel = 1\n\ndef jugar_trampa():\n    nivel = 99\n    print(f'Nivel Falso: {nivel}')\n\n# Llama a la función aquí\n\n# Imprime la variable nivel aquí abajo\n",
        outputCheck: "Nivel Falso: 99\n1",
        testCode: "assert 'jugar_trampa()' in __source__, 'Debes llamar a la función'\nassert 'print(nivel)' in __source__, 'Debes imprimir nivel al final'",
        hint: "Simplemente escribe jugar_trampa() y luego print(nivel)"
      },
      {
        id: 7504,
        title: "Ejercicio 4: El poder global (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Queremos que la función \`subir_nivel()\` modifique la variable global \`nivel\` (que actualmente vale 5) sumándole 1. Actualmente da error. Usa la palabra reservada \`global nivel\` dentro de la función para permitir la modificación.",
        initialCode: "nivel = 5\n\ndef subir_nivel():\n    # Avisa que usarás la global aquí\n    \n    nivel = nivel + 1\n\nsubir_nivel()\nprint(nivel)\n",
        outputCheck: "6",
        testCode: "assert 'global nivel' in __source__, 'Debes usar global nivel dentro de la función'",
        hint: "Escribe \`global nivel\` justo debajo del def subir_nivel():"
      }
    ]
  },
  {
    id: 76,
    title: "Funciones Anónimas (lambda)",
    module: "Funciones Modulares",
    theory: `## 1. ¿Qué es una Función lambda?
Hasta ahora, para crear una función teníamos que escribir \`def\`, darle un nombre, usar paréntesis, dos puntos, saltar de línea, indentar y usar \`return\`. 
¿Qué pasa si solo queremos hacer un cálculo rápido y minúsculo? Para eso existen las **funciones anónimas** o funciones **lambda**.

## 2. La Sintaxis (Fórmula Mágica)
La estructura siempre es una sola línea:
\`lambda argumentos: resultado_a_retornar\`

**Comparación:**

\`\`\`python
# Con def (Función Normal)
def mitad(numero):
    return numero / 2

# Con lambda (Función Anónima)
mitad = lambda numero: numero / 2

print(mitad(10)) # Imprime 5.0
\`\`\`

## 3. ¿Por qué se llaman "Anónimas"?
Porque no necesitan tener un nombre. Aunque en el ejemplo anterior la guardamos en la variable \`mitad\`, su principal poder es que puedes crear funciones directamente "al vuelo" para pasarlas como datos a otras funciones (algo que veremos en lecciones más avanzadas como \`map\` y \`filter\`).

\`\`\`python
# Lambda con varios argumentos
sumar = lambda a, b: a + b
print(sumar(3, 4)) # Imprime 7
\`\`\`
`,
    exercises: [
      {
        id: 7601,
        title: "Ejercicio 1: Tu primer mini-código",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una función lambda que reciba un argumento \`x\` y retorne \`x * 3\`. Guárdala en una variable llamada \`triple\`. Luego, imprime el resultado de llamar a \`triple(5)\`.",
        initialCode: "# Crea tu lambda y guárdala en triple\n\n\n# Llama a triple(5) dentro de un print\n",
        outputCheck: "15",
        testCode: "assert 'triple' in locals(), 'Falta crear la variable triple'\nassert 'lambda ' in __source__, 'Debes usar la palabra reservada lambda'\nassert 'triple(5)' in __source__, 'Debes llamar a la función triple(5)'",
        hint: "triple = lambda x: x * 3\\nprint(triple(5))"
      },
      {
        id: 7602,
        title: "Ejercicio 2: Parejas matemáticas",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una función lambda que reciba dos argumentos \`a\` y \`b\`, y retorne su multiplicación (\`a * b\`). Guárdala en una variable llamada \`multiplicar\`. Finalmente, imprime el resultado de \`multiplicar(4, 5)\`.",
        initialCode: "# Crea el lambda de a y b\n\n\n# Imprime el resultado de multiplicar(4, 5)\n",
        outputCheck: "20",
        testCode: "assert 'multiplicar' in locals(), 'Debes crear la variable multiplicar'\nassert 'lambda ' in __source__, 'Debes usar un lambda'\nassert multiplicar(1, 2) == 2, 'El lambda debe multiplicar a * b'",
        hint: "multiplicar = lambda a, b: a * b\\nprint(multiplicar(4, 5))"
      },
      {
        id: 7603,
        title: "Ejercicio 3: Lógica Express",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Las lambdas también pueden retornar valores lógicos booleanos. Crea una función lambda que reciba un \`numero\` y retorne \`numero % 2 == 0\` (lo cual verificará si es par). Guárdala en la variable \`es_par\`. Imprime el resultado de llamar a \`es_par(8)\`.",
        initialCode: "# Escribe tu lambda lógico\n\n\n# Imprime es_par(8)\n",
        outputCheck: "True",
        testCode: "assert 'es_par' in locals(), 'Debes crear la variable es_par'\nassert 'lambda ' in __source__, 'Debes usar un lambda'\nassert es_par(2) is True and es_par(3) is False, 'La función debe retornar True si es par y False si no'",
        hint: "es_par = lambda numero: numero % 2 == 0\\nprint(es_par(8))"
      },
      {
        id: 7604,
        title: "Ejercicio 4: Transformando texto",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Un programador dejó una función normal para convertir un texto a mayúsculas usando \`.upper()\`. Tu reto es borrar ese \`def\` completo y reemplazarlo por una función \`lambda\` equivalente, asignada a la variable \`gritar\`. Ejecuta el código para ver si el print sigue funcionando y arroja 'HOLA'.",
        initialCode: "# Borra esto y cámbialo por un lambda asignado a 'gritar'\ndef gritar(texto):\n    return texto.upper()\n\n# No borres el print\nprint(gritar('hola'))\n",
        outputCheck: "HOLA",
        testCode: "assert 'def gritar' not in __source__, 'Debes borrar el def completamente'\nassert 'gritar = lambda' in __source__ or 'gritar=lambda' in __source__ or 'gritar  = lambda' in __source__, 'Debes crear el lambda y asignarlo a gritar'",
        hint: "Cambia el def por: gritar = lambda texto: texto.upper()"
      }
    ]
  },
  {
    id: 80,
    title: "Map y Filter",
    module: "Estructuras de Datos Complementarias",
    theory: `## 1. Funciones de Orden Superior
En Python, las funciones son "ciudadanos de primera clase". Esto significa que puedes **pasar funciones como argumentos** a otras funciones. A esto se le llama una **función de orden superior**.

## 2. map(): Transformar cada elemento
\`map(funcion, coleccion)\` aplica una función a **cada elemento** de una lista y devuelve un objeto con los resultados transformados.

\`\`\`python
numeros = [1, 2, 3, 4]
dobles = list(map(lambda x: x * 2, numeros))
print(dobles) # [2, 4, 6, 8]
\`\`\`

> **Nota:** \`map()\` devuelve un objeto especial (tipo map), no una lista directamente. Por eso lo envolvemos en \`list()\` para verlo impreso.

## 3. filter(): Seleccionar elementos
\`filter(funcion, coleccion)\` aplica una función que devuelve \`True\` o \`False\` a cada elemento, y **solo conserva los que retornan True**.

\`\`\`python
numeros = [1, 2, 3, 4, 5, 6]
pares = list(filter(lambda x: x % 2 == 0, numeros))
print(pares) # [2, 4, 6]
\`\`\`

## 4. ¿Cuándo usar cada uno?
- Usa **map()** cuando quieras **transformar** todos los elementos (cambiar su forma o valor).
- Usa **filter()** cuando quieras **seleccionar** un subconjunto de elementos según una condición.
`,
    exercises: [
      {
        id: 8001,
        title: "Ejercicio 1: map() con función normal",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes la función `al_cuadrado(n)` que retorna `n * n`, y la lista `numeros = [2, 3, 4, 5]`. Usa `map()` pasándole esa función y la lista. Guarda el resultado en `resultado` usando `list()` e imprime `resultado`.",
        initialCode: "def al_cuadrado(n):\n    return n * n\n\nnumeros = [2, 3, 4, 5]\n\n# Usa map() aquí y guarda el resultado en 'resultado'\n\n\n# Imprime resultado\n",
        outputCheck: "[4, 9, 16, 25]",
        testCode: "assert 'map(' in __source__, 'Debes usar la función map()'\nassert 'resultado' in locals(), 'Debes guardar el resultado en la variable resultado'\nassert resultado == [4, 9, 16, 25], 'El resultado no es correcto'",
        hint: "resultado = list(map(al_cuadrado, numeros))\nprint(resultado)"
      },
      {
        id: 8002,
        title: "Ejercicio 2: map() con lambda",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes la lista `precios = [10, 25, 50, 100]`. Usa `map()` con un `lambda` para aplicar un descuento del 10% (multiplica cada precio por `0.9`). Guarda el resultado en `precios_descontados` con `list()` e imprímelo.",
        initialCode: "precios = [10, 25, 50, 100]\n\n# Usa map() con un lambda para aplicar 0.9\n\n\n# Imprime precios_descontados\n",
        outputCheck: "[9.0, 22.5, 45.0, 90.0]",
        testCode: "assert 'map(' in __source__, 'Debes usar map()'\nassert 'lambda' in __source__, 'Debes usar una función lambda'\nassert 'precios_descontados' in locals(), 'Guarda el resultado en precios_descontados'\nassert precios_descontados == [9.0, 22.5, 45.0, 90.0], 'El descuento no es correcto'",
        hint: "precios_descontados = list(map(lambda p: p * 0.9, precios))\nprint(precios_descontados)"
      },
      {
        id: 8003,
        title: "Ejercicio 3: filter() con función normal",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes la función `es_mayor_de_edad(edad)` que retorna `True` si `edad >= 18`. Usa `filter()` pasándole esa función y la lista `edades = [12, 18, 25, 8, 30, 16]`. Guarda el resultado en `mayores` con `list()` e imprímelo.",
        initialCode: "def es_mayor_de_edad(edad):\n    return edad >= 18\n\nedades = [12, 18, 25, 8, 30, 16]\n\n# Usa filter() aquí y guarda en 'mayores'\n\n\n# Imprime mayores\n",
        outputCheck: "[18, 25, 30]",
        testCode: "assert 'filter(' in __source__, 'Debes usar la función filter()'\nassert 'mayores' in locals(), 'Guarda el resultado en la variable mayores'\nassert mayores == [18, 25, 30], 'El resultado no es correcto'",
        hint: "mayores = list(filter(es_mayor_de_edad, edades))\nprint(mayores)"
      },
      {
        id: 8004,
        title: "Ejercicio 4: filter() con lambda",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes la lista `palabras = [\"Python\", \"es\", \"increíble\", \"y\", \"poderoso\"]`. Usa `filter()` con un `lambda` para conservar solo las palabras que tengan **más de 3 letras** (usa `len()`). Guarda el resultado en `palabras_largas` e imprímelo.",
        initialCode: "palabras = ['Python', 'es', 'increíble', 'y', 'poderoso']\n\n# Usa filter() con lambda para filtrar palabras de más de 3 letras\n\n\n# Imprime palabras_largas\n",
        outputCheck: "['Python', 'increíble', 'poderoso']",
        testCode: "assert 'filter(' in __source__, 'Debes usar filter()'\nassert 'lambda' in __source__, 'Debes usar un lambda'\nassert 'palabras_largas' in locals(), 'Guarda el resultado en palabras_largas'\nassert palabras_largas == ['Python', 'increíble', 'poderoso'], 'El filtro no es correcto'",
        hint: "palabras_largas = list(filter(lambda p: len(p) > 3, palabras))\nprint(palabras_largas)"
      },
      {
        id: 8005,
        title: "Ejercicio 5: Combinando map() y filter() (Reto)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Tienes `numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`. En **dos líneas**, primero filtra los números pares con `filter()` y guárdalos en `pares`. Luego aplica `map()` para elevar cada par al cuadrado (`n**2`) y guárda el resultado final en `resultado`. Imprime `resultado`.",
        initialCode: "numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Paso 1: filtra los pares con filter()\n\n\n# Paso 2: eleva al cuadrado con map()\n\n\n# Imprime resultado\n",
        outputCheck: "[4, 16, 36, 64, 100]",
        testCode: "assert 'filter(' in __source__, 'Debes usar filter()'\nassert 'map(' in __source__, 'Debes usar map()'\nassert 'resultado' in locals(), 'Guarda el resultado final en resultado'\nassert resultado == [4, 16, 36, 64, 100], 'El resultado no es correcto'",
        hint: "pares = list(filter(lambda n: n % 2 == 0, numeros))\nresultado = list(map(lambda n: n**2, pares))\nprint(resultado)"
      }
    ]
  },
];
