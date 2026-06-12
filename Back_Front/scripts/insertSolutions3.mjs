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
  { id: 3401, solution: 'colores = ["rojo", "verde", "azul"]\nprint(colores)' },
  { id: 3402, solution: 'pares = [2, 4, 6, 8, 10]\nprint(pares)' },
  { id: 3403, solution: 'perfil = ["Ana", 25, 1.65, True]\nprint(perfil)' },
  { id: 3501, solution: 'print(frutas[2])' },
  { id: 3502, solution: 'print(paises[-1])\nprint(len(paises))' },
  { id: 3503, solution: 'print(numeros[1:4])' },
  { id: 3601, solution: 'colores[0] = "naranja"\ncolores[-1] = "morado"\nprint(colores)' },
  { id: 3602, solution: 'numeros[1:3] = [20, 30]\nprint(numeros)' },
  { id: 3603, solution: 'letras[0:2] = ["x", "y", "z"]\nprint(letras)' },
  { id: 3701, solution: 'animales.append("conejo")\nprint(animales)' },
  { id: 3702, solution: 'numeros.append(4)\nnumeros.append(5)\nnumeros.append(6)\nprint(numeros)' },
  { id: 3703, solution: 'datos.append(2026)\ndatos.append(3.14)\ndatos.append(True)\nprint(datos)' },
  { id: 3801, solution: 'numeros.insert(0, 1)\nprint(numeros)' },
  { id: 3802, solution: 'letras.insert(2, "c")\nprint(letras)' },
  { id: 3803, solution: 'planetas.insert(999, "Marte")\nplanetas.insert(1, "Fausto")\nprint(planetas)' },
  { id: 3901, solution: 'eliminado = colores.pop()\nprint(eliminado)\nprint(colores)' },
  { id: 3902, solution: 'primero = letras.pop(1)\nsegundo = letras.pop(-1)\nprint(primero)\nprint(segundo)\nprint(letras)' },
  { id: 3903, solution: 'a = numeros.pop(4)\nb = numeros.pop(-2)\nprint(a)\nprint(b)\nprint(numeros)' },
  { id: 4001, solution: 'animales.remove("loro")\nprint(animales)' },
  { id: 4002, solution: 'numeros.remove(20)\nprint(numeros)' },
  { id: 4003, solution: 'datos.remove("Python")\ndatos.remove(100)\nprint(datos)' },
  { id: 4101, solution: 'del animales[2]\nprint(animales)' },
  { id: 4102, solution: 'del numeros[0:3]\nprint(numeros)' },
  { id: 4103, solution: 'del datos[:]\nprint(datos)' },
  { id: 4201, solution: 'edades.sort()\nprint(edades)' },
  { id: 4202, solution: 'puntajes.sort(reverse=True)\nprint(puntajes)' },
  { id: 4203, solution: 'nombres.sort(reverse=True)\nprint(nombres)' },
  { id: 4301, solution: 'posicion = colores.index("azul")\nprint(posicion)' },
  { id: 4302, solution: 'posicion = numeros.index(10, 2)\nprint(posicion)' },
  { id: 4303, solution: 'posicion = letras.index("d", 1, 5)\nprint(posicion)' },
  { id: 4401, solution: 'equipo1.extend(equipo2)\nprint(equipo1)' },
  { id: 4402, solution: 'impares.extend(range(5, 11, 2))\nprint(impares)' },
  { id: 4403, solution: 'coleccion.extend([1, 2, 3])\ncoleccion.extend(range(4, 7))\nprint(coleccion)' },
  { id: 4501, solution: 'numeros = list(range(1, 6))\nprint(numeros)' },
  { id: 4502, solution: 'letras = list(palabra)\nprint(letras)' },
  { id: 4503, solution: 'invertida = caracteres[::-1]\nprint(invertida)' },
  { id: 4601, solution: 'extraido = datos[2][1]\nprint(extraido)' },
  { id: 4602, solution: 'seis = matriz[1][2][1]\nprint(seis)' },
  { id: 4603, solution: 'info[1][1] = 26\nprint(info)' },
  { id: 4701, solution: 'valor = matriz[1][2]\nprint(valor)' },
  { id: 4702, solution: 'a = matrix[1][0]\nb = matrix[2][1]\nprint(a)\nprint(b)' },
  { id: 4703, solution: 'tablero[1][1] = "X"\nprint(tablero)' },
  { id: 4801, solution: 'for fila in matriz:\n    print(fila)' },
  { id: 4802, solution: 'for fila in matriz:\n    for numero in fila:\n        print(numero)' },
  { id: 4803, solution: 'for fila in matriz:\n    for num in fila:\n        print(num, end=" ")\n    print()' },
  { id: 4901, solution: 'fila_suma.append(A[0][0] + B[0][0])\nfila_suma.append(A[0][1] + B[0][1])\nC.append(fila_suma)\nprint(C)' },
  { id: 4902, solution: 'print(len(M))\nprint(len(M[0]))' },
  { id: 4903, solution: 'for row in range(len(A)):\n    new_row = []\n    for col in range(len(A[0])):\n        new_row.append(A[row][col] + B[row][col])\n    C.append(new_row)\nprint(C)' },
  { id: 5001, solution: 'mi_auto = {\n    "marca": "Toyota",\n    "modelo": 2022\n}\nprint(mi_auto)' },
  { id: 5002, solution: 'print(letras)' },
  { id: 5003, solution: 'estudiante = {\n    "nombre": "Ana",\n    "notas": [8, 9, 10]\n}\nprint(estudiante)' },
  { id: 5101, solution: 'su_edad = persona["edad"]\nprint(su_edad)' },
  { id: 5102, solution: 'print(persona["nombre"])' },
  { id: 5103, solution: 'grado_medio = escuela["grados"][1]\nprint(grado_medio)' },
  { id: 5201, solution: 'print(colores.items())' },
  { id: 5202, solution: 'lista_colores = list(colores.items())\nprint(lista_colores)' },
  { id: 5203, solution: 'lista_colores = list(colores.items())\nprint(lista_colores[2])' },
  { id: 5301, solution: 'print(usuario.keys())' },
  { id: 5302, solution: 'claves = list(usuario.keys())\nprint(claves)' },
  { id: 5303, solution: 'claves = list(usuario.keys())\nprint(claves[-1])' },
  { id: 5401, solution: 'print(calificaciones.values())' },
  { id: 5402, solution: 'lista_notas = list(calificaciones.values())\nprint(lista_notas)' },
  { id: 5403, solution: 'lista_notas = list(calificaciones.values())\npromedio = (lista_notas[0] + lista_notas[1] + lista_notas[2]) / 3\nprint(promedio)' },
  { id: 5501, solution: 'carrito.clear()\nprint(carrito)' },
  { id: 5502, solution: 'configuracion.clear()\nprint(len(configuracion))' },
  { id: 5503, solution: 'datos.clear()\ndatos["activo"] = True\nprint(datos)' },
  { id: 5601, solution: 'libro["paginas"] = 350\nprint(libro)' },
  { id: 5602, solution: 'libro["autor"] = "Carlos"\nprint(libro)' },
  { id: 5603, solution: 'producto["precio"] = 999\nproducto["descuento"] = True\nprint(producto)' },
  { id: 5701, solution: 'b = a\nb["x"] = 99\nprint(a)' },
  { id: 5702, solution: 'b = a.copy()\nb["x"] = 99\nprint(b)\nprint(a)' },
  { id: 5703, solution: 'respaldo = inventario.copy()\ninventario.clear()\nprint(respaldo)\nprint(inventario)' },
  { id: 5801, solution: 'perfil = dict.fromkeys(campos)\nprint(perfil)' },
  { id: 5802, solution: 'marcador = dict.fromkeys(jugadores, 0)\nprint(marcador)' },
  { id: 5803, solution: 'letras = dict.fromkeys("abc", 1)\nprint(letras)' },
  { id: 5901, solution: 'temp = sensores.get("temperatura")\nprint(temp)' },
  { id: 5902, solution: 'vel = sensores.get("velocidad")\nprint(vel)' },
  { id: 5903, solution: 'estado = dispositivo.get("bateria", "Sin datos")\nprint(estado)' },
  { id: 6001, solution: 'extraido = colores.popitem()\nprint(extraido)' },
  { id: 6002, solution: 'colores.popitem()\nprint(colores)' },
  { id: 6003, solution: 'while agenda:\n    print(agenda.popitem())\nprint(agenda)' },
  { id: 6101, solution: 'nota = materias.pop("historia")\nprint(nota)' },
  { id: 6102, solution: 'resultado = materias.pop("arte", "Sin registro")\nprint(resultado)' },
  { id: 6103, solution: 'valor = usuarios.pop("admin")\nprint(valor)\nprint(usuarios)' },
  { id: 6201, solution: 'resultado = config.setdefault("tema", "claro")\nprint(resultado)\nprint(config)' },
  { id: 6202, solution: 'config.setdefault("idioma")\nprint(config)' },
  { id: 6203, solution: 'retorno = config.setdefault("notificaciones", True)\nprint(retorno)\nprint(config)' },
  { id: 6301, solution: 'perfil.update(contacto)\nprint(perfil)' },
  { id: 6302, solution: 'ventas.update(correcciones)\nprint(ventas)' },
  { id: 6303, solution: 'ajustes = {"laptops": 10, "tablets": 5}\ninventario.update(ajustes)\nprint(inventario)' },
  { id: 6401, solution: 'for nombre in edades:\n    print(nombre, edades[nombre])' },
  { id: 6402, solution: 'for k, v in edades.items():\n    print(f"{k} - {v}")' },
  { id: 6403, solution: 'for alumno, nota in calificaciones.items():\n    if nota >= 9:\n        print(alumno)' },
  { id: 6501, solution: 'cantidad = fruits.get("manzanas")\nprint(cantidad)' },
  { id: 6502, solution: 'fruits.update({"bananas": 5, "mangos": 6, "uvas": 3})\nprint(fruits)' },
  { id: 6503, solution: 'bajas = fruits.pop("peras")\nprint(bajas)\nprint(fruits)' },
  { id: 6504, solution: 'catalogo = list(fruits.keys())\nprint(catalogo)' },
  { id: 6505, solution: 'fruits.clear()\nprint(fruits)' },
  { id: 6601, solution: 'dobles = [x * 2 for x in range(5)]\nprint(dobles)' },
  { id: 6602, solution: 'pares_cuadrados = [x ** 2 for x in range(10) if x % 2 == 0]\nprint(pares_cuadrados)' },
  { id: 6603, solution: 'vocales = {letra for letra in palabra if letra in "aeiou"}\nprint(vocales)' },
  { id: 6604, solution: 'mayores = {nombre: edad for nombre, edad in personas if edad >= 30}\nprint(mayores)' },
  { id: 6701, solution: 'for item in enumerate(colores):\n    print(item)' },
  { id: 6702, solution: 'for indice, color in enumerate(colores):\n    print(indice, color)' },
  { id: 6703, solution: 'for posicion, equipo in enumerate(equipos, start=1):\n    print(f"{posicion}. {equipo}")' },
  { id: 6704, solution: 'lista_enumerada = list(enumerate(nombres, start=10))\nprint(lista_enumerada)' }
];

async function insertSolutions() {
  console.log("\\n🚀 Insertando " + solutions.length + " soluciones del Módulo 3...\\n");
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
