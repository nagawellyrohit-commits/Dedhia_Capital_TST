import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Fix tree-layout-wrapper (Remove min-width: 900px)
content = re.sub(
    r'\.tree-layout-wrapper \{[^\}]*\}',
    '''.tree-layout-wrapper {
                width: 100%;
                max-width: 1200px;
                aspect-ratio: 1484 / 1060;
                margin: 0 auto;
                position: relative;
            }''',
    content
)

# 2. Fix tree-card-node (Remove min-width: 240px)
content = re.sub(
    r'\.tree-card-node \{[^\}]*\}',
    '''.tree-card-node {
                position: absolute;
                z-index: 10;
                width: 28%;
                transition: transform 0.3s ease;
            }''',
    content
)

# 3. Update tree-card-header for fluid padding/font
content = re.sub(
    r'\.tree-card-header \{[^\}]*\}',
    '''.tree-card-header {
                color: #fff;
                padding: clamp(4px, 1vw, 10px) clamp(5px, 1vw, 15px);
                font-size: clamp(7px, 1.2vw, 14px);
                font-weight: 600;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }''',
    content
)

# 4. Update tree-card-body for fluid padding/font
content = re.sub(
    r'\.tree-card-body \{[^\}]*\}',
    '''.tree-card-body {
                padding: clamp(4px, 1vw, 12px) clamp(5px, 1vw, 15px);
                font-size: clamp(6px, 1.1vw, 13px);
                color: #555;
                line-height: 1.2;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }''',
    content
)

# 5. Update tree-badge
content = re.sub(
    r'\.tree-badge \{[^\}]*\}',
    '''.tree-badge {
                position: absolute;
                width: clamp(18px, 2.5vw, 26px);
                height: clamp(18px, 2.5vw, 26px);
                border-radius: 50%;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: clamp(8px, 1.2vw, 12px);
                border: 2px solid #fff;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                z-index: 12;
            }''',
    content
)

# 6. Update tree-btn-explore
content = re.sub(
    r'\.tree-btn-explore \{[^\}]*\}',
    '''.tree-btn-explore {
                border: 1px solid #8C5B19;
                color: #8C5B19;
                font-weight: 700;
                text-transform: uppercase;
                text-decoration: none;
                border-radius: 50px;
                padding: clamp(2px, 0.5vw, 8px) clamp(4px, 1vw, 16px);
                background: transparent;
                transition: all 0.3s ease;
                display: inline-block;
                width: 100%;
                text-align: center;
                font-size: clamp(6px, 1vw, 13px);
            }''',
    content
)

# 7. Make badges scale their offset positioning
# Replace `left: -13px; top: 13px;` with `left: -4%; top: 5%;` roughly
# But using calc to move it by its own radius is safer, or just small vw.
# Let's just use `left: -3%; top: 10%;` for left cards, `right: -3%; top: 10%;` for right cards.

# Card 1
content = re.sub(r'class="tree-badge" style="background-color: #022672; left: -13px; top: 13px;"', r'class="tree-badge" style="background-color: #022672; left: -5%; top: 10%;"', content)
# Card 2
content = re.sub(r'class="tree-badge" style="background-color: #9d7741; right: -13px; top: 13px;"', r'class="tree-badge" style="background-color: #9d7741; right: -5%; top: 10%;"', content)
# Card 3
content = re.sub(r'class="tree-badge" style="background-color: #0F766E; left: -13px; top: 13px;"', r'class="tree-badge" style="background-color: #0F766E; left: -5%; top: 10%;"', content)
# Card 4
content = re.sub(r'class="tree-badge" style="background-color: #16A34A; right: -13px; top: 13px;"', r'class="tree-badge" style="background-color: #16A34A; right: -5%; top: 10%;"', content)
# Card 5
content = re.sub(r'class="tree-badge" style="background-color: #8B5CF6; left: -13px; top: 13px;"', r'class="tree-badge" style="background-color: #8B5CF6; left: -5%; top: 10%;"', content)

with open('index.html', 'w') as f:
    f.write(content)

print("Applied full fluid scaling to the tree layout.")
