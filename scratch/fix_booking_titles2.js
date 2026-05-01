const fs = require('fs');
const path = require('path');

const files = ['vi.html', 'index.html', 'es.html', 'en.html', 'de.html'];

const replacements = {
    'vi.html': 'ĐẶT LỊCH',
    'index.html': 'REZERVACE',
    'es.html': 'RESERVAS',
    'en.html': 'BOOKING',
    'de.html': 'BUCHUNG'
};

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the booking section:
    // <!-- Booking Form -->
    // <div class="flex-1 reveal reveal-left">
    //     <span class="font-label-caps text-primary tracking-[0.3em] uppercase block mb-4 text-sm">GIỮ
    //         CHỖ</span>
    
    const regex = /(<!-- Booking Form -->[\s\S]*?<span class="font-label-caps text-primary tracking-\[0\.3em\] uppercase block mb-4 text-sm">)([\s\S]*?)(<\/span>)/;
    
    if (regex.test(content)) {
        content = content.replace(regex, `$1${replacements[file]}$3`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
