import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace Line 3 coordinates in the unified SVG
old_line = '<line x1="70" y1="30" x2="62" y2="34" stroke="#0F766E" stroke-width="0.3" />'
old_circle = '<circle cx="62" cy="34" r="0.8" fill="#0F766E" stroke="#fff" stroke-width="0.2" />'

# Adjust to go further left (x2=56) and lower (y2=38) to hit the leaf tip shown in the screenshot
new_line = '<line x1="70" y1="30" x2="56" y2="38" stroke="#0F766E" stroke-width="0.3" />'
new_circle = '<circle cx="56" cy="38" r="0.8" fill="#0F766E" stroke="#fff" stroke-width="0.2" />'

content = content.replace(old_line, new_line)
content = content.replace(old_circle, new_circle)

with open('index.html', 'w') as f:
    f.write(content)

print("Tweaked Card 3 pointer coordinates in unified SVG.")
