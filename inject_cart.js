const fs = require('fs');

const files = fs.readdirSync('./').filter(f => f.endsWith('.html'));
let count = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    if (!content.includes('src="cart.js"')) {
        content = content.replace('</body>', '  <script src="cart.js"></script>\n</body>');
        fs.writeFileSync(file, content, 'utf-8');
        count++;
    }
}
console.log(`Injected cart.js into ${count} files.`);
