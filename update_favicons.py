import os
import glob
import shutil

root_dir = r"c:\Users\Meherab\Downloads\ElectromartBD_fixed_final"
favicon_dir = os.path.join(root_dir, "favicon")

# 1. Move favicon files to root
favicon_files = [
    "apple-touch-icon.png",
    "favicon-96x96.png",
    "favicon.ico",
    "favicon.svg",
    "site.webmanifest",
    "web-app-manifest-192x192.png",
    "web-app-manifest-512x512.png"
]

for file_name in favicon_files:
    src = os.path.join(favicon_dir, file_name)
    dst = os.path.join(root_dir, file_name)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {file_name} to root")

# Also copy one to logo.png for JSON-LD schema
logo_src = os.path.join(favicon_dir, "web-app-manifest-512x512.png")
logo_dst = os.path.join(root_dir, "logo.png")
if os.path.exists(logo_src):
    shutil.copy2(logo_src, logo_dst)
    print(f"Created logo.png for schema")

# 2. Update HTML files
new_favicon_tags = """  <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="shortcut icon" href="favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
  <link rel="manifest" href="site.webmanifest" />"""

old_favicon_tag = '  <link rel="icon" type="image/svg+xml" href="favicon.svg">'

html_files = glob.glob(os.path.join(root_dir, "*.html"))
for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_favicon_tag in content:
        content = content.replace(old_favicon_tag, new_favicon_tags)
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(html_file)}")
    elif 'apple-touch-icon' not in content:
        # Fallback if the exact old tag wasn't found but it still needs tags
        # Replace the <head> close tag instead
        if '</head>' in content:
            content = content.replace('</head>', new_favicon_tags + '\n</head>')
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {os.path.basename(html_file)} (fallback)")

print("Done updating favicons!")
