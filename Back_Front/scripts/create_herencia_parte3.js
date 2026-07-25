const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((a, l) => {
  const [k, ...v] = l.split('=');
  if (k) a[k.trim()] = v.join('=').trim();
  return a;
}, {});

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const theory = `## Herencia Avanzada en Python

En las partes anteriores aprendiste los fundamentos de la herencia: heredar métodos y atributos, agregar comportamiento nuevo, sobreescribir métodos y usar \`super()\`. En esta parte exploraremos técnicas más avanzadas que se usan en proyectos Python reales.

---

### Herencia Múltiple

Python permite que una clase herede de **más de una clase padre** al mismo tiempo. Esto se conoce como herencia múltiple:

\`\`\`python
class Volador:
    def volar(self):
        print("Volando...")

class Nadador:
    def nadar(self):
        print("Nadando...")

class Pato(Volador, Nadador):
    pass

donald = Pato()
donald.volar()   # Heredado de Volador
donald.nadar()   # Heredado de Nadador
\`\`\`

---

### isinstance() e issubclass()

Estas dos funciones te permiten **verificar la jerarquía de clases** en tiempo de ejecución:

- \`isinstance(objeto, Clase)\` → devuelve \`True\` si el objeto es una instancia de esa clase (o de una subclase suya).
- \`issubclass(ClaseHija, ClasePadre)\` → devuelve \`True\` si la primera clase hereda de la segunda.

\`\`\`python
class Animal: pass
class Perro(Animal): pass

fido = Perro()
print(isinstance(fido, Perro))   # True
print(isinstance(fido, Animal))  # True  ← también es Animal!
print(issubclass(Perro, Animal)) # True
\`\`\`

---

### El MRO (Method Resolution Order)

Cuando hay herencia múltiple, Python necesita saber **en qué orden buscar un método** si está definido en varias clases padre. A este orden se le llama MRO (Orden de Resolución de Métodos).

Puedes verlo con el atributo especial \`.__mro__\` o el método \`.mro()\`:

\`\`\`python
class A:
    def saludar(self): print("Hola desde A")

class B(A):
    def saludar(self): print("Hola desde B")

class C(A):
    def saludar(self): print("Hola desde C")

class D(B, C):
    pass

d = D()
d.saludar()       # "Hola desde B" — busca primero en B
print(D.mro())    # [D, B, C, A, object]
\`\`\`

Python sigue el algoritmo **C3 Linearization**: primero la propia clase, luego de izquierda a derecha sus padres, evitando repeticiones.

---

### Clases Abstractas con ABC

Una **clase abstracta** es una clase que no puede ser instanciada directamente — existe solo para que otras clases hereden de ella y obligatoriamente definan ciertos métodos.

\`\`\`python
from abc import ABC, abstractmethod

class Figura(ABC):
    @abstractmethod
    def area(self):
        pass  # Las subclases DEBEN implementar esto

class Cuadrado(Figura):
    def __init__(self, lado):
        self.lado = lado
    def area(self):
        return self.lado ** 2

c = Cuadrado(4)
print(c.area())  # 16

# f = Figura()  ← ERROR: no se puede instanciar una clase abstracta
\`\`\`

---

### El método __repr__

Ya conoces \`__str__\`, que define cómo se ve un objeto al hacer \`print()\`. El método \`__repr__\` es su primo más técnico: define la representación "oficial" del objeto, pensada para desarrolladores (y para la consola interactiva):

\`\`\`python
class Punto:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __repr__(self):
        return f"Punto({self.x}, {self.y})"

p = Punto(3, 7)
print(repr(p))  # Punto(3, 7)
\`\`\`

---

### Sobrecarga de Operadores

Python permite redefinir qué sucede cuando usas operadores matemáticos (\`+\`, \`-\`, \`==\`, etc.) con tus objetos. Esto se hace sobreescribiendo métodos especiales:

| Operador | Método especial |
|---|---|
| \`+\` | \`__add__\` |
| \`-\` | \`__sub__\` |
| \`==\` | \`__eq__\` |
| \`<\` | \`__lt__\` |

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)  # Vector(4, 6)
\`\`\``;

