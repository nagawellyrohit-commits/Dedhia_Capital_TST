import glob
import re

replacement = """                            <li>
                                <a class="dropdown-item" href="https://www.fundzbazar.com/signin" target="_blank"
                                    rel="noopener noreferrer">
                                    <img src="img/fundzbazar-logo.png" alt="FundzBazar" class="login-brand-icon me-2">
                                    FundzBazar Login
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="https://onedigital.centricity.co.in/login" target="_blank"
                                    rel="noopener noreferrer">
                                    <img src="img/centricity-logo.png" alt="Centricity" class="login-brand-icon me-2">
                                    Centricity Login
                                </a>
                            </li>"""

# Regex to match the exact two list items.
# We will match from <li> down to the closing </li> of the second item.
pattern = re.compile(r'<li>\s*<a class="dropdown-item" href="https://onedigital.centricity.co.in/login".*?</li>\s*<li>\s*<a class="dropdown-item" href="https://www.fundzbazar.com/signin".*?</li>', re.DOTALL)

for file in glob.glob("*.html"):
    with open(file, 'r') as f:
        data = f.read()
    
    new_data, count = pattern.subn(replacement, data)
    
    if count > 0:
        with open(file, 'w') as f:
            f.write(new_data)
        print(f"Updated {file}")
