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
  { id: 6801, solution: 'import math\nprint(math.sqrt(81))' },
  { id: 6802, solution: 'import math as m\nprint(m.sqrt(100))' },
  { id: 6803, solution: 'from math import pow\nprint(pow(2, 3))' },
  { id: 6804, solution: 'from math import *\nprint(pi)' },
  { id: 6901, solution: 'import random\ndado = random.randint(1, 6)\nprint(dado)' },
  { id: 6902, solution: 'import random\nprobabilidad = random.random()\nprint(probabilidad)' },
  { id: 6903, solution: 'import random\npar = random.randrange(0, 20, 2)\nprint(par)' },
  { id: 7001, solution: 'try:\n    10 / 0\nexcept ZeroDivisionError:\n    print("No se puede dividir por cero")' },
  { id: 7002, solution: 'try:\n    int("Python")\nexcept ValueError as e:\n    print(e)' },
  { id: 7003, solution: 'try:\n    5 + "Hola"\nexcept Exception as error:\n    print(error)' },
  { id: 7004, solution: 'try:\n    print("Intentando...")\nexcept Exception:\n    pass\nelse:\n    print("Todo bien")\nfinally:\n    print("Proceso terminado")' },
  { id: 7101, solution: 'def mensaje():\n    print("Amo programar en Python")\n\nmensaje()' },
  { id: 7102, solution: 'def advertencia():\n    print("¡Peligro, sistema inestable!")\n\nadvertencia()\nadvertencia()\nadvertencia()' },
  { id: 7103, solution: 'def despedida():\n    print("¡Hasta pronto!")\n\ndespedida()' },
  { id: 7201, solution: 'def obtener_nombre():\n    return "Python"\n\nnombre = obtener_nombre()\nprint(nombre)' },
  { id: 7202, solution: 'def calcular_area():\n    base = 10\n    altura = 5\n    return base * altura\n\narea = calcular_area()\nprint(area)' },
  { id: 7203, solution: 'def obtener_estado():\n    nota = 8\n    if nota >= 6:\n        return "Aprobado"\n    else:\n        return "Reprobado"\n\nprint(obtener_estado())' },
  { id: 7204, solution: 'def obtener_descuento():\n    return 20\n\nprecio_final = 100 - obtener_descuento()\nprint(precio_final)' },
  { id: 7301, solution: 'def doble(numero):\n    return numero * 2\n\nprint(doble(5))' },
  { id: 7302, solution: 'def calcular_total(precio, cantidad):\n    return precio * cantidad\n\nprint(calcular_total(20, 4))' },
  { id: 7303, solution: 'def crear_perfil(nombre, edad=18):\n    return f"{nombre} tiene {edad} años"\n\nprint(crear_perfil("Juan"))\nprint(crear_perfil("María", 25))' },
  { id: 7304, solution: 'def registro(nombre, rol="Usuario"):\n    return f"Bienvenido {nombre}, tu rol es {rol}"\n\nprint(registro("Ana"))' },
  { id: 7401, solution: 'def multiplicador_infinito(*args):\n    total = 1\n    for numero in args:\n        total = total * numero\n    return total\n\nprint(multiplicador_infinito(2, 3, 4))' },
  { id: 7402, solution: 'def suma_total(*numeros):\n    return sum(numeros)\n\nprint(suma_total(10, 20, 30))' },
  { id: 7403, solution: 'def crear_ficha(**datos):\n    for clave, valor in datos.items():\n        print(f"La clave es {clave} y el valor es {valor}")\n\ncrear_ficha(nombre="Batman", ciudad="Gotica", vehiculo="Batmovil")' },
  { id: 7404, solution: 'def construir_robot(nombre, *piezas, **caracteristicas):\n    print(f"Construyendo a {nombre}")\n    print(f"Piezas: {piezas}")\n    print(f"Extras: {caracteristicas}")\n\nconstruir_robot("Optimus", "Láser", "Ruedas", color="Azul", vida=100)' },
  { id: 7501, solution: 'def minar():\n    oro = 50\n    return oro\n\nprint(minar())' },
  { id: 7502, solution: 'nombre_juego = "Zelda"\n\ndef mostrar_juego():\n    print(nombre_juego)\n\nmostrar_juego()' },
  { id: 7503, solution: 'nivel = 1\n\ndef jugar_trampa():\n    nivel = 99\n    print(f"Nivel Falso: {nivel}")\n\njugar_trampa()\nprint(nivel)' },
  { id: 7504, solution: 'nivel = 5\n\ndef subir_nivel():\n    global nivel\n    nivel = nivel + 1\n\nsubir_nivel()\nprint(nivel)' },
  { id: 7601, solution: 'triple = lambda x: x * 3\nprint(triple(5))' },
  { id: 7602, solution: 'multiplicar = lambda a, b: a * b\nprint(multiplicar(4, 5))' },
  { id: 7603, solution: 'es_par = lambda numero: numero % 2 == 0\nprint(es_par(8))' },
  { id: 7604, solution: 'gritar = lambda texto: texto.upper()\nprint(gritar("hola"))' },
  { id: 8001, solution: 'def al_cuadrado(n):\n    return n * n\n\nnumeros = [2, 3, 4, 5]\nresultado = list(map(al_cuadrado, numeros))\nprint(resultado)' },
  { id: 8002, solution: 'precios = [10, 25, 50, 100]\nprecios_descontados = list(map(lambda p: p * 0.9, precios))\nprint(precios_descontados)' },
  { id: 8003, solution: 'def es_mayor_de_edad(edad):\n    return edad >= 18\n\nedades = [12, 18, 25, 8, 30, 16]\nmayores = list(filter(es_mayor_de_edad, edades))\nprint(mayores)' },
  { id: 8004, solution: 'palabras = ["Python", "es", "increíble", "y", "poderoso"]\npalabras_largas = list(filter(lambda p: len(p) > 3, palabras))\nprint(palabras_largas)' },
  { id: 8005, solution: 'numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\npares = list(filter(lambda n: n % 2 == 0, numeros))\nresultado = list(map(lambda n: n**2, pares))\nprint(resultado)' }
];

async function insertSolutions() {
  console.log("\\n🚀 Insertando " + solutions.length + " soluciones del Módulo 4...\\n");
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
