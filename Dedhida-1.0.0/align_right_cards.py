import re

with open('index.html', 'r') as f:
    content = f.read()

# Card 1: Mutual Funds
# Currently: style="top: -2%; right: 12%;"
# Path: M 0 0 C -20 30, -50 50, -70 80
# Needs to be further right, maybe right: 5%; top: 2%.
# And line should go down and left.
content = re.sub(
    r'<div class="tree-card-node" style="top: -2%; right: 12%;">',
    '<div class="tree-card-node" style="top: 2%; right: 5%;">',
    content
)
# Modify Card 1 SVG to reach further left since we moved the card right
content = re.sub(
    r'<svg class="tree-pointer" width="60" height="80" style="left: -40px; top: 15px; overflow: visible;">\s*<path d="M 0 0 C -20 30, -50 50, -70 80" fill="none" stroke="#022672" stroke-width="2"/>\s*<circle cx="-70" cy="80" r="5" fill="#022672" stroke="#fff" stroke-width="2" />\s*</svg>',
    '<svg class="tree-pointer" width="120" height="80" style="left: -20px; top: 15px; overflow: visible;">\n                    <path d="M 0 0 C -30 20, -70 40, -110 70" fill="none" stroke="#022672" stroke-width="2"/>\n                    <circle cx="-110" cy="70" r="5" fill="#022672" stroke="#fff" stroke-width="2" />\n                </svg>',
    content
)

# Card 3: PMS
# Currently: style="top: 25%; right: 4%;"
# Needs to be maybe top: 28%; right: 2%;
content = re.sub(
    r'<div class="tree-card-node" style="top: 25%; right: 4%;">',
    '<div class="tree-card-node" style="top: 28%; right: 2%;">',
    content
)
# Modify Card 3 SVG
content = re.sub(
    r'<svg class="tree-pointer" width="80" height="60" style="left: -40px; top: 15px; overflow: visible;">\s*<path d="M 0 0 C -30 20, -70 30, -110 50" fill="none" stroke="#0F766E" stroke-width="2"/>\s*<circle cx="-110" cy="50" r="5" fill="#0F766E" stroke="#fff" stroke-width="2" />\s*</svg>',
    '<svg class="tree-pointer" width="120" height="60" style="left: -20px; top: 15px; overflow: visible;">\n                    <path d="M 0 0 C -40 10, -90 15, -130 30" fill="none" stroke="#0F766E" stroke-width="2"/>\n                    <circle cx="-130" cy="30" r="5" fill="#0F766E" stroke="#fff" stroke-width="2" />\n                </svg>',
    content
)

# Card 5: Explore
# Currently: style="top: 50%; right: 3%;"
# Needs to be top: 52%; right: 2%;
content = re.sub(
    r'<div class="tree-card-node" style="top: 50%; right: 3%;">',
    '<div class="tree-card-node" style="top: 52%; right: 2%;">',
    content
)
# Modify Card 5 SVG
content = re.sub(
    r'<svg class="tree-pointer" width="80" height="40" style="left: -40px; top: 15px; overflow: visible;">\s*<path d="M 0 0 C -20 10, -50 20, -70 30" fill="none" stroke="#8B5CF6" stroke-width="2"/>\s*<circle cx="-70" cy="30" r="5" fill="#8B5CF6" stroke="#fff" stroke-width="2" />\s*</svg>',
    '<svg class="tree-pointer" width="120" height="40" style="left: -20px; top: 15px; overflow: visible;">\n                    <path d="M 0 0 C -30 5, -60 10, -90 15" fill="none" stroke="#8B5CF6" stroke-width="2"/>\n                    <circle cx="-90" cy="15" r="5" fill="#8B5CF6" stroke="#fff" stroke-width="2" />\n                </svg>',
    content
)

with open('index.html', 'w') as f:
    f.write(content)

print("Aligned right cards and adjusted pointer paths.")
