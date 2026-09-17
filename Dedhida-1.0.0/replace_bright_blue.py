import re
import os

hex_blues = [
    r'#355EFC', r'#2a4bca', r'#203897', r'#2d50d6', r'#3055e3', r'#0d6efd'
]

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    for hex_c in hex_blues:
        content = re.sub(hex_c, '#022672', content, flags=re.IGNORECASE)

    # Replace RGB(A)
    # 355EFC = 53, 94, 252
    content = re.sub(r'53\s*,\s*94\s*,\s*252', '2, 38, 114', content, flags=re.IGNORECASE)
    # 2a4bca = 42, 75, 202
    content = re.sub(r'42\s*,\s*75\s*,\s*202', '2, 38, 114', content, flags=re.IGNORECASE)
    # 0d6efd = 13, 110, 253
    content = re.sub(r'13\s*,\s*110\s*,\s*253', '2, 38, 114', content, flags=re.IGNORECASE)

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