const exercises = [
  {
    id: 10001,
    title: "Ejercicio 1: Herencia Múltiple",
    difficulty: "Básico",
    difficulty_color: "green",
    instructions: `Se te dan las clases \`Volador\` y \`Nadador\`. Crea la clase \`Pato\` que herede de **ambas** (en ese orden). Luego crea \`donald = Pato()\` y haz que primero vuele y luego nade.`,
    initial_code: `class Volador:
    def volar(self):
        print("Volando")

class Nadador:
    def nadar(self):
        print("Nadando")

# 1. Define Pato heredando de Volador Y Nadador

# 2. Crea donald = Pato()

# 3. Llama a donald.volar() y luego a donald.nadar()
`,
    solution_code: `class Pato(Volador, Nadador):
    pass

donald = Pato()
donald.volar()
donald.nadar()`,
    output_check: "Volando\nNadando",
    test_code: null,
    hint: "La sintaxis es: class Pato(Volador, Nadador): pass — pon ambas clases padre separadas por coma dentro del paréntesis."
  },
  {
    id: 10002,
    title: "Ejercicio 2: isinstance()",
    difficulty: "Básico",
    difficulty_color: "green",
    instructions: `Se te dan las clases \`Animal\` y \`Perro(Animal)\`, y un objeto \`fido = Perro()\`. Usa la función \`isinstance()\` para imprimir si \`fido\` es un \`Perro\` y si \`fido\` es un \`Animal\`. Ambas verificaciones deben imprimirse, una por línea.`,
    initial_code: `class Animal:
    pass

class Perro(Animal):
    pass

fido = Perro()

# 1. Imprime isinstance(fido, Perro)

# 2. Imprime isinstance(fido, Animal)
`,
    solution_code: `class Animal:
    pass

class Perro(Animal):
    pass

fido = Perro()
print(isinstance(fido, Perro))
print(isinstance(fido, Animal))`,
    output_check: "True\nTrue",
    test_code: null,
    hint: "isinstance(objeto, Clase) devuelve True o False. Úsalo dentro de print() para mostrarlo."
  },
  {
    id: 10003,
    title: "Ejercicio 3: issubclass()",
    difficulty: "Básico",
    difficulty_color: "green",
    instructions: `Se te dan las clases \`Vehiculo\`, \`Coche(Vehiculo)\` y \`Rueda\`. Usa \`issubclass()\` para imprimir:\n1. Si \`Coche\` es subclase de \`Vehiculo\` (debe dar \`True\`)\n2. Si \`Rueda\` es subclase de \`Vehiculo\` (debe dar \`False\`)`,
    initial_code: `class Vehiculo:
    pass

class Coche(Vehiculo):
    pass

class Rueda:
    pass

# 1. Imprime issubclass(Coche, Vehiculo)

# 2. Imprime issubclass(Rueda, Vehiculo)
`,
    solution_code: `class Vehiculo:
    pass

class Coche(Vehiculo):
    pass

class Rueda:
    pass

print(issubclass(Coche, Vehiculo))
print(issubclass(Rueda, Vehiculo))`,
    output_check: "True\nFalse",
    test_code: null,
    hint: "issubclass(ClaseHija, ClasePadre) — el primer argumento es la clase hija, el segundo es la clase padre que quieres comprobar."
  },
  {
    id: 10004,
    title: "Ejercicio 4: Clase Abstracta",
    difficulty: "Intermedio",
    difficulty_color: "yellow",
    instructions: `Se te da la clase abstracta \`Figura\` con el método abstracto \`area()\`. Crea la clase \`Rectangulo(Figura)\` con un constructor que reciba \`base\` y \`altura\`. Implementa el método \`area(self)\` para que devuelva \`self.base * self.altura\`. Luego crea \`r = Rectangulo(5, 3)\` e imprime \`r.area()\`.`,
    initial_code: `from abc import ABC, abstractmethod

class Figura(ABC):
    @abstractmethod
    def area(self):
        pass

# 1. Crea Rectangulo(Figura)
    # 2. Define __init__(self, base, altura)
    # 3. Implementa area(self) -> devuelve base * altura

# 4. Crea r = Rectangulo(5, 3) e imprime r.area()
`,
    solution_code: `from abc import ABC, abstractmethod

class Figura(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangulo(Figura):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura
    def area(self):
        return self.base * self.altura

r = Rectangulo(5, 3)
print(r.area())`,
    output_check: "15",
    test_code: null,
    hint: "La clase Rectangulo DEBE implementar el método area() o Python lanzará un error al intentar instanciarla. Usa 'return self.base * self.altura'."
  },
  {
    id: 10005,
    title: "Ejercicio 5: El método __repr__",
    difficulty: "Intermedio",
    difficulty_color: "yellow",
    instructions: `La clase \`Producto\` tiene \`nombre\` y \`precio\`. Define el método \`__repr__(self)\` para que devuelva el string \`"Producto(nombre, precio)"\` usando los valores reales del objeto (ej: \`"Producto(Laptop, 999)"\`). Luego crea \`p = Producto("Laptop", 999)\` e imprime \`repr(p)\`.`,
    initial_code: `class Producto:
    def __init__(self, nombre, precio):
        self.nombre = nombre
        self.precio = precio
    
    # Define __repr__(self) aqui
    # Debe devolver: "Producto(nombre, precio)"

p = Producto("Laptop", 999)
# Imprime repr(p)
`,
    solution_code: `class Producto:
    def __init__(self, nombre, precio):
        self.nombre = nombre
        self.precio = precio
    def __repr__(self):
        return f"Producto({self.nombre}, {self.precio})"

p = Producto("Laptop", 999)
print(repr(p))`,
    output_check: "Producto(Laptop, 999)",
    test_code: null,
    hint: "Define def __repr__(self): y dentro usa return con un f-string: return f\"Producto({self.nombre}, {self.precio})\""
  },
  {
    id: 10006,
    title: "Ejercicio 6: Sobrecarga del operador +",
    difficulty: "Intermedio",
    difficulty_color: "yellow",
    instructions: `Se te da la clase \`Vector\` con atributos \`x\` e \`y\`. Define el método \`__add__(self, other)\` para que al sumar dos vectores con \`+\`, devuelva un nuevo \`Vector\` con la suma de sus componentes. Luego crea \`v1 = Vector(1, 2)\` y \`v2 = Vector(3, 4)\`, crea \`v3 = v1 + v2\` e imprime \`v3.x\` y \`v3.y\` (cada uno en una línea).`,
    initial_code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    # Define __add__(self, other)
    # Debe retornar Vector(self.x + other.x, self.y + other.y)

v1 = Vector(1, 2)
v2 = Vector(3, 4)

# Crea v3 = v1 + v2
# Imprime v3.x y v3.y (cada uno en su propia línea)
`,
    solution_code: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2
print(v3.x)
print(v3.y)`,
    output_check: "4\n6",
    test_code: null,
    hint: "El método __add__ recibe 'other' que es el segundo Vector. Retorna un nuevo Vector con las sumas: return Vector(self.x + other.x, self.y + other.y)"
  },
  {
    id: 10007,
    title: "Ejercicio 7: Jerarquía completa (Reto)",
    difficulty: "Reto",
    difficulty_color: "red",
    instructions: `Construye una jerarquía de 3 niveles:\n1. Clase \`Empleado\` con \`__init__(self, nombre, salario)\` que guarda ambos atributos.\n2. Clase \`Gerente(Empleado)\` cuyo \`__init__\` recibe \`nombre, salario, departamento\`. Usa \`super().__init__(nombre, salario)\` y guarda \`self.departamento\`.\n3. Clase \`Director(Gerente)\` cuyo \`__init__\` recibe \`nombre, salario, departamento, presupuesto\`. Usa \`super().__init__(nombre, salario, departamento)\` y guarda \`self.presupuesto\`.\n\nCrea \`d = Director("Ana", 5000, "TI", 100000)\` e imprime sus cuatro atributos en este orden: nombre, salario, departamento, presupuesto.`,
    initial_code: `# 1. Define Empleado con __init__(self, nombre, salario)

# 2. Define Gerente(Empleado) con __init__(self, nombre, salario, departamento)
    # Usa super().__init__(nombre, salario)
    # Guarda self.departamento

# 3. Define Director(Gerente) con __init__(self, nombre, salario, departamento, presupuesto)
    # Usa super().__init__(nombre, salario, departamento)
    # Guarda self.presupuesto

# 4. Crea d = Director("Ana", 5000, "TI", 100000)
# 5. Imprime d.nombre, d.salario, d.departamento, d.presupuesto (cada uno en una línea)
`,
    solution_code: `class Empleado:
    def __init__(self, nombre, salario):
        self.nombre = nombre
        self.salario = salario

class Gerente(Empleado):
    def __init__(self, nombre, salario, departamento):
        super().__init__(nombre, salario)
        self.departamento = departamento

class Director(Gerente):
    def __init__(self, nombre, salario, departamento, presupuesto):
        super().__init__(nombre, salario, departamento)
        self.presupuesto = presupuesto

d = Director("Ana", 5000, "TI", 100000)
print(d.nombre)
print(d.salario)
print(d.departamento)
print(d.presupuesto)`,
    output_check: "Ana\n5000\nTI\n100000",
    test_code: null,
    hint: "Cada clase usa super().__init__() para pasar los atributos a su padre. Esto forma una cadena: Director -> Gerente -> Empleado."
  }
];

