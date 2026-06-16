import re
import json

with open('src/app/learn/page.tsx', encoding='utf-8') as f:
    data = f.read()

lessons = {}
# Find all occurrences of "id: X" and then count exercises within them
# Let's just find the `exercises: [` arrays.
# A simpler approach: use AST or a robust regex.
# Actually, we can split the file by `id:` and then within each block count `{` that are inside `exercises: [`
# A much simpler way: count the `id: X` inside the exercises block!
# Exercises have `id: XXXX` where XXXX is usually lesson_id + "01".
# But let's just parse it using regex for the `exercises: [` blocks.

lesson_blocks = re.split(r'id:\s*(\d+),', data)
# The split returns: [ preamble, id1, block1, id2, block2, ...]
# So for i in range(1, len(lesson_blocks), 2), we have id = lesson_blocks[i], block = lesson_blocks[i+1]

for i in range(1, len(lesson_blocks), 2):
    lesson_id = int(lesson_blocks[i])
    # Now we find the exercises array within block
    ex_match = re.search(r'exercises:\s*\[(.*?)\]\s*}', lesson_blocks[i+1], flags=re.DOTALL)
    if ex_match:
        ex_content = ex_match.group(1)
        # Count number of times we see `id:` inside the exercises array
        num_exercises = len(re.findall(r'id:\s*\d+', ex_content))
        lessons[lesson_id] = num_exercises

print(json.dumps(lessons))
