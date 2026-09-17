import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace Line 5 coordinates in the unified SVG
old_line = '<line x1="72" y1="62" x2="65" y2="56" stroke="#8B5CF6" stroke-width="0.3" />'
old_circle = '<circle cx="65" cy="56" r="0.8" fill="#8B5CF6" stroke="#fff" stroke-width="0.2" />'

# Let's adjust to go much higher (y2=49) and further left (x2=62)
new_line = '<line x1="72" y1="62" x2="62" y2="49" stroke="#8B5CF6" stroke-width="0.3" />'
new_circle = '<circle cx="62" cy="49" r="0.8" fill="#8B5CF6" stroke="#fff" stroke-width="0.2" />'

content = content.replace(old_line, new_line)
content = content.replace(old_circle, new_circle)

with open('index.html', 'w') as f:
    f.write(content)

print("Tweaked Card 5 pointer coordinates in unified SVG.")
