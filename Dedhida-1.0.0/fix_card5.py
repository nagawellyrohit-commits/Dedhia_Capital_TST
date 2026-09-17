import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace Card 5 SVG
content = re.sub(
    r'<svg class="tree-pointer" width="120" height="40" style="left: -20px; top: 15px; overflow: visible;">\s*<path d="M 0 0 C -30 5, -60 10, -90 15" fill="none" stroke="#8B5CF6" stroke-width="2"/>\s*<circle cx="-90" cy="15" r="5" fill="#8B5CF6" stroke="#fff" stroke-width="2" />\s*</svg>',
    '<svg class="tree-pointer" width="160" height="80" style="left: -20px; top: 15px; overflow: visible;">\n                    <path d="M 0 0 C -50 -10, -100 -20, -140 -35" fill="none" stroke="#8B5CF6" stroke-width="2"/>\n                    <circle cx="-140" cy="-35" r="5" fill="#8B5CF6" stroke="#fff" stroke-width="2" />\n                </svg>',
    content
)

with open('index.html', 'w') as f:
    f.write(content)

print("Adjusted Card 5 pointer.")
