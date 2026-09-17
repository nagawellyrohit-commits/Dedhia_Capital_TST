import re
import os

hex_blues = [
    r'#0B1628', r'#142744', r'#152542', r'#162542', r'#162F4D', 
    r'#122844', r'#011A41', r'#000B1C', r'#173873', r'#1B365D'
]

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    for hex_c in hex_blues:
        content = re.sub(hex_c, '#022672', content, flags=re.IGNORECASE)

    content = re.sub(r'rgba?\s*\(\s*11\s*,\s*22\s*,\s*40', 'rgba(2, 38, 114', content, flags=re.IGNORECASE)
    content = re.sub(r'rgba?\s*\(\s*20\s*,\s*39\s*,\s*68', 'rgba(2, 38, 114', content, flags=re.IGNORECASE)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Replaced blues in {filepath}")

for root, _, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or '.vscode' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.js', '.css')):
            replace_in_file(os.path.join(root, file))

