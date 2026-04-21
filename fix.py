import os, re

js_content = open('products.js', 'r', encoding='utf-8').read()
products = re.findall(r'id:\s*\"([^\"]+)\",\s*seoSlug:\s*\"([^\"]+)\"', js_content)

count = 0
for pid, slug in products:
    filepath = slug + '.html'
    if os.path.exists(filepath):
        html = open(filepath, 'r', encoding='utf-8').read()
        html = re.sub(r"const productId\s*=\s*urlParams\.get\('id'\);", f'const productId = "{pid}";', html)
        open(filepath, 'w', encoding='utf-8').write(html)
        print(f'Fixed {filepath}')
        count += 1

print(f'Fixed {count} files.')
