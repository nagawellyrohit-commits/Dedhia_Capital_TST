import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Update tree-layout-wrapper to have max-height and fit on screen
content = re.sub(
    r'\.tree-layout-wrapper \{[^\}]*\}',
    '''.tree-layout-wrapper {
                height: 75vh;
                max-height: 750px;
                aspect-ratio: 1484 / 1060;
                margin: 0 auto;
                position: relative;
            }''',
    content
)

# 2. Adjust Card 1 (Mutual Funds) to not be cut off at the top
# Currently top: -2%; right: 12%
# Move it down to top: 8%; right: 5%
content = re.sub(
    r'<div class="tree-card-node" style="top: -2%; right: 12%;">',
    '<div class="tree-card-node" style="top: 8%; right: 5%;">',
    content
)
# Modify Card 1 SVG to reach further left and up since we moved the card right and down
content = re.sub(
    r'<svg class="tree-pointer" width="60" height="80" style="left: -40px; top: 15px; overflow: visible;">\s*<path d="M 0 0 C -20 30, -50 50, -70 80" fill="none" stroke="#022672" stroke-width="2"/>\s*<circle cx="-70" cy="80" r="5" fill="#022672" stroke="#fff" stroke-width="2" />\s*</svg>',
    '<svg class="tree-pointer" width="120" height="80" style="left: -20px; top: 15px; overflow: visible;">\n                    <path d="M 0 0 C -30 -10, -70 -20, -110 -25" fill="none" stroke="#022672" stroke-width="2"/>\n                    <circle cx="-110" cy="-25" r="5" fill="#022672" stroke="#fff" stroke-width="2" />\n                </svg>',
    content
)

# 3. Adjust Card 3 (PMS) since it was also off
# Currently top: 25%; right: 4%
# Move down to top: 32%; right: 2%
content = re.sub(
    r'<div class="tree-card-node" style="top: 25%; right: 4%;">',
    '<div class="tree-card-node" style="top: 32%; right: 2%;">',
    content
)
# Modify Card 3 SVG
content = re.sub(
    r'<svg class="tree-pointer" width="80" height="60" style="left: -40px; top: 15px; overflow: visible;">\s*<path d="M 0 0 C -30 20, -70 30, -110 50" fill="none" stroke="#0F766E" stroke-width="2"/>\s*<circle cx="-110" cy="50" r="5" fill="#0F766E" stroke="#fff" stroke-width="2" />\s*</svg>',
    '<svg class="tree-pointer" width="120" height="60" style="left: -20px; top: 15px; overflow: visible;">\n                    <path d="M 0 0 C -40 -10, -80 -15, -120 -20" fill="none" stroke="#0F766E" stroke-width="2"/>\n                    <circle cx="-120" cy="-20" r="5" fill="#0F766E" stroke="#fff" stroke-width="2" />\n                </svg>',
    content
)

# 4. Adjust Card 5 (Explore)
# Currently top: 50%; right: 3%
# Move down to top: 55%; right: 1%
content = re.sub(
    r'<div class="tree-card-node" style="top: 50%; right: 3%;">',
    '<div class="tree-card-node" style="top: 55%; right: 1%;">',
    content
)

# 5. Fix Card 2 (SIF)
# Move down to top: 22%
content = re.sub(
    r'<div class="tree-card-node" style="top: 15%; left: 8%;">',
    '<div class="tree-card-node" style="top: 22%; left: 8%;">',
    content
)

# 6. Fix Card 4 (Insurance)
# Move down to top: 55%
content = re.sub(
    r'<div class="tree-card-node" style="top: 48%; left: 5%;">',
    '<div class="tree-card-node" style="top: 55%; left: 5%;">',
    content
)

with open('index.html', 'w') as f:
    f.write(content)

print("Adjusted layout bounds and card positions.")
