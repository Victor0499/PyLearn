import re
import json

with open('src/app/learn/page.tsx', encoding='utf-8') as f:
    content = f.read()

# We can match each lesson object: `{ id: ..., title: ..., ... exercises: [ ... ] }`
# A reliable way: split the file by `id:` but we must only match lesson IDs, not exercise IDs.
# Notice that lesson IDs are `id: <1-92>,`
# Exercise IDs are `id: <100+>,`
# Actually, the most reliable way:
lessons_map = {}
# Find all `id: <number>,` that correspond to lessons. They usually have a `title:` right after.
lesson_blocks = re.split(r'\n  {\n\s*id:\s*(\d+),', content)

for i in range(1, len(lesson_blocks), 2):
    lesson_id = int(lesson_blocks[i])
    block = lesson_blocks[i+1]
    
    # Within this block, find the `exercises: [` array
    # Since blocks are split by the lesson start, `block` contains exactly one `exercises:` array
    # We can just count how many times `id:` appears in this block, or specifically `id:` with a number > 100
    ex_count = len(re.findall(r'id:\s*\d{3,}', block))
    lessons_map[lesson_id] = ex_count

print(json.dumps(lessons_map))
