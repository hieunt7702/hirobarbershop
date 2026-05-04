const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Update <br> in h1 for all files
    content = content.replace(/<br class="hidden sm:block" \/>/g, '<br class="block lg:hidden" />');

    // 2. Remove dedicated service and update slogan
    if (file === 'vi.html') {
        content = content.replace(/Kiến tạo phong thái<\/span>\s*–\s*phục vụ tận tâm/g, 'Định hình phong cách</span>');
        content = content.replace(/Top 1 được\s*chọn\s*bởi Google/g, 'Top 1 đề xuất\n                            bởi Google');
    } else if (file === 'en.html') {
        content = content.replace(/Perfect fade<\/span>\s*–\s*dedicated service/g, 'Perfect fade</span>');
        content = content.replace(/Top 1 selected by\s*Google/g, 'Top 1 recommended by\n                            Google');
    } else if (file === 'de.html') {
        content = content.replace(/Perfekter Fade<\/span>\s*–\s*engagierter Service/g, 'Perfekter Fade</span>');
        content = content.replace(/Top 1 von Google\s*ausgewählt/g, 'Top 1 von Google\n                            empfohlen');
    } else if (file === 'es.html') {
        content = content.replace(/Fade perfecto<\/span>\s*–\s*servicio dedicado/g, 'Fade perfecto</span>');
        content = content.replace(/Top 1\s*seleccionado por Google/g, 'Top 1\n                            recomendado por Google');
    } else if (file === 'index.html') { // CZ
        content = content.replace(/Dokonalý fade<\/span>\s*–\s*oddaný servis/g, 'Dokonalý fade</span>');
        content = content.replace(/Top 1 vybraný\s*Googlem/g, 'Top 1\n                            doporučené Googlem');
    }

    // 3. Make product images smaller on tablet, PC
    // We can change `p-4 sm:p-8` to `p-4 sm:p-12 lg:p-16` inside the aspect-square div of products
    content = content.replace(/class="aspect-square relative overflow-hidden bg-white\/5 p-4 sm:p-8 flex items-center justify-center"/g, 'class="aspect-square relative overflow-hidden bg-white/5 p-4 sm:p-10 lg:p-14 flex items-center justify-center"');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});
