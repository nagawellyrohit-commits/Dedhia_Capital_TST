import re

with open('css/style.css', 'r') as f:
    content = f.read()

# Replace .navbar .btn-primary background gradient from orange to gold
content = re.sub(
    r'\.navbar \.btn-primary\s*\{[^}]*\}',
    '''.navbar .btn-primary {
    background: linear-gradient(135deg, #C9954B 0%, #D4A054 100%) !important;
    border: none !important;
    box-shadow: 0 4px 14px rgba(201, 149, 75, 0.25) !important;
    color: #FFFFFF !important;
    border-radius: 50rem !important; /* rounded-pill equivalent */
    font-weight: 700 !important; /* fw-bold equivalent */
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
}''',
    content
)

# Replace hover
content = re.sub(
    r'\.navbar \.btn-primary:hover\s*\{[^}]*\}',
    '''.navbar .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(201, 149, 75, 0.35) !important;
    background: linear-gradient(135deg, #B8843A 0%, #C9954B 100%) !important;
    color: #FFFFFF !important;
}''',
    content
)

with open('css/style.css', 'w') as f:
    f.write(content)

print("Navbar button styling replaced")
