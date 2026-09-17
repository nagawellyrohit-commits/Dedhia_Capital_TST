import re

with open('index.html', 'r') as f:
    content = f.read()

# Find the milestone-roadmap-wrapper and update the img tag
new_img = '<img src="img/tree.png" alt="Tree Background" class="roadmap-tree-bg d-none d-md-block" style="position: absolute; top: 0; left: 50%; transform: translateX(-35%); height: 100%; width: auto; max-width: none; object-fit: contain; z-index: 0; mix-blend-mode: multiply; opacity: 0.85; pointer-events: none;">'

# Replace the existing img tag
content = re.sub(r'<img src="img/tree\.png" alt="Tree Background"[^>]*>', new_img, content)

with open('index.html', 'w') as f:
    f.write(content)

print("Fixed tree image styling.")
