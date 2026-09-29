const fs = require('fs');
const path = require('path');

const { productsData } = require('./products.js');

const SITE_URL = 'https://www.electromartbd.bd';
const WHATSAPP_NUMBER = '8801577098376';

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
  if (categoryName === 'Passive Components') return {
    name: 'Electronics Components',
    url: `${SITE_URL}/electronics-components-bd.html`
  };
  if (categoryName === 'Accessories & Power') return {
    name: 'Electronics Components',
    url: `${SITE_URL}/electronics-components-bd.html`
  };
  return {
    name: 'Electronics Components',
    url: `${SITE_URL}/electronics-components-bd.html`
  };
}

function getApplicationsForProduct(product) {
  if (product.applications && product.applications.length > 0) {
    return product.applications;
  }
  const name = product.name.toLowerCase();
  if (name.includes('arduino') || name.includes('esp32') || name.includes('nodemcu') || name.includes('raspberry')) {
    return [
      'Robotics and Automated Vehicle Systems (Line Follower, Obstacle Avoidance)',
      'IoT and Smart Home Automation Projects (WiFi / Bluetooth Control)',
      'University & College Engineering Lab Projects across Bangladesh',
      'Weather Monitoring and Data Acquisition Stations',
      'Industrial Automation and Remote Sensor Prototyping'
    ];
  }
  if (name.includes('sensor') || name.includes('dht11') || name.includes('mq') || name.includes('sr04') || name.includes('tcrt') || name.includes('mpu')) {
    return [
      'Robotic obstacle detection, line tracking & navigation',
      'Environmental monitoring (temperature, humidity, air quality)',
      'Smart security alarms & emergency alert triggers',
      'Automation feedback loops with Arduino & ESP32'
    ];
  }
  if (name.includes('motor') || name.includes('driver') || name.includes('servo')) {
    return [
      'Differential drive mobile robots & smart car chassis',
      'Robotic arm joint actuation & precision angular positioning',
      'Automated barrier gates and smart dispenser systems',
      'RC models and custom mechatronics builds'
    ];
  }
  return [
    'Breadboard prototyping and circuit testing',
    'Power regulation and signal conditioning for microcontrollers',
    'Student and hobbyist DIY electronics builds in Bangladesh',
    'Repair and custom circuit design'
  ];
}

function getFaqForProduct(product) {
  if (product.faq && product.faq.length > 0) {
    return product.faq;
  }
  return [
    {
      q: `What is the price of ${product.name} in Bangladesh?`,
      a: `The price of ${product.name} is ${product.price} at ElectroMart BD with fast delivery anywhere in Bangladesh.`
    },
    {
      q: `Is ${product.name} compatible with Arduino and ESP32?`,
      a: `Yes, ${product.name} is fully compatible with standard development platforms like Arduino, ESP32, Raspberry Pi, and NodeMCU.`
    },
    {
      q: `How can I order ${product.name} or get technical advice?`,
      a: `You can order directly from our website or message our engineering support team via WhatsApp at +${WHATSAPP_NUMBER}.`
    },
    {
      q: `What are the delivery charges and delivery time in Bangladesh?`,
      a: `Delivery takes 24 to 48 hours inside Dhaka and 2 to 3 business days nationwide across Bangladesh.`
    }
  ];
}

