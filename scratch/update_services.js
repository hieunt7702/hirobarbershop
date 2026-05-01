const fs = require('fs');
const path = require('path');

const files = ['vi.html', 'index.html', 'es.html', 'en.html', 'de.html'];

const services = [
    'Haircut & full beard trim',
    'Haircut & beard line up contours',
    'Classic beard trim'
];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Item 3
    content = content.replace(/(<!-- Item 3 -->[\s\S]*?<h4[^>]*>)([\s\S]*?)(<\/h4>)/, `$1\n                                        ${services[0]}$3`);
    // Item 4
    content = content.replace(/(<!-- Item 4 -->[\s\S]*?<h4[^>]*>)([\s\S]*?)(<\/h4>)/, `$1\n                                        ${services[1]}$3`);
    // Item 5
    content = content.replace(/(<!-- Item 5 -->[\s\S]*?<h4[^>]*>)([\s\S]*?)(<\/h4>)/, `$1\n                                        ${services[2]}$3`);

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Services updated successfully.");
