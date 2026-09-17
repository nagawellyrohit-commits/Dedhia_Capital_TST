import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace Line 2 coordinates in the unified SVG
old_line = '<line x1="30" y1="25" x2="35" y2="26" stroke="#9d7741" stroke-width="0.3" />'
old_circle = '<circle cx="35" cy="26" r="0.8" fill="#9d7741" stroke="#fff" stroke-width="0.2" />'

# Move the point significantly UP (y2=19)
new_line = '<line x1="30" y1="25" x2="35" y2="19" stroke="#9d7741" stroke-width="0.3" />'
new_circle = '<circle cx="35" cy="19" r="0.8" fill="#9d7741" stroke="#fff" stroke-width="0.2" />'

content = content.replace(old_line, new_line)
content = content.replace(old_circle, new_circle)

with open('index.html', 'w') as f:
    f.write(content)

print("Moved Card 2 pointer further UP.")
