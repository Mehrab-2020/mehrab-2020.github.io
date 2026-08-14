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
