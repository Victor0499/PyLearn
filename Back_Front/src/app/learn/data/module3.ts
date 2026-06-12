// Módulo 3: Colecciones

export const module3Lessons = [
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
];
