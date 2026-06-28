import os

cart_script = '  <script src="cart.js"></script>\n  <script>'

# Update product.html
product_file = 'product.html'
if os.path.exists(product_file):
    with open(product_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Insert cart.js script
    if 'cart.js' not in content:
        content = content.replace('  <script>', cart_script)
    
    # Replace Order via WhatsApp with Add to Cart
    old_button = """<a href="https://wa.me/8801998421007?text=${waMessage}" target="_blank" rel="noopener noreferrer" class="order-btn">
                   Order via WhatsApp
                </a>"""
    new_button = """<button onclick="addToCart('${p.id}', '${p.name.replace(/'/g, \\\\\\'')}', '${p.price}', '${p.image}')" class="order-btn" style="width: 100%;">
                   Add to Cart 🛒
                </button>"""
    # Just in case whitespace is tricky, we can use regex or simple replace if exact
    
    # Also update the footer whatsapp number
    content = content.replace('8801998421007', '8801577098376')
    content = content.replace('01998421007', '01577098376')
    
    # For the button, let's try a regex replace to ignore whitespace
    import re
    button_pattern = re.compile(r'<a href="https://wa\.me/8801577098376\?text=\$\{waMessage\}" target="_blank" rel="noopener noreferrer" class="order-btn">[\s\S]*?Order via WhatsApp[\s\S]*?</a>')
    content = button_pattern.sub(new_button, content)
    
    # if it wasn't caught (maybe still old number), try old number
    button_pattern2 = re.compile(r'<a href="https://wa\.me/8801998421007\?text=\$\{waMessage\}" target="_blank" rel="noopener noreferrer" class="order-btn">[\s\S]*?Order via WhatsApp[\s\S]*?</a>')
    content = button_pattern2.sub(new_button, content)

    with open(product_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated product.html")

# Update index.html and category pages
pages_to_update = ['index.html', 'arduino-bangladesh.html', 'sensors-bangladesh.html', 'electronics-components-bd.html']

for page in pages_to_update:
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'cart.js' not in content:
            content = content.replace('  <script>', cart_script)
            
        # Update phone numbers
        content = content.replace('8801998421007', '8801577098376')
        content = content.replace('01998421007', '01577098376')
        
        # We need to add "Add to Cart" button to the product cards in these pages.
        # The product card footer looks like:
        # <div class="card-footer">
        #   <div class="price">${item.price}</div>
        #   <a class="btn" href="${item.seoSlug ? item.seoSlug + '.html' : 'product.html?id=' + item.id}">View Details</a>
        # </div>
        
        old_footer = """<a class="btn" href="${item.seoSlug ? item.seoSlug + '.html' : 'product.html?id=' + item.id}">View Details</a>"""
        new_footer = """<button class="btn" style="padding: 10px; background: rgba(0,209,255,0.1); color: var(--accent); border: 1px solid var(--accent); cursor: pointer;" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, \\\\\\'')}', '${item.price}', '${item.image}')">🛒</button>
              <a class="btn" href="${item.seoSlug ? item.seoSlug + '.html' : 'product.html?id=' + item.id}">View Details</a>"""
              
        # Replace using regex
        footer_pattern = re.compile(r'<a class="btn" href="\$\{item\.seoSlug \? item\.seoSlug \+ \'\.html\' : \'product\.html\?id=\' \+ item\.id\}">View Details</a>')
        content = footer_pattern.sub(new_footer, content)

        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {page}")

# Also update nav.js with the new phone number
nav_file = 'nav.js'
if os.path.exists(nav_file):
    with open(nav_file, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('8801998421007', '8801577098376')
    content = content.replace('01998421007', '01577098376')
    with open(nav_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated nav.js")
