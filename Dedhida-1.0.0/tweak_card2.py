import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace Line 2 coordinates
old_line = '<line x1="30" y1="25" x2="38" y2="31" stroke="#9d7741" stroke-width="0.3" />'
old_circle = '<circle cx="38" cy="31" r="0.8" fill="#9d7741" stroke="#fff" stroke-width="0.2" />'

new_line = '<line x1="30" y1="25" x2="35" y2="26" stroke="#9d7741" stroke-width="0.3" />'
new_circle = '<circle cx="35" cy="26" r="0.8" fill="#9d7741" stroke="#fff" stroke-width="0.2" />'

content = content.replace(old_line, new_line)
content = content.replace(old_circle, new_circle)

with open('index.html', 'w') as f:
    f.write(content)

print("Tweaked Card 2 pointer coordinates.")
