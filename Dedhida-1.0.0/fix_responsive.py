import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Add min-width to tree-layout-wrapper in CSS and remove max-height so it scales properly without squashing
content = re.sub(
    r'\.tree-layout-wrapper \{[^\}]*\}',
    '''.tree-layout-wrapper {
                width: 100%;
                min-width: 900px;
                max-width: 1200px;
                aspect-ratio: 1484 / 1060;
                margin: 0 auto;
                position: relative;
            }''',
    content
)

# 2. Remove d-none d-lg-block and wrap in an overflow container
content = re.sub(
    r'<!-- Desktop Custom Absolute Tree Layout -->\s*<div class="tree-layout-wrapper d-none d-lg-block mb-5 wow fadeIn" data-wow-delay="0.2s">',
    '<!-- Unified Tree Layout (Scrollable on Mobile) -->\n        <div style="width: 100%; overflow-x: auto; padding-bottom: 20px;">\n            <div class="tree-layout-wrapper mb-5 wow fadeIn" data-wow-delay="0.2s">',
    content
)

# 3. Add closing div for the overflow wrapper right before the mobile fallback
content = re.sub(
    r'        <!-- Mobile Fallback Layout -->',
    '        </div>\n\n        <!-- Mobile Fallback Layout -->',
    content
)

# 4. Remove the entire mobile fallback block
# Find from <!-- Mobile Fallback Layout --> up to </section>
pattern = r'<!-- Mobile Fallback Layout -->.*?</div>\s*</section>'
content = re.sub(pattern, '</section>', content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(content)

print("Applied responsive scrolling layout and removed mobile fallback.")