async function main() {
  console.log("Insertando lección Herencia (Parte 3)...");

  const { data: lesson, error: lessonErr } = await sb
    .from('lessons')
    .insert({
      id: 100,
      title: 'Herencia (Parte 3)',
      module_id: 5,
      order_index: 11,
      theory: theory
    })
    .select()
    .single();

  if (lessonErr) {
    console.error("Error al insertar lección:", lessonErr.message);
    return;
  }
  console.log("✅ Lección creada:", lesson.id, lesson.title);

  for (const ex of exercises) {
    const { error: exErr } = await sb.from('exercises').insert({
      id: ex.id,
      lesson_id: 100,
      title: ex.title,
      difficulty: ex.difficulty,
      difficulty_color: ex.difficulty_color,
      instructions: ex.instructions,
      initial_code: ex.initial_code,
      solution_code: ex.solution_code,
      output_check: ex.output_check,
      test_code: ex.test_code,
      hint: ex.hint,
      order_index: exercises.indexOf(ex)
    });

    if (exErr) {
      console.error(`❌ Error en ejercicio ${ex.id}:`, exErr.message);
    } else {
      console.log(`✅ Ejercicio creado: ${ex.id} - ${ex.title}`);
    }
  }

  console.log("\n✅ ¡Lección Herencia (Parte 3) creada completamente!");
}

main();
