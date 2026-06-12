import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
});

const result = spawnSync('npx', ['tsx', 'scripts/migrateCurriculum.ts'], { stdio: 'inherit', shell: true });
console.log("Exit code:", result.status);
