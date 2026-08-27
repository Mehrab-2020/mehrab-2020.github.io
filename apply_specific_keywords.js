const fs = require('fs');
const path = require('path');

// Extract products data from products.js
const productsJsContent = fs.readFileSync(path.join(__dirname, 'products.js'), 'utf-8');
// Evaluate productsData
let productsData;
// This safely evaluates the array assignment
eval(productsJsContent.replace('const productsData =', 'productsData ='));

const baseKeywords = "ElectroMartBD, electronic components Bangladesh, buy electronics online BD";

let updatedCount = 0;
productsData.forEach(category => {
  category.items.forEach(item => {
    if (item.seoSlug) {
      const htmlFile = path.join(__dirname, item.seoSlug + '.html');
      if (fs.existsSync(htmlFile)) {
        let htmlContent = fs.readFileSync(htmlFile, 'utf-8');
        
        // Use specific keywords from the product if available, else just base
        const specificKeywords = item.keywords ? item.keywords.trim() : item.name;
        const newKeywords = `${specificKeywords}, ${baseKeywords}`;
        
        // replace meta keywords
        let modified = false;
        htmlContent = htmlContent.replace(/<meta name="keywords" content="([^"]*)">/g, (match, p1) => {
          modified = true;
          return `<meta name="keywords" content="${newKeywords}">`;
        });
        
        // Inject an h2 right after h1 if it doesn't exist
        if (htmlContent.includes('<h1 class="product-title">')) {
          const h1Regex = /(<h1 class="product-title">.*?<\/h1>)/s;
          if (!htmlContent.includes('class="seo-subtitle"')) {
            htmlContent = htmlContent.replace(h1Regex, `$1\n        <h2 class="seo-subtitle" style="font-size: 1rem; color: #aaa; margin-top: 5px; margin-bottom: 15px;">Search tags: ${specificKeywords}</h2>`);
            modified = true;
          }
        }
        
        if (modified) {
          fs.writeFileSync(htmlFile, htmlContent, 'utf-8');
          updatedCount++;
          console.log(`Updated ${item.seoSlug}.html`);
        }
      }
    }
  });
});
console.log(`Updated specific keywords in ${updatedCount} product HTML files.`);
