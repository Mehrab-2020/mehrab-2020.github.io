const fs = require('fs');
const path = require('path');

// Read products data
const { productsData } = require('./products.js');

// Read the product.html boilerplate
const templatePath = path.join(__dirname, 'product.html');
let htmlTemplate = '';
try {
  htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
} catch (e) {
  console.error("Error reading product.html. Make sure it exists in the same directory.");
  process.exit(1);
}

// Flat list of products
const allProducts = [];
productsData.forEach(category => {
  category.items.forEach(item => {
    allProducts.push({ ...item, categoryName: category.category });
  });
});

let generatedCount = 0;

allProducts.forEach(product => {
  if (!product.seoSlug) return; // skip if no slug

  const fileName = `${product.seoSlug}.html`;
  const filePath = path.join(__dirname, fileName);

  console.log(`Generating ${fileName}...`);

  const metaDescription = `Buy ${product.name} in Bangladesh at the best price (2026). Original product, fast delivery & trusted electronics shop. Order now from ElectroMart BD.`;
  const metaTitle = `Best ${product.name} Price in Bangladesh (2026) | Original – ElectroMart`;

  let outputHtml = htmlTemplate;

  // 1. Replace <title>
  outputHtml = outputHtml.replace(
    /<title>.*?<\/title>/gi,
    `<title>${metaTitle}</title>`
  );

  // 2. Replace meta tags
  const seoTags = `
  <meta name="title" content="${metaTitle}">
  <meta name="description" content="${metaDescription}">
  <meta property="og:title" content="${metaTitle}">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:image" content="https://www.electromartbd.bd${product.image.replace('./', '/')}">
  `;
  outputHtml = outputHtml.replace(
    /<\/title>/gi,
    `</title>\n${seoTags}`
  );

  // 3. Inject JSON-LD
  const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "${product.name}",
    "image": "https://www.electromartbd.bd${product.image.replace('./', '/')}",
    "description": "${product.shortDesc}",
    "brand": {
      "@type": "Brand",
      "name": "ElectroMartBD"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.electromartbd.bd/${fileName}",
      "priceCurrency": "BDT",
      "price": "${product.price.replace(/[^0-9]/g, '')}",
      "availability": "https://schema.org/InStock"
    }
  }
  </script>`;
  
  outputHtml = outputHtml.replace(
    /<\/head>/gi,
    `${schema}\n</head>`
  );

  // 4. Inject Static Fallback
  const staticFallback = `
  <noscript>
    <div style="display:none;">
      <h1>${product.name} Price in Bangladesh</h1>
      <p>${product.fullDesc}</p>
      <img src="${product.image}" alt="${product.name} price in Bangladesh" />
    </div>
  </noscript>
  `;
  outputHtml = outputHtml.replace(
    /<body.*?>/gi,
    `<body>\n${staticFallback}`
  );

  // 5. Override Javascript URL param reading for rawId
  outputHtml = outputHtml.replace(
    /const rawId\s*=\s*urlParams\.get\('id'\)\s*\|\|\s*"";/gi,
    `const rawId = "${product.id}";`
  );

  fs.writeFileSync(filePath, outputHtml, 'utf-8');
  generatedCount++;
});

console.log(`\n🎉 Success! Automatically generated ${generatedCount} SEO-optimized static product pages in the IMPROVED directory.`);
