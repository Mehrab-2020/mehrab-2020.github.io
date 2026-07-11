const fs = require('fs');
const path = require('path');

const { productsData } = require('./products.js');

const SITE_URL = 'https://www.electromartbd.bd';
const WHATSAPP_NUMBER = '1577098376';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toAbsoluteUrl(localPath) {
  return `${SITE_URL}${localPath.replace('./', '/')}`;
}

function getCategoryPage(categoryName) {
  if (categoryName === 'Development Boards') return {
    name: 'Arduino Bangladesh',
    url: `${SITE_URL}/arduino-bangladesh.html`
  };
  if (categoryName === 'Sensors & Modules') return {
    name: 'Sensors Bangladesh',
    url: `${SITE_URL}/sensors-bangladesh.html`
  };
  return {
    name: 'Electronics Components',
    url: `${SITE_URL}/electronics-components-bd.html`
  };
}

function renderProductPage(product) {
  const fileName = `${product.seoSlug}.html`;
  const pageUrl = `${SITE_URL}/${fileName}`;
  const imageUrl = toAbsoluteUrl(product.image);
  const price = product.price.replace(/[^0-9]/g, '');
  const categoryPage = getCategoryPage(product.categoryName);
  const metaTitle = product.metaTitle || `Best ${product.name} Price in BD / Bangladesh (2026) | Original - ElectroMart BD`;
  const metaDescription = product.metaDescription || `Buy ${product.name} in Bangladesh at the best price (2026). Original product, fast delivery and trusted electronics shop. Order now from ElectroMart BD.`;
  const metaKeywords = product.keywords ? `\n  <meta name="keywords" content="${escapeHtml(product.keywords)}">` : '';
  const waMessage = encodeURIComponent(`Hello! I want to order: ${product.name}`);
  const escapedName = product.name.replace(/'/g, "\\'");

  const featuresHtml = product.features
    .map(feature => `                <li>${escapeHtml(feature)}</li>`)
    .join('\n');

  const whyBuyHtml = product.whyBuy ? `
              <div class="why-buy-section">
                <h4>Why Buy from ElectroMart BD?</h4>
                <ul class="why-buy-list">
${product.whyBuy.map(item => `                  <li>${escapeHtml(item)}</li>`).join('\n')}
                </ul>
              </div>` : '';

  const packageHtml = product.packageIncludes ? `
              <div class="package-section">
                <h4>Package Includes</h4>
                <p>${escapeHtml(product.packageIncludes)}</p>
              </div>` : '';

  const descHtml = Array.isArray(product.fullDesc) 
    ? product.fullDesc.map(p => `<p>${escapeHtml(p)}</p>`).join('\n          ')
    : `<p>${escapeHtml(product.fullDesc)}</p>`;

  const specHtml = product.specifications ? `
        <h2 style="margin-top: 25px; margin-bottom: 15px; font-size: 1.2rem; color: #fff;">Specifications:</h2>
        <ul class="features-list">
${product.specifications.map(item => `          <li>${escapeHtml(item)}</li>`).join('\n')}
        </ul>` : '';

  const appHtml = product.applications ? `
        <h2 style="margin-top: 25px; margin-bottom: 15px; font-size: 1.2rem; color: #fff;">Applications:</h2>
        <ul class="features-list">
${product.applications.map(item => `          <li>${escapeHtml(item)}</li>`).join('\n')}
        </ul>` : '';

  const faqHtml = product.faq ? `
        <h2 style="margin-top: 25px; margin-bottom: 15px; font-size: 1.2rem; color: #fff;">Frequently Asked Questions (FAQ):</h2>
        <div class="faq-section" style="color: var(--text-muted); line-height: 1.6;">
${product.faq.map(item => `          <div class="faq-item" style="margin-bottom: 15px;"><strong style="color: #fff;">Q: ${escapeHtml(item.q)}</strong><br>A: ${escapeHtml(item.a)}</div>`).join('\n')}
        </div>` : '';

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: imageUrl,
    description: product.shortDesc,
    brand: {
      '@type': 'Brand',
      name: 'ElectroMartBD'
    },
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'BDT',
      price,
      availability: 'https://schema.org/InStock'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryPage.name,
        item: categoryPage.url
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: pageUrl
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metaTitle)}</title>
  <meta name="title" content="${escapeHtml(metaTitle)}">
  <meta name="description" content="${escapeHtml(metaDescription)}">${metaKeywords}
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${pageUrl}">

  <meta property="og:type" content="product">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${escapeHtml(metaTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta property="og:image" content="${imageUrl}">

  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${pageUrl}">
  <meta property="twitter:title" content="${escapeHtml(metaTitle)}">
  <meta property="twitter:description" content="${escapeHtml(metaDescription)}">
  <meta property="twitter:image" content="${imageUrl}">

  <script type="application/ld+json">
  ${JSON.stringify(productSchema, null, 2)}
  </script>
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>

  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
</head>

<body>

  <div id="site-nav"></div>

  <main class="container" id="main-content">
    <a href="index.html" class="back-link">← Back to Catalog</a>

    <article class="product-grid">
      <div class="product-image">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} price in Bangladesh">
      </div>

      <div class="product-details">
        <h1 class="product-title">${escapeHtml(product.name)}</h1>
        <div class="product-price">${escapeHtml(product.price)}</div>

        <div class="product-desc">
          ${descHtml}
        </div>

        <h2 style="margin-bottom: 15px; font-size: 1.2rem; color: #fff;">Key Features:</h2>
        <ul class="features-list">
${featuresHtml}
        </ul>
${specHtml}
${appHtml}
${whyBuyHtml}
${packageHtml}
${faqHtml}

        <div style="margin-top: 28px;">
          <button onclick="addToCart('${product.id}', '${escapedName}', '${product.price}', '${product.image}')" class="order-btn" style="width: 100%;">
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </article>
  </main>

  <footer>
    <p>© 2026 ElectroMartBD | Designed with precision for builders</p>
  </footer>

  <a class="whatsapp-float" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">💬</a>
  <script src="cart.js"></script>
  <script src="nav.js"></script>
</body>

</html>
`;
}

const allProducts = productsData.flatMap(category =>
  category.items.map(item => ({ ...item, categoryName: category.category }))
);

let generatedCount = 0;

for (const product of allProducts) {
  if (!product.seoSlug) continue;

  const fileName = `${product.seoSlug}.html`;
  const filePath = path.join(__dirname, fileName);
  fs.writeFileSync(filePath, renderProductPage(product), 'utf-8');
  console.log(`Generated ${fileName}`);
  generatedCount++;
}

console.log(`\nSuccess! Generated ${generatedCount} static SEO product pages.`);
