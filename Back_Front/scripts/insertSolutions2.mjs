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
  { id: 9201, solution: `print('Iniciando programa')\nmensaje = 'Todo en orden'\nprint(mensaje)` },
  { id: 9202, solution: `if True:\n    print('Acceso concedido')` },
  { id: 9203, solution: `if True:\n    print('Paso 1')\n    print('Paso 2')\n    print('Paso 3')\n\nprint('Fin')` },
  { id: 801, solution: `if edad >= 18:\n    print('Eres mayor de edad')` },
  { id: 802, solution: `clave = 1234\n\nif clave == 1234:\n    print('Acceso concedido al búnker secreto')` },
  { id: 803, solution: `nota1 = 7\nnota2 = 8\nnota3 = 5\npromedio = (nota1 + nota2 + nota3) / 3\nif promedio >= 6:\n    print('Aprobado')` },
  { id: 901, solution: `if edad >= 18:\n    print('Acceso')\nelse:\n    print('Denegado')` },
  { id: 902, solution: `llueve = True\n\nif llueve:\n    print('Lleva paraguas')\nelse:\n    print('Usa gafas de sol')` },
  { id: 903, solution: `numero_corto = round(numero_largo, 2)\nprint(numero_corto)` },
  { id: 904, solution: `mate = 5\nquimica = 6\nbiologia = 6\npromedio = round((mate + quimica + biologia) / 3, 1)\nif promedio >= 6.0:\n    print('Aprobado')\nelse:\n    print('Reprobado')` },
  { id: 1001, solution: `if semaforo == 'Verde':\n    print('Avanzar')\nelif semaforo == 'Amarillo':\n    print('Precaución')\nelif semaforo == 'Rojo':\n    print('Detenerse')` },
  { id: 1002, solution: `if dia == 1:\n    print('Lunes')\nelif dia == 2:\n    print('Martes')\nelif dia == 3:\n    print('Miércoles')` },
  { id: 1003, solution: `opcion = 4\n\nif opcion == 1:\n    print('Perfil')\nelif opcion == 2:\n    print('Configuración')\nelse:\n    print('Opción inválida')` },
  { id: 1004, solution: `if num == 1:\n    print('Uno')\nelif num == 2:\n    print('Dos')\nelif num == 3:\n    print('Tres')\nelif num == 4:\n    print('Cuatro')\nelif num == 5:\n    print('Cinco')\nelse:\n    print('No soportado')` },
  { id: 1101, solution: `print('Hola\\nMundo')` },
  { id: 1102, solution: `salida = entrada.lower()\nprint(salida)` },
  { id: 1103, solution: `if usuario == 'admin':\n    if clave == 123:\n        print('Acceso Total')` },
  { id: 1104, solution: `if menu == 2:\n    texto = texto.lower()\n    if texto == 'uno':\n        print('El número es 1')` },
  { id: 1201, solution: `son_iguales = (num1 == num2)\nson_diferentes = (num1 != num2)\nprint(son_iguales, son_diferentes)` },
  { id: 1202, solution: `numero1 = int(input())\nnumero2 = int(input())\nprint('Los números son:', numero1, 'y', numero2)` },
  { id: 1203, solution: `if num1 < num2:\n    print('num1 es menor que num2')\nif num1 > num2:\n    print('num1 es mayor que num2')\nif num1 == num2:\n    print('num1 es igual a num2')\nif num1 != num2:\n    print('num1 es diferente de num2')\nif num1 <= num2:\n    print('num1 es menor o igual a num2')\nif num1 >= num2:\n    print('num1 es mayor o igual a num2')` },
  { id: 1204, solution: `if password != '1234':\n    print('Contraseña segura')` },
  { id: 1301, solution: `if x > 10 and x < 20:\n    print('En rango')` },
  { id: 1302, solution: `if respuesta == 'sí' or respuesta == 'yes':\n    print('Aceptado')` },
  { id: 1303, solution: `if not activo:\n    print('Sistema apagado')` },
  { id: 1601, solution: `while contador <= 5:\n    print(contador)\n    contador += 1` },
  { id: 1602, solution: `i = 0\nwhile i < 3:\n    print("Python")\n    i += 1` },
  { id: 1603, solution: `while cuenta > 0:\n    print(cuenta)\n    cuenta -= 1\nprint('¡Despegue!')` },
  { id: 1701, solution: `while True:\n    print(num)\n    num += 1\n    if num == 4:\n        break` },
  { id: 1702, solution: `while i < 5:\n    i += 1\n    if i == 3:\n        continue\n    print(i)` },
  { id: 1703, solution: `while True:\n    num += 1\n    if num % 7 == 0:\n        print(num)\n        break` },
  { id: 1704, solution: `while x < 10:\n    x += 1\n    if x == 2:\n        continue\n    if x == 5:\n        break\n    print(x)` },
  { id: 3101, solution: `for letra in palabra:\n    print(letra)` },
  { id: 3102, solution: `for letra in mensaje:\n    print(letra.upper())` },
  { id: 3103, solution: `for numero in texto:\n    print(numero)\nprint("Terminado")` },
  { id: 3201, solution: `for i in range(5):\n    print(i)` },
  { id: 3202, solution: `for i in range(15, 19):\n    print(i)` },
  { id: 3203, solution: `for i in range(5, 0, -1):\n    print(i)` },
  { id: 3301, solution: `for i in range(1, 6):\n    print(i)` },
  { id: 3302, solution: `for i in range(0, 11, 2):\n    print(i)` },
  { id: 3303, solution: `for i in range(1, 4):\n    print(i)\nprint("Lanzamiento!")` }
];

async function insertSolutions() {
  console.log("\\n🚀 Insertando " + solutions.length + " soluciones del Módulo 2...\\n");
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
