import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
});

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_SERVICE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const solutions = [
  { id: 8101, solution: 'archivo = open("mensaje.txt", "r")\ncontenido = archivo.read()\narchivo.close()\nprint(contenido)' },
  { id: 8102, solution: 'with open("poema.txt", "r") as f:\n    texto = f.read()\nprint(texto)' },
  { id: 8103, solution: 'with open("lista_compras.txt", "r") as f:\n    lineas = f.readlines()\nprint(len(lineas))' },
  { id: 8104, solution: 'with open("calificaciones.txt", "r") as f:\n    lineas = f.readlines()\nfor linea in lineas:\n    total = total + int(linea.strip())\nprint(round(total / len(lineas), 1))' },
  { id: 8201, solution: 'with open("bienvenida.txt", "w") as f:\n    f.write("Bienvenido a Python!")\nwith open("bienvenida.txt", "r") as f:\n    print(f.read())' },
  { id: 8202, solution: 'with open("agenda.txt", "w") as f:\n    f.write("Martes: Descanso")\nwith open("agenda.txt", "r") as f:\n    print(f.read())' },
  { id: 8203, solution: 'with open("historial.txt", "a") as f:\n    f.write("\\nEntrada 2: Archivos")\nwith open("historial.txt", "r") as f:\n    print(f.read())' },
  { id: 8204, solution: 'with open("mis_tareas.txt", "w") as f:\n    f.writelines(tareas)\nwith open("mis_tareas.txt", "r") as f:\n    print(f.read())' },
  { id: 8301, solution: 'import json\nproducto = {"nombre": "Laptop", "precio": 999, "disponible": True}\ntexto_json = json.dumps(producto)\nprint(texto_json)' },
  { id: 8302, solution: 'datos = json.loads(datos_json)\nprint(datos["ciudad"])' },
  { id: 8303, solution: 'bonito = json.dumps(config, indent=4)\nprint(bonito)' },
  { id: 8304, solution: 'en_json = json.dumps(jugador)\nrecuperado = json.loads(en_json)\nprint(recuperado["nombre"])' },
  { id: 8401, solution: 'with open("config.json", "w") as f:\n    json.dump(config, f)' },
  { id: 8402, solution: 'with open("inventario.json", "r") as f:\n    inventario = json.load(f)\nprint(inventario["Pociones"])' },
  { id: 8403, solution: 'datos["edad"] = 31\nwith open("usuario.json", "w") as f:\n    json.dump(datos, f)' },
  { id: 8404, solution: 'with open("ventas.json", "r") as f:\n    ventas = json.load(f)\nfor venta in ventas:\n    total_ventas += venta["monto"]\nprint(total_ventas)' },
  { id: 8501, solution: 'class Gato:\n    pass' },
  { id: 8502, solution: 'mi_coche = Vehiculo()\nprint(type(mi_coche))' },
  { id: 8503, solution: 'class Libro:\n    pass\nmi_libro = Libro()\nmi_libro.titulo = "1984"\nmi_libro.autor = "George Orwell"\nprint(mi_libro.titulo + " - " + mi_libro.autor)' },
  { id: 8504, solution: 'jugador1 = Jugador()\njugador1.nombre = "Mario"\njugador2 = Jugador()\njugador2.nombre = "Luigi"\nprint(jugador1.nombre)\nprint(jugador2.nombre)' },
  { id: 8505, solution: 'class Producto:\n    pass\nprod1 = Producto()\nprod1.precio = 15\nprod2 = Producto()\nprod2.precio = 25\ntotal = prod1.precio + prod2.precio\nprint(total)' },
  { id: 8601, solution: 'class Personaje:\n    def __init__(self):\n        self.vida = 100\n\nhero = Personaje()\nprint(hero.vida)' },
  { id: 8602, solution: 'class Libro:\n    def __init__(self, titulo, autor):\n        self.titulo = titulo\n        self.autor = autor\n\nmi_libro = Libro("1984", "Orwell")\nprint(mi_libro.titulo)' },
  { id: 8603, solution: 'coche1 = Coche("Ford", "Rojo")\ncoche2 = Coche("Toyota", "Azul")\nprint(coche2.color)' },
  { id: 8604, solution: 'class Cuenta:\n    def __init__(self, titular, saldo):\n        self.titular = titular\n        self.saldo = saldo\n\nmi_cuenta = Cuenta("Ana", 500)\nmi_cuenta.saldo += 200\nprint(mi_cuenta.saldo)' },
  { id: 8701, solution: 'class Robot:\n    def saludar(self):\n        print("Hola, humano")\n\nr1 = Robot()\nr1.saludar()' },
  { id: 8702, solution: 'class Perro:\n    def __init__(self, nombre):\n        self.nombre = nombre\n    def ladrar(self):\n        print("¡Guau! Soy " + self.nombre)\n\nmi_perro = Perro("Rex")\nmi_perro.ladrar()' },
  { id: 8703, solution: 'class Personaje:\n    def __init__(self):\n        self.vida = 100\n    def recibir_daño(self, cantidad):\n        self.vida -= cantidad\n\nhero = Personaje()\nhero.recibir_daño(30)\nprint(hero.vida)' },
  { id: 8704, solution: 'class Cuenta:\n    def __init__(self, saldo):\n        self.saldo = saldo\n    def depositar(self, monto):\n        self.saldo += monto\n    def retirar(self, monto):\n        self.saldo -= monto\n\nmi_cuenta = Cuenta(100)\nmi_cuenta.depositar(50)\nmi_cuenta.retirar(20)\nprint(mi_cuenta.saldo)' },
  { id: 8801, solution: 'class Diario:\n    def __init__(self):\n        self.__secreto = "Amo Python"\n    def leer(self):\n        print(self.__secreto)\n\nmi_diario = Diario()\nmi_diario.leer()' },
  { id: 8802, solution: 'class Banco:\n    def __init__(self):\n        self.__dinero = 1000\n    def ver_dinero(self):\n        print(self.__dinero)\n\nmi_banco = Banco()\nmi_banco.__dinero = 5000\nmi_banco.ver_dinero()' },
  { id: 8803, solution: 'class Termostato:\n    def __init__(self):\n        self.__temperatura = 20\n    def ajustar(self, grados):\n        if grados >= 10 and grados <= 30:\n            self.__temperatura = grados\n        print(self.__temperatura)\n\ntermostato = Termostato()\ntermostato.ajustar(50)\ntermostato.ajustar(25)' },
  { id: 8804, solution: 'class Sistema:\n    def __init__(self):\n        self.__password = "root"\n    def login(self, intento):\n        if intento == self.__password:\n            print("Acceso concedido")\n        else:\n            print("Acceso denegado")\n\npc = Sistema()\npc.login("1234")\npc.login("root")' },
  { id: 8901, solution: 'class Contador:\n    cuenta = 0\n    def __init__(self):\n        Contador.cuenta += 1\n\nc1 = Contador()\nc2 = Contador()\nprint(Contador.cuenta)' },
  { id: 8902, solution: 'class Alien:\n    cantidad = 42\n    @classmethod\n    def ver_cantidad(cls):\n        return cls.cantidad\n\nprint(Alien.ver_cantidad())' },
  { id: 8903, solution: 'class Math:\n    @staticmethod\n    def restar(a, b):\n        return a - b\n\nprint(Math.restar(20, 5))' },
  { id: 8904, solution: 'class Empleado:\n    sueldo_base = 1000\n    @classmethod\n    def cambiar_base(cls, nuevo):\n        cls.sueldo_base = nuevo\n\nemp1 = Empleado()\nEmpleado.cambiar_base(1200)\nprint(Empleado.sueldo_base)\nprint(emp1.sueldo_base)' },
  { id: 9001, solution: 'class Coche(Vehiculo):\n    pass\nmi_coche = Coche()\nmi_coche.encender()' },
  { id: 9002, solution: 'class Pato(Ave):\n    pass\ndonald = Pato()\nprint(donald.tiene_plumas)' },
  { id: 9003, solution: 'class Admin(Usuario):\n    def banear(self):\n        print("Usuario baneado")\n\nadmin = Admin()\nadmin.login()\nadmin.banear()' },
  { id: 9004, solution: 'class Jefe(Enemigo):\n    def hablar(self):\n        print("¡Te destruiré!")\n\ne = Enemigo()\ne.hablar()\nj = Jefe()\nj.hablar()' },
  { id: 9101, solution: 'class Coche(Vehiculo):\n    def describir(self):\n        super().describir()\n        print("Tiene 4 ruedas")\n\nmi_coche = Coche()\nmi_coche.describir()' },
  { id: 9102, solution: 'class Circulo(Figura):\n    def __init__(self, color, radio):\n        super().__init__(color)\n        self.radio = radio\n\nc = Circulo("Rojo", 5)\nprint(c.color)\nprint(c.radio)' },
  { id: 9103, solution: 'for a in animales:\n    a.sonido()' },
  { id: 9104, solution: 'class Mago(Personaje):\n    def __init__(self, vida, ataque, mana):\n        super().__init__(vida, ataque)\n        self.mana = mana\n\nmerlin = Mago(100, 20, 50)\nprint(merlin.vida)\nprint(merlin.ataque)\nprint(merlin.mana)' },
  { id: 9105, solution: 'class Pelicula:\n    def __init__(self, titulo, director):\n        self.titulo = titulo\n        self.director = director\n    def __str__(self):\n        return f"{self.titulo} dirigida por {self.director}"\n\np = Pelicula("Inception", "Nolan")\nprint(p)' }
];

async function insertSolutions() {
  console.log("\\n🚀 Insertando " + solutions.length + " soluciones del Módulo 5...\\n");
  let ok = 0, fail = 0;

  for (const s of solutions) {
    const { error } = await supabase
      .from('exercises')
      .update({ solution_code: s.solution })
      .eq('id', s.id);

    if (error) {
      console.log("❌ ID " + s.id + ": " + error.message);
      fail++;
    } else {
      console.log("✅ ID " + s.id + " guardado.");
      ok++;
    }
  }

  console.log("\\n✅ Completado: " + ok + " guardados, " + fail + " fallidos.");
}

insertSolutions();
