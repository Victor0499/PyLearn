import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Cargar variables de entorno manualmente desde .env.local
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

// =====================================================
// SOLUCIONES DE LOS EJERCICIOS - MÓDULO 1
// Conceptos Básicos de Python
// =====================================================
const solutions = [
  // Lección 1: Tu primer print
  { id: 101, solution: `print('Hola, Python!')` },

  // Lección 2: Variables y tipos
  { id: 102, solution: `nombre = 'Ana'\nedad = 20\nprint(nombre)\nprint(edad)` },

  // Lección 3: Suma y resultado
  { id: 103, solution: `numero_1 = 15\nnumero_2 = 7\nresultado = numero_1 + numero_2\nprint('El resultado es:')\nprint(resultado)` },

  // Lección 4: Operaciones con Cadenas - Tu primer String
  { id: 201, solution: `saludo = 'Hola mundo'\nprint(saludo)` },

  // Concatenación
  { id: 202, solution: `nombre = 'Ana'\nsaludo = 'Hola, ' + nombre\nprint(saludo)` },

  // El operador +=
  { id: 203, solution: `mensaje = 'Me gusta la pizza'\nmensaje += ' con extra queso'\nprint(mensaje)` },

  // str() - Convertir números a texto
  { id: 204, solution: `edad = 25\nmensaje = 'Tengo ' + str(edad) + ' años'\nprint(mensaje)` },

  // find() - Buscar en texto
  { id: 205, solution: `frase = 'Hola Mundo'\nposicion = frase.find('Mundo')\nprint(posicion)` },

  // Slicing
  { id: 206, solution: `palabra = 'Elefante'\npedacito = palabra[0:3]\nprint(pedacito)` },

  // Comparación con ==
  { id: 207, solution: `a = 'Hola'\nb = 'hola'\nson_iguales = (a == b)\nprint(son_iguales)` },

  // Lección 5: Palabras Reservadas
  { id: 301, solution: `For = 3\nprint(For)` },
  { id: 302, solution: `Class_num = 10\nImport = 'datos'\nIs_valid = True\nprint(Class_num)\nprint(Import)\nprint(Is_valid)` },
  { id: 303, solution: `And = 1\nDef = 2\nFor = 3\nIn = 4\nprint(And)\nprint(Def)\nprint(For)\nprint(In)` },

  // Lección 6: Operaciones Aritméticas
  { id: 401, solution: `numero_1 = 8\nnumero_2 = 5\nresultado = numero_1 + numero_2\nprint(resultado)` },
  { id: 402, solution: `a = 20\nb = 7\nresultado = a - b\nprint(resultado)` },
  { id: 403, solution: `x = 9\ny = 6\nresultado = x * y\nprint(resultado)` },
  { id: 404, solution: `base = 3\nexponente = 4\nresultado = base ** exponente\nprint(resultado)` },
  { id: 405, solution: `numerador = 15\ndenominador = 4\nresultado = numerador / denominador\nprint(resultado)` },
  { id: 406, solution: `dividendo = 17\ndivisor = 5\nresto = dividendo % divisor\nprint(resto)` },
  { id: 407, solution: `dividendo = 23\ndivisor = 4\ncociente = dividendo // divisor\nprint(cociente)` },

  // Lección 7: Comentarios en Python
  { id: 501, solution: `# Mi primer comentario\nmensaje = 'Hola Python'\nprint(mensaje)` },
  { id: 502, solution: `"""\nEste es un comentario de varias líneas\n"""\nnombre = 'Estudiante'\nprint(nombre)` },
  { id: 503, solution: `# Comentario simple\n'''\nComentario de bloque\n'''\ncurso = 'Python'\nnivel = 1\nprint(curso)\nprint(nivel)` },
  { id: 504, solution: `'Esto será ignorado'\nprint('Fin del programa')` },

  // Lección 8: Tipos de Datos
  { id: 601, solution: `entero = 15\nflotante = 3.14\nprint(type(entero))\nprint(type(flotante))` },
  { id: 602, solution: `texto = 'Hola'\nes_verdad = True\nprint(texto, es_verdad)` },
  { id: 603, solution: `complejo = 2 + 3j\nprint('El tipo es:', type(complejo))` },

  // Lección 9: Entrada de Datos y Conversión
  { id: 701, solution: `texto = '50'\nnumero = int(texto)\nprint(numero)` },
  { id: 702, solution: `precio_txt = '19.99'\nprecio = float(precio_txt)\nprint(precio)` },
  { id: 703, solution: `edad = 20\nprint('Tengo', edad, 'años')` },
  { id: 704, solution: `cantidad = int(input('Dime una cantidad: '))\nprint(cantidad)` },

  // Lección 10: Operadores de Asignación
  { id: 1401, solution: `puntos = 10\npuntos += 5\nprint(puntos)` },
  { id: 1402, solution: `vidas = 3\nvidas -= 1\nprint(vidas)` },
  { id: 1403, solution: `numero = 10\nnumero *= 3\nnumero //= 5\nprint(numero)` },
  { id: 1404, solution: `x = 10\nx %= 4\nx **= 3\nprint(x)` },

  // Lección 11: Parámetros end y sep
  { id: 1501, solution: `print('Curso', end='-')\nprint('Python')` },
  { id: 1502, solution: `print('10', '20', '30', sep='*')` },
  { id: 1503, solution: `print('A', 'B', 'C', sep='-', end='!')` },

  // Lección 12: La función len()
  { id: 1801, solution: `mensaje = "Python"\nprint(len(mensaje))` },
  { id: 1802, solution: `texto = "Hola Mundo"\nlongitud = len(texto)\nprint(longitud)` },
  { id: 1803, solution: `usuario = "Ana"\nif len(usuario) < 5:\n    print('Nombre corto')\nelse:\n    print('Nombre largo')` },

  // Lección 13: Concatenación con .format()
  { id: 1901, solution: `pais = "México"\ncapital = "Ciudad de México"\nprint("La capital de {} es {}.".format(pais, capital))` },
  { id: 1902, solution: `producto = "laptop"\nprecio = 800\nprint("El precio de la {0} es de {1} dólares. Repito, {1} dólares.".format(producto, precio))` },
  { id: 1903, solution: `print("Curso: {curso}. Duración: {duracion}.".format(curso="Python", duracion="4 semanas"))` },

  // Lección 14: Concatenación con f-Strings
  { id: 2001, solution: `nombre = "Sofía"\ncurso = "Python"\nprint(f"Hola {nombre}, bienvenida al curso de {curso}.")` },
  { id: 2002, solution: `base = 10\naltura = 5\nprint(f"El área del rectángulo es: {base * altura}")` },
  { id: 2003, solution: `nombre = "Carlos"\nnacimiento = 2000\nactual = 2026\nprint(f"Hola {nombre}, tu edad estimada es {actual - nacimiento} años.")` },

  // Lección 15: Métodos de Limpieza - strip()
  { id: 2101, solution: `texto = "   Python es genial   "\nprint(texto.strip())` },
  { id: 2102, solution: `codigo = "###codigo_secreto###"\nprint(codigo.lstrip("#"))` },
  { id: 2103, solution: `cadena = "\t...hola python...\n"\nprint(cadena.strip(".\t\n"))` },
  { id: 2104, solution: `texto = "xX_Hola_Xx"\nprint(texto.strip("xX"))` },

  // Lección 16: Métodos lstrip() y rstrip()
  { id: 2201, solution: `texto = "  Python es genial  \n"\nprint(texto.rstrip())` },
  { id: 2202, solution: `enlace = "https://miweb.com"\nprint(enlace.lstrip("htps:/"))` },
  { id: 2203, solution: `archivo = "---reporte_final.pdf---"\nprint(archivo.lstrip("-").rstrip("-.pdf"))` },

  // Lección 17: istitle() y title()
  { id: 2301, solution: `ciudad = "mAdRiD eSpAñA"\nciudad_correcta = ciudad.title()\nprint(ciudad_correcta)` },
  { id: 2302, solution: `libro = "El señor De Los Anillos"\npelicula = "El Padrino"\nprint(libro.istitle(), pelicula.istitle())` },
  { id: 2303, solution: `nombre = "mAriA pEreZ"\nif nombre.istitle():\n    print("Correcto")\nelse:\n    print("Corregido: " + nombre.title())` },

  // Lección 18: lower(), upper(), islower(), isupper()
  { id: 2401, solution: `min_texto = "estoy gritando"\nmay_texto = "ESTOY SUSURRANDO"\nprint(min_texto.upper())\nprint(may_texto.lower())` },
  { id: 2402, solution: `clave_1 = "admin123"\nclave_2 = "ROOT_ACC"\nprint(clave_1.islower(), clave_2.isupper())` },
  { id: 2403, solution: `respuesta = "Si"\nif respuesta.lower() == "si":\n    print("Acción confirmada")\nelse:\n    print("Acción denegada")` },

  // Lección 19: swapcase()
  { id: 2501, solution: `frase = "hOLA mUNDO"\nfrase_corregida = frase.swapcase()\nprint(frase_corregida)` },
  { id: 2502, solution: `codigo = "pYTHON3.10!"\nprint(codigo.swapcase())` },
  { id: 2503, solution: `mensaje = "eL bLoQuEo De MaYuScUlAs Es UnA PeSaDiLlA!"\nmensaje = mensaje.swapcase()\nprint(mensaje)` },

  // Lección 20: capitalize()
  { id: 2601, solution: `frase = "python es increíble"\nfrase_formal = frase.capitalize()\nprint(frase_formal)` },
  { id: 2602, solution: `texto = "eL pROGRAMADOR APRENDE RÁPIDO."\ntexto = texto.capitalize()\nprint(texto)` },
  { id: 2603, solution: `dato = "3 LENGUAJES DE PROGRAMACIÓN MÁS USADOS."\nprint(dato.capitalize())` },

  // Lección 21: center(), ljust(), rjust()
  { id: 2701, solution: `titulo = "PYTHON"\nprint(titulo.center(20, "-"))` },
  { id: 2702, solution: `palabra = "Inicio"\nprint(palabra.ljust(15, "*"))` },
  { id: 2703, solution: `precio = "$99.99"\nprecio = precio.rjust(12)\nprint(precio)` },

  // Lección 22: count()
  { id: 2801, solution: `texto = "programación en python"\nprint(texto.count("o"))` },
  { id: 2802, solution: `frase = "El Águila caza al águila."\nprint(frase.count("águila"))` },
  { id: 2803, solution: `datos = "100100100"\nprint(datos.count("1", 2, 8))` },

  // Lección 23: startswith() y endswith()
  { id: 2901, solution: `archivo = "reporte_ventas.pdf"\nprint(archivo.startswith("reporte"))` },
  { id: 2902, solution: `url = "https://miweb.COM"\nprint(url.endswith(".com"))` },
  { id: 2903, solution: `texto = "Hola Python Mundo"\nprint(texto.startswith("Python", 5, 11))` },

  // Lección 24: Substrings
  { id: 3001, solution: `palabra = "Programación"\nprint(palabra[4])` },
  { id: 3002, solution: `mensaje = "Hola Mundo"\nprint(mensaje[5:])` },
  { id: 3003, solution: `letras = "abcdefghij"\nprint(letras[1:8:2])` },
  { id: 3004, solution: `codigo = "Python2026"\nprint(codigo[:-4])` },
];

async function insertSolutions() {
  console.log(`\n🚀 Insertando ${solutions.length} soluciones del Módulo 1...\n`);
  let ok = 0, fail = 0;

  for (const s of solutions) {
    const { error } = await supabase
      .from('exercises')
      .update({ solution_code: s.solution })
      .eq('id', s.id);

    if (error) {
      console.log(`❌ ID ${s.id}: ${error.message}`);
      fail++;
    } else {
      console.log(`✅ ID ${s.id} guardado.`);
      ok++;
    }
  }

  console.log(`\n✅ Completado: ${ok} guardados, ${fail} fallidos.`);
}

insertSolutions();
