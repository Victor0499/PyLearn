// Módulo 1: Básicos y Strings

export const module1Lessons = [
  {
    id: 1,
    title: "Variables y la función print()",
    module: "Conceptos Básicos",
    theory: `## 1. Definición de Variable
Una variable es un espacio en la memoria de la computadora donde se almacenan y recuperan datos. Cada variable debe tener un nombre único para identificarla.

## 2. Reglas para nombrar variables
- **No usar palabras reservadas:** No puedes llamar a una variable \`print\`.
- **Sin espacios:** Usa guiones bajos (\`_\`) para separar palabras (ej. \`numero_uno\`).
- **Sensibilidad a mayúsculas:** \`numero_uno\` y \`Numero_uno\` son variables diferentes.

## 3. Tipos de datos comunes
- \`int\` — Números enteros (sin decimales).
- \`float\` — Números con decimales.
- \`string\` — Texto entre comillas simples o dobles.

## 4. Declaración y Asignación
Se escribe el nombre, el signo \`=\` y el valor. Python detecta el tipo automáticamente.

## 5. Ejemplo Práctico: Una Suma
\`\`\`python
print("Esto es una suma")
numero_1 = 2
numero_2 = 4
resultado = numero_1 + numero_2
print(resultado)
\`\`\`
En \`print(resultado)\` **no usamos comillas** para mostrar el valor numérico.

## 6. ¿Cómo imprimir en pantalla?
- Texto directo → entre comillas: \`print("Hola")\`
- Valor de variable → sin comillas: \`print(resultado)\``,
    exercises: [
      {
        id: 101, title: "Ejercicio 1: Tu primer print", difficulty: "Básico", difficultyColor: "green",
        instructions: "Usa `print()` para mostrar `'Hola, Python!'` en la consola.",
        initialCode: "# Escribe tu código aquí\n\n", outputCheck: "Hola, Python!", testCode: "",
        hint: "El texto debe ir entre comillas dentro del print()."
      },
      {
        id: 102, title: "Ejercicio 2: Variables y tipos", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea `nombre` con tu nombre (texto).\n2. Crea `edad` con tu edad (entero).\n3. Imprime ambas.",
        initialCode: "# Define tus variables aquí\n\n", outputCheck: null,
        testCode: "assert 'nombre' in locals(), \"Falta la variable 'nombre'\"\nassert 'edad' in locals(), \"Falta la variable 'edad'\"\nassert isinstance(nombre, str), \"'nombre' debe ser texto\"\nassert isinstance(edad, int), \"'edad' debe ser entero\"",
        hint: "Textos entre comillas, números sin comillas."
      },
      {
        id: 103, title: "Ejercicio 3: Suma y resultado", difficulty: "Reto", difficultyColor: "red",
        instructions: "1. Crea `numero_1 = 15` y `numero_2 = 7`.\n2. Guarda la suma en `resultado`.\n3. Imprime `'El resultado es:'` y luego `resultado`.",
        initialCode: "# Tu solución aquí\n\n", outputCheck: null,
        testCode: "assert 'resultado' in locals(), \"Falta 'resultado'\"\nassert resultado == 22, f\"resultado debe ser 22, obtuviste: {resultado}\"",
        hint: "Usa + para sumar y guarda en resultado."
      },
    ],
  },
  {
    id: 2,
    title: "Operaciones con Cadenas de Texto",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es una Cadena de Texto (String)?
En programación, a los textos se les llama **Cadenas** o **Strings**. Piensa en ellas como un "collar de letras". Para que la computadora sepa que es un texto y no un comando, **siempre** debe ir entre comillas simples (\`'\`) o dobles (\`"\`).

\`\`\`python
mi_texto = "¡Aprender a programar es divertido!"
\`\`\`

## 2. Concatenación: Sumando textos
¿Qué pasa si quieres unir dos textos diferentes? En Python usamos el símbolo **\`+\`**. Al usar \`+\` con textos, la computadora no hace matemáticas, sino que "pega" una palabra detrás de otra.

\`\`\`python
nombre = "Ana"
saludo = "Hola, " + nombre 
print(saludo)  # El resultado será: Hola, Ana
\`\`\`
**Nota:** Fíjate que dejamos un espacio después de la coma en \`"Hola, "\`. Si no lo hacemos, el resultado sería \`Hola,Ana\` todo junto. La computadora hace exactamente lo que le dices.

## 3. El operador mágico \`+=\`
A veces tienes una variable y quieres agregarle más texto **sin borrar lo que ya tenía**. Podrías hacer \`mensaje = mensaje + " más texto"\`, pero los programadores inventaron un atajo: **\`+=\`**.

\`\`\`python
mensaje = "Me gusta la pizza"
mensaje += " con extra queso"
print(mensaje)  # Resultado: Me gusta la pizza con extra queso
\`\`\`
Si usas solo \`=\`, Python borra lo que había antes y lo reemplaza por lo nuevo. Con \`+=\` lo añades al final.

## 4. Mezclando textos y números: \`str()\`
> **⚠️ Error muy común:** 
> Intentar pegar un texto con un número causa un choque en la computadora (conocido como \`TypeError\`):
> \`\`\`python
> print("Tengo " + 20 + " años") # ❌ ¡Error! No puedes sumar peras con manzanas.
> \`\`\`

**Solución:** Debemos "disfrazar" el número como texto antes de pegarlo. Para eso usamos la herramienta **\`str()\`** (abreviatura de *string*):

\`\`\`python
edad = 20
print("Tengo " + str(edad) + " años") # ✅ ¡Correcto!
\`\`\`

## 5. Buscando dentro del texto con \`find()\`
Si quieres saber en qué posición exacta se encuentra una letra o palabra dentro de tu texto, usas **\`.find("lo_que_buscas")\`**. 

**¡Regla de oro de la programación!** Las computadoras **empiezan a contar desde el número cero (0)**, no desde el uno. Y los espacios en blanco también cuentan.

\`\`\`python
frase = "Hola Mundo"
# H(0) o(1) l(2) a(3)  (4) M(5) u(6) n(7) d(8) o(9)

posicion = frase.find("Mundo")
print(posicion)  # Imprimirá 5, porque la 'M' está en la posición 5.
\`\`\`

## 6. Slicing: Recortando textos
"Slicing" significa rebanar. Te permite sacar un "pedazo" de tu texto original. Se usan los corchetes \`[inicio:fin]\`.

**La trampa del límite superior:** Python cortará tu texto *hasta antes* del número final que le des. El número del final **no** se incluye.

\`\`\`python
palabra = "Elefante"
# E(0) l(1) e(2) f(3) a(4) n(5) t(6) e(7)

pedacito = palabra[0:3] 
print(pedacito) # Imprimirá "Ele" (posiciones 0, 1 y 2)
\`\`\`

## 7. Comparando textos con \`==\`
Para hacerle una pregunta a Python del estilo: *¿Son estos dos textos exactamente iguales?*, usamos **doble signo igual (\`==\`)**. 

Si son idénticos, Python responde \`True\` (Verdadero). Si hay la más mínima diferencia, responde \`False\` (Falso).

\`\`\`python
print("Python" == "python") # False (Una está en mayúscula)
print("hola" == "hola ")    # False (El segundo tiene un espacio invisible al final)
print("Gato" == "Gato")     # True (¡Son idénticos!)
\`\`\``,
    exercises: [
      {
        id: 201, title: "Ejercicio 1: Tu primer String", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea una variable `saludo` con el texto `'Hola mundo'`.\n2. Imprime `saludo`.",
        initialCode: "# Crea tu variable saludo e imprímela\n\n", outputCheck: "Hola mundo",
        hint: "Recuerda que los textos van entre comillas: saludo = 'Hola mundo'."
      },
      {
        id: 202, title: "Ejercicio 2: Concatenación", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea `nombre = 'Ana'`.\n2. Crea `saludo = 'Hola, ' + nombre`.\n3. Imprime `saludo`.",
        initialCode: "# Concatena 'Hola, ' con nombre\n\n", outputCheck: "Hola, Ana",
        hint: "Usa el operador + para unir textos: saludo = 'Hola, ' + nombre."
      },
      {
        id: 203, title: "Ejercicio 3: El operador +=", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea `mensaje = 'Me gusta la pizza'`.\n2. Usa `+=` para agregar `' con extra queso'`.\n3. Imprime `mensaje`.",
        initialCode: "# Usa += para agregar texto al mensaje\n\n", outputCheck: "Me gusta la pizza con extra queso",
        hint: "mensaje += ' con extra queso' agrega sin borrar lo anterior."
      },
      {
        id: 204, title: "Ejercicio 4: str() - Convertir números a texto", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea `edad = 25`.\n2. Crea `mensaje = 'Tengo ' + str(edad) + ' años'`.\n3. Imprime `mensaje`.",
        initialCode: "edad = 25\n# Usa str() para convertir el número a texto\n\n", outputCheck: "Tengo 25 años",
        hint: "str(edad) convierte el número 25 al texto '25'."
      },
      {
        id: 205, title: "Ejercicio 5: find() - Buscar en texto", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "Dada `frase = 'Hola Mundo'`:\n1. Usa `.find()` para encontrar la posición de `'Mundo'` y guárdala en `posicion`.\n2. Imprime `posicion`.",
        initialCode: "frase = 'Hola Mundo'\n# Encuentra la posición de 'Mundo'\n\n", outputCheck: "5",
        hint: "posicion = frase.find('Mundo'). Recuerda: las computadoras cuentan desde 0."
      },
      {
        id: 206, title: "Ejercicio 6: Slicing", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "Dada `palabra = 'Elefante'`:\n1. Extrae `'Ele'` usando slicing `[0:3]` y guárdalo en `pedacito`.\n2. Imprime `pedacito`.",
        initialCode: "palabra = 'Elefante'\n# Extrae 'Ele' con slicing\n\n", outputCheck: "Ele",
        hint: "pedacito = palabra[0:3]. El número final NO se incluye."
      },
      {
        id: 207, title: "Ejercicio 7: Comparación con ==", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea `a = 'Hola'` y `b = 'hola'`.\n2. Crea `son_iguales = (a == b)`.\n3. Imprime `son_iguales` (debe ser `False`).",
        initialCode: "# Compara los textos con ==\n\n", outputCheck: "False",
        hint: "Python distingue mayúsculas de minúsculas. 'Hola' != 'hola'."
      },
    ],
  },
  {
    id: 3,
    title: "Palabras Reservadas",
    module: "Conceptos Básicos",
    theory: `## 1. Definición de Palabras Reservadas

Las palabras reservadas son identificadores de uso exclusivo del lenguaje de programación. **No pueden ser utilizadas** como nombres de variables, métodos, objetos u otros elementos dentro de tu código.

> **⚠️ Consecuencia de mal uso:**
> Si intentas usar una palabra reservada como variable, obtendrás un error de sintaxis y el programa **no se ejecutará**.

## 2. Palabras reservadas en Python

Python cuenta con un total de **28 palabras reservadas**. Todas ellas están escritas completamente en minúsculas.

Algunas de las más importantes son:

- \`and\`, \`or\`, \`not\` — Operadores lógicos
- \`def\` — Definir funciones
- \`for\`, \`in\`, \`while\` — Estructuras de control
- \`is\` — Comparación de identidad
- \`class\` — Definir clases
- \`import\` — Importar módulos
- \`print\` — Función para imprimir en pantalla

## 3. Solución al conflicto con palabras reservadas

Dado que Python distingue entre mayúsculas y minúsculas (**es case-sensitive**), puedes utilizar una palabra reservada modificando la capitalización de alguna de sus letras para nombrar una variable sin generar errores.

### Ejemplo Práctico:

\`\`\`python
print = 5  # ❌ ¡Error! 'print' es una palabra reservada
\`\`\`

En cambio, si cambias la capitalización:

\`\`\`python
Print = 5    # ✅ Correcto
PrInT = 10   # ✅ Correcto
PRINT = 15   # ✅ Correcto
\`\`\`

Python las reconocerá como identificadores distintos y no entrarán en conflicto con la palabra reservada \`print\`.`,
    exercises: [
      {
        id: 301, title: "Ejercicio 1: Evitando 'for'", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea una variable llamada \`For\` (con F mayúscula) y asígnale el valor \`3\`.\n2. Imprime el valor de \`For\`.",
        initialCode: "# Crea la variable 'For' e imprímela\n\n", outputCheck: null,
        testCode: "assert 'For' in locals(), \"Falta la variable 'For'\"\nassert For == 3, f\"For debe ser 3, obtuviste: {For}\"",
        hint: "Usa 'For' en lugar de 'for' para evitar el error de palabra reservada."
      },
      {
        id: 302, title: "Ejercicio 2: Múltiples variables", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea \`Class_num = 10\`.\n2. Crea \`Import = 'datos'\`.\n3. Crea \`Is_valid = True\`.\n4. Imprime las tres variables.",
        initialCode: "# Crea las tres variables aquí\n\n", outputCheck: null,
        testCode: "assert 'Class_num' in locals(), \"Falta 'Class_num'\"\nassert 'Import' in locals(), \"Falta 'Import'\"\nassert 'Is_valid' in locals(), \"Falta 'Is_valid'\"\nassert Class_num == 10, \"Class_num debe ser 10\"\nassert Import == 'datos', \"Import debe ser 'datos'\"\nassert Is_valid == True, \"Is_valid debe ser True\"",
        hint: "Cambia la capitalización para evitar conflictos: Class_num, Import, Is_valid."
      },
      {
        id: 303, title: "Ejercicio 3: Reto de reservadas", difficulty: "Reto", difficultyColor: "red",
        instructions: "Crea 4 variables usando capitalización diferente para estas palabras reservadas:\n1. \`And\` = 1\n2. \`Def\` = 2\n3. \`For\` = 3\n4. \`In\` = 4\n5. Imprime todas.",
        initialCode: "# Crea las 4 variables aquí\n\n", outputCheck: null,
        testCode: "assert 'And' in locals(), \"Falta 'And'\"\nassert 'Def' in locals(), \"Falta 'Def'\"\nassert 'For' in locals(), \"Falta 'For'\"\nassert 'In' in locals(), \"Falta 'In'\"\nassert And == 1, \"And debe ser 1\"\nassert Def == 2, \"Def debe ser 2\"\nassert For == 3, \"For debe ser 3\"\nassert In == 4, \"In debe ser 4\"",
        hint: "Usa la primera letra en mayúscula: And, Def, For, In."
      },
    ],
  },
  {
    id: 4,
    title: "Operaciones Aritméticas",
    module: "Conceptos Básicos",
    theory: `## 1. Suma o Adición

Símbolo: **\`+\`**

Uso: Suma dos o más valores numéricos.

\`\`\`python
numero_1 = 5
numero_2 = 3
resultado = numero_1 + numero_2
print(str(resultado))
\`\`\`

## 2. Resta o Sustracción

Símbolo: **\`-\`**

Uso: Resta un valor numérico de otro.

\`\`\`python
resta = 10 - 4
print(resta)  # Imprimirá 6
\`\`\`

## 3. Multiplicación

Símbolo: **\`*\`** (asterisco)

Uso: Multiplica dos valores.

\`\`\`python
producto = 6 * 7
print(producto)  # Imprimirá 42
\`\`\`

## 4. Exponente o Potencia

Símbolo: **\`**\`** (dos asteriscos continuos)

Uso: Eleva un número a la potencia de otro.

\`\`\`python
potencia = 2 ** 5
print(potencia)  # Imprimirá 32
\`\`\`

> $2^5$ se calcula multiplicando el número por sí mismo la cantidad de veces que indica el exponente.

## 5. División

Símbolo: **\`/\`** (diagonal inclinada a la derecha)

Uso: Divide un número entre otro. Python devuelve automáticamente el resultado con decimales.

\`\`\`python
division = 10 / 3
print(division)  # Imprimirá 3.3333...
\`\`\`

## 6. Módulo o Resto

Símbolo: **\`%\`**

Uso: Obtiene el residuo o la cantidad que sobra después de efectuar una división.

\`\`\`python
resto = 10 % 3
print(resto)  # Imprimirá 1 (10 dividido 3 da 3 y sobra 1)
\`\`\`

## 7. División Entera

Símbolo: **\`//\`** (dos diagonales continuas)

Uso: Obtiene únicamente la parte entera del cociente de una división, descartando cualquier valor decimal.

\`\`\`python
cociente = 10 // 3
print(cociente)  # Imprimirá 3 (solo la parte entera)
\`\`\``,
    exercises: [
      {
        id: 401, title: "Ejercicio 1: Suma", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea \`numero_1 = 8\` y \`numero_2 = 5\`.\n2. Guarda la suma en \`resultado\`.\n3. Imprime \`resultado\`.",
        initialCode: "# Realiza la suma\n\n", outputCheck: "13",
        hint: "resultado = numero_1 + numero_2."
      },
      {
        id: 402, title: "Ejercicio 2: Resta", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea \`a = 20\` y \`b = 7\`.\n2. Guarda la resta en \`resultado\`.\n3. Imprime \`resultado\`.",
        initialCode: "# Realiza la resta\n\n", outputCheck: "13",
        hint: "resultado = a - b."
      },
      {
        id: 403, title: "Ejercicio 3: Multiplicación", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea \`x = 9\` y \`y = 6\`.\n2. Guarda el producto en \`resultado\`.\n3. Imprime \`resultado\`.",
        initialCode: "# Realiza la multiplicación\n\n", outputCheck: "54",
        hint: "resultado = x * y."
      },
      {
        id: 404, title: "Ejercicio 4: Exponente", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea \`base = 3\` y \`exponente = 4\`.\n2. Calcula la potencia y guárdala en \`resultado\`.\n3. Imprime \`resultado\` (debe ser 81).",
        initialCode: "# Calcula 3 elevado a 4\n\n", outputCheck: "81",
        hint: "resultado = base ** exponente."
      },
      {
        id: 405, title: "Ejercicio 5: División", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea \`numerador = 15\` y \`denominador = 4\`.\n2. Calcula la división y guárdala en \`resultado\`.\n3. Imprime \`resultado\`.",
        initialCode: "# Realiza la división\n\n", outputCheck: "3.75",
        hint: "resultado = numerador / denominador."
      },
      {
        id: 406, title: "Ejercicio 6: Módulo (resto)", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea \`dividendo = 17\` y \`divisor = 5\`.\n2. Calcula el residuo y guárdalo en \`resto\`.\n3. Imprime \`resto\`.",
        initialCode: "# Calcula el residuo de 17 entre 5\n\n", outputCheck: "2",
        hint: "resto = dividendo % divisor (17 dividido 5 da 3 y sobra 2)."
      },
      {
        id: 407, title: "Ejercicio 7: División entera", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea \`dividendo = 23\` y \`divisor = 4\`.\n2. Calcula la división entera y guárdala en \`cociente\`.\n3. Imprime \`cociente\`.",
        initialCode: "# Calcula la división entera de 23 entre 4\n\n", outputCheck: "5",
        hint: "cociente = dividendo // divisor (23 dividido 4 da 5, sin decimales)."
      },
    ],
  },
  {
    id: 5,
    title: "Comentarios en Python",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué son los comentarios?

Los comentarios son anotaciones dentro del código fuente destinadas a ser leídas por los programadores.

Los comentarios no afectan el funcionamiento lógico ni la ejecución del programa, ya que son completamente ignorados por el intérprete o compilador.

> **Nota:** No son obligatorios, pero son muy útiles para facilitar el entendimiento, mantenimiento y reutilización del código.

## 2. Formas de añadir comentarios en Python

Python ofrece tres formas principales de incluirlos:

### 2.1 Con el signo de gato o almohadilla (#)

Utilizado para comentar una sola línea. Todo lo que esté después del \`#\` en esa línea será ignorado.

\`\`\`python
# Esto es un comentario de una línea
print("Hola")  # Este también es un comentario
\`\`\`

### 2.2 Con comillas simples o dobles ('' o "")

Aunque están diseñados para strings, si no se asignan a ninguna variable, Python los interpreta como valores nulos y los ignora, funcionando como un comentario.

\`\`\`python
"Esto es un string no asignado, Python lo ignora"
print("Hola")
\`\`\`

### 2.3 Comentarios multilínea (""" o ''')

Para escribir anotaciones que ocupan más de una línea en el editor. Se debe abrir con tres comillas y cerrar con otro juego de tres comillas.

\`\`\`python
"""
Este es un comentario
de varias líneas
que ocupa tres líneas en total
"""
print("Hola")
\`\`\``,
    exercises: [
      {
        id: 501, title: "Ejercicio 1: Tu primer comentario", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea una variable `mensaje = 'Hola Python'`.\n2. Agrega un comentario en una línea separada usando `#` que diga `'Mi primer comentario'`.\n3. Imprime `mensaje`.",
        initialCode: "# Agrega tu comentario aquí\n\n", outputCheck: "Hola Python",
        hint: "Escribe # Mi primer comentario en una línea, luego define la variable."
      },
      {
        id: 502, title: "Ejercicio 2: Comentario multilínea", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Usa tres comillas `\"\"\"` para crear un comentario multilínea que diga `'Este es un comentario de varias líneas'`.\n2. Crea `nombre = 'Estudiante'`.\n3. Imprime `nombre`.",
        initialCode: "# Usa \"\"\" para el comentario multilínea\n\n", outputCheck: "Estudiante",
        hint: "Abre con \"\"\" y cierra con \"\"\" en líneas separadas, luego crea la variable."
      },
      {
        id: 503, title: "Ejercicio 3: Combinando comentarios", difficulty: "Reto", difficultyColor: "red",
        instructions: "1. Agrega un comentario de una línea con `#` que diga `'Comentario simple'`.\n2. Agrega un comentario multilínea con `'''` que diga `'Comentario de bloque'`.\n3. Crea `curso = 'Python'` y `nivel = 1`.\n4. Imprime ambas variables.",
        initialCode: "# Combina ambos tipos de comentarios\n\n", outputCheck: null,
        testCode: "assert 'curso' in locals(), \"Falta la variable 'curso'\"\nassert 'nivel' in locals(), \"Falta la variable 'nivel'\"\nassert curso == 'Python', \"curso debe ser 'Python'\"\nassert nivel == 1, \"nivel debe ser 1\"",
        hint: "Usa # para el comentario simple y ''' para el multilínea. Luego define las dos variables."
      },
      {
        id: 504, title: "Ejercicio 4: Strings como comentarios", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "La teoría menciona que un string sin asignar (ej. `'Hola'`) es ignorado por Python y actúa como comentario.\n1. Escribe el string `'Esto será ignorado'` en una línea sin asignarlo a nada.\n2. En la siguiente línea imprime `'Fin del programa'`.",
        initialCode: "# Escribe tu string libre y luego tu print\n\n", outputCheck: "Fin del programa",
        testCode: "",
        hint: "'Esto será ignorado'\nprint('Fin del programa')"
      },
    ],
  },
  {
    id: 6,
    title: "Tipos de Datos",
    module: "Conceptos Básicos",
    theory: `## 1. Números
Los números en Python se dividen principalmente en tres tipos:

- **Enteros (\`int\`)**: Números sin decimales, positivos o negativos.
- **Flotantes (\`float\`)**: Números con parte decimal o reales.
- **Complejos (\`complex\`)**: Números con una parte real y una parte imaginaria (ej. \`5 + 6j\`). Son muy utilizados en ingeniería y ciencias.

## 2. Cadenas de caracteres (\`str\` o Strings)
Representan texto encerrado entre comillas simples, dobles o triples (estas últimas permiten saltos de línea sin usar el carácter de escape \`\\n\`).

## 3. Booleanos (\`bool\`)
Solo pueden tener dos valores: \`True\` (cierto) o \`False\` (falso). Son fundamentales en expresiones condicionales y bucles.

## 4. Herramienta útil: La función \`type()\`
La función \`type(variable)\` se utiliza para identificar el tipo de dato de cualquier variable durante la ejecución del programa.

**Ejemplo de uso:**
\`\`\`python
numero = 10
texto = "Hola"
print(type(numero))  # Mostrará <class 'int'>
print(type(texto))   # Mostrará <class 'str'>
\`\`\`

> **Sugerencia:** Se pueden pasar múltiples elementos al comando \`print()\` separados por comas para visualizar el valor y el tipo de dato en la misma línea.
\`\`\`python
print("El valor es:", numero, "y su tipo es:", type(numero))
\`\`\`
`,
    exercises: [
      {
        id: 601, title: "Ejercicio 1: Números y type()", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea `entero = 15` y `flotante = 3.14`.\n2. Imprime el tipo de dato de ambas usando `type()`.",
        initialCode: "# Crea las variables e imprime sus tipos\n\n", outputCheck: null,
        testCode: "assert 'entero' in locals(), \"Falta 'entero'\"\nassert 'flotante' in locals(), \"Falta 'flotante'\"\nassert isinstance(entero, int), \"'entero' debe ser int\"\nassert isinstance(flotante, float), \"'flotante' debe ser float\"",
        hint: "Usa print(type(entero)) y print(type(flotante))."
      },
      {
        id: 602, title: "Ejercicio 2: Cadenas y Booleanos", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea `texto = 'Hola'`.\n2. Crea `es_verdad = True`.\n3. Imprime ambas variables separadas por coma en un solo `print()`.",
        initialCode: "# Crea las variables y usa un solo print\n\n", outputCheck: "Hola True",
        testCode: "assert 'texto' in locals(), \"Falta 'texto'\"\nassert 'es_verdad' in locals(), \"Falta 'es_verdad'\"\nassert isinstance(texto, str), \"'texto' debe ser str\"\nassert isinstance(es_verdad, bool), \"'es_verdad' debe ser bool\"",
        hint: "print(texto, es_verdad) imprimirá ambas variables en una línea."
      },
      {
        id: 603, title: "Ejercicio 3: Múltiples tipos y Complejos", difficulty: "Reto", difficultyColor: "red",
        instructions: "1. Crea una variable `complejo = 2 + 3j`.\n2. Imprime un solo print pasando el texto `'El tipo es:'` separado por coma de `type(complejo)`.",
        initialCode: "# Crea el número complejo e imprime su tipo\n\n", outputCheck: null,
        testCode: "assert 'complejo' in locals(), \"Falta 'complejo'\"\nassert isinstance(complejo, complex), \"'complejo' debe ser complex\"",
        hint: "Usa print('El tipo es:', type(complejo))."
      },
    ],
  },
  {
    id: 7,
    title: "Entrada de Datos y Conversión",
    module: "Conceptos Básicos",
    theory: `## 1. La función \`input()\`
La función \`input()\` se utiliza para solicitar datos al usuario. Por defecto, todo lo que el usuario escribe se recibe como una **cadena de caracteres (\`str\`)**.

**Sintaxis:**
\`\`\`python
variable = input("Mensaje para el usuario: ")
\`\`\`

*(Nota: En esta plataforma interactiva, usar \`input()\` abrirá una ventana emergente en tu navegador pidiendo que ingreses el texto).*

## 2. Conversión de tipos de datos (Casting)
Como \`input()\` siempre recibe cadenas de texto, es necesario **convertir el dato** si esperas trabajar con otros tipos, como números. Para esto, se "envuelve" la función \`input()\` o la variable con el tipo de dato deseado:

- **Enteros (\`int\`)**: \`int(input("Introduce un número entero: "))\`
- **Flotantes (\`float\`)**: \`float(input("Introduce un número flotante: "))\`
- **Complejos (\`complex\`)**: \`complex(input("Introduce un número complejo: "))\`

También puedes convertir variables de texto que ya existen:
\`\`\`python
edad_texto = "25"
edad_numero = int(edad_texto)
\`\`\`

## 3. Mostrar resultados y concatenación
Al imprimir resultados, una técnica muy eficiente es usar **comas** dentro del \`print()\` para separar elementos:

**Ejemplo:** 
\`\`\`python
print("El resultado es", resultado)
\`\`\`

**Ventaja:** Al usar una coma, Python separa los elementos automáticamente (añadiendo un espacio invisible) y **no es necesario convertir variables numéricas a cadenas (\`str\`)** para imprimirlas junto a un texto. Es mucho más seguro que intentar sumarlas con el signo \`+\`.

> **⚠️ Nota importante:** Si intentas convertir un texto que no coincide con el tipo solicitado (por ejemplo, intentar hacer \`int("hola")\` o \`int("3.14")\`), el programa arrojará un error (ValueError) y se detendrá.
`,
    exercises: [
      {
        id: 701, title: "Ejercicio 1: Conversión a Entero", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Dada la variable `texto = '50'`, conviértela a entero usando `int()` y guárdala en `numero`.\n2. Imprime `numero`.",
        initialCode: "texto = '50'\n# Convierte 'texto' a entero\n\n", outputCheck: "50",
        testCode: "assert 'numero' in locals(), \"Falta 'numero'\"\nassert isinstance(numero, int), \"'numero' debe ser int\"\nassert numero == 50, \"'numero' debe ser 50\"",
        hint: "numero = int(texto)"
      },
      {
        id: 702, title: "Ejercicio 2: Conversión a Flotante", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Dada la variable `precio_txt = '19.99'`, conviértela a flotante usando `float()` y guárdala en `precio`.\n2. Imprime `precio`.",
        initialCode: "precio_txt = '19.99'\n# Convierte a flotante\n\n", outputCheck: "19.99",
        testCode: "assert 'precio' in locals(), \"Falta 'precio'\"\nassert isinstance(precio, float), \"'precio' debe ser float\"\nassert precio == 19.99, \"'precio' debe ser 19.99\"",
        hint: "precio = float(precio_txt)"
      },
      {
        id: 703, title: "Ejercicio 3: Separando con comas en print()", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea una variable `edad = 20` (un número entero).\n2. Imprime exactamente: `Tengo 20 años` usando **comas** para separar el texto del número en un solo `print()`.",
        initialCode: "# Crea la variable y usa print con comas\n\n", outputCheck: "Tengo 20 años",
        testCode: "assert 'edad' in locals(), \"Falta 'edad'\"\nassert isinstance(edad, int), \"'edad' debe ser un número entero\"",
        hint: "print('Tengo', edad, 'años')"
      },
      {
        id: 704, title: "Ejercicio 4: El input() anidado", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "Aunque en esta plataforma de ejercicios solemos darte las variables creadas, imagina que vas a pedir datos:\nCrea una variable `cantidad` que reciba directamente un número entero usando `int(input('Dime una cantidad: '))`. Luego imprímela.",
        initialCode: "# Pide la cantidad al usuario e imprímela\n\n", outputCheck: null,
        testCode: "assert 'cantidad' in locals(), \"Falta 'cantidad'\"",
        hint: "cantidad = int(input('Dime una cantidad: '))\nprint(cantidad)"
      },
    ],
  },
  {
    id: 14,
    title: "Operadores de Asignación",
    module: "Conceptos Básicos",
    theory: `## Operadores de Asignación en Python

Un operador de asignación asigna un valor a la variable de la izquierda basado en el valor de la derecha. Los más comunes son:

- **Asignación simple (\`=\`)**: \`x = 5\` asigna el valor 5 a \`x\`.
- **Suma y asignación (\`+=\`)**: \`x += 3\` es equivalente a \`x = x + 3\`.
- **Resta y asignación (\`-=\`)**: \`x -= 2\` es equivalente a \`x = x - 2\`.
- **Otros operadores**: También existen para multiplicación (\`*=\`), división (\`/=\`), división entera (\`//=\`), exponente (\`**=\`) y módulo (\`%=\`).

### Incremento y Decremento en acción

\`\`\`python
# 1. Asignación con cadenas de caracteres
nombre = "Hola "
# Aquí se usa += para añadir el nombre ingresado
nombre += "Juan"
print(f"{nombre}, esto es el incremento y decremento de una variable.")

# 2. Incremento
x = 1
x += 1  # x ahora vale 2
x += 1  # x ahora vale 3
print(f"El valor final de x es: {x}")

# 3. Decremento
# x inicia valiendo 3
x -= 1  # x ahora vale 2
x -= 1  # x ahora vale 1
print(f"El valor final de x es: {x}")
\`\`\`

### Concepto clave: Expresiones equivalentes
Usar \`x += y\` es exactamente lo mismo que escribir \`x = x + y\`. El uso de los operadores de asignación compuestos es una mejor práctica porque hace el código más corto y eficiente de leer.`,
    exercises: [
      {
        id: 1401,
        title: "Ejercicio 1: Suma y asignación",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una variable \`puntos\` con valor 10. Usa el operador \`+=\` para sumarle 5. Luego imprime el valor de \`puntos\`.",
        initialCode: "puntos = 10\n\n# Suma 5 usando +=\n\n\nprint(puntos)\n",
        outputCheck: "15",
        hint: "Escribe puntos += 5 antes del print."
      },
      {
        id: 1402,
        title: "Ejercicio 2: Decremento",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una variable \`vidas\` con valor 3. Usa el operador \`-=\` para restarle 1. Luego imprime el valor de \`vidas\`.",
        initialCode: "vidas = 3\n\n# Resta 1 usando -=\n\n\nprint(vidas)\n",
        outputCheck: "2",
        hint: "Escribe vidas -= 1 antes del print."
      },
      {
        id: 1403,
        title: "Ejercicio 3: Multiplicación y división entera con asignación",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea una variable \`numero = 10\`. Usa el operador \`*=\` para multiplicarla por 3. Luego, usa el operador \`//=\` para dividirla de forma entera entre 5. Finalmente, imprime el valor de \`numero\`.",
        initialCode: "numero = 10\n\n# Aplica *= y //= aquí\n\n\nprint(numero)\n",
        outputCheck: "6",
        testCode: "assert 'numero' in locals(), \"Falta la variable numero\"\nassert numero == 6, \"El resultado debe ser 6\"",
        hint: "Usa numero *= 3 y luego numero //= 5."
      },
      {
        id: 1404,
        title: "Ejercicio 4: Módulo y Potencia con Asignación",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea la variable `x = 10`. Usa el operador `%=` para obtener su residuo al dividirla entre 4. Luego usa el operador `**=` para elevar ese resultado a la 3ª potencia. Imprime el valor final de `x`.",
        initialCode: "x = 10\n\n# Usa %= 4 y luego **= 3\n\n\nprint(x)\n",
        outputCheck: "8",
        testCode: "assert 'x' in locals(), \"Falta la variable x\"\nassert x == 8, \"El resultado debe ser 8\"",
        hint: "x %= 4 (sobra 2) y luego x **= 3 (2 al cubo es 8)."
      }
    ]
  },
  {
    id: 15,
    title: "Parámetros end y sep",
    module: "Conceptos Básicos",
    theory: `## Parámetros del print(): end y sep

En Python, la función \`print()\` es extremadamente flexible y cuenta con parámetros especiales que nos permiten personalizar cómo se muestra la información en la consola. Dos de los más importantes son \`end\` y \`sep\`.

### 1. El parámetro \`end\`

Por defecto, cada vez que usas un \`print()\`, Python agrega automáticamente un salto de línea (\`\\n\`) al final. Esto hace que el siguiente \`print()\` comience en una línea nueva.

El parámetro \`end\` sirve para sustituir ese salto de línea automático por cualquier otro texto (o por nada en absoluto).

#### Ejemplo:
\`\`\`python
# Sin el parámetro 'end', estos aparecerían en líneas diferentes
print("Esto es un", end=" ")
print("ejemplo")

# También puedes agregar símbolos entre los prints
print("Esto es un", end="-*-")
print("ejemplo")
\`\`\`

---

### 2. El parámetro \`sep\`

Cuando pasas múltiples valores separados por comas dentro de un mismo \`print()\`, Python coloca por defecto un espacio en blanco entre cada uno de ellos.

Con el parámetro \`sep\` (de *separator*), puedes elegir qué carácter o cadena de caracteres usar como separador entre esos valores.

#### Ejemplo:
\`\`\`python
# Por defecto imprime: 1 2 3 4 5
print("1", "2", "3", "4", "5")

# Usando sep para quitar el espacio (imprime: 12345)
print("1", "2", "3", "4", "5", sep="")

# Usando sep para poner una coma (imprime: 1,2,3,4,5)
print("1", "2", "3", "4", "5", sep=",")
\`\`\`

> **💡 Consejo:** Ambos parámetros son extremadamente útiles para dar formato limpio a tablas, barras de carga o salidas ordenadas en tus programas.`,
    exercises: [
      {
        id: 1501,
        title: "Ejercicio 1: El parámetro end",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Usa dos sentencias \`print()\` consecutivas. En la primera, imprime \`\"Curso\"\` con el parámetro \`end=\"-\"\`. En la segunda, imprime \`\"Python\"\`. Esto debe producir la salida \`\"Curso-Python\"\` en la consola en una sola línea.",
        initialCode: "# Escribe tus dos prints aquí\n\n",
        outputCheck: "Curso-Python",
        hint: "Usa print('Curso', end='-') en la primera línea y print('Python') en la segunda."
      },
      {
        id: 1502,
        title: "Ejercicio 2: El parámetro sep",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Imprime los números \`\"10\"\`, \`\"20\"\`, \`\"30\"\` en un solo \`print()\`, usando el parámetro \`sep\` para que se muestren separados por un asterisco (\`*\`). La salida debe ser exactamente \`\"10*20*30\"\`.",
        initialCode: "# Escribe tu print con sep aquí\n\n",
        outputCheck: "10*20*30",
        hint: "Usa print('10', '20', '30', sep='*')."
      },
      {
        id: 1503,
        title: "Ejercicio 3: Combinando end y sep",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Imprime en un solo \`print()\` los textos \`\"A\"\`, \`\"B\"\`, \`\"C\"\` usando el parámetro \`sep=\"-\"\` y el parámetro \`end=\"!\"\`.",
        initialCode: "# Escribe tu print con sep y end aquí\n\n",
        outputCheck: "A-B-C!",
        hint: "Usa print('A', 'B', 'C', sep='-', end='!')"
      }
    ]
  },
  {
    id: 18,
    title: "La función len()",
    module: "Conceptos Básicos",
    theory: `## La función len() en Python

En Python, la función integrada **\`len()\`** (que proviene de *length*, longitud en inglés) se utiliza para obtener el tamaño o la cantidad de elementos que componen a un objeto. En el caso de las cadenas de texto, devuelve el número exacto de caracteres que contiene.

---

### 1. Sintaxis de la función \`len()\`

Su uso es directo y sumamente sencillo: escribimos el nombre de la función en minúsculas y pasamos el objeto o cadena que deseamos medir dentro de los paréntesis:

\`\`\`python
len(objeto_o_cadena)
\`\`\`

---

### 2. Regla fundamental: ¡Los espacios cuentan!

Un detalle técnico muy importante que suele confundir a los principiantes es que **los espacios en blanco también cuentan como caracteres** y modifican la longitud final devuelta.

#### Ejemplos:
- \`len("hola")\` devolverá un valor de **4**.
- \`len("la wikipedia")\` devolverá un valor de **12** (11 letras más el espacio en blanco que las separa).

---

### 3. Formas de Implementación

Existen dos opciones comunes para aplicar y aprovechar esta función en tus programas:

#### Opción 1: Impresión directa en pantalla
Calculamos la longitud directamente dentro de la función \`print()\` sin guardar el valor en memoria:

\`\`\`python
# Se calcula y muestra la longitud en una sola línea
print("hola tiene", len("hola"), "caracteres.")
\`\`\`

#### Opción 2: Almacenar el resultado en una variable
Esta opción es la más recomendada si tienes planeado utilizar el conteo en instrucciones o evaluaciones lógicas posteriores:

\`\`\`python
# Guardamos la longitud en una variable antes de usarla
longitud = len("la wikipedia")

print("la wikipedia tiene", longitud, "caracteres.")
\`\`\``,
    exercises: [
      {
        id: 1801,
        title: "Ejercicio 1: Longitud directa",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una variable \`mensaje = \"Python\"\`. Imprime directamente su longitud usando la función \`len()\` dentro de un \`print()\`.",
        initialCode: "mensaje = \"Python\"\n\n# Escribe tu print con len() aquí\n\n",
        outputCheck: "6",
        hint: "Usa: print(len(mensaje))"
      },
      {
        id: 1802,
        title: "Ejercicio 2: Guardando la longitud",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una variable llamada \`texto\` con el valor \`\"Hola Mundo\"\`. Luego, calcula su longitud usando la función \`len()\`, almacénala en una variable llamada \`longitud\` e imprime la variable \`longitud\`.",
        initialCode: "# Define texto, calcula su longitud e imprímela\n\n",
        outputCheck: "10",
        testCode: "assert 'texto' in locals(), \"Falta definir la variable texto\"\nassert 'longitud' in locals(), \"Falta definir la variable longitud\"\nassert longitud == 10, \"El valor de longitud debe ser 10\"",
        hint: "Escribe:\ntexto = \"Hola Mundo\"\nlongitud = len(texto)\nprint(longitud)"
      },
      {
        id: 1803,
        title: "Ejercicio 3: Condición basada en longitud",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la variable \`usuario = \"Ana\"\`, escribe un condicional \`if - else\`. Si la longitud del nombre de usuario es menor a 5, imprime \`\"Nombre corto\"\`. De lo contrario, imprime \`\"Nombre largo\"\`.",
        initialCode: "usuario = \"Ana\"\n\n# Escribe la condición usando len() aquí\n\n",
        outputCheck: "Nombre corto",
        testCode: "assert 'usuario' in locals(), \"No definiste la variable usuario\"\nassert len(usuario) == 3",
        hint: "Usa: if len(usuario) < 5: print('Nombre corto') else: print('Nombre largo')"
      }
    ]
  },
  {
    id: 19,
    title: "Concatenación con el método .format()",
    module: "Conceptos Básicos",
    theory: `## El método .format() en Python

Además de usar el signo de suma (\`+\`) o las f-strings, existe una herramienta muy potente y limpia para estructurar textos dinámicos: el método **\`.format()\`**.

Este método funciona utilizando **placeholders** o marcadores de posición, representados por llaves \`{}\` dentro del texto, que luego son reemplazados por los valores correspondientes.

---

### 1. Sintaxis Básica

Colocas llaves en los lugares donde quieres que se inserten tus variables y, al final de la cadena de texto, llamas al método \`.format()\` pasando los datos en los paréntesis:

\`\`\`python
"Texto {} texto".format(variable)
\`\`\`

---

### 2. Las Tres Formas de Uso Principales

Existen tres maneras distintas de organizar y pasar los datos dentro de las llaves, dependiendo de la especificidad que necesites:

#### Forma 1: Por orden posicional (Llaves vacías)
Python asigna las variables de forma automática en el mismo orden exacto en el que las escribes dentro de los paréntesis del método.

\`\`\`python
nombre = "Carlos"
edad = 25

# La primera variable va al primer {}, la segunda al segundo
print("Hola {}, tu edad es {} años.".format(nombre, edad))
\`\`\`

#### Forma 2: Por índice numérico
Puedes controlar explícitamente qué variable va en cada lugar asignando números dentro de las llaves (empezando desde el 0). Esto es muy útil si necesitas cambiar el orden de aparición o repetir una misma variable.

\`\`\`python
nombre = "Carlos"
edad = 25

# {0} apunta a 'nombre' y {1} apunta a 'edad'
print("Tu edad es {1} años, ¿verdad {0}?".format(nombre, edad))
\`\`\`

#### Forma 3: Por clave o nombre (Keywords)
Puedes asignarles "etiquetas" o nombres internos a los valores dentro del \`.format()\`. Esto hace que el código sea más fácil de leer, ya que no dependes de la posición física.

\`\`\`python
# Asignamos claves personalizadas directamente dentro del formato
print("Hola {n}, tu edad es {e} años.".format(n="Carlos", e=25))
\`\`\`

---

### ¿Por qué se recomienda usar .format()?

- **Evita conversiones manuales:** A diferencia de la concatenación tradicional con \`+\`, no necesitas transformar números o booleanos a texto usando \`str()\`. El método se encarga automáticamente.
- **Previene errores:** Reduce la aparición de errores de tipo (\`TypeError\`).
- **Legibilidad:** Mantiene la cadena de texto limpia y fácil de comprender de un solo vistazo.`,
    exercises: [
      {
        id: 1901,
        title: "Ejercicio 1: Orden posicional",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una variable \`pais = \"México\"\` y \`capital = \"Ciudad de México\"\`. Usa el método \`.format()\` con llaves vacías \`{}\` para imprimir: \`\"La capital de México es Ciudad de México.\"\`.",
        initialCode: "pais = \"México\"\ncapital = \"Ciudad de México\"\n\n# Escribe tu print con .format() aquí\n",
        outputCheck: "La capital de México es Ciudad de México.",
        hint: "Usa: print(\"La capital de {} es {}.\".format(pais, capital))"
      },
      {
        id: 1902,
        title: "Ejercicio 2: Posición por índice",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la variable \`producto = \"laptop\"\` y \`precio = 800\`. Usa \`.format()\` con índices numéricos dentro de las llaves (\`{0}\` y \`{1}\`) para imprimir: \`\"El precio de la laptop es de 800 dólares. Repito, 800 dólares.\"\`.",
        initialCode: "producto = \"laptop\"\nprecio = 800\n\n# Escribe tu print con índices aquí\n",
        outputCheck: "El precio de la laptop es de 800 dólares. Repito, 800 dólares.",
        hint: "Usa: print(\"El precio de la {0} es de {1} dólares. Repito, {1} dólares.\".format(producto, precio))"
      },
      {
        id: 1903,
        title: "Ejercicio 3: Formato por clave (Keyword)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Imprime directamente el mensaje \`\"Curso: Python. Duración: 4 semanas.\"\` usando el método \`.format()\` con claves/keywords dentro de las llaves (\`{curso}\` y \`{duracion}\`). Pasa los valores directamente dentro de \`.format()\` como argumentos nombrados, sin crear variables previamente.",
        initialCode: "# Escribe tu print con keywords en .format() aquí\n",
        outputCheck: "Curso: Python. Duración: 4 semanas.",
        hint: "Usa: print(\"Curso: {curso}. Duración: {duracion}.\".format(curso=\"Python\", duracion=\"4 semanas\"))"
      }
    ]
  },
  {
    id: 20,
    title: "Concatenación con f-Strings",
    module: "Conceptos Básicos",
    theory: `## Concatenación con f-Strings en Python

Las **f-strings** (Literal String Interpolations) fueron introducidas a partir de Python 3.6. Se consideran la alternativa de concatenación más moderna, limpia y eficiente del lenguaje, ya que permiten incrustar variables y expresiones matemáticas directamente dentro de un texto sin degradar la legibilidad del código.

---

### 1. Reglas de Sintaxis Obligatorias

Para indicarle a Python que vas a utilizar una f-string, debes seguir estas pautas:

- **Debes anteponer la letra \`f\` (o \`F\`):** Escríbela en minúscula justo antes de abrir las comillas del texto.
- **Sin espacios:** La letra \`f\` tiene que ir pegada a la comilla de apertura (por ejemplo, \`f"Texto"\`). Si dejas un espacio en medio, Python no la reconocerá y la tratará como un texto normal.
- **Uso de llaves:** Los valores dinámicos o variables se encierran entre llaves \`{}\`.

---

### 2. Uso con Variables de Diferentes Tipos de Datos

Las f-strings formatean automáticamente los tipos de datos en pantalla. Puedes mezclar textos (\`str\`), enteros (\`int\`) y flotantes (\`float\`) en una misma línea sin necesidad de usar conversiones manuales como \`str()\`.

\`\`\`python
nombre = "Carlos"
estatura = 1.8
edad = 22

# Imprimir combinando todo con una f-string
print(f"Hola {nombre}, tienes {edad} años y mides {estatura} metros.")
\`\`\`

---

### 3. Evaluación de Expresiones al Vuelo

Una de las mayores ventajas de las f-strings es que se evalúan en tiempo de ejecución. Esto significa que puedes realizar operaciones aritméticas directamente dentro de las llaves, y Python mostrará el resultado en lugar de la operación matemática literal.

\`\`\`python
# Python detecta la operación dentro de las llaves y la resuelve
print(f"El resultado de la suma de cuatro más uno es igual a {4 + 1}")
\`\`\`

> **Nota:** Si escribes \`{4 + 1}\` dentro de las llaves, el intérprete muestra \`5\`. Pero si imprimes los caracteres \`4 + 1\` por fuera de las llaves, se mostrarán textualmente como caracteres de texto común.

---

### 4. Ejemplo Avanzado: Interactividad con el Usuario

Se pueden combinar las f-strings con la captura de datos desde el teclado utilizando \`input()\`. Aquí se aprecia claramente la diferencia entre mostrar un carácter estático (el signo \`+\`) y evaluar una expresión real:

\`\`\`python
# Solicitud de datos al usuario
usuario = input("¿Cuál es tu nombre?: ")
num_1 = int(input("Introduce un número: "))
num_2 = int(input("Introduce un segundo número: "))

# El primer signo '+' es solo texto; el segundo ejecuta la operación
print(f"Hola {usuario}, el resultado de {num_1} + {num_2} es: {num_1 + num_2}")
\`\`\`
`,
    exercises: [
      {
        id: 2001,
        title: "Ejercicio 1: Sintaxis básica",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea dos variables: \`nombre = \"Sofía\"\` y \`curso = \"Python\"\`. Usa una f-string para imprimir el mensaje: \`\"Hola Sofía, bienvenida al curso de Python.\"\`.",
        initialCode: "nombre = \"Sofía\"\ncurso = \"Python\"\n\n# Escribe tu print con una f-string aquí\n",
        outputCheck: "Hola Sofía, bienvenida al curso de Python.",
        hint: "Usa: print(f\"Hola {nombre}, bienvenida al curso de {curso}.\")"
      },
      {
        id: 2002,
        title: "Ejercicio 2: Operación aritmética al vuelo",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea las variables \`base = 10\` y \`altura = 5\`. Usa una f-string para imprimir el mensaje: \`\"El área del rectángulo es: 50\"\` resolviendo la multiplicación de \`base * altura\` directamente dentro de las llaves \`{}\`.",
        initialCode: "base = 10\naltura = 5\n\n# Escribe tu print con la operación en la f-string aquí\n",
        outputCheck: "El área del rectángulo es: 50",
        hint: "Usa: print(f\"El área del rectángulo es: {base * altura}\")"
      },
      {
        id: 2003,
        title: "Ejercicio 3: Múltiples variables y cálculo",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea tres variables: \`nombre = \"Carlos\"\`, \`nacimiento = 2000\` y \`actual = 2026\`. Usa una f-string para calcular su edad estimada restando \`actual - nacimiento\` dentro de las llaves, e imprimir el mensaje: \`\"Hola Carlos, tu edad estimada es 26 años.\"\`.",
        initialCode: "nombre = \"Carlos\"\nnacimiento = 2000\nactual = 2026\n\n# Escribe tu print aquí\n",
        outputCheck: "Hola Carlos, tu edad estimada es 26 años.",
        hint: "Usa: print(f\"Hola {nombre}, tu edad estimada es {actual - nacimiento} años.\")"
      }
    ]
  },
  {
    id: 21,
    title: "Métodos de Limpieza de Cadenas",
    module: "Conceptos Básicos",
    theory: `## Métodos de limpieza de texto: strip(), lstrip() y rstrip()

Al trabajar con textos en Python, frecuentemente es necesario eliminar espacios vacíos o caracteres específicos no deseados que se encuentran en los extremos de una cadena de caracteres. Para resolver esto de forma limpia, el lenguaje cuenta con tres herramientas fundamentales:

- **\`strip()\`:** Limpia los caracteres indicados tanto al inicio como al final de la cadena.
- **\`lstrip()\` (Left Strip):** Limpia únicamente el extremo izquierdo (inicio).
- **\`rstrip()\` (Right Strip):** Limpia únicamente el extremo derecho (final).

> **⚠️ Regla de oro:** Ninguno de estos métodos alterará jamás los caracteres que se encuentren en la zona central de la cadena de texto; su rango de acción está estrictamente limitado a los bordes exteriores.

---

### 1. Sintaxis Básica

Los métodos se invocan escribiendo el nombre de la variable, un punto y la función con sus paréntesis correspondientes, todo en minúsculas y sin espacios intermedios:

\`\`\`python
variable.strip()
\`\`\`

---

### 2. Comportamiento por Defecto (Sin argumentos)

Si dejas los paréntesis vacíos, Python asume automáticamente que deseas eliminar todos los espacios en blanco, tabulaciones (\`\\t\`) y saltos de línea (\`\\n\`) que estén en las orillas.

\`\`\`python
texto = "\\t Hola Mundo \\n"

# Elimina la tabulación inicial y el salto de línea final
texto_limpio = texto.strip()

print(texto_limpio)
# Resultado: "Hola Mundo"
\`\`\`

---

### 3. Comportamiento Personalizado (Con argumentos)

Cuando deseas remover caracteres específicos, puedes pasarlos agrupados en un solo texto (string) dentro de los paréntesis.

Python no busca la palabra exacta que pusiste como argumento, sino que toma cada carácter individualmente y realiza una comprobación repetitiva en los bordes hasta que ya no encuentra más coincidencias.

#### El algoritmo de remoción paso a paso:
Si tienes la cadena \`"\\tHola mundos\\n"\` y quieres remover letras específicas, debes incluir explícitamente los caracteres especiales de escape si es que están en los bordes.

\`\`\`python
cadena = "\\tHola mundos\\n"

# Especificamos de manera precisa qué caracteres individuales queremos remover de los bordes.
# Nota: \\t es tabulación, \\n es salto de línea.
cadena_limpia = cadena.strip("s \\t\\n")

print(cadena_limpia)
# Resultado: "Hola mundo"
\`\`\`

#### ¿Cómo actúa el método internamente en este ejemplo?
1. **Detecta los bordes:** Encuentra el carácter de tabulación \`\\t\` a la izquierda y el salto de línea \`\\n\` a la derecha. Como ambos están listados en el argumento \`"s \\t\\n"\`, los remueve.
2. **Siguiente ciclo:** Ahora las orillas son la letra \`H\` (izquierda) y la letra \`s\` (derecha).
3. **Comprobación:** La \`H\` mayúscula no está en los argumentos, por lo que el borde izquierdo se detiene ahí. Sin embargo, la \`s\` minúscula sí se encuentra en el argumento, por lo que es eliminada de la derecha.
4. **Finalización:** El proceso concluye cuando en ninguno de los dos extremos queda un carácter que coincida con la lista del parámetro.

---

### 💡 Distinción de mayúsculas
El método es estrictamente **case-sensitive** (sensible a mayúsculas). Si indicas la letra \`s\` minúscula, una \`S\` mayúscula en el borde será ignorada y no se borrará.`,
    exercises: [
      {
        id: 2101,
        title: "Ejercicio 1: Limpieza básica de espacios",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una variable llamada \`texto = \"   Python es genial   \"\`. Usa el método \`.strip()\` sin argumentos para limpiar todos los espacios en blanco de ambos extremos e imprime el resultado.",
        initialCode: "texto = \"   Python es genial   \"\n\n# Limpia los espacios e imprime el resultado\n",
        outputCheck: "Python es genial",
        hint: "Usa: print(texto.strip())"
      },
      {
        id: 2102,
        title: "Ejercicio 2: Limpieza por la izquierda",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la variable \`codigo = \"###codigo_secreto###\"\`. Usa el método \`.lstrip()\` para eliminar los caracteres \`#\` únicamente del lado izquierdo de la cadena e imprime el resultado.",
        initialCode: "codigo = \"###codigo_secreto###\"\n\n# Limpia los '#' de la izquierda e imprime el resultado\n",
        outputCheck: "codigo_secreto###",
        hint: "Usa: print(codigo.lstrip(\"#\"))"
      },
      {
        id: 2103,
        title: "Ejercicio 3: Limpieza personalizada múltiple",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea la variable \`cadena = \"\\t...hola python...\\n\"\`. Usa el método \`.strip()\` para eliminar los puntos (\`.\`), la tabulación (\`\\t\`) y el salto de línea (\`\\n\`) de ambos extremos, de forma que solo se imprima \`\"hola python\"\`.",
        initialCode: "cadena = \"\\t...hola python...\\n\"\n\n# Elimina \\t, . y \\n de los extremos e imprime el resultado\n",
        outputCheck: "hola python",
        hint: "Usa: print(cadena.strip(\".\\t\\n\"))"
      },
      {
        id: 2104,
        title: "Ejercicio 4: La sensibilidad a mayúsculas",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea la variable `texto = \"xX_Hola_Xx\"`. Queremos limpiar todas las `'x'` y las `'X'` de los bordes. Utiliza el método `.strip()` pasándole como argumento ambos caracteres (tanto en minúscula como en mayúscula). Imprime el resultado.",
        initialCode: "texto = \"xX_Hola_Xx\"\n\n# Limpia ambas variaciones de la 'X' e imprime\n",
        outputCheck: "_Hola_",
        hint: "Usa: print(texto.strip(\"xX\"))"
      }
    ]
  },
  {
    id: 22,
    title: "Métodos lstrip() y rstrip()",
    module: "Conceptos Básicos",
    theory: `## 1. El Método rstrip() (Right Strip)
Este método se utiliza para eliminar caracteres especificados únicamente al final (el extremo derecho) de una cadena de caracteres. El inicio de la cadena no sufrirá ninguna modificación.

**Comportamiento por defecto:** Si los paréntesis se dejan vacíos, remueve de forma automática espacios en blanco, tabulaciones (\`\\t\`) y saltos de línea (\`\\n\`) que se encuentren al final.

**Comportamiento personalizado:** Si se le añaden argumentos entre comillas, evalúa cíclicamente el extremo derecho borrando los caracteres individuales indicados.

\`\`\`python
# Cadena con espacios y saltos de línea en ambos lados
cadena = "   Hola Mundo   \\n"

# Aplicamos rstrip() sin argumentos
cadena_derecha_limpia = cadena.rstrip()

# Al imprimir, notarás que conserva los espacios iniciales pero eliminó el final
print(cadena_derecha_limpia)
\`\`\`

## 2. El Método lstrip() (Left Strip)
Funciona de manera opuesta al anterior: se encarga de eliminar los caracteres especificados únicamente al inicio (el extremo izquierdo) de la cadena. El final del texto permanece completamente intacto.

**Comportamiento por defecto:** Sin argumentos, limpia tabulaciones, espacios y saltos de línea al principio de la variable.

**Comportamiento personalizado:** Remueve los caracteres individuales que coincidan con la lista del parámetro siempre y cuando se localicen en el inicio exacto.

\`\`\`python
# Mismo texto con impurezas en los bordes
cadena = "\\tHola Mundo   "

# Aplicamos lstrip() para limpiar el inicio
cadena_izquierda_limpia = cadena.lstrip()

print(cadena_izquierda_limpia)
# Salida: "Hola Mundo   " (La tabulación desaparece, los espacios finales quedan)
\`\`\`

## 3. Uso avanzado con caracteres especificados
Al igual que con el método general, si ingresas una combinación de caracteres como argumento, Python los procesará de uno en uno en el extremo correspondiente (\`L\` para la izquierda y \`R\` para la derecha) hasta que deje de encontrar coincidencias.

\`\`\`python
texto = "www.ejemplo.com"

# Eliminamos la sección inicial "www." indicando los caracteres individuales
texto_limpio_izq = texto.lstrip("w.")
print(texto_limpio_izq) 
# Salida: "ejemplo.com"

# Eliminamos la extensión final ".com" indicando los caracteres individuales
texto_limpio_der = texto.rstrip("m.oc")
print(texto_limpio_der) 
# Salida: "www.ejemplo"
\`\`\`

> **⚠️ Recordatorio de ejecución:** Recuerda que las funciones son sensibles a las mayúsculas (case-sensitive). Si intentas remover un carácter usando minúsculas pero en el texto se encuentra en mayúsculas, el método lo ignorará y no realizará ningún descarte.`,
    exercises: [
      {
        id: 2201,
        title: "Ejercicio 1: Limpieza derecha con rstrip()",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea la variable \`texto = \"  Python es genial  \\n\"\`. Utiliza el método \`.rstrip()\` para eliminar los espacios y saltos de línea **solo del lado derecho**. Imprime el resultado.",
        initialCode: "texto = \"  Python es genial  \\n\"\n\n# Aplica rstrip() e imprime el resultado\n",
        outputCheck: "  Python es genial",
        hint: "Usa: print(texto.rstrip())"
      },
      {
        id: 2202,
        title: "Ejercicio 2: Limpieza izquierda con lstrip()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la variable \`enlace = \"https://miweb.com\"\`. Utiliza el método \`.lstrip()\` para remover explícitamente los caracteres \`'h'\`, \`'t'\`, \`'p'\`, \`'s'\`, \`':'\` y \`'/'\` del inicio, de modo que solo quede \`'miweb.com'\`. Imprime el resultado.",
        initialCode: "enlace = \"https://miweb.com\"\n\n# Aplica lstrip() con los caracteres específicos e imprime el resultado\n",
        outputCheck: "miweb.com",
        hint: "Usa: print(enlace.lstrip(\"https:/\"))"
      },
      {
        id: 2203,
        title: "Ejercicio 3: Combinando lstrip() y rstrip()",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea la variable \`archivo = \"---reporte_final.pdf---\"\`. Usa \`.lstrip()\` y \`.rstrip()\` de forma encadenada o separada para remover los guiones (\`-\`) del inicio y la extensión \`.pdf---\` del final. El resultado impreso debe ser exactamente \`'reporte_final'\`.",
        initialCode: "archivo = \"---reporte_final.pdf---\"\n\n# Remueve los '-' del inicio y '.pdf---' del final e imprime el resultado\n",
        outputCheck: "reporte_final",
        hint: "Puedes encadenar métodos: archivo.lstrip(\"-\").rstrip(\"-.pdf\")"
      }
    ]
  },
  {
    id: 23,
    title: "Los métodos istitle() y title()",
    module: "Conceptos Básicos",
    theory: `## 1. El Método title() (Transformación)
Se utiliza para convertir una cadena de texto al formato de título.

**Cómo actúa:** Toma la primera letra de cada palabra que se encuentre en la cadena y la convierte en mayúscula. Si hay letras mayúsculas en medio de una palabra de forma incorrecta, automáticamente las pasa a minúsculas.

\`\`\`python
texto_sucio = "vALeNciA eSpAñA"

# Aplicamos el método para corregir el texto
texto_titulado = texto_sucio.title()

print(texto_titulado)
\`\`\`

## 2. El Método istitle() (Validación)
A diferencia del anterior, este método no transforma nada; se utiliza para verificar si una cadena de texto ya cumple estrictamente con las reglas del formato título.

**Cómo actúa:** Devuelve un valor booleano: \`True\` si todas las palabras del texto comienzan con mayúscula y el resto son minúsculas, o \`False\` si al menos una palabra no cumple con esta regla.

\`\`\`python
frase_1 = "Curso De Python"
frase_2 = "Curso de Python"  # La 'de' está completamente en minúsculas

print(frase_1.istitle())  # Devuelve True
print(frase_2.istitle())  # Devuelve False
\`\`\`

## 3. Aplicación práctica combinando ambos métodos
Una excelente manera de entender su utilidad es usarlos en conjunto con estructuras condicionales (\`if-else\`) para validar y corregir los datos que introduce un usuario en un programa:

\`\`\`python
# Solicitamos el nombre al usuario
nombre_usuario = input("Por favor, introduce tu nombre y apellido: ")

# Verificamos si el usuario lo escribió con el formato correcto
if nombre_usuario.istitle():
    print(f"¡Gracias por escribir tu nombre correctamente, {nombre_usuario}!")
else:
    print("El formato no es correcto. Corrigiendo...")
    # Convertimos el texto al formato adecuado
    nombre_corregido = nombre_usuario.title()
    print(f"Tu nombre formateado es: {nombre_corregido}")
\`\`\`

Si un usuario escribe \`jUaN pÉrEz\`, el método \`istitle()\` detectará que no tiene formato de título (\`False\`), por lo que el bloque \`else\` se activará y el método \`title()\` lo transformará limpiamente en \`Juan Pérez\`.`,
    exercises: [
      {
        id: 2301,
        title: "Ejercicio 1: Transformación con title()",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea la variable \`ciudad = \"mAdRiD eSpAñA\"\`. Utiliza el método \`.title()\` para convertirla al formato correcto y guárdala en \`ciudad_correcta\`. Imprime el resultado.",
        initialCode: "ciudad = \"mAdRiD eSpAñA\"\n\n# Aplica title() e imprime el resultado\n",
        outputCheck: "Madrid España",
        hint: "Usa: ciudad_correcta = ciudad.title() y luego imprímela."
      },
      {
        id: 2302,
        title: "Ejercicio 2: Validación con istitle()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la variable \`libro = \"El señor De Los Anillos\"\` y otra \`pelicula = \"El Padrino\"\`. Usa \`.istitle()\` para verificar ambas cadenas e imprime sus resultados de validación separados por coma.",
        initialCode: "libro = \"El señor De Los Anillos\"\npelicula = \"El Padrino\"\n\n# Imprime si cumplen el formato de título\n",
        outputCheck: "False True",
        testCode: "assert 'libro' in locals()\nassert 'pelicula' in locals()",
        hint: "Usa: print(libro.istitle(), pelicula.istitle())"
      },
      {
        id: 2303,
        title: "Ejercicio 3: Validación y Corrección (if-else)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la variable \`nombre = \"mAriA pEreZ\"\`. Usa un \`if\` para verificar si está en formato título con \`.istitle()\`. Si lo está, imprime \`\"Correcto\"\`. Si no lo está (\`else\`), corrige el nombre usando \`.title()\` e imprime exactamente \`\"Corregido: Maria Perez\"\`.",
        initialCode: "nombre = \"mAriA pEreZ\"\n\n# Valida y corrige si es necesario\n",
        outputCheck: "Corregido: Maria Perez",
        testCode: "assert 'nombre' in locals()",
        hint: "if nombre.istitle(): print(\"Correcto\") else: print(\"Corregido: \" + nombre.title())"
      }
    ]
  },
  {
    id: 24,
    title: "Los métodos lower(), upper(), islower() e isupper()",
    module: "Conceptos Básicos",
    theory: `## 1. Métodos de Conversión: lower() y upper()
Estos métodos se encargan de transformar por completo todos los caracteres alfabéticos de una cadena de texto.

- **\`lower()\`**: Convierte todas las letras mayúsculas de una cadena en minúsculas. Los caracteres que ya estén en minúsculas, números o símbolos no sufren cambios.
- **\`upper()\`**: Convierte todas las letras minúsculas de una cadena en mayúsculas. Al igual que el anterior, ignora números y caracteres especiales.

\`\`\`python
texto_mixto = "PyThOn 3.10!"

# Convertir a minúsculas
print(texto_mixto.lower())  # Salida: python 3.10!

# Convertir a mayúsculas
print(texto_mixto.upper())  # Salida: PYTHON 3.10!
\`\`\`

## 2. Métodos de Validación: islower() e isupper()
A diferencia de los anteriores, estos métodos no modifican el texto. Realizan una inspección y devuelven un valor booleano (\`True\` o \`False\`).

- **\`islower()\`**: Devuelve \`True\` si todas las letras de la cadena están en minúsculas y contiene al menos un carácter alfabético. Si hay alguna mayúscula, devuelve \`False\`.
- **\`isupper()\`**: Devuelve \`True\` si todas las letras de la cadena están en mayúsculas y contiene al menos un carácter alfabético. Si hay alguna minúscula, devuelve \`False\`.

> **⚠️ Regla técnica:** Tanto \`islower()\` como \`isupper()\` ignoran por completo los números, espacios o símbolos. La validación se concentra exclusivamente en las letras presentes en el string.

\`\`\`python
cadena_1 = "programando de noche"
cadena_2 = "CODIGO123!"

print(cadena_1.islower())  # Devuelve True (todas las letras son minúsculas)
print(cadena_2.isupper())  # Devuelve True (las letras son mayúsculas, ignora números/símbolos)
\`\`\`

## 3. Aplicación en Toma de Decisiones (if-else)
Una de las utilidades más comunes de estos métodos en un software real es validar opciones de menú ingresadas por teclado de manera flexible, sin importar si el usuario usa mayúsculas o minúsculas.

\`\`\`python
# Solicitamos una confirmación al usuario (S/N)
opcion = input("¿Deseas continuar con la instalación? (S/N): ")

# Estandarizamos la respuesta pasándola a minúsculas antes de evaluar
if opcion.lower() == "s":
    print("Iniciando la instalación...")
elif opcion.lower() == "n":
    print("Instalación cancelada por el usuario.")
else:
    print("Opción no válida.")
\`\`\`

De esta manera, si la persona escribe \`S\` o \`s\`, el método \`lower()\` transformará la entrada para que coincida siempre con la condición, evitando tener que escribir estructuras condicionales complejas como \`if opcion == "s" or opcion == "S":\`.`,
    exercises: [
      {
        id: 2401,
        title: "Ejercicio 1: Conversión básica",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dadas las variables \`min_texto = \"estoy gritando\"\` y \`may_texto = \"ESTOY SUSURRANDO\"\`. Convierte la primera a mayúsculas usando \`.upper()\` y la segunda a minúsculas usando \`.lower()\`. Imprime los resultados en líneas separadas.",
        initialCode: "min_texto = \"estoy gritando\"\nmay_texto = \"ESTOY SUSURRANDO\"\n\n# Aplica los métodos y muestra los resultados\n",
        outputCheck: "ESTOY GRITANDO\nestoy susurrando",
        hint: "Usa print(min_texto.upper()) y luego print(may_texto.lower())"
      },
      {
        id: 2402,
        title: "Ejercicio 2: Validación con islower() e isupper()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea \`clave_1 = \"admin123\"\` y \`clave_2 = \"ROOT_ACC\"\`. Usa \`.islower()\` en la primera y \`.isupper()\` en la segunda para verificar si están completamente en minúsculas y mayúsculas respectivamente. Imprime los resultados booleanos separados por coma.",
        initialCode: "clave_1 = \"admin123\"\nclave_2 = \"ROOT_ACC\"\n\n# Imprime los resultados de validación\n",
        outputCheck: "True True",
        testCode: "assert 'clave_1' in locals() and 'clave_2' in locals()",
        hint: "print(clave_1.islower(), clave_2.isupper())"
      },
      {
        id: 2403,
        title: "Ejercicio 3: Estandarizando opciones (if-else)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Imagina que un usuario introdujo \`respuesta = \"Si\"\`. Crea una condición \`if\` que valide si la \`respuesta\` convertida a minúsculas es igual a \`\"si\"\`. Si es así, imprime \`\"Acción confirmada\"\`. De lo contrario (\`else\`), imprime \`\"Acción denegada\"\`.",
        initialCode: "respuesta = \"Si\"\n\n# Usa if-else y el método .lower() para validar\n",
        outputCheck: "Acción confirmada",
        testCode: "assert 'respuesta' in locals()",
        hint: "if respuesta.lower() == \"si\": print(\"Acción confirmada\") else: ..."
      }
    ]
  },
  {
    id: 25,
    title: "El método swapcase()",
    module: "Conceptos Básicos",
    theory: `## ¿Qué es swapcase()?
El método \`swapcase()\` (que significa *cambiar caja* o *alternar mayúsculas y minúsculas*) es una función de transformación de texto integrada en Python que actúa como un **interruptor inverso** para cada una de las letras presentes dentro de una cadena de caracteres.

## 1. ¿Cómo funciona internamente?
El intérprete de Python recorre el string índice por índice y evalúa el estado de cada carácter:

- Si encuentra una **letra minúscula**, la transforma inmediatamente en **mayúscula**.
- Si encuentra una **letra mayúscula**, la transforma inmediatamente en **minúscula**.
- **Caracteres especiales:** Los números, los espacios en blanco, las tabulaciones (\`\\t\`), los saltos de línea (\`\\n\`) y los signos de puntuación son **ignorados por completo** y conservan su estado original.

## 2. Sintaxis Básica
Al ser un método propio de los objetos de tipo cadena (\`str\`), se invoca utilizando la nomenclatura del punto pegado a la variable o al texto, completamente en minúsculas y con paréntesis vacíos.

\`\`\`python
variable.swapcase()
\`\`\`

## 3. Ejemplo Práctico
Este método es sumamente útil en software donde se necesita corregir textos que un usuario pudo haber escrito por error tras dejar activada accidentalmente la tecla de bloqueo de mayúsculas (**Bloq Mayús**).

\`\`\`python
# Ejemplo de texto escrito con Bloq Mayús invertido por accidente
texto_entrada = "pYTHON ES UN LENGUAJE GENIAL."

# Aplicamos la inversión de caja
texto_corregido = texto_entrada.swapcase()

print("Original: ", texto_entrada)
print("Resultado:", texto_corregido)

# Original:  pYTHON ES UN LENGUAJE GENIAL.
# Resultado: Python es un lenguaje genial.
\`\`\`

> **📝 Nota de inmutabilidad:** Recuerda que en Python las cadenas de texto son **inmutables**. El método \`swapcase()\` no modifica la variable original, sino que genera y devuelve una **nueva cadena** con las modificaciones. Si deseas conservar el cambio, debes reasignarlo a la variable: \`texto = texto.swapcase()\`.`,
    exercises: [
      {
        id: 2501,
        title: "Ejercicio 1: Inversión básica con swapcase()",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea la variable \`frase = \"hOLA mUNDO\"\`. Aplica el método \`.swapcase()\` y guarda el resultado en \`frase_corregida\`. Imprime \`frase_corregida\`.",
        initialCode: "frase = \"hOLA mUNDO\"\n\n# Aplica swapcase() y guarda en frase_corregida\n",
        outputCheck: "Hola Mundo",
        hint: "Usa: frase_corregida = frase.swapcase()"
      },
      {
        id: 2502,
        title: "Ejercicio 2: Caracteres especiales con swapcase()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la variable \`codigo = \"pYTHON3.10!\"\`. Aplica \`.swapcase()\` e imprime el resultado. Verifica que los números y el símbolo \`!\` permanecen sin cambios.",
        initialCode: "codigo = \"pYTHON3.10!\"\n\n# Aplica swapcase() e imprime\n",
        outputCheck: "Python3.10!",
        hint: "Usa: print(codigo.swapcase())"
      },
      {
        id: 2503,
        title: "Ejercicio 3: Inmutabilidad y reasignación",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea \`mensaje = \"eL bLoQuEo De MaYuScUlAs Es UnA PeSaDiLlA!\"\`. Reasigna la misma variable aplicándole \`.swapcase()\` (es decir, \`mensaje = mensaje.swapcase()\`). Imprime el resultado corregido.",
        initialCode: "mensaje = \"eL bLoQuEo De MaYuScUlAs Es UnA PeSaDiLlA!\"\n\n# Reasigna la variable usando swapcase() e imprime\n",
        outputCheck: "El BlOqUeO dE mAyUsClAs eS uNa pEsAdIlLa!",
        hint: "mensaje = mensaje.swapcase() y luego print(mensaje)"
      }
    ]
  },
  {
    id: 26,
    title: "El método capitalize()",
    module: "Conceptos Básicos",
    theory: `## ¿Qué es capitalize()?
El método \`capitalize()\` (que se traduce como *capitalizar*) es una función integrada en Python diseñada para dar **formato de oración** a una cadena de caracteres. Su objetivo es estandarizar un texto para que comience formalmente con una letra mayúscula y el resto del contenido se mantenga homogéneo.

## 1. ¿Cómo funciona internamente?
Cuando ejecutas este método sobre un texto, el intérprete de Python realiza **dos acciones automáticas** en una sola operación:

1. **Analiza el primer carácter (Índice 0):** Si es una letra minúscula, la transforma inmediatamente en mayúscula. Si ya es mayúscula, o si es un número, espacio o símbolo, lo deja exactamente como está.
2. **Normaliza el resto de la cadena:** Recorre todos los caracteres desde el índice 1 hasta el final del texto. Si encuentra cualquier letra mayúscula perdida en medio de la cadena, la transforma obligatoriamente en minúscula.

## 2. Sintaxis Básica
Al ser un método de los objetos tipo cadena (\`str\`), se invoca utilizando la nomenclatura del punto pegado a la variable, escrito totalmente en minúsculas y con los paréntesis vacíos (ya que no requiere parámetros adicionales).

\`\`\`python
variable.capitalize()
\`\`\`

## 3. Ejemplos Prácticos

**Caso A: Texto con mayúsculas desordenadas (El uso más común)**
\`\`\`python
texto_error = "eL pROGRAMADOR APRENDE RÁPIDO."

texto_corregido = texto_error.capitalize()
print(texto_corregido)
# Salida: El programador aprende rápido.
\`\`\`
La primera \`e\` se volvió mayúscula, y todas las mayúsculas internas se convirtieron en minúsculas.

**Caso B: Cuando el índice 0 es un número**
\`\`\`python
texto_numero = "3 tristes tigres TRAGABAN TRIGO."

print(texto_numero.capitalize())
# Salida: 3 tristes tigres tragaban trigo.
\`\`\`
Como el índice 0 es el número \`3\`, Python lo ignora, pero el método sigue cumpliendo la segunda regla y convierte todas las mayúsculas internas a minúsculas.

## ⚠️ Recordatorio sobre la Inmutabilidad
Las cadenas de texto en Python son **inmutables**. El método \`capitalize()\` no altera la variable original. Si imprimes la variable después de usar el método sin haber asignado el resultado, verás el texto original sin cambios:

\`\`\`python
frase = "hola MUNDO"
frase.capitalize()  # Se pierde si no se guarda

print(frase)  # Imprime: "hola MUNDO"

# Forma correcta de conservar el cambio:
frase = frase.capitalize()
print(frase)  # Imprime: "Hola mundo"
\`\`\``,
    exercises: [
      {
        id: 2601,
        title: "Ejercicio 1: Capitalización básica",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea la variable \`frase = \"python es increíble\"\`. Aplica el método \`.capitalize()\` y guarda el resultado en \`frase_formal\`. Imprime \`frase_formal\`.",
        initialCode: "frase = \"python es increíble\"\n\n# Aplica capitalize() y guarda en frase_formal\n",
        outputCheck: "Python es increíble",
        hint: "Usa: frase_formal = frase.capitalize()"
      },
      {
        id: 2602,
        title: "Ejercicio 2: Normalizando mayúsculas internas",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la variable \`texto = \"eL pROGRAMADOR APRENDE RÁPIDO.\"\`. Aplica \`.capitalize()\` y reasigna el resultado a la misma variable \`texto\`. Imprime \`texto\`.",
        initialCode: "texto = \"eL pROGRAMADOR APRENDE RÁPIDO.\"\n\n# Reasigna texto usando capitalize() e imprime\n",
        outputCheck: "El programador aprende rápido.",
        hint: "texto = texto.capitalize() y luego print(texto)"
      },
      {
        id: 2603,
        title: "Ejercicio 3: Índice 0 numérico",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea la variable \`dato = \"3 LENGUAJES DE PROGRAMACIÓN MÁS USADOS.\"\`. Aplica \`.capitalize()\` directamente dentro del \`print()\` e imprime el resultado. Observa cómo el número \`3\` no cambia, pero las mayúsculas internas sí.",
        initialCode: "dato = \"3 LENGUAJES DE PROGRAMACIÓN MÁS USADOS.\"\n\n# Usa capitalize() dentro del print()\n",
        outputCheck: "3 lenguajes de programación más usados.",
        hint: "Usa: print(dato.capitalize())"
      }
    ]
  },
  {
    id: 27,
    title: "Métodos de alineación: center(), ljust() y rjust()",
    module: "Conceptos Básicos",
    theory: `El tema principal es el uso e implementación de tres métodos esenciales para alinear y dar formato a cadenas de texto (strings) en la pantalla: \`center()\`, \`ljust()\` y \`rjust()\`.

## 1. El método center()
Permite centrar un texto añadiendo espacios o caracteres específicos tanto al inicio como al final de la cadena original.

**Sintaxis y reglas:** Este método requiere argumentos dentro de los paréntesis para funcionar.
- **Primer argumento (Obligatorio):** Un número entero que define la longitud total que tendrá el texto resultante. Este número debe ser estrictamente mayor que la longitud del texto original (por ejemplo, si la palabra es "menú", que tiene 4 letras, el número especificado debe ser mayor a 4).
- **Segundo argumento (Opcional):** Un único carácter (como un guion, asterisco, signo de igual, etc.) entre comillas. Si no se especifica, Python rellena los extremos con espacios en blanco de forma automática.

## 2. El método ljust() (Left Justify)
Este método alinea el texto original hacia la izquierda.

**Funcionamiento:** Posiciona la cadena de texto al principio y rellena los espacios vacíos únicamente al final (a la derecha) hasta alcanzar la longitud total que se haya indicado en el argumento numérico.

Mantiene exactamente las mismas reglas de argumentos que el método de centrado (un número entero obligatorio y un carácter de relleno opcional).

## 3. El método rjust() (Right Justify)
Este método realiza la acción opuesta al anterior, alineando el texto hacia la derecha.

**Funcionamiento:** Añade los espacios o caracteres de relleno únicamente al inicio (a la izquierda) y desplaza el texto original hacia el final de la línea.

## Demostración Práctica en Código
Existen dos formas de aplicar estas herramientas:

**Impresión directa (sin modificar la variable):** Consiste en usar los métodos directamente dentro de la función \`print()\`. Esto solo altera visualmente lo que se muestra en la consola en ese instante, manteniendo intacta la variable original.
\`\`\`python
string = "Menú"
print(string.center(20, "=")) 
# Salida: ========Menú========
\`\`\`

**Modificación permanente:** Consiste en reasignar el resultado del método a la propia variable. De esta manera, el contenido de la variable se sobreescribe y el texto queda transformado de forma definitiva para el resto del programa.
\`\`\`python
string = "Menú"
string = string.center(20, "=")
print(string)
\`\`\``,
    exercises: [
      {
        id: 2701,
        title: "Ejercicio 1: Centrando texto",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea la variable \`titulo = \"PYTHON\"\`. Utiliza el método \`.center()\` dentro de un \`print()\` para que tenga una longitud total de 20 caracteres y usa el guion (\`\"-\"\`) como carácter de relleno.",
        initialCode: "titulo = \"PYTHON\"\n\n# Imprime el título centrado con guiones\n",
        outputCheck: "-------PYTHON-------",
        hint: "Usa: print(titulo.center(20, \"-\"))"
      },
      {
        id: 2702,
        title: "Ejercicio 2: Alineación izquierda (ljust)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la variable \`palabra = \"Inicio\"\`. Utiliza el método \`.ljust()\` para darle una longitud de 15 caracteres rellenando con asteriscos (\`\"*\"\`). Imprime el resultado.",
        initialCode: "palabra = \"Inicio\"\n\n# Aplica ljust() e imprime\n",
        outputCheck: "Inicio*********",
        hint: "Usa: print(palabra.ljust(15, \"*\"))"
      },
      {
        id: 2703,
        title: "Ejercicio 3: Alineación derecha (rjust) con reasignación",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea la variable \`precio = \"$99.99\"\`. Utiliza \`.rjust()\` para darle una longitud total de 12 caracteres rellenando con espacios (solo envía el primer argumento). **Reasigna el resultado a la misma variable \`precio\`** y luego imprímela.",
        initialCode: "precio = \"$99.99\"\n\n# Reasigna usando rjust() y luego imprime\n",
        outputCheck: "      $99.99",
        testCode: "assert 'precio' in locals()\nassert precio == \"      $99.99\"",
        hint: "precio = precio.rjust(12) y luego print(precio)"
      }
    ]
  },
  {
    id: 28,
    title: "El método count()",
    module: "Conceptos Básicos",
    theory: `El método \`count()\` es muy útil en Python cuando necesitas saber **cuántas veces aparece una subcadena (substring) o un carácter en específico** dentro de un texto.

## 1. Sintaxis General y Argumentos
El método requiere argumentos para trabajar correctamente y tiene la flexibilidad de recibir desde un mínimo de 1 hasta un máximo de 3 argumentos de manera simultánea:

- **Un argumento:** \`string.count("subcadena")\` -> Busca las coincidencias en la totalidad del texto.
- **Dos argumentos:** \`string.count("subcadena", inicio)\` -> Indica al método que ignore el principio del texto y empiece a buscar a partir de una posición o índice numérico entero en específico.
- **Tres argumentos:** \`string.count("subcadena", inicio, fin)\` -> Delimita la búsqueda estableciendo un rango exacto con una posición de inicio y una posición final.

## 2. Comportamiento y Detalles Clave
- **Contar la longitud total (Caso especial):** Si aplicas el método colocando comillas vacías (\`string.count("")\`), el método retornará un número equivalente a la cantidad de caracteres de la cadena **más uno** (por ejemplo, 11 en lugar de 10). Esto ocurre porque cuenta las posiciones o "separadores" desde el extremo izquierdo del primer carácter hasta el extremo derecho del último.
- **Sensibilidad a mayúsculas y minúsculas (Case-sensitive):** Diferencia estrictamente entre tipos de letra. Si buscas la "M" mayúscula en "mi mamá me mima", devuelve 0 coincidencias.
- **Importancia de los acentos:** Las búsquedas son literales. Si buscas "ma", no contará la palabra "mamá" debido al acento en la vocal.
- **Índices fuera de rango:** Si pasas un número de inicio o fin que supere la longitud real del texto, Python **no arrojará un error**. Se situará en el extremo final de la cadena y devolverá 0 coincidencias de forma segura.
- **Uso de posiciones negativas:** Python permite usar números negativos (ej. -3, -4), contando de derecha a izquierda desde el final de la cadena, facilitando acotar rangos al final de un texto largo.

## 3. Demostración Práctica
Puedes usar \`count()\` directamente dentro de un \`print()\` utilizando f-strings para mostrar resultados limpios.
\`\`\`python
texto = "mi mamá me mima"

# Búsqueda simple
print(f"Total de 'm': {texto.count('m')}")

# Búsqueda con índice inicial
print(f"Total de 'm' desde el índice 5: {texto.count('m', 5)}")

# Búsqueda con rango
print(f"Total de 'm' en rango (0 a 7): {texto.count('m', 0, 7)}")
\`\`\``,
    exercises: [
      {
        id: 2801,
        title: "Ejercicio 1: Búsqueda básica",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la variable \`texto = \"programación en python\"\`. Utiliza el método \`.count()\` para encontrar cuántas veces aparece la letra \`\"o\"\` e imprime el resultado directamente.",
        initialCode: "texto = \"programación en python\"\n\n# Imprime el número de veces que aparece la 'o'\n",
        outputCheck: "3",
        hint: "Usa: print(texto.count(\"o\"))"
      },
      {
        id: 2802,
        title: "Ejercicio 2: Búsqueda sensible a mayúsculas y acentos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea la variable \`frase = \"El Águila caza al águila.\"\`. Usa \`.count()\` para buscar cuántas veces aparece \`\"águila\"\` (en minúscula y con tilde). Imprime el resultado.",
        initialCode: "frase = \"El Águila caza al águila.\"\n\n# Cuenta cuántas veces aparece 'águila' e imprime\n",
        outputCheck: "1",
        hint: "Usa print(frase.count(\"águila\")). Nota que la primera está en mayúscula, por lo que solo contará una."
      },
      {
        id: 2803,
        title: "Ejercicio 3: Búsqueda con rangos (inicio y fin)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la variable \`datos = \"100100100\"\`. Usa \`.count()\` para buscar cuántos \`\"1\"\` hay entre el **índice 2** (inicio) y el **índice 8** (fin). Imprime el resultado.",
        initialCode: "datos = \"100100100\"\n\n# Usa count() indicando el inicio y el fin\n",
        outputCheck: "2",
        hint: "Usa: print(datos.count(\"1\", 2, 8))"
      }
    ]
  },
  {
    id: 29,
    title: "Los métodos startswith() y endswith()",
    module: "Conceptos Básicos",
    theory: `El uso e implementación de dos métodos muy útiles para verificar cómo empieza y cómo termina una cadena de texto: \`startswith()\` y \`endswith()\`.

Ambos métodos se conocen como métodos de validación, ya que su única función es retornar un valor booleano: \`True\` (Verdadero) o \`False\` (Falso).

## 1. El método startswith()
Se utiliza para comprobar si una cadena de texto comienza con una subcadena o un carácter en específico.

- **Sintaxis:** \`variable.startswith("subcadena")\`
- **Argumentos:** Requiere obligatoriamente al menos un argumento (la subcadena a buscar). Sin embargo, puede recibir hasta tres argumentos de manera simultánea para acotar la búsqueda en un rango específico de índices: \`startswith("subcadena", inicio, fin)\`.
- **Funcionamiento:** Si el texto (o el rango seleccionado) empieza exactamente con los caracteres indicados, el programa devuelve \`True\`; de lo contrario, devuelve \`False\`.

## 2. El método endswith()
Funciona exactamente igual que el anterior, pero realiza la comprobación en sentido inverso: verifica si la cadena de texto termina con la subcadena o carácter especificado.

- **Sintaxis:** \`variable.endswith("subcadena")\`
También admite un máximo de tres argumentos para delimitar un rango de evaluación mediante posiciones numéricas (inicio y fin).

## 3. Detalles clave de comportamiento
- **Sensibilidad a mayúsculas, minúsculas y acentos (Case-sensitive):** Las validaciones son estrictamente literales. Si tu texto empieza con la palabra "Diana" (con D mayúscula) y validas con \`startswith("diana")\` (con d minúscula), el resultado será \`False\`. Lo mismo ocurre con caracteres que lleven tilde.
- **Manejo de rangos e índices:** Cuando se utilizan los tres argumentos para establecer un rango de evaluación, los métodos aíslan esa porción de la cadena de texto. Por ejemplo, si en la frase "Diana Manrique" aíslas el rango de la posición 6 a la 14 ("Manrique"), y aplicas \`startswith("Manrique")\` dentro de ese rango, el resultado será \`True\`.
- **Índices fuera de rango y números negativos:** Si especificas posiciones que exceden el tamaño real del texto, el programa no se romperá ni arrojará errores; simplemente devolverá \`False\`. También es posible usar números negativos para contar las posiciones de derecha a izquierda.

## 4. Demostración Práctica
Puedes usar \`f-strings\` para mostrar de manera limpia los resultados de estas evaluaciones.

\`\`\`python
nombre = "Diana Manrique"

# Comprobaciones simples
print(f"Empieza con Diana: {nombre.startswith('Diana')}") # True
print(f"Termina con que: {nombre.endswith('que')}") # True

# Comprobaciones erróneas (case-sensitive)
print(f"Empieza con diana: {nombre.startswith('diana')}") # False

# Evaluaciones avanzadas con rangos
print(f"Rango 6-14 empieza con Manrique: {nombre.startswith('Manrique', 6, 14)}") # True
\`\`\``,
    exercises: [
      {
        id: 2901,
        title: "Ejercicio 1: Verificando el inicio",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la variable \`archivo = \"reporte_ventas.pdf\"\`. Utiliza el método \`.startswith()\` para comprobar si el nombre del archivo empieza con \`\"reporte\"\` e imprime el resultado.",
        initialCode: "archivo = \"reporte_ventas.pdf\"\n\n# Imprime si el archivo empieza con 'reporte'\n",
        outputCheck: "True",
        hint: "Usa: print(archivo.startswith(\"reporte\"))"
      },
      {
        id: 2902,
        title: "Ejercicio 2: Verificando el final (case-sensitive)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la variable \`url = \"https://miweb.COM\"\`. Utiliza \`.endswith()\` para comprobar si termina en \`\".com\"\` (en minúsculas). Imprime el resultado. (Nota que debe dar False por la diferencia de mayúsculas).",
        initialCode: "url = \"https://miweb.COM\"\n\n# Imprime si la url termina en '.com'\n",
        outputCheck: "False",
        hint: "Usa: print(url.endswith(\".com\"))"
      },
      {
        id: 2903,
        title: "Ejercicio 3: Evaluación avanzada con rangos",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la variable \`texto = \"Hola Python Mundo\"\`. Queremos comprobar si la subcadena entre el índice 5 y el 11 empieza con \`\"Python\"\`. Usa \`.startswith()\` con 3 argumentos e imprime el resultado.",
        initialCode: "texto = \"Hola Python Mundo\"\n\n# Imprime si el rango [5:11] empieza con 'Python'\n",
        outputCheck: "True",
        hint: "Usa: print(texto.startswith(\"Python\", 5, 11))"
      }
    ]
  },
  {
    id: 30,
    title: "Substrings (Subcadenas)",
    module: "Conceptos Básicos",
    theory: `El tema central es el concepto de **Substrings** (o subcadenas) en Python.

## ¿Qué es un Substring?
Un substring o subcadena es una sucesión de caracteres que se encuentra dentro de una cadena de texto principal. Python permite acceder de manera muy sencilla a estas porciones específicas utilizando una sintaxis basada en corchetes \`[]\` pegados al nombre de la variable.

## 1. La Sintaxis de los Substrings
Para extraer texto se pueden pasar hasta tres valores enteros (positivos o negativos) dentro de los corchetes, separados por dos puntos (\`:\`):

\`\`\`python
variable[inicio : final : saltos]
\`\`\`

- **Inicio (inicio):** Determina el índice o posición exacta donde comenzará a extraerse la subcadena.
- **Final (final):** Establece el índice donde terminará la extracción. **Nota clave:** El carácter que se encuentra en la posición final **no se incluye** en el resultado; el rango se detiene una posición antes.
- **Saltos (saltos):** Determina cuántos pasos dará el índice para ir seleccionando los caracteres (por ejemplo, de 2 en 2, de 3 en 3, etc.).

> **Índices Positivos vs. Negativos:** Los índices positivos recorren la cadena de izquierda a derecha empezando en 0. Los negativos se posicionan desde el final de la cadena (el último carácter se asocia a -1) y también hacen su lectura hacia la derecha.

## 2. Comportamiento según los valores utilizados
Usaremos una cadena de texto compuesta por números (\`"0123456789"\`) para que los índices coincidan directamente con los caracteres:

- **Un solo valor \`variable[índice]\`:** Extrae únicamente el carácter que se encuentra en esa posición exacta. Por ejemplo, \`string[5]\` devuelve \`"5"\`, y \`string[-4]\` devuelve \`"6"\`.
- **Dos valores \`variable[inicio:final]\`:** Encasilla y extrae los caracteres que queden en ese rango.
  - Si se omite el inicio (ej. \`[:3]\`), Python asume por defecto que empieza desde la posición \`0\`.
  - Si se omite el final (ej. \`[5:]\`), Python asume por defecto que debe llegar hasta el último carácter disponible.
  - Si se dejan solo los dos puntos \`[:]\`, se extrae la cadena completa por defecto.
- **Tres valores \`variable[inicio:final:saltos]\`:** Al añadir el tercer componente, el programa toma el carácter inicial y le va sumando el valor del salto para capturar los siguientes elementos. Por ejemplo, en \`string[1:6:2]\`, empieza en \`1\`, salta a \`3\` y luego a \`5\`, devolviendo \`"135"\`.

## 3. Demostración Práctica
Puedes usar \`f-strings\` y saltos de línea (\`\\n\`) para imprimir en la consola cada uno de los escenarios teóricos.
\`\`\`python
texto = "0123456789"

print(f"Un solo índice [5]: {texto[5]}")
print(f"Rango [2:6]: {texto[2:6]}")
print(f"Omitiendo inicio [:4]: {texto[:4]}")
print(f"Omitiendo final [6:]: {texto[6:]}")
print(f"Con saltos [1:8:2]: {texto[1:8:2]}")
\`\`\``,
    exercises: [
      {
        id: 3001,
        title: "Ejercicio 1: Extrayendo un solo carácter",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la variable \`palabra = \"Programación\"\`. Extrae y muestra usando \`print()\` el carácter que se encuentra en el índice 4. Recuerda que los índices comienzan en 0.",
        initialCode: "palabra = \"Programación\"\n\n# Imprime el carácter en el índice 4\n",
        outputCheck: "r",
        hint: "Usa: print(palabra[4])"
      },
      {
        id: 3002,
        title: "Ejercicio 2: Rango con omisión",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la variable \`mensaje = \"Hola Mundo\"\`. Queremos extraer la palabra \`\"Mundo\"\`. Para esto, usa un rango omitiendo el índice final, sabiendo que la \`M\` está en el índice 5. Imprime el resultado.",
        initialCode: "mensaje = \"Hola Mundo\"\n\n# Imprime 'Mundo' usando un rango desde el índice 5 y omitiendo el final\n",
        outputCheck: "Mundo",
        hint: "Usa: print(mensaje[5:])"
      },
      {
        id: 3003,
        title: "Ejercicio 3: Extracción con saltos",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la variable \`letras = \"abcdefghij\"\`. Queremos extraer los caracteres desde el índice 1 al 8 (el 8 no se incluye), pero saltando de 2 en 2. El resultado debería ser \`\"bdfh\"\`. Imprime el resultado usando la notación de tres valores \`[inicio:final:saltos]\`.",
        initialCode: "letras = \"abcdefghij\"\n\n# Usa [inicio:final:saltos] para extraer saltando de 2 en 2\n",
        outputCheck: "bdfh",
        hint: "Usa: print(letras[1:8:2])"
      },
      {
        id: 3004,
        title: "Ejercicio 4: Índices Negativos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la variable `codigo = \"Python2026\"`. Usa índices negativos para extraer exactamente la palabra `\"Python\"` (es decir, desde el inicio omitiendo el inicio `[:` y llegando hasta `-4`). Imprime el resultado.",
        initialCode: "codigo = \"Python2026\"\n\n# Usa índices negativos en el rango\n",
        outputCheck: "Python",
        hint: "Usa: print(codigo[:-4])"
      }
    ]
  },
];
