import fs from 'fs';
import path from 'path';

function findIds(filePath, moduleName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /id:\s*(\d+)/g;
  let match;
  const ids = [];
  while ((match = regex.exec(content)) !== null) {
    // Assuming exercises are the ones with ids >= 100 or something, but actually lessons also have ids.
    // Let's distinguish lesson id vs exercise id? Usually lesson id is 1-100, exercise is 100+ or 1000+.
    const id = parseInt(match[1]);
    if (id > 100) {
      ids.push({ id, module: moduleName });
    }
  }
  return ids;
}

const m1 = findIds(path.resolve(process.cwd(), 'src/app/learn/data/module1.ts'), 'm1');
const m2 = findIds(path.resolve(process.cwd(), 'src/app/learn/data/module2.ts'), 'm2');
const m3 = findIds(path.resolve(process.cwd(), 'src/app/learn/data/module3.ts'), 'm3');
const m4 = findIds(path.resolve(process.cwd(), 'src/app/learn/data/module4.ts'), 'm4');
const m5 = findIds(path.resolve(process.cwd(), 'src/app/learn/data/module5.ts'), 'm5');

const all = [...m1, ...m2, ...m3, ...m4, ...m5];
const seen = new Set();
const duplicates = new Set();

all.forEach(item => {
  if (seen.has(item.id)) {
    duplicates.add(item.id);
  }
  seen.add(item.id);
});

console.log("Duplicate IDs found:", Array.from(duplicates));

all.filter(item => duplicates.has(item.id)).forEach(item => {
  console.log(`ID ${item.id} found in ${item.module}`);
});
