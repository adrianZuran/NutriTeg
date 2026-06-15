const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/warteg-orange-dark/g, 'nutriteg-green-darker');
      content = content.replace(/warteg-orange/g, 'nutriteg-green-dark');
      content = content.replace(/warteg-brown/g, 'nutriteg-green-dark');
      content = content.replace(/warteg-wood/g, 'nutriteg-green-light');
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir(path.join(__dirname, 'app'));
replaceInDir(path.join(__dirname, 'components'));
console.log('Replaced colors successfully');