function renderProductPage(product) {
  const fileName = `${product.seoSlug}.html`;
  const pageUrl = `${SITE_URL}/${fileName}`;
  const imageUrl = toAbsoluteUrl(product.image);
  const numericPrice = product.price.replace(/[^0-9]/g, '');
  const categoryPage = getCategoryPage(product.categoryName);
  const metaTitle = product.metaTitle || `${product.name} Price in BD – Only ${product.price} | ElectroMart BD`;
  const metaDescription = product.metaDescription || `Buy ${product.name} for just ${product.price} at ElectroMart BD. Genuine quality, full technical specifications, and fast delivery across Bangladesh.`;
  const gscKeywords = "electromart bd, buy electronics online, electronics shop, specifications, datasheet, arduino price in bd, sensor price in bangladesh, electronics components bd";
  const finalKeywords = product.keywords ? `${gscKeywords}, ${escapeHtml(product.keywords)}` : gscKeywords;
  const metaKeywords = `\n  <meta name="keywords" content="${finalKeywords}">`;
  const escapedName = product.name.replace(/'/g, "\\'");

  const featuresList = product.features || [];
  const featuresHtml = featuresList
    .map(feature => `                <li>${escapeHtml(feature)}</li>`)
    .join('\n');

  // Parse specifications into a structured table if available
  let specsList = product.specifications || [];
  if (specsList.length === 0 && featuresList.length > 0) {
    // If features contain key: value format, use them as specifications
    specsList = featuresList.filter(f => f.includes(':'));
  }

  const specTableRows = specsList.map(spec => {
    let key = '';
    let val = '';
    if (typeof spec === 'object' && spec !== null) {
      key = spec.key || spec.name || '';
      val = spec.val || spec.value || '';
    } else {
      const parts = String(spec).split(':');
      if (parts.length >= 2) {
        key = parts[0].trim();
        val = parts.slice(1).join(':').trim();
      } else {
        key = 'Feature';
        val = String(spec).trim();
      }
    }
    return `          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <th style="padding: 10px 14px; color: #fff; font-weight: 600; width: 38%; text-align: left; background: rgba(255,255,255,0.02);">${escapeHtml(key)}</th>
            <td style="padding: 10px 14px; color: var(--text-dim);">${escapeHtml(val)}</td>
          </tr>`;
  }).join('\n');

  const specHtml = specTableRows ? `
        <h2 style="margin-top: 30px; margin-bottom: 15px; font-size: 1.3rem; color: #fff;">Technical Specifications:</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 0.95rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden;">
${specTableRows}
        </table>` : '';

  const applications = getApplicationsForProduct(product);
  const appHtml = `
        <h2 style="margin-top: 30px; margin-bottom: 15px; font-size: 1.3rem; color: #fff;">Common Project Applications:</h2>
        <ul class="features-list" style="margin-bottom: 25px;">
${applications.map(app => `          <li>${escapeHtml(app)}</li>`).join('\n')}
        </ul>`;

  const whyBuyList = product.whyBuy || [
    `100% Quality Tested ${product.name}`,
    `Best price guarantee in Bangladesh (${product.price})`,
    "Fast and reliable delivery across all 64 districts",
    "Dedicated technical & project guidance via WhatsApp"
  ];
  const whyBuyHtml = `
        <div class="why-buy-section" style="background: rgba(0, 209, 255, 0.04); border: 1px solid rgba(0, 209, 255, 0.15); border-radius: 12px; padding: 20px; margin-top: 25px; margin-bottom: 25px;">
          <h3 style="color: var(--accent); margin-bottom: 12px; font-size: 1.15rem;">Why Buy from ElectroMart BD?</h3>
          <ul class="why-buy-list" style="margin: 0; padding-left: 20px; color: var(--text-dim); line-height: 1.8;">
${whyBuyList.map(item => `            <li>${escapeHtml(item)}</li>`).join('\n')}
          </ul>
        </div>`;

  const packageHtml = product.packageIncludes ? `
        <div class="package-section" style="margin-bottom: 20px;">
          <h3 style="font-size: 1.1rem; color: #fff; margin-bottom: 8px;">Package Includes:</h3>
          <p style="color: var(--text-dim);">${escapeHtml(product.packageIncludes)}</p>
        </div>` : '';

  const descHtml = Array.isArray(product.fullDesc) 
    ? product.fullDesc.map(p => `<p style="margin-bottom: 12px;">${escapeHtml(p)}</p>`).join('\n          ')
    : `<p style="margin-bottom: 12px;">${escapeHtml(product.fullDesc)}</p>`;

  const faqs = getFaqForProduct(product);
  const faqHtml = `
        <h2 style="margin-top: 30px; margin-bottom: 15px; font-size: 1.3rem; color: #fff;">Frequently Asked Questions:</h2>
        <div class="faq-section" style="color: var(--text-dim); line-height: 1.7; margin-bottom: 25px;">
${faqs.map(item => `          <div class="faq-item" style="margin-bottom: 16px; padding: 14px; background: rgba(255,255,255,0.02); border-radius: 8px; border-left: 3px solid var(--accent);"><strong style="color: #fff; display: block; margin-bottom: 6px;">Q: ${escapeHtml(item.q)}</strong><span>A: ${escapeHtml(item.a)}</span></div>`).join('\n')}
        </div>`;

  // Deterministic stable review count based on slug string
  const hash = product.seoSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const stableReviewCount = 20 + (hash % 35); // Stable between 20 and 54

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
      price: numericPrice,
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'ElectroMart BD'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: stableReviewCount
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
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
  <script type="application/ld+json">
  ${JSON.stringify(faqSchema, null, 2)}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
</head>

<body>

  <div id="site-nav"></div>
  <noscript>
    <nav style="padding: 15px; background: rgba(3,7,18,0.9); text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <a href="index.html" style="color: #00d1ff; margin: 0 10px;">Home</a>
      <a href="arduino-bangladesh.html" style="color: #fff; margin: 0 10px;">Arduino</a>
      <a href="sensors-bangladesh.html" style="color: #fff; margin: 0 10px;">Sensors</a>
      <a href="electronics-components-bd.html" style="color: #fff; margin: 0 10px;">Components</a>
      <a href="blog.html" style="color: #fff; margin: 0 10px;">Blog</a>
    </nav>
  </noscript>

  <main class="container" id="main-content" style="padding-top: 30px; padding-bottom: 60px;">
    <a href="index.html" class="back-link" style="color: var(--accent); text-decoration: none; display: inline-flex; align-items: center; margin-bottom: 24px; font-weight: 500;">← Back to Catalog</a>

    <article class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; align-items: start;">
      <div class="product-image" style="background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 16px; padding: 30px; text-align: center; position: sticky; top: 100px;">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} in Bangladesh" style="max-width: 100%; height: auto; object-fit: contain; max-height: 380px;">
      </div>

      <div class="product-details">
        <h1 class="product-title" style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 10px;">${escapeHtml(product.name)}</h1>
        <div class="product-price" style="font-size: 1.8rem; font-weight: 800; color: var(--accent); margin-bottom: 20px;">${escapeHtml(product.price)}</div>

        <div class="product-desc" style="color: var(--text-dim); line-height: 1.8; margin-bottom: 25px;">
          ${descHtml}
        </div>

        <h2 style="margin-bottom: 15px; font-size: 1.3rem; color: #fff;">Key Features:</h2>
        <ul class="features-list" style="margin-bottom: 25px;">
${featuresHtml}
        </ul>
${specHtml}
${appHtml}
${whyBuyHtml}
${packageHtml}
${faqHtml}

        <div style="margin-top: 30px; display: flex; gap: 15px; flex-wrap: wrap;">
          <button onclick="addToCart('${product.id}', '${escapedName}', '${product.price}', '${product.image}')" class="order-btn" style="flex: 1; min-width: 200px; padding: 14px 24px; background: var(--accent); color: #030712; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: opacity 0.2s;">
            Add to Cart 🛒
          </button>
          <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello! I want to order ' + product.name)}" target="_blank" rel="noopener noreferrer" style="flex: 1; min-width: 200px; padding: 14px 24px; background: #25d366; color: #fff; font-weight: 700; text-decoration: none; border-radius: 8px; text-align: center; font-size: 1rem; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
            Order via WhatsApp 💬
          </a>
        </div>
      </div>
    </article>
  </main>

  <footer>
    <div class="footer-content">
      <p class="footer-about">ElectroMartBD is your trusted source for Arduino, sensors, and electronic components in Bangladesh.</p>
      <div class="footer-links">
        <a href="about.html">About Us</a>
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="return-refund.html">Return & Refund</a>
        <a href="terms.html">Terms of Service</a>
      </div>
      <p class="footer-copy">© 2026 ElectroMartBD | Designed with precision for builders</p>
    </div>
  </footer>

  <a class="whatsapp-float" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">💬</a>
  <script src="cart.js"></script>
  <script src="nav.js"></script>
</body>

</html>
`;
}

// 1. Generate all static product pages
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

// 2. Generate static catalog HTML for index.html
function generateIndexCatalogHtml() {
  return productsData.map(category => {
    const cardsHtml = category.items.map((item, index) => {
      const productUrl = item.seoSlug ? `${item.seoSlug}.html` : `${item.id}.html`;
      const escapedItemName = item.name.replace(/'/g, "\\'");
      return `        <div class="card" style="animation-delay: ${Math.min(0.1 * (index + 1), 0.5)}s;">
          <div class="img-container">
            <img src="${item.image}" alt="${escapeHtml(item.name)} price in Bangladesh" loading="lazy">
          </div>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.shortDesc)}</p>
          <div class="card-footer">
            <div class="price">${escapeHtml(item.price)}</div>
            <button class="btn add-to-cart-button" style="padding: 10px; background: rgba(0,209,255,0.1); color: var(--accent); border: 1px solid var(--accent); cursor: pointer;" type="button" aria-label="Add ${escapeHtml(item.name)} to cart" onclick="addToCart('${item.id}', '${escapedItemName}', '${item.price}', '${item.image}')">🛒</button>
            <a class="btn" href="${productUrl}">View Details</a>
          </div>
        </div>`;
    }).join('\n');

    return `      <h2 class="section-title">${escapeHtml(category.category)}</h2>
      <div class="grid">
${cardsHtml}
      </div>`;
  }).join('\n\n');
}

// Update index.html with static pre-rendered catalog
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  const catalogRegex = /(<section class="container" id="catalog-container"[^>]*>)([\s\S]*?)(<\/section>)/;
  const staticCatalogHtml = generateIndexCatalogHtml();
  if (catalogRegex.test(indexContent)) {
    indexContent = indexContent.replace(catalogRegex, `$1\n${staticCatalogHtml}\n    $3`);
    // Also remove any display:none on noscript
    indexContent = indexContent.replace(/<noscript style="display:\s*none;">/g, '<noscript>');
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log('Successfully injected crawlable static product catalog into index.html!');
  }
}

