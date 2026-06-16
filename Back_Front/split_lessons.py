import re
import os

# Read the full file
with open('src/app/learn/page.tsx', encoding='utf-8') as f:
    content = f.read()

# ------------------------------------------------------------------
# 1. Extract the lessons array content
# ------------------------------------------------------------------
# Start: after `const lessons = [`
lessons_start_marker = 'const lessons = [\n'
lessons_end_marker = '\n];\n'

start_idx = content.index(lessons_start_marker) + len(lessons_start_marker)

# Find the end marker after start_idx
end_idx = content.index('\n];\n', start_idx)

lessons_raw = content[start_idx:end_idx]

# ------------------------------------------------------------------
# 2. Split into individual lesson blocks
# We split on top-level lesson delimiters: "  {\n    id: N,"
# ------------------------------------------------------------------
# Use a regex to find positions where a new lesson starts
# Each lesson block starts with exactly 2-space indent then `{`
lesson_split_pattern = re.compile(r'(?=\n  \{\n    id: \d+,)')
parts = lesson_split_pattern.split(lessons_raw)

# parts[0] is everything before the first lesson (should be empty or whitespace)
# Each subsequent part is a single lesson block starting with \n  {\n    id:...

lesson_blocks = []
for part in parts:
    # Strip the leading newline
    stripped = part.strip()
    if not stripped:
        continue
    lesson_blocks.append(stripped)

print(f"Total lessons extracted: {len(lesson_blocks)}")

# ------------------------------------------------------------------
# 3. Parse lesson IDs
# ------------------------------------------------------------------
def get_lesson_id(block):
    m = re.match(r'\{\s*\n\s*id:\s*(\d+),', block)
    if m:
        return int(m.group(1))
    return None

lesson_map = {}
for block in lesson_blocks:
    lid = get_lesson_id(block)
    if lid is not None:
        lesson_map[lid] = block
    else:
        print(f"WARNING: Could not parse ID from block starting: {block[:80]}")

print(f"Parsed IDs: {sorted(lesson_map.keys())}")

# ------------------------------------------------------------------
# 4. Module groupings (matching LESSONS_PER_MODULE)
# ------------------------------------------------------------------
modules = {
    1: [1, 2, 3, 4, 5, 6, 7, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    2: [92, 8, 9, 10, 11, 12, 13, 16, 17, 31, 32, 33],
    3: list(range(34, 68)),  # 34..67
    4: [68, 69, 70, 71, 72, 73, 74, 75, 76, 80],
    5: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91],
}

module_names = {
    1: "Básicos y Strings",
    2: "Control de Flujo",
    3: "Colecciones",
    4: "Funciones y Modularidad",
    5: "Archivos y POO",
}

# Create output directory
os.makedirs('src/app/learn/data', exist_ok=True)

# ------------------------------------------------------------------
# 5. Write each module file
# ------------------------------------------------------------------
for mod_num, ids in modules.items():
    lines = []
    lines.append(f'// Módulo {mod_num}: {module_names[mod_num]}')
    lines.append('')
    lines.append(f'export const module{mod_num}Lessons = [')
    
    blocks_for_mod = []
    missing = []
    for lid in ids:
        if lid in lesson_map:
            blocks_for_mod.append(lesson_map[lid])
        else:
            missing.append(lid)
    
    if missing:
        print(f"Module {mod_num} MISSING IDs: {missing}")
    
    # Join all blocks with commas
    lesson_content = ',\n  '.join(blocks_for_mod)
    lines.append('  ' + lesson_content)
    lines.append('];')
    lines.append('')
    
    out_path = f'src/app/learn/data/module{mod_num}.ts'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"Module {mod_num}: wrote {len(blocks_for_mod)} lessons to {out_path}")

# ------------------------------------------------------------------
# 6. Update page.tsx - replace the lessons array with imports
# ------------------------------------------------------------------
# The replacement: remove `const lessons = [...];` and add imports + spread
new_imports = """import { module1Lessons } from "./data/module1";
import { module2Lessons } from "./data/module2";
import { module3Lessons } from "./data/module3";
import { module4Lessons } from "./data/module4";
import { module5Lessons } from "./data/module5";

const lessons = [
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
];"""

# The block to replace is: "const lessons = [\n" + lessons_raw + "\n];"
old_block = lessons_start_marker[:-1] + '\n' + content[start_idx:end_idx] + '\n];'
new_content = content.replace(old_block, new_imports, 1)

with open('src/app/learn/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("\nDone! page.tsx updated with imports.")
print(f"New page.tsx size: {len(new_content)} chars")
