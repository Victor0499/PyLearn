import re
with open('src/app/learn/page.tsx', encoding='utf-8') as f:
    data = f.read()

for m in re.finditer(r'id:\s*(\d+(?:\.\d+)?),\s*title:\s*[\'\"](.*?)[\'\"]', data):
    if len(m.group(1)) <= 2:
        print(f"ID {m.group(1)}: {m.group(2)}")
