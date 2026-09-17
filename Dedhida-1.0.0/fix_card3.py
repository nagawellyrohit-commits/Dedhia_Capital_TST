import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace Card 3 SVG
content = re.sub(
    r'<svg class="tree-pointer" width="120" height="60" style="left: -20px; top: 15px; overflow: visible;">\s*<path d="M 0 0 C -40 10, -90 15, -130 30" fill="none" stroke="#0F766E" stroke-width="2"/>\s*<circle cx="-130" cy="30" r="5" fill="#0F766E" stroke="#fff" stroke-width="2" />\s*</svg>',
    '<svg class="tree-pointer" width="160" height="60" style="left: -20px; top: 15px; overflow: visible;">\n                    <path d="M 0 0 C -40 0, -90 -5, -130 -10" fill="none" stroke="#0F766E" stroke-width="2"/>\n                    <circle cx="-130" cy="-10" r="5" fill="#0F766E" stroke="#fff" stroke-width="2" />\n                </svg>',
    content
)

with open('index.html', 'w') as f:
    f.write(content)

print("Adjusted Card 3 pointer.")
