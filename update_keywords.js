const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newKeywords = "electronic components Bangladesh, electronics components online Bangladesh, buy electronic components online Bangladesh, electronic components shop Bangladesh, Arduino components Bangladesh, Arduino shop Bangladesh, robotics components Bangladesh, robotics parts Bangladesh, ESP32 Bangladesh, Arduino Uno Bangladesh, electronics shop Bangladesh, electronic parts Bangladesh, sensors Bangladesh, IoT components Bangladesh, electronics project components Bangladesh";

let updatedCount = 0;
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let modified = false;
  content = content.replace(/<meta name="keywords" content="([^"]*)">/g, (match, p1) => {
    if (p1.includes("electronic components Bangladesh")) return match; // Already updated
    modified = true;
    const separator = p1.trim().length > 0 && !p1.trim().endsWith(',') ? ', ' : '';
    return `<meta name="keywords" content="${p1}${separator}${newKeywords}">`;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    updatedCount++;
  }
});
console.log(`Updated keywords in ${updatedCount} HTML files.`);
