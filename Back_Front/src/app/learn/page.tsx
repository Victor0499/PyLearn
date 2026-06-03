"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePyodide } from "@/hooks/usePyodide";
import CodeEditor from "@/components/CodeEditor";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { Play, CheckCircle, Circle, Terminal, BookOpen, AlertCircle, LogOut, GraduationCap, School, Lock, Trophy, XCircle, X, Menu, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const lessons = [
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
    id: 8,
    title: "Condicionales: La sentencia if",
    module: "Estructuras de Control",
    theory: `## 1. ¿Qué es una sentencia condicional simple?
Es una estructura que permite ejecutar un bloque de instrucciones **solo si una condición específica es verdadera (\`True\`)**. Si la condición es falsa (\`False\`), el programa ignora dicho bloque y continúa con el resto del código.

**Estructura básica:**
\`\`\`python
if condición:
    instrucción
\`\`\`

## 2. Conceptos clave
- **Indentación (Sangría):** Es el espacio o tabulación que **debe ir antes** de las instrucciones que dependen de la condición. Sin este espacio, Python no entenderá qué código pertenece a la estructura \`if\` y arrojará un error (\`IndentationError\`).
- **Dos puntos (\`:\`):** Se colocan al final de la línea del \`if\` para indicarle a Python que ahí comienza el bloque de código condicional.
- **Operadores de comparación:** Se utilizan para evaluar la condición. Por ejemplo:
  - \`==\` para comparar si dos cosas son exactamente iguales.
  - \`>=\` para mayor o igual.
  - \`<\` para menor que.

## 3. Representación lógica (Diagrama de flujo)
Una sentencia condicional actúa como un **"bifurcador"** en el camino de ejecución del programa:
1. El programa evalúa la condición.
2. Si es **Verdadera**, ejecuta el código indentado.
3. Si es **Falsa**, salta directamente a la siguiente línea de código que no tenga indentación.

**Ejemplo Práctico:**
\`\`\`python
calificacion = 8

# Evaluamos la condición
if calificacion >= 6:
    print("¡Felicidades, estás aprobado!")

print("Fin del programa")
\`\`\`
En este caso, como \`8\` es mayor o igual a \`6\`, se imprimirá el mensaje de felicitación y luego "Fin del programa". Si la calificación fuera \`5\`, solo se imprimiría "Fin del programa".
`,
    exercises: [
      {
        id: 801, title: "Ejercicio 1: Tu primer if", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea una variable `edad = 18`.\n2. Escribe una sentencia `if` que compruebe si `edad` es mayor o igual a `18`.\n3. Si es verdad, imprime `'Eres mayor de edad'`.\n*(No olvides los dos puntos y la indentación).*.",
        initialCode: "edad = 18\n# Escribe tu if aquí\n\n", outputCheck: "Eres mayor de edad",
        testCode: "assert 'edad' in locals(), \"Falta 'edad'\"\nassert edad == 18, \"'edad' debe ser 18\"",
        hint: "if edad >= 18:\n    print('Eres mayor de edad')"
      },
      {
        id: 802, title: "Ejercicio 2: El poder de la indentación", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "El siguiente código tiene un error porque no respeta los espacios (indentación). Arréglalo para que funcione y muestre el mensaje secreto.",
        initialCode: "clave = 1234\n\nif clave == 1234:\nprint('Acceso concedido al búnker secreto')\n", outputCheck: "Acceso concedido al búnker secreto",
        testCode: "assert 'clave' in locals()",
        hint: "El print debe tener un espacio o tabulación (indentación) antes de la palabra print."
      },
      {
        id: 803, title: "Ejercicio 3: Calculadora de Promedio", difficulty: "Reto", difficultyColor: "red",
        instructions: "1. Crea 3 variables: `nota1 = 7`, `nota2 = 8`, y `nota3 = 5`.\n2. Suma las tres notas y divide el resultado entre 3 para calcular el `promedio`. Guárdalo en esa variable.\n3. Si el `promedio` es mayor o igual a `6`, imprime `'Aprobado'`. (Usa un `if`).",
        initialCode: "# Crea las notas, calcula el promedio y usa el if\n\n", outputCheck: "Aprobado",
        testCode: "assert 'nota1' in locals() and 'nota2' in locals() and 'nota3' in locals(), \"Faltan las notas\"\nassert 'promedio' in locals(), \"Falta calcular el 'promedio'\"\nassert promedio == (7+8+5)/3, \"Cálculo de promedio incorrecto\"",
        hint: "promedio = (nota1 + nota2 + nota3) / 3\nif promedio >= 6:\n    print('Aprobado')"
      },
    ],
  },
  {
    id: 9,
    title: "Condicionales Compuestas: if - else",
    module: "Estructuras de Control",
    theory: `## 1. ¿Qué es una Sentencia Condicional Compuesta?
Son estructuras que permiten tomar decisiones con dos caminos posibles:
- **Rama verdadera (\`if\`)**: Ejecuta una instrucción si la condición se cumple.
- **Rama falsa (\`else\`)**: Ejecuta otra instrucción diferente si la condición **no** se cumple.

> **Crucial:** Jamás se ejecutarán ambas ramas de manera simultánea; el programa elegirá solo una ruta según el resultado lógico de la evaluación.

## 2. Sintaxis en Python
La estructura correcta se define de la siguiente manera:

1. Se inicia con la palabra reservada \`if\` seguida de la condición lógica y dos puntos (\`:\`).
2. Las instrucciones dentro del \`if\` llevan un espacio de tabulación obligatorio llamado **indentado**.
3. Para la alternativa falsa, se utiliza la palabra reservada **\`else\`** acompañada de dos puntos (\`:\`), la cual debe alinearse exactamente a la misma altura del \`if\` (sin sangría).
4. Las instrucciones que pertenecen al \`else\` también requieren su respectivo indentado.

**Ejemplo:**
\`\`\`python
edad = 15

if edad >= 18:
    print("Eres mayor de edad")
else:
    print("Eres menor de edad")
\`\`\`

## 3. Control de Decimales con la Función \`round()\`
A veces, al realizar divisiones, obtenemos números flotantes (\`float\`) con demasiados decimales. Para limpiar la salida, podemos usar la función \`round()\`.

**Sintaxis:**
\`\`\`python
round(variable, cantidad_de_decimales)
\`\`\`

**Ejemplo Práctico:**
\`\`\`python
promedio_largo = 6.6666667
promedio_redondeado = round(promedio_largo, 1) # Lo redondea a 1 decimal
print(promedio_redondeado) # Imprimirá 6.7
\`\`\`
`,
    exercises: [
      {
        id: 901, title: "Ejercicio 1: Concepto de if-else", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea una variable `edad = 15`.\n2. Escribe una estructura `if-else`. Si la `edad` es mayor o igual a `18`, imprime `'Acceso'`. Si no (`else`), imprime `'Denegado'`.",
        initialCode: "edad = 15\n# Escribe tu condicional aquí\n\n", outputCheck: "Denegado",
        testCode: "assert 'edad' in locals(), \"Falta 'edad'\"\nassert edad == 15, \"'edad' debe ser 15\"",
        hint: "if edad >= 18:\n    print('Acceso')\nelse:\n    print('Denegado')"
      },
      {
        id: 902, title: "Ejercicio 2: Sintaxis e Indentación", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "El siguiente código tiene errores de sintaxis. El `else` no está alineado correctamente con el `if`, le faltan los dos puntos (`:`), y falta indentación. Arréglalo para que funcione.",
        initialCode: "llueve = True\n\nif llueve:\n    print('Lleva paraguas')\n  else\nprint('Usa gafas de sol')\n", outputCheck: "Lleva paraguas",
        testCode: "assert 'llueve' in locals()",
        hint: "Alinea el else al mismo nivel que el if, ponle ':' al final, y dale un espacio o tabulación al print de abajo."
      },
      {
        id: 903, title: "Ejercicio 3: Función round()", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Dada la variable `numero_largo = 8.123456`.\n2. Usa la función `round()` para redondear el número a **2 decimales** y guárdalo en la variable `numero_corto`.\n3. Imprime `numero_corto`.",
        initialCode: "numero_largo = 8.123456\n# Redondea y guarda en numero_corto\n\n", outputCheck: "8.12",
        testCode: "assert 'numero_corto' in locals(), \"Falta 'numero_corto'\"\nassert numero_corto == 8.12, \"El valor debe ser redondeado a 8.12\"",
        hint: "numero_corto = round(numero_largo, 2)"
      },
      {
        id: 904, title: "Ejercicio 4: Práctica Integradora", difficulty: "Reto", difficultyColor: "red",
        instructions: "1. Crea: `mate = 5`, `quimica = 6`, y `biologia = 6`.\n2. Calcula el promedio y usa `round()` para redondearlo a **1 decimal**, guardándolo en `promedio`.\n3. Usa `if-else`: Si el `promedio` es `>= 6.0`, imprime `'Aprobado'`. Si no, imprime `'Reprobado'`.",
        initialCode: "# Crea variables, calcula promedio redondeado a 1 decimal, y usa if-else\n\n", outputCheck: "Reprobado",
        testCode: "assert 'mate' in locals() and 'quimica' in locals() and 'biologia' in locals(), \"Faltan las notas\"\nassert 'promedio' in locals(), \"Falta calcular el 'promedio'\"\nassert promedio == 5.7, \"El promedio redondeado a 1 decimal debe ser 5.7\"",
        hint: "promedio = round((mate + quimica + biologia) / 3, 1)"
      },
    ],
  },
  {
    id: 10,
    title: "Condicionales Múltiples: elif",
    module: "Estructuras de Control",
    theory: `## 1. ¿Qué son las Sentencias Condicionales Múltiples?
Son estructuras que permiten evaluar una variable con **distintos resultados posibles**, ejecutando una serie de instrucciones específicas para cada caso. 

A diferencia de las simples (\`if\`) o compuestas (\`if-else\`), estas permiten elegir una ruta entre varias opciones basándose en el valor de una variable que actúa como selector.

> **Regla de oro:** En el momento en que una condición se cumple, se ejecutan sus instrucciones y la estructura condicional finaliza; **no se evalúan las condiciones restantes**.

## 2. La palabra reservada \`elif\`
\`elif\` es una abreviación de "else if" (sino si). Se utiliza para agregar condiciones adicionales entre el \`if\` inicial y el \`else\` final. Puedes agregar la cantidad de \`elif\` que consideres necesarios para tu programa.

## 3. Sintaxis y Diagrama de Flujo
**Estructura:** Comienza con un \`if\`, seguido de uno o varios \`elif\`, y opcionalmente termina con un \`else\` para manejar casos que no cumplan ninguna de las condiciones anteriores.

**Indentado:** Al igual que en las condicionales previas, cada bloque de instrucciones debajo de un \`if\` o \`elif\` debe estar tabulado.

\`\`\`python
if condicion_1:
    # Se ejecuta si condicion_1 es Verdadera
elif condicion_2:
    # Se ejecuta si condicion_1 fue Falsa y condicion_2 es Verdadera
elif condicion_3:
    # Se ejecuta si las anteriores fueron Falsas y condicion_3 es Verdadera
else:
    # Se ejecuta si NINGUNA de las anteriores fue verdadera
\`\`\`

## 4. Ejercicio Práctico: Convertidor de Números a Letras
Un excelente ejemplo del uso de \`elif\` es un convertidor numérico. Fíjate cómo usamos \`int()\` para asegurar que evaluamos números enteros y \`==\` para comparar:

\`\`\`python
num = 3

if num == 1:
    print("Uno")
elif num == 2:
    print("Dos")
elif num == 3:
    print("Tres")
else:
    print("Número no soportado")
\`\`\`
`,
    exercises: [
      {
        id: 1001, title: "Ejercicio 1: Concepto de Múltiples Caminos", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea una variable `semaforo = 'Amarillo'`.\n2. Evalúa: Si es `'Verde'` imprime `'Avanzar'`. `elif` es `'Amarillo'` imprime `'Precaución'`. `elif` es `'Rojo'` imprime `'Detenerse'`.\n*(Respeta mayúsculas y minúsculas)*",
        initialCode: "semaforo = 'Amarillo'\n# Escribe tu condicional múltiple aquí\n\n", outputCheck: "Precaución",
        testCode: "assert 'semaforo' in locals(), \"Falta 'semaforo'\"\nassert semaforo == 'Amarillo', \"'semaforo' debe ser 'Amarillo'\"",
        hint: "if semaforo == 'Verde': ... elif semaforo == 'Amarillo': ..."
      },
      {
        id: 1002, title: "Ejercicio 2: Uso del elif", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Crea `dia = 3`.\n2. Haz una estructura condicional:\n- Si `dia == 1`: imprime `'Lunes'`\n- `elif dia == 2`: imprime `'Martes'`\n- `elif dia == 3`: imprime `'Miércoles'`",
        initialCode: "dia = 3\n# Escribe tu código aquí\n\n", outputCheck: "Miércoles",
        testCode: "assert 'dia' in locals(), \"Falta 'dia'\"\nassert dia == 3, \"'dia' debe ser 3\"",
        hint: "Usa if dia == 1: ... elif dia == 2: ... elif dia == 3: ..."
      },
      {
        id: 1003, title: "Ejercicio 3: Sintaxis completa (if-elif-else)", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "El siguiente código evalúa opciones de un menú, pero le falta la palabra correcta para la segunda opción y el final. Cambia los `???` por `elif` o `else` según corresponda.",
        initialCode: "opcion = 4\n\nif opcion == 1:\n    print('Perfil')\n??? opcion == 2:\n    print('Configuración')\n???:\n    print('Opción inválida')\n", outputCheck: "Opción inválida",
        testCode: "assert 'opcion' in locals()",
        hint: "Reemplaza el primer ??? con elif y el segundo con else."
      },
      {
        id: 1004, title: "Ejercicio 4: Convertidor Práctico", difficulty: "Reto", difficultyColor: "red",
        instructions: "Vamos a replicar el convertidor. Crea `num = 5`. Crea un `if`, varios `elif` y un `else`. Para 1 imprime `'Uno'`, para 2 `'Dos'`, etc., hasta el 5 (`'Cinco'`). Si es otro número, imprime `'No soportado'`.",
        initialCode: "num = 5\n# Crea el convertidor del 1 al 5\n\n", outputCheck: "Cinco",
        testCode: "assert 'num' in locals()",
        hint: "if num == 1: print('Uno') ... elif num == 5: print('Cinco') else: print('No soportado')"
      },
    ],
  },
  {
    id: 11,
    title: "Condicionales Anidadas",
    module: "Estructuras de Control",
    theory: `## 1. ¿Qué es la Anidación?
La implementación de sentencias condicionales **anidadas** ocurre cuando colocas una estructura condicional (\`if\`, \`elif\`, \`else\`) **dentro de otra**. Esto permite que el programa tome decisiones mucho más complejas basadas en múltiples niveles de criterios.

> **Importancia de la Tabulación:** Cada nivel de anidación requiere un espacio de tabulación adicional. Esto es fundamental para que Python entienda a qué bloque pertenece cada instrucción.

## 2. El Método \`.lower()\`
Al solicitar texto al usuario, un problema común es que escriban en mayúsculas (ej. "DOS" o "Dos" en lugar de "dos"). Para hacer tu programa más robusto, puedes usar el método \`.lower()\`, que convierte cualquier cadena de texto a minúsculas antes de compararla.

**Ejemplo:**
\`\`\`python
palabra = "TRES"
palabra_minuscula = palabra.lower()
# Ahora palabra_minuscula vale "tres"
\`\`\`

## 3. Saltos de línea (\\n)
Para mejorar la legibilidad en la consola, puedes usar \`\\n\` dentro de una cadena de texto. Python interpretará esto como un "Enter" o salto de línea.

\`\`\`python
print("Línea 1\\nLínea 2")
\`\`\`

## 4. Ejercicio Práctico: El Menú Doble
Observa cómo un menú principal se divide en opciones, y dentro de cada opción hay un sub-menú evaluando otra cosa:

\`\`\`python
opcion = 1

# Nivel 1 (Menú Principal)
if opcion == 1:
    print("\\nElegiste convertir número a palabra\\n")
    numero = 2
    
    # Nivel 2 (Anidación)
    if numero == 1:
        print("Uno")
    elif numero == 2:
        print("Dos")
    else:
        print("No registrado")

elif opcion == 2:
    print("\\nElegiste otra cosa\\n")
\`\`\`
*(Nota: El bloque \`else\` final siempre es vital para realizar la **Validación de Datos** y avisar al usuario si escogió una opción inválida).*
`,
    exercises: [
      {
        id: 1101, title: "Ejercicio 1: Saltos de línea", difficulty: "Básico", difficultyColor: "green",
        instructions: "Crea un único `print()` que muestre la palabra `'Hola'`, seguida de un salto de línea (`\\n`), y luego la palabra `'Mundo'`. No uses espacios extra.",
        initialCode: "# Escribe tu print con salto de línea aquí\n\n", outputCheck: "Hola\nMundo",
        testCode: "pass",
        hint: "print('Hola\\nMundo')"
      },
      {
        id: 1102, title: "Ejercicio 2: Uso de .lower()", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Dada la variable `entrada = 'PyThOn'`.\n2. Conviértela a minúsculas usando `.lower()` y guárdala en la variable `salida`.\n3. Imprime `salida`.",
        initialCode: "entrada = 'PyThOn'\n# Convierte a minúsculas y guarda en 'salida'\n\n", outputCheck: "python",
        testCode: "assert 'salida' in locals(), \"Falta 'salida'\"\nassert salida == 'python', \"Debe ser 'python' en minúsculas\"",
        hint: "salida = entrada.lower()"
      },
      {
        id: 1103, title: "Ejercicio 3: Anidación Simple", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Tienes `usuario = 'admin'` y `clave = 123`.\n2. Escribe un `if` que verifique si `usuario == 'admin'`.\n3. **DENTRO** de ese `if` (anidado), escribe otro `if` que verifique si `clave == 123` e imprima `'Acceso Total'`. *(Cuidado con la doble tabulación).*.",
        initialCode: "usuario = 'admin'\nclave = 123\n\n# Escribe tus ifs anidados aquí\n\n", outputCheck: "Acceso Total",
        testCode: "assert 'usuario' in locals() and 'clave' in locals()",
        hint: "if usuario == 'admin':\n    if clave == 123:\n        print('Acceso Total')"
      },
      {
        id: 1104, title: "Ejercicio 4: El Mini Conversor Doble", difficulty: "Reto", difficultyColor: "red",
        instructions: "Tienes `menu = 2` y `texto = 'UNO'`. Construye un `if` donde verifiques si `menu == 2`. Dentro de ese `if`, convierte `texto` a minúsculas y haz un `if` anidado: si el texto convertido es `'uno'`, imprime `'El número es 1'`.",
        initialCode: "menu = 2\ntexto = 'UNO'\n\n# Construye tu menú anidado y usa .lower()\n\n", outputCheck: "El número es 1",
        testCode: "assert 'menu' in locals()",
        hint: "if menu == 2:\n    texto = texto.lower()\n    if texto == 'uno':\n        print('El número es 1')"
      },
    ],
  },
  {
    id: 12,
    title: "Operadores Relacionales",
    module: "Estructuras de Control",
    theory: `## 1. ¿Qué son los Operadores Relacionales?

Los operadores relacionales (también conocidos como operadores de comparación) son símbolos fundamentales que nos permiten comparar dos valores. El resultado de cualquier comparación es siempre un valor booleano: **\`True\`** (Verdadero) o **\`False\`** (Falso).

Estos operadores son la base para tomar decisiones en el código, ya que definen las condiciones en las sentencias \`if\`, \`elif\` y \`else\`.

## 2. Los 6 Operadores Principales

| Símbolo | Nombre | Ejemplo | Significado / Pregunta | Resultado |
| :---: | :--- | :--- | :--- | :--- |
| **\`<\`** | Menor que | \`5 < 4\` | ¿Es 5 menor que 4? | \`False\` |
| **\`>\`** | Mayor que | \`7 > 5\` | ¿Es 7 mayor que 5? | \`True\` |
| **\`==\`** | Igual a | \`5 == 5\` | ¿Es 5 igual a 5? | \`True\` |
| **\`!=\`** | Diferente de | \`4 != 5\` | ¿Es 4 distinto de 5? | \`True\` |
| **\`<=\`** | Menor o igual a | \`6 <= 6\` | ¿Es 6 menor o exactamente igual a 6? | \`True\` |
| **\`>=\`** | Mayor o igual a | \`9 >= 5\` | ¿Es 9 mayor o exactamente igual a 5? | \`True\` |

> **⚠️ Nota muy importante:**
> - El operador de igualdad usa **doble signo igual (\`==\` )**. Un solo signo igual (\`=\`) se usa para *asignar* valores a variables.
> - El operador de desigualdad o diferencia se escribe con el signo de exclamación seguido del igual: **\`!= \`** (nunca al revés).

## 3. Captura de Datos Segura: \`int(input())\`

Cuando solicitamos datos numéricos a través de la consola mediante \`input()\`, la computadora los recibe inicialmente como texto (\`str\`). 

Para realizar comparaciones matemáticas, es indispensable convertir la entrada a un tipo numérico (entero o flotante) utilizando **\`int()\`** o **\`float()\`**:

\`\`\`python
# Conversión directa al recibir los datos
numero = int(input("Ingresa un número: "))
\`\`\`

## 4. Impresión Combinada Usando Comas

Para mostrar textos junto a variables numéricas de forma sencilla y sin causar errores de tipo (\`TypeError\`), el método más recomendado es separar los elementos por **comas** dentro de la función \`print()\`.

Python agregará automáticamente un espacio en blanco entre cada elemento y convertirá las variables a texto para mostrarlas:

\`\`\`python
edad = 18
print("Tengo", edad, "años.") # Imprimirá: Tengo 18 años.
\`\`\`
`,
    exercises: [
      {
        id: 1201, title: "Ejercicio 1: Comparaciones Básicas", difficulty: "Básico", difficultyColor: "green",
        instructions: "1. Crea una variable `num1 = 10` y `num2 = 20`.\n2. Crea `son_iguales` comparando si `num1` es igual a `num2`.\n3. Crea `son_diferentes` comparando si `num1` es diferente de `num2`.\n4. Imprime ambas variables separadas por una coma en un solo `print()`.",
        initialCode: "# Crea las variables y compáralas aquí\n\n", outputCheck: "False True",
        testCode: "assert 'num1' in locals() and 'num2' in locals(), \"Faltan las variables num1 y num2\"\nassert 'son_iguales' in locals() and 'son_diferentes' in locals(), \"Faltan las variables de comparación\"\nassert son_iguales == False, \"son_iguales debe ser False\"\nassert son_diferentes == True, \"son_diferentes debe ser True\"",
        hint: "Usa == para comparar igualdad y != para diferencia: son_iguales = (num1 == num2)."
      },
      {
        id: 1202, title: "Ejercicio 2: Captura con int(input())", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "1. Simula la captura de dos números: lee una entrada con `int(input())` y guárdala en `numero1`, y otra entrada en `numero2`.\n2. Imprime el mensaje: `Los números son:` seguido de `numero1` y `numero2` separados por la palabra `'y'`, usando comas en tu `print()`.\n\n*(Ejemplo de salida esperada si ingresas 5 y 10: 'Los números son: 5 y 10')*",
        initialCode: "# Pide los números enteros e imprímelos con comas\n\n", outputCheck: null,
        testCode: "assert 'numero1' in locals() and 'numero2' in locals(), \"Falta definir 'numero1' y 'numero2'\"\nassert isinstance(numero1, int) and isinstance(numero2, int), \"Debes usar int(input()) para convertirlos a enteros\"",
        hint: "Usa numero1 = int(input()) y luego print('Los números son:', numero1, 'y', numero2)."
      },
      {
        id: 1203, title: "Ejercicio 3: Las 6 Comparaciones Relacionales", difficulty: "Reto", difficultyColor: "red",
        instructions: "Dadas las variables `num1 = 15` y `num2 = 10` (ya definidas):\nEscribe 6 bloques `if` simples e independientes (uno tras otro) que impriman el mensaje correspondiente si se cumple la condición:\n1. Si `num1 < num2`: imprime `'num1 es menor que num2'`\n2. Si `num1 > num2`: imprime `'num1 es mayor que num2'`\n3. Si `num1 == num2`: imprime `'num1 es igual a num2'`\n4. Si `num1 != num2`: imprime `'num1 es diferente de num2'`\n5. Si `num1 <= num2`: imprime `'num1 es menor o igual a num2'`\n6. Si `num1 >= num2`: imprime `'num1 es mayor o igual a num2'`",
        initialCode: "num1 = 15\nnum2 = 10\n\n# Escribe tus 6 bloques if independientes aquí\n\n", outputCheck: "num1 es mayor que num2\nnum1 es diferente de num2\nnum1 es mayor o igual a num2",
        testCode: "assert 'num1' in locals() and 'num2' in locals(), \"No debes borrar las variables num1 y num2\"",
        hint: "Escribe if independientes: \nif num1 < num2:\n    print('num1 es menor que num2')\n...\nNo uses elif ni else, solo sentencias if simple."
      },
      {
        id: 1204, title: "Ejercicio 4: La Desigualdad", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "Crea la variable `password = 'secreta'`. Usa una estructura `if` que compruebe si `password` es diferente de `'1234'` usando el operador `!=`. Si se cumple, imprime el texto `'Contraseña segura'`.",
        initialCode: "password = 'secreta'\n# Comprueba si password es distinto de '1234' e imprime\n\n", outputCheck: "Contraseña segura",
        testCode: "assert 'password' in locals()",
        hint: "if password != '1234':\n    print('Contraseña segura')"
      },
    ],
  },
  {
    id: 13,
    title: "Operadores Lógicos",
    module: "Estructuras de Control",
    theory: `## 1. Fundamentos de los Operadores Lógicos
Los operadores lógicos permiten combinar múltiples condiciones relacionales dentro de una sentencia \`if\`, creando expresiones más complejas.

### Operador \`and\` (Conjunción)
- **Regla:** Todas las condiciones deben ser verdaderas para que el resultado sea \`True\`.
- **Ejemplo:** Verificar que un número esté entre 2 y 5.
\`\`\`python
num = 3
if num > 2 and num < 5:
    print("Dentro del rango")
\`\`\`

### Operador \`or\` (Disyunción)
- **Regla:** Basta con que una de las condiciones sea verdadera.
- **Ejemplo:** Aceptar respuestas "sí" o "yes".
\`\`\`python
respuesta = input("¿Continuar? ")
if respuesta == "sí" or respuesta == "yes":
    print("Continuando")
\`\`\`

### Operador \`not\` (Negación)
- **Regla:** Invierte el valor lógico de la condición.
- **Ejemplo:** Comprobar que un número no sea 5.
\`\`\`python
num = 4
if not num == 5:
    print("No es cinco")
\`\`\`
`,
    exercises: [
      {
        id: 1301,
        title: "Ejercicio 1: Rango con and",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Usa `and` para comprobar que la variable `x` está entre 10 y 20 (exclusivo). Si la condición es verdadera, imprime `\"En rango\"`.",
        initialCode: "# Define x aquí\n\n# Escribe tu condición con and\n\n",
        outputCheck: "En rango",
        hint: "if x > 10 and x < 20: print('En rango')"
      },
      {
        id: 1302,
        title: "Ejercicio 2: Aceptar múltiples respuestas con or",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Solicita una respuesta del usuario y usa `or` para aceptar `\"sí\"` o `\"yes\"`. Si la respuesta es válida, imprime `\"Aceptado\"`.",
        initialCode: "# Simula la respuesta del usuario\nrespuesta = \"\"\n\n# Escribe tu condición con or\n\n",
        outputCheck: "Aceptado",
        hint: "if respuesta == 'sí' or respuesta == 'yes': print('Aceptado')"
      },
      {
        id: 1303,
        title: "Ejercicio 3: Operador not",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea una variable \`activo = False\`. Usa el operador \`not\` para verificar si \`activo\` no es verdadero. Si la condición se cumple, imprime \`\"Sistema apagado\"\`.",
        initialCode: "activo = False\n\n# Escribe la condición usando not aquí\n\n",
        outputCheck: "Sistema apagado",
        testCode: "assert 'activo' in locals(), \"No definiste la variable activo\"\nassert not activo, \"activo debe ser False\"",
        hint: "Usa: if not activo: print('Sistema apagado')"
      }
    ]
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
    id: 16,
    title: "El ciclo while",
    module: "Estructuras de Control",
    theory: `## El ciclo while en Python

Un ciclo (o bucle) nos permite ejecutar un bloque de código varias veces consecutivas mientras una condición lógica sea verdadera. Esto nos ayuda a evitar la duplicidad innecesaria de líneas de código en nuestros programas.

---

### 1. Sintaxis del while

La estructura básica en Python es la siguiente:

\`\`\`python
while condicion_logica:
    instruccion_1
    instruccion_2
\`\`\`

> **⚠️ Importante:** No olvides colocar los dos puntos (\`:\`) al final de la condición, y aplicar la **indentación** (los 4 espacios de sangría) en cada instrucción que pertenezca al bloque del ciclo.

---

### 2. Ejemplo Práctico: Contador simple

Una de las formas más comunes de usar un ciclo \`while\` es imprimir una secuencia numérica y detener la ejecución cuando la condición se vuelva falsa:

\`\`\`python
x = 1

while x < 3:
    print(x)
    x += 1  # Incrementamos la variable de control x
    
print("Fin.")
\`\`\`

#### Salida esperada en pantalla:
\`\`\`plaintext
1
2
Fin.
\`\`\`

---

### 3. Ejemplo Práctico: Repetición masiva

El verdadero potencial de los ciclos se nota al ejecutar tareas repetitivas a gran escala, como imprimir un nombre cientos o miles de veces sin tener que escribir mil líneas de código:

\`\`\`python
x = 0
while x < 1000:
    print("Carlos")
    x += 1
\`\`\`

---

### Conceptos Clave a recordar:

- **Condición lógica**: Es la expresión evaluada antes de cada vuelta. Si esta condición nunca se vuelve falsa, el ciclo se repetirá para siempre. Esto se conoce como un **bucle infinito** y es un error común que satura la memoria.
- **Variable de control**: Es la variable (como \`x\`) que se evalúa en la condición y que **debe ser modificada** obligatoriamente dentro del bloque del ciclo para asegurar que este termine en algún momento.`,
    exercises: [
      {
        id: 1601,
        title: "Ejercicio 1: Contador ascendente",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una variable \`contador = 1\`. Usa un ciclo \`while\` para imprimir el valor de \`contador\` e incrementarlo en 1 en cada iteración mientras sea menor o igual a 5 (es decir, \`contador <= 5\`).",
        initialCode: "contador = 1\n\n# Escribe el ciclo while aquí\n\n",
        outputCheck: "1\n2\n3\n4\n5",
        hint: "Usa: while contador <= 5:\n    print(contador)\n    contador += 1"
      },
      {
        id: 1602,
        title: "Ejercicio 2: Evitando el bucle infinito",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Corrige el ciclo \`while\` para que imprima \`\"Python\"\` exactamente 3 veces en lugar de ejecutarse infinitamente. Usa la variable de control \`i\` y el operador \`+=\` para incrementarla.",
        initialCode: "i = 0\nwhile i < 3:\n    print(\"Python\")\n    # Agrega la línea para incrementar i aquí\n    \n",
        outputCheck: "Python\nPython\nPython",
        hint: "Agrega i += 1 de forma indentada dentro del cuerpo del while."
      },
      {
        id: 1603,
        title: "Ejercicio 3: Contador regresivo (despegue)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea una variable \`cuenta = 3\`. Usa un ciclo \`while\` para imprimir el valor de \`cuenta\` y restarle 1 en cada iteración mientras sea mayor que 0. Al salir del ciclo, imprime \`\"¡Despegue!\"\`.",
        initialCode: "cuenta = 3\n\n# Escribe tu ciclo while regresivo aquí\n\n",
        outputCheck: "3\n2\n1\n¡Despegue!",
        hint: "Usa:\nwhile cuenta > 0:\n    print(cuenta)\n    cuenta -= 1\nprint('¡Despegue!')"
      }
    ]
  },
  {
    id: 17,
    title: "Sentencias break y continue",
    module: "Estructuras de Control",
    theory: `## Sentencias break y continue en Python

En ocasiones, necesitamos alterar el comportamiento normal de un ciclo (como un ciclo \`while\`) antes de que la condición principal se vuelva falsa. Para esto, Python nos provee de dos palabras clave fundamentales: **\`break\`** y **\`continue\`**.

Ambas se utilizan para controlar el flujo de las iteraciones (las vueltas del ciclo), pero funcionan de maneras completamente opuestas.

---

### 1. La Sentencia \`break\`

Sirve para **romper el ciclo de golpe**. En el momento preciso en que Python lee la instrucción \`break\`, el bucle se detiene por completo e inmediatamente el programa salta a ejecutar la primera línea de código que se encuentre fuera del ciclo.

#### Ejemplo Práctico:
\`\`\`python
print("While con la sentencia break\\n")
contador = 0

while contador < 10:
    contador += 1
    
    if contador == 5:
        break  # Detiene el ciclo por completo aquí
        
    print("Valor actual de la variable:", contador)

print("Fin del programa, la sentencia break se ha ejecutado.")
\`\`\`

---

### 2. La Sentencia \`continue\`

A diferencia de break, **\`continue\`** no detiene todo el ciclo. Su función es **saltarse el resto del código en la vuelta actual**. Cuando Python encuentra un \`continue\`, ignora cualquier instrucción que esté debajo de él (dentro del ciclo) y regresa de inmediato al inicio para volver a evaluar la condición y arrancar la siguiente vuelta.

#### Ejemplo Práctico:
\`\`\`python
print("\\nWhile con la sentencia continue\\n")
contador = 0

while contador < 10:
    contador += 1
    
    if contador == 5:
        continue  # Se salta el print de abajo solo en esta vuelta
        
    print("Valor actual de la variable:", contador)

print("Fin del programa, la sentencia continue se ha ejecutado.")
\`\`\`

---

### Tabla Comparativa

| Sentencia | ¿Qué hace con la vuelta actual? | ¿Qué hace con el resto del ciclo? |
| :--- | :--- | :--- |
| **\`break\`** | La interrumpe de inmediato. | Cancela el ciclo por completo y sale de él. |
| **\`continue\`** | La interrumpe de inmediato. | Salta directamente a la siguiente vuelta del ciclo. |`,
    exercises: [
      {
        id: 1701,
        title: "Ejercicio 1: Detener un ciclo con break",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Escribe un programa con una variable \`num = 1\`. Usa un ciclo \`while True\` (un ciclo infinito) que imprima el valor de \`num\` e incremente \`num\` en 1 en cada iteración. Agrega un condicional \`if num == 4:\` que ejecute la sentencia \`break\` para detener el bucle.",
        initialCode: "num = 1\n\n# Escribe el ciclo while True con break aquí\n\n",
        outputCheck: "1\n2\n3",
        hint: "Escribe: while True:\n    print(num)\n    num += 1\n    if num == 4:\n        break"
      },
      {
        id: 1702,
        title: "Ejercicio 2: Saltar iteraciones con continue",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Escribe un programa con una variable \`i = 0\`. Usa un ciclo \`while i < 5\` que incremente \`i\` en 1 en la primera línea dentro del ciclo. Luego, agrega un condicional \`if i == 3:\` que ejecute la sentencia \`continue\`. Finalmente, imprime el valor de \`i\`. Esto deberá mostrar en pantalla los números del 1 al 5 exceptuando el 3.",
        initialCode: "i = 0\n\n# Escribe tu ciclo while con continue aquí\n\n",
        outputCheck: "1\n2\n4\n5",
        hint: "Usa: while i < 5:\n    i += 1\n    if i == 3:\n        continue\n    print(i)"
      },
      {
        id: 1703,
        title: "Ejercicio 3: Bucle con buscador y break",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Escribe un programa con una variable \`num = 1\`. Usa un ciclo \`while True\` que sume 1 a \`num\` en cada vuelta. Si \`num\` es divisible exactamente entre 7 (es decir, \`num % 7 == 0\`), imprime el valor de \`num\` y rompe el ciclo inmediatamente con \`break\`.",
        initialCode: "num = 1\n\n# Escribe el buscador con while True y break aquí\n\n",
        outputCheck: "7",
        hint: "Usa:\nwhile True:\n    num += 1\n    if num % 7 == 0:\n        print(num)\n        break"
      },
      {
        id: 1704,
        title: "Ejercicio 4: Combinando break y continue",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea una variable `x = 0`. Usa un ciclo `while x < 10:` que incremente `x += 1` en cada vuelta. Usa `continue` si `x == 2` para saltarlo. Usa `break` si `x == 5` para detener el ciclo completamente. Por último, en cada vuelta (si no se aplicó break/continue) imprime el valor de `x`. (El resultado deberá imprimir solo el 1, 3 y 4).",
        initialCode: "x = 0\n\n# Combina continue y break e imprime x\n\n",
        outputCheck: "1\n3\n4",
        hint: "while x < 10:\n    x += 1\n    if x == 2:\n        continue\n    if x == 5:\n        break\n    print(x)"
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
  {
    id: 31,
    title: "El ciclo for",
    module: "Conceptos Básicos",
    theory: `El tema central es la introducción, uso e implementación del ciclo o bucle \`for\`.

El ciclo \`for\` es una estructura de control que permite **repetir un bloque de instrucciones (sentencias) una cantidad determinada de veces**.

## 1. La Sintaxis del Ciclo for
Para escribir correctamente un ciclo \`for\` en Python, se deben seguir estos pasos obligatorios:

\`\`\`python
for variable in objeto_iterable:
    # Bloque de código a repetir
\`\`\`

- **\`for\`**: Palabra reservada, escrita completamente en minúsculas.
- **Variable**: Una variable con el nombre que tú elijas. Se encarga de almacenar de forma temporal el elemento actual del recorrido en cada repetición.
- **\`in\`**: Otra palabra reservada que le indica al ciclo que trabajará dentro del objeto.
- **Objeto Iterable**: Es el elemento que se va a recorrer.
- **Dos puntos (\`:\`)**: Indican el final de la declaración del ciclo.

## 2. ¿Qué es un Objeto Iterable?
Un objeto iterable es aquel que permite recorrer sus elementos uno a uno con la ayuda de un índice. El ejemplo más claro y sencillo es una cadena de caracteres (string), ya que está compuesta por una sucesión de letras y símbolos que se pueden segmentar y revisar de forma individual.

## 3. La Importancia de la Indentación
Las instrucciones que componen el cuerpo del ciclo (lo que se va a repetir) deben escribirse abajo de la declaración principal y llevar obligatoriamente una **indentación** (cuatro espacios a la derecha o una tabulación). Si una línea de código no está indentada, Python interpretará que está fuera del bucle y solo la ejecutará cuando el ciclo \`for\` haya terminado por completo.

## 4. Simulación del Comportamiento Interno
Veamos cómo funciona internamente con un programa básico:

\`\`\`python
string = "hola"
for caracter in string:
    print(caracter)
print("Fin del programa.")
\`\`\`

**Proceso de ejecución interna:**
1. El programa crea la variable temporal \`caracter\`.
2. El ciclo lee el objeto iterable (\`"hola"\`) y posiciona un índice interno en el primer elemento (la letra \`"h"\`).
3. Guarda la \`"h"\` en la variable \`caracter\` y ejecuta la instrucción indentada: \`print(caracter)\`, mostrando la \`h\` en la pantalla.
4. Terminada la primera iteración (repetición), el ciclo mueve de forma automática su índice una posición a la derecha. Como detecta que todavía hay letras, repite el proceso sustituyendo el valor por la \`"o"\`, luego por la \`"l"\` y finalmente por la \`"a"\`.
5. Cuando el índice intenta moverse nuevamente a la derecha y nota que ya no existen más caracteres, el ciclo \`for\` detecta que ha llegado al final de los elementos y termina su ejecución de manera segura.
6. El programa salta a la siguiente línea sin indentar (\`print("Fin del programa.")\`) y finaliza el script.`,
    exercises: [
      {
        id: 3101,
        title: "Ejercicio 1: Recorrido básico de un string",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una variable \`palabra = \"Python\"\`. Utiliza un ciclo \`for\` para iterar sobre la variable \`palabra\`, y en cada iteración usa \`print()\` para mostrar la letra actual. ¡No olvides la indentación!",
        initialCode: "palabra = \"Python\"\n\n# Escribe tu ciclo for aquí\n",
        outputCheck: "P\ny\nt\nh\no\nn",
        hint: "for letra in palabra:\n    print(letra)"
      },
      {
        id: 3102,
        title: "Ejercicio 2: Operaciones dentro del ciclo",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la variable \`mensaje = \"abc\"\`. Usa un ciclo \`for\` para recorrer el mensaje, y en cada iteración imprime la letra actual convertida a mayúsculas usando el método \`.upper()\`. El resultado deben ser tres letras mayúsculas en líneas separadas.",
        initialCode: "mensaje = \"abc\"\n\n# Recorre el mensaje y muestra cada letra en mayúscula\n",
        outputCheck: "A\nB\nC",
        hint: "for letra in mensaje:\n    print(letra.upper())"
      },
      {
        id: 3103,
        title: "Ejercicio 3: Comprendiendo la indentación",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la variable \`texto = \"12\"\`. Crea un ciclo \`for\` que imprima cada carácter. **Fuera del ciclo** (sin indentar), agrega un \`print(\"Terminado\")\`. El output debe ser: \`1\`, luego \`2\`, y por último \`Terminado\` (cada uno en su propia línea).",
        initialCode: "texto = \"12\"\n\n# Escribe el ciclo y luego el mensaje final sin indentación\n",
        outputCheck: "1\n2\nTerminado",
        testCode: "assert 'texto' in locals()",
        hint: "for numero in texto:\n    print(numero)\nprint(\"Terminado\")"
      }
    ]
  },
  {
    id: 32,
    title: "La clase range()",
    module: "Conceptos Básicos",
    theory: `El tema central es la explicación y el comportamiento de la clase \`range()\` en Python.

La clase \`range()\` se utiliza principalmente como un **objeto iterable dentro de los ciclos o bucles for** para realizar iteraciones. Su función es generar secuencias de números inmutables (que no se pueden modificar) a partir de un rango previamente establecido.

## 1. La Sintaxis y Argumentos de range()
La clase puede recibir desde un mínimo de un argumento hasta un máximo de tres argumentos de manera simultánea:

\`\`\`python
range(start, stop, step)
\`\`\`

- **start (Inicio):** Valor entero que indica el número a partir del cual se comenzará a generar la secuencia. **Este número siempre se incluye en el resultado**.
- **stop (Parada):** Valor entero que indica el límite donde se detendrá la secuencia. **Este número jamás se incluye en el resultado; el rango se detiene un número antes**.
- **step (Paso / Salto):** Valor entero que indica el incremento o decremento entre un número y el siguiente.

## 2. Comportamiento según el número de argumentos
### Caso A: Un solo argumento — \`range(stop)\`
Cuando solo pasas un número, Python asume automáticamente que este valor es el \`stop\`.
- **Regla por defecto:** La secuencia siempre comenzará de forma obligatoria en 0 y aumentará de uno en uno.
- **Ejemplo:** \`range(10)\` genera la secuencia del 0 al 9 (se detiene antes del 10).

### Caso B: Dos argumentos — \`range(start, stop)\`
El primer valor se asigna al inicio y el segundo al límite final. El incremento se mantiene por defecto de uno en uno.
- **Ejemplo:** \`range(5, 11)\` comenzará en 5 y se incrementará sucesivamente hasta llegar al 10 (excluyendo el 11).

### Caso C: Tres argumentos — \`range(start, stop, step)\`
Te permite personalizar el tamaño del salto entre cada número.
- **Ejemplo de incremento:** \`range(0, 11, 2)\` genera una secuencia de dos en dos comenzando en 0 (0, 2, 4, 6, 8, 10). Al sumar otra unidad da 12, superando el límite de 11, por lo que la secuencia finaliza.

## 3. El caso especial de las secuencias en decremento (cuenta regresiva)
Hay una situación muy común que puede causar confusión:

- Si intentas hacer una cuenta regresiva usando dos argumentos como \`range(10, 0)\`, el programa no dará un error, pero **no generará ningún número**. Esto ocurre porque Python intenta sumar +1 al inicio (10 + 1 = 11), alejándose del objetivo (0) de forma infinita.
- **Solución:** Se debe agregar obligatoriamente el tercer argumento (\`step\`) con un número negativo.
- **Ejemplo:** \`range(10, 0, -1)\` funciona correctamente, restando de uno en uno para devolver los números del 10 al 1 (el 0 se excluye por ser el stop).

La combinación de estos tres componentes ofrece un control preciso sobre las repeticiones y la generación de secuencias numéricas.`,
    exercises: [
      {
        id: 3201,
        title: "Ejercicio 1: Rango con un argumento (stop)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Utiliza un ciclo \`for\` combinado con \`range()\` para imprimir los números del 0 al 4. Recuerda que solo necesitas pasar el valor de \`stop\`.",
        initialCode: "# Escribe un ciclo for con range() para imprimir del 0 al 4\n",
        outputCheck: "0\n1\n2\n3\n4",
        hint: "for i in range(5):\n    print(i)"
      },
      {
        id: 3202,
        title: "Ejercicio 2: Rango con inicio y fin",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Utiliza un ciclo \`for\` y la función \`range()\` con dos argumentos (\`start\` y \`stop\`) para imprimir los números del 15 al 18 (el 18 debe incluirse).",
        initialCode: "# Escribe un ciclo for para imprimir del 15 al 18\n",
        outputCheck: "15\n16\n17\n18",
        hint: "Usa range(15, 19)"
      },
      {
        id: 3203,
        title: "Ejercicio 3: Cuenta regresiva",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea un ciclo \`for\` con \`range()\` que genere una **cuenta regresiva** comenzando en 5 y terminando en 1 (el 1 debe imprimirse). Utiliza los 3 argumentos (\`start\`, \`stop\`, \`step\`).",
        initialCode: "# Usa range() para imprimir 5, 4, 3, 2, 1\n",
        outputCheck: "5\n4\n3\n2\n1",
        hint: "Usa range(5, 0, -1)"
      }
    ]
  },
  {
    id: 33,
    title: "El ciclo for con range()",
    module: "Conceptos Básicos",
    theory: `Aquí se explica de manera práctica cómo se utiliza y comporta el ciclo \`for\` en conjunto con la clase \`range()\`.

En esta lección se unen los conocimientos de las dos anteriores: el funcionamiento de un bucle para repetir instrucciones y la capacidad de la clase \`range()\` para generar secuencias numéricas inmutables.

## 1. Integración de la Sintaxis
En lugar de pasar una cadena de caracteres (string) como objeto iterable, ahora se coloca la clase \`range()\` directamente dentro de la estructura del \`for\` antes de los dos puntos (\`:\`):

\`\`\`python
for variable in range(start, stop, step):
    # instrucción a repetir
\`\`\`

Dado que \`range()\` produce una secuencia que se puede recorrer número a número, el ciclo \`for\` la interpreta perfectamente como un objeto iterable.

## 2. Simulación del Comportamiento Interno
Tomemos el siguiente script de ejemplo:

\`\`\`python
for indice in range(1, 5):
    print(indice)
print("Fin del programa")
\`\`\`

**Preparación:** Al detectar el \`for\`, el programa crea en memoria la variable llamada \`indice\` (inicialmente vacía).

**Generación del iterable:** La clase \`range(1, 5)\` entra en acción y genera internamente la secuencia numérica \`[1, 2, 3, 4]\`. El número inicial (1) se incluye, pero el valor de parada (5) se excluye.

**Iteraciones (Repeticiones):**
1. **Primera iteración:** El bucle toma el primer elemento (1), lo asigna a la variable \`indice\` y ejecuta \`print(indice)\`, mostrando el \`1\` en la consola.
2. **Segunda iteración:** El índice interno se mueve automáticamente a la derecha, toma el número 2 y lo imprime.
3. **Tercera y cuarta iteración:** Se repite exactamente el mismo proceso con los números 3 y 4.

**Finalización:** Tras imprimir el 4, el bucle intenta moverse a la derecha. Al detectar que ya no quedan más elementos, el ciclo \`for\` da por terminada su ejecución de forma segura.

**Salida del ciclo:** El flujo del programa ejecuta la última línea sin indentar: \`print("Fin del programa")\`.

## 3. Salida esperada en consola
\`\`
1
2
3
4
Fin del programa
\`\`\``,
    exercises: [
      {
        id: 3301,
        title: "Ejercicio 1: for + range() básico",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Usa un ciclo \`for\` con \`range()\` para imprimir los números del 1 al 5 (el 5 debe incluirse), cada uno en su propia línea.",
        initialCode: "# Usa for con range() para imprimir del 1 al 5\n",
        outputCheck: "1\n2\n3\n4\n5",
        hint: "for i in range(1, 6):\n    print(i)"
      },
      {
        id: 3302,
        title: "Ejercicio 2: for + range() con saltos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa un ciclo \`for\` con \`range()\` de 3 argumentos para imprimir los **números pares** del 0 al 10 (el 10 debe incluirse), cada uno en su propia línea.",
        initialCode: "# Usa for con range() y un step de 2 para imprimir los pares\n",
        outputCheck: "0\n2\n4\n6\n8\n10",
        hint: "for i in range(0, 11, 2):\n    print(i)"
      },
      {
        id: 3303,
        title: "Ejercicio 3: for + range() con mensaje final",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea un ciclo \`for\` con \`range()\` que imprima los números del 1 al 3. **Fuera del ciclo** (sin indentar), imprime el mensaje \`\"Lanzamiento!\"\`. El output debe ser \`1\`, \`2\`, \`3\` y finalmente \`Lanzamiento!\`, cada uno en su propia línea.",
        initialCode: "# for + range() y un mensaje final fuera del ciclo\n",
        outputCheck: "1\n2\n3\nLanzamiento!",
        hint: "for i in range(1, 4):\n    print(i)\nprint(\"Lanzamiento!\")"
      }
    ]
  },
  {
    id: 34,
    title: "Listas en Python",
    module: "Conceptos Básicos",
    theory: `Las estructuras de datos permiten organizar la información de manera eficiente. En Python, las **listas** se utilizan para almacenar colecciones de elementos ordenados. Su principal característica es que son **mutables**, lo que significa que su contenido se puede modificar después de haber sido creadas.

## 1. Clasificación de las Listas
Los elementos dentro de una lista pueden o no estar relacionados entre sí, dividiéndose en dos tipos:

- **Listas Homogéneas:** Todos los elementos pertenecen al mismo tipo de dato (por ejemplo: solo textos o solo números enteros).
- **Listas Heterogéneas:** Los elementos son de diferentes tipos de datos (por ejemplo: combina textos, enteros, flotantes y booleanos en una sola colección).

## 2. Sintaxis Básica de una Lista
La estructura para declarar una lista es muy similar a la de una variable ordinaria, pero se diferencia por el uso de **corchetes \`[]\`**:

\`\`\`python
nombre_de_lista = [elemento1, elemento2, ...]
\`\`\`

> Si ejecutas la sintaxis únicamente con los corchetes vacíos (\`lista = []\`), Python creará una **lista vacía** lista para recibir datos posteriormente. Cada elemento debe estar separado por una **coma** (\`,\`) y un espacio.

## 3. Demostración Práctica

**A. Lista vacía:**
\`\`\`python
lista_vacia = []
print(lista_vacia)  # Salida: []
\`\`\`

**B. Listas Homogéneas:**
\`\`\`python
# De strings
vocales = ["a", "e", "i", "o", "u"]
print(vocales)  # Salida: ['a', 'e', 'i', 'o', 'u']

# De enteros
numeros_enteros = [1, 2, 3, 4, 5]

# De flotantes
numeros_decimales = [1.5, 2.2, 3.3, 4.9, 5.1]

# De booleanos
valores_booleanos = [True, False, False, True]
\`\`\`

> **Nota:** Al imprimir strings, Python siempre los encierra entre comillas simples \`' '\`, sin importar si se declararon con comillas dobles \`""\`.

**C. Lista Heterogénea:**
\`\`\`python
# Expediente de un usuario
datos = ["Carlos", 20, 1.70, True]
print(datos)  # Salida: ['Carlos', 20, 1.7, True]
\`\`\`

## 4. Ventaja principal
Las listas permiten simplificar y ordenar el código, sustituyendo la necesidad de declarar múltiples variables independientes para un mismo conjunto de datos.`,
    exercises: [
      {
        id: 3401,
        title: "Ejercicio 1: Crear una lista homogénea",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una lista llamada \`colores\` que contenga los strings \`\"rojo\"\`, \`\"verde\"\` y \`\"azul\"\`. Luego imprime la lista completa.",
        initialCode: "# Crea la lista 'colores' e imprímela\n",
        outputCheck: "['rojo', 'verde', 'azul']",
        testCode: "assert 'colores' in locals()\nassert colores == ['rojo', 'verde', 'azul']",
        hint: "colores = [\"rojo\", \"verde\", \"azul\"]\nprint(colores)"
      },
      {
        id: 3402,
        title: "Ejercicio 2: Lista de números enteros",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Crea una lista llamada \`pares\` con los números enteros pares del 2 al 10 (incluidos ambos). Luego imprímela.",
        initialCode: "# Crea la lista 'pares' e imprímela\n",
        outputCheck: "[2, 4, 6, 8, 10]",
        testCode: "assert 'pares' in locals()\nassert pares == [2, 4, 6, 8, 10]",
        hint: "pares = [2, 4, 6, 8, 10]\nprint(pares)"
      },
      {
        id: 3403,
        title: "Ejercicio 3: Lista heterogénea",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea una lista heterogénea llamada \`perfil\` que contenga: el string \`\"Ana\"\`, el entero \`25\`, el flotante \`1.65\` y el booleano \`True\`. Luego imprímela.",
        initialCode: "# Crea la lista 'perfil' con 4 tipos de datos distintos\n",
        outputCheck: "['Ana', 25, 1.65, True]",
        testCode: "assert 'perfil' in locals()\nassert perfil == ['Ana', 25, 1.65, True]",
        hint: "perfil = [\"Ana\", 25, 1.65, True]\nprint(perfil)"
      }
    ]
  },
  {
    id: 35,
    title: "Acceso a elementos de una lista",
    module: "Conceptos Básicos",
    theory: `Se explica de manera detallada cómo acceder a los elementos de una lista en Python, comprendiendo la diferencia entre posiciones y elementos, el uso de índices negativos, la obtención de porciones (slicing) y el manejo de errores comunes.

## 1. Elementos vs. Posiciones (Índices)
Para trabajar con listas, es fundamental entender cómo se almacena la información en la memoria.

- **Elementos:** Es el conteo físico o humano de los objetos. En programación, se empieza a contar desde el **1**.
- **Posiciones (Índices):** Es la ubicación exacta que el sistema le asigna a cada celda. En informática, siempre se empieza a contar desde el **0**.

> **Regla de oro:** Si una lista tiene N elementos, su última posición disponible siempre será **N - 1**.

Para conocer cuántos elementos contiene una lista se utiliza la función integrada \`len()\`:
\`\`\`python
marcas = ["apple", "samsung", "xiaomi", "huawei"]
print(len(marcas))  # Salida: 4 → índices válidos: 0, 1, 2, 3
\`\`\`

## 2. Formas de Acceder a los Elementos
La sintaxis estándar es: \`lista[índice]\`

### A. Índices Positivos (De izquierda a derecha)
\`\`\`python
print(marcas[1])   # Salida: samsung
print(marcas[3])   # Salida: huawei
\`\`\`
> Al acceder a un **solo elemento**, se retorna el valor limpio, sin corchetes ni comillas.

### B. Índices Negativos (De derecha a izquierda)
Permiten recorrer la lista a la inversa, sin necesidad de calcular el tamaño de la lista.
\`\`\`python
print(marcas[-1])  # Salida: huawei  (último)
print(marcas[-2])  # Salida: xiaomi  (penúltimo)
print(marcas[-3])  # Salida: samsung (antepenúltimo)
\`\`\`

### C. Acceso Múltiple o Rangos (Slicing)
Se puede extraer una sublista estableciendo un rango \`[inicio:fin]\`:
\`\`\`python
print(marcas[1:3])  # ['samsung', 'xiaomi']
print(marcas[:2])   # ['apple', 'samsung']  (desde el inicio)
print(marcas[1:])   # ['samsung', 'xiaomi', 'huawei']  (hasta el final)
print(marcas[:])    # ['apple', 'samsung', 'xiaomi', 'huawei'] (copia completa)
\`\`\`

## 3. El Error Común: IndexError
Si intentas acceder a un índice que no existe, Python detiene el programa y lanza:

\`\`\`
IndexError: list index out of range
\`\`\`

**Ejemplo que genera el error:**
\`\`\`python
print(marcas[4])  # Error: el índice máximo válido es 3
\`\`\`

**Solución:** Corregir el índice para que se sitúe dentro de las posiciones válidas (0 a 3 en este caso).

## 4. Buenas Prácticas
Los nombres de las variables que almacenen listas deben declararse en **plural** (ej: \`marcas\` en lugar de \`marca\`). Esto ayuda a identificar visualmente que el contenedor resguarda una colección de múltiples elementos.`,
    exercises: [
      {
        id: 3501,
        title: "Ejercicio 1: Acceso por índice positivo",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista \`frutas = [\"manzana\", \"pera\", \"uva\", \"mango\"]\`. Imprime el **tercer elemento** (índice 2) accediendo a él directamente con su índice.",
        initialCode: "frutas = [\"manzana\", \"pera\", \"uva\", \"mango\"]\n\n# Imprime el tercer elemento usando su índice\n",
        outputCheck: "uva",
        hint: "Usa: print(frutas[2])"
      },
      {
        id: 3502,
        title: "Ejercicio 2: Índice negativo y len()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista \`paises = [\"México\", \"España\", \"Argentina\", \"Colombia\"]\`. En dos líneas separadas: primero imprime el **último elemento** usando índice negativo (-1), y luego imprime la longitud de la lista usando \`len()\`.",
        initialCode: "paises = [\"México\", \"España\", \"Argentina\", \"Colombia\"]\n\n# Imprime el último elemento con índice negativo\n# Imprime la longitud con len()\n",
        outputCheck: "Colombia\n4",
        hint: "print(paises[-1])\nprint(len(paises))"
      },
      {
        id: 3503,
        title: "Ejercicio 3: Slicing de una lista",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista \`numeros = [10, 20, 30, 40, 50]\`. Usando **slicing**, imprime una sublista que contenga únicamente \`[20, 30, 40]\` (los elementos en posiciones 1, 2 y 3).",
        initialCode: "numeros = [10, 20, 30, 40, 50]\n\n# Usa slicing para extraer [20, 30, 40]\n",
        outputCheck: "[20, 30, 40]",
        hint: "Usa: print(numeros[1:4])"
      }
    ]
  },
  {
    id: 36,
    title: "Modificación de Elementos de una Lista",
    module: "Conceptos Básicos",
    theory: `## 1. Sintaxis Básica de Modificación

Modificar un elemento dentro de una lista utiliza la misma lógica que acceder a él, combinada con el **operador de asignación (\`=\`)**:

$$\\text{nombre\\_lista}[\\text{índice}] = \\text{nuevo\\_valor}$$

\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

vocales[1] = 'x'   # Reemplaza 'e' por 'x'
print(vocales)     # ['a', 'x', 'i', 'o', 'u']
\`\`\`

Python busca internamente la posición indicada y **sustituye** el valor anterior por el nuevo.

---

## 2. Flexibilidad de Tipos de Datos

Python **no obliga** a mantener el mismo tipo de dato al modificar. Puedes convertir una lista homogénea en heterogénea:

\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

vocales[1] = 2     # Cambia un string por un entero
print(vocales)     # ['a', 2, 'i', 'o', 'u']
\`\`\`

---

## 3. Uso de Índices Negativos

También puedes modificar elementos usando **posiciones negativas** (contando desde el final):

\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

vocales[-1] = 'x'  # Modifica el último elemento
print(vocales)     # ['a', 'e', 'i', 'o', 'x']
\`\`\`

---

## 4. Modificación Múltiple con Slicing

Usando rangos \`[inicio:fin]\` puedes alterar **varios elementos en una sola línea**.

### Caso A – Mismo número de elementos que el rango (tamaño sin cambio)
\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

vocales[2:4] = ['x', 'y']   # Reemplaza índices 2 y 3
print(vocales)               # ['a', 'e', 'x', 'y', 'u']
\`\`\`

### Caso B – Más elementos que el rango (la lista **crece**)
\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

vocales[1:3] = ['x', 'y', 'z']  # Rango de 2, pero 3 valores nuevos
print(vocales)                   # ['a', 'x', 'y', 'z', 'o', 'u']
\`\`\`
Python expande la lista y desplaza los elementos restantes hacia la derecha.

### Caso C – Menos elementos que el rango (la lista **decrece**)
\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

vocales[0:3] = ['x', 'y']   # Rango de 3, solo 2 valores nuevos
print(vocales)               # ['x', 'y', 'o', 'u']
\`\`\`

> **⚠️ Precaución:** Este escenario elimina el elemento sobrante del rango. Ten cuidado para evitar pérdidas accidentales de información.

---

## 5. Mutación Absoluta con \`[:]\`

Si aplicas el rango vacío \`[:\]$ y asignas un único valor **sin corchetes**, Python destruye todos los elementos excepto el primero:

\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

vocales[:] = 'x'   # Rango total, valor sin corchetes
print(vocales)     # ['x']
\`\`\`

La lista queda reducida a un solo elemento. Si quisieras reemplazar toda la lista por nuevos valores, debes usar corchetes: \`vocales[:] = ['x', 'y']\`.`,
    exercises: [
      {
        id: 3601,
        title: "Ejercicio 1: Reasignación individual",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `colores = [\"rojo\", \"verde\", \"azul\"]`:\n1. Cambia el **primer elemento** (`colores[0]`) por `\"naranja\"`.\n2. Cambia el **último elemento** usando **índice negativo** (`colores[-1]`) por `\"morado\"`.\n3. Imprime la lista final.",
        initialCode: "colores = [\"rojo\", \"verde\", \"azul\"]\n\n# Modifica el primer y último elemento\n",
        outputCheck: "['naranja', 'verde', 'morado']",
        testCode: "assert 'colores' in locals(), \"Falta la variable 'colores'\"\nassert colores[0] == 'naranja', \"El primer elemento debe ser 'naranja'\"\nassert colores[-1] == 'morado', \"El último elemento debe ser 'morado'\"\nassert colores[1] == 'verde', \"El elemento del medio no debe cambiar\"",
        hint: "colores[0] = 'naranja'  y  colores[-1] = 'morado'"
      },
      {
        id: 3602,
        title: "Ejercicio 2: Slicing – Mismo tamaño",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `numeros = [1, 2, 3, 4, 5]`:\n1. Usa **slicing** para reemplazar los elementos en los índices **1 y 2** (el `2` y el `3`) por `20` y `30`.\n2. Imprime la lista resultante.\n\n*(El tamaño de la lista no debe cambiar)*",
        initialCode: "numeros = [1, 2, 3, 4, 5]\n\n# Usa slicing para reemplazar los índices 1 y 2\n",
        outputCheck: "[1, 20, 30, 4, 5]",
        testCode: "assert 'numeros' in locals(), \"Falta la variable 'numeros'\"\nassert numeros == [1, 20, 30, 4, 5], f\"La lista debe ser [1, 20, 30, 4, 5], obtuviste: {numeros}\"",
        hint: "numeros[1:3] = [20, 30]"
      },
      {
        id: 3603,
        title: "Ejercicio 3: Slicing con distinto tamaño",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista `letras = [\"a\", \"b\", \"c\", \"d\", \"e\"]`:\n1. Usa slicing para reemplazar `letras[0:2]` (los elementos `'a'` y `'b'`) con **tres valores nuevos**: `\"x\"`, `\"y\"` y `\"z\"`. La lista debe **crecer**.\n2. Imprime la lista resultante.\n\n*(Resultado esperado: `['x', 'y', 'z', 'c', 'd', 'e']`)*",
        initialCode: "letras = [\"a\", \"b\", \"c\", \"d\", \"e\"]\n\n# Usa slicing para expandir la lista\n",
        outputCheck: "['x', 'y', 'z', 'c', 'd', 'e']",
        testCode: "assert 'letras' in locals(), \"Falta la variable 'letras'\"\nassert letras == ['x', 'y', 'z', 'c', 'd', 'e'], f\"La lista debe ser ['x', 'y', 'z', 'c', 'd', 'e'], obtuviste: {letras}\"",
        hint: "letras[0:2] = ['x', 'y', 'z']  → el rango era de 2 pero asignas 3, la lista crece"
      }
    ]
  },
  {
    id: 37,
    title: "El Método append()",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es append()?

El método \`append()\` tiene como finalidad **agregar un elemento al final de una lista**, expandiendo dinámicamente su tamaño.

### Sintaxis

$$\\text{nombre\\_lista}.\\text{append}(\\text{elemento})$$

\`\`\`python
letras = ["a", "b", "c", "d"]

letras.append("e")
print(letras)  # ['a', 'b', 'c', 'd', 'e']
\`\`\`

> **Regla de oro:** \`append()\` **siempre** posiciona el nuevo elemento al **final** de la lista. Nunca al inicio ni en posiciones intermedias.

---

## 2. Comportamiento en Memoria

Cuando se crea una lista, Python reserva un espacio de memoria segmentado para cada elemento. Al llamar a \`append()\`:

1. Python detecta que se quiere **expandir** la lista existente.
2. **Añade una nueva segmentación** al final de la estructura en memoria.
3. Guarda el nuevo valor de forma **permanente** en ese último casillero.

---

## 3. Inserción Múltiple Secuencial

Para agregar varios elementos se invoca \`append()\` de forma **consecutiva**, línea por línea. Python respetará estrictamente el orden de ejecución:

\`\`\`python
letras = ["a", "b", "c", "d"]

letras.append("e")
letras.append("f")
letras.append("g")

print(letras)  # ['a', 'b', 'c', 'd', 'e', 'f', 'g']
\`\`\`

La memoria crece progresivamente: primero añade \`"e"\`, luego \`"f"\`, y finalmente \`"g"\`.

---

## 4. Inserción de Diferentes Tipos de Datos

\`append()\` acepta **cualquier tipo de dato**, lo que permite crear listas heterogéneas a partir de una lista homogénea:

\`\`\`python
letras = ["a", "b", "c"]

letras.append(5)      # Agrega un entero (int)
letras.append(2.3)    # Agrega un decimal (float)
letras.append(True)   # Agrega un booleano (bool)

print(letras)  # ['a', 'b', 'c', 5, 2.3, True]
\`\`\`

Python integra perfectamente los nuevos tipos al final de la colección, sin conflictos con los elementos previos.`,
    exercises: [
      {
        id: 3701,
        title: "Ejercicio 1: append() básico",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `animales = [\"perro\", \"gato\", \"pez\"]`:\n1. Usa `append()` para agregar `\"conejo\"` al final.\n2. Imprime la lista resultante.",
        initialCode: "animales = [\"perro\", \"gato\", \"pez\"]\n\n# Agrega 'conejo' con append()\n",
        outputCheck: "['perro', 'gato', 'pez', 'conejo']",
        testCode: "assert 'animales' in locals(), \"Falta la variable 'animales'\"\nassert animales[-1] == 'conejo', \"El último elemento debe ser 'conejo'\"\nassert len(animales) == 4, \"La lista debe tener 4 elementos\"",
        hint: "animales.append('conejo')"
      },
      {
        id: 3702,
        title: "Ejercicio 2: Inserción múltiple secuencial",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `numeros = [1, 2, 3]`:\n1. Usa `append()` **tres veces** para agregar secuencialmente los valores `4`, `5` y `6`.\n2. Imprime la lista resultante.\n\n*(La lista final debe ser `[1, 2, 3, 4, 5, 6]`)*",
        initialCode: "numeros = [1, 2, 3]\n\n# Agrega 4, 5 y 6 con append() en líneas separadas\n",
        outputCheck: "[1, 2, 3, 4, 5, 6]",
        testCode: "assert 'numeros' in locals(), \"Falta la variable 'numeros'\"\nassert numeros == [1, 2, 3, 4, 5, 6], f\"La lista debe ser [1, 2, 3, 4, 5, 6], obtuviste: {numeros}\"",
        hint: "numeros.append(4)\nnumeros.append(5)\nnumeros.append(6)"
      },
      {
        id: 3703,
        title: "Ejercicio 3: Lista heterogénea con append()",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista `datos = [\"Python\", \"es\", \"genial\"]`:\n1. Usa `append()` para agregar el entero `2026`.\n2. Usa `append()` para agregar el flotante `3.14`.\n3. Usa `append()` para agregar el booleano `True`.\n4. Imprime la lista resultante.\n\n*(Resultado esperado: `['Python', 'es', 'genial', 2026, 3.14, True]`)*",
        initialCode: "datos = [\"Python\", \"es\", \"genial\"]\n\n# Agrega un int, un float y un bool con append()\n",
        outputCheck: "['Python', 'es', 'genial', 2026, 3.14, True]",
        testCode: "assert 'datos' in locals(), \"Falta la variable 'datos'\"\nassert datos == ['Python', 'es', 'genial', 2026, 3.14, True], f\"La lista no es correcta, obtuviste: {datos}\"",
        hint: "datos.append(2026)\ndatos.append(3.14)\ndatos.append(True)"
      }
    ]
  },
  {
    id: 38,
    title: "El Método insert()",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es insert() y en qué se diferencia de append()?

El método \`insert()\` permite añadir un elemento en una **posición específica** de la lista, a diferencia de \`append()\` que siempre lo coloca al final.

### Sintaxis

$$\\text{nombre\\_lista}.\\text{insert}(\\text{posición}, \\text{elemento})$$

Requiere **dos argumentos obligatorios**:
- **Posición (índice):** Un valor **entero** (positivo o negativo) que indica la ubicación exacta donde se insertará el nuevo dato.
- **Elemento:** El valor que se desea agregar a la colección (string, entero, flotante, etc.).

\`\`\`python
letras = ["b", "d", "f"]

letras.insert(0, "a")   # Inserta 'a' en la posición 0
print(letras)            # ['a', 'b', 'd', 'f']
\`\`\`

---

## 2. Comportamiento en Memoria: El Desplazamiento

Cuando se inserta en un índice ya ocupado, Python **no sobrescribe** el elemento existente. En su lugar realiza tres pasos:

1. **Expansión:** Añade un casillero vacío al final de la lista.
2. **Desplazamiento a la derecha:** Todos los elementos desde la posición indicada en adelante se mueven un lugar hacia la derecha.
3. **Inyección:** El nuevo elemento ocupa el espacio liberado.

---

## 3. Casos Prácticos

Partiendo de la lista: \`letters = ["b", "d", "f", "g"]\`

### Caso A – Inserción al inicio (índice 0)
\`\`\`python
letters.insert(0, "a")
# Desplaza todos los elementos a la derecha
print(letters)  # ['a', 'b', 'd', 'f', 'g']
\`\`\`

### Caso B – Inserción en posición intermedia
\`\`\`python
letters.insert(2, "c")
# 'c' entra en índice 2, desplazando 'd', 'f', 'g'
print(letters)  # ['a', 'b', 'c', 'd', 'f', 'g']
\`\`\`

### Caso C – Índice mayor al tamaño de la lista
\`\`\`python
letters.insert(100, "z")
# El índice 100 supera el tamaño actual
# Python NO lanza error: simplemente lo agrega al final
print(letters)  # ['a', 'b', 'c', 'd', 'f', 'g', 'z']
\`\`\`

> **Dato clave:** Cuando el índice supera el tamaño de la lista, \`insert()\` se comporta exactamente igual que \`append()\`, sin arrojar ningún error.`,
    exercises: [
      {
        id: 3801,
        title: "Ejercicio 1: Inserción al inicio",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `numeros = [2, 3, 4, 5]`:\n1. Usa `insert()` para agregar el número `1` en la **posición 0** (al inicio de la lista).\n2. Imprime la lista resultante.",
        initialCode: "numeros = [2, 3, 4, 5]\n\n# Inserta 1 al inicio con insert()\n",
        outputCheck: "[1, 2, 3, 4, 5]",
        testCode: "assert 'numeros' in locals(), \"Falta la variable 'numeros'\"\nassert numeros == [1, 2, 3, 4, 5], f\"La lista debe ser [1, 2, 3, 4, 5], obtuviste: {numeros}\"",
        hint: "numeros.insert(0, 1)"
      },
      {
        id: 3802,
        title: "Ejercicio 2: Inserción en posición intermedia",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `letras = [\"a\", \"b\", \"d\", \"e\"]`:\n1. Usa `insert()` para agregar la letra `\"c\"` en el **índice 2** (entre `\"b\"` y `\"d\"`).\n2. Imprime la lista resultante.\n\n*(Resultado esperado: `['a', 'b', 'c', 'd', 'e']`)*",
        initialCode: "letras = [\"a\", \"b\", \"d\", \"e\"]\n\n# Inserta 'c' en el índice 2\n",
        outputCheck: "['a', 'b', 'c', 'd', 'e']",
        testCode: "assert 'letras' in locals(), \"Falta la variable 'letras'\"\nassert letras == ['a', 'b', 'c', 'd', 'e'], f\"La lista debe ser ['a', 'b', 'c', 'd', 'e'], obtuviste: {letras}\"",
        hint: "letras.insert(2, 'c')"
      },
      {
        id: 3803,
        title: "Ejercicio 3: Índice fuera de rango",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista `planetas = [\"Mercurio\", \"Venus\", \"Tierra\"]`:\n1. Usa `insert()` con el índice `999` para agregar `\"Marte\"`. Observa que Python **no lanza error** y lo coloca al final.\n2. Luego usa `insert()` con el índice `1` para insertar `\"Fausto\"` entre `\"Mercurio\"` y `\"Venus\"`.\n3. Imprime la lista final.\n\n*(Resultado esperado: `['Mercurio', 'Fausto', 'Venus', 'Tierra', 'Marte']`)*",
        initialCode: "planetas = [\"Mercurio\", \"Venus\", \"Tierra\"]\n\n# Paso 1: insert con índice 999\n# Paso 2: insert 'Fausto' en índice 1\n",
        outputCheck: "['Mercurio', 'Fausto', 'Venus', 'Tierra', 'Marte']",
        testCode: "assert 'planetas' in locals(), \"Falta la variable 'planetas'\"\nassert planetas == ['Mercurio', 'Fausto', 'Venus', 'Tierra', 'Marte'], f\"La lista no es correcta, obtuviste: {planetas}\"",
        hint: "planetas.insert(999, 'Marte')\nplanetas.insert(1, 'Fausto')"
      }
    ]
  },
  {
    id: 39,
    title: "El Método pop()",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es pop()?

El método \`pop()\` se utiliza para **eliminar un elemento de una lista** y, a diferencia de otros métodos de eliminación, **retorna (devuelve) el elemento eliminado**, lo que permite almacenarlo o mostrarlo.

### Sintaxis

$$\\text{lista}.\\text{pop}([\\text{índice}])$$

Es flexible: funciona **con o sin argumento**:

- **Sin argumento** → elimina automáticamente el **último elemento**.
- **Con argumento** → elimina el elemento en la **posición exacta** indicada (entero positivo o negativo).

\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

eliminado = vocales.pop()   # Sin argumento: elimina el último
print(eliminado)             # u
print(vocales)               # ['a', 'e', 'i', 'o']
\`\`\`

---

## 2. Comportamiento en Memoria

Cuando se elimina un elemento en una posición intermedia, Python realiza tres pasos internos:

1. **Localiza** el índice indicado y remueve el elemento almacenado allí.
2. **Desplaza a la izquierda** todos los elementos que estaban a la derecha del índice eliminado.
3. **Reduce el tamaño** del espacio en memoria, eliminando la posición sobrante al final.

---

## 3. Casos Prácticos

Partiendo de: \`vocales = ["a", "e", "i", "o", "u"]\`

### Caso A – Sin argumento (elimina el último)
\`\`\`python
vocales.pop()
print(vocales)  # ['a', 'e', 'i', 'o']
\`\`\`

### Caso B – Con índice positivo
\`\`\`python
vocales.pop(2)   # Elimina el elemento en índice 2 → 'i'
print(vocales)   # ['a', 'e', 'o', 'u']
\`\`\`

### Caso C – Con índice negativo
\`\`\`python
vocales.pop(-2)  # -1 es 'u', -2 es 'o' → elimina 'o'
print(vocales)   # ['a', 'e', 'i', 'u']
\`\`\`

### Caso D – Índice fuera de rango → IndexError
\`\`\`python
vocales.pop(5)   # ¡Error! Solo existen índices del 0 al 4
\`\`\`
\`\`\`
IndexError: pop index out of range
\`\`\`

> **⚠️ Solución:** Ajusta el argumento a un índice válido dentro del rango real de la lista.`,
    exercises: [
      {
        id: 3901,
        title: "Ejercicio 1: pop() sin argumento",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `colores = [\"rojo\", \"verde\", \"azul\", \"amarillo\"]`:\n1. Usa `pop()` **sin argumento** para eliminar el último elemento.\n2. Guarda el valor eliminado en una variable llamada `eliminado`.\n3. Imprime `eliminado` y luego imprime la lista `colores`.",
        initialCode: "colores = [\"rojo\", \"verde\", \"azul\", \"amarillo\"]\n\n# Usa pop() sin argumento y guarda el resultado en 'eliminado'\n",
        outputCheck: "amarillo\n['rojo', 'verde', 'azul']",
        testCode: "assert 'eliminado' in locals(), \"Falta la variable 'eliminado'\"\nassert eliminado == 'amarillo', \"'eliminado' debe ser 'amarillo'\"\nassert colores == ['rojo', 'verde', 'azul'], f\"La lista debe ser ['rojo', 'verde', 'azul'], obtuviste: {colores}\"",
        hint: "eliminado = colores.pop()\nprint(eliminado)\nprint(colores)"
      },
      {
        id: 3902,
        title: "Ejercicio 2: pop() con índice positivo y negativo",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `letras = [\"a\", \"b\", \"c\", \"d\", \"e\"]`:\n1. Usa `pop(1)` para eliminar el elemento en el **índice 1** (`\"b\"`). Guárdalo en `primero`.\n2. Luego usa `pop(-1)` para eliminar el **último elemento** (`\"e\"`). Guárdalo en `segundo`.\n3. Imprime `primero`, `segundo` y la lista `letras` en líneas separadas.",
        initialCode: "letras = [\"a\", \"b\", \"c\", \"d\", \"e\"]\n\n# Paso 1: pop(1)\n# Paso 2: pop(-1)\n",
        outputCheck: "b\ne\n['a', 'c', 'd']",
        testCode: "assert 'primero' in locals() and 'segundo' in locals(), \"Faltan las variables 'primero' o 'segundo'\"\nassert primero == 'b', \"'primero' debe ser 'b'\"\nassert segundo == 'e', \"'segundo' debe ser 'e'\"\nassert letras == ['a', 'c', 'd'], f\"La lista debe ser ['a', 'c', 'd'], obtuviste: {letras}\"",
        hint: "primero = letras.pop(1)\nsegundo = letras.pop(-1)"
      },
      {
        id: 3903,
        title: "Ejercicio 3: Evitando el IndexError",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista `numeros = [10, 20, 30, 40, 50]` (índices válidos: 0 al 4):\n1. Usa `pop()` para eliminar el elemento en el **índice 4** (el `50`). Guárdalo en `a`.\n2. Usa `pop()` para eliminar el **penúltimo elemento** de la lista resultante usando **índice negativo** (`-2`). Guárdalo en `b`.\n3. Imprime `a`, `b` y la lista `numeros` en líneas separadas.\n\n*(Resultado esperado: `50`, `30`, `[10, 20, 40]`)*",
        initialCode: "numeros = [10, 20, 30, 40, 50]\n\n# Paso 1: pop índice 4\n# Paso 2: pop índice -2\n",
        outputCheck: "50\n30\n[10, 20, 40]",
        testCode: "assert 'a' in locals() and 'b' in locals(), \"Faltan las variables 'a' o 'b'\"\nassert a == 50, \"'a' debe ser 50\"\nassert b == 30, \"'b' debe ser 30\"\nassert numeros == [10, 20, 40], f\"La lista debe ser [10, 20, 40], obtuviste: {numeros}\"",
        hint: "a = numeros.pop(4)\nb = numeros.pop(-2)"
      }
    ]
  },
  {
    id: 40,
    title: "El Método remove()",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es remove() y en qué se diferencia de pop()?

El método \`remove()\` se utiliza para eliminar un elemento de una lista cuando **conoces el valor exacto** que deseas borrar, pero no sabes en qué posición (índice) se encuentra. A diferencia de \`pop()\`, \`remove()\` no necesita un índice, sino el valor mismo.

### Sintaxis

$$\\text{lista}.\\text{remove}(\\text{elemento})$$

**Argumento obligatorio:** Debe ser el valor exacto (string, entero, booleano, etc.) que se quiere eliminar. Si se llama sin argumentos, Python arroja un error.

\`\`\`python
vocales = ["a", "e", "i", "o", "u"]

vocales.remove("i")   # Elimina el valor "i"
print(vocales)        # ['a', 'e', 'o', 'u']
\`\`\`

---

## 2. Comportamiento en Memoria y Recorrido

Cuando ejecutas \`remove()\`, Python realiza lo siguiente internamente:

1. **Recorrido Secuencial:** Empieza desde el índice \`0\` y avanza posición por posición buscando una coincidencia exacta con el valor indicado.
2. **Eliminación y Desplazamiento:** Al encontrar el elemento, lo borra y mueve todos los elementos a su derecha un lugar hacia la izquierda.
3. **Reducción de Memoria:** El espacio vacío al final de la lista es eliminado automáticamente para compactar la estructura.

---

## 3. Casos Prácticos

### Caso A – Eliminación estándar de un elemento
\`\`\`python
vocales = ["a", "e", "i", "o", "u"]
vocales.remove("i")
print(vocales)  # ['a', 'e', 'o', 'u']
\`\`\`

### Caso B – Elementos duplicados o repetidos
Si el elemento aparece múltiples veces en la lista, \`remove()\` **solo elimina la primera coincidencia** que encuentra y luego se detiene.

\`\`\`python
vocales = ["a", "e", "i", "o", "i"]  # La "i" está duplicada
vocales.remove("i")
# Se elimina la primera "i", la segunda queda intacta
print(vocales)  # ['a', 'e', 'o', 'i']
\`\`\`
> *Nota:* Para borrar todas las repeticiones, se debe usar un ciclo (como \`for\` o \`while\`).

### Caso C – Error por Elemento Inexistente (ValueError)
Python es sensible a mayúsculas y minúsculas (case-sensitive). Si buscas un elemento que no existe, el programa se detiene y lanza un error.

\`\`\`python
vocales = ["a", "e", "i", "o", "u"]
vocales.remove("I")  # Buscamos "I" mayúscula
\`\`\`
\`\`\`
ValueError: list.remove(x): x not in list
\`\`\`

> **⚠️ Solución:** El mensaje indica que el valor no está en la lista. Debes verificar y corregir el argumento asegurándote de que el elemento exista.`,
    exercises: [
      {
        id: 4001,
        title: "Ejercicio 1: Eliminación estándar",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `animales = [\"perro\", \"gato\", \"loro\", \"pez\"]`:\n1. Usa el método `remove()` para eliminar el valor `\"loro\"`.\n2. Imprime la lista resultante.\n\n*(Resultado esperado: `['perro', 'gato', 'pez']`)*",
        initialCode: "animales = [\"perro\", \"gato\", \"loro\", \"pez\"]\n\n# Usa remove() para eliminar 'loro'\n",
        outputCheck: "['perro', 'gato', 'pez']",
        testCode: "assert 'animales' in locals(), \"Falta la variable 'animales'\"\nassert animales == ['perro', 'gato', 'pez'], f\"La lista debe ser ['perro', 'gato', 'pez'], obtuviste: {animales}\"",
        hint: "animales.remove(\"loro\")\nprint(animales)"
      },
      {
        id: 4002,
        title: "Ejercicio 2: Elementos duplicados",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `numeros = [10, 20, 30, 20, 40]` (donde el `20` está repetido):\n1. Usa `remove()` **una sola vez** pasándole el valor `20`.\n2. Imprime la lista resultante para comprobar que solo se eliminó la primera coincidencia.\n\n*(Resultado esperado: `[10, 30, 20, 40]`)*",
        initialCode: "numeros = [10, 20, 30, 20, 40]\n\n# Usa remove() con el valor 20\n",
        outputCheck: "[10, 30, 20, 40]",
        testCode: "assert 'numeros' in locals(), \"Falta la variable 'numeros'\"\nassert numeros == [10, 30, 20, 40], f\"La lista debe ser [10, 30, 20, 40], obtuviste: {numeros}\"",
        hint: "numeros.remove(20)\nprint(numeros)"
      },
      {
        id: 4003,
        title: "Ejercicio 3: Case-sensitive y valores numéricos",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista heterogénea `datos = [\"Python\", \"python\", 100, \"100\"]`:\n1. Usa `remove()` para eliminar `\"Python\"` (con mayúscula inicial).\n2. Usa `remove()` para eliminar el número entero `100` (sin comillas).\n3. Imprime la lista resultante.\n\n*(Resultado esperado: `['python', '100']`)*",
        initialCode: "datos = [\"Python\", \"python\", 100, \"100\"]\n\n# Elimina \"Python\" y 100 (entero)\n",
        outputCheck: "['python', '100']",
        testCode: "assert 'datos' in locals(), \"Falta la variable 'datos'\"\nassert datos == ['python', '100'], f\"La lista debe ser ['python', '100'], obtuviste: {datos}\"",
        hint: "datos.remove(\"Python\")\ndatos.remove(100)"
      }
    ]
  },
  {
    id: 41,
    title: "La Instrucción del",
    module: "Conceptos Básicos",
    theory: `## 1. Sintaxis de la Instrucción \`del\`

A diferencia de \`pop()\` o \`remove()\`, **\`del\` no es un método**, sino una palabra reservada del lenguaje (instrucción). No se invoca usando un punto (\`.\`), sino que se escribe directamente antes de la variable.

Dependiendo de los corchetes, \`del\` cumple tres funciones:

| Objetivo | Sintaxis | Explicación |
| :--- | :--- | :--- |
| **Eliminar un elemento** | \`del lista[índice]\` | Remueve el dato en la posición exacta (positivo o negativo). |
| **Eliminar un rango** | \`del lista[inicio:fin]\` | Borra de forma simultánea un grupo de elementos (slicing). |
| **Eliminar toda la lista** | \`del lista\` | Destruye por completo la estructura y la variable de la memoria. |

---

## 2. Comportamiento en Memoria y Casos Prácticos

Partiendo de la lista: \`vocales = ["a", "e", "i", "o", "u"]\`

### Caso A: Eliminar un único elemento
\`\`\`python
del vocales[3]  # Elimina la "o"
\`\`\`
Python localiza el índice, lo remueve y **desplaza a la izquierda** los elementos restantes para reajustar los índices.
Resultado: \`["a", "e", "i", "u"]\`

### Caso B: Eliminar un rango de elementos (Slicing)
\`\`\`python
del vocales[0:2]  # Elimina las posiciones 0 y 1 ("a" y "e")
\`\`\`
El índice de fin es exclusivo. Se borran los primeros dos elementos y el resto se recorre para cubrir el vacío.
Resultado: \`["i", "o", "u"]\`

### Caso C: Vaciar la lista conservando la estructura
\`\`\`python
del vocales[:]
\`\`\`
Al omitir inicio y fin, el rango abarca toda la lista. Elimina todos los datos, pero la estructura sigue existiendo como una lista vacía.
Resultado: \`[]\`

### Caso D: Eliminación completa (NameError)
\`\`\`python
del vocales
# Si intentas imprimir 'vocales' ahora:
print(vocales) 
\`\`\`
\`\`\`
NameError: name 'vocales' is not defined
\`\`\`
La lista es destruida y el espacio en memoria se libera. El intérprete lanza un error confirmando que la variable **ya no existe**.`,
    exercises: [
      {
        id: 4101,
        title: "Ejercicio 1: Eliminar un elemento",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `animales = [\"perro\", \"gato\", \"ratón\", \"pájaro\"]`:\n1. Usa la instrucción `del` para eliminar al `\"ratón\"` (que está en el **índice 2**).\n2. Imprime la lista resultante.\n\n*(Resultado esperado: `['perro', 'gato', 'pájaro']`)*",
        initialCode: "animales = [\"perro\", \"gato\", \"ratón\", \"pájaro\"]\n\n# Usa del para eliminar el índice 2\n",
        outputCheck: "['perro', 'gato', 'pájaro']",
        testCode: "assert 'animales' in locals(), \"Falta la variable 'animales'\"\nassert animales == ['perro', 'gato', 'pájaro'], f\"La lista debe ser ['perro', 'gato', 'pájaro'], obtuviste: {animales}\"",
        hint: "del animales[2]\nprint(animales)"
      },
      {
        id: 4102,
        title: "Ejercicio 2: Eliminar un rango (Slicing)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `numeros = [10, 20, 30, 40, 50]`:\n1. Usa `del` con sintaxis de rango para eliminar los **tres primeros elementos** (`10, 20, 30`). El rango debe ser `[0:3]`.\n2. Imprime la lista resultante.\n\n*(Resultado esperado: `[40, 50]`)*",
        initialCode: "numeros = [10, 20, 30, 40, 50]\n\n# Usa del con rango para eliminar los 3 primeros\n",
        outputCheck: "[40, 50]",
        testCode: "assert 'numeros' in locals(), \"Falta la variable 'numeros'\"\nassert numeros == [40, 50], f\"La lista debe ser [40, 50], obtuviste: {numeros}\"",
        hint: "del numeros[0:3]\nprint(numeros)"
      },
      {
        id: 4103,
        title: "Ejercicio 3: Vaciar la lista",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista `datos = [\"Python\", 3.10, True]`:\n1. Usa `del` con el rango vacío `[:]` para eliminar todos los elementos conservando la estructura de la lista.\n2. Imprime la lista resultante (debería verse como una lista vacía `[]`).",
        initialCode: "datos = [\"Python\", 3.10, True]\n\n# Vacía la lista con del [:]\n",
        outputCheck: "[]",
        testCode: "assert 'datos' in locals(), \"Falta la variable 'datos'\"\nassert datos == [], f\"La lista debe estar vacía [], obtuviste: {datos}\"",
        hint: "del datos[:]\nprint(datos)"
      }
    ]
  },
  {
    id: 42,
    title: "El Método sort()",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es el método sort()?

El método \`sort()\` se utiliza para **ordenar los elementos de una lista** en Python, ya sea en orden ascendente (por defecto) o descendente.

### Sintaxis

$$\\text{lista}.\\text{sort}([\\text{reverse=True/False}])$$

- **Sin argumentos (\`lista.sort()\`)**: Ordena de forma **ascendente** (de menor a mayor numéricamente, o en orden alfabético para strings).
- **Con argumento (\`lista.sort(reverse=True)\`)**: Ordena de forma **descendente** (de mayor a menor, o en orden alfabético inverso).

> **Nota importante:** A diferencia de otras operaciones, \`sort()\` modifica la lista **directamente en memoria (in-place)**. No crea una lista nueva ni genera una copia; reorganiza los elementos dentro de la lista original.

---

## 2. Ordenamiento Numérico

Partiendo de una lista desordenada: \`numeros = [5, 3, 1, 2, 4]\`

### Orden Ascendente
\`\`\`python
numeros.sort()
# Python intercambia las posiciones de menor a mayor
print(numeros)  # [1, 2, 3, 4, 5]
\`\`\`

### Orden Descendente
\`\`\`python
numeros.sort(reverse=True)
# Las posiciones se organizan con los valores más altos al inicio
print(numeros)  # [5, 4, 3, 2, 1]
\`\`\`

---

## 3. Ordenamiento de Cadenas de Texto (Strings)

El método también funciona perfectamente para ordenar alfabéticamente.
Partiendo de: \`vocales = ["o", "u", "a", "i", "e"]\`

### Orden Ascendente
\`\`\`python
vocales.sort()
# Sigue el orden del alfabeto tradicional
print(vocales)  # ['a', 'e', 'i', 'o', 'u']
\`\`\`

### Orden Descendente
\`\`\`python
vocales.sort(reverse=True)
# Invierte el criterio alfabético
print(vocales)  # ['u', 'o', 'i', 'e', 'a']
\`\`\`

> **Dato:** \`sort()\` funciona sobre listas cuyos elementos sean **del mismo tipo** (todos números o todos strings). Intentar ordenar una lista heterogénea (mezcla de números y strings) generará un error de tipo (\`TypeError\`).`,
    exercises: [
      {
        id: 4201,
        title: "Ejercicio 1: Orden Ascendente (Números)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `edades = [25, 18, 40, 15, 32]`:\n1. Usa el método `sort()` sin argumentos para ordenarla de menor a mayor.\n2. Imprime la lista resultante.\n\n*(Resultado esperado: `[15, 18, 25, 32, 40]`)*",
        initialCode: "edades = [25, 18, 40, 15, 32]\n\n# Ordena la lista de menor a mayor\n",
        outputCheck: "[15, 18, 25, 32, 40]",
        testCode: "assert 'edades' in locals(), \"Falta la variable 'edades'\"\nassert edades == [15, 18, 25, 32, 40], f\"La lista debe ser [15, 18, 25, 32, 40], obtuviste: {edades}\"",
        hint: "edades.sort()\nprint(edades)"
      },
      {
        id: 4202,
        title: "Ejercicio 2: Orden Descendente (Números)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `puntajes = [100, 50, 75, 200, 10]`:\n1. Usa el método `sort()` con el argumento `reverse=True` para ordenarla de **mayor a menor**.\n2. Imprime la lista resultante.\n\n*(Resultado esperado: `[200, 100, 75, 50, 10]`)*",
        initialCode: "puntajes = [100, 50, 75, 200, 10]\n\n# Ordena la lista de mayor a menor\n",
        outputCheck: "[200, 100, 75, 50, 10]",
        testCode: "assert 'puntajes' in locals(), \"Falta la variable 'puntajes'\"\nassert puntajes == [200, 100, 75, 50, 10], f\"La lista debe ser [200, 100, 75, 50, 10], obtuviste: {puntajes}\"",
        hint: "puntajes.sort(reverse=True)\nprint(puntajes)"
      },
      {
        id: 4203,
        title: "Ejercicio 3: Orden Descendente (Strings)",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista de palabras `nombres = [\"Carlos\", \"Ana\", \"Zoe\", \"Beatriz\"]`:\n1. Usa el método `sort(reverse=True)` para ordenarla en orden **alfabético inverso**.\n2. Imprime la lista resultante.\n\n*(Resultado esperado: `['Zoe', 'Carlos', 'Beatriz', 'Ana']`)*",
        initialCode: "nombres = [\"Carlos\", \"Ana\", \"Zoe\", \"Beatriz\"]\n\n# Ordena alfabéticamente a la inversa\n",
        outputCheck: "['Zoe', 'Carlos', 'Beatriz', 'Ana']",
        testCode: "assert 'nombres' in locals(), \"Falta la variable 'nombres'\"\nassert nombres == ['Zoe', 'Carlos', 'Beatriz', 'Ana'], f\"La lista debe ser ['Zoe', 'Carlos', 'Beatriz', 'Ana'], obtuviste: {nombres}\"",
        hint: "nombres.sort(reverse=True)\nprint(nombres)"
      }
    ]
  },
  {
    id: 43,
    title: "El Método index()",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es el método index()?

El método \`index()\` se utiliza para buscar un elemento específico dentro de una lista y **devuelve la posición (índice)** de la primera coincidencia que encuentra, leyendo de izquierda a derecha.

### Sintaxis y Flexibilidad

Su mayor ventaja es que puede recibir entre 1 y 3 argumentos:

$$\\text{lista}.\\text{index}(\\text{elemento}, [\\text{inicio}], [\\text{fin}])$$

- **Elemento (Obligatorio):** El valor exacto que deseas localizar.
- **Inicio (Opcional):** El índice a partir del cual comenzará la búsqueda.
- **Fin (Opcional):** El índice donde terminará la búsqueda (este límite es **exclusivo**, no se evalúa).

---

## 2. Casos Prácticos

Partiendo de la lista: \`vocales = ["a", "e", "i", "o", "u", "a"]\` (nota que la "a" está al principio y al final).

### Caso A: Búsqueda simple (1 argumento)
\`\`\`python
posicion = vocales.index("a")
# Encuentra la primera "a" (en el índice 0) y detiene la búsqueda
print(posicion)  # 0
\`\`\`

### Caso B: Búsqueda con inicio (2 argumentos)
\`\`\`python
# Busca "a", pero empezando a buscar desde el índice 2 ("i")
posicion = vocales.index("a", 2)
# Ignora la "a" del inicio, y encuentra la del final
print(posicion)  # 5
\`\`\`

### Caso C: Búsqueda en un rango estricto (3 argumentos)
\`\`\`python
# Busca "o" entre los índices 2 (inclusive) y 5 (exclusive)
posicion = vocales.index("o", 2, 5)
print(posicion)  # 3
\`\`\`

---

## 3. Manejo de Errores: ValueError

El método \`index()\` es estricto. Si no encuentra el elemento, el programa detiene su ejecución y lanza un error \`ValueError\`. Esto ocurre en dos escenarios:

1. **Elemento inexistente:** Buscas un valor que no está en la lista en absoluto.
2. **Elemento fuera del rango:** El valor existe en la lista, pero no dentro del rango \`[inicio:fin]\` que definiste.

\`\`\`python
# "u" existe en la lista, pero está en el índice 4.
# Si buscamos en el rango 1 a 3, no la encontrará:
vocales.index("u", 1, 3) 
\`\`\`
\`\`\`
ValueError: 'u' is not in list
\`\`\``,
    exercises: [
      {
        id: 4301,
        title: "Ejercicio 1: Búsqueda simple",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `colores = [\"rojo\", \"verde\", \"azul\", \"amarillo\"]`:\n1. Usa el método `index()` para encontrar la posición del color `\"azul\"`.\n2. Guarda el resultado en una variable llamada `posicion`.\n3. Imprime la variable `posicion`.\n\n*(Resultado esperado: `2`)*",
        initialCode: "colores = [\"rojo\", \"verde\", \"azul\", \"amarillo\"]\n\n# Busca el índice de 'azul' y guárdalo en 'posicion'\n",
        outputCheck: "2",
        testCode: "assert 'posicion' in locals(), \"Falta la variable 'posicion'\"\nassert posicion == 2, \"La posición de 'azul' debe ser 2\"",
        hint: "posicion = colores.index(\"azul\")\nprint(posicion)"
      },
      {
        id: 4302,
        title: "Ejercicio 2: Búsqueda con inicio",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `numeros = [10, 20, 30, 10, 40]` (el `10` está repetido):\n1. Usa `index()` para buscar el valor `10`, pero **iniciando la búsqueda desde el índice 2**.\n2. Guarda el resultado en `posicion`.\n3. Imprime `posicion`.\n\n*(Resultado esperado: `3`)*",
        initialCode: "numeros = [10, 20, 30, 10, 40]\n\n# Busca el valor 10 a partir del índice 2\n",
        outputCheck: "3",
        testCode: "assert 'posicion' in locals(), \"Falta la variable 'posicion'\"\nassert posicion == 3, \"La posición del segundo 10 debe ser 3\"",
        hint: "posicion = numeros.index(10, 2)\nprint(posicion)"
      },
      {
        id: 4303,
        title: "Ejercicio 3: Búsqueda con rango y validación",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista `letras = [\"a\", \"b\", \"c\", \"d\", \"e\", \"f\"]`:\n1. Usa `index()` para buscar la letra `\"d\"` en un rango que inicie en el índice `1` y termine en el índice `5`.\n2. Guarda el resultado en `posicion` e imprímelo.\n\n*(Resultado esperado: `3`)*",
        initialCode: "letras = [\"a\", \"b\", \"c\", \"d\", \"e\", \"f\"]\n\n# Busca 'd' entre los índices 1 y 5\n",
        outputCheck: "3",
        testCode: "assert 'posicion' in locals(), \"Falta la variable 'posicion'\"\nassert posicion == 3, \"La posición de 'd' debe ser 3\"",
        hint: "posicion = letras.index(\"d\", 1, 5)\nprint(posicion)"
      }
    ]
  },
  {
    id: 44,
    title: "El Método extend()",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es el método extend()?

El método \`extend()\` se utiliza para **añadir múltiples elementos** al final de una lista de forma individual. Modifica la estructura original directamente en memoria (in-place).

### Sintaxis

$$\\text{lista}.\\text{extend}(\\text{objeto\\_iterable})$$

- **Objeto iterable (Obligatorio):** Debe ser una secuencia de datos que Python pueda recorrer elemento por elemento. Si se deja vacío, arroja error.
- Los ejemplos más comunes de iterables son: **otra lista** o una secuencia generada con **\`range()\`**.

---

## 2. Casos Prácticos

### Caso A: Concatenar Dos Listas

Puedes unificar dos colecciones fácilmente. El método extrae cada elemento de la segunda lista y los añade uno a uno al final de la primera.

\`\`\`python
invitados = ["Carolina", "Juan", "Gerardo"]
amigos = ["Luis", "Ana"]

# Extiende la lista 'invitados' con los elementos de 'amigos'
invitados.extend(amigos)

print(invitados)
# ['Carolina', 'Juan', 'Gerardo', 'Luis', 'Ana']
\`\`\`
> **Nota:** La lista pasada como argumento (\`amigos\`) **no sufre ninguna modificación**.

### Caso B: Extender una Lista con \`range()\`

Puedes generar secuencias dinámicas para rellenar una lista. \`range(inicio, fin, salto)\` crea los números, y \`extend()\` los acopla en orden.

\`\`\`python
# Queremos completar los múltiplos de 10 hasta el 90
numeros = [10, 20]

# Agrega los números del 30 al 90 (100 es exclusivo), saltando de 10 en 10
numeros.extend(range(30, 100, 10))

print(numeros)
# [10, 20, 30, 40, 50, 60, 70, 80, 90]
\`\`\``,
    exercises: [
      {
        id: 4401,
        title: "Ejercicio 1: Concatenar dos listas",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dadas dos listas, `equipo1 = [\"Ana\", \"Luis\"]` y `equipo2 = [\"Marta\", \"Pedro\"]`:\n1. Usa el método `extend()` para añadir todos los elementos de `equipo2` al final de `equipo1`.\n2. Imprime `equipo1`.\n\n*(Resultado esperado: `['Ana', 'Luis', 'Marta', 'Pedro']`)*",
        initialCode: "equipo1 = [\"Ana\", \"Luis\"]\nequipo2 = [\"Marta\", \"Pedro\"]\n\n# Extiende equipo1 usando equipo2\n",
        outputCheck: "['Ana', 'Luis', 'Marta', 'Pedro']",
        testCode: "assert 'equipo1' in locals(), \"Falta la variable 'equipo1'\"\nassert equipo1 == ['Ana', 'Luis', 'Marta', 'Pedro'], f\"La lista debe ser ['Ana', 'Luis', 'Marta', 'Pedro'], obtuviste: {equipo1}\"",
        hint: "equipo1.extend(equipo2)\nprint(equipo1)"
      },
      {
        id: 4402,
        title: "Ejercicio 2: Extender con range()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la lista `impares = [1, 3]`:\n1. Usa el método `extend()` junto con la función `range()` para añadir los números impares `5, 7, 9`.\n2. Imprime la lista resultante.\n\n*(Pista: `range(5, 11, 2)` genera los números 5, 7 y 9)*",
        initialCode: "impares = [1, 3]\n\n# Usa extend() y range() para agregar 5, 7 y 9\n",
        outputCheck: "[1, 3, 5, 7, 9]",
        testCode: "assert 'impares' in locals(), \"Falta la variable 'impares'\"\nassert impares == [1, 3, 5, 7, 9], f\"La lista debe ser [1, 3, 5, 7, 9], obtuviste: {impares}\"",
        hint: "impares.extend(range(5, 11, 2))\nprint(impares)"
      },
      {
        id: 4403,
        title: "Ejercicio 3: Múltiples extensiones",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista `coleccion = [0]`:\n1. Usa `extend()` para añadir la lista `[1, 2, 3]`.\n2. Usa `extend()` de nuevo con `range(4, 7)` para añadir `4, 5, 6`.\n3. Imprime `coleccion`.\n\n*(Resultado esperado: `[0, 1, 2, 3, 4, 5, 6]`)*",
        initialCode: "coleccion = [0]\n\n# 1. Extiende con una lista\n# 2. Extiende con range(4, 7)\n",
        outputCheck: "[0, 1, 2, 3, 4, 5, 6]",
        testCode: "assert 'coleccion' in locals(), \"Falta la variable 'coleccion'\"\nassert coleccion == [0, 1, 2, 3, 4, 5, 6], f\"La lista debe ser [0, 1, 2, 3, 4, 5, 6], obtuviste: {coleccion}\"",
        hint: "coleccion.extend([1, 2, 3])\ncoleccion.extend(range(4, 7))"
      }
    ]
  },
  {
    id: 45,
    title: "El Constructor list()",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Por qué usar el Constructor list()?

En Python, el constructor \`list()\` permite convertir objetos **iterables** (como cadenas de texto o secuencias numéricas) en listas estándar. Esto es muy útil porque nos ahorra tener que extraer los datos uno por uno utilizando ciclos (\`for\`), haciendo el proceso rápido y eficiente.

### Sintaxis Básica

$$\\text{nueva\\_lista} = \\text{list}([\\text{objeto\\_iterable}])$$

- **Sin argumentos (\`list()\`):** Crea e inicializa una **lista vacía** (\`[]\`).
- **Con argumento:** Transforma los elementos del objeto iterable y los almacena individualmente en una lista.

---

## 2. Casos Prácticos

### Caso A: Convertir un objeto \`range\` a Lista

Si intentas imprimir \`range(0, 100, 10)\` directamente, Python solo muestra el texto literal de la instrucción. Para visualizar y manipular esos números, debes envolverlo con \`list()\`.

\`\`\`python
# Genera secuencia del 0 al 90 en saltos de 10
numeros = list(range(0, 100, 10))

print(numeros)
# [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
\`\`\`

### Caso B: Convertir un String a Lista

Las cadenas de texto son iterables. Si las pasas por \`list()\`, Python fragmenta la palabra carácter por carácter.

\`\`\`python
nombre = "Carlos"
lista_nombres = list(nombre)

print(lista_nombres)
# ['C', 'a', 'r', 'l', 'o', 's']
\`\`\`

### Extra: Inversión mediante Slicing (\`[::-1]\`)

Una vez que la palabra está en formato de lista (o incluso como string), puedes invertir el orden de sus elementos de manera muy sencilla usando **rebanadas con paso negativo**:

\`\`\`python
# Invierte la lista extrayendo de principio a fin, de atrás hacia adelante
print(lista_nombres[::-1])
# ['s', 'o', 'l', 'r', 'a', 'C']
\`\`\``,
    exercises: [
      {
        id: 4501,
        title: "Ejercicio 1: Rango a Lista",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "1. Usa el constructor `list()` junto con `range()` para crear una lista de números del **1 al 5** (recuerda que el límite superior del rango es exclusivo).\n2. Guarda el resultado en la variable `numeros` e imprímela.\n\n*(Resultado esperado: `[1, 2, 3, 4, 5]`)*",
        initialCode: "# Crea la lista usando list() y range()\nnumeros = \n",
        outputCheck: "[1, 2, 3, 4, 5]",
        testCode: "assert 'numeros' in locals(), \"Falta la variable 'numeros'\"\nassert numeros == [1, 2, 3, 4, 5], f\"La lista debe ser [1, 2, 3, 4, 5], obtuviste: {numeros}\"",
        hint: "numeros = list(range(1, 6))\nprint(numeros)"
      },
      {
        id: 4502,
        title: "Ejercicio 2: String a Lista",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la variable `palabra = \"Python\"`:\n1. Usa el constructor `list()` para convertirla en una lista de caracteres.\n2. Guarda el resultado en `letras` e imprímelo.\n\n*(Resultado esperado: `['P', 'y', 't', 'h', 'o', 'n']`)*",
        initialCode: "palabra = \"Python\"\n\n# Convierte 'palabra' en una lista\nletras = \n",
        outputCheck: "['P', 'y', 't', 'h', 'o', 'n']",
        testCode: "assert 'letras' in locals(), \"Falta la variable 'letras'\"\nassert letras == ['P', 'y', 't', 'h', 'o', 'n'], f\"La lista debe ser ['P', 'y', 't', 'h', 'o', 'n'], obtuviste: {letras}\"",
        hint: "letras = list(palabra)\nprint(letras)"
      },
      {
        id: 4503,
        title: "Ejercicio 3: Inversión de Lista",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la lista `caracteres = ['H', 'o', 'l', 'a']`:\n1. Utiliza la técnica de **slicing con paso negativo (`[::-1]`)** para invertir el orden de los elementos.\n2. Guarda la nueva lista invertida en la variable `invertida` e imprímela.\n\n*(Resultado esperado: `['a', 'l', 'o', 'H']`)*",
        initialCode: "caracteres = ['H', 'o', 'l', 'a']\n\n# Invierte la lista usando slicing [::-1]\ninvertida = \n",
        outputCheck: "['a', 'l', 'o', 'H']",
        testCode: "assert 'invertida' in locals(), \"Falta la variable 'invertida'\"\nassert invertida == ['a', 'l', 'o', 'H'], f\"La lista debe ser ['a', 'l', 'o', 'H'], obtuviste: {invertida}\"",
        hint: "invertida = caracteres[::-1]\nprint(invertida)"
      }
    ]
  },
  {
    id: 46,
    title: "Listas Anidadas",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué son las Listas Anidadas?

En Python, las listas pueden almacenar elementos de diversos tipos de datos. Debido a que las listas también son consideradas un tipo de dato, es perfectamente válido **almacenar una lista dentro de otra lista**, dando origen a una **lista anidada**.

### Estructura por Niveles

Para acceder de forma precisa a los componentes de estas colecciones, el proceso se debe analizar por niveles de profundidad. Cada nivel requiere su propio par de corchetes \`[]\`:

$$\\text{lista}[\\text{nivel 1}][\\text{nivel 2}][\\text{nivel 3}]\\dots$$

- **Nivel 1 (Lista General):** Regula la posición dentro de la lista contenedora principal.
- **Nivel 2 (Primera lista anidada):** Regula la posición interna dentro de la primera sublista.
- **Nivel 3 (Segunda lista anidada):** Regula el acceso si existe una sublista dentro de la sublista.

---

## 2. Análisis de Posiciones

Estudiemos una lista compleja con múltiples niveles:

\`\`\`python
lista = [1, "a", True, [1, 2, ["f", "g", "h"]]]
\`\`\`

### Extracción A: Acceder al primer elemento (Nivel 1)
\`\`\`python
print(lista[0])  # Imprime: 1
\`\`\`
Únicamente se necesita un par de corchetes porque el elemento pertenece a la lista principal.

### Extracción B: Acceder al "2" (Nivel 2)
\`\`\`python
print(lista[3][1])  # Imprime: 2
\`\`\`
1. El primer corchete \`[3]\` entra a la sublista \`[1, 2, ["f", "g", "h"]]\`.
2. El segundo corchete \`[1]\` accede al índice 1 interno de esa sublista (el número \`2\`).

### Extracción C: Acceder a la letra "g" (Nivel 3)
\`\`\`python
print(lista[3][2][1])  # Imprime: g
\`\`\`
1. \`[3]\` selecciona la primera sublista.
2. \`[2]\` selecciona la posición 2 interna, correspondiente a la lista de letras \`["f", "g", "h"]\`.
3. \`[1]\` selecciona la posición 1 dentro de esa lista de letras (la \`"g"\`).`,
    exercises: [
      {
        id: 4601,
        title: "Ejercicio 1: Extracción Básica (Nivel 2)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista anidada `datos = [10, 20, [30, 40, 50]]`:\n1. Accede al número **40** que se encuentra en la sublista.\n2. Guarda el valor en la variable `extraido` e imprímelo.\n\n*(Pista: La sublista está en el índice 2 de la lista principal, y el 40 está en el índice 1 de la sublista)*.",
        initialCode: "datos = [10, 20, [30, 40, 50]]\n\n# Extrae el 40 usando dos pares de corchetes\nextraido = \n",
        outputCheck: "40",
        testCode: "assert 'extraido' in locals(), \"Falta la variable 'extraido'\"\nassert extraido == 40, \"El valor extraído debe ser 40\"",
        hint: "extraido = datos[2][1]\nprint(extraido)"
      },
      {
        id: 4602,
        title: "Ejercicio 2: Extracción Profunda (Nivel 3)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la matriz `matriz = [[1, 2], [3, 4, [5, 6, 7]]]`:\n1. Accede al número **6** que se encuentra en el tercer nivel de profundidad.\n2. Guarda el valor en la variable `seis` e imprímelo.\n\n*(Resultado esperado: `6`)*",
        initialCode: "matriz = [[1, 2], [3, 4, [5, 6, 7]]]\n\n# Extrae el número 6 usando tres pares de corchetes\nseis = \n",
        outputCheck: "6",
        testCode: "assert 'seis' in locals(), \"Falta la variable 'seis'\"\nassert seis == 6, \"El valor extraído debe ser 6\"",
        hint: "seis = matriz[1][2][1]\nprint(seis)"
      },
      {
        id: 4603,
        title: "Ejercicio 3: Modificación en Lista Anidada",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Las listas anidadas también se pueden modificar. Dada la lista `info = [\"Ana\", [\"Edad\", 25]]`:\n1. Modifica el número **25** por **26** accediendo a él mediante sus índices y usando el operador de asignación (`=`).\n2. Imprime la lista completa resultante.\n\n*(Resultado esperado: `['Ana', ['Edad', 26]]`)*",
        initialCode: "info = [\"Ana\", [\"Edad\", 25]]\n\n# Modifica el 25 por 26 accediendo a sus índices\n",
        outputCheck: "['Ana', ['Edad', 26]]",
        testCode: "assert 'info' in locals(), \"Falta la variable 'info'\"\nassert info == ['Ana', ['Edad', 26]], f\"La lista debe ser ['Ana', ['Edad', 26]], obtuviste: {info}\"",
        hint: "info[1][1] = 26\nprint(info)"
      }
    ]
  },
  {
    id: 47,
    title: "Matrices (Listas Anidadas)",
    module: "Conceptos Básicos",
    theory: `## 1. ¿Qué es una Matriz?

Una matriz es una estructura de datos bidimensional que organiza los elementos en **filas** (horizontal) y **columnas** (vertical).

En Python no existe un objeto nativo llamado "matriz", por lo que se simulan utilizando **listas anidadas**: una lista principal donde cada sublista representa una fila completa.

> **Convención:** Siempre se nombra primero la cantidad de filas ($n$) y luego las columnas ($m$). Una matriz de $3 \\times 3$ tiene 3 filas y 3 columnas.

---

## 2. Sintaxis y Diseño de Código

Para declarar una matriz, el código puede escribirse en una sola línea, pero es visualmente confuso. El **estándar de diseño limpio** recomienda saltar de línea tras cada coma que separa a las sublistas:

\`\`\`python
matrix = [
    [1, 2, 3],  # Fila 0
    [4, 5, 6],  # Fila 1
    [7, 8, 9]   # Fila 2
]
\`\`\`
*(Se recomienda nombrar la variable \`matrix\` o similar para indicar su naturaleza bidimensional).*

---

## 3. Acceso a Elementos

Para extraer un valor específico, se utilizan **dos juegos de corchetes**. El primero apunta a la **fila** y el segundo a la **columna**:

$$\\text{matrix}[\\text{índice\\_fila}][\\text{índice\\_columna}]$$

*Recuerda que los índices siempre empiezan desde 0.*

**Ejemplo: Buscar el número 5**
1. **Fila:** El 5 está en la segunda fila $\\rightarrow$ índice \`1\`.
2. **Columna:** El 5 está en la columna central $\\rightarrow$ índice \`1\`.
3. **Extracción:** \`matrix[1][1]\`

---

## 4. Casos de Extracción

Utilizando la matriz de $3 \\times 3$ del ejemplo:
- Para el **1** (Fila 0, Columna 0): \`print(matrix[0][0])\`
- Para el **4** (Fila 1, Columna 0): \`print(matrix[1][0])\`
- Para el **8** (Fila 2, Columna 1): \`print(matrix[2][1])\`
- Para el **3** (Fila 0, Columna 2): \`print(matrix[0][2])\``,
    exercises: [
      {
        id: 4701,
        title: "Ejercicio 1: Extracción Básica",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la siguiente matriz de $2 \\times 3$:\n```python\nmatriz = [\n    [10, 20, 30],\n    [40, 50, 60]\n]\n```\n1. Extrae el número **60**.\n2. Guárdalo en la variable `valor` e imprímelo.",
        initialCode: "matriz = [\n    [10, 20, 30],\n    [40, 50, 60]\n]\n\n# Extrae el 60 (fila 1, columna 2)\nvalor = \n",
        outputCheck: "60",
        testCode: "assert 'valor' in locals(), \"Falta la variable 'valor'\"\nassert valor == 60, \"El valor extraído debe ser 60\"",
        hint: "valor = matriz[1][2]\nprint(valor)"
      },
      {
        id: 4702,
        title: "Ejercicio 2: Extracción Múltiple",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usando la misma matriz de $3 \\times 3$ de la teoría:\n```python\nmatrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n```\n1. Extrae el **4** y guárdalo en `a`.\n2. Extrae el **8** y guárdalo en `b`.\n3. Imprime `a` y luego `b`.",
        initialCode: "matrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Extrae el 4 y el 8\n",
        outputCheck: "4\n8",
        testCode: "assert 'a' in locals() and 'b' in locals(), \"Faltan las variables 'a' o 'b'\"\nassert a == 4, \"'a' debe ser 4\"\nassert b == 8, \"'b' debe ser 8\"",
        hint: "a = matrix[1][0]\nb = matrix[2][1]\nprint(a)\nprint(b)"
      },
      {
        id: 4703,
        title: "Ejercicio 3: Modificar una Matriz",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada una matriz de $2 \\times 2$:\n```python\ntablero = [\n    [\"X\", \"O\"],\n    [\"O\", \" \"]\n]\n```\n1. Modifica la celda vacía `\" \"` (en la fila 1, columna 1) y cámbiala por una `\"X\"` usando sus índices y el operador de asignación (`=`).\n2. Imprime el `tablero` completo.",
        initialCode: "tablero = [\n    [\"X\", \"O\"],\n    [\"O\", \" \"]\n]\n\n# Modifica el espacio vacío por una \"X\"\n",
        outputCheck: "[['X', 'O'], ['O', 'X']]",
        testCode: "assert 'tablero' in locals(), \"Falta la variable 'tablero'\"\nassert tablero[1][1] == 'X', \"La celda vacía debe ser ahora una 'X'\"",
        hint: "tablero[1][1] = \"X\"\nprint(tablero)"
      }
    ]
  },
  {
    id: 48,
    title: "Recorridos de Matrices con for",
    module: "Estructuras de Control",
    theory: `## Recorridos de matrices con el ciclo For

En esta clase se profundiza en la automatización del recorrido de estructuras bidimensionales utilizando el bucle **for**. A continuación, un resumen detallado de las tres metodologías:

### Alternativa 1: Impresión fila por fila
Esta opción es la más directa cuando deseas verificar la estructura general de la matriz sin desarmar sus componentes.
\`\`\`python
for row in matrix:
    print(row)
\`\`\`
*Cómo funciona*: En cada iteración, el bucle toma una sublista completa (una fila de la matriz) y la asigna a la variable temporal \`row\`. Al pasar esta variable al \`print()\`, Python muestra la lista con su formato nativo, incluyendo los corchetes.

**Resultado en consola**:
\`\`\`text
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
\`\`\`

---

### Alternativa 2: Desestructuración completa en formato de columna
Aquí se emplean ciclos anidados (un \`for\` dentro de otro \`for\`) para romper las sublistas y aislar cada número individualmente.
\`\`\`python
for row in matrix:        # Recorre las filas (Nivel 1)
    for element in row:   # Recorre las columnas (Nivel 2)
        print(element)
\`\`\`
*Cómo funciona*: El primer bucle se detiene en la primera fila (ej. \`[1, 2, 3]\`). Antes de permitir que el bucle principal avance a la siguiente fila, el bucle interno toma esa lista \`row\` como su objeto de iteración y extrae uno a uno sus elementos (1, luego 2, luego 3). Como cada instrucción \`print()\` genera un salto de línea por defecto, los números se posicionan de manera totalmente vertical.

**Resultado en consola**: Todos los números del 1 al 9 impresos de forma consecutiva hacia abajo.

---

### Alternativa 3: Formato tabular o matriz limpia
Esta combinación permite recrear la representación gráfica de la matriz original (filas y columnas) en la pantalla de la consola, pero deshaciéndose de la sintaxis de los corchetes.
\`\`\`python
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()
\`\`\`
*Cómo funciona*:
1. Se utiliza el parámetro \`end=" "\` en el \`print()\` interno. Esto le indica a Python que reemplace el salto de línea automático por un espacio en blanco, logrando que los elementos de una misma fila se impriman de manera horizontal, uno al lado del otro.
2. Una vez que el bucle secundario termina con todas las columnas de la fila actual, el programa ejecuta un \`print()\` vacío colocado fuera de su bloque. Esto reestablece el salto de línea obligatorio, haciendo que la siguiente fila procesada empiece a escribirse exactamente en la línea de abajo.

**Resultado en consola**:
\`\`\`text
1 2 3 
4 5 6 
7 8 9
\`\`\``,
    exercises: [
      {
        id: 4801,
        title: "Ejercicio 1: Impresión fila por fila",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la siguiente matriz:\n```python\nmatriz = [\n    [10, 20],\n    [30, 40]\n]\n```\nUtiliza un bucle `for` para iterar sobre la `matriz` imprimiendo cada fila tal cual está (con todo y corchetes).",
        initialCode: "matriz = [\n    [10, 20],\n    [30, 40]\n]\n\n# Imprime fila por fila\n",
        outputCheck: "[10, 20]\n[30, 40]",
        testCode: "assert 'matriz' in locals(), \"Falta la variable 'matriz'\"",
        hint: "Usa: for fila in matriz:\n    print(fila)"
      },
      {
        id: 4802,
        title: "Ejercicio 2: Desestructuración completa",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la misma matriz de 2x2, utiliza bucles `for` anidados (uno dentro de otro) para imprimir **cada número individualmente** en una línea nueva (formato de columna).",
        initialCode: "matriz = [\n    [10, 20],\n    [30, 40]\n]\n\n# Imprime cada elemento hacia abajo\n",
        outputCheck: "10\n20\n30\n40",
        testCode: "assert 'matriz' in locals(), \"Falta la variable 'matriz'\"",
        hint: "for fila in matriz:\n    for numero in fila:\n        print(numero)"
      },
      {
        id: 4803,
        title: "Ejercicio 3: Formato Tabular Limpio",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Recrea visualmente la matriz en consola sin corchetes usando bucles anidados. Recuerda usar `end=\" \"` en el `print` interno, y un `print()` vacío al final de cada fila para el salto de línea.\n*(El resultado esperado debe tener un espacio después de cada número en la fila).*.",
        initialCode: "matriz = [\n    [10, 20],\n    [30, 40]\n]\n\n# Imprime la matriz en formato tabular\n",
        outputCheck: "10 20 \n30 40 \n",
        testCode: "assert 'matriz' in locals(), \"Falta la variable 'matriz'\"",
        hint: "for fila in matriz:\n    for num in fila:\n        print(num, end=\" \")\n    print()"
      }
    ]
  },
  {
    id: 49,
    title: "Suma de Matrices",
    module: "Estructuras de Control",
    theory: `## 1. Fundamento Matemático de la Suma de Matrices
En matemáticas, la suma de matrices es una operación lineal que consiste en unificar y sumar los elementos de dos o más matrices que coincidan exactamente en su posición (mismo índice de fila y columna).

**Condición obligatoria:**
Para que la operación pueda efectuarse, las matrices deben tener **exactamente la misma dimensión** (la misma cantidad de filas y columnas). De lo contrario, la suma es matemáticamente imposible.

---

## 2. Lógica del Algoritmo en Python
Para automatizar este proceso sin importar el tamaño de la matriz (ya sean de $3 \\times 3$ o de $100 \\times 100$), se plantea una solución basada en ciclos anidados y cálculo dinámico de longitudes:

- **Obtener filas dinámicamente**: Se utiliza \`len(matrix_A)\` para determinar cuántas filas tiene la matriz y establecer el límite del ciclo externo.
- **Obtener columnas dinámicamente**: Se utiliza \`len(matrix_A[0])\` (calculando la longitud de la primera fila) para conocer la cantidad de columnas y delimitar el ciclo interno.
- **Construcción de la matriz resultante**: 
  - En cada iteración del ciclo externo (fila), se crea una lista vacía llamada \`new_row\`.
  - El ciclo interno (columna) realiza la suma posicional \`matrix_A[row][column] + matrix_B[row][column]\` y añade el resultado a \`new_row\` usando el método \`.append()\`.
  - Al terminar de procesar todas las columnas de una fila, la lista \`new_row\` se añade a la matriz final \`matrix_C\`.

---

## 3. Código Fuente Desarrollado
El siguiente bloque de código replica la solución completa explicada:

\`\`\`python
# Definición de las matrices iniciales (Dimensiones de 3x3)
matrix_A = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

matrix_B = [
    [1, 2, 3],
    [4, 1, 2],
    [1, 1, 0]
]

# Matriz vacía que guardará los resultados de la suma
matrix_C = []

# Ciclo externo para recorrer las filas
for row in range(len(matrix_A)):
    new_row = []  # Sublista temporal para cada fila resultante
    
    # Ciclo interno para recorrer las columnas
    for column in range(len(matrix_A[0])):
        # Suma posicional e inserción en la fila temporal
        new_row.append(matrix_A[row][column] + matrix_B[row][column])
        
    # Inserción de la fila completa en la matriz final
    matrix_C.append(new_row)

# --- Bloque de impresión estética en consola ---
for row in range(len(matrix_A)):
    if row != 1:
        # Imprime filas con espacios en blanco
        print(f"{matrix_A[row]}   {matrix_B[row]}   {matrix_C[row]}")
    else:
        # Añade los caracteres operacionales '+' e '=' en la fila central
        print(f"{matrix_A[row]} + {matrix_B[row]} = {matrix_C[row]}")
\`\`\`

---

## 4. Resultado en Consola
Al ejecutar el script, el programa no solo realiza el cálculo perfecto de forma automatizada, sino que muestra la operación con una estructura visual matemática muy limpia:

\`\`\`text
[1, 2, 3]   [1, 2, 3]   [2, 4, 6]
[4, 5, 6] + [4, 1, 2] = [8, 6, 8]
[7, 8, 9]   [1, 1, 0]   [8, 9, 9]
\`\`\`
*(Por ejemplo, se puede validar que en la esquina superior izquierda $1 + 1 = 2$, y en el centro exacto $5 + 1 = 6$).*`,
    exercises: [
      {
        id: 4901,
        title: "Ejercicio 1: Suma Manual de Vectores Fila",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dadas dos matrices de $1 \\times 2$ (una sola fila), crea la lista `fila_suma` sumando manualmente cada posición: `A[0][0] + B[0][0]` y `A[0][1] + B[0][1]`. Añade estos dos valores a `fila_suma` y luego agrégala a la matriz vacía `C`. Imprime `C`.\n\n*(Resultado esperado: `[[3, 7]]`)*",
        initialCode: "A = [[1, 2]]\nB = [[2, 5]]\nC = []\nfila_suma = []\n\n# Realiza la suma posicional e insértalo en C\n",
        outputCheck: "[[3, 7]]",
        testCode: "assert 'C' in locals(), \"Falta la matriz resultante 'C'\"\nassert C == [[3, 7]], \"La matriz 'C' no tiene el resultado correcto\"",
        hint: "fila_suma.append(A[0][0] + B[0][0])\nfila_suma.append(A[0][1] + B[0][1])\nC.append(fila_suma)\nprint(C)"
      },
      {
        id: 4902,
        title: "Ejercicio 2: Uso dinámico de len()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la matriz `M` de dimensiones variables. Utiliza `len()` para imprimir primero la **cantidad de filas**, y luego la **cantidad de columnas** (longitud de la primera fila).",
        initialCode: "M = [\n    [5, 8, 1],\n    [2, 0, 4]\n]\n\n# Imprime la cantidad de filas y luego las columnas\n",
        outputCheck: "2\n3",
        testCode: "pass",
        hint: "print(len(M))\nprint(len(M[0]))"
      },
      {
        id: 4903,
        title: "Ejercicio 3: Suma de Matrices 2x2",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Escribe el algoritmo completo para sumar dos matrices de $2 \\times 2$. Recórrelas usando bucles `for` y `range(len(...))` e imprime la matriz resultante `C`.\n*(Debe imprimirse la matriz entera, ej: `[[6, 6], [6, 6]]`)*.",
        initialCode: "A = [[1, 2], [3, 4]]\nB = [[5, 4], [3, 2]]\nC = []\n\n# Desarrolla el algoritmo de suma\n",
        outputCheck: "[[6, 6], [6, 6]]",
        testCode: "assert 'C' in locals(), \"Falta la variable 'C'\"\nassert C == [[6, 6], [6, 6]], \"El resultado de la suma es incorrecto\"",
        hint: "Usa for row in range(len(A)): \n    new_row = []\n    for col in range(len(A[0])): \n        new_row.append(A[row][col] + B[row][col])\n    C.append(new_row)\nprint(C)"
      }
    ]
  },
  {
    id: 495,
    title: "Tuplas",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es una Tupla y en qué se diferencia de una Lista?
Las tuplas son estructuras de datos que permiten almacenar conjuntos de elementos de manera organizada. Comparten muchas similitudes con las listas (como el manejo de índices empezando en 0), pero tienen una **regla de oro: son INMUTABLES**.

Una vez creada una tupla en memoria, su contenido no se puede modificar: no puedes añadir, eliminar ni sustituir elementos directamente.

**Sintaxis:** Se definen utilizando paréntesis \`()\`.

---

## 2. Tipos de Tuplas

1. **Tupla Vacía:** \`()\` (Quedará así permanentemente).
2. **Homogénea:** Mismo tipo de datos. Ej: \`(3, 2)\`.
3. **Heterogénea:** Distintos tipos. Ej: \`(1, True, "Hola", 3.5)\`.
4. **Anidada:** Puede contener listas, diccionarios u otras tuplas. Ej: \`([1, 2], {"clave": "valor"}, (3, 4))\`.

> **Nota sobre Inmutabilidad:** Si una tupla contiene una estructura mutable en su interior (como una lista), ¡sí puedes modificar los elementos internos de esa lista!

---

## 3. Peculiaridades de Declaración

### A. Tupla de un único elemento
Si intentas crear una tupla con un solo dato así: \`mi_tupla = (5)\`, Python lo interpretará como un operador matemático y guardará un número entero simple.
Para que Python reconozca que es una tupla de un elemento, **debes añadir una coma al final**:
\`\`\`python
tupla_un_elemento = (5,)
\`\`\`

### B. Empaquetado (Sin paréntesis)
Python permite declarar tuplas omitiendo los paréntesis, simplemente separando los datos con comas:
\`\`\`python
tupla_empaquetada = 1, 2, 3
# Python lo guarda internamente como (1, 2, 3)
\`\`\`
*(Aunque funciona, por buenas prácticas y legibilidad se recomienda usar siempre los paréntesis).*

---

## 4. Ejemplos Prácticos

\`\`\`python
# 1. Tupla vacía
tupla_vacia = ()

# 2. Homogénea vs Heterogénea
tupla_homogenea = (3, 2)
tupla_heterogenea = (1, True, "Hola", 3.5)

# 3. Tupla de un solo elemento
tupla_un_elemento = (10,)

# 4. Comprobación de tipos
print(type(tupla_un_elemento)) # <class 'tuple'>
\`\`\``,
    exercises: [
      {
        id: 49501,
        title: "Ejercicio 1: Declaración Básica",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea una tupla vacía llamada `vacia` y una tupla heterogénea llamada `datos` que contenga el número `1` y el texto `'Hola'`. Imprime ambas.",
        initialCode: "# Crea las dos tuplas indicadas e imprímelas\n",
        outputCheck: "()\n(1, 'Hola')",
        testCode: "assert 'vacia' in locals() and 'datos' in locals()\nassert type(vacia) is tuple and type(datos) is tuple\nassert vacia == () and datos == (1, 'Hola')",
        hint: "vacia = ()\ndatos = (1, 'Hola')\nprint(vacia)\nprint(datos)"
      },
      {
        id: 49502,
        title: "Ejercicio 2: El misterio de un elemento",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Declara una tupla llamada `solitario` que contenga **únicamente el número 7** (no olvides la regla especial). Imprime la tupla y luego imprime su tipo usando `type()`.",
        initialCode: "# Declara la tupla de un solo elemento y comprueba su tipo\n",
        outputCheck: "(7,)\n<class 'tuple'>",
        testCode: "assert 'solitario' in locals()\nassert type(solitario) is tuple\nassert solitario == (7,)",
        hint: "solitario = (7,)\nprint(solitario)\nprint(type(solitario))"
      },
      {
        id: 49503,
        title: "Ejercicio 3: Mutabilidad engañosa",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Tienes la tupla `registro = ([1, 2], 'A')`. Intenta cambiar el número `2` (que está dentro de la lista interna) por un `99`. Imprime `registro` al final para ver el cambio.\n*(Pista: Accede a la lista con el índice 0, y luego al elemento de la lista con el índice 1)*.",
        initialCode: "registro = ([1, 2], 'A')\n\n# Modifica el 2 por un 99 e imprime la tupla\n",
        outputCheck: "([1, 99], 'A')",
        testCode: "assert 'registro' in locals()\nassert registro == ([1, 99], 'A')",
        hint: "registro[0][1] = 99\nprint(registro)"
      }
    ]
  },
  {
    id: 496,
    title: "Acceder a elementos en Tuplas",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Cómo funciona la indexación en Tuplas?
Al igual que ocurre con las listas, las tuplas ordenan sus elementos asignándoles un **número entero secuencial e invariable** que representa su ubicación exacta.

Existen tres alternativas principales para interactuar y extraer datos desde una tupla: índices, segmentación (slicing) y desempaquetado. En esta lección nos centraremos exclusivamente en el **acceso mediante índices posicionales**.

**Sintaxis Básica:**
\`\`\`python
elemento = nombre_tupla[posicion]
\`\`\`

---

## 2. Índices Positivos vs Índices Negativos
Python maneja un sistema de doble lectura indexada para recorrer estructuras ordenadas:

### Índices Positivos (De izquierda a derecha)
Comienzan estrictamente a contar desde el número \`0\` para el primer elemento. Si una tupla posee una longitud de $N$ elementos, las posiciones válidas se extenderán desde \`0\` hasta \`N-1\`.
- Ejemplo (4 elementos): \`0\`, \`1\`, \`2\`, \`3\`.

### Índices Negativos (De derecha a izquierda)
Resultan muy útiles cuando se desea consultar elementos finales sin necesidad de calcular la longitud total de la tupla. La lectura empieza desde el extremo derecho asignando el valor \`-1\` al último elemento.
- Ejemplo (4 elementos): \`-1\` (último), \`-2\`, \`-3\`, \`-4\` (primero).

---

## 3. Código Práctico

\`\`\`python
# Posiciones directas:   0: México,   1: Brasil,   2: Argentina,  3: España
# Posiciones inversas:  -4: México,  -3: Brasil,  -2: Argentina, -1: España
countries_tuple = ("México", "Brasil", "Argentina", "España")

print(f"Tupla de países: {countries_tuple}\\n")

# --- CONSULTA MEDIANTE ÍNDICES POSITIVOS ---
posicion_1 = countries_tuple[1] 
print(f"Posición 1 (Segundo elemento): {posicion_1}") # Brasil

posicion_3 = countries_tuple[3] 
print(f"Posición 3 (Cuarto elemento): {posicion_3}") # España


# --- CONSULTA MEDIANTE ÍNDICES NEGATIVOS ---
posicion_menos_1 = countries_tuple[-1] 
print(f"Posición -1 (Último elemento): {posicion_menos_1}") # España

posicion_menos_4 = countries_tuple[-4] 
print(f"Posición -4 (Primer elemento): {posicion_menos_4}") # México
\`\`\``,
    exercises: [
      {
        id: 49601,
        title: "Ejercicio 1: Extracción Positiva",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la tupla `colores`, extrae el **segundo** elemento y guárdalo en la variable `segundo`. Luego, extrae el **cuarto** elemento y guárdalo en `cuarto`. Imprime ambas variables.",
        initialCode: "colores = ('Rojo', 'Verde', 'Azul', 'Amarillo', 'Blanco')\n\n# Extrae los colores usando índices positivos e imprime\n",
        outputCheck: "Verde\nAmarillo",
        testCode: "assert 'segundo' in locals() and 'cuarto' in locals()\nassert segundo == 'Verde' and cuarto == 'Amarillo'",
        hint: "segundo = colores[1]\ncuarto = colores[3]\nprint(segundo)\nprint(cuarto)"
      },
      {
        id: 49602,
        title: "Ejercicio 2: Extracción Negativa",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usando **únicamente índices negativos**, extrae el **último** elemento de la tupla `animales` y guárdalo en `ultimo`. Extrae el **penúltimo** y guárdalo en `penultimo`. Imprime ambas variables.",
        initialCode: "animales = ('Gato', 'Perro', 'Loro', 'Pez')\n\n# Extrae usando índices negativos e imprime\n",
        outputCheck: "Pez\nLoro",
        testCode: "assert 'ultimo' in locals() and 'penultimo' in locals()\nassert ultimo == 'Pez' and penultimo == 'Loro'",
        hint: "ultimo = animales[-1]\npenultimo = animales[-2]\nprint(ultimo)\nprint(penultimo)"
      },
      {
        id: 49603,
        title: "Ejercicio 3: Fusión mediante índices",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Extrae el **primer** número y el **último** número de la tupla `valores` (puedes usar el índice positivo y negativo correspondientemente). Súmalos y guarda el resultado en una variable llamada `suma`. Imprime `suma`.",
        initialCode: "valores = (10, 50, 80, 20)\n\n# Extrae el primer y último elemento, súmalos e imprime el resultado\n",
        outputCheck: "30",
        testCode: "assert 'suma' in locals()\nassert suma == 30",
        hint: "suma = valores[0] + valores[-1]\nprint(suma)"
      }
    ]
  },
  {
    id: 497,
    title: "Segmentación de Tuplas (Slicing)",
    module: "Estructuras de Datos",
    theory: `## 1. El Operador de Segmentación
El operador de segmentación (conocido como *slicing*) es la segunda alternativa para extraer información de una tupla. Esta técnica sirve para extraer subconjuntos o subsecuencias de elementos de forma muy flexible.

**Sintaxis:** Es idéntica a la utilizada para recortar cadenas de texto o listas. Consiste en colocar entre corchetes hasta tres parámetros numéricos separados por dos puntos (\`:\`).
\`\`\`python
sub_tupla = nombre_tupla[inicio:final:saltos]
\`\`\`

- **inicio:** Índice donde arranca la extracción (inclusive). Si se omite, asume \`0\`.
- **final:** Índice donde termina el recorte (**exclusivo**, el elemento en esta posición no entra). Si se omite, extrae hasta el último elemento disponible.
- **saltos:** El incremento. Si se omite, avanza de uno en uno (\`1\`).

> **Nota Fundamental:** Cualquier resultado obtenido a través de este operador se devolverá siempre en formato de tupla, manteniendo la inmutabilidad original.

---

## 2. Casos Prácticos Analizados

Consideremos la tupla base: \`vowels_tuple = ("a", "e", "i", "o", "u")\`

### A. Rango determinado sin saltos (\`[0:2]\`)
Inicia en el índice \`0\` y se detiene justo antes del \`2\` (extrae posiciones \`0\` y \`1\`).
Resultado: \`('a', 'e')\`

### B. Recorrido completo con saltos (\`[::2]\`)
Al omitir el inicio y el final, toma toda la extensión de la tupla. Al definir el salto como \`2\`, toma un elemento sí y otro no.
Resultado: \`('a', 'i', 'u')\`

### C. Segmentación con índices negativos (\`[-3:]\`)
Inicia contando desde el extremo derecho (\`-3\`) y se extiende hasta el final al no declarar un límite explícito.
Resultado: \`('i', 'o', 'u')\`

---

## 3. Código Práctico

\`\`\`python
# Índices positivos:  0:'a',  1:'e',  2:'i',  3:'o',  4:'u'
# Índices negativos: -5:'a', -4:'e', -3:'i', -2:'o', -1:'u'
vowels_tuple = ("a", "e", "i", "o", "u")
print(f"Tupla original: {vowels_tuple}\\n")

# Ejemplo 1: Segmentación estándar con inicio y fin definidos
segmento_1 = vowels_tuple[0:2]
print(f"Posiciones [0:2] -> {segmento_1}")

# Ejemplo 2: Segmentación de extremo a extremo saltando de 2 en 2
segmento_2 = vowels_tuple[::2]
print(f"Posiciones [::2] -> {segmento_2}")

# Ejemplo 3: Uso de índices negativos para recortar desde el final
segmento_3 = vowels_tuple[-3:]
print(f"Posiciones [-3:] -> {segmento_3}")
\`\`\``,
    exercises: [
      {
        id: 49701,
        title: "Ejercicio 1: Rango estándar",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la tupla `letras = ('A', 'B', 'C', 'D', 'E')`, extrae los elementos desde la posición `1` hasta la `4` (exclusivo) usando segmentación `[1:4]`. Guarda el resultado en `corte` e imprímelo.",
        initialCode: "letras = ('A', 'B', 'C', 'D', 'E')\n\n# Realiza la segmentación e imprime el resultado\n",
        outputCheck: "('B', 'C', 'D')",
        testCode: "assert 'corte' in locals()\nassert corte == ('B', 'C', 'D')",
        hint: "corte = letras[1:4]\nprint(corte)"
      },
      {
        id: 49702,
        title: "Ejercicio 2: Saltos de 2 en 2",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la tupla `numeros = (10, 20, 30, 40, 50, 60)`, extrae toda la tupla pero saltando de 2 en 2 utilizando la sintaxis `[::2]`. Guarda el resultado en `pares` e imprímelo.",
        initialCode: "numeros = (10, 20, 30, 40, 50, 60)\n\n# Realiza la segmentación con saltos e imprime el resultado\n",
        outputCheck: "(10, 30, 50)",
        testCode: "assert 'pares' in locals()\nassert pares == (10, 30, 50)",
        hint: "pares = numeros[::2]\nprint(pares)"
      },
      {
        id: 49703,
        title: "Ejercicio 3: Últimos elementos",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Usa índices negativos y segmentación para extraer los **últimos dos elementos** de la tupla `meses = ('Enero', 'Febrero', 'Marzo', 'Abril')`. Guarda el resultado en `finales` e imprímelo.",
        initialCode: "meses = ('Enero', 'Febrero', 'Marzo', 'Abril')\n\n# Extrae los dos últimos elementos e imprime el resultado\n",
        outputCheck: "('Marzo', 'Abril')",
        testCode: "assert 'finales' in locals()\nassert finales == ('Marzo', 'Abril')",
        hint: "finales = meses[-2:]\nprint(finales)"
      },
      {
        id: 49704,
        title: "Ejercicio 4: Omitiendo límites",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la tupla `dias = ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes')`, extrae los **primeros 3 días** omitiendo el índice de inicio (`[:3]`) y guárdalos en `inicio_semana`. Luego, extrae **desde el índice 3 hasta el final** omitiendo el límite derecho (`[3:]`) y guárdalos en `fin_semana`. Imprime ambas variables.",
        initialCode: "dias = ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes')\n\n# Extrae y guarda en inicio_semana y fin_semana, luego imprime\n",
        outputCheck: "('Lunes', 'Martes', 'Miércoles')\n('Jueves', 'Viernes')",
        testCode: "assert 'inicio_semana' in locals() and 'fin_semana' in locals()\nassert inicio_semana == ('Lunes', 'Martes', 'Miércoles')\nassert fin_semana == ('Jueves', 'Viernes')",
        hint: "inicio_semana = dias[:3]\nfin_semana = dias[3:]\nprint(inicio_semana)\nprint(fin_semana)"
      }
    ]
  },
  {
    id: 498,
    title: "Desempaquetado de Tuplas",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es el Desempaquetado de Tuplas?
El desempaquetado (*tuple unpacking*) es la tercera alternativa para acceder a los datos de una tupla. Esta técnica consiste en asignar de manera limpia y automática cada elemento extraído a una variable independiente.

Suele vincularse de forma secuencial con una subsecuencia obtenida mediante el operador de segmentación (visto en la lección anterior).

**Sintaxis Básica:**
\`\`\`python
variable_1, variable_2, variable_n = nombre_tupla[inicio:final]
\`\`\`
> **Asignación en orden:** La primera variable declarada recibe el primer elemento, la segunda variable el segundo elemento, y así sucesivamente.

---

## 2. La Regla de Oro: Proporcionalidad Estricta
Para realizar un desempaquetado exitoso, debe existir una **equivalencia exacta** entre el número de variables declaradas a la izquierda y el número de elementos devueltos por la tupla a la derecha.

### A. Error por exceso de elementos (\`ValueError\`)
Ocurre si la tupla devuelve **más elementos** que las variables disponibles.
- *Ejemplo:* Intentar guardar 4 países en solo 3 variables detendrá el script notificando que hay "demasiados datos para desempaquetar".

### B. Error por defecto de elementos (\`ValueError\`)
Ocurre si la tupla devuelve **menos elementos** de los que las variables esperan almacenar.
- *Ejemplo:* Declarar 3 variables pero recortar un rango que solo aísla 2 elementos. Python arrojará un error porque no puede dejar variables "vacías".

---

## 3. Código Práctico

\`\`\`python
# Índices: 0: México, 1: Brasil, 2: Argentina, 3: España
countries_tuple = ("México", "Brasil", "Argentina", "España")
print(f"Original: {countries_tuple}\\n")

# Desempaquetado correcto usando segmentación
# El corte [:3] extrae posiciones 0, 1 y 2 (3 elementos).
# Declaramos exactamente 3 variables (p1, p2, p3) para recibirlos.
p1, p2, p3 = countries_tuple[:3]

# Comprobación de las variables independientes
print("--- Resultado del Desempaquetado ---")
print(f"Primer país (p1): {p1}")       # México
print(f"Segundo país (p2): {p2}")      # Brasil
print(f"Tercer país (p3): {p3}")       # Argentina
\`\`\``,
    exercises: [
      {
        id: 49801,
        title: "Ejercicio 1: Desempaquetado directo",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la tupla `coordenadas = (40.5, -74.2)`, desempaquétala directamente en dos variables llamadas `latitud` y `longitud`. Luego, imprime ambas variables.",
        initialCode: "coordenadas = (40.5, -74.2)\n\n# Desempaqueta en latitud y longitud e imprime\n",
        outputCheck: "40.5\n-74.2",
        testCode: "assert 'latitud' in locals() and 'longitud' in locals()\nassert latitud == 40.5 and longitud == -74.2",
        hint: "latitud, longitud = coordenadas\nprint(latitud)\nprint(longitud)"
      },
      {
        id: 49802,
        title: "Ejercicio 2: Slicing + Desempaquetado",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La tupla `podio` contiene a los ganadores: `('Ana', 'Beto', 'Cata', 'David')`. Desempaqueta **solo los tres primeros** elementos (`[:3]`) en las variables `oro`, `plata` y `bronce`. Imprime `bronce`.",
        initialCode: "podio = ('Ana', 'Beto', 'Cata', 'David')\n\n# Combina slicing [:3] y desempaquetado. Imprime bronce.\n",
        outputCheck: "Cata",
        testCode: "assert 'oro' in locals() and 'plata' in locals() and 'bronce' in locals()\nassert bronce == 'Cata'",
        hint: "oro, plata, bronce = podio[:3]\nprint(bronce)"
      },
      {
        id: 49803,
        title: "Ejercicio 3: Corrige el ValueError",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "El código actual intenta desempaquetar en 3 variables (`a`, `b`, `c`), pero hace un recorte de 4 elementos (`[0:4]`), lo que provocará un `ValueError`. **Corrige el código** ajustando la segmentación para que extraiga exactamente 3 elementos (`[0:3]`) y no haya errores.",
        initialCode: "numeros = (10, 20, 30, 40, 50)\n\n# Corrige el rango de segmentación para evitar el error\na, b, c = numeros[0:4]\n\nprint(f\"{a}, {b}, {c}\")\n",
        outputCheck: "10, 20, 30",
        testCode: "assert 'a' in locals() and 'b' in locals() and 'c' in locals()\nassert a == 10 and b == 20 and c == 30",
        hint: "Cambia numeros[0:4] por numeros[0:3]"
      }
    ]
  },
  {
    id: 499,
    title: "Inmutabilidad de una tupla",
    module: "Estructuras de Datos",
    theory: `## 1. La Inmutabilidad en Python
La inmutabilidad es la característica principal de las tuplas. Es una decisión de diseño que **impide tanto la modificación de sus elementos individuales como la alteración de su longitud total** después de haber sido creada.

Si intentas asignar un nuevo valor a un índice específico (ej. \`mi_tupla[0] = 5\`), Python detendrá la ejecución inmediatamente y arrojará un error de tipo \`TypeError\`, indicando que "el objeto no soporta la asignación de elementos".

---

## 2. La Excepción: Objetos Mutables Anidados
Existe una flexibilidad muy importante: la tupla en sí misma sigue siendo inmutable (no puedes cambiar qué objetos contiene), pero **si uno de sus elementos es un objeto mutable** (como una lista o un diccionario), los valores internos de ese objeto **sí se pueden modificar**.

### Modificar una Lista dentro de una Tupla
Para alterar un dato de una lista anidada, se utiliza una indexación doble:
1. El primer par de corchetes localiza la posición de la lista dentro de la tupla.
2. El segundo par localiza la posición del elemento a cambiar dentro de esa lista.

### Modificar un Diccionario dentro de una Tupla
1. El primer par de corchetes localiza la posición del diccionario.
2. El segundo par encierra la clave (\`key\`) del valor que se quiere actualizar.

---

## 3. Código Práctico

\`\`\`python
# CASO 1: Tupla simple (Genera Error)
numeros_tuple = (1, 2, 3, 4, 5)
# numeros_tuple[0] = 99 # Arroja TypeError


# CASO 2: Estructuras anidadas
# [0] es Lista, [1] es Diccionario, [2] es Tupla
info_tuple = ([1, 2, 3], {"uno": 1, "dos": 2}, (4, 5))
print(f"Tupla original: {info_tuple}")

# Modificación permitida en la LISTA (Cambiar 2 por 99)
info_tuple[0][1] = 99
print(f"Tras modificar lista: {info_tuple}")

# Modificación permitida en el DICCIONARIO (Cambiar 2 por 88)
info_tuple[1]["dos"] = 88
print(f"Tras modificar diccionario: {info_tuple}")

# La tupla en info_tuple[2] sigue siendo estrictamente inmutable
\`\`\``,
    exercises: [
      {
        id: 49901,
        title: "Ejercicio 1: Comprobar la inmutabilidad",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "El siguiente código intenta modificar el primer elemento de la tupla `puntos`. Como es inmutable, fallará con un `TypeError`. **Comenta** la línea que causa el error usando `#` y luego imprime la tupla original sin modificaciones.",
        initialCode: "puntos = (100, 200, 300)\n\n# Comenta la línea conflictiva para evitar el error\npuntos[0] = 999\n\nprint(puntos)\n",
        outputCheck: "(100, 200, 300)",
        testCode: "assert 'puntos' in locals()\nassert puntos == (100, 200, 300)",
        hint: "Coloca un # al inicio de la línea puntos[0] = 999"
      },
      {
        id: 49902,
        title: "Ejercicio 2: Modificar una lista anidada",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La tupla `datos` contiene una lista en su **posición 0**. Accede a esa lista y modifica su **segundo elemento** (el `'b'`) cambiándolo por una `'Z'`. Al final, imprime la tupla `datos` completa.",
        initialCode: "datos = (['a', 'b', 'c'], 500, False)\n\n# Modifica la 'b' por 'Z' usando doble indexación e imprime\n",
        outputCheck: "(['a', 'Z', 'c'], 500, False)",
        testCode: "assert 'datos' in locals()\nassert datos[0][1] == 'Z'",
        hint: "datos[0][1] = 'Z'\nprint(datos)"
      },
      {
        id: 49903,
        title: "Ejercicio 3: Modificar un diccionario anidado",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "La tupla `perfil` contiene el nombre en la posición 0, y un **diccionario en la posición 1**. Usa la doble indexación para actualizar el valor de la clave `'edad'` a `30`. Imprime la tupla `perfil` completa.",
        initialCode: "perfil = ('Carlos', {'edad': 25, 'ciudad': 'Madrid'})\n\n# Actualiza la edad a 30 en el diccionario interno e imprime\n",
        outputCheck: "('Carlos', {'edad': 30, 'ciudad': 'Madrid'})",
        testCode: "assert 'perfil' in locals()\nassert perfil[1]['edad'] == 30",
        hint: "perfil[1]['edad'] = 30\nprint(perfil)"
      }
    ]
  },
  {
    id: 4991,
    title: "Tuplas y el ciclo for",
    module: "Estructuras de Datos",
    theory: `## 1. Recorrer una Tupla con el Ciclo \`for\`
Un bucle \`for\` permite iterar y extraer secuencialmente todos los elementos almacenados dentro de una tupla. Este proceso es idéntico al que se utiliza para recorrer listas, ya que las tuplas también son objetos **iterables** en Python.

**Sintaxis:**
\`\`\`python
for variable_temporal in nombre_tupla:
    instrucciones
\`\`\`

---

## 2. Anatomía del Ciclo

| Elemento | Rol |
|---|---|
| \`for\` | Palabra reservada que inicia el ciclo. |
| \`variable_temporal\` | Variable declarada para el ciclo; almacena automáticamente el elemento de cada iteración. |
| \`in\` | Indica dentro de qué objeto se va a buscar. |
| \`nombre_tupla\` | El objeto iterable que se desea inspeccionar de principio a fin. |
| \`:\` | Delimitador que marca el final de la declaración del ciclo. |
| Indentación | Espaciado obligatorio que delimita el bloque de instrucciones del bucle. |

---

## 3. Mecánica de Ejecución
Al iniciar el bucle, Python lee la tupla de izquierda a derecha:
1. En la **primera iteración**, toma el elemento del índice \`0\`, lo guarda en la variable temporal y ejecuta el bloque indentado.
2. En la **siguiente iteración**, pasa automáticamente al índice \`1\`, actualiza la variable y repite.
3. El ciclo **finaliza automáticamente** al procesar el último elemento.

---

## 4. Código Práctico

\`\`\`python
# Creación de la tupla de vocales
vowels_tuple = ("a", "e", "i", "o", "u")

print(f"Tupla original: {vowels_tuple}\\n")

# Ciclo for para recorrer e imprimir individualmente
# 'vowel' es la variable temporal que cambia en cada iteración
for vowel in vowels_tuple:
    print(vowel)
\`\`\``,
    exercises: [
      {
        id: 499101,
        title: "Ejercicio 1: Recorrido básico",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dado el siguiente código con la tupla `planetas`, usa un ciclo `for` para imprimir **cada planeta en una línea separada**.",
        initialCode: "planetas = ('Mercurio', 'Venus', 'Tierra', 'Marte')\n\n# Usa un ciclo for para imprimir cada planeta\n",
        outputCheck: "Mercurio\nVenus\nTierra\nMarte",
        testCode: "assert 'planetas' in locals()\nassert type(planetas) is tuple",
        hint: "for planeta in planetas:\n    print(planeta)"
      },
      {
        id: 499102,
        title: "Ejercicio 2: Recorrido con formato",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dada la tupla `precios = (12.5, 8.0, 25.99)`, usa un ciclo `for` para imprimir cada precio con el prefijo `'Precio: $'`. El resultado esperado es:\n```\nPrecio: $12.5\nPrecio: $8.0\nPrecio: $25.99\n```",
        initialCode: "precios = (12.5, 8.0, 25.99)\n\n# Usa un ciclo for con f-string para imprimir con el prefijo indicado\n",
        outputCheck: "Precio: $12.5\nPrecio: $8.0\nPrecio: $25.99",
        testCode: "assert 'precios' in locals()\nassert type(precios) is tuple",
        hint: "for precio in precios:\n    print(f'Precio: ${precio}')"
      },
      {
        id: 499103,
        title: "Ejercicio 3: Suma con ciclo",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dada la tupla `puntos = (10, 25, 5, 40, 20)`, usa un ciclo `for` para sumar todos los valores y guarda el resultado en una variable llamada `total`. Al finalizar el ciclo, imprime `total`.",
        initialCode: "puntos = (10, 25, 5, 40, 20)\ntotal = 0\n\n# Acumula la suma con un ciclo for e imprime el total\n",
        outputCheck: "100",
        testCode: "assert 'total' in locals()\nassert total == 100",
        hint: "for punto in puntos:\n    total += punto\nprint(total)"
      }
    ]
  },
  {
    id: 4992,
    title: "Desempaquetado de tuplas y el ciclo for",
    module: "Estructuras de Datos",
    theory: `## 1. Combinando Desempaquetado y Ciclo \`for\`
Esta técnica avanzada permite combinar el **desempaquetado de tuplas** con el control de flujo de un ciclo \`for\`. Esto permite procesar colecciones de datos anidadas de forma directa y elegante, sin necesidad de usar índices manuales dentro del cuerpo del bucle.

---

## 2. ¿Cuándo se aplica?
Cuando tenemos una tupla principal que contiene en su interior **varias subtuplas**, y todas estas subtuplas poseen la **misma cantidad exacta de elementos**, podemos asignarlas a variables independientes directamente en la **cabecera del ciclo \`for\`**.

En lugar de declarar una única variable temporal, se escriben **tantas variables separadas por comas** como elementos tenga cada subtupla:

\`\`\`python
for var1, var2, var3 in tupla_de_tuplas:
    # Las variables toman los valores en orden en cada iteración
\`\`\`

---

## 3. Mecánica de Ejecución por Iteración

- **Primera iteración:** El ciclo se posiciona en la primera subtupla. Python detecta que hay N elementos y que se suministraron N variables en la cabecera. Desempaqueta los valores en orden estricto de izquierda a derecha y ejecuta el bloque.
- **Siguientes iteraciones:** El ciclo avanza automáticamente a la siguiente subtupla, actualiza las variables de la cabecera con los nuevos datos y vuelve a procesar el cuerpo del bucle.

---

## 4. Código Práctico

\`\`\`python
# Tupla de tuplas omitiendo paréntesis exteriores (Python los infiere con las comas)
# Cada subtupla: (Código, Fruta, Color)
fruts_tuple = ("001", "manzana", "rojo"), ("002", "pera", "verde"), ("003", "naranja", "naranja")

print(f"Tupla original: {fruts_tuple}\\n")

# for con tres variables simultáneas: desempaquetado automático en cabecera
for code, fruit, color in fruts_tuple:
    print(f"La {fruit} tiene el código {code} y es de color {color}.")
\`\`\`

> **Ventaja clave:** Al usar el desempaquetado en la cabecera del \`for\`, podemos **reordenar y combinar** las variables en el cuerpo del bucle como mejor nos convenga, independientemente del orden original en la subtupla.`,
    exercises: [
      {
        id: 499201,
        title: "Ejercicio 1: Desempaquetado básico en for",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la tupla de tuplas `personas`, usa un ciclo `for` con **desempaquetado en la cabecera** para imprimir en cada línea el nombre y la edad separados por un guion. Resultado esperado:\n```\nAna - 30\nBeto - 25\nCata - 28\n```",
        initialCode: "personas = ('Ana', 30), ('Beto', 25), ('Cata', 28)\n\n# Usa for con desempaquetado: for nombre, edad in personas\n",
        outputCheck: "Ana - 30\nBeto - 25\nCata - 28",
        testCode: "assert 'personas' in locals()\nassert type(personas) is tuple",
        hint: "for nombre, edad in personas:\n    print(f'{nombre} - {edad}')"
      },
      {
        id: 499202,
        title: "Ejercicio 2: Reordenando el output",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La tupla `productos` guarda subtuplas en el formato `(precio, nombre)`. Usa desempaquetado en la cabecera del `for` para imprimir la información **en orden inverso**: primero el nombre y luego el precio. Resultado esperado:\n```\nCafé cuesta $3.5\nTé cuesta $2.0\nJugo cuesta $4.75\n```",
        initialCode: "productos = (3.5, 'Café'), (2.0, 'Té'), (4.75, 'Jugo')\n\n# Desempaqueta (precio, nombre) e imprime nombre primero\n",
        outputCheck: "Café cuesta $3.5\nTé cuesta $2.0\nJugo cuesta $4.75",
        testCode: "assert 'productos' in locals()\nassert type(productos) is tuple",
        hint: "for precio, nombre in productos:\n    print(f'{nombre} cuesta ${precio}')"
      },
      {
        id: 499203,
        title: "Ejercicio 3: Tres variables simultáneas",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "La tupla `inventario` contiene subtuplas con tres datos: `(código, producto, cantidad)`. Usa desempaquetado de tres variables en el `for` para imprimir solo los productos cuya **cantidad sea mayor a 10**. Resultado esperado:\n```\nManzana: 50 unidades\nPera: 12 unidades\n```",
        initialCode: "inventario = ('A01', 'Manzana', 50), ('B02', 'Uva', 3), ('C03', 'Pera', 12)\n\n# Desempaqueta con 3 variables y filtra por cantidad > 10\n",
        outputCheck: "Manzana: 50 unidades\nPera: 12 unidades",
        testCode: "assert 'inventario' in locals()\nassert type(inventario) is tuple",
        hint: "for codigo, producto, cantidad in inventario:\n    if cantidad > 10:\n        print(f'{producto}: {cantidad} unidades')"
      }
    ]
  },
  {
    id: 4993,
    title: "La función tuple()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es la función \`tuple()\`?
La función integrada \`tuple()\` permite **convertir colecciones u objetos iterables** (listas, cadenas, diccionarios) en estructuras de datos **inmutables** (tuplas).

**Sintaxis básica:**
\`\`\`python
nombre_tupla = tuple(objeto_iterable)
\`\`\`

### Reglas importantes:
- **Un solo argumento:** \`tuple()\` solo acepta un máximo de **un argumento**. Si ingresas dos o más elementos separados por comas (ej: \`tuple(x, y)\`), Python arrojará un \`TypeError\`.
- **Debe ser iterable:** El argumento enviado debe ser un objeto iterable. Un entero (\`int\`) o flotante (\`float\`) pasado directamente causará un error.

---

## 2. Comportamiento según el Objeto de Entrada

### A) Desde variables independientes → Lista → Tupla
Para convertir variables sueltas (ej: \`x = 10\`, \`y = 5\`) sin violar la regla del argumento único, primero se agrupan en una lista \`[x, y]\` y luego se convierte esa lista:
\`\`\`python
coordenada = tuple([x, y])
\`\`\`

### B) Desde Cadenas de Texto (String → Tupla)
Al pasar un string, \`tuple()\` **descompone el texto carácter por carácter** (incluyendo espacios), asignando una posición propia a cada uno.

### C) Desde Diccionarios (3 variantes críticas)

| Llamada | Resultado |
|---|---|
| \`tuple(diccionario)\` | Tupla con solo las **claves** (keys) |
| \`tuple(diccionario.values())\` | Tupla con solo los **valores** |
| \`tuple(diccionario.items())\` | **Tupla de tuplas**: cada par \`(clave, valor)\` |

---

## 3. Código Práctico

\`\`\`python
# EJEMPLO 1: Lista → Tupla (Coordenadas)
x, y = 10, 5
coordenada = tuple([x, y])
print(f"Coordenada: {coordenada}")  # (10, 5)

# EJEMPLO 2: String → Tupla
string_tuple = tuple("Hola")
print(f"String a tupla: {string_tuple}")  # ('H', 'o', 'l', 'a')

# Diccionario base
numbers_dict = {"uno": 1, "dos": 2, "tres": 3}

# EJEMPLO 3: Dict → Tupla de claves (por defecto)
dict_keys_tuple = tuple(numbers_dict)
print(f"Solo claves: {dict_keys_tuple}")  # ('uno', 'dos', 'tres')

# EJEMPLO 4: Dict → Tupla de valores
dict_values_tuple = tuple(numbers_dict.values())
print(f"Solo valores: {dict_values_tuple}")  # (1, 2, 3)

# EJEMPLO 5: Dict → Tupla de tuplas (items completo)
dict_items_tuple = tuple(numbers_dict.items())
print(f"Items completos: {dict_items_tuple}")  # (('uno', 1), ('dos', 2), ('tres', 3))
\`\`\``,
    exercises: [
      {
        id: 499301,
        title: "Ejercicio 1: Lista a Tupla",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dada la lista `colores = ['rojo', 'verde', 'azul']`, usa `tuple()` para convertirla en una tupla y guárdala en `colores_tupla`. Imprime el resultado.",
        initialCode: "colores = ['rojo', 'verde', 'azul']\n\n# Convierte la lista a tupla e imprime\n",
        outputCheck: "('rojo', 'verde', 'azul')",
        testCode: "assert 'colores_tupla' in locals()\nassert type(colores_tupla) is tuple\nassert colores_tupla == ('rojo', 'verde', 'azul')",
        hint: "colores_tupla = tuple(colores)\nprint(colores_tupla)"
      },
      {
        id: 499302,
        title: "Ejercicio 2: String a Tupla",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Convierte la cadena de texto `palabra = 'Python'` en una tupla usando `tuple()` y guárdala en `letras`. Imprime el resultado. Cada carácter debe ser un elemento individual.",
        initialCode: "palabra = 'Python'\n\n# Convierte el string a tupla carácter a carácter e imprime\n",
        outputCheck: "('P', 'y', 't', 'h', 'o', 'n')",
        testCode: "assert 'letras' in locals()\nassert type(letras) is tuple\nassert letras == ('P', 'y', 't', 'h', 'o', 'n')",
        hint: "letras = tuple(palabra)\nprint(letras)"
      },
      {
        id: 499303,
        title: "Ejercicio 3: Diccionario → Tupla de items",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dado el diccionario `precios`, usa `tuple()` junto con el método `.items()` para crear una **tupla de tuplas** donde cada elemento sea el par `(producto, precio)`. Guárdala en `precios_tupla` e imprímela.",
        initialCode: "precios = {'café': 3.5, 'té': 2.0, 'jugo': 4.75}\n\n# Usa tuple() con .items() e imprime\n",
        outputCheck: "(('café', 3.5), ('té', 2.0), ('jugo', 4.75))",
        testCode: "assert 'precios_tupla' in locals()\nassert type(precios_tupla) is tuple\nassert precios_tupla == (('café', 3.5), ('té', 2.0), ('jugo', 4.75))",
        hint: "precios_tupla = tuple(precios.items())\nprint(precios_tupla)"
      },
      {
        id: 499304,
        title: "Ejercicio 4: Diccionario → Solo Claves",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Convierte el diccionario `config = {'tema': 'oscuro', 'idioma': 'es'}` a una tupla pasándolo directamente a `tuple()`. Esto extraerá **solo las claves**. Guarda el resultado en `claves_tupla` e imprímelo.",
        initialCode: "config = {'tema': 'oscuro', 'idioma': 'es'}\n\n# Convierte el diccionario directamente a tupla e imprime\n",
        outputCheck: "('tema', 'idioma')",
        testCode: "assert 'claves_tupla' in locals()\nassert claves_tupla == ('tema', 'idioma')",
        hint: "claves_tupla = tuple(config)\nprint(claves_tupla)"
      },
      {
        id: 499305,
        title: "Ejercicio 5: Diccionario → Solo Valores",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa el método `.values()` junto con `tuple()` para extraer **solo los valores** del diccionario `puntos = {'nivel1': 100, 'nivel2': 250}`. Guarda el resultado en `valores_tupla` e imprímelo.",
        initialCode: "puntos = {'nivel1': 100, 'nivel2': 250}\n\n# Usa tuple() y .values() e imprime\n",
        outputCheck: "(100, 250)",
        testCode: "assert 'valores_tupla' in locals()\nassert valores_tupla == (100, 250)",
        hint: "valores_tupla = tuple(puntos.values())\nprint(valores_tupla)"
      }
    ]
  },
  {
    id: 4994,
    title: "Concatenación de Tuplas",
    module: "Estructuras de Datos",
    theory: `## 1. Concepto e Inmutabilidad
La concatenación de tuplas consiste en combinar dos o más tuplas para consolidar todos sus elementos dentro de una sola estructura.

Regla fundamental: las tuplas son **inmutables**. Esto significa que la concatenación **nunca altera las tuplas originales**, sino que genera un **objeto totalmente nuevo** con los datos en el orden exacto en que se especificaron.

---

## 2. Tres Alternativas de Concatenación

### Alternativa A: Operador de Adición (\`+\`)
El método clásico y más directo. Enlaza dos o más tuplas con el símbolo de suma.
\`\`\`python
tupla_concatenada = tupla1 + tupla2
\`\`\`
> **El orden importa:** \`tupla1 + tupla2\` produce un resultado distinto a \`tupla2 + tupla1\`.

### Alternativa B: Operador de Adición en Asignación (\`+=\`)
Abrevia código y "acumula" en la misma variable.
\`\`\`python
tupla1 += tupla2  # Equivale a: tupla1 = tupla1 + tupla2
\`\`\`
> **Paradoja de inmutabilidad:** Aunque parece que modificamos \`tupla1\`, Python internamente **crea una tupla nueva**, destruye la referencia vieja y reasigna el mismo nombre a la nueva estructura unificada. La inmutabilidad no se viola.

### Alternativa C: Concatenar Tupla con Lista (usando \`tuple()\`)
Python **no permite mezclar tipos** con \`+\`. Hacer \`tupla + lista\` arrojará un \`TypeError\`.
La solución: convertir la lista a tupla primero con \`tuple(lista)\`.
\`\`\`python
tupla_final = tupla1 + tuple(lista)
\`\`\`

---

## 3. Código Práctico

\`\`\`python
# --- ALTERNATIVA A: Operador (+) ---
tupla1 = (1, 2, 3)
tupla2 = (4, 5, 6)
tupla_concatenada = tupla1 + tupla2
print(f"(+) Resultado: {tupla_concatenada}")       # (1, 2, 3, 4, 5, 6)

# --- ALTERNATIVA B: Operador (+=) ---
tupla1 = (1, 2, 3)
tupla1 += tupla2
print(f"(+=) tupla1 actualizada: {tupla1}")        # (1, 2, 3, 4, 5, 6)

# --- ALTERNATIVA C: Tupla + Lista via tuple() ---
tupla1 = (1, 2, 3)
lista = [4, 5, 6]
tupla_final = tupla1 + tuple(lista)
print(f"(tuple()) Resultado Mixto: {tupla_final}") # (1, 2, 3, 4, 5, 6)
\`\`\``,
    exercises: [
      {
        id: 499401,
        title: "Ejercicio 1: Concatenación básica (+)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes las tuplas `a = (10, 20, 30)` y `b = (40, 50)`. Usa el operador `+` para concatenarlas en una nueva variable llamada `resultado`. Imprime `resultado`.",
        initialCode: "a = (10, 20, 30)\nb = (40, 50)\n\n# Concatena con + e imprime\n",
        outputCheck: "(10, 20, 30, 40, 50)",
        testCode: "assert 'resultado' in locals()\nassert type(resultado) is tuple\nassert resultado == (10, 20, 30, 40, 50)",
        hint: "resultado = a + b\nprint(resultado)"
      },
      {
        id: 499402,
        title: "Ejercicio 2: El orden de las tuplas importa",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Concatena `nombres = ('Ana', 'Beto')` y `apellidos = ('García', 'López')`, pero **primero los apellidos y luego los nombres**. Guarda el resultado en `combinado` e imprímelo.",
        initialCode: "nombres = ('Ana', 'Beto')\napellidos = ('García', 'López')\n\n# Concatena: apellidos primero, nombres después\n",
        outputCheck: "('García', 'López', 'Ana', 'Beto')",
        testCode: "assert 'combinado' in locals()\nassert type(combinado) is tuple\nassert combinado == ('García', 'López', 'Ana', 'Beto')",
        hint: "combinado = apellidos + nombres\nprint(combinado)"
      },
      {
        id: 499403,
        title: "Ejercicio 3: Acumulación con +=",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Comienza con `inventario = ('manzana', 'pera')`. Usa el operador `+=` para añadirle la tupla `('naranja', 'uva')`. Imprime `inventario` al final.",
        initialCode: "inventario = ('manzana', 'pera')\n\n# Usa += para añadir los nuevos frutas e imprime\n",
        outputCheck: "('manzana', 'pera', 'naranja', 'uva')",
        testCode: "assert 'inventario' in locals()\nassert type(inventario) is tuple\nassert inventario == ('manzana', 'pera', 'naranja', 'uva')",
        hint: "inventario += ('naranja', 'uva')\nprint(inventario)"
      },
      {
        id: 499404,
        title: "Ejercicio 4: Tupla + Lista con tuple()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes `colores_tupla = ('rojo', 'verde')` y `mas_colores = ['azul', 'amarillo']` (una lista). Convierte `mas_colores` con `tuple()` y concatena ambas estructuras en `paleta`. Imprime `paleta`.",
        initialCode: "colores_tupla = ('rojo', 'verde')\nmas_colores = ['azul', 'amarillo']\n\n# Convierte la lista con tuple() y concatena\n",
        outputCheck: "('rojo', 'verde', 'azul', 'amarillo')",
        testCode: "assert 'paleta' in locals()\nassert type(paleta) is tuple\nassert paleta == ('rojo', 'verde', 'azul', 'amarillo')",
        hint: "paleta = colores_tupla + tuple(mas_colores)\nprint(paleta)"
      },
      {
        id: 499405,
        title: "Ejercicio 5: Reto combinado",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Construye la tupla final `equipo` en **dos pasos**:\n1. Usa `+=` para agregar `('Diana', 'Eduardo')` a `equipo = ('Ana', 'Beto', 'Carlos')`.\n2. Luego usa `+` con `tuple(['Fernanda'])` para añadir el último elemento de una lista.\nImprime `equipo` al final.",
        initialCode: "equipo = ('Ana', 'Beto', 'Carlos')\n\n# Paso 1: usa += para agregar a Diana y Eduardo\n# Paso 2: usa + tuple() para agregar a Fernanda\n# Imprime equipo\n",
        outputCheck: "('Ana', 'Beto', 'Carlos', 'Diana', 'Eduardo', 'Fernanda')",
        testCode: "assert 'equipo' in locals()\nassert type(equipo) is tuple\nassert equipo == ('Ana', 'Beto', 'Carlos', 'Diana', 'Eduardo', 'Fernanda')",
        hint: "equipo += ('Diana', 'Eduardo')\nequipo = equipo + tuple(['Fernanda'])\nprint(equipo)"
      }
    ]
  },
  {
    id: 4995,
    title: "La función zip()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es la función zip()?

La función integrada \`zip()\` se utiliza para **combinar elementos de varias secuencias o colecciones iterables** (listas, tuplas, cadenas de texto, rangos) en grupos ordenados.

Esta función crea un **iterador** que genera tuplas donde:
- El **primer elemento** de cada colección forma la primera tupla.
- El **segundo elemento** de cada colección forma la segunda tupla, y así sucesivamente.

\`\`\`python
nombres = ("Luis", "Diego", "Ana")
edades  = [30, 25, 28]

combination = zip(nombres, edades)
\`\`\`

---

## 2. Regla de la Secuencia Más Corta (Corte Automático)

> **⚠️ Regla clave:** Si las colecciones tienen longitudes diferentes, \`zip()\` se **detiene automáticamente** cuando se agotan los elementos de la secuencia más corta. Los elementos sobrantes de las secuencias más largas son **ignorados por completo**.

\`\`\`python
nombres = ("Luis", "Diego")       # 2 elementos
edades  = [30, 25, 40, 18]        # 4 elementos

# Solo se generarán 2 tuplas, porque 'nombres' tiene 2 elementos
resultado = list(zip(nombres, edades))
print(resultado)  # [('Luis', 30), ('Diego', 25)]
\`\`\`

---

## 3. El Objeto Iterador y su Conversión

\`zip()\` **no devuelve directamente una lista o tupla**, sino un **objeto iterador**. Si intentas imprimirlo directamente verás la dirección de memoria:

\`\`\`python
print(zip(nombres, edades))
# Resultado: <zip object at 0x...>
\`\`\`

Para poder visualizar o trabajar con el contenido, es obligatorio **convertirlo**:

| Conversión | Función | Resultado |
| :--- | :--- | :--- |
| Lista de tuplas | \`list(zip(...))\` | \`[('Luis', 30), ('Diego', 25)]\` |
| Tupla de tuplas | \`tuple(zip(...))\` | \`(('Luis', 30), ('Diego', 25))\` |

---

## 4. zip() con el Ciclo for (Procesamiento en Paralelo)

Una de las aplicaciones más poderosas de \`zip()\` es la **sincronización de datos dentro de bucles**. Se pueden declarar **tantas variables de control como colecciones** se estén emparejando, separadas por comas:

\`\`\`python
nombres = ("Luis", "Diego", "Andrés", "Carlos")
edades  = [15, 30, 26, 12, 40]      # 5 elementos (el 40 será ignorado)
texto   = "Wikipedia"               # 9 caracteres

for nombre, edad, letra in zip(nombres, edades, texto):
    print(nombre, edad, letra)

# Salida:
# Luis 15 W
# Diego 30 i
# Andrés 26 k
# Carlos 12 i
\`\`\`

En cada iteración los índices **avanzan en paralelo**, distribuyendo de forma ordenada los valores correspondientes sin necesidad de usar contadores manuales.`,
    exercises: [
      {
        id: 499501,
        title: "Ejercicio 1: zip() básico con list()",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes dos colecciones: `nombres = ('Ana', 'Beto', 'Carlos')` y `edades = [28, 35, 22]`.\nUsa `zip()` junto con `list()` para combinarlas en una lista de tuplas. Guarda el resultado en `combinacion` e imprímelo.",
        initialCode: "nombres = ('Ana', 'Beto', 'Carlos')\nedades = [28, 35, 22]\n\n# Usa list(zip(...)) e imprime\n",
        outputCheck: "[('Ana', 28), ('Beto', 35), ('Carlos', 22)]",
        testCode: "assert 'combinacion' in locals()\nassert type(combinacion) is list\nassert combinacion == [('Ana', 28), ('Beto', 35), ('Carlos', 22)]",
        hint: "combinacion = list(zip(nombres, edades))\nprint(combinacion)"
      },
      {
        id: 499502,
        title: "Ejercicio 2: La regla del corte automático",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes `paises = ['México', 'Colombia', 'Argentina', 'Chile']` y `capitales = ('Ciudad de México', 'Bogotá')` (solo 2 elementos).\nCombínalas con `zip()` convirtiéndolas a **tupla** usando `tuple()`. Guarda el resultado en `resultado` e imprímelo. Observa cuántos pares se generan.",
        initialCode: "paises = ['México', 'Colombia', 'Argentina', 'Chile']\ncapitales = ('Ciudad de México', 'Bogotá')\n\n# Usa tuple(zip(...)) e imprime\n",
        outputCheck: "(('México', 'Ciudad de México'), ('Colombia', 'Bogotá'))",
        testCode: "assert 'resultado' in locals()\nassert type(resultado) is tuple\nassert resultado == (('México', 'Ciudad de México'), ('Colombia', 'Bogotá'))",
        hint: "resultado = tuple(zip(paises, capitales))\nprint(resultado)"
      },
      {
        id: 499503,
        title: "Ejercicio 3: zip() con ciclo for",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa un ciclo `for` con `zip()` para recorrer en paralelo las dos colecciones e imprimir cada par en el formato `nombre: puntos`.\n```\nAna: 95\nBeto: 87\nCarlos: 72\n```",
        initialCode: "nombres = ('Ana', 'Beto', 'Carlos')\npuntos = [95, 87, 72]\n\n# Usa for nombre, pts in zip(...): e imprime\n",
        outputCheck: "Ana: 95\nBeto: 87\nCarlos: 72",
        testCode: "assert 'nombres' in locals() and 'puntos' in locals()",
        hint: "for nombre, pts in zip(nombres, puntos):\n    print(f'{nombre}: {pts}')"
      },
      {
        id: 499504,
        title: "Ejercicio 4: Tres colecciones simultáneas",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa `zip()` en un ciclo `for` para combinar **tres colecciones** al mismo tiempo e imprimir cada fila con el formato `nombre (ciudad) - edad años`:\n```\nLuis (Madrid) - 30 años\nDiego (Lima) - 25 años\nAna (Bogotá) - 28 años\n```",
        initialCode: "nombres = ['Luis', 'Diego', 'Ana']\nciudades = ('Madrid', 'Lima', 'Bogotá')\nedades = [30, 25, 28]\n\n# Combina las 3 colecciones con zip() en el for\n",
        outputCheck: "Luis (Madrid) - 30 años\nDiego (Lima) - 25 años\nAna (Bogotá) - 28 años",
        testCode: "assert 'nombres' in locals() and 'ciudades' in locals() and 'edades' in locals()",
        hint: "for nombre, ciudad, edad in zip(nombres, ciudades, edades):\n    print(f'{nombre} ({ciudad}) - {edad} años')"
      },
      {
        id: 499505,
        title: "Ejercicio 5: zip() con colecciones asimétricas",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Tienes tres colecciones de longitudes distintas:\n- `nombres = ('Luis', 'Diego', 'Andrés', 'Carlos')` → 4 elementos\n- `edades = [15, 30, 26, 12, 40]` → 5 elementos (el 40 será ignorado)\n- `texto = 'Wikipedia'` → 9 caracteres (los 5 últimos serán ignorados)\n\nUsa un `for` con `zip()` para imprimir las 4 combinaciones resultado (una por línea con un espacio entre cada valor). Luego, **fuera del for**, imprime cuántos pares se generaron usando `len(list(zip(nombres, edades, texto)))`.",
        initialCode: "nombres = ('Luis', 'Diego', 'Andrés', 'Carlos')\nedades = [15, 30, 26, 12, 40]\ntexto = 'Wikipedia'\n\n# Ciclo for con zip() de 3 colecciones\n\n# Imprime el total de pares generados\n",
        outputCheck: "Luis 15 W\nDiego 30 i\nAndrés 26 k\nCarlos 12 i\n4",
        testCode: "assert 'nombres' in locals() and 'edades' in locals() and 'texto' in locals()",
        hint: "for n, e, t in zip(nombres, edades, texto):\n    print(n, e, t)\nprint(len(list(zip(nombres, edades, texto))))"
      }
    ]
  },
  {
    id: 4996,
    title: "Conjuntos: La función set()",
    module: "Conjuntos",
    theory: `## 1. ¿Qué es un Conjunto (set)?

Un conjunto (\`set\`) es una colección **desordenada** de elementos **únicos**. Tiene cuatro características fundamentales:

1. **Elementos Únicos (Sin Duplicados):** No permite valores repetidos. Si se introducen duplicados, Python los elimina automáticamente y de forma silenciosa, dejando solo una ocurrencia.
2. **Colección Desordenada:** Python **no garantiza ni mantiene** el orden de los elementos. Al imprimir un conjunto, los elementos pueden aparecer en cualquier orden y este puede cambiar entre ejecuciones.
3. **Estructura Mutable:** El conjunto como un todo es mutable: puedes añadir o remover elementos después de haberlo creado.
4. **Elementos Inmutables:** Los objetos que viven *dentro* del conjunto deben ser inmutables. Por eso, un conjunto **no puede contener listas, diccionarios ni otros conjuntos**. Solo acepta tipos inmutables: \`int\`, \`float\`, \`bool\`, \`str\` y \`tuple\`.

---

## 2. Formas de Crear un Conjunto

### Alternativa A: Con llaves \`{}\`
\`\`\`python
mi_conjunto = {1, 2, 3, 4, 5}
\`\`\`
> **⚠️ Importante:** Llaves vacías \`{}\` crean un **diccionario**, NO un conjunto. Para crear un conjunto vacío usa \`set()\`.

### Alternativa B: Con la función \`set()\`
La función \`set()\` convierte cualquier objeto iterable en un conjunto:
- **Sin argumentos** → genera un conjunto vacío: \`set()\`
- **Con una lista** → convierte y elimina duplicados
- **Con un string** → descompone la cadena carácter por carácter

---

## 3. Comportamientos Clave

### Eliminación automática de duplicados
\`\`\`python
conjunto_duplicados = {1, 5, 3, 1, 5, 1}
print(conjunto_duplicados)  # {1, 3, 5}
\`\`\`

### Solo elementos inmutables
\`\`\`python
# ✅ Correcto: la tupla es inmutable
conjunto_valido = {1, 2, (3, 4)}

# ❌ Error: la lista es mutable → TypeError
# conjunto_invalido = {1, 2, [3, 4]}
\`\`\`

### Conversión con \`set()\`
\`\`\`python
# Lista → Set (elimina duplicados, pierde el orden)
lista = [1, "Dos", 3, "Cuatro", 1]
conjunto = set(lista)
print(conjunto)  # {'Dos', 1, 3, 'Cuatro'} (orden variable)

# String → Set (descompone carácter por carácter)
conjunto_letras = set("Hola")
print(conjunto_letras)  # {'H', 'o', 'l', 'a'} (orden variable)
\`\`\``,
    exercises: [
      {
        id: 499601,
        title: "Ejercicio 1: Crear un conjunto con llaves",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea un conjunto llamado `frutas` usando llaves `{}` con los elementos `'manzana'`, `'banana'`, `'naranja'` y `'uva'`. Luego imprime el **tipo** de dato usando `type(frutas)` y su **longitud** usando `len(frutas)` en dos líneas separadas.",
        initialCode: "# Crea el conjunto frutas con 4 elementos\n\n# Imprime su tipo y su longitud\n",
        outputCheck: "<class 'set'>\n4",
        testCode: "assert 'frutas' in locals()\nassert type(frutas) is set\nassert len(frutas) == 4\nassert 'manzana' in frutas and 'banana' in frutas",
        hint: "frutas = {'manzana', 'banana', 'naranja', 'uva'}\nprint(type(frutas))\nprint(len(frutas))"
      },
      {
        id: 499602,
        title: "Ejercicio 2: Eliminación automática de duplicados",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea el conjunto `numeros = {1, 5, 3, 1, 5, 1, 3, 2}` con muchos duplicados. Imprime `numeros` y observa que Python elimina los repetidos automáticamente. Luego imprime `len(numeros)` para verificar cuántos elementos únicos quedaron.",
        initialCode: "# Crea el conjunto con duplicados e imprime\n\n# Imprime su longitud\n",
        outputCheck: "4",
        testCode: "assert 'numeros' in locals()\nassert type(numeros) is set\nassert len(numeros) == 4\nassert numeros == {1, 2, 3, 5}",
        hint: "numeros = {1, 5, 3, 1, 5, 1, 3, 2}\nprint(numeros)\nprint(len(numeros))"
      },
      {
        id: 499603,
        title: "Ejercicio 3: Conjunto vacío con set()",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea un **conjunto vacío** correctamente usando `set()` (no llaves `{}`). Guárdalo en `vacio`. Luego imprime `type(vacio)` para comprobar que es un `set` y no un `dict`.",
        initialCode: "# Crea el conjunto vacío de forma correcta\n\n# Imprime su tipo\n",
        outputCheck: "<class 'set'>",
        testCode: "assert 'vacio' in locals()\nassert type(vacio) is set\nassert len(vacio) == 0",
        hint: "vacio = set()\nprint(type(vacio))"
      },
      {
        id: 499604,
        title: "Ejercicio 4: Convertir lista a conjunto con set()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes la lista `colores = ['rojo', 'azul', 'verde', 'azul', 'rojo', 'amarillo']` con valores repetidos. Usa `set()` para convertirla a un conjunto, guárdalo en `colores_unicos` e imprímelo. Luego imprime `len(colores_unicos)` para confirmar cuántos colores únicos hay.",
        initialCode: "colores = ['rojo', 'azul', 'verde', 'azul', 'rojo', 'amarillo']\n\n# Convierte a conjunto e imprime\n\n# Imprime la longitud\n",
        outputCheck: "4",
        testCode: "assert 'colores_unicos' in locals()\nassert type(colores_unicos) is set\nassert len(colores_unicos) == 4\nassert 'rojo' in colores_unicos and 'azul' in colores_unicos",
        hint: "colores_unicos = set(colores)\nprint(colores_unicos)\nprint(len(colores_unicos))"
      },
      {
        id: 499605,
        title: "Ejercicio 5: set() con string y tupla interna",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Realiza dos operaciones:\n1. Convierte el string `'python'` a un conjunto usando `set()`. Guárdalo en `letras` e imprime su longitud (deben ser 6 letras únicas).\n2. Crea el conjunto `mixto = {10, 3.14, 'código', (1, 2)}` que combina `int`, `float`, `str` y una `tuple` (todos inmutables). Imprime `type(mixto)` y `len(mixto)`.",
        initialCode: "# Parte 1: string a conjunto\n\n# Parte 2: conjunto con tipos mixtos\n",
        outputCheck: "6\n<class 'set'>\n4",
        testCode: "assert 'letras' in locals()\nassert type(letras) is set\nassert len(letras) == 6\nassert 'mixto' in locals()\nassert type(mixto) is set\nassert len(mixto) == 4",
        hint: "letras = set('python')\nprint(len(letras))\nmixto = {10, 3.14, 'código', (1, 2)}\nprint(type(mixto))\nprint(len(mixto))"
      }
    ]
  },
  {
    id: 4997,
    title: "Subconjuntos: el método issubset()",
    module: "Conjuntos",
    theory: `## 1. ¿Qué es un Subconjunto?

Un subconjunto es un conjunto que contiene únicamente elementos que también están presentes en otro conjunto más grande.

Si tenemos dos conjuntos **A** y **B**, se dice que **B es subconjunto de A** si cada elemento de B está presente dentro de A. Para validar un subconjunto siempre se comparan al menos dos estructuras.

> **Convención:** El conjunto evaluado (el potencialmente menor) siempre va a la **izquierda**, y el conjunto contenedor (el potencialmente mayor) va a la **derecha**.

---

## 2. Tres herramientas para validar subconjuntos

### A. El Método \`.issubset()\`

Comprueba si el conjunto sobre el cual se invoca el método es subconjunto del que se pasa como argumento.

\`\`\`python
conjunto_b.issubset(conjunto_a)
\`\`\`

- Devuelve \`True\` si **todos** los elementos de B están en A.
- Devuelve \`False\` si algún elemento de B no existe en A.
- Si ambos conjuntos son **exactamente iguales**, retorna \`True\`.

---

### B. El Operador de Subconjunto Inclusivo (\`<=\`)

Funciona exactamente igual que \`.issubset()\`. Permite la posibilidad de que los dos conjuntos sean idénticos.

\`\`\`python
conjunto_b <= conjunto_a  # True si B ⊆ A (incluyendo igualdad)
\`\`\`

---

### C. El Operador de Subconjunto Estricto (\`<\`)

Valida que B sea subconjunto de A bajo la **condición estricta de que no sean iguales**. Si A tiene más elementos que B → \`True\`. Si son idénticos → \`False\`.

\`\`\`python
conjunto_b < conjunto_a  # True solo si B ⊂ A y B ≠ A
\`\`\`

---

## 3. Tabla Comparativa de los Tres Casos

| Escenario | \`issubset()\` | \`<=\` | \`<\` |
| :--- | :---: | :---: | :---: |
| B tiene solo elementos de A (B más pequeño) | \`True\` | \`True\` | \`True\` |
| B tiene algún elemento fuera de A | \`False\` | \`False\` | \`False\` |
| B y A son exactamente iguales | \`True\` | \`True\` | \`False\` |

\`\`\`python
conjunto_a = {1, 2, 3, 4, 5}
conjunto_b = {2, 5}

print(conjunto_b.issubset(conjunto_a))  # True
print(conjunto_b <= conjunto_a)          # True
print(conjunto_b < conjunto_a)           # True
\`\`\``,
    exercises: [
      {
        id: 499701,
        title: "Ejercicio 1: issubset() básico",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dados `conjunto_a = {1, 2, 3, 4, 5}` y `conjunto_b = {2, 5}`, usa el método `.issubset()` para comprobar si `conjunto_b` es subconjunto de `conjunto_a`. Guarda el resultado en `resultado` e imprímelo.",
        initialCode: "conjunto_a = {1, 2, 3, 4, 5}\nconjunto_b = {2, 5}\n\n# Usa .issubset() e imprime\n",
        outputCheck: "True",
        testCode: "assert 'resultado' in locals()\nassert resultado == True",
        hint: "resultado = conjunto_b.issubset(conjunto_a)\nprint(resultado)"
      },
      {
        id: 499702,
        title: "Ejercicio 2: issubset() retorna False",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dados `conjunto_a = {1, 2, 3, 4, 5}` y `conjunto_b = {2, 0}` (el `0` **no** existe en A), usa `.issubset()` para verificarlo. Guarda el resultado en `resultado` e imprímelo. Debería ser `False`.",
        initialCode: "conjunto_a = {1, 2, 3, 4, 5}\nconjunto_b = {2, 0}\n\n# Verifica con issubset() e imprime\n",
        outputCheck: "False",
        testCode: "assert 'resultado' in locals()\nassert resultado == False",
        hint: "resultado = conjunto_b.issubset(conjunto_a)\nprint(resultado)"
      },
      {
        id: 499703,
        title: "Ejercicio 3: Operador <= (Inclusivo)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dados `a = {1, 2, 3, 4, 5}` y `b = {3, 2, 4, 5, 1}` (los mismos elementos, distinto orden), usa el operador `<=` para comprobar si `b` es subconjunto inclusivo de `a`. Guarda el resultado en `inclusivo` e imprímelo. Luego usa `==` para comprobar si son iguales y guárdalo en `son_iguales` e imprímelo.",
        initialCode: "a = {1, 2, 3, 4, 5}\nb = {3, 2, 4, 5, 1}\n\n# Comprueba con <= y con ==\n",
        outputCheck: "True\nTrue",
        testCode: "assert 'inclusivo' in locals() and 'son_iguales' in locals()\nassert inclusivo == True\nassert son_iguales == True",
        hint: "inclusivo = b <= a\nson_iguales = b == a\nprint(inclusivo)\nprint(son_iguales)"
      },
      {
        id: 499704,
        title: "Ejercicio 4: Operador < (Estricto)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "La diferencia clave entre `<=` y `<` es lo que ocurre cuando los conjuntos son iguales. Prueba ambos operadores con dos configuraciones:\n1. `a = {1, 2, 3, 4, 5}` y `b = {2, 5}` → imprime `b < a` (deben ser distintos)\n2. `c = {1, 2, 3}` y `d = {1, 2, 3}` → imprime `d < c` (son iguales)\n\nDeben imprimirse dos resultados en líneas separadas.",
        initialCode: "a = {1, 2, 3, 4, 5}\nb = {2, 5}\nc = {1, 2, 3}\nd = {1, 2, 3}\n\n# Imprime b < a y d < c\n",
        outputCheck: "True\nFalse",
        testCode: "assert {2, 5} < {1, 2, 3, 4, 5}\nassert not ({1,2,3} < {1,2,3})",
        hint: "print(b < a)\nprint(d < c)"
      },
      {
        id: 499705,
        title: "Ejercicio 5: Los tres métodos comparados",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dados `conjunto_a = {1, 2, 3, 4, 5}` y `conjunto_b = {2, 5}`, imprime los resultados de los **tres métodos de validación** en este orden y formato exacto:\n```\nUsando issubset(): True\nUsando <=: True\nUsando <: True\n```",
        initialCode: "conjunto_a = {1, 2, 3, 4, 5}\nconjunto_b = {2, 5}\n\n# Imprime los tres resultados con f-strings\n",
        outputCheck: "Usando issubset(): True\nUsando <=: True\nUsando <: True",
        testCode: "assert conjunto_b.issubset(conjunto_a) == True\nassert (conjunto_b <= conjunto_a) == True\nassert (conjunto_b < conjunto_a) == True",
        hint: "print(f'Usando issubset(): {conjunto_b.issubset(conjunto_a)}')\nprint(f'Usando <=: {conjunto_b <= conjunto_a}')\nprint(f'Usando <: {conjunto_b < conjunto_a}')"
      }
    ]
  },
  {
    id: 4998,
    title: "Superconjuntos: el método issuperset()",
    module: "Conjuntos",
    theory: `## 1. ¿Qué es un Superconjunto?

Un superconjunto (*superset*) es un conjunto que **contiene a todos y cada uno de los elementos** de otro conjunto más pequeño.

Si tomamos dos conjuntos, **A** y **B**, se determina que **A es un superconjunto de B** si todos los elementos que componen al conjunto B se encuentran contenidos en su totalidad dentro del conjunto A.

> **Regla de Posición:** A diferencia de los subconjuntos, al verificar superconjuntos, la sintaxis exige situar de forma obligatoria el conjunto evaluado (el potencialmente **mayor**) a la **izquierda**, y el conjunto contenido (el potencialmente **menor**) a la **derecha**.

---

## 2. Tres Herramientas para Validar Superconjuntos

Python provee tres vías para verificar si una estructura es superconjunto de otra:

### A. El Método \`.issuperset()\`

Valida si el conjunto desde el que se invoca el método es un superconjunto de la estructura enviada como parámetro.

\`\`\`python
conjunto_a.issuperset(conjunto_b)
\`\`\`

- Retorna \`True\` si A abarca todo B.
- Retorna \`False\` si algún elemento de B falta en A.
- Si ambas colecciones son idénticas en contenido, devuelve \`True\`.

---

### B. El Operador Inclusivo (\`>=\`)

Actúa con idéntica lógica que \`.issuperset()\`. Dictamina si el conjunto izquierdo es superconjunto del derecho, tolerando la igualdad absoluta.

\`\`\`python
conjunto_a >= conjunto_b  # True si A ⊇ B (incluyendo igualdad)
\`\`\`

---

### C. El Operador Estricto (\`>\`)

Certifica si el conjunto izquierdo es superconjunto del derecho, bajo la premisa condicionante de que **no sean idénticos**.

\`\`\`python
conjunto_a > conjunto_b  # True solo si A ⊃ B y A ≠ B
\`\`\`

- Si A posee todos los datos de B y además cuenta con elementos adicionales (es estrictamente mayor) → \`True\`.
- Si ambos conjuntos poseen exactamente los mismos elementos → \`False\`.

---

## 3. Demostración Práctica

\`\`\`python
a = {1, 2, 3, 4, 5}
b = {2, 5}

# Caso 1: A es superconjunto real
print(a.issuperset(b))  # True
print(a >= b)           # True
print(a > b)            # True

# Caso 2: B tiene un elemento externo (-3)
b_falso = {-3, 5}
print(a.issuperset(b_falso)) # False

# Caso 3: Ambos conjuntos son idénticos
a_igual = {1, 2, 3}
b_igual = {1, 2, 3}
print(a_igual.issuperset(b_igual)) # True
print(a_igual >= b_igual)          # True
print(a_igual > b_igual)           # False (porque no es estrictamente mayor)
\`\`\``,
    exercises: [
      {
        id: 499801,
        title: "Ejercicio 1: issuperset() básico",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dados `a = {1, 2, 3, 4, 5}` y `b = {2, 5}`, usa el método `.issuperset()` para evaluar si `a` es superconjunto de `b`. Guarda el resultado en `resultado` e imprímelo.",
        initialCode: "a = {1, 2, 3, 4, 5}\nb = {2, 5}\n\n# Usa .issuperset() e imprime\n",
        outputCheck: "True",
        testCode: "assert 'resultado' in locals()\nassert resultado == True",
        hint: "resultado = a.issuperset(b)\nprint(resultado)"
      },
      {
        id: 499802,
        title: "Ejercicio 2: issuperset() con elemento externo",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes `a = {1, 2, 3, 4, 5}` y `b = {-3, 5}`. Nota que el `-3` rompe la condición. Evalúa con `.issuperset()` si `a` es superconjunto de `b`. Imprime el resultado directamente (debería ser `False`).",
        initialCode: "a = {1, 2, 3, 4, 5}\nb = {-3, 5}\n\n# Imprime el resultado de issuperset()\n",
        outputCheck: "False",
        testCode: "assert a.issuperset(b) == False",
        hint: "print(a.issuperset(b))"
      },
      {
        id: 499803,
        title: "Ejercicio 3: Operador >= con conjuntos idénticos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Los conjuntos `a` y `b` tienen los mismos elementos en distinto orden. Usa el operador `>=` para verificar si `a` es superconjunto inclusivo de `b`. Imprime el resultado (debería ser `True` porque tolera la igualdad).",
        initialCode: "a = {1, 2, 3, 4, 5}\nb = {5, 4, 3, 2, 1}\n\n# Usa >= e imprime\n",
        outputCheck: "True",
        testCode: "assert (a >= b) == True",
        hint: "print(a >= b)"
      },
      {
        id: 499804,
        title: "Ejercicio 4: Operador > (Estricto)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes `a = {1, 2, 3}` y `b = {1, 2, 3}`. Usa el operador estricto `>` para comprobar si `a` es estrictamente un superconjunto de `b`. Imprime el resultado (debería ser `False` porque son idénticos).",
        initialCode: "a = {1, 2, 3}\nb = {1, 2, 3}\n\n# Imprime a > b\n",
        outputCheck: "False",
        testCode: "assert (a > b) == False",
        hint: "print(a > b)"
      },
      {
        id: 499805,
        title: "Ejercicio 5: La sintaxis invertida",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "La lógica de `issuperset()` funciona al revés que la de `issubset()`. Dados `universo = {10, 20, 30, 40}` y `muestra = {20, 30}`:\n1. Imprime `universo.issuperset(muestra)` (debería ser `True`).\n2. Imprime `muestra.issubset(universo)` (debería ser `True` también).\nAmbas operaciones validan el mismo hecho desde perspectivas opuestas.",
        initialCode: "universo = {10, 20, 30, 40}\nmuestra = {20, 30}\n\n# 1. ¿El universo es superconjunto de la muestra?\n\n# 2. ¿La muestra es subconjunto del universo?\n",
        outputCheck: "True\nTrue",
        testCode: "assert universo.issuperset(muestra) == True\nassert muestra.issubset(universo) == True",
        hint: "print(universo.issuperset(muestra))\nprint(muestra.issubset(universo))"
      }
    ]
  },
  {
    id: 4999,
    title: "Unión de conjuntos – El método union()",
    module: "Conjuntos",
    theory: `## 1. ¿Qué es la Unión de Conjuntos?
La unión entre conjuntos es una operación lógica que combina todos los elementos de dos o más conjuntos en una sola estructura unificada.

El aspecto fundamental de esta operación en Python es que **mantiene únicamente los elementos únicos** de ambas colecciones. Dado que las estructuras de tipo conjunto (\`set\`) no admiten datos duplicados, si un elemento se encuentra repetido en ambos conjuntos originales, en el resultado final figurará una sola vez. Además, el orden en el que se fusionen las estructuras no altera el resultado, dado que los conjuntos son colecciones desordenadas de datos.

## 2. Métodos de Implementación en Python
Python dispone de dos alternativas para ejecutar la unión de datos entre conjuntos:

### A. El Método union()
- **Sintaxis**: \`conjunto_A.union(conjunto_B)\`
- **Comportamiento**: Se invoca el método desde el primer conjunto y se pasa el segundo conjunto como argumento dentro de los paréntesis. Genera y retorna un nuevo conjunto con la combinación limpia de los datos.

### B. El Operador Pipe (|)
- **Sintaxis**: \`conjunto_A | conjunto_B\`
- **Comportamiento**: Realiza exactamente la misma función lógica que el método \`union()\` pero de forma más compacta, situando el carácter de barra vertical (\`|\`) entre ambos operandos.

## 3. Ejemplo de Código
\`\`\`python
conjunto_a = {1, 2, 3}
conjunto_b = {3, 4, 5}

# Usando .union()
union_conjuntos = conjunto_a.union(conjunto_b)

# Usando el operador Pipe (|)
union_conjuntos_operador = conjunto_b | conjunto_a

print(union_conjuntos)          # Output: {1, 2, 3, 4, 5}
print(union_conjuntos_operador) # Output: {1, 2, 3, 4, 5}
\`\`\`
La operación de unión resulta esencial en programación cuando se requiere consolidar orígenes de datos distintos y garantizar de forma automatizada que no existan registros duplicados en el consolidado final.`,
    exercises: [
      {
        id: 499901,
        title: "Ejercicio 1: Unión básica con union()",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dados dos conjuntos \`equipo_a = {'Ana', 'Luis'}\` y \`equipo_b = {'Luis', 'María'}\`, utiliza el método \`union()\` para unirlos y guarda el resultado en una variable llamada \`todos\`. Finalmente, imprime \`todos\`.",
        initialCode: "equipo_a = {'Ana', 'Luis'}\nequipo_b = {'Luis', 'María'}\n\n# Usa union() y guarda en 'todos'\n\n# Imprime 'todos'\n",
        outputCheck: "",
        testCode: "assert 'todos' in locals()\nassert todos == {'Ana', 'Luis', 'María'}\nassert 'union' in __source__",
        hint: "todos = equipo_a.union(equipo_b)\nprint(todos)"
      },
      {
        id: 499902,
        title: "Ejercicio 2: Unión con operador Pipe (|)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dadas las mismas estructuras de equipos, utiliza ahora el operador Pipe (\`|\`) para unir \`equipo_a\` y \`equipo_b\`. Almacena el resultado en la variable \`fusion\` y muéstrala en consola.",
        initialCode: "equipo_a = {'Ana', 'Luis'}\nequipo_b = {'Luis', 'María'}\n\n# Usa el operador | y guarda en 'fusion'\n\n# Imprime 'fusion'\n",
        outputCheck: "",
        testCode: "assert 'fusion' in locals()\nassert fusion == {'Ana', 'Luis', 'María'}\nassert '|' in __source__",
        hint: "fusion = equipo_a | equipo_b\nprint(fusion)"
      },
      {
        id: 499903,
        title: "Ejercicio 3: Unión de múltiples conjuntos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes tres conjuntos de números: \`A = {1, 2}\`, \`B = {2, 3}\` y \`C = {3, 4}\`. Puedes encadenar las uniones: por ejemplo, \`A | B | C\` o \`A.union(B).union(C)\`. Une los tres conjuntos y guarda el resultado en \`resultado\`. Luego imprímelo.",
        initialCode: "A = {1, 2}\nB = {2, 3}\nC = {3, 4}\n\n# Une los tres conjuntos en 'resultado'\n\n# Imprime el resultado\n",
        outputCheck: "",
        testCode: "assert 'resultado' in locals()\nassert resultado == {1, 2, 3, 4}",
        hint: "resultado = A | B | C\nprint(resultado)"
      }
    ]
  },
  {
    id: 49991,
    title: "Intersección de conjuntos – El método intersection()",
    module: "Conjuntos",
    theory: `## 1. ¿Qué es la Intersección de Conjuntos?
La intersección entre conjuntos es una operación lógica que permite identificar y extraer exclusivamente los **elementos en común** que comparten dos o más conjuntos.

El resultado de esta operación es un nuevo conjunto constituido únicamente por los valores que coinciden de manera simultánea en las colecciones evaluadas. Al igual que con la unión, la intersección es conmutativa; el orden en que se pasen los conjuntos no altera el resultado final.

### ¿Qué pasa si no hay elementos comunes?
Si se realiza la intersección entre dos colecciones que no comparten absolutamente ningún elemento, Python retornará un **conjunto vacío**. En la consola, el conjunto vacío no se representa con llaves vacías (\`{}\`), sino con la nomenclatura de la función \`set()\` para no confundirse con un diccionario vacío.

## 2. Métodos de Implementación en Python
Existen dos alternativas nativas para calcular la intersección entre conjuntos en Python:

### A. El Método \`intersection()\`
- **Sintaxis**: \`conjunto_A.intersection(conjunto_B)\`
- **Uso**: Se invoca el método desde el primer conjunto y se le pasa la segunda estructura como argumento dentro de los paréntesis.

### B. El Operador Ampersand (&)
- **Sintaxis**: \`conjunto_A & conjunto_B\`
- **Uso**: Ejecuta la misma función lógica que el método \`.intersection()\` pero con una notación matemática reducida, separando ambos operandos mediante el carácter \`&\`.

## 3. Ejemplo de Código
\`\`\`python
# Caso 1: Comparten los elementos 4 y 5
conjunto_a = {1, 2, 3, 4, 5}
conjunto_b = {4, 5, 6, 7, 8}

interseccion_metodo = conjunto_a.intersection(conjunto_b)
interseccion_operador = conjunto_b & conjunto_a

print(interseccion_metodo)    # {4, 5}
print(interseccion_operador)  # {4, 5}

# Caso 2: Sin elementos comunes
conjunto_c = {1, 2, 3}
conjunto_d = {6, 7, 8}

print(conjunto_c & conjunto_d)  # set()
\`\`\`
La operación de intersección es sumamente útil en la lógica de programación y la ciencia de datos, permitiendo realizar filtros cruzados para extraer únicamente las coincidencias o patrones que se repiten en diferentes repositorios de información.`,
    exercises: [
      {
        id: 499911,
        title: "Ejercicio 1: Extraer coincidencias",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes dos conjuntos de usuarios: \`python_devs = {'Ana', 'Luis', 'Pedro'}\` y \`js_devs = {'Luis', 'María', 'Ana'}\`. Utiliza el método \`intersection()\` para encontrar a los desarrolladores que programan en ambos lenguajes. Guarda el resultado en la variable \`fullstack\` y muéstralo en pantalla.",
        initialCode: "python_devs = {'Ana', 'Luis', 'Pedro'}\njs_devs = {'Luis', 'María', 'Ana'}\n\n# Encuentra la intersección con .intersection() y guárdalo en 'fullstack'\n\n# Imprime 'fullstack'\n",
        outputCheck: "",
        testCode: "assert 'fullstack' in locals()\nassert fullstack == {'Ana', 'Luis'}\nassert 'intersection' in __source__",
        hint: "fullstack = python_devs.intersection(js_devs)\nprint(fullstack)"
      },
      {
        id: 499912,
        title: "Ejercicio 2: El operador Ampersand (&)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dadas las mismas listas de desarrolladores, utiliza ahora el operador \`&\` para obtener las coincidencias entre \`python_devs\` y \`js_devs\`. Guarda el resultado en una variable \`comunes\` y muéstrala.",
        initialCode: "python_devs = {'Ana', 'Luis', 'Pedro'}\njs_devs = {'Luis', 'María', 'Ana'}\n\n# Utiliza el operador & y guarda en 'comunes'\n\n# Imprime 'comunes'\n",
        outputCheck: "",
        testCode: "assert 'comunes' in locals()\nassert comunes == {'Ana', 'Luis'}\nassert '&' in __source__",
        hint: "comunes = python_devs & js_devs\nprint(comunes)"
      },
      {
        id: 499913,
        title: "Ejercicio 3: ¿Y si no hay nada en común?",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Los conjuntos \`pares = {2, 4, 6}\` e \`impares = {1, 3, 5}\` no comparten números. Usa el operador \`&\` para intersectarlos, guarda el resultado en \`resultado\` e imprímelo. ¡Fíjate cómo imprime Python un conjunto vacío!",
        initialCode: "pares = {2, 4, 6}\nimpares = {1, 3, 5}\n\n# Intersecta ambos, guarda en 'resultado' e imprime\n",
        outputCheck: "",
        testCode: "assert 'resultado' in locals()\nassert resultado == set()",
        hint: "resultado = pares & impares\nprint(resultado)"
      }
    ]
  },
  {
    id: 49992,
    title: "Diferencia de conjuntos – El método difference()",
    module: "Conjuntos",
    theory: `## 1. ¿Qué es la Diferencia de Conjuntos?
La diferencia entre conjuntos es una operación matemática y lógica que permite **extraer los elementos que pertenecen exclusivamente a un conjunto inicial** pero que no forman parte de otro.

Dicho de otra manera, la diferencia entre dos conjuntos A y B dará como resultado una nueva estructura con todos los datos que están presentes en A **pero eliminando** aquellos que coincidan o se repitan en B.

### La importancia del orden (No conmutativa)
A diferencia de la unión o la intersección, la diferencia de conjuntos **NO es conmutativa**. El orden en el que se posicionen las variables altera por completo el resultado final:
- Si evaluamos la diferencia de A respecto a B, el programa devolverá los datos únicos del conjunto A.
- Si evaluamos la diferencia de B respecto a A, el programa devolverá los datos únicos del conjunto B.

### ¿Qué pasa si ambos conjuntos son iguales?
Si aplicamos esta operación entre dos estructuras que contienen exactamente los mismos elementos, la diferencia elimina la totalidad de los datos, dando como resultado un **conjunto vacío** (\`set()\`). En Python, se mostrará en pantalla bajo la nomenclatura de la función \`set()\`.

## 2. Métodos de Implementación en Python
Existen dos alternativas nativas para programar esta operación:

### A. El Método \`.difference()\`
- **Sintaxis**: \`conjunto_izquierda.difference(conjunto_derecha)\`
- **Uso**: El conjunto al que se le desea extraer la diferencia va al inicio (izquierda), seguido del punto y el método \`.difference()\`. El conjunto de comparación se envía dentro de los paréntesis.

### B. El Operador de Resta (\`-\`)
- **Sintaxis**: \`conjunto_izquierda - conjunto_derecha\`
- **Uso**: Realiza exactamente la misma acción aritmética-lógica que el método anterior, pero con una notación simplificada utilizando el signo de menos (\`-\`).

## 3. Ejemplo de Código
\`\`\`python
conjunto_a = {1, 2, 3, 4, 5}
conjunto_b = {4, 5, 6, 7, 8}

# Elementos exclusivos de A -> {1, 2, 3}
dif_metodo_ab = conjunto_a.difference(conjunto_b)
# También: dif_ab = conjunto_a - conjunto_b

# Elementos exclusivos de B -> {6, 7, 8}
dif_metodo_ba = conjunto_b.difference(conjunto_a)
# También: dif_ba = conjunto_b - conjunto_a

print(dif_metodo_ab)
print(dif_metodo_ba)
\`\`\`
La operación de diferencia es fundamental en depuración de datos, ya que permite, por ejemplo, aislar registros nuevos frente a registros antiguos o filtrar elementos que no cumplan con un criterio de exclusión específico.`,
    exercises: [
      {
        id: 499921,
        title: "Ejercicio 1: Diferencia con .difference()",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes dos inventarios: \`tienda_a = {'manzanas', 'peras', 'uvas'}\` y \`tienda_b = {'peras', 'kiwis'}\`. Usa el método \`.difference()\` para saber qué frutas tiene la \`tienda_a\` que **no** tiene la \`tienda_b\`. Guarda el resultado en \`solo_en_a\` e imprímelo.",
        initialCode: "tienda_a = {'manzanas', 'peras', 'uvas'}\ntienda_b = {'peras', 'kiwis'}\n\n# Usa .difference(), guarda en 'solo_en_a' e imprime\n",
        outputCheck: "",
        testCode: "assert 'solo_en_a' in locals()\nassert solo_en_a == {'manzanas', 'uvas'}\nassert 'difference' in __source__",
        hint: "solo_en_a = tienda_a.difference(tienda_b)\nprint(solo_en_a)"
      },
      {
        id: 499922,
        title: "Ejercicio 2: Diferencia con operador (-)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dadas las mismas tiendas, ahora averigua qué frutas tiene la \`tienda_b\` que **no** tiene la \`tienda_a\`. Esta vez, utiliza el operador de resta (\`-\`). Guarda el resultado en \`solo_en_b\` e imprímelo.",
        initialCode: "tienda_a = {'manzanas', 'peras', 'uvas'}\ntienda_b = {'peras', 'kiwis'}\n\n# Usa el operador -, guarda en 'solo_en_b' e imprime\n",
        outputCheck: "",
        testCode: "assert 'solo_en_b' in locals()\nassert solo_en_b == {'kiwis'}\nassert '-' in __source__",
        hint: "solo_en_b = tienda_b - tienda_a\nprint(solo_en_b)"
      },
      {
        id: 499923,
        title: "Ejercicio 3: Diferencia entre conjuntos iguales",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Calcula la diferencia entre dos conjuntos idénticos usando el operador \`-\`. Asigna el resultado a la variable \`resultado\` e imprímelo para observar cómo Python representa un conjunto vacío.",
        initialCode: "grupo1 = {10, 20, 30}\ngrupo2 = {10, 20, 30}\n\n# Resta grupo2 de grupo1, guarda en 'resultado' e imprime\n",
        outputCheck: "",
        testCode: "assert 'resultado' in locals()\nassert resultado == set()",
        hint: "resultado = grupo1 - grupo2\nprint(resultado)"
      },
      {
        id: 499924,
        title: "Ejercicio 4: La no conmutatividad",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Para comprobar que el orden importa, compara la diferencia en ambas direcciones. Dados \`a = {1, 2, 3}\` y \`b = {3, 4, 5}\`, calcula \`a - b\` y luego \`b - a\`. Finalmente, imprime un booleano que evalúe si ambos resultados son iguales usando \`==\`. El resultado impreso debe ser \`False\`.",
        initialCode: "a = {1, 2, 3}\nb = {3, 4, 5}\n\n# Obtén a - b, luego b - a, y verifica si son iguales imprimiendo el resultado de la comparación\n",
        outputCheck: "False",
        testCode: "assert (a - b) != (b - a)\nassert '==' in __source__",
        hint: "dif1 = a - b\ndif2 = b - a\nprint(dif1 == dif2)"
      }
    ]
  },
  {
    id: 49993,
    title: "Diferencia Simétrica – El método symmetric_difference()",
    module: "Conjuntos",
    theory: `## 1. ¿Qué es la Diferencia Simétrica?
La diferencia simétrica entre dos conjuntos (A y B) es una operación lógica que produce un nuevo conjunto que **contiene todos los elementos exclusivos de cada una de las colecciones** evaluadas.

En términos sencillos, toma los elementos que pertenecen únicamente a A y los elementos que pertenecen únicamente a B, **excluyendo por completo cualquier dato que tengan en común** (la intersección).

### Propiedad Conmutativa
A diferencia de la operación clásica de diferencia (\`-\`), la diferencia simétrica **sí es conmutativa**. Esto significa que el orden de los factores no altera el producto; obtendrás exactamente los mismos resultados si calculas la diferencia simétrica de A respecto a B o de B respecto a A.

## 2. Alternativas de Implementación en Python
Python nos ofrece dos formas nativas para computar esta operación entre dos colecciones de tipo set:

### A. El Método \`.symmetric_difference()\`
- **Sintaxis**: \`conjunto_A.symmetric_difference(conjunto_B)\`
- **Uso**: Se invoca el método adjunto al primer objeto de conjunto y se le transmite la segunda estructura como un argumento dentro de los paréntesis obligatorios.

### B. El Operador de Diferencia Simétrica (\`^\`)
- **Sintaxis**: \`conjunto_A ^ conjunto_B\`
- **Uso**: El operador de intercalación o acento circunflejo (\`^\`) ejecuta la misma funcionalidad lógica que el método pero con una notación simplificada.
> **Tip del teclado:** En la mayoría de teclados en español, el símbolo \`^\` se genera manteniendo presionada la tecla **Alt Gr**, pulsando la tecla donde se localiza la llave de apertura (\`{\`) y posteriormente presionando la barra espaciadora.

## 3. Ejemplo de Código
\`\`\`python
conjunto_a = {1, 2, 3, 4, 5}
conjunto_b = {4, 5, 6, 7, 8}

# Elementos comunes: {4, 5} -> Estos serán excluidos.
# Elementos exclusivos: {1, 2, 3, 6, 7, 8}

# Uso del método
dif_simetrica = conjunto_a.symmetric_difference(conjunto_b)

# Uso del operador (orden invertido para validar conmutatividad)
dif_simetrica_operador = conjunto_b ^ conjunto_a

print(dif_simetrica)           # {1, 2, 3, 6, 7, 8}
print(dif_simetrica_operador)  # {1, 2, 3, 6, 7, 8}
\`\`\`
La diferencia simétrica es de gran utilidad en el análisis y limpieza de datos, sobre todo cuando se requiere aislar las discrepancias puras o anomalías que no se repiten en dos fuentes de información independientes.`,
    exercises: [
      {
        id: 499931,
        title: "Ejercicio 1: Extraer diferencias con el método",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Imagina que tienes dos bases de correos: \`lista1 = {'a@mail.com', 'b@mail.com'}\` y \`lista2 = {'b@mail.com', 'c@mail.com'}\`. El correo 'b@mail.com' está duplicado. Usa el método \`.symmetric_difference()\` para obtener únicamente los correos que **no** se repiten. Guárdalo en \`unicos\` e imprímelo.",
        initialCode: "lista1 = {'a@mail.com', 'b@mail.com'}\nlista2 = {'b@mail.com', 'c@mail.com'}\n\n# Usa .symmetric_difference(), guarda en 'unicos' e imprime\n",
        outputCheck: "",
        testCode: "assert 'unicos' in locals()\nassert unicos == {'a@mail.com', 'c@mail.com'}\nassert 'symmetric_difference' in __source__",
        hint: "unicos = lista1.symmetric_difference(lista2)\nprint(unicos)"
      },
      {
        id: 499932,
        title: "Ejercicio 2: El operador circunflejo (^)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dados los conjuntos \`pares = {2, 4, 6}\` y \`multiplos_de_3 = {3, 6, 9}\`, el elemento en común es el 6. Usa el operador \`^\` para obtener la diferencia simétrica (todo excepto el 6). Guarda el resultado en \`diferentes\` e imprímelo.",
        initialCode: "pares = {2, 4, 6}\nmultiplos_de_3 = {3, 6, 9}\n\n# Usa el operador ^, guarda en 'diferentes' e imprime\n",
        outputCheck: "",
        testCode: "assert 'diferentes' in locals()\nassert diferentes == {2, 3, 4, 9}\nassert '^' in __source__",
        hint: "diferentes = pares ^ multiplos_de_3\nprint(diferentes)"
      },
      {
        id: 499933,
        title: "Ejercicio 3: Comprobar la conmutatividad",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "A diferencia de la resta común, la diferencia simétrica da el mismo resultado sin importar el orden. Calcula \`pares ^ multiplos_de_3\` y \`multiplos_de_3 ^ pares\`. Verifica si son iguales usando el operador \`==\` y guarda el valor booleano resultante en la variable \`son_iguales\`. Luego imprime la variable (debe ser \`True\`).",
        initialCode: "pares = {2, 4, 6}\nmultiplos_de_3 = {3, 6, 9}\n\n# Verifica la igualdad de la operación en ambos sentidos, guarda en 'son_iguales' e imprime\n",
        outputCheck: "True",
        testCode: "assert 'son_iguales' in locals()\nassert son_iguales == True\nassert '==' in __source__",
        hint: "son_iguales = (pares ^ multiplos_de_3) == (multiplos_de_3 ^ pares)\nprint(son_iguales)"
      }
    ]
  },
  {
    id: 49994,
    title: "Agregar un elemento a un conjunto – El método add()",
    module: "Conjuntos",
    theory: `## 1. ¿Cómo Funciona el Método add()?
El método \`add()\` se utiliza exclusivamente para **insertar un único elemento** dentro de un conjunto existente (\`set\`) en Python.

Esta operación cuenta con dos características fundamentales de comportamiento:

- **No admite duplicados**: Si intentas agregar un valor que ya se encuentra presente dentro de la colección, Python no realizará ninguna acción ni arrojará un error; simplemente ignorará la instrucción, ya que los conjuntos solo almacenan elementos únicos.
- **Argumento único**: Este método está diseñado para procesar un solo argumento de manera simultánea. No se puede usar para pasar una lista de elementos o múltiples parámetros separados por comas.

## 2. Sintaxis del Método
\`\`\`python
nombre_del_conjunto.add(elemento_a_agregar)
\`\`\`
El elemento enviado dentro de los paréntesis puede ser de diferentes **tipos de datos inmutables**, como cadenas de texto (\`str\`), números enteros o flotantes, booleanos, entre otros.

## 3. Ejemplo de Código
\`\`\`python
frutas = {"uva", "pera", "manzana"}

# Agregar un elemento nuevo (no duplicado)
frutas.add("naranja")
print(frutas)  # {"uva", "pera", "manzana", "naranja"}

# Intentar agregar un duplicado -> Python lo ignora silenciosamente
frutas.add("uva")
print(frutas)  # El conjunto permanece idéntico
\`\`\`
El método \`add()\` es una herramienta elemental para mutar conjuntos dinámicamente, blindando la estructura de datos automáticamente contra la entrada redundante de valores repetidos.`,
    exercises: [
      {
        id: 499941,
        title: "Ejercicio 1: Agregar un elemento nuevo",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes el conjunto \`colores = {'rojo', 'azul', 'verde'}\`. Utiliza el método \`.add()\` para agregar el color \`'amarillo'\`. Luego verifica que el tamaño del conjunto sea \`4\` imprimiendo \`len(colores)\`.",
        initialCode: "colores = {'rojo', 'azul', 'verde'}\n\n# Agrega 'amarillo' con .add()\n\n# Imprime len(colores)\n",
        outputCheck: "4",
        testCode: "assert 'amarillo' in colores\nassert len(colores) == 4\nassert 'add' in __source__",
        hint: "colores.add('amarillo')\nprint(len(colores))"
      },
      {
        id: 499942,
        title: "Ejercicio 2: Intentar agregar un duplicado",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes el conjunto \`numeros = {1, 2, 3}\`. Intenta agregar el número \`2\` (que ya existe) usando \`.add()\`. Luego imprime el tamaño del conjunto con \`len(numeros)\`. Comprueba que Python lo ignora silenciosamente y el tamaño sigue siendo \`3\`.",
        initialCode: "numeros = {1, 2, 3}\n\n# Intenta agregar el 2 con .add()\n\n# Imprime len(numeros)\n",
        outputCheck: "3",
        testCode: "assert len(numeros) == 3\nassert 2 in numeros\nassert 'add' in __source__",
        hint: "numeros.add(2)\nprint(len(numeros))"
      },
      {
        id: 499943,
        title: "Ejercicio 3: Agregar distintos tipos de datos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El método \`add()\` acepta cualquier tipo inmutable. Dado el conjunto vacío \`mi_set = set()\`, agrega en orden los siguientes elementos: el entero \`42\`, el booleano \`True\` y el string \`'Python'\`. Luego imprime el tamaño del conjunto con \`len(mi_set)\`. El resultado debe ser \`3\`.",
        initialCode: "mi_set = set()\n\n# Agrega 42, True y 'Python' con .add()\n\n# Imprime len(mi_set)\n",
        outputCheck: "3",
        testCode: "assert 42 in mi_set\nassert True in mi_set\nassert 'Python' in mi_set\nassert len(mi_set) == 3",
        hint: "mi_set.add(42)\nmi_set.add(True)\nmi_set.add('Python')\nprint(len(mi_set))"
      },
      {
        id: 499944,
        title: "Ejercicio 4: Solo un argumento a la vez",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Recuerda que \`.add()\` solo acepta **un** argumento. Construye el conjunto \`planetas = {'Marte', 'Venus'}\` y agrégale \`'Tierra'\` y \`'Júpiter'\` usando **dos llamadas separadas** al método \`.add()\`. Finalmente imprime \`len(planetas)\`. Debe ser \`4\`.",
        initialCode: "planetas = {'Marte', 'Venus'}\n\n# Agrega 'Tierra' y 'Júpiter' con dos llamadas a .add()\n\n# Imprime len(planetas)\n",
        outputCheck: "4",
        testCode: "assert 'Tierra' in planetas\nassert 'Júpiter' in planetas\nassert len(planetas) == 4\nassert __source__.count('.add(') >= 2",
        hint: "planetas.add('Tierra')\nplanetas.add('Júpiter')\nprint(len(planetas))"
      }
    ]
  },
  {
    id: 49995,
    title: "Agregar elementos a un conjunto – El método update()",
    module: "Conjuntos",
    theory: `## 1. ¿Cómo Funciona el Método update()?
A diferencia del método \`add()\` (que solo admite un valor individual), el método \`update()\` está diseñado específicamente para **agregar múltiples elementos a un conjunto de forma simultánea**.

Este método cuenta con tres reglas estrictas de comportamiento:

- **Acepta objetos iterables**: Puede recibir como argumento cualquier estructura de datos que se pueda recorrer, como listas, tuplas, diccionarios, otros conjuntos o incluso strings.
- **Omisión de duplicados**: Al fusionar los datos del objeto iterable, si algún valor ya existía previamente en el conjunto, Python lo omitirá automáticamente para preservar la unicidad de los elementos.
- **Un único argumento**: Solo permite pasar un objeto iterable a la vez dentro de sus paréntesis.

## 2. Sintaxis del Método
\`\`\`python
nombre_del_conjunto.update(objeto_iterable)
\`\`\`

## 3. Ejemplo de Código
\`\`\`python
colores = {"rojo", "verde", "azul"}
nuevos_colores = ["amarillo", "morado", "azul"]  # "azul" está duplicado

colores.update(nuevos_colores)

print(colores)  # {"rojo", "verde", "azul", "amarillo", "morado"}
# "azul" aparece solo una vez (el duplicado fue omitido automáticamente)
\`\`\`
El método \`update()\` es una solución óptima cuando requieres hacer la fusión masiva de colecciones asegurando la eliminación de duplicados sin necesidad de escribir bucles manuales.`,
    exercises: [
      {
        id: 499951,
        title: "Ejercicio 1: update() con una lista",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes el conjunto \`tecnologias = {'Python', 'JavaScript'}\` y la lista \`nuevas = ['TypeScript', 'Rust']\`. Usa \`.update()\` para agregar los elementos de la lista al conjunto. Luego imprime \`len(tecnologias)\`. El resultado debe ser \`4\`.",
        initialCode: "tecnologias = {'Python', 'JavaScript'}\nnuevas = ['TypeScript', 'Rust']\n\n# Usa .update() para agregar los elementos de 'nuevas'\n\n# Imprime len(tecnologias)\n",
        outputCheck: "4",
        testCode: "assert 'TypeScript' in tecnologias\nassert 'Rust' in tecnologias\nassert len(tecnologias) == 4\nassert 'update' in __source__",
        hint: "tecnologias.update(nuevas)\nprint(len(tecnologias))"
      },
      {
        id: 499952,
        title: "Ejercicio 2: update() omite duplicados",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes el conjunto \`letras = {'a', 'b', 'c'}\` y la lista \`extras = ['c', 'd', 'e']\`. La letra \`'c'\` ya existe en el conjunto. Usa \`.update()\` para fusionarlos y luego imprime \`len(letras)\`. El resultado debe ser \`5\` (no \`6\`), demostrando que el duplicado fue omitido.",
        initialCode: "letras = {'a', 'b', 'c'}\nextras = ['c', 'd', 'e']\n\n# Usa .update() para fusionar y luego imprime len(letras)\n",
        outputCheck: "5",
        testCode: "assert len(letras) == 5\nassert 'c' in letras\nassert 'd' in letras\nassert 'update' in __source__",
        hint: "letras.update(extras)\nprint(len(letras))"
      },
      {
        id: 499953,
        title: "Ejercicio 3: update() con una tupla",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El método \`update()\` acepta cualquier iterable, no solo listas. Dado el conjunto \`numeros = {1, 2, 3}\`, úsalo con la tupla \`(4, 5, 6)\` pasada directamente (sin guardarla en variable). Luego imprime \`len(numeros)\`. El resultado debe ser \`6\`.",
        initialCode: "numeros = {1, 2, 3}\n\n# Pasa la tupla (4, 5, 6) directamente a .update()\n\n# Imprime len(numeros)\n",
        outputCheck: "6",
        testCode: "assert len(numeros) == 6\nassert 4 in numeros and 5 in numeros and 6 in numeros\nassert 'update' in __source__",
        hint: "numeros.update((4, 5, 6))\nprint(len(numeros))"
      },
      {
        id: 499954,
        title: "Ejercicio 4: update() con otro conjunto",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Tienes dos conjuntos: \`equipo_1 = {'Ana', 'Luis'}\` y \`equipo_2 = {'Luis', 'Marta', 'Pedro'}\`. Usa \`.update()\` para fusionar \`equipo_2\` dentro de \`equipo_1\`. Luego imprime \`len(equipo_1)\`. El resultado debe ser \`4\` (Luis estaba en ambos, se cuenta una sola vez).",
        initialCode: "equipo_1 = {'Ana', 'Luis'}\nequipo_2 = {'Luis', 'Marta', 'Pedro'}\n\n# Fusiona equipo_2 dentro de equipo_1 con .update()\n\n# Imprime len(equipo_1)\n",
        outputCheck: "4",
        testCode: "assert len(equipo_1) == 4\nassert 'Marta' in equipo_1\nassert 'Pedro' in equipo_1\nassert 'update' in __source__",
        hint: "equipo_1.update(equipo_2)\nprint(len(equipo_1))"
      },
      {
        id: 499955,
        title: "Ejercicio 5: add() vs update()",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Demuestra la diferencia entre \`add()\` y \`update()\`. Empieza con \`mi_set = set()\`. Primero usa \`.add()\` para agregar el número \`10\`. Luego usa \`.update()\` para agregar la lista \`[20, 30, 40]\`. Imprime \`len(mi_set)\`. El resultado debe ser \`4\`.",
        initialCode: "mi_set = set()\n\n# Usa .add() para agregar 10\n\n# Usa .update() para agregar [20, 30, 40]\n\n# Imprime len(mi_set)\n",
        outputCheck: "4",
        testCode: "assert len(mi_set) == 4\nassert 10 in mi_set\nassert 20 in mi_set and 30 in mi_set and 40 in mi_set\nassert 'add' in __source__ and 'update' in __source__",
        hint: "mi_set.add(10)\nmi_set.update([20, 30, 40])\nprint(len(mi_set))"
      }
    ]
  },
  {
    id: 49996,
    title: "Eliminar elementos de un conjunto – Métodos remove() y discard()",
    module: "Conjuntos",
    theory: `## 1. Métodos para Eliminar Elementos en un Conjunto
En Python, disponemos de dos métodos principales para remover un valor específico de un conjunto, pero cada uno maneja de forma opuesta la ausencia de un dato:

### A. El Método \`remove()\`
- **Comportamiento**: Busca y elimina el elemento exacto provisto dentro de sus paréntesis.
- **Control de Errores (Crítico)**: Si intentas eliminar un elemento que **no existe** en el conjunto, Python detendrá la ejecución y arrojará un **\`KeyError\`**. Por esta razón, debes tener la total certeza de que el dato está presente antes de invocarlo.
- **Sintaxis**: \`conjunto.remove(elemento)\` — admite un único argumento por vez.

### B. El Método \`discard()\`
- **Comportamiento**: Cumple exactamente el mismo fin de remoción que el método anterior.
- **Control de Errores (Silencioso)**: Si el elemento a eliminar **no existe** en el conjunto, **no ocurrirá ningún error**; el flujo del script continuará de forma transparente y la colección mantendrá su estructura intacta. Es ideal cuando no tienes certeza de la existencia del dato.
- **Sintaxis**: \`conjunto.discard(elemento)\` — admite un único argumento por vez.

## 2. Tabla Comparativa

| Característica | \`remove()\` | \`discard()\` |
| :--- | :---: | :---: |
| Elimina el elemento si existe | ✅ | ✅ |
| Lanza \`KeyError\` si no existe | ✅ | ❌ |
| Fallo silencioso si no existe | ❌ | ✅ |

## 3. Ejemplo de Código
\`\`\`python
vocales = {"a", "e", "i", "o", "u"}

# remove() -> elimina exitosamente
vocales.remove("i")
print(vocales)  # {"a", "e", "o", "u"}

# discard() -> elemento inexistente, no hay error
vocales.discard("z")
print(vocales)  # {"a", "e", "o", "u"} (intacto)

# Blindar remove() con un condicional if-in
elemento = "z"
if elemento in vocales:
    vocales.remove(elemento)
    print(f"Eliminado: {vocales}")
else:
    print(f"{elemento} no está en el conjunto.")
\`\`\`
La selección de un método u otro dependerá de los requerimientos de tu algoritmo: si la ausencia de un dato representa una anomalía crítica que debe detener el proceso, usa \`remove()\`; si la ausencia es admisible y se debe continuar de forma limpia, usa \`discard()\`.`,
    exercises: [
      {
        id: 499961,
        title: "Ejercicio 1: remove() exitoso",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dado el conjunto \`frutas = {'manzana', 'pera', 'uva', 'kiwi'}\`, usa el método \`.remove()\` para eliminar \`'pera'\`. Luego imprime \`len(frutas)\`. El resultado debe ser \`3\`.",
        initialCode: "frutas = {'manzana', 'pera', 'uva', 'kiwi'}\n\n# Elimina 'pera' con .remove()\n\n# Imprime len(frutas)\n",
        outputCheck: "3",
        testCode: "assert 'pera' not in frutas\nassert len(frutas) == 3\nassert 'remove' in __source__",
        hint: "frutas.remove('pera')\nprint(len(frutas))"
      },
      {
        id: 499962,
        title: "Ejercicio 2: discard() con elemento existente",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dado el conjunto \`colores = {'rojo', 'verde', 'azul'}\`, usa \`.discard()\` para eliminar \`'verde'\`. Luego imprime \`len(colores)\`. El resultado debe ser \`2\`.",
        initialCode: "colores = {'rojo', 'verde', 'azul'}\n\n# Elimina 'verde' con .discard()\n\n# Imprime len(colores)\n",
        outputCheck: "2",
        testCode: "assert 'verde' not in colores\nassert len(colores) == 2\nassert 'discard' in __source__",
        hint: "colores.discard('verde')\nprint(len(colores))"
      },
      {
        id: 499963,
        title: "Ejercicio 3: discard() con elemento inexistente",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dado el conjunto \`numeros = {1, 2, 3}\`, usa \`.discard()\` para intentar eliminar el \`99\` (que no existe). Luego imprime \`len(numeros)\`. Comprueba que no hay error y el tamaño sigue siendo \`3\`.",
        initialCode: "numeros = {1, 2, 3}\n\n# Intenta eliminar el 99 con .discard() (no existe)\n\n# Imprime len(numeros)\n",
        outputCheck: "3",
        testCode: "assert len(numeros) == 3\nassert 'discard' in __source__",
        hint: "numeros.discard(99)\nprint(len(numeros))"
      },
      {
        id: 499964,
        title: "Ejercicio 4: Blindar remove() con if-in",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dado \`vocales = {'a', 'e', 'i', 'o', 'u'}\` y \`elemento = 'z'\`, usa un condicional \`if-in\` para verificar si \`elemento\` está en \`vocales\` antes de llamar a \`.remove()\`. Si no está, imprime exactamente: \`z no está en el conjunto.\`",
        initialCode: "vocales = {'a', 'e', 'i', 'o', 'u'}\nelemento = 'z'\n\n# Usa if-in para verificar antes de remove()\n",
        outputCheck: "z no está en el conjunto.",
        testCode: "assert len(vocales) == 5\nassert 'if' in __source__ and 'in' in __source__\nassert 'remove' in __source__",
        hint: "if elemento in vocales:\n    vocales.remove(elemento)\nelse:\n    print(f'{elemento} no está en el conjunto.')"
      },
      {
        id: 499965,
        title: "Ejercicio 5: remove() vs discard() comparados",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dado el conjunto \`letras = {'x', 'y', 'z'}\`:\n1. Elimina \`'x'\` con \`.remove()\`.\n2. Intenta eliminar \`'k'\` (inexistente) con \`.discard()\`.\n3. Finalmente imprime \`len(letras)\`.\nEl resultado debe ser \`2\`.",
        initialCode: "letras = {'x', 'y', 'z'}\n\n# 1. Usa remove() para eliminar 'x'\n\n# 2. Usa discard() para intentar eliminar 'k'\n\n# 3. Imprime len(letras)\n",
        outputCheck: "2",
        testCode: "assert 'x' not in letras\nassert len(letras) == 2\nassert 'remove' in __source__ and 'discard' in __source__",
        hint: "letras.remove('x')\nletras.discard('k')\nprint(len(letras))"
      }
    ]
  },
  {
    id: 49997,
    title: "Recorrer un conjunto con los ciclos for y while",
    module: "Conjuntos",
    theory: `## 1. La Restricción Clave de los Conjuntos
Antes de recorrer un conjunto, es vital comprender un concepto fundamental: **los conjuntos en Python son colecciones desordenadas y no indexables**.

Esto significa que los elementos no ocupan una posición fija o un índice numérico (0, 1, 2, etc.). Si intentas acceder directamente a un elemento usando corchetes (por ejemplo, \`nums[0]\`), Python detendrá el programa y arrojará un error de tipo **\`TypeError\`**. 

Debido a esto, las estrategias para recorrerlos varían drásticamente entre el ciclo \`for\` y el ciclo \`while\`.

## 2. Métodos de Recorrido

### A. Utilizando el ciclo \`for\` (Opción Recomendada)
Dado que el ciclo \`for\` en Python está diseñado de forma nativa para trabajar sobre objetos iterables, es capaz de extraer uno a uno los elementos de un conjunto sin necesidad de conocer su índice numérico. Es la vía **más corta, limpia y eficiente** para realizar esta tarea.

### B. Utilizando el ciclo \`while\` (Vía Alternativa)
El ciclo \`while\` depende obligatoriamente de un contador o un índice numérico para controlar sus iteraciones. Como los conjuntos no tienen índices, es imposible recorrer un conjunto directamente con un \`while\`.

**La Solución:** Primero se debe convertir el conjunto a una lista mediante la función \`list()\`. Una vez transformado en lista, los elementos ya son indexables y se puede aplicar la lógica convencional de un ciclo \`while\` incrementando un puntero (\`indice += 1\`). Aunque funciona, requiere mayor procesamiento y líneas de código redundantes.

## 3. Ejemplos de Código
\`\`\`python
nums = {1, 2, 3, 4, 5}

# ---------------------------------------------
# Recorrido Eficiente (FOR)
# ---------------------------------------------
for elemento in nums:
    print(elemento)

# ---------------------------------------------
# Recorrido Alternativo (WHILE)
# ---------------------------------------------
# Paso A: Convertir a lista
conjunto_lista = list(nums)

# Paso B: Inicializar índice
indice = 0

# Paso C: Condición de límite
while indice < len(conjunto_lista):
    elemento = conjunto_lista[indice]
    print(elemento)
    
    # Paso D: Incrementar el índice
    indice += 1
\`\`\`
En conclusión, a menos que exista un requerimiento sumamente específico que te obligue a condicionar las vueltas del bucle manualmente, **siempre debes optar por el ciclo \`for\`** para manipular conjuntos.`,
    exercises: [
      {
        id: 499971,
        title: "Ejercicio 1: El camino óptimo (for)",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Tienes el conjunto \`frutas = {'manzana', 'pera', 'uva'}\`. Usa el ciclo \`for\` para recorrerlo e imprimir cada fruta en la consola de manera directa.",
        initialCode: "frutas = {'manzana', 'pera', 'uva'}\n\n# Recorre el conjunto con un ciclo for e imprime cada elemento\n",
        outputCheck: "",
        testCode: "assert 'for' in __source__ and 'in' in __source__\nassert 'frutas' in __source__",
        hint: "for f in frutas:\n    print(f)"
      },
      {
        id: 499972,
        title: "Ejercicio 2: Evitando el TypeError",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El conjunto \`numeros = {10, 20, 30}\` no es indexable. Para poder imprimir su primer elemento sin un bucle, conviértelo a lista usando \`list()\` y guárdalo en \`lista_num\`. Luego, imprime el elemento en la posición \`0\` de esa nueva lista.",
        initialCode: "numeros = {10, 20, 30}\n\n# Conviértelo a lista y guárdalo en 'lista_num'\n\n# Imprime el elemento en el índice [0] de lista_num\n",
        outputCheck: "",
        testCode: "assert 'lista_num' in locals()\nassert type(lista_num) == list\nassert len(lista_num) == 3\nassert 'list(' in __source__",
        hint: "lista_num = list(numeros)\nprint(lista_num[0])"
      },
      {
        id: 499973,
        title: "Ejercicio 3: El camino largo (while)",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dado el conjunto \`colores = {'rojo', 'verde', 'azul'}\`, recórrelo utilizando un bucle \`while\`. Recuerda que primero debes convertirlo a lista, crear un índice que empiece en \`0\`, establecer la condición \`indice < len(lista)\`, imprimir cada elemento y sumarle \`1\` al índice en cada iteración.",
        initialCode: "colores = {'rojo', 'verde', 'azul'}\n\n# 1. Convierte a lista\n\n# 2. Inicializa tu índice en 0\n\n# 3. Construye el ciclo while para imprimir cada elemento\n",
        outputCheck: "",
        testCode: "assert 'while' in __source__\nassert 'list(' in __source__\nassert '=' in __source__",
        hint: "lista_colores = list(colores)\ni = 0\nwhile i < len(lista_colores):\n    print(lista_colores[i])\n    i += 1"
      }
    ]
  },
  {
    id: 50,
    title: "Diccionarios",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es un Diccionario en Python?
Un diccionario es una estructura de datos nativa que se utiliza para almacenar un conjunto de elementos **no ordenados** mediante una relación de **Clave-Valor** (\`key: value\`).

### Características fundamentales:
- **No ordenados**: Los elementos no se guardan en posiciones indexadas (como 0, 1, 2...), sino que se organizan internamente bajo sus claves.
- **Mutables**: Su contenido puede ser modificado (añadir, borrar o editar elementos) después de haber sido creado.
- **Homogéneos o Heterogéneos**: Pueden almacenar datos del mismo tipo o combinar enteros, cadenas, listas e incluso otros diccionarios como valores.

---

## 2. Sintaxis Básica y Buenas Prácticas
Para declarar un diccionario se utilizan llaves \`{}\`. Cada elemento se separa del siguiente por una coma \`,\`, y la clave se separa de su valor asociado por dos puntos \`:\`.

**Estándar de diseño (Buenas Prácticas):**
Al escribir código profesional, existe el estándar de tabular y realizar saltos de línea tras cada coma. Esto permite una lectura mucho más limpia y clara:

\`\`\`python
# Declaración de diccionario siguiendo las buenas prácticas
diccionario = {
    "clave_1": valor_1,
    "clave_2": valor_2
}
\`\`\`

---

## 3. Reglas de Oro sobre las Claves (Keys)

- **Evitar la combinación de tipos de datos**: Aunque Python permite mezclar claves enteras y de cadena, se desaconseja totalmente porque genera confusión y errores. Lo correcto es que todas las claves sean del mismo tipo.
- **Prohibido duplicar claves**: Las claves deben ser únicas. Si declaras dos elementos con la misma clave, Python no arrojará un error, sino que sobreescribirá el dato y se quedará únicamente con el último valor encontrado, ignorando los anteriores.

---

## 4. Ejemplos de uso

\`\`\`python
# 1. Diccionario vacío
diccionario_empty = {}

# 2. Diccionario homogéneo (Claves String)
diccionario_edades = {
    "Juan": 32,
    "Gerardo": 21,
    "Luis": 25
}

# 3. Diccionario heterogéneo (Distintos tipos de valores)
diccionario_datos = {
    "name": "Brenda",
    "Last name": "flores",
    "age": 22
}

# 4. Diccionario con estructuras complejas (Anidación)
diccionario_list = {
    "a": {"a": 1},
    "b": [1, 2, 3]
}
\`\`\`

**COMPORTAMIENTOS A EVITAR:**
\`\`\`python
# Incorrecto: Claves repetidas (se sobreescribe a 15)
diccionario_repetidas = {
    "Juan": 20,
    "Gerardo": 30,
    "Juan": 15
}

# No recomendado: Claves mixtas
diccionario_claves_mixtas = {
    1: 10,
    "Juan": 20,
    -2: "Hola"
}
\`\`\``,
    exercises: [
      {
        id: 5001,
        title: "Ejercicio 1: Tu primer diccionario",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Crea un diccionario llamado `mi_auto` que contenga dos pares clave-valor:\n- Clave `'marca'` con valor `'Toyota'`\n- Clave `'modelo'` con valor `2022`\nImprime el diccionario.",
        initialCode: "# Crea el diccionario mi_auto e imprímelo\n\n",
        outputCheck: "{'marca': 'Toyota', 'modelo': 2022}",
        testCode: "assert 'mi_auto' in locals(), \"Falta la variable 'mi_auto'\"\nassert isinstance(mi_auto, dict), \"'mi_auto' debe ser un diccionario\"\nassert mi_auto == {'marca': 'Toyota', 'modelo': 2022}, \"El diccionario no tiene los datos correctos\"",
        hint: "mi_auto = {\n    'marca': 'Toyota',\n    'modelo': 2022\n}\nprint(mi_auto)"
      },
      {
        id: 5002,
        title: "Ejercicio 2: Claves repetidas",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Dado el siguiente diccionario con claves repetidas, ¿qué valor crees que imprimirá para la clave `'A'`? Simplemente presiona 'Ejecutar' para comprobar que Python sobreescribe y se queda con el último valor.",
        initialCode: "letras = {\n    'A': 1,\n    'B': 2,\n    'A': 3\n}\n\n# Imprime el diccionario\nprint(letras)\n",
        outputCheck: "{'A': 3, 'B': 2}",
        testCode: "pass",
        hint: "No necesitas escribir nada nuevo, solo ejecuta y mira la consola."
      },
      {
        id: 5003,
        title: "Ejercicio 3: Diccionario Anidado",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea un diccionario llamado `estudiante`. Debe tener una clave `'nombre'` con valor `'Ana'` y otra clave `'notas'` cuyo valor sea **una lista** `[8, 9, 10]`. Luego imprímelo.",
        initialCode: "# Crea el diccionario anidado e imprímelo\n\n",
        outputCheck: "{'nombre': 'Ana', 'notas': [8, 9, 10]}",
        testCode: "assert 'estudiante' in locals(), \"Falta la variable 'estudiante'\"\nassert isinstance(estudiante, dict), \"'estudiante' debe ser un diccionario\"\nassert estudiante == {'nombre': 'Ana', 'notas': [8, 9, 10]}, \"Estructura incorrecta\"",
        hint: "estudiante = {\n    'nombre': 'Ana',\n    'notas': [8, 9, 10]\n}\nprint(estudiante)"
      }
    ]
  },
  {
    id: 51,
    title: "Consultar Diccionarios",
    module: "Estructuras de Datos",
    theory: `## 1. Sintaxis Básica de Acceso
A diferencia de las listas donde se accede por posiciones numéricas, en los diccionarios se accede a los valores utilizando sus respectivas claves (\`keys\`).

**Sintaxis:**
\`\`\`python
nombre_diccionario[clave]
\`\`\`
**Cómo funciona**: Python se dirige al diccionario, ubica la clave especificada y retorna el valor que tiene asociado.

> **Nota importante sobre las comillas:** Si las claves se definieron originalmente como textos (Strings), deben escribirse con comillas dentro de los corchetes de manera idéntica. Al combinarlo dentro de un f-string impreso, es mandatorio alternar el uso de comillas dobles externas con comillas simples internas (\`'clave'\`) para evitar que Python cierre la cadena antes de tiempo.

---

## 2. Acceso a Estructuras Complejas (Anidadas)
Cuando un diccionario almacena colecciones complejas como listas o diccionarios en su interior, es posible definir rutas de acceso concatenadas (utilizando varios pares de corchetes consecutivos) para extraer elementos específicos:

### Caso A: Buscar datos en una Lista interna
**Sintaxis**: \`diccionario["clave_lista"][indice]\`
**Lógica**: El primer corchete localiza la clave que guarda la lista. El segundo corchete indica la posición del índice numérico (empezando a contar desde cero).

### Caso B: Buscar datos en un Diccionario anidado
**Sintaxis**: \`diccionario["clave_raiz"]["clave_interna"]\`
**Lógica**: El primer corchete ingresa al diccionario secundario. El segundo corchete indica la clave específica de la subestructura.

---

## 3. El Error de Clave (KeyError)
Si intentas consultar una clave que no existe o no fue asignada previamente en el diccionario, Python detendrá la ejecución del programa y arrojará un error de tipo \`KeyError\`.

**Solución**: No hay que entrar en pánico. Las alternativas correctas son:
1. Modificar la consulta utilizando una clave que sí exista.
2. Añadir la clave faltante con un valor al objeto antes de proceder a la consulta.

---

## 4. Ejemplos de Práctica

\`\`\`python
diccionario_simple = {
    "a": 1,
    "e": 2
}
# Consulta de claves simples con comillas simples internas
print(f"Valor en clave 'a': {diccionario_simple['a']}")

diccionario_complejo = {
    "numbers": [18, 20, 28],
    "groups": {"a": 1, "b": 2}
}

# 1. Extrae el número 20 de la lista (Índice 1)
print(f"Elemento de la lista: {diccionario_complejo['numbers'][1]}")

# 2. Extrae el número 2 del sub-diccionario (Clave 'b')
print(f"Elemento del sub-diccionario: {diccionario_complejo['groups']['b']}")
\`\`\``,
    exercises: [
      {
        id: 5101,
        title: "Ejercicio 1: Acceso básico",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Dado el diccionario `persona`, extrae el valor asociado a la clave `'edad'` y guárdalo en la variable `su_edad`. Luego, imprime `su_edad`.",
        initialCode: "persona = {\n    'nombre': 'Luis',\n    'edad': 25\n}\n\n# Extrae la edad e imprímela\n",
        outputCheck: "25",
        testCode: "assert 'su_edad' in locals(), \"Falta la variable 'su_edad'\"\nassert su_edad == 25, \"El valor de 'su_edad' no es correcto\"",
        hint: "su_edad = persona['edad']\nprint(su_edad)"
      },
      {
        id: 5102,
        title: "Ejercicio 2: Evitando el KeyError",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El siguiente código intenta acceder a la clave `'apellido'`, pero esa clave no existe, lo que causa un `KeyError`. Cambia la consulta para que en su lugar acceda a la clave `'nombre'` y el programa funcione correctamente.",
        initialCode: "persona = {\n    'nombre': 'Luis',\n    'edad': 25\n}\n\n# Corrige el error\nprint(persona['apellido'])\n",
        outputCheck: "Luis",
        testCode: "pass",
        hint: "Cambia 'apellido' por 'nombre' dentro de los corchetes."
      },
      {
        id: 5103,
        title: "Ejercicio 3: Rutas complejas",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dado el diccionario `escuela` que tiene datos anidados, accede a la lista bajo la clave `'grados'` y extrae el **segundo elemento** de esa lista (índice 1, que es `10`). Guárdalo en la variable `grado_medio` e imprímelo.",
        initialCode: "escuela = {\n    'nombre': 'Secundaria 5',\n    'grados': [9, 10, 11]\n}\n\n# Extrae el número 10 de la lista anidada\n",
        outputCheck: "10",
        testCode: "assert 'grado_medio' in locals(), \"Falta la variable 'grado_medio'\"\nassert grado_medio == 10, \"No extrajiste el valor correcto (debe ser 10)\"",
        hint: "grado_medio = escuela['grados'][1]\nprint(grado_medio)"
      }
    ]
  },
  {
    id: 52,
    title: "El método items()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve el método items()?
Al trabajar con diccionarios en Python, generalmente se accede a los valores por medio de sus claves. Sin embargo, si se desconocen por completo qué claves o qué elementos componen un diccionario, Python provee el método \`items()\` para inspeccionarlo.

El método \`items()\` se utiliza para obtener todos los elementos del diccionario estructurados en una **lista de tuplas**, donde cada tupla contiene la pareja clave-valor (\`key, value\`).

> **Concepto de "Item"**: En Python, un *item* representa a la combinación o par indivisible de una clave y su respectivo valor.

---

## 2. Sintaxis y el objeto dict_items
La sintaxis básica para invocar este método es la siguiente:
\`\`\`python
nombre_diccionario.items()
\`\`\`

**El tipo de dato \`dict_items\`:**
Al ejecutar de forma directa el método, Python nos devuelve un objeto bajo la envoltura \`dict_items([...])\`. Aunque este objeto nos permite visualizar las parejas de claves y valores (muy útil para auditoría de datos), **no permite manipular o acceder de forma independiente a sus elementos** mediante índices numéricos (como \`[0]\` o \`[1]\`) de manera directa.

---

## 3. Solución: Conversión a lista pura
Para extraer la lista de tuplas y poder operar independientemente con los elementos por su índice de posición, se recurre al constructor \`list()\`. Al pasar el resultado de \`.items()\` por este constructor, se elimina la envoltura \`dict_items\` y se obtiene una lista indexable regular.

\`\`\`python
# Diccionario original
diccionario = {
    "a": 1,
    "b": 2,
    "c": 3
}

# 1. Uso directo del método .items()
# Retorna: dict_items([('a', 1), ('b', 2), ('c', 3)])
print(diccionario.items())

# 2. Conversión a lista pura
list_items = list(diccionario.items())

# Imprime: [('a', 1), ('b', 2), ('c', 3)]
print(list_items)

# 3. Acceso a un elemento por su índice posicional
# Consultamos el índice 1 (el segundo elemento): ('b', 2)
print(list_items[1])
\`\`\``,
    exercises: [
      {
        id: 5201,
        title: "Ejercicio 1: Visualizar items",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Utiliza el método `.items()` para obtener e imprimir todos los items del diccionario `colores`. Verás que el resultado incluye la envoltura `dict_items`.",
        initialCode: "colores = {'rojo': 1, 'verde': 2, 'azul': 3}\n\n# Imprime los items directamente\n",
        outputCheck: "dict_items([('rojo', 1), ('verde', 2), ('azul', 3)])",
        testCode: "pass",
        hint: "print(colores.items())"
      },
      {
        id: 5202,
        title: "Ejercicio 2: Conversión a lista",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Para poder manipular los items, conviértelos a una lista pura usando el constructor `list()`. Guarda el resultado en la variable `lista_colores` e imprímela.",
        initialCode: "colores = {'rojo': 1, 'verde': 2, 'azul': 3}\n\n# Convierte a lista y guárdalo en lista_colores\n",
        outputCheck: "[('rojo', 1), ('verde', 2), ('azul', 3)]",
        testCode: "assert 'lista_colores' in locals(), \"Falta la variable 'lista_colores'\"\nassert isinstance(lista_colores, list), \"'lista_colores' debe ser una lista\"\nassert lista_colores == [('rojo', 1), ('verde', 2), ('azul', 3)], \"La lista no contiene los items correctos\"",
        hint: "lista_colores = list(colores.items())\nprint(lista_colores)"
      },
      {
        id: 5203,
        title: "Ejercicio 3: Acceso por índice",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Ahora que sabes cómo convertirlo a lista, extrae e imprime el **tercer item** (el que corresponde a la clave `'azul'`) usando su índice posicional en la lista.",
        initialCode: "colores = {'rojo': 1, 'verde': 2, 'azul': 3}\n\n# Imprime el tercer elemento de la lista de items\n",
        outputCheck: "('azul', 3)",
        testCode: "pass",
        hint: "lista_colores = list(colores.items())\nprint(lista_colores[2])"
      }
    ]
  },
  {
    id: 53,
    title: "El método keys()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve el método keys()?
El método \`keys()\` se utiliza específicamente para extraer y obtener una lista con **todas las claves (keys)** que pertenecen a un diccionario.

Resulta una herramienta de gran utilidad en dos situaciones principales:
1. Cuando se desconoce por completo cuáles son las claves del diccionario sobre el cual se necesita trabajar.
2. Cuando se requiere realizar auditorías, iteraciones o procesamientos exclusivos sobre los nombres de los campos (las claves) ignorando temporalmente sus valores asociados.

---

## 2. Sintaxis y el objeto dict_keys
La sintaxis básica para invocar este método es la siguiente:
\`\`\`python
nombre_diccionario.keys()
\`\`\`

**El tipo de dato \`dict_keys\`:**
Al ejecutar de forma directa el método \`.keys()\`, Python nos devuelve un objeto iterable especial bajo la envoltura \`dict_keys([...])\`. Aunque este objeto nos permite visualizar qué claves existen, **no se pueden manipular o consultar sus elementos de manera independiente** usando índices posicionales (como \`[0]\` o \`[1]\`) de forma directa.

---

## 3. Solución: Conversión a lista pura
Para poder trabajar con las claves como elementos individuales e indexados, se utiliza nuevamente el constructor \`list()\`. Al envolver la sintaxis del método dentro de este constructor, se elimina el contenedor \`dict_keys\` y se genera una **lista regular** de Python.

\`\`\`python
# Diccionario original
diccionario = {
    "a": 1,
    "b": 2,
    "c": 3
}

# 1. Uso directo del método .keys()
# Retorna: dict_keys(['a', 'b', 'c'])
print(diccionario.keys())

# 2. Conversión a lista pura
lista_de_claves = list(diccionario.keys())

# Imprime: ['a', 'b', 'c']
print(lista_de_claves)

# 3. Acceso a una clave por su índice posicional
# Consultamos el índice 1 (el segundo elemento): 'b'
print(lista_de_claves[1])
\`\`\``,
    exercises: [
      {
        id: 5301,
        title: "Ejercicio 1: Extraer las claves",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Utiliza el método `.keys()` para obtener las claves del diccionario `usuario` e imprímelas. El resultado se mostrará bajo la envoltura `dict_keys`.",
        initialCode: "usuario = {'nombre': 'Ana', 'edad': 28, 'pais': 'México'}\n\n# Imprime las claves directamente\n",
        outputCheck: "dict_keys(['nombre', 'edad', 'pais'])",
        testCode: "pass",
        hint: "print(usuario.keys())"
      },
      {
        id: 5302,
        title: "Ejercicio 2: Conversión a lista regular",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Para poder operar sobre las claves individualmente, envuelve la llamada a `.keys()` en el constructor `list()` para obtener una lista normal. Guárdala en la variable `claves` e imprímela.",
        initialCode: "usuario = {'nombre': 'Ana', 'edad': 28, 'pais': 'México'}\n\n# Obtén la lista de claves pura\n",
        outputCheck: "['nombre', 'edad', 'pais']",
        testCode: "assert 'claves' in locals(), \"Falta la variable 'claves'\"\nassert isinstance(claves, list), \"La variable 'claves' debe ser una lista regular\"\nassert claves == ['nombre', 'edad', 'pais'], \"Los elementos de la lista no son correctos\"",
        hint: "claves = list(usuario.keys())\nprint(claves)"
      },
      {
        id: 5303,
        title: "Ejercicio 3: Acceso indexado",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Tras convertir las claves a lista, extrae la **última clave** de la lista usando índices negativos (`-1`) o contando su posición. Imprímela.",
        initialCode: "usuario = {'nombre': 'Ana', 'edad': 28, 'pais': 'México'}\n\n# Imprime la última clave de la lista\n",
        outputCheck: "pais",
        testCode: "pass",
        hint: "claves = list(usuario.keys())\nprint(claves[-1])"
      }
    ]
  },
  {
    id: 54,
    title: "El método values()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve el método values()?
Siguiendo la secuencia natural de la trilogía de métodos de inspección de diccionarios (tras \`items()\` y \`keys()\`), el método \`values()\` se enfoca en la extracción exclusiva de los datos almacenados.

Se utiliza para obtener una colección de **todos los valores** almacenados en el diccionario, ignorando por completo las claves que los identifican.

Es sumamente útil cuando:
- No te interesan los nombres de los campos (claves), sino únicamente los datos numéricos o textos almacenados.
- Necesitas realizar operaciones matemáticas (como sumas, promedios o búsquedas de máximos/mínimos) sobre los valores numéricos del diccionario.

---

## 2. Sintaxis y el objeto dict_values
La sintaxis para invocar este método sigue la misma estructura que los anteriores:
\`\`\`python
nombre_diccionario.values()
\`\`\`

**El contenedor \`dict_values\`:**
Al igual que \`keys()\` devuelve \`dict_keys\`, este método retorna un objeto especial envuelto bajo la nomenclatura \`dict_values([...])\`. Este objeto es un iterable de lectura, lo que significa que puedes ver los datos en pantalla, pero **no puedes acceder a un valor específico usando índices** (como \`[0]\` o \`[1]\`) de forma directa.

---

## 3. Conversión a lista con list()
Para liberar los datos de la envoltura \`dict_values\` y poder manipularlos individualmente por su posición, se emplea el constructor \`list()\`. Al realizar esta conversión, se obtiene una **lista indexada regular** de Python.

\`\`\`python
# Declaración de un diccionario base con 3 items
diccionario = {
    "a": 1,
    "b": 2,
    "c": 3
}

# 1. Uso directo del método .values()
# Retorna: dict_values([1, 2, 3])
print(diccionario.values())

# 2. Conversión a lista pura
lista_de_valores = list(diccionario.values())

# Imprime: [1, 2, 3]
print(lista_de_valores)

# 3. Acceso a un valor por su índice posicional
# Consultamos el índice 1 (el segundo valor): 2
print(lista_de_valores[1])
\`\`\``,
    exercises: [
      {
        id: 5401,
        title: "Ejercicio 1: Extraer los valores",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Utiliza el método `.values()` para obtener los valores del diccionario `calificaciones` e imprímelos. Observarás que vienen dentro del contenedor `dict_values`.",
        initialCode: "calificaciones = {'matematicas': 9, 'historia': 8, 'ciencias': 10}\n\n# Imprime los valores directamente\n",
        outputCheck: "dict_values([9, 8, 10])",
        testCode: "pass",
        hint: "print(calificaciones.values())"
      },
      {
        id: 5402,
        title: "Ejercicio 2: Conversión a lista pura",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Envuelve la llamada a `.values()` dentro del constructor `list()` para transformar el resultado en una lista regular de Python. Guárdala en la variable `lista_notas` e imprímela.",
        initialCode: "calificaciones = {'matematicas': 9, 'historia': 8, 'ciencias': 10}\n\n# Obtén la lista de notas pura\n",
        outputCheck: "[9, 8, 10]",
        testCode: "assert 'lista_notas' in locals(), \"Falta la variable 'lista_notas'\"\nassert isinstance(lista_notas, list), \"La variable 'lista_notas' debe ser una lista\"\nassert lista_notas == [9, 8, 10], \"Los elementos de la lista no son correctos\"",
        hint: "lista_notas = list(calificaciones.values())\nprint(lista_notas)"
      },
      {
        id: 5403,
        title: "Ejercicio 3: Promedio de notas",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Tras convertir los valores a una lista regular (`lista_notas`), accede a las notas usando sus índices (0, 1 y 2) para sumarlas y dividirlas entre 3. Guarda el resultado en `promedio` e imprímelo.",
        initialCode: "calificaciones = {'matematicas': 9, 'historia': 8, 'ciencias': 10}\n\n# Calcula el promedio sumando por índice y divide entre 3\n",
        outputCheck: "9.0",
        testCode: "assert 'promedio' in locals(), \"Falta la variable 'promedio'\"\nassert promedio == 9.0, \"El promedio calculado no es correcto\"",
        hint: "lista_notas = list(calificaciones.values())\npromedio = (lista_notas[0] + lista_notas[1] + lista_notas[2]) / 3\nprint(promedio)"
      }
    ]
  },
  {
    id: 55,
    title: "El método clear()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve el método clear()?
El método \`clear()\` se utiliza para **eliminar todos los elementos** (tanto las claves como sus valores) que se encuentran dentro de un diccionario.

### Características principales:
- **No destruye la variable**: A diferencia de otras operaciones que borran el objeto por completo de la memoria, \`clear()\` mantiene el diccionario vivo, pero completamente vacío.
- **Resultado**: Tras su ejecución, si se imprime el diccionario en consola, este se mostrará simplemente como un par de llaves vacías: \`{}\`.
- **Mutabilidad en acción**: Al ser los diccionarios objetos mutables, este método modifica directamente el diccionario original sin necesidad de reasignarlo a una nueva variable.

---

## 2. Sintaxis Básica
La sintaxis es sumamente directa y no requiere pasar ningún tipo de argumento dentro de los paréntesis:
\`\`\`python
nombre_diccionario.clear()
\`\`\`

---

## 3. Ejemplo Práctico

\`\`\`python
# Declaración de un diccionario base con datos de un usuario
diccionario_usuario = {
    "nombre": "Carlos",
    "apellido": "García",
    "edad": 28,
    "curso": "Python"
}

# 1. Mostrar el diccionario en su estado original con sus 4 elementos
print(f"Diccionario original: {diccionario_usuario}")

# 2. Aplicar el método .clear() para vaciar el contenido
diccionario_usuario.clear()

# 3. Mostrar el diccionario después de la limpieza
# El resultado en consola será un par de llaves vacías: {}
print(f"Diccionario después de aplicar clear(): {diccionario_usuario}")
\`\`\`

---

## 4. Diferencia clave con del
Aunque se profundizará en lecciones posteriores, es importante recordar esta diferencia fundamental:

- \`diccionario.clear()\`: Borra el contenido (deja el contenedor vacío \`{}\`). Puedes seguir usando la variable después.
- \`del diccionario\`: Borra la variable entera de la memoria del sistema. Si intentas llamarla después de un \`del\`, Python arrojará un error de tipo \`NameError\` porque la variable dejó de existir.`,
    exercises: [
      {
        id: 5501,
        title: "Ejercicio 1: Vaciar un diccionario",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Utiliza el método `.clear()` para vaciar completamente el diccionario `carrito`. Luego imprímelo para confirmar que ahora es `{}`.",
        initialCode: "carrito = {'manzana': 2, 'pan': 1, 'leche': 3}\n\n# Vacía el diccionario e imprímelo\n",
        outputCheck: "{}",
        testCode: "assert 'carrito' in locals(), \"Falta la variable 'carrito'\"\nassert isinstance(carrito, dict), \"La variable 'carrito' debe seguir siendo un diccionario\"\nassert carrito == {}, \"El diccionario no está vacío\"",
        hint: "carrito.clear()\nprint(carrito)"
      },
      {
        id: 5502,
        title: "Ejercicio 2: Comprobar la longitud",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Para confirmar que el método funciona correctamente, utiliza `len()` para imprimir la cantidad de elementos en `configuracion` **después** de haberle aplicado `.clear()`. Debe imprimir `0`.",
        initialCode: "configuracion = {'tema': 'oscuro', 'volumen': 80}\n\n# Aplica clear() e imprime su longitud\n",
        outputCheck: "0",
        testCode: "pass",
        hint: "configuracion.clear()\nprint(len(configuracion))"
      },
      {
        id: 5503,
        title: "Ejercicio 3: Mutabilidad en la misma variable",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Aplica `.clear()` al diccionario `datos`. Posteriormente, agrégale un nuevo par clave-valor: `'activo': True`. Finalmente imprímelo. Esto demuestra que la variable sigue viva y operativa.\n\n*(Resultado esperado: `{'activo': True}`)*",
        initialCode: "datos = {'id': 105, 'estado': 'pendiente'}\n\n# Vacía, agrega un nuevo dato e imprime\n",
        outputCheck: "{'activo': True}",
        testCode: "assert 'datos' in locals(), \"Falta la variable 'datos'\"\nassert datos == {'activo': True}, \"El contenido final no es el esperado\"",
        hint: "datos.clear()\ndatos['activo'] = True\nprint(datos)"
      }
    ]
  },
  {
    id: 56,
    title: "Modificar Diccionarios",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Cómo se modifica un elemento en un Diccionario?
Dado que los diccionarios en Python son **mutables**, es posible cambiar el valor asociado a una clave en cualquier momento posterior a su creación.

La sintaxis para modificar un valor utiliza la misma estructura que la asignación de variables convencionales, combinada con los corchetes de indexación de claves:
\`\`\`python
nombre_diccionario[clave_existente] = nuevo_valor
\`\`\`

### El comportamiento interno de Python:
Cuando empleas esta sintaxis, Python realiza una comprobación interna en el diccionario:

- **Si la clave YA existe**: Sobreescribe el valor anterior y lo reemplaza por el \`nuevo_valor\`.
- **Si la clave NO existe**: En lugar de lanzar un error, Python asume que deseas expandir la estructura, por lo que **crea una nueva clave** y le asigna ese valor en el diccionario.

---

## 2. Sintaxis de Modificación vs. Agregación
El operador de asignación (\`=\`) sirve tanto para modificar como para agregar elementos:

- **Modificar**: \`diccionario["edad"] = 30\` → La clave \`"edad"\` ya existía con el valor \`28\`, por lo que el \`28\` se destruye y pasa a ser \`30\`.
- **Agregar**: \`diccionario["pais"] = "México"\` → La clave \`"pais"\` no existía, por lo que se añade como un nuevo elemento.

---

## 3. Ejemplo Práctico
\`\`\`python
# Declaración de un diccionario base con datos de un dispositivo tecnológico
dispositivo = {
    "marca": "Apple",
    "producto": "iPhone",
    "modelo": "11"
}

# 1. Mostrar el diccionario en su estado original
print(f"Diccionario original: {dispositivo}")

# 2. MODIFICAR un valor existente
# La clave 'modelo' ya existe, cambiamos su valor de '11' a '14 Pro'
dispositivo["modelo"] = "14 Pro"
print(f"Diccionario modificado ('modelo'): {dispositivo}")

# 3. AGREGAR una nueva clave-valor usando la misma sintaxis
# Como la clave 'color' no existe, Python la crea automáticamente
dispositivo["color"] = "Morado Oscuro"
print(f"Diccionario tras agregar 'color': {dispositivo}")
\`\`\`

---

## 4. Reglas Clave a Recordar
- La modificación es **directa e irreversible** sobre el objeto original.
- Si te equivocas al escribir el nombre de la clave (ej. \`"modlo"\` en lugar de \`"modelo"\`), Python no te avisará con un error, sino que **creará una clave nueva por error de escritura**. ¡Siempre verifica la ortografía de las claves!`,
    exercises: [
      {
        id: 5601,
        title: "Ejercicio 1: Modificar un valor",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "El diccionario `libro` tiene la clave `'paginas'` con el valor `200`. Modifica ese valor a `350` e imprime el diccionario.",
        initialCode: "libro = {'titulo': 'Python Total', 'paginas': 200}\n\n# Cambia el valor de 'paginas' a 350 e imprime\n",
        outputCheck: "{'titulo': 'Python Total', 'paginas': 350}",
        testCode: "assert 'libro' in locals(), \"Falta la variable 'libro'\"\nassert libro['paginas'] == 350, \"El valor de 'paginas' no fue modificado correctamente\"",
        hint: "libro['paginas'] = 350\nprint(libro)"
      },
      {
        id: 5602,
        title: "Ejercicio 2: Agregar una nueva clave",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usando la misma sintaxis de asignación, **agrega** una nueva clave `'autor'` con el valor `'Carlos'` al diccionario `libro`. Luego imprímelo.",
        initialCode: "libro = {'titulo': 'Python Total', 'paginas': 350}\n\n# Agrega la clave 'autor' con valor 'Carlos' e imprime\n",
        outputCheck: "{'titulo': 'Python Total', 'paginas': 350, 'autor': 'Carlos'}",
        testCode: "assert 'libro' in locals(), \"Falta la variable 'libro'\"\nassert 'autor' in libro, \"La clave 'autor' no fue agregada\"\nassert libro['autor'] == 'Carlos', \"El valor de 'autor' no es correcto\"",
        hint: "libro['autor'] = 'Carlos'\nprint(libro)"
      },
      {
        id: 5603,
        title: "Ejercicio 3: Modificar y agregar",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Dado el diccionario `producto`, realiza dos operaciones:\n1. **Modifica** el valor de `'precio'` a `999`.\n2. **Agrega** la nueva clave `'descuento'` con el valor `True`.\nImprime el diccionario al final.\n*(Resultado esperado: `{'nombre': 'Laptop', 'precio': 999, 'descuento': True}`)*",
        initialCode: "producto = {'nombre': 'Laptop', 'precio': 1200}\n\n# Modifica precio y agrega descuento\n",
        outputCheck: "{'nombre': 'Laptop', 'precio': 999, 'descuento': True}",
        testCode: "assert 'producto' in locals(), \"Falta la variable 'producto'\"\nassert producto['precio'] == 999, \"El precio no fue modificado correctamente\"\nassert producto.get('descuento') == True, \"La clave 'descuento' no fue agregada o su valor es incorrecto\"",
        hint: "producto['precio'] = 999\nproducto['descuento'] = True\nprint(producto)"
      }
    ]
  },
  {
    id: 57,
    title: "El método copy()",
    module: "Estructuras de Datos",
    theory: `## 1. El Problema de la Asignación Directa (=)
Cuando igualas un diccionario a otra variable (por ejemplo, \`diccionario_b = diccionario_a\`), Python **no crea una copia nueva** de los datos. En su lugar, crea una **referencia en memoria** (un acceso directo).

Tanto \`diccionario_a\` como \`diccionario_b\` apuntan exactamente al mismo objeto en la memoria. Por lo tanto, si modificas, añades o eliminas un elemento en \`diccionario_b\`, el \`diccionario_a\` también sufrirá el cambio de forma automática e irreversible.

---

## 2. ¿Qué es y para qué sirve el método copy()?
Para solucionar el problema anterior, Python proporciona el método \`copy()\`, el cual realiza una **copia superficial (shallow copy)** del diccionario original.

**Sintaxis:**
\`\`\`python
nuevo_diccionario = diccionario_original.copy()
\`\`\`

**Cómo funciona**: Crea un objeto totalmente nuevo e independiente en memoria con los mismos elementos actuales. Cualquier cambio posterior en el nuevo diccionario **no afectará en absoluto** al original.

---

## 3. Comparación: Referencia vs. Copia real

\`\`\`python
# --- CASO A: ASIGNACIÓN POR REFERENCIA (INCORRECTO) ---
calificaciones_original = {"Alejandro": 10, "Brenda": 8, "Cesar": 9}

# Intentamos "copiar" usando el operador '='
calificaciones_referencia = calificaciones_original

# Modificamos en la supuesta "copia"
calificaciones_referencia["Alejandro"] = 5

# ¡Ambos diccionarios han cambiado!
print(calificaciones_referencia)  # {'Alejandro': 5, 'Brenda': 8, 'Cesar': 9}
print(calificaciones_original)    # {'Alejandro': 5, 'Brenda': 8, 'Cesar': 9} ← ¡Error!


# --- CASO B: USO DEL MÉTODO COPY() (CORRECTO) ---
calificaciones_original = {"Alejandro": 10, "Brenda": 8, "Cesar": 9}

# Creamos una copia real e independiente con .copy()
calificaciones_clonadas = calificaciones_original.copy()

# Modificamos el valor en el diccionario clonado
calificaciones_clonadas["Alejandro"] = 5

print(calificaciones_clonadas)    # {'Alejandro': 5, 'Brenda': 8, 'Cesar': 9}
print(calificaciones_original)    # {'Alejandro': 10, 'Brenda': 8, 'Cesar': 9} ← ¡Intacto!
\`\`\`

---

## 4. Reglas de Oro
- **Nunca** uses \`b = a\` si tu intención es alterar \`b\` manteniendo los datos originales en \`a\`.
- El uso de \`.copy()\` es **mandatorio** siempre que necesites respaldar datos de un diccionario antes de procesarlo, filtrarlo o modificarlo.`,
    exercises: [
      {
        id: 5701,
        title: "Ejercicio 1: Demostrar la referencia",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Asigna `b = a` (sin usar `.copy()`). Luego cambia el valor de `b['x']` a `99`. Imprime `a` para comprobar que el original también fue modificado.\n*(Resultado esperado: `{'x': 99, 'y': 2}`)*",
        initialCode: "a = {'x': 1, 'y': 2}\n\n# Asigna b = a, modifica b['x'] a 99, e imprime a\n",
        outputCheck: "{'x': 99, 'y': 2}",
        testCode: "pass",
        hint: "b = a\nb['x'] = 99\nprint(a)"
      },
      {
        id: 5702,
        title: "Ejercicio 2: Copia real con copy()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Ahora usa `.copy()` para crear una copia real de `a` en la variable `b`. Modifica `b['x']` a `99`. Imprime **ambos** diccionarios para confirmar que `a` permanece intacto.\n*(Resultado esperado, una línea por diccionario:)*\n`{'x': 99, 'y': 2}`\n`{'x': 1, 'y': 2}`",
        initialCode: "a = {'x': 1, 'y': 2}\n\n# Clona con .copy(), modifica b['x'] e imprime ambos\n",
        outputCheck: "{'x': 99, 'y': 2}\n{'x': 1, 'y': 2}",
        testCode: "assert 'a' in locals() and 'b' in locals(), \"Faltan las variables 'a' o 'b'\"\nassert a == {'x': 1, 'y': 2}, \"El diccionario original 'a' fue modificado, usa .copy()\"\nassert b == {'x': 99, 'y': 2}, \"El clon 'b' no tiene el valor correcto\"",
        hint: "b = a.copy()\nb['x'] = 99\nprint(b)\nprint(a)"
      },
      {
        id: 5703,
        title: "Ejercicio 3: Respaldo antes de limpiar",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Crea un **respaldo** de `inventario` usando `.copy()`, guárdalo en `respaldo`. Luego aplica `.clear()` al `inventario` original. Imprime primero el `respaldo` (que debe conservar los datos) y luego el `inventario` vacío.\n*(Resultado esperado:)*\n`{'sillas': 10, 'mesas': 5}`\n`{}`",
        initialCode: "inventario = {'sillas': 10, 'mesas': 5}\n\n# Crea un respaldo, limpia el inventario e imprime ambos\n",
        outputCheck: "{'sillas': 10, 'mesas': 5}\n{}",
        testCode: "assert 'respaldo' in locals(), \"Falta la variable 'respaldo'\"\nassert respaldo == {'sillas': 10, 'mesas': 5}, \"El respaldo no conservó los datos originales\"\nassert inventario == {}, \"El inventario no fue vaciado correctamente\"",
        hint: "respaldo = inventario.copy()\ninventario.clear()\nprint(respaldo)\nprint(inventario)"
      }
    ]
  },
  {
    id: 58,
    title: "El método fromkeys()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve el método fromkeys()?
El método \`fromkeys()\` es un **método estático** de la clase \`dict\` que se utiliza para crear un nuevo diccionario a partir de una secuencia de claves.

Es sumamente útil cuando necesitas inicializar un diccionario con un grupo de claves ya definido (por ejemplo, nombres de columnas, días de la semana, configuraciones de usuario) y quieres asignarles a **todas ellas el mismo valor por defecto en un solo paso**, evitando tener que declararlas una por una.

---

## 2. Sintaxis y Parámetros
A diferencia de otros métodos que se ejecutan sobre un diccionario ya creado, \`fromkeys()\` se invoca directamente desde la clase \`dict\`:

\`\`\`python
nuevo_diccionario = dict.fromkeys(secuencia, valor_por_defecto)
\`\`\`

**Parámetros:**
- **\`secuencia\`** *(Obligatorio)*: Un objeto iterable (lista, tupla o cadena) que contiene los elementos que se convertirán en las **claves** del nuevo diccionario.
- **\`valor_por_defecto\`** *(Opcional)*: El valor que se asignará a cada clave. Si no se especifica, Python inicializa todas las claves con \`None\`.

---

## 3. Ejemplo Práctico

\`\`\`python
# --- CASO A: SIN VALOR POR DEFECTO (asigna None) ---
claves_usuario = ("nombre", "apellido", "edad", "pais")
perfil_vacio = dict.fromkeys(claves_usuario)
print(perfil_vacio)
# {'nombre': None, 'apellido': None, 'edad': None, 'pais': None}


# --- CASO B: CON VALOR POR DEFECTO ---
productos = ["laptops", "smartphones", "tablets"]
inventario_inicial = dict.fromkeys(productos, 0)
print(inventario_inicial)
# {'laptops': 0, 'smartphones': 0, 'tablets': 0}
\`\`\`

---

## 4. Reglas Importantes
- Si pasas una **cadena de texto** como secuencia (ej. \`dict.fromkeys("abc")\`), Python tomará cada carácter individual como una clave: \`{'a': None, 'b': None, 'c': None}\`.
- Aunque se puede invocar desde un diccionario existente (ej. \`mi_dic.fromkeys(...)\`), la **buena práctica** es llamarlo desde la clase \`dict.fromkeys()\`, ya que siempre genera un objeto nuevo independientemente.`,
    exercises: [
      {
        id: 5801,
        title: "Ejercicio 1: Inicializar con None",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Usa `dict.fromkeys()` para crear un diccionario llamado `perfil` a partir de la lista `campos`. No pases un segundo argumento para que Python asigne `None` a cada clave. Luego imprímelo.",
        initialCode: "campos = ['nombre', 'email', 'ciudad']\n\n# Crea el diccionario perfil e imprímelo\n",
        outputCheck: "{'nombre': None, 'email': None, 'ciudad': None}",
        testCode: "assert 'perfil' in locals(), \"Falta la variable 'perfil'\"\nassert isinstance(perfil, dict), \"'perfil' debe ser un diccionario\"\nassert list(perfil.keys()) == ['nombre', 'email', 'ciudad'], \"Las claves no son correctas\"\nassert all(v is None for v in perfil.values()), \"Los valores deben ser None\"",
        hint: "perfil = dict.fromkeys(campos)\nprint(perfil)"
      },
      {
        id: 5802,
        title: "Ejercicio 2: Inicializar con valor por defecto",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa `dict.fromkeys()` para crear el diccionario `marcador` a partir de la tupla `jugadores`, asignando a cada jugador un puntaje inicial de `0`. Imprime el resultado.",
        initialCode: "jugadores = ('Ana', 'Luis', 'Marta')\n\n# Crea marcador con puntaje 0 para cada jugador\n",
        outputCheck: "{'Ana': 0, 'Luis': 0, 'Marta': 0}",
        testCode: "assert 'marcador' in locals(), \"Falta la variable 'marcador'\"\nassert isinstance(marcador, dict), \"'marcador' debe ser un diccionario\"\nassert marcador == {'Ana': 0, 'Luis': 0, 'Marta': 0}, \"El diccionario no tiene los valores correctos\"",
        hint: "marcador = dict.fromkeys(jugadores, 0)\nprint(marcador)"
      },
      {
        id: 5803,
        title: "Ejercicio 3: Claves desde un string",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Observa el comportamiento especial al pasar un **string** como secuencia. Usa `dict.fromkeys('abc', 1)` para crear un diccionario `letras` e imprímelo. ¿Qué crees que obtendrás?\n*(Resultado esperado: `{'a': 1, 'b': 1, 'c': 1}`)*",
        initialCode: "# Crea el diccionario usando el string 'abc' como secuencia\n",
        outputCheck: "{'a': 1, 'b': 1, 'c': 1}",
        testCode: "assert 'letras' in locals(), \"Falta la variable 'letras'\"\nassert letras == {'a': 1, 'b': 1, 'c': 1}, \"El diccionario no tiene el contenido esperado\"",
        hint: "letras = dict.fromkeys('abc', 1)\nprint(letras)"
      }
    ]
  },
  {
    id: 59,
    title: "El método get()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Por qué usar get() en lugar de los corchetes []?
En lecciones anteriores se aprendió que para acceder al valor de una clave se usan los corchetes (ej. \`diccionario["clave"]\`). Sin embargo, esta sintaxis tiene un gran inconveniente: si la clave no existe, Python arroja un error de tipo \`KeyError\` y **detiene por completo la ejecución del programa**.

El método \`get()\` resuelve este problema actuando como un **filtro seguro de consulta**. Si la clave que buscas no se encuentra en el diccionario, el método no genera ningún error; en su lugar, maneja la situación de forma controlada devolviendo un valor alternativo.

---

## 2. Sintaxis y Parámetros
\`\`\`python
valor_retornado = nombre_diccionario.get(clave_a_buscar, valor_por_defecto)
\`\`\`

**Parámetros:**
- **\`clave_a_buscar\`** *(Obligatorio)*: La clave de la cual deseas extraer el valor.
- **\`valor_por_defecto\`** *(Opcional)*: El mensaje o valor que quieres que devuelva el método en caso de que la clave no exista. Si lo omites y la clave no se encuentra, Python retornará automáticamente \`None\`.

---

## 3. Los tres casos de uso

\`\`\`python
capitales = {
    "Mexico": "CDMX",
    "Colombia": "Bogota",
    "Argentina": "Buenos Aires"
}

# CASO 1: BÚSQUEDA EXITOSA
# La clave "Colombia" existe → devuelve su valor real
capital_co = capitales.get("Colombia")
print(capital_co)  # Bogota


# CASO 2: CLAVE INEXISTENTE (sin valor por defecto)
# "Brasil" no existe → devuelve None (sin romper el programa)
capital_br = capitales.get("Brasil")
print(capital_br)  # None
print("El programa continúa ejecutándose con normalidad...")


# CASO 3: CLAVE INEXISTENTE (con valor por defecto personalizado)
# "España" no existe → devuelve el mensaje personalizado
capital_es = capitales.get("Espana", "No encontrado en el registro")
print(capital_es)  # No encontrado en el registro
\`\`\`

---

## 4. Ventajas del método get()
- **Robustez**: Evita caídas de sistemas en producción causadas por consultas erróneas a diccionarios de configuración.
- **Código más limpio**: Elimina la necesidad de envolver cada consulta simple en bloques de control de excepciones \`try-except\`.`,
    exercises: [
      {
        id: 5901,
        title: "Ejercicio 1: Búsqueda segura",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Usa `.get()` para obtener el valor de la clave `'temperatura'` del diccionario `sensores`. Guárdalo en la variable `temp` e imprímela.\n*(Resultado esperado: `22`)*",
        initialCode: "sensores = {'temperatura': 22, 'humedad': 65, 'presion': 1013}\n\n# Obtén el valor de 'temperatura' con get() e imprímelo\n",
        outputCheck: "22",
        testCode: "assert 'temp' in locals(), \"Falta la variable 'temp'\"\nassert temp == 22, \"El valor obtenido no es correcto\"",
        hint: "temp = sensores.get('temperatura')\nprint(temp)"
      },
      {
        id: 5902,
        title: "Ejercicio 2: Clave inexistente",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Intenta obtener la clave `'velocidad'` del mismo diccionario `sensores` (no existe). Guarda el resultado en `vel` e imprímelo. El programa **no debe fallar** y debe mostrar `None`.",
        initialCode: "sensores = {'temperatura': 22, 'humedad': 65, 'presion': 1013}\n\n# Obtén 'velocidad' (no existe) e imprime el resultado\n",
        outputCheck: "None",
        testCode: "assert 'vel' in locals(), \"Falta la variable 'vel'\"\nassert vel is None, \"El resultado debe ser None cuando la clave no existe\"",
        hint: "vel = sensores.get('velocidad')\nprint(vel)"
      },
      {
        id: 5903,
        title: "Ejercicio 3: Valor por defecto personalizado",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Busca la clave `'bateria'` (que no existe) en el diccionario `dispositivo` usando `.get()`. Como valor por defecto pasa el string `'Sin datos'`. Guarda el resultado en `estado` e imprímelo.",
        initialCode: "dispositivo = {'modelo': 'Pixel 7', 'ram': 8, 'almacenamiento': 128}\n\n# Busca 'bateria' con un valor por defecto de 'Sin datos'\n",
        outputCheck: "Sin datos",
        testCode: "assert 'estado' in locals(), \"Falta la variable 'estado'\"\nassert estado == 'Sin datos', \"El valor por defecto no es el correcto\"",
        hint: "estado = dispositivo.get('bateria', 'Sin datos')\nprint(estado)"
      }
    ]
  },
  {
    id: 60,
    title: "El método popitem()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve el método popitem()?
El método \`popitem()\` se utiliza para **eliminar y retornar** el último par clave-valor (*item*) que fue agregado a un diccionario.

A diferencia de \`pop()\`, este método **no requiere ningún argumento** dentro de los paréntesis (no necesitas indicarle qué clave borrar). Simplemente localiza el extremo final del objeto, remueve el item y lo devuelve estructurado en forma de **tupla \`(clave, valor)\`**.

> **Comportamiento con diccionarios vacíos:** Si se intenta ejecutar \`.popitem()\` en un diccionario sin elementos, Python arrojará un error de tipo \`KeyError\`.

---

## 2. Regla Histórica Importante (Versiones de Python)
El comportamiento de este método depende de la versión de Python:

| Versión | Comportamiento |
|---|---|
| **Python 3.7+** | Es **LIFO** *(Last In, First Out)*: elimina el **último par** añadido de forma ordenada. |
| **Python 3.6 e inferiores** | Los diccionarios no tenían orden fijo, por lo que eliminaba un elemento de forma **aleatoria**. |

---

## 3. Sintaxis Básica
\`\`\`python
tupla_eliminada = nombre_diccionario.popitem()
\`\`\`

---

## 4. Ejemplo Práctico

\`\`\`python
# Diccionario base con 3 elementos
# El último par clave-valor agregado es "c": 3
diccionario = {
    "a": 1,
    "b": 2,
    "c": 3
}

# 1. Estado original
print(f"Diccionario original: {diccionario}")

# 2. Aplicar .popitem()
# Removerá "c": 3 y lo guardará como una tupla ('c', 3)
item_eliminado = diccionario.popitem()

# 3. El elemento extraído
print(f"El item eliminado es: {item_eliminado}")   # ('c', 3)

# 4. El diccionario resultante
print(f"Diccionario resultante: {diccionario}")     # {'a': 1, 'b': 2}
\`\`\``,
    exercises: [
      {
        id: 6001,
        title: "Ejercicio 1: Extraer el último elemento",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Aplica `.popitem()` al diccionario `colores` y guarda el resultado en la variable `extraido`. Luego imprime `extraido` para ver la tupla retornada.\n*(Resultado esperado: `('azul', 3)`)*",
        initialCode: "colores = {'rojo': 1, 'verde': 2, 'azul': 3}\n\n# Extrae el último item y guárdalo en extraido\n",
        outputCheck: "('azul', 3)",
        testCode: "assert 'extraido' in locals(), \"Falta la variable 'extraido'\"\nassert extraido == ('azul', 3), \"El item extraído no es correcto\"",
        hint: "extraido = colores.popitem()\nprint(extraido)"
      },
      {
        id: 6002,
        title: "Ejercicio 2: Diccionario tras la extracción",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Aplica `.popitem()` al diccionario `colores`. Luego imprime el **diccionario resultante** (no el elemento eliminado) para confirmar que el último par fue removido.\n*(Resultado esperado: `{'rojo': 1, 'verde': 2}`)*",
        initialCode: "colores = {'rojo': 1, 'verde': 2, 'azul': 3}\n\n# Aplica popitem() e imprime el diccionario resultante\n",
        outputCheck: "{'rojo': 1, 'verde': 2}",
        testCode: "assert 'colores' in locals(), \"Falta la variable 'colores'\"\nassert colores == {'rojo': 1, 'verde': 2}, \"El diccionario no quedó como se esperaba\"",
        hint: "colores.popitem()\nprint(colores)"
      },
      {
        id: 6003,
        title: "Ejercicio 3: Vaciar con popitem()",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Usando un bucle `while` y `.popitem()`, vacía completamente el diccionario `agenda`. Imprime cada item extraído en cada iteración. Al final imprime el diccionario vacío.\n*(Hay 3 items, se imprimirán 3 tuplas y luego `{}`)*",
        initialCode: "agenda = {'lunes': 'Reunión', 'martes': 'Entrega', 'miercoles': 'Capacitacion'}\n\n# Vacía el diccionario con un while y popitem()\n",
        outputCheck: "('miercoles', 'Capacitacion')\n('martes', 'Entrega')\n('lunes', 'Reunión')\n{}",
        testCode: "assert 'agenda' in locals(), \"Falta la variable 'agenda'\"\nassert agenda == {}, \"El diccionario no fue vaciado completamente\"",
        hint: "while agenda:\n    print(agenda.popitem())\nprint(agenda)"
      }
    ]
  },
  {
    id: 61,
    title: "El método pop() en Diccionarios",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Cómo funciona pop() en Diccionarios?
A diferencia de las listas (donde \`.pop()\` no requiere argumentos y elimina el último elemento por defecto), al trabajar con diccionarios el método \`.pop()\` exige un comportamiento distinto.

Este método se utiliza para **eliminar por completo un par clave-valor** del diccionario y, simultáneamente, **retornar el valor** asociado para que se pueda guardar o utilizar en una variable.

---

## 2. Sintaxis y Control de Errores
La sintaxis acepta entre **uno** y **dos** argumentos:
\`\`\`python
valor_guardado = nombre_diccionario.pop(clave, valor_por_defecto)
\`\`\`

### Escenario A: Un solo argumento (Garantía de existencia)
Si se le pasa únicamente la clave y esta existe, remueve el item y devuelve el dato. Sin embargo, si la clave **no existe**, el programa se interrumpe con un \`KeyError\`.
> **Regla:** Solo usa un argumento cuando tengas **total certeza** de que la clave está presente.

### Escenario B: Dos argumentos (Búsqueda Blindada)
Para evitar que el programa falle, se añade un segundo argumento: un **valor por defecto** (String, número, \`None\`, etc.). Si Python no encuentra la clave, ignora el error y retorna este mensaje de respaldo.

---

## 3. Ejemplos Prácticos

\`\`\`python
diccionario = {"a": 1, "b": 2, "c": 3}

# --- CASO 1: ELIMINACIÓN DE UNA CLAVE EXISTENTE ---
# Borra tanto 'b' como el 2, pero devuelve el 2.
valor_b = diccionario.pop("b")

print(diccionario)  # {'a': 1, 'c': 3}
print(valor_b)      # 2


# --- CASO 2: CLAVE INEXISTENTE CON RESPALDO ---
# Buscamos 'z' (no existe). Para evitar KeyError, damos un mensaje.
valor_z = diccionario.pop("z", "Clave no encontrada")

print(diccionario)  # {'a': 1, 'c': 3} (Intacto)
print(valor_z)      # "Clave no encontrada"
\`\`\``,
    exercises: [
      {
        id: 6101,
        title: "Ejercicio 1: Eliminación básica",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Utiliza `.pop()` con un solo argumento para eliminar la clave `'historia'` del diccionario `materias`. Guarda el valor extraído en `nota` e imprímelo.\n*(Resultado esperado: `8`)*",
        initialCode: "materias = {'matematicas': 9, 'historia': 8, 'ciencias': 10}\n\n# Elimina 'historia' con pop(), guarda el valor e imprímelo\n",
        outputCheck: "8",
        testCode: "assert 'nota' in locals(), \"Falta la variable 'nota'\"\nassert nota == 8, \"El valor extraído no es correcto\"\nassert 'historia' not in materias, \"La clave 'historia' no fue eliminada\"",
        hint: "nota = materias.pop('historia')\nprint(nota)"
      },
      {
        id: 6102,
        title: "Ejercicio 2: Búsqueda blindada",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Intenta usar `.pop()` para eliminar la clave `'arte'` (que no existe) del diccionario `materias`. Usa un segundo argumento para que devuelva el string `'Sin registro'`. Guarda el resultado en `resultado` e imprímelo.",
        initialCode: "materias = {'matematicas': 9, 'ciencias': 10}\n\n# Intenta eliminar 'arte' blindando la búsqueda\n",
        outputCheck: "Sin registro",
        testCode: "assert 'resultado' in locals(), \"Falta la variable 'resultado'\"\nassert resultado == 'Sin registro', \"El valor de respaldo no es correcto\"",
        hint: "resultado = materias.pop('arte', 'Sin registro')\nprint(resultado)"
      },
      {
        id: 6103,
        title: "Ejercicio 3: Valor extraído vs. Diccionario resultante",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Extrae el valor de la clave `'admin'` del diccionario `usuarios` usando `.pop()`. Imprime primero el valor extraído (debe ser `True`) y luego imprime el diccionario resultante para confirmar la eliminación.",
        initialCode: "usuarios = {'invitado': False, 'admin': True, 'editor': False}\n\n# Extrae 'admin', imprime el valor y luego el diccionario\n",
        outputCheck: "True\n{'invitado': False, 'editor': False}",
        testCode: "assert 'usuarios' in locals(), \"Falta la variable 'usuarios'\"\nassert 'admin' not in usuarios, \"La clave 'admin' no fue eliminada del diccionario\"",
        hint: "valor = usuarios.pop('admin')\nprint(valor)\nprint(usuarios)"
      }
    ]
  },
  {
    id: 62,
    title: "El método setdefault()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve el método setdefault()?
El método \`setdefault()\` se utiliza para buscar una clave en un diccionario y, en caso de que no exista, **agregarla con un valor específico**. Si la clave ya se encuentra dentro del diccionario, el método **no altera nada** y simplemente devuelve el valor que ya estaba almacenado.

**Sintaxis Básica:**
\`\`\`python
valor_retornado = nombre_diccionario.setdefault(clave, valor_por_defecto)
\`\`\`
Aunque el método puede ejecutarse pasando únicamente la clave, la buena práctica dicta trabajar siempre con los dos argumentos simultáneamente (clave y valor).

---

## 2. Los Tres Escenarios de Comportamiento

### Escenario 1: La clave YA existe
- **Acción:** Python encuentra la clave e ignora por completo el nuevo valor provisto.
- **Retorno:** Devuelve el valor que ya existía originalmente.
- **Efecto:** El diccionario no sufre ninguna modificación.

### Escenario 2: La clave NO existe y NO se pasa un valor
- **Acción:** Python añade la nueva clave al diccionario.
- **Retorno:** Al omitir el segundo argumento, devuelve \`None\`.
- **Efecto:** Se inserta el nuevo ítem con el valor por defecto: \`{"nueva_clave": None}\`.

### Escenario 3: La clave NO existe y SÍ se pasa un valor
- **Acción:** Python crea e inserta el nuevo par clave-valor al diccionario.
- **Retorno:** Devuelve el mismo valor que se especificó en los paréntesis.
- **Efecto:** El diccionario se expande de forma segura y exitosa.

---

## 3. Código Práctico

\`\`\`python
# Inventario original de frutas
fruits = {"apple": 2, "banana": 3, "tangerine": 5}

# --- SITUACIÓN 1: La clave YA existe ---
# 'banana' existe con valor 3. Intentamos pasarle un 4.
valor_1 = fruits.setdefault("banana", 4)
# Retorna 3. El diccionario queda igual.


# --- SITUACIÓN 2: NO existe y SIN valor ---
# 'kiwi' no existe. No pasamos segundo argumento.
valor_2 = fruits.setdefault("kiwi")
# Retorna None. Añade: {"kiwi": None}


# --- SITUACIÓN 3: NO existe y CON valor ---
# 'mango' no existe. Le definimos stock 5.
valor_3 = fruits.setdefault("mango", 5)
# Retorna 5. Añade: {"mango": 5}

print(fruits)
# {'apple': 2, 'banana': 3, 'tangerine': 5, 'kiwi': None, 'mango': 5}
\`\`\``,
    exercises: [
      {
        id: 6201,
        title: "Ejercicio 1: Clave existente",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "El diccionario `config` ya tiene la clave `'tema'` con valor `'oscuro'`. Usa `.setdefault('tema', 'claro')` y guarda el resultado en `resultado`. Imprime `resultado` y luego el diccionario.\n*(¿Se sobrescribió el tema oscuro?)*",
        initialCode: "config = {'tema': 'oscuro', 'fuente': 12}\n\n# Aplica setdefault(), guarda el resultado e imprime ambos\n",
        outputCheck: "oscuro\n{'tema': 'oscuro', 'fuente': 12}",
        testCode: "assert 'resultado' in locals(), \"Falta la variable 'resultado'\"\nassert resultado == 'oscuro', \"El resultado retornado no es correcto\"\nassert config['tema'] == 'oscuro', \"El diccionario no debió modificarse\"",
        hint: "resultado = config.setdefault('tema', 'claro')\nprint(resultado)\nprint(config)"
      },
      {
        id: 6202,
        title: "Ejercicio 2: Clave nueva sin valor",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Intenta agregar la clave `'idioma'` al diccionario `config` usando `.setdefault()` pasando **únicamente** el nombre de la clave. Imprime el diccionario resultante para ver cómo Python asignó el valor.",
        initialCode: "config = {'tema': 'oscuro'}\n\n# Usa setdefault solo con la clave 'idioma' e imprime el diccionario\n",
        outputCheck: "{'tema': 'oscuro', 'idioma': None}",
        testCode: "assert 'config' in locals(), \"Falta la variable 'config'\"\nassert 'idioma' in config and config['idioma'] is None, \"No se agregó la clave con valor None\"",
        hint: "config.setdefault('idioma')\nprint(config)"
      },
      {
        id: 6203,
        title: "Ejercicio 3: Expansión segura",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Expande de forma segura el diccionario `config`. Usa `.setdefault()` para agregar la clave `'notificaciones'` con el valor `True`. Imprime el valor que retorna el método y luego el diccionario completo.",
        initialCode: "config = {'tema': 'oscuro'}\n\n# Agrega 'notificaciones': True, imprime el retorno y luego el diccionario\n",
        outputCheck: "True\n{'tema': 'oscuro', 'notificaciones': True}",
        testCode: "assert 'config' in locals(), \"Falta la variable 'config'\"\nassert config.get('notificaciones') == True, \"La clave no se agregó correctamente\"",
        hint: "retorno = config.setdefault('notificaciones', True)\nprint(retorno)\nprint(config)"
      }
    ]
  },
  {
    id: 63,
    title: "El método update()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve el método update()?
El método \`update()\` se utiliza para actualizar un diccionario utilizando los pares clave-valor procedentes de otro objeto diccionario (o de un iterable de tuplas).

Es una herramienta de gran utilidad cuando se necesita **fusionar dos fuentes de datos** o modificar múltiples registros al mismo tiempo, sin necesidad de escribir varias líneas de asignación individuales.

---

## 2. Comportamiento interno
Cuando se ejecuta \`update()\`, Python recorre los elementos del diccionario secundario y los contrasta con el diccionario original:

- **Si las claves YA existen:** Sobrescribe los valores antiguos en el diccionario original con los nuevos valores provistos.
- **Si las claves NO existen:** Añade estas nuevas claves con sus respectivos valores al final del diccionario original.

**Sintaxis Básica:**
\`\`\`python
diccionario_principal.update(diccionario_secundario)
\`\`\`

---

## 3. Ejemplo Práctico

\`\`\`python
# 1. Diccionario principal que se va a modificar
diccionario_original = {
    "a": 1,
    "b": 2,
    "c": 3
}

print(f"Original: {diccionario_original}")

# 2. Diccionario secundario con actualizaciones y nuevos datos
# 'a' y 'b' se van a actualizar; 'z' y 'd' se van a incorporar
datos_nuevos = {
    "a": 6,
    "b": 5,
    "z": 9,
    "d": 4
}

# 3. Aplicar el método .update()
diccionario_original.update(datos_nuevos)

# 4. Mostrar el resultado final
print(f"Modificado: {diccionario_original}")
# {'a': 6, 'b': 5, 'c': 3, 'z': 9, 'd': 4}
\`\`\``,
    exercises: [
      {
        id: 6301,
        title: "Ejercicio 1: Agregar nuevos datos",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Actualiza el diccionario `perfil` usando `.update()` y pasándole el diccionario `contacto`. Imprime el `perfil` resultante para ver la fusión.\n*(Resultado esperado: `{'nombre': 'Ana', 'email': 'ana@mail.com', 'telefono': 1234}`)*",
        initialCode: "perfil = {'nombre': 'Ana'}\ncontacto = {'email': 'ana@mail.com', 'telefono': 1234}\n\n# Actualiza perfil con contacto e imprime perfil\n",
        outputCheck: "{'nombre': 'Ana', 'email': 'ana@mail.com', 'telefono': 1234}",
        testCode: "assert 'perfil' in locals(), \"Falta la variable 'perfil'\"\nassert perfil == {'nombre': 'Ana', 'email': 'ana@mail.com', 'telefono': 1234}, \"El diccionario no fue actualizado correctamente\"",
        hint: "perfil.update(contacto)\nprint(perfil)"
      },
      {
        id: 6302,
        title: "Ejercicio 2: Sobrescribir datos",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "El diccionario `ventas` contiene los registros originales. Utiliza `.update()` con el diccionario `correcciones` para sobrescribir los valores equivocados. Imprime `ventas` al final.",
        initialCode: "ventas = {'lunes': 100, 'martes': 50}\ncorrecciones = {'lunes': 120, 'martes': 65}\n\n# Aplica las correcciones a ventas e imprime el resultado\n",
        outputCheck: "{'lunes': 120, 'martes': 65}",
        testCode: "assert 'ventas' in locals(), \"Falta la variable 'ventas'\"\nassert ventas == {'lunes': 120, 'martes': 65}, \"Los valores no se sobrescribieron correctamente\"",
        hint: "ventas.update(correcciones)\nprint(ventas)"
      },
      {
        id: 6303,
        title: "Ejercicio 3: Fusión mixta",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "El diccionario `inventario` tiene un error en `laptops` y le falta la clave `tablets`. Crea un diccionario secundario llamado `ajustes` con la corrección `{'laptops': 10}` y la nueva clave `{'tablets': 5}` en el mismo bloque. Luego actualiza el inventario e imprímelo.",
        initialCode: "inventario = {'laptops': 8, 'smartphones': 20}\n\n# Crea 'ajustes', actualiza el inventario e imprímelo\n",
        outputCheck: "{'laptops': 10, 'smartphones': 20, 'tablets': 5}",
        testCode: "assert 'inventario' in locals(), \"Falta la variable 'inventario'\"\nassert 'ajustes' in locals(), \"Debes crear el diccionario secundario 'ajustes'\"\nassert inventario == {'laptops': 10, 'smartphones': 20, 'tablets': 5}, \"La fusión mixta no fue exitosa\"",
        hint: "ajustes = {'laptops': 10, 'tablets': 5}\ninventario.update(ajustes)\nprint(inventario)"
      }
    ]
  },
  {
    id: 64,
    title: "Recorrer Diccionarios con for",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Cómo automatizar la lectura de un diccionario?
En Python, existen dos alternativas principales y muy populares para recorrer (iterar) un diccionario utilizando el bucle \`for\`.

---

## 2. Alternativa 1: Recorrido por claves (Sintaxis Estándar)
En esta primera aproximación, el bucle lee el diccionario de manera directa. La variable de control solo extrae y almacena la **clave** en cada iteración.
Para obtener el **valor**, debes usar la sintaxis de indexación manual (\`diccionario[clave]\`).

**Estructura base:**
\`\`\`python
for clave in diccionario:
    print(f"Clave: {clave} -> Valor: {diccionario[clave]}")
\`\`\`
> **Ventaja:** Es directa y no requiere métodos externos.

---

## 3. Alternativa 2: Recorrido por ítems con .items()
Esta opción es más elegante, compacta y profesional. Combina el bucle \`for\` con el método \`.items()\`, el cual expone de manera simultánea el par clave-valor.
Gracias a esto, puedes declarar **dos variables de control simultáneas** que recibirán la clave y el valor desempaquetados.

**Estructura base:**
\`\`\`python
for clave, valor in diccionario.items():
    print(f"Clave: {clave} -> Valor: {valor}")
\`\`\`
> **Ventaja:** Evita los corchetes. Asigna los datos limpia y directamente en las variables de control.

---

## 4. Código Comparativo

\`\`\`python
datos = {"a": 1, "b": 2, "c": 3}

# ALTERNATIVA 1 (Por clave)
for key in datos:
    print(f"{key}: {datos[key]}")


# ALTERNATIVA 2 (Por ítem desempaquetado)
for key, value in datos.items():
    print(f"{key}: {value}")
\`\`\`
*(Ambas metodologías arrojan exactamente el mismo resultado visual en consola, pero dominar ambas te permitirá adaptar tu código de forma óptima a distintas situaciones).*`,
    exercises: [
      {
        id: 6401,
        title: "Ejercicio 1: Recorrido estándar",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Utiliza un bucle `for` básico (Alternativa 1) para recorrer el diccionario `edades`. En cada iteración, imprime la clave y luego su valor, separados por un espacio.\n*(Resultado esperado: 3 líneas impresas, ej: `Ana 25`)*",
        initialCode: "edades = {'Ana': 25, 'Luis': 30, 'Marta': 28}\n\n# Recorre el diccionario por claves e imprime 'clave valor'\n",
        outputCheck: "Ana 25\nLuis 30\nMarta 28",
        testCode: "assert 'edades' in locals()\n# Se evalúa la salida por consola",
        hint: "for nombre in edades:\n    print(nombre, edades[nombre])"
      },
      {
        id: 6402,
        title: "Ejercicio 2: Recorrido con .items()",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Ahora recorre el mismo diccionario usando `.items()` (Alternativa 2). Desempaqueta en las variables `k` y `v`, e imprímelas separadas por un guion.\n*(Resultado esperado: `Ana - 25`, etc.)*",
        initialCode: "edades = {'Ana': 25, 'Luis': 30, 'Marta': 28}\n\n# Usa .items() e imprime 'k - v'\n",
        outputCheck: "Ana - 25\nLuis - 30\nMarta - 28",
        testCode: "assert 'edades' in locals()\n# Se evalúa la salida por consola",
        hint: "for k, v in edades.items():\n    print(f\"{k} - {v}\")"
      },
      {
        id: 6403,
        title: "Ejercicio 3: Filtrar durante el recorrido",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Recorre `calificaciones` usando `.items()`. Dentro del bucle, usa un `if` para imprimir **únicamente** los nombres de los estudiantes con calificación mayor o igual a `9`.\n*(Resultado esperado: `Cesar` y `Diana` impresos en líneas separadas)*",
        initialCode: "calificaciones = {'Beto': 7, 'Cesar': 10, 'Diana': 9, 'Eli': 6}\n\n# Usa .items() y un if para imprimir a los aprobados con >= 9\n",
        outputCheck: "Cesar\nDiana",
        testCode: "assert 'calificaciones' in locals()\n# Se evalúa la salida por consola",
        hint: "for alumno, nota in calificaciones.items():\n    if nota >= 9:\n        print(alumno)"
      }
    ]
  },
  {
    id: 65,
    title: "Dominando los Diccionarios",
    module: "Estructuras de Datos",
    theory: `## 1. Recopilación y Práctica
En esta clase eminentemente práctica, vamos a recopilar y aplicar los métodos aprendidos a lo largo de la sección de diccionarios mediante la resolución de un proyecto guiado de 5 fases.

A lo largo de los ejercicios, gestionaremos el inventario de una frutería. Repasaremos:
- Consultas seguras con \`.get()\`
- Inserción y modificación en bloque con \`.update()\`
- Eliminación controlada con extracción utilizando \`.pop()\`
- Conversión de secuencias con \`.keys()\` y \`list()\`
- Vaciado total de contenedores con \`.clear()\`

---

## 2. Flujo del Proyecto
Observa cómo se conectan todos los métodos en el ciclo de vida de los datos:

\`\`\`python
# 1. CREACIÓN Y CONSULTA
fruits = {"manzanas": 5, "peras": 2, "naranjas": 4}
cantidad_manzanas = fruits.get("manzanas")
# -> 5


# 2. INSERCIÓN SIMULTÁNEA
fruits.update({"bananas": 5, "mangos": 6, "uvas": 3})
# El diccionario ahora tiene 6 elementos


# 3. ELIMINACIÓN CON EXTRACCIÓN
existencias_eliminadas = fruits.pop("peras")
# Borra 'peras' pero nos dice que había 2


# 4. EXTRACCIÓN A LISTA
lista_de_frutas = list(fruits.keys())
# -> ['manzanas', 'naranjas', 'bananas', 'mangos', 'uvas']


# 5. LIMPIEZA TOTAL
fruits.clear()
# -> {} (Listo para el siguiente día de ventas)
\`\`\`

*(¡Aplica estos conceptos paso a paso en los 5 ejercicios a continuación!)*`,
    exercises: [
      {
        id: 6501,
        title: "Ejercicio 1: Consulta Básica",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "El diccionario `fruits` tiene el inventario inicial. Usa el método seguro `.get()` para consultar cuántas `'manzanas'` hay. Guarda el resultado en la variable `cantidad` e imprímela.",
        initialCode: "fruits = {'manzanas': 5, 'peras': 2, 'naranjas': 4}\n\n# Consulta las manzanas con get() e imprime\n",
        outputCheck: "5",
        testCode: "assert 'cantidad' in locals()\nassert cantidad == 5, \"Usa el método get() para obtener 5\"",
        hint: "cantidad = fruits.get('manzanas')\nprint(cantidad)"
      },
      {
        id: 6502,
        title: "Ejercicio 2: Inserción Simultánea",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Partiendo de `fruits`, añade tres nuevos productos de una vez usando `.update()`: `'bananas': 5, 'mangos': 6, 'uvas': 3`. Luego imprime el diccionario actualizado.",
        initialCode: "fruits = {'manzanas': 5, 'peras': 2, 'naranjas': 4}\n\n# Añade bananas, mangos y uvas con update() e imprime\n",
        outputCheck: "{'manzanas': 5, 'peras': 2, 'naranjas': 4, 'bananas': 5, 'mangos': 6, 'uvas': 3}",
        testCode: "assert 'fruits' in locals()\nassert len(fruits) == 6, \"El diccionario debe tener 6 elementos\"",
        hint: "fruits.update({'bananas': 5, 'mangos': 6, 'uvas': 3})\nprint(fruits)"
      },
      {
        id: 6503,
        title: "Ejercicio 3: Baja de Inventario",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Alguien compró todas las peras. Usa `.pop()` para eliminar `'peras'` de `fruits` y guarda el stock eliminado en `bajas`. Imprime primero `bajas` y luego el diccionario `fruits` resultante.",
        initialCode: "fruits = {'manzanas': 5, 'peras': 2, 'naranjas': 4}\n\n# Elimina 'peras', guarda el stock en bajas e imprime ambos\n",
        outputCheck: "2\n{'manzanas': 5, 'naranjas': 4}",
        testCode: "assert 'bajas' in locals()\nassert bajas == 2\nassert 'peras' not in fruits",
        hint: "bajas = fruits.pop('peras')\nprint(bajas)\nprint(fruits)"
      },
      {
        id: 6504,
        title: "Ejercicio 4: Catálogo a Lista",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Aisla únicamente los nombres de los productos. Utiliza `.keys()` envuelto en `list()` para crear una lista convencional llamada `catalogo` con los nombres de las frutas. Imprime `catalogo`.",
        initialCode: "fruits = {'manzanas': 5, 'naranjas': 4, 'bananas': 5}\n\n# Extrae las claves a una lista llamada catalogo e imprime\n",
        outputCheck: "['manzanas', 'naranjas', 'bananas']",
        testCode: "assert 'catalogo' in locals()\nassert isinstance(catalogo, list)\nassert len(catalogo) == 3",
        hint: "catalogo = list(fruits.keys())\nprint(catalogo)"
      },
      {
        id: 6505,
        title: "Ejercicio 5: Cierre de jornada",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Terminó el día de ventas. Vacía completamente el diccionario `fruits` sin destruir la variable en memoria utilizando el método adecuado. Al final, imprime `fruits` para comprobar que quedó como `{}`.",
        initialCode: "fruits = {'manzanas': 5, 'naranjas': 4}\n\n# Vacía el diccionario e imprime\n",
        outputCheck: "{}",
        testCode: "assert 'fruits' in locals()\nassert fruits == {}, \"El diccionario no fue vaciado correctamente\"",
        hint: "fruits.clear()\nprint(fruits)"
      }
    ]
  },
  {
    id: 66,
    title: "Expresiones de comprensión en Python",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué son las Expresiones de Comprensión?
Las expresiones de comprensión (*comprehensions*) son una construcción nativa de Python que permite crear una nueva secuencia (como listas, conjuntos o diccionarios) aplicando una operación a cada elemento de un objeto iterable.

Su propósito principal es proporcionar una alternativa concisa, elegante y muy legible frente a los tradicionales bucles \`for\`, reduciendo drásticamente las líneas de código.

## 2. Tipos Principales de Comprensión
1. **Listas de comprensión**: Genera una nueva lista empleando corchetes \`[]\`.
2. **Conjuntos de comprensión**: Genera un conjunto utilizando llaves \`{}\`. Descarta automáticamente cualquier duplicado.
3. **Diccionarios de comprensión**: Crea un diccionario utilizando llaves \`{}\` definiendo explícitamente tanto la clave como el valor (\`clave: valor\`).

## 3. Sintaxis General y Filtros
\`\`\`python
# Sintaxis base estándar:
[expresion for variable in objeto_iterable]

# Sintaxis completa incluyendo un filtro condicional (Opcional):
[expresion for variable in objeto_iterable if condicion]
\`\`\`
*(Se aplican las mismas reglas cambiando los corchetes por llaves para sets/dicts).*

## 4. Ejemplos de Código (Prácticas)

### Práctica A: Lista de cuadrados pares
\`\`\`python
# Tradicional (4 líneas)
cuadrados = []
for x in range(10):
    if x % 2 == 0:
        cuadrados.append(x ** 2)

# Con comprensión (1 sola línea)
cuadrados_comprension = [x ** 2 for x in range(10) if x % 2 == 0]
# Resultado: [0, 4, 16, 36, 64]
\`\`\`

### Práctica B: Diccionario con filtro
Transformando una lista de tuplas y filtrando por edad:
\`\`\`python
personas = [("Carlos", 30), ("Gerardo", 25), ("María", 35)] 

# { clave: valor for variables in iterable if condicion }
mayores_30 = {nombre: edad for nombre, edad in personas if edad >= 30}
# Resultado: {'Carlos': 30, 'María': 35}
\`\`\`

Las expresiones de comprensión son consideradas un pilar fundamental del código "Pythonic". Permiten pasar de bloques estructurados a sentencias atómicas de una sola línea, mejorando la legibilidad.`,
    exercises: [
      {
        id: 6601,
        title: "Ejercicio 1: Tu primera Lista de Comprensión",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Vamos a empezar sin condicionales. Crea una lista llamada \`dobles\` que contenga el doble (\`* 2\`) de los números del 0 al 4. Usa \`range(5)\` en tu **lista de comprensión**. Luego imprime el resultado.",
        initialCode: "# Crea la lista 'dobles' usando comprensión y luego imprímela\n",
        outputCheck: "[0, 2, 4, 6, 8]",
        testCode: "assert 'dobles' in locals()\nassert type(dobles) == list\nassert dobles == [0, 2, 4, 6, 8]\nassert '[' in __source__ and 'for' in __source__\nassert 'if' not in __source__",
        hint: "dobles = [x * 2 for x in range(5)]\nprint(dobles)"
      },
      {
        id: 6602,
        title: "Ejercicio 2: Lista de Comprensión con Filtro",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Ahora apliquemos un filtro condicional. Crea una lista llamada \`pares_cuadrados\` que contenga el cuadrado (\`** 2\`) de los números del 0 al 9, pero incluyendo **solo los pares**. Utiliza una sola línea. Luego imprime el resultado.",
        initialCode: "# Crea la lista usando comprensión y luego imprímela\n",
        outputCheck: "[0, 4, 16, 36, 64]",
        testCode: "assert 'pares_cuadrados' in locals()\nassert type(pares_cuadrados) == list\nassert pares_cuadrados == [0, 4, 16, 36, 64]\nassert '[' in __source__ and 'for' in __source__ and 'if' in __source__",
        hint: "pares_cuadrados = [x ** 2 for x in range(10) if x % 2 == 0]\nprint(pares_cuadrados)"
      },
      {
        id: 6603,
        title: "Ejercicio 3: Conjunto de Comprensión",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Usa llaves \`{}\` para crear un **conjunto de comprensión** llamado \`vocales\`. Itera sobre el string \`'programacion'\` para extraer sus letras, pero agrega un condicional para incluir solo aquellas letras que estén dentro del string \`'aeiou'\`. Al final imprímelo. *Nota: Los conjuntos omiten automáticamente los duplicados.*",
        initialCode: "palabra = 'programacion'\n\n# Crea tu conjunto de comprensión 'vocales' e imprímelo\n",
        outputCheck: "",
        testCode: "assert 'vocales' in locals()\nassert type(vocales) == set\nassert vocales == {'o', 'a', 'i'}\nassert '{' in __source__ and 'for' in __source__",
        hint: "vocales = {letra for letra in palabra if letra in 'aeiou'}\nprint(vocales)"
      },
      {
        id: 6604,
        title: "Ejercicio 4: Diccionario de Comprensión",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Tienes una lista de tuplas con nombres y edades: \`personas = [('Carlos', 30), ('Gerardo', 25), ('María', 35)]\`. Crea un diccionario de comprensión llamado \`mayores\`, estructurado como \`{nombre: edad}\`, filtrando **solo** a quienes tengan \`30\` años o más. Luego imprímelo.",
        initialCode: "personas = [('Carlos', 30), ('Gerardo', 25), ('María', 35)]\n\n# Crea tu diccionario de comprensión 'mayores' e imprímelo\n",
        outputCheck: "{'Carlos': 30, 'María': 35}",
        testCode: "assert 'mayores' in locals()\nassert type(mayores) == dict\nassert mayores == {'Carlos': 30, 'María': 35}\nassert '{' in __source__ and 'for' in __source__ and 'if' in __source__",
        hint: "mayores = {nombre: edad for nombre, edad in personas if edad >= 30}\nprint(mayores)"
      }
    ]
  },
  {
    id: 67,
    title: "La función enumerate()",
    module: "Estructuras de Datos",
    theory: `## 1. ¿Qué es y para qué sirve?
La función \`enumerate()\` es una herramienta nativa de Python diseñada para recorrer los elementos de un objeto iterable (como listas, tuplas o cadenas) al mismo tiempo que mantiene un **contador automático** de la posición o índice de cada elemento.

Es ideal cuando necesitas conocer la ubicación de un dato dentro de una secuencia mientras la recorres, permitiendo escribir un código mucho más limpio sin declarar contadores manuales (\`i += 1\`).

## 2. Sintaxis y Parámetros
\`\`\`python
enumerate(objeto_iterable, start=0)
\`\`\`
- \`objeto_iterable\` *(Obligatorio)*: La secuencia a recorrer.
- \`start\` *(Opcional)*: El número desde el cual arranca el contador. Por defecto es \`0\`.

## 3. El Orden de Retorno (Regla Crítica)
Al usar \`enumerate()\`, siempre devuelve **primero el índice/posición y segundo el elemento**. Debes respetar estrictamente ese orden al desempaquetar las variables en un ciclo \`for\`:

\`\`\`python
# Correcto: 'posicion' captura el número, 'elemento' captura el valor
for posicion, elemento in enumerate(iterable):
    pass
\`\`\`

## 4. Ejemplos de Código

### Recorrido con FOR y start personalizado
\`\`\`python
frutas = ["manzana", "plátano", "uva"]

for posicion, fruta in enumerate(frutas, start=101):
    print(f"Posición {posicion}: {fruta}")

# Salida:
# Posición 101: manzana
# Posición 102: plátano
# Posición 103: uva
\`\`\`

### Almacenamiento Estructurado
Si usas \`enumerate()\` fuera de un ciclo, debes convertirlo explícitamente a una lista para poder visualizarlo o reutilizarlo:
\`\`\`python
enumerado = list(enumerate(frutas, start=1))
print(enumerado)
# Salida: [(1, 'manzana'), (2, 'plátano'), (3, 'uva')]
\`\`\`

**Conclusión:** \`enumerate()\` es la opción óptima para mapear identificadores numéricos a secuencias sin sobrecargar el código con variables extra.`,
    exercises: [
      {
        id: 6701,
        title: "Ejercicio 1: Tu primer enumerate",
        difficulty: "Básico",
        difficultyColor: "green",
        instructions: "Recorre la lista \`colores\` utilizando un ciclo \`for\` combinado con \`enumerate()\`. En cada iteración, imprime directamente el \`item\` que devuelve la función (sin desempaquetar). Usa el valor por defecto de \`start\`.",
        initialCode: "colores = ['rojo', 'verde', 'azul']\n\n# Usa un for con enumerate para imprimir cada iteración\n",
        outputCheck: "",
        testCode: "assert 'enumerate' in __source__\nassert 'for' in __source__",
        hint: "for item in enumerate(colores):\n    print(item)"
      },
      {
        id: 6702,
        title: "Ejercicio 2: Desempaquetado correcto",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Ahora vas a desempaquetar las variables. Usa un ciclo \`for\` con \`enumerate()\` sobre \`colores\`. Desempaqueta usando las variables \`indice\` y \`color\`. En cada iteración, imprime ambos valores separados por coma en la misma instrucción \`print(indice, color)\`.",
        initialCode: "colores = ['rojo', 'verde', 'azul']\n\n# Desempaqueta y usa print(indice, color)\n",
        outputCheck: "",
        testCode: "assert 'enumerate' in __source__\nassert 'for' in __source__ and ',' in __source__",
        hint: "for indice, color in enumerate(colores):\n    print(indice, color)"
      },
      {
        id: 6703,
        title: "Ejercicio 3: Alterando el inicio",
        difficulty: "Intermedio",
        difficultyColor: "yellow",
        instructions: "Recorre la lista \`equipos\` usando \`enumerate()\`. Esta vez, configura el parámetro \`start=1\`. Desempaqueta las variables como \`posicion\` y \`equipo\` e imprime exactamente este string formateado: \`f\"{posicion}. {equipo}\"\`.",
        initialCode: "equipos = ['Águilas', 'Tigres', 'Leones']\n\n# Usa enumerate con start=1 y print(f\"{posicion}. {equipo}\")\n",
        outputCheck: "",
        testCode: "assert 'enumerate' in __source__ and 'start=1' in __source__.replace(' ', '')\nassert 'f\"' in __source__ or \"f'\" in __source__",
        hint: "for posicion, equipo in enumerate(equipos, start=1):\n    print(f\"{posicion}. {equipo}\")"
      },
      {
        id: 6704,
        title: "Ejercicio 4: Convertir a lista de tuplas",
        difficulty: "Reto",
        difficultyColor: "red",
        instructions: "Tienes la lista \`nombres\`. Usa \`enumerate()\` con \`start=10\` sobre la lista y convierte el resultado directamente a una lista convencional de Python usando \`list()\`. Guarda este resultado en una variable llamada \`lista_enumerada\` y luego imprímela.",
        initialCode: "nombres = ['Ana', 'Luis', 'Marta']\n\n# Crea lista_enumerada y luego imprímela\n",
        outputCheck: "[(10, 'Ana'), (11, 'Luis'), (12, 'Marta')]",
        testCode: "assert 'lista_enumerada' in locals()\nassert type(lista_enumerada) == list\nassert lista_enumerada == [(10, 'Ana'), (11, 'Luis'), (12, 'Marta')]\nassert 'list(' in __source__ and 'enumerate(' in __source__",
        hint: "lista_enumerada = list(enumerate(nombres, start=10))\nprint(lista_enumerada)"
      }
    ]
  },
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
  }
];

function DifficultyBadge({ color, label }: { color: string; label: string }) {
  const map: Record<string, string> = {
    green: "bg-green-500/15 text-green-400 border-green-500/30",
    yellow: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    red: "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${map[color]}`}>{label}</span>;
}

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { isReady, runCode } = usePyodide();
  const { saveProgress } = useProgress();

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeExercise, setActiveExercise] = useState(0);
  const [allCodes, setAllCodes] = useState<string[][]>([]);
  const [allOutputs, setAllOutputs] = useState(lessons.map(l => l.exercises.map(() => "")));
  const [allErrors, setAllErrors] = useState(lessons.map(l => l.exercises.map(() => "")));
  const [allSuccesses, setAllSuccesses] = useState<boolean[][]>([]);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(lessons.map(l => l.exercises.map(() => false)));
  const [errorModal, setErrorModal] = useState<{ title: string; message: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'theory' | 'exercises'>('theory');
  const [tabNeedsScroll, setTabNeedsScroll] = useState(false);
  const [tabScrollEnd, setTabScrollEnd] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = tabsRef.current;
    const btn = tabBtnRefs.current[activeExercise];
    if (container && btn) {
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.clientWidth;
      const target = btnLeft - containerWidth / 2 + btnWidth / 2;
      container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }
  }, [activeExercise]);

  useEffect(() => { if (!loading && !user) router.push("/login"); }, [user, loading, router]);

  useEffect(() => {
    if (tabsRef.current) {
      const el = tabsRef.current;
      const needs = el.scrollWidth > el.clientWidth;
      setTabNeedsScroll(needs);
      setTabScrollEnd(!needs);
    }
  }, [activeLessonIdx]);

  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch("/api/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          localStorage.clear();
          router.push("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to load progress");
        const data = await res.json();

        const restored = lessons.map(l => l.exercises.map(() => false));
        const restoredCodes = lessons.map(l => l.exercises.map(e => e.initialCode));
        data.forEach((p: { lesson_id: number; exercise_id: number; completed: boolean; code_snapshot: string }) => {
          for (let li = 0; li < lessons.length; li++) {
            for (let ei = 0; ei < lessons[li].exercises.length; ei++) {
              if (lessons[li].id === p.lesson_id && lessons[li].exercises[ei].id === p.exercise_id && p.completed) {
                restored[li][ei] = true;
                if (p.code_snapshot) restoredCodes[li][ei] = p.code_snapshot;
              }
            }
          }
        });

        setAllSuccesses(restored);
        setAllCodes(restoredCodes);
        setProgressLoaded(true);
      } catch (err) {
        console.error("Error loading progress:", err);
        setAllSuccesses(lessons.map(l => l.exercises.map(() => false)));
        setAllCodes(lessons.map(l => l.exercises.map(e => e.initialCode)));
        setProgressLoaded(true);
      }
    };

    loadProgress();
  }, [user]);

  if (loading || !user || allCodes.length === 0) return (
    <div className="min-h-screen bg-slate-950" />
  );

  const lesson = lessons[activeLessonIdx];
  const exercises = lesson.exercises;
  const currentEx = exercises[activeExercise];
  const codes = allCodes[activeLessonIdx];
  const outputs = allOutputs[activeLessonIdx];
  const errors = allErrors[activeLessonIdx];
  const successes = allSuccesses[activeLessonIdx];
  const completedCount = successes.filter(Boolean).length;

  const switchLesson = (idx: number) => {
    setActiveLessonIdx(idx);
    setActiveExercise(0);
    tabBtnRefs.current = [];
    setIsSidebarOpen(false);
    setMobileView('theory');
  };

  const updateLessonState = (setter: any, updater: (arr: any[]) => any[]) => {
    setter((prev: any[][]) => { const n = prev.map(a => [...a]); n[activeLessonIdx] = updater(n[activeLessonIdx]); return n; });
  };

  const handleRun = async () => {
    setRunning(true);
    const result = await runCode(codes[activeExercise], currentEx.testCode || "");
    const out = result.output?.trim() || "";

    updateLessonState(setAllOutputs, a => { a[activeExercise] = result.output || ""; return a; });
    updateLessonState(setAllErrors, a => { a[activeExercise] = result.error || ""; return a; });

    if (result.error) {
      const raw = result.error;
      let title = "¡Ups! Algo salió mal", message = raw;
      if (raw.includes("AssertionError:")) {
        title = "❌ Ejercicio incorrecto";
        const m = raw.match(/AssertionError: (.+)/); message = m ? m[1] : "Respuesta incorrecta.";
      } else if (raw.includes("SyntaxError:")) {
        title = "⚠️ Error de Sintaxis";
        const m = raw.match(/SyntaxError: (.+)/); message = `Error de escritura: ${m?.[1] || ""}.\nRevisa paréntesis y comillas.`;
      } else if (raw.includes("NameError:")) {
        title = "🔍 Variable no encontrada";
        const m = raw.match(/NameError: (.+)/); message = `${m?.[1] || raw}.\nDefine todas las variables correctamente.`;
      }
      setErrorModal({ title, message });
      updateLessonState(setAllSuccesses, a => { a[activeExercise] = false; return a; });
    } else if (currentEx.outputCheck) {
      if (out === currentEx.outputCheck) {
        updateLessonState(setAllSuccesses, a => { a[activeExercise] = true; return a; });
        saveProgress(lesson.id, currentEx.id, codes[activeExercise]);
      } else {
        setErrorModal({ title: "❌ El mensaje no coincide", message: `Esperado:\n'${currentEx.outputCheck}'\n\nObtenido:\n'${out}'\n\nRevisa mayúsculas y espacios.` });
        updateLessonState(setAllSuccesses, a => { a[activeExercise] = false; return a; });
      }
    } else {
      updateLessonState(setAllSuccesses, a => { a[activeExercise] = true; return a; });
      saveProgress(lesson.id, currentEx.id, codes[activeExercise]);
    }
    setRunning(false);
  };

  const codeComponents: any = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" className="rounded-md" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="text-orange-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700/50" {...props}>{children}</code>
      );
    }
  };

  return (
    <div className="flex h-[100dvh] bg-slate-950 text-slate-200 font-sans overflow-hidden">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 transform transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-800">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-blue-400" /> Dashboard
            </h1>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-3">
          {Array.from(new Set(lessons.map(l => l.module))).map((modName) => (
            <div key={modName} className="mb-4">
              <div className="px-4 mb-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {modName}
              </div>
              {lessons.map((l, idx) => {
                if (l.module !== modName) return null;
                const done = allSuccesses[idx]?.filter(Boolean).length || 0;
                const total = l.exercises.length;
                const isActive = idx === activeLessonIdx;
                return (
                  <button key={l.id} onClick={() => switchLesson(idx)}
                    className={`w-full flex items-center px-4 py-3 transition-colors text-left ${isActive ? 'bg-blue-900/20 text-blue-400 border-r-2 border-blue-500' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                    {done === total ? <CheckCircle className="w-4 h-4 mr-3 shrink-0 text-green-400" /> : <Circle className="w-4 h-4 mr-3 shrink-0" />}
                    <div className="min-w-0">
                      <div className="text-sm font-medium leading-snug">{l.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{done}/{total} ejercicios</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-800">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Progreso lección</span>
            <span className="text-blue-400 font-medium">{completedCount}/{exercises.length}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(completedCount / exercises.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="py-2.5 lg:py-0 lg:h-14 bg-slate-900 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between px-4 lg:px-6 shrink-0 gap-2.5 lg:gap-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white shrink-0">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm lg:text-base font-semibold leading-snug truncate lg:text-clip">{lesson.title}</h2>
          </div>
          <div className="flex items-center w-full lg:w-auto space-x-2 sm:space-x-3 shrink-0 pl-8 lg:pl-0">
            <div className="flex items-center text-xs">
              <div className={`w-2 h-2 rounded-full mr-1.5 ${isReady ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
              <span className="hidden sm:inline">{isReady ? 'Entorno Listo' : 'Inicializando...'}</span>
              <span className="sm:hidden text-[10px] text-slate-300">{isReady ? 'Listo' : 'Cargando'}</span>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              {user.role === 'profesor' ? <School className="w-3.5 h-3.5 text-indigo-400 hidden sm:block" /> : <GraduationCap className="w-3.5 h-3.5 text-blue-400 hidden sm:block" />}
              <span className="text-[11px] sm:text-sm text-slate-300 font-medium truncate max-w-[80px] sm:max-w-none">{user.username}</span>
              <span className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border ${user.role === 'profesor' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                {user.role === 'profesor' ? 'Profesor' : 'Estudiante'}
              </span>
            </div>
            <button onClick={logout} className="flex items-center text-slate-500 hover:text-red-400 transition-colors text-xs ml-auto">
              <LogOut className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </header>

        {/* Mobile View Tabs */}
        <div className="flex lg:hidden border-b border-slate-800 bg-slate-900 shrink-0">
          <button
            onClick={() => setMobileView('theory')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${mobileView === 'theory' ? 'border-blue-500 text-blue-400 bg-blue-900/10' : 'border-transparent text-slate-400'}`}>
            Teoría
          </button>
          <button
            onClick={() => setMobileView('exercises')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${mobileView === 'exercises' ? 'border-blue-500 text-blue-400 bg-blue-900/10' : 'border-transparent text-slate-400'}`}>
            Ejercicios
          </button>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Theory */}
          <div className={`${mobileView === 'theory' ? 'flex' : 'hidden'} lg:flex absolute inset-0 lg:static lg:w-[42%] flex-col border-r border-slate-800 bg-slate-950 overflow-hidden shrink-0 z-10 lg:z-0`}>
            <div className="flex items-center px-6 py-3 border-b border-slate-800 bg-slate-900/60">
              <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Teoría</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert prose-blue prose-sm max-w-none">
                <ReactMarkdown components={codeComponents}>{lesson.theory}</ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Exercises */}
          <div className={`${mobileView === 'exercises' ? 'flex' : 'hidden'} lg:flex absolute inset-0 lg:static lg:flex-1 flex-col bg-slate-950 overflow-y-hidden z-10 lg:z-0`}>
            {/* Tabs */}
            <div className="relative">
              <div ref={tabsRef} className="flex border-b border-slate-800 bg-slate-900/60 shrink-0 overflow-x-auto"
                onWheel={(e) => {
                  e.preventDefault();
                  e.currentTarget.scrollLeft += e.deltaY;
                }}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  setTabScrollEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 5);
                }}>
                {exercises.map((ex, i) => (
                  <button key={ex.id} ref={(el) => { tabBtnRefs.current[i] = el; }} onClick={() => setActiveExercise(i)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap shrink-0 ${activeExercise === i ? 'border-blue-500 text-blue-400 bg-blue-900/10' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}>
                    {successes[i] ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
                    Ejercicio {i + 1}
                  </button>
                ))}
              </div>
              {tabNeedsScroll && !tabScrollEnd && (
                <button
                  onClick={() => {
                    if (tabsRef.current) tabsRef.current.scrollLeft += 200;
                  }}
                  className="absolute top-1.5 right-1 w-8 h-8 rounded-lg flex items-center justify-center transition-all scale-110 bg-slate-800"
                  style={{ filter: "drop-shadow(0 0 4px #F58400) drop-shadow(0 0 10px #F58400) drop-shadow(0 0 20px rgba(245,132,0,0.6))", zIndex: 10 }}
                >
                  <ChevronRight className="w-7 h-7" style={{ color: "#F58400" }} />
                </button>
              )}
            </div>

            {/* Instructions */}
            <div className="px-5 py-3 bg-slate-900/40 border-b border-slate-800 shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-white">{currentEx.title}</span>
                <DifficultyBadge color={currentEx.difficultyColor} label={currentEx.difficulty} />
              </div>
              <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                <ReactMarkdown components={codeComponents}>{currentEx.instructions}</ReactMarkdown>
              </div>
              <button onClick={() => { const nh = showHint.map(a => [...a]); nh[activeLessonIdx][activeExercise] = !nh[activeLessonIdx][activeExercise]; setShowHint(nh); }}
                className="mt-1 text-xs text-yellow-500/70 hover:text-yellow-400 transition-colors">
                {showHint[activeLessonIdx][activeExercise] ? '▲ Ocultar pista' : '💡 Ver pista'}
              </button>
              {showHint[activeLessonIdx][activeExercise] && (
                <div className="mt-2 text-xs text-yellow-400/80 bg-yellow-500/5 border border-yellow-500/20 rounded-lg px-3 py-2">{currentEx.hint}</div>
              )}
            </div>

            {/* Editor toolbar */}
            <div className="flex items-center justify-end px-4 py-2 bg-slate-900 border-b border-slate-800 shrink-0">
              <button onClick={handleRun} disabled={!isReady || running}
                className="flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-medium rounded-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all">
                {running ? <div className="w-3.5 h-3.5 mr-1.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
                Ejecutar y Verificar
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <CodeEditor code={codes[activeExercise]}
                onChange={(v: string | undefined) => { const n = allCodes.map(a => [...a]); n[activeLessonIdx][activeExercise] = v || ""; setAllCodes(n); }}
                disabled={!isReady} />
            </div>

            {/* Terminal */}
            <div className="h-36 bg-black border-t border-slate-800 p-3 font-mono text-xs overflow-y-auto shrink-0">
              <div className="flex items-center text-slate-500 mb-1.5">
                <Terminal className="w-3.5 h-3.5 mr-1.5" /><span>Salida de Consola</span>
              </div>
              {outputs[activeExercise] && <div className="text-green-400 whitespace-pre-wrap">{outputs[activeExercise]}</div>}
              {errors[activeExercise] && <div className="text-red-400 whitespace-pre-wrap border-l-2 border-red-500 pl-2 mt-1">{errors[activeExercise]}</div>}
              {successes[activeExercise] && (
                <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" />¡Ejercicio completado correctamente!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <XCircle className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-3">{errorModal.title}</h3>
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-5">
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">{errorModal.message}</p>
            </div>
            <p className="text-slate-500 text-xs text-center mb-5">💡 Usa el botón <span className="text-yellow-400">"Ver pista"</span> si necesitas ayuda.</p>
            <button onClick={() => setErrorModal(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
              <X className="w-4 h-4" />Cerrar e Intentar de Nuevo
            </button>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {completedCount === exercises.length && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">¡Felicidades!</h3>
            <p className="text-slate-400 text-sm mb-6">Completaste todos los ejercicios de <strong className="text-white">"{lesson.title}"</strong>.</p>
            <button onClick={() => updateLessonState(setAllSuccesses, a => a.map(() => false))}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all">
              Seguir Practicando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
