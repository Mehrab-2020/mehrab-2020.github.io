#!/bin/bash

echo "🔧 Fixing ElectroMart BD domain migration from .com to .bd..."

# 1. Update all HTML files
echo "📝 Updating HTML files..."
for file in *.html; do
  if [ -f "$file" ]; then
    sed -i 's|https://electromartbd\.com|https://electromartbd.bd|g' "$file"
    echo "  ✓ Fixed $file"
  fi
done

# 2. Update sitemap.xml
echo "📋 Updating sitemap.xml..."
sed -i 's|https://electromartbd\.com|https://electromartbd.bd|g' sitemap.xml
echo "  ✓ Fixed sitemap.xml"

# 3. Create .htaccess for redirects
echo "🔄 Creating .htaccess for redirects..."
cat > .htaccess << 'HTACCESS'
# ElectroMart BD - Redirect from .com to .bd
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Redirect from .com to .bd domain
  RewriteCond %{HTTP_HOST} ^(www\.)?electromartbd\.com$ [NC]
  RewriteRule ^(.*)$ https://electromartbd.bd/$1 [L,R=301]

  # Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>
HTACCESS

echo "  ✓ Created .htaccess"

echo ""
echo "✅ All fixes completed!"
echo ""
echo "Summary of changes:"
echo "  • All HTML canonical tags updated: .com → .bd"
echo "  • All Open Graph URLs updated: .com → .bd"
echo "  • All Twitter card URLs updated: .com → .bd"
echo "  • Sitemap URLs updated: .com → .bd"
echo "  • .htaccess created with 301 redirects from .com to .bd"
echo "  • HTTPS enforcement enabled"
echo "  • Security headers added"
echo "  • Gzip compression enabled"
echo ""
