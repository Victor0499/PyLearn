// Módulo 2: Control de Flujo

export const module2Lessons = [
  {
    id: 92,
    title: "La Importancia de la Indentación",
    module: "Estructuras de Control",
    theory: `## 1. ¿Qué es la Indentación?
En la mayoría de los lenguajes de programación, se usan llaves \`{}\` para agrupar bloques de código. ¡En Python no!
Python utiliza la **indentación** (los espacios al principio de la línea) para definir qué código pertenece a qué bloque.

## 2. Sangría Inesperada (Unexpected Indent)
Si pones espacios al principio de una línea de código normal sin motivo, Python se quejará con un error llamado \`IndentationError\`.
\`\`\`python
print("Hola")
  print("Mundo")  # ¡ERROR! Sangría inesperada
\`\`\`
Para que funcione, todas las instrucciones del flujo principal deben estar alineadas completamente a la izquierda.

## 3. Preparándonos para los bloques
Muy pronto aprenderemos comandos (como \`if\`, \`for\` o \`def\`) que **obligan** a que las siguientes líneas estén indentadas. Cuando veas que una línea termina en **dos puntos (\`:\`)**, significa que la siguiente línea debe llevar indentación (por convención, **4 espacios** o un toque a la tecla *Tab*).

\`\`\`python
if True:
    print("Estoy dentro del bloque")  # Esto tiene 4 espacios
    print("Yo también")               # Tienen que estar alineados
print("Yo estoy fuera del bloque")    # Volvimos a la izquierda
\`\`\`
`,
    exercises: [
      {
        id: 9201, title: "Ejercicio 1: Corrige la alineación", difficulty: "Básico", difficultyColor: "green",
        instructions: "El siguiente código tiene espacios extra que confunden a Python. Borra los espacios innecesarios para que todo el código esté pegado al margen izquierdo y pueda ejecutarse sin errores.",
        initialCode: "print('Iniciando programa')\n  mensaje = 'Todo en orden'\n    print(mensaje)\n", outputCheck: "Iniciando programa\nTodo en orden",
        testCode: "assert '  mensaje' not in __source__ and '    print' not in __source__, 'Elimina los espacios al principio de las líneas'",
        hint: "print('Iniciando programa')\nmensaje = 'Todo en orden'\nprint(mensaje)"
      },
      {
        id: 9202, title: "Ejercicio 2: Creando un bloque", difficulty: "Básico", difficultyColor: "green",
        instructions: "Aquí tienes una instrucción `if True:` que requiere un bloque. Indenta (pon 4 espacios antes de) la línea `print('Acceso concedido')` para que pertenezca a ese bloque y no dé error.",
        initialCode: "if True:\nprint('Acceso concedido')\n", outputCheck: "Acceso concedido",
        testCode: "assert '    print(' in __source__ or '\\tprint(' in __source__, 'Debes indentar el print dentro del if'",
        hint: "if True:\n    print('Acceso concedido')"
      },
      {
        id: 9203, title: "Ejercicio 3: Bloque múltiple", difficulty: "Intermedio", difficultyColor: "yellow",
        instructions: "Indenta las **tres** instrucciones `print` que están debajo de `if True:` para que formen parte del mismo bloque. Asegúrate de que las tres tengan exactamente la misma cantidad de espacios al inicio.",
        initialCode: "if True:\nprint('Paso 1')\nprint('Paso 2')\nprint('Paso 3')\n\nprint('Fin')", outputCheck: "Paso 1\nPaso 2\nPaso 3\nFin",
        testCode: "assert __source__.count('    print(\\'Paso') == 3 or __source__.count('\\tprint(\\'Paso') == 3, 'Las 3 instrucciones deben estar indentadas igual'",
        hint: "if True:\n    print('Paso 1')\n    print('Paso 2')\n    print('Paso 3')\n\nprint('Fin')"
      }
    ]
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
];
