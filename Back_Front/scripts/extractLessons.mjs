import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(process.cwd(), 'src/app/learn/page.tsx'), 'utf-8');

const regex = /id:\s*(\d+),\s*title:\s*["'](.*?)["']/g;
let match;
let count = 0;
while ((match = regex.exec(file)) !== null) {
  // Only print lessons, skip exercises (which have id 101, 102, etc.)
  if (parseInt(match[1]) < 100) {
    console.log(`Lección ${match[1]}: ${match[2]}`);
    count++;
  }
}
console.log(`Total lecciones encontradas: ${count}`);
