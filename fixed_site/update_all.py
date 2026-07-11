import os
import glob
import re

cart_script = '  <script src="cart.js"></script>\n  <script>'

# 1. Update product.html
product_file = 'product.html'
if os.path.exists(product_file):
    with open(product_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'cart.js' not in content:
        content = content.replace('  <script>', cart_script)
    
    new_button = """<button onclick="addToCart('${p.id}', '${p.name.replace(/'/g, \\\\\\'')}', '${p.price}', '${p.image}')" class="order-btn" style="width: 100%;">
                   Add to Cart 🛒
                </button>"""
    
    content = content.replace('8801998421007', '8801577098376')
    content = content.replace('01998421007', '01577098376')
    content = content.replace('wa.me/1577098376', 'wa.me/8801577098376')
    
    button_pattern = re.compile(r'<a href="https://wa\.me/8801577098376\?text=\$\{waMessage\}" target="_blank" rel="noopener noreferrer" class="order-btn">[\s\S]*?Order via WhatsApp[\s\S]*?</a>')
    content = button_pattern.sub(new_button, content)
    button_pattern2 = re.compile(r'<a href="https://wa\.me/8801998421007\?text=\$\{waMessage\}" target="_blank" rel="noopener noreferrer" class="order-btn">[\s\S]*?Order via WhatsApp[\s\S]*?</a>')
    content = button_pattern2.sub(new_button, content)
    
    with open(product_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated product.html")

# 2. Update nav.js
nav_file = 'nav.js'
if os.path.exists(nav_file):
    with open(nav_file, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('8801998421007', '8801577098376')
    content = content.replace('01998421007', '01577098376')
    with open(nav_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated nav.js")

# 3. Update all other specific HTML files (index and categories) that render the grid
pages_to_update = ['index.html', 'arduino-bangladesh.html', 'sensors-bangladesh.html', 'electronics-components-bd.html']

for page in pages_to_update:
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'cart.js' not in content:
            content = content.replace('  <script>', cart_script)
            
        content = content.replace('8801998421007', '8801577098376')
        content = content.replace('01998421007', '01577098376')
        content = content.replace('wa.me/1577098376', 'wa.me/8801577098376')
        
        new_footer = """<button class="btn" style="padding: 10px; background: rgba(0,209,255,0.1); color: var(--accent); border: 1px solid var(--accent); cursor: pointer;" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, \\\\\\'')}', '${item.price}', '${item.image}')">🛒</button>
              <a class="btn" href="${item.seoSlug ? item.seoSlug + '.html' : 'product.html?id=' + item.id}">View Details</a>"""
              
        footer_pattern = re.compile(r'<a class="btn" href="\$\{item\.seoSlug \? item\.seoSlug \+ \'\.html\' : \'product\.html\?id=\' \+ item\.id\}">View Details</a>')
        content = footer_pattern.sub(new_footer, content)

        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {page}")

# 4. For build-a-robotics-project-bangladesh.html, just add cart.js and update phone numbers
if os.path.exists('build-a-robotics-project-bangladesh.html'):
    with open('build-a-robotics-project-bangladesh.html', 'r', encoding='utf-8') as f:
        content = f.read()
    if 'cart.js' not in content:
        content = content.replace('</body>', '  <script src="cart.js"></script>\n</body>')
    content = content.replace('8801998421007', '8801577098376')
    content = content.replace('01998421007', '01577098376')
    content = content.replace('wa.me/1577098376', 'wa.me/8801577098376')
    with open('build-a-robotics-project-bangladesh.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated build-a-robotics-project-bangladesh.html")

