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
      { id:101, title:"Ejercicio 1: Tu primer print", difficulty:"Básico", difficultyColor:"green",
        instructions:"Usa `print()` para mostrar `'Hola, Python!'` en la consola.",
        initialCode:"# Escribe tu código aquí\n\n", outputCheck:"Hola, Python!", testCode:"",
        hint:"El texto debe ir entre comillas dentro del print()." },
      { id:102, title:"Ejercicio 2: Variables y tipos", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea `nombre` con tu nombre (texto).\n2. Crea `edad` con tu edad (entero).\n3. Imprime ambas.",
        initialCode:"# Define tus variables aquí\n\n", outputCheck:null,
        testCode:"assert 'nombre' in locals(), \"Falta la variable 'nombre'\"\nassert 'edad' in locals(), \"Falta la variable 'edad'\"\nassert isinstance(nombre, str), \"'nombre' debe ser texto\"\nassert isinstance(edad, int), \"'edad' debe ser entero\"",
        hint:"Textos entre comillas, números sin comillas." },
      { id:103, title:"Ejercicio 3: Suma y resultado", difficulty:"Reto", difficultyColor:"red",
        instructions:"1. Crea `numero_1 = 15` y `numero_2 = 7`.\n2. Guarda la suma en `resultado`.\n3. Imprime `'El resultado es:'` y luego `resultado`.",
        initialCode:"# Tu solución aquí\n\n", outputCheck:null,
        testCode:"assert 'resultado' in locals(), \"Falta 'resultado'\"\nassert resultado == 22, f\"resultado debe ser 22, obtuviste: {resultado}\"",
        hint:"Usa + para sumar y guarda en resultado." },
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
      { id:201, title:"Ejercicio 1: Tu primer String", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea una variable `saludo` con el texto `'Hola mundo'`.\n2. Imprime `saludo`.",
        initialCode:"# Crea tu variable saludo e imprímela\n\n", outputCheck:"Hola mundo",
        hint:"Recuerda que los textos van entre comillas: saludo = 'Hola mundo'." },
      { id:202, title:"Ejercicio 2: Concatenación", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea `nombre = 'Ana'`.\n2. Crea `saludo = 'Hola, ' + nombre`.\n3. Imprime `saludo`.",
        initialCode:"# Concatena 'Hola, ' con nombre\n\n", outputCheck:"Hola, Ana",
        hint:"Usa el operador + para unir textos: saludo = 'Hola, ' + nombre." },
      { id:203, title:"Ejercicio 3: El operador +=", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea `mensaje = 'Me gusta la pizza'`.\n2. Usa `+=` para agregar `' con extra queso'`.\n3. Imprime `mensaje`.",
        initialCode:"# Usa += para agregar texto al mensaje\n\n", outputCheck:"Me gusta la pizza con extra queso",
        hint:"mensaje += ' con extra queso' agrega sin borrar lo anterior." },
      { id:204, title:"Ejercicio 4: str() - Convertir números a texto", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea `edad = 25`.\n2. Crea `mensaje = 'Tengo ' + str(edad) + ' años'`.\n3. Imprime `mensaje`.",
        initialCode:"edad = 25\n# Usa str() para convertir el número a texto\n\n", outputCheck:"Tengo 25 años",
        hint:"str(edad) convierte el número 25 al texto '25'." },
      { id:205, title:"Ejercicio 5: find() - Buscar en texto", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"Dada `frase = 'Hola Mundo'`:\n1. Usa `.find()` para encontrar la posición de `'Mundo'` y guárdala en `posicion`.\n2. Imprime `posicion`.",
        initialCode:"frase = 'Hola Mundo'\n# Encuentra la posición de 'Mundo'\n\n", outputCheck:"5",
        hint:"posicion = frase.find('Mundo'). Recuerda: las computadoras cuentan desde 0." },
      { id:206, title:"Ejercicio 6: Slicing", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"Dada `palabra = 'Elefante'`:\n1. Extrae `'Ele'` usando slicing `[0:3]` y guárdalo en `pedacito`.\n2. Imprime `pedacito`.",
        initialCode:"palabra = 'Elefante'\n# Extrae 'Ele' con slicing\n\n", outputCheck:"Ele",
        hint:"pedacito = palabra[0:3]. El número final NO se incluye." },
      { id:207, title:"Ejercicio 7: Comparación con ==", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea `a = 'Hola'` y `b = 'hola'`.\n2. Crea `son_iguales = (a == b)`.\n3. Imprime `son_iguales` (debe ser `False`).",
        initialCode:"# Compara los textos con ==\n\n", outputCheck:"False",
        hint:"Python distingue mayúsculas de minúsculas. 'Hola' != 'hola'." },
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
      { id:301, title:"Ejercicio 1: Evitando 'for'", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea una variable llamada \`For\` (con F mayúscula) y asígnale el valor \`3\`.\n2. Imprime el valor de \`For\`.",
        initialCode:"# Crea la variable 'For' e imprímela\n\n", outputCheck:null,
        testCode:"assert 'For' in locals(), \"Falta la variable 'For'\"\nassert For == 3, f\"For debe ser 3, obtuviste: {For}\"",
        hint:"Usa 'For' en lugar de 'for' para evitar el error de palabra reservada." },
      { id:302, title:"Ejercicio 2: Múltiples variables", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea \`Class_num = 10\`.\n2. Crea \`Import = 'datos'\`.\n3. Crea \`Is_valid = True\`.\n4. Imprime las tres variables.",
        initialCode:"# Crea las tres variables aquí\n\n", outputCheck:null,
        testCode:"assert 'Class_num' in locals(), \"Falta 'Class_num'\"\nassert 'Import' in locals(), \"Falta 'Import'\"\nassert 'Is_valid' in locals(), \"Falta 'Is_valid'\"\nassert Class_num == 10, \"Class_num debe ser 10\"\nassert Import == 'datos', \"Import debe ser 'datos'\"\nassert Is_valid == True, \"Is_valid debe ser True\"",
        hint:"Cambia la capitalización para evitar conflictos: Class_num, Import, Is_valid." },
      { id:303, title:"Ejercicio 3: Reto de reservadas", difficulty:"Reto", difficultyColor:"red",
        instructions:"Crea 4 variables usando capitalización diferente para estas palabras reservadas:\n1. \`And\` = 1\n2. \`Def\` = 2\n3. \`For\` = 3\n4. \`In\` = 4\n5. Imprime todas.",
        initialCode:"# Crea las 4 variables aquí\n\n", outputCheck:null,
        testCode:"assert 'And' in locals(), \"Falta 'And'\"\nassert 'Def' in locals(), \"Falta 'Def'\"\nassert 'For' in locals(), \"Falta 'For'\"\nassert 'In' in locals(), \"Falta 'In'\"\nassert And == 1, \"And debe ser 1\"\nassert Def == 2, \"Def debe ser 2\"\nassert For == 3, \"For debe ser 3\"\nassert In == 4, \"In debe ser 4\"",
        hint:"Usa la primera letra en mayúscula: And, Def, For, In." },
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
      { id:401, title:"Ejercicio 1: Suma", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea \`numero_1 = 8\` y \`numero_2 = 5\`.\n2. Guarda la suma en \`resultado\`.\n3. Imprime \`resultado\`.",
        initialCode:"# Realiza la suma\n\n", outputCheck:"13",
        hint:"resultado = numero_1 + numero_2." },
      { id:402, title:"Ejercicio 2: Resta", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea \`a = 20\` y \`b = 7\`.\n2. Guarda la resta en \`resultado\`.\n3. Imprime \`resultado\`.",
        initialCode:"# Realiza la resta\n\n", outputCheck:"13",
        hint:"resultado = a - b." },
      { id:403, title:"Ejercicio 3: Multiplicación", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea \`x = 9\` y \`y = 6\`.\n2. Guarda el producto en \`resultado\`.\n3. Imprime \`resultado\`.",
        initialCode:"# Realiza la multiplicación\n\n", outputCheck:"54",
        hint:"resultado = x * y." },
      { id:404, title:"Ejercicio 4: Exponente", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea \`base = 3\` y \`exponente = 4\`.\n2. Calcula la potencia y guárdala en \`resultado\`.\n3. Imprime \`resultado\` (debe ser 81).",
        initialCode:"# Calcula 3 elevado a 4\n\n", outputCheck:"81",
        hint:"resultado = base ** exponente." },
      { id:405, title:"Ejercicio 5: División", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea \`numerador = 15\` y \`denominador = 4\`.\n2. Calcula la división y guárdala en \`resultado\`.\n3. Imprime \`resultado\`.",
        initialCode:"# Realiza la división\n\n", outputCheck:"3.75",
        hint:"resultado = numerador / denominador." },
      { id:406, title:"Ejercicio 6: Módulo (resto)", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea \`dividendo = 17\` y \`divisor = 5\`.\n2. Calcula el residuo y guárdalo en \`resto\`.\n3. Imprime \`resto\`.",
        initialCode:"# Calcula el residuo de 17 entre 5\n\n", outputCheck:"2",
        hint:"resto = dividendo % divisor (17 dividido 5 da 3 y sobra 2)." },
      { id:407, title:"Ejercicio 7: División entera", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea \`dividendo = 23\` y \`divisor = 4\`.\n2. Calcula la división entera y guárdala en \`cociente\`.\n3. Imprime \`cociente\`.",
        initialCode:"# Calcula la división entera de 23 entre 4\n\n", outputCheck:"5",
        hint:"cociente = dividendo // divisor (23 dividido 4 da 5, sin decimales)." },
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
      { id:501, title:"Ejercicio 1: Tu primer comentario", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea una variable `mensaje = 'Hola Python'`.\n2. Agrega un comentario en una línea separada usando `#` que diga `'Mi primer comentario'`.\n3. Imprime `mensaje`.",
        initialCode:"# Agrega tu comentario aquí\n\n", outputCheck:"Hola Python",
        hint:"Escribe # Mi primer comentario en una línea, luego define la variable." },
      { id:502, title:"Ejercicio 2: Comentario multilínea", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Usa tres comillas `\"\"\"` para crear un comentario multilínea que diga `'Este es un comentario de varias líneas'`.\n2. Crea `nombre = 'Estudiante'`.\n3. Imprime `nombre`.",
        initialCode:"# Usa \"\"\" para el comentario multilínea\n\n", outputCheck:"Estudiante",
        hint:"Abre con \"\"\" y cierra con \"\"\" en líneas separadas, luego crea la variable." },
      { id:503, title:"Ejercicio 3: Combinando comentarios", difficulty:"Reto", difficultyColor:"red",
        instructions:"1. Agrega un comentario de una línea con `#` que diga `'Comentario simple'`.\n2. Agrega un comentario multilínea con `'''` que diga `'Comentario de bloque'`.\n3. Crea `curso = 'Python'` y `nivel = 1`.\n4. Imprime ambas variables.",
        initialCode:"# Combina ambos tipos de comentarios\n\n", outputCheck:null,
        testCode:"assert 'curso' in locals(), \"Falta la variable 'curso'\"\nassert 'nivel' in locals(), \"Falta la variable 'nivel'\"\nassert curso == 'Python', \"curso debe ser 'Python'\"\nassert nivel == 1, \"nivel debe ser 1\"",
        hint:"Usa # para el comentario simple y ''' para el multilínea. Luego define las dos variables." },
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
      { id:601, title:"Ejercicio 1: Números y type()", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea `entero = 15` y `flotante = 3.14`.\n2. Imprime el tipo de dato de ambas usando `type()`.",
        initialCode:"# Crea las variables e imprime sus tipos\n\n", outputCheck:null,
        testCode:"assert 'entero' in locals(), \"Falta 'entero'\"\nassert 'flotante' in locals(), \"Falta 'flotante'\"\nassert isinstance(entero, int), \"'entero' debe ser int\"\nassert isinstance(flotante, float), \"'flotante' debe ser float\"",
        hint:"Usa print(type(entero)) y print(type(flotante))." },
      { id:602, title:"Ejercicio 2: Cadenas y Booleanos", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea `texto = 'Hola'`.\n2. Crea `es_verdad = True`.\n3. Imprime ambas variables separadas por coma en un solo `print()`.",
        initialCode:"# Crea las variables y usa un solo print\n\n", outputCheck:"Hola True",
        testCode:"assert 'texto' in locals(), \"Falta 'texto'\"\nassert 'es_verdad' in locals(), \"Falta 'es_verdad'\"\nassert isinstance(texto, str), \"'texto' debe ser str\"\nassert isinstance(es_verdad, bool), \"'es_verdad' debe ser bool\"",
        hint:"print(texto, es_verdad) imprimirá ambas variables en una línea." },
      { id:603, title:"Ejercicio 3: Múltiples tipos y Complejos", difficulty:"Reto", difficultyColor:"red",
        instructions:"1. Crea una variable `complejo = 2 + 3j`.\n2. Imprime un solo print pasando el texto `'El tipo es:'` separado por coma de `type(complejo)`.",
        initialCode:"# Crea el número complejo e imprime su tipo\n\n", outputCheck:null,
        testCode:"assert 'complejo' in locals(), \"Falta 'complejo'\"\nassert isinstance(complejo, complex), \"'complejo' debe ser complex\"",
        hint:"Usa print('El tipo es:', type(complejo))." },
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
      { id:701, title:"Ejercicio 1: Conversión a Entero", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Dada la variable `texto = '50'`, conviértela a entero usando `int()` y guárdala en `numero`.\n2. Imprime `numero`.",
        initialCode:"texto = '50'\n# Convierte 'texto' a entero\n\n", outputCheck:"50",
        testCode:"assert 'numero' in locals(), \"Falta 'numero'\"\nassert isinstance(numero, int), \"'numero' debe ser int\"\nassert numero == 50, \"'numero' debe ser 50\"",
        hint:"numero = int(texto)" },
      { id:702, title:"Ejercicio 2: Conversión a Flotante", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Dada la variable `precio_txt = '19.99'`, conviértela a flotante usando `float()` y guárdala en `precio`.\n2. Imprime `precio`.",
        initialCode:"precio_txt = '19.99'\n# Convierte a flotante\n\n", outputCheck:"19.99",
        testCode:"assert 'precio' in locals(), \"Falta 'precio'\"\nassert isinstance(precio, float), \"'precio' debe ser float\"\nassert precio == 19.99, \"'precio' debe ser 19.99\"",
        hint:"precio = float(precio_txt)" },
      { id:703, title:"Ejercicio 3: Separando con comas en print()", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea una variable `edad = 20` (un número entero).\n2. Imprime exactamente: `Tengo 20 años` usando **comas** para separar el texto del número en un solo `print()`.",
        initialCode:"# Crea la variable y usa print con comas\n\n", outputCheck:"Tengo 20 años",
        testCode:"assert 'edad' in locals(), \"Falta 'edad'\"\nassert isinstance(edad, int), \"'edad' debe ser un número entero\"",
        hint:"print('Tengo', edad, 'años')" },
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
      { id:801, title:"Ejercicio 1: Tu primer if", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea una variable `edad = 18`.\n2. Escribe una sentencia `if` que compruebe si `edad` es mayor o igual a `18`.\n3. Si es verdad, imprime `'Eres mayor de edad'`.\n*(No olvides los dos puntos y la indentación).*.",
        initialCode:"edad = 18\n# Escribe tu if aquí\n\n", outputCheck:"Eres mayor de edad",
        testCode:"assert 'edad' in locals(), \"Falta 'edad'\"\nassert edad == 18, \"'edad' debe ser 18\"",
        hint:"if edad >= 18:\n    print('Eres mayor de edad')" },
      { id:802, title:"Ejercicio 2: El poder de la indentación", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"El siguiente código tiene un error porque no respeta los espacios (indentación). Arréglalo para que funcione y muestre el mensaje secreto.",
        initialCode:"clave = 1234\n\nif clave == 1234:\nprint('Acceso concedido al búnker secreto')\n", outputCheck:"Acceso concedido al búnker secreto",
        testCode:"assert 'clave' in locals()",
        hint:"El print debe tener un espacio o tabulación (indentación) antes de la palabra print." },
      { id:803, title:"Ejercicio 3: Calculadora de Promedio", difficulty:"Reto", difficultyColor:"red",
        instructions:"1. Crea 3 variables: `nota1 = 7`, `nota2 = 8`, y `nota3 = 5`.\n2. Suma las tres notas y divide el resultado entre 3 para calcular el `promedio`. Guárdalo en esa variable.\n3. Si el `promedio` es mayor o igual a `6`, imprime `'Aprobado'`. (Usa un `if`).",
        initialCode:"# Crea las notas, calcula el promedio y usa el if\n\n", outputCheck:"Aprobado",
        testCode:"assert 'nota1' in locals() and 'nota2' in locals() and 'nota3' in locals(), \"Faltan las notas\"\nassert 'promedio' in locals(), \"Falta calcular el 'promedio'\"\nassert promedio == (7+8+5)/3, \"Cálculo de promedio incorrecto\"",
        hint:"promedio = (nota1 + nota2 + nota3) / 3\nif promedio >= 6:\n    print('Aprobado')" },
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
      { id:901, title:"Ejercicio 1: Concepto de if-else", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea una variable `edad = 15`.\n2. Escribe una estructura `if-else`. Si la `edad` es mayor o igual a `18`, imprime `'Acceso'`. Si no (`else`), imprime `'Denegado'`.",
        initialCode:"edad = 15\n# Escribe tu condicional aquí\n\n", outputCheck:"Denegado",
        testCode:"assert 'edad' in locals(), \"Falta 'edad'\"\nassert edad == 15, \"'edad' debe ser 15\"",
        hint:"if edad >= 18:\n    print('Acceso')\nelse:\n    print('Denegado')" },
      { id:902, title:"Ejercicio 2: Sintaxis e Indentación", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"El siguiente código tiene errores de sintaxis. El `else` no está alineado correctamente con el `if`, le faltan los dos puntos (`:`), y falta indentación. Arréglalo para que funcione.",
        initialCode:"llueve = True\n\nif llueve:\n    print('Lleva paraguas')\n  else\nprint('Usa gafas de sol')\n", outputCheck:"Lleva paraguas",
        testCode:"assert 'llueve' in locals()",
        hint:"Alinea el else al mismo nivel que el if, ponle ':' al final, y dale un espacio o tabulación al print de abajo." },
      { id:903, title:"Ejercicio 3: Función round()", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Dada la variable `numero_largo = 8.123456`.\n2. Usa la función `round()` para redondear el número a **2 decimales** y guárdalo en la variable `numero_corto`.\n3. Imprime `numero_corto`.",
        initialCode:"numero_largo = 8.123456\n# Redondea y guarda en numero_corto\n\n", outputCheck:"8.12",
        testCode:"assert 'numero_corto' in locals(), \"Falta 'numero_corto'\"\nassert numero_corto == 8.12, \"El valor debe ser redondeado a 8.12\"",
        hint:"numero_corto = round(numero_largo, 2)" },
      { id:904, title:"Ejercicio 4: Práctica Integradora", difficulty:"Reto", difficultyColor:"red",
        instructions:"1. Crea: `mate = 5`, `quimica = 6`, y `biologia = 6`.\n2. Calcula el promedio y usa `round()` para redondearlo a **1 decimal**, guardándolo en `promedio`.\n3. Usa `if-else`: Si el `promedio` es `>= 6.0`, imprime `'Aprobado'`. Si no, imprime `'Reprobado'`.",
        initialCode:"# Crea variables, calcula promedio redondeado a 1 decimal, y usa if-else\n\n", outputCheck:"Reprobado",
        testCode:"assert 'mate' in locals() and 'quimica' in locals() and 'biologia' in locals(), \"Faltan las notas\"\nassert 'promedio' in locals(), \"Falta calcular el 'promedio'\"\nassert promedio == 5.7, \"El promedio redondeado a 1 decimal debe ser 5.7\"",
        hint:"promedio = round((mate + quimica + biologia) / 3, 1)" },
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
      { id:1001, title:"Ejercicio 1: Concepto de Múltiples Caminos", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea una variable `semaforo = 'Amarillo'`.\n2. Evalúa: Si es `'Verde'` imprime `'Avanzar'`. `elif` es `'Amarillo'` imprime `'Precaución'`. `elif` es `'Rojo'` imprime `'Detenerse'`.\n*(Respeta mayúsculas y minúsculas)*",
        initialCode:"semaforo = 'Amarillo'\n# Escribe tu condicional múltiple aquí\n\n", outputCheck:"Precaución",
        testCode:"assert 'semaforo' in locals(), \"Falta 'semaforo'\"\nassert semaforo == 'Amarillo', \"'semaforo' debe ser 'Amarillo'\"",
        hint:"if semaforo == 'Verde': ... elif semaforo == 'Amarillo': ..." },
      { id:1002, title:"Ejercicio 2: Uso del elif", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Crea `dia = 3`.\n2. Haz una estructura condicional:\n- Si `dia == 1`: imprime `'Lunes'`\n- `elif dia == 2`: imprime `'Martes'`\n- `elif dia == 3`: imprime `'Miércoles'`",
        initialCode:"dia = 3\n# Escribe tu código aquí\n\n", outputCheck:"Miércoles",
        testCode:"assert 'dia' in locals(), \"Falta 'dia'\"\nassert dia == 3, \"'dia' debe ser 3\"",
        hint:"Usa if dia == 1: ... elif dia == 2: ... elif dia == 3: ..." },
      { id:1003, title:"Ejercicio 3: Sintaxis completa (if-elif-else)", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"El siguiente código evalúa opciones de un menú, pero le falta la palabra correcta para la segunda opción y el final. Cambia los `???` por `elif` o `else` según corresponda.",
        initialCode:"opcion = 4\n\nif opcion == 1:\n    print('Perfil')\n??? opcion == 2:\n    print('Configuración')\n???:\n    print('Opción inválida')\n", outputCheck:"Opción inválida",
        testCode:"assert 'opcion' in locals()",
        hint:"Reemplaza el primer ??? con elif y el segundo con else." },
      { id:1004, title:"Ejercicio 4: Convertidor Práctico", difficulty:"Reto", difficultyColor:"red",
        instructions:"Vamos a replicar el convertidor. Crea `num = 5`. Crea un `if`, varios `elif` y un `else`. Para 1 imprime `'Uno'`, para 2 `'Dos'`, etc., hasta el 5 (`'Cinco'`). Si es otro número, imprime `'No soportado'`.",
        initialCode:"num = 5\n# Crea el convertidor del 1 al 5\n\n", outputCheck:"Cinco",
        testCode:"assert 'num' in locals()",
        hint:"if num == 1: print('Uno') ... elif num == 5: print('Cinco') else: print('No soportado')" },
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
      { id:1101, title:"Ejercicio 1: Saltos de línea", difficulty:"Básico", difficultyColor:"green",
        instructions:"Crea un único `print()` que muestre la palabra `'Hola'`, seguida de un salto de línea (`\\n`), y luego la palabra `'Mundo'`. No uses espacios extra.",
        initialCode:"# Escribe tu print con salto de línea aquí\n\n", outputCheck:"Hola\nMundo",
        testCode:"pass",
        hint:"print('Hola\\nMundo')" },
      { id:1102, title:"Ejercicio 2: Uso de .lower()", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Dada la variable `entrada = 'PyThOn'`.\n2. Conviértela a minúsculas usando `.lower()` y guárdala en la variable `salida`.\n3. Imprime `salida`.",
        initialCode:"entrada = 'PyThOn'\n# Convierte a minúsculas y guarda en 'salida'\n\n", outputCheck:"python",
        testCode:"assert 'salida' in locals(), \"Falta 'salida'\"\nassert salida == 'python', \"Debe ser 'python' en minúsculas\"",
        hint:"salida = entrada.lower()" },
      { id:1103, title:"Ejercicio 3: Anidación Simple", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Tienes `usuario = 'admin'` y `clave = 123`.\n2. Escribe un `if` que verifique si `usuario == 'admin'`.\n3. **DENTRO** de ese `if` (anidado), escribe otro `if` que verifique si `clave == 123` e imprima `'Acceso Total'`. *(Cuidado con la doble tabulación).*.",
        initialCode:"usuario = 'admin'\nclave = 123\n\n# Escribe tus ifs anidados aquí\n\n", outputCheck:"Acceso Total",
        testCode:"assert 'usuario' in locals() and 'clave' in locals()",
        hint:"if usuario == 'admin':\n    if clave == 123:\n        print('Acceso Total')" },
      { id:1104, title:"Ejercicio 4: El Mini Conversor Doble", difficulty:"Reto", difficultyColor:"red",
        instructions:"Tienes `menu = 2` y `texto = 'UNO'`. Construye un `if` donde verifiques si `menu == 2`. Dentro de ese `if`, convierte `texto` a minúsculas y haz un `if` anidado: si el texto convertido es `'uno'`, imprime `'El número es 1'`.",
        initialCode:"menu = 2\ntexto = 'UNO'\n\n# Construye tu menú anidado y usa .lower()\n\n", outputCheck:"El número es 1",
        testCode:"assert 'menu' in locals()",
        hint:"if menu == 2:\n    texto = texto.lower()\n    if texto == 'uno':\n        print('El número es 1')" },
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
      { id:1201, title:"Ejercicio 1: Comparaciones Básicas", difficulty:"Básico", difficultyColor:"green",
        instructions:"1. Crea una variable `num1 = 10` y `num2 = 20`.\n2. Crea `son_iguales` comparando si `num1` es igual a `num2`.\n3. Crea `son_diferentes` comparando si `num1` es diferente de `num2`.\n4. Imprime ambas variables separadas por una coma en un solo `print()`.",
        initialCode:"# Crea las variables y compáralas aquí\n\n", outputCheck:"False True",
        testCode:"assert 'num1' in locals() and 'num2' in locals(), \"Faltan las variables num1 y num2\"\nassert 'son_iguales' in locals() and 'son_diferentes' in locals(), \"Faltan las variables de comparación\"\nassert son_iguales == False, \"son_iguales debe ser False\"\nassert son_diferentes == True, \"son_diferentes debe ser True\"",
        hint:"Usa == para comparar igualdad y != para diferencia: son_iguales = (num1 == num2)." },
      { id:1202, title:"Ejercicio 2: Captura con int(input())", difficulty:"Intermedio", difficultyColor:"yellow",
        instructions:"1. Simula la captura de dos números: lee una entrada con `int(input())` y guárdala en `numero1`, y otra entrada en `numero2`.\n2. Imprime el mensaje: `Los números son:` seguido de `numero1` y `numero2` separados por la palabra `'y'`, usando comas en tu `print()`.\n\n*(Ejemplo de salida esperada si ingresas 5 y 10: 'Los números son: 5 y 10')*",
        initialCode:"# Pide los números enteros e imprímelos con comas\n\n", outputCheck:null,
        testCode:"assert 'numero1' in locals() and 'numero2' in locals(), \"Falta definir 'numero1' y 'numero2'\"\nassert isinstance(numero1, int) and isinstance(numero2, int), \"Debes usar int(input()) para convertirlos a enteros\"",
        hint:"Usa numero1 = int(input()) y luego print('Los números son:', numero1, 'y', numero2)." },
      { id:1203, title:"Ejercicio 3: Las 6 Comparaciones Relacionales", difficulty:"Reto", difficultyColor:"red",
        instructions:"Dadas las variables `num1 = 15` y `num2 = 10` (ya definidas):\nEscribe 6 bloques `if` simples e independientes (uno tras otro) que impriman el mensaje correspondiente si se cumple la condición:\n1. Si `num1 < num2`: imprime `'num1 es menor que num2'`\n2. Si `num1 > num2`: imprime `'num1 es mayor que num2'`\n3. Si `num1 == num2`: imprime `'num1 es igual a num2'`\n4. Si `num1 != num2`: imprime `'num1 es diferente de num2'`\n5. Si `num1 <= num2`: imprime `'num1 es menor o igual a num2'`\n6. Si `num1 >= num2`: imprime `'num1 es mayor o igual a num2'`",
        initialCode:"num1 = 15\nnum2 = 10\n\n# Escribe tus 6 bloques if independientes aquí\n\n", outputCheck:"num1 es mayor que num2\nnum1 es diferente de num2\nnum1 es mayor o igual a num2",
        testCode:"assert 'num1' in locals() and 'num2' in locals(), \"No debes borrar las variables num1 y num2\"",
        hint:"Escribe if independientes: \nif num1 < num2:\n    print('num1 es menor que num2')\n...\nNo uses elif ni else, solo sentencias if simples." },
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
    print("Ernesto")
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
];

function DifficultyBadge({ color, label }: { color: string; label: string }) {
  const map: Record<string,string> = {
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
  const [errorModal, setErrorModal] = useState<{title:string;message:string}|null>(null);
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
        setErrorModal({ title:"❌ El mensaje no coincide", message:`Esperado:\n'${currentEx.outputCheck}'\n\nObtenido:\n'${out}'\n\nRevisa mayúsculas y espacios.` });
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
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width:`${(completedCount/exercises.length)*100}%` }} />
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
              <span className={`text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border ${user.role==='profesor' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
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
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap shrink-0 ${activeExercise===i ? 'border-blue-500 text-blue-400 bg-blue-900/10' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}>
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
              <button onClick={() => { const nh = showHint.map(a=>[...a]); nh[activeLessonIdx][activeExercise] = !nh[activeLessonIdx][activeExercise]; setShowHint(nh); }}
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
                onChange={(v: string | undefined) => { const n = allCodes.map(a=>[...a]); n[activeLessonIdx][activeExercise] = v||""; setAllCodes(n); }}
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
            <button onClick={() => updateLessonState(setAllSuccesses, a => a.map(()=>false))}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all">
              Seguir Practicando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
