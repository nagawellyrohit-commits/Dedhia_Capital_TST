import re

with open('css/style.css', 'r') as f:
    content = f.read()

hex_blues = [
    r'#0B1628', r'#142744', r'#152542', r'#162542', r'#162F4D', 
    r'#122844', r'#011A41', r'#000B1C', r'#173873', r'#1B365D'
]

for hex_c in hex_blues:
    content = re.sub(hex_c, '#022672', content, flags=re.IGNORECASE)

# rgba replacements
# 0B1628 = 11, 22, 40
content = re.sub(r'rgba?\s*\(\s*11\s*,\s*22\s*,\s*40', 'rgba(2, 38, 114', content, flags=re.IGNORECASE)
content = re.sub(r'rgba?\s*\(\s*20\s*,\s*39\s*,\s*68', 'rgba(2, 38, 114', content, flags=re.IGNORECASE)

with open('css/style.css', 'w') as f:
    f.write(content)
print("Replaced blues in style.css")
