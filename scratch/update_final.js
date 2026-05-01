const fs = require('fs');
const path = require('path');

const files = ['vi.html', 'index.html', 'es.html', 'en.html', 'de.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. SuperHairo Voucher -> Hiro barbershop voucher
    content = content.replace(/SuperHairo Voucher/gi, 'Hiro barbershop voucher');

    // 2. Lược giá 100
    // Styling Comb price to 100
    // Currently it's 150 CZK
    if (file === 'vi.html') {
        content = content.replace(/(<h3[^>]*>Lược tạo kiểu<\/h3>\s*<div[^>]*>)150 CZK(<\/div>)/, '$1100 CZK$2');
    } else if (file === 'index.html') {
        content = content.replace(/(<h3[^>]*>Stylingový Hřeben<\/h3>\s*<div[^>]*>)150 CZK(<\/div>)/, '$1100 CZK$2');
    } else if (file === 'en.html' || file === 'de.html') {
        content = content.replace(/(<h3[^>]*>Styling Comb<\/h3>\s*<div[^>]*>)150 CZK(<\/div>)/, '$1100 CZK$2');
    } else if (file === 'es.html') {
        content = content.replace(/(<h3[^>]*>Peine de peinado<\/h3>\s*<div[^>]*>)150 CZK(<\/div>)/i, '$1100 CZK$2');
    }

    // Replace all generic 150 CZK to 100 CZK in product 5 just in case
    content = content.replace(/(product5\.webp"[\s\S]*?)150 CZK/g, '$1100 CZK');

    // 3. Nishman powder price to 220
    content = content.replace(/(product4\.webp"[\s\S]*?)200 CZK/g, '$1220 CZK');

    // 4. Split Roug and Cinplus into 2 types each
    // For Roug:
    // Regex to match the Roug product article block
    const rougRegex = /<!-- Product 1:.*?-->\s*<article[\s\S]*?product1\.webp[\s\S]*?<\/article>/i;
    const rougMatch = content.match(rougRegex);
    if (rougMatch) {
        let rougStr = rougMatch[0];
        let rougBlack = rougStr;
        let rougWhite = rougStr;
        
        // Modify Roug Black
        rougBlack = rougBlack.replace(/Product 1:.*?-->/i, 'Product 1: Roug Black -->');
        rougBlack = rougBlack.replace(/Sáp Roug Đen\/Trắng|Roug Černý\/Bílý Matt Clay|Roug Black\/White Matt Clay|Roug Schwarz\/Weiß Matt Clay|Roug Negro\/Blanco Matt Clay/i, 
            file === 'vi.html' ? 'Sáp Roug Đen' :
            file === 'index.html' ? 'Roug Černý Matt Clay' :
            file === 'es.html' ? 'Roug Negro Matt Clay' :
            file === 'de.html' ? 'Roug Schwarz Matt Clay' : 'Roug Black Matt Clay');
            
        // Modify Roug White
        rougWhite = rougWhite.replace(/Product 1:.*?-->/i, 'Product 1.2: Roug White -->');
        rougWhite = rougWhite.replace(/Sáp Roug Đen\/Trắng|Roug Černý\/Bílý Matt Clay|Roug Black\/White Matt Clay|Roug Schwarz\/Weiß Matt Clay|Roug Negro\/Blanco Matt Clay|Roug Černý Matt Clay|Roug Negro Matt Clay|Roug Schwarz Matt Clay|Roug Black Matt Clay/i, 
            file === 'vi.html' ? 'Sáp Roug Trắng' :
            file === 'index.html' ? 'Roug Bílý Matt Clay' :
            file === 'es.html' ? 'Roug Blanco Matt Clay' :
            file === 'de.html' ? 'Roug Weiß Matt Clay' : 'Roug White Matt Clay');
            
        // Append descriptions
        const rougBlackDesc = file === 'vi.html' ? 'Dành cho tóc mềm. Giữ nếp 8-12 tiếng.' :
            file === 'index.html' ? 'Pro jemné vlasy. Fixace 8-12 hodin.' :
            file === 'es.html' ? 'Para cabello suave. Fijación de 8-12 horas.' :
            file === 'de.html' ? 'Für weiches Haar. 8-12 Stunden Halt.' : 'For soft hair. 8-12 hours hold.';
            
        const rougWhiteDesc = file === 'vi.html' ? 'Dành cho tóc cứng. Giữ nếp 8-12 tiếng.' :
            file === 'index.html' ? 'Pro tvrdé vlasy. Fixace 8-12 hodin.' :
            file === 'es.html' ? 'Para cabello duro. Fijación de 8-12 horas.' :
            file === 'de.html' ? 'Für hartes Haar. 8-12 Stunden Halt.' : 'For hard hair. 8-12 hours hold.';
            
        rougBlack = rougBlack.replace(/(<strong[^>]*>.*?<\/strong>)(.*?)(<\/div>)/i, `$1 $2 | ${rougBlackDesc}$3`);
        rougWhite = rougWhite.replace(/(<strong[^>]*>.*?<\/strong>)(.*?)(<\/div>)/i, `$1 $2 | ${rougWhiteDesc}$3`);
        
        content = content.replace(rougRegex, rougBlack + '\n\n' + rougWhite);
    }
    
    // For Cinplus:
    const cinRegex = /<!-- Product 2:.*?-->\s*<article[\s\S]*?product2\.webp[\s\S]*?<\/article>/i;
    const cinMatch = content.match(cinRegex);
    if (cinMatch) {
        let cinStr = cinMatch[0];
        let cinBlack = cinStr;
        let cinWhite = cinStr;
        
        // Modify Cinplus Black
        cinBlack = cinBlack.replace(/Product 2:.*?-->/i, 'Product 2: Cinplus Black -->');
        cinBlack = cinBlack.replace(/Sáp Cinplus Đen\/Trắng|Cinplus Vosk Černý\/Bílý|Cinplus Wax Black\/White|Cinplus Wax Schwarz\/Weiß|Cera Cinplus Negro\/Blanco/i, 
            file === 'vi.html' ? 'Sáp Cinplus Đen' :
            file === 'index.html' ? 'Cinplus Vosk Černý' :
            file === 'es.html' ? 'Cera Cinplus Negro' :
            file === 'de.html' ? 'Cinplus Wax Schwarz' : 'Cinplus Wax Black');
            
        // Modify Cinplus White
        cinWhite = cinWhite.replace(/Product 2:.*?-->/i, 'Product 2.2: Cinplus White -->');
        cinWhite = cinWhite.replace(/Sáp Cinplus Đen\/Trắng|Cinplus Vosk Černý\/Bílý|Cinplus Wax Black\/White|Cinplus Wax Schwarz\/Weiß|Cera Cinplus Negro\/Blanco|Cinplus Vosk Černý|Cera Cinplus Negro|Cinplus Wax Schwarz|Cinplus Wax Black/i, 
            file === 'vi.html' ? 'Sáp Cinplus Trắng' :
            file === 'index.html' ? 'Cinplus Vosk Bílý' :
            file === 'es.html' ? 'Cera Cinplus Blanco' :
            file === 'de.html' ? 'Cinplus Wax Weiß' : 'Cinplus Wax White');
            
        // Append descriptions
        const cinBlackDesc = file === 'vi.html' ? 'Dành cho tóc ngắn. Giữ nếp 8-12 tiếng.' :
            file === 'index.html' ? 'Pro krátké vlasy. Fixace 8-12 hodin.' :
            file === 'es.html' ? 'Para cabello corto. Fijación de 8-12 horas.' :
            file === 'de.html' ? 'Für kurzes Haar. 8-12 Stunden Halt.' : 'For short hair. 8-12 hours hold.';
            
        const cinWhiteDesc = file === 'vi.html' ? 'Dành cho tóc dài. Giữ nếp 8-12 tiếng.' :
            file === 'index.html' ? 'Pro dlouhé vlasy. Fixace 8-12 hodin.' :
            file === 'es.html' ? 'Para cabello largo. Fijación de 8-12 horas.' :
            file === 'de.html' ? 'Für langes Haar. 8-12 Stunden Halt.' : 'For long hair. 8-12 hours hold.';
            
        cinBlack = cinBlack.replace(/(<strong[^>]*>.*?<\/strong>)(.*?)(<\/div>)/i, `$1 $2 | ${cinBlackDesc}$3`);
        cinWhite = cinWhite.replace(/(<strong[^>]*>.*?<\/strong>)(.*?)(<\/div>)/i, `$1 $2 | ${cinWhiteDesc}$3`);
        
        content = content.replace(cinRegex, cinBlack + '\n\n' + cinWhite);
    }
    
    // 5. Update team grayscale images (remove grayscale classes)
    content = content.replace(/grayscale hover:grayscale-0/g, 'hover:scale-105');
    content = content.replace(/grayscale transition-all duration-1000 group-hover:grayscale-0/g, 'transition-all duration-1000');

    // 6. Update Services 3, 4, 5 to exactly Haircut & full beard trim, Haircut & beard line up contours, Classic beard trim
    // Service 3: "Cắt tóc & Cạo râu toàn bộ (-15%)" or equivalents
    // Service 4: "Cắt tóc & Cạo viền râu"
    // Service 5: "Cạo râu cổ điển"
    const services = [
        'Haircut & full beard trim',
        'Haircut & beard line up contours',
        'Classic beard trim'
    ];
    
    // We can replace the contents of h4 in Item 3, 4, 5
    // Item 3
    content = content.replace(/(<!-- Item 3 -->[\s\S]*?<h4[^>]*>)(.*?)(<\/h4>)/, `$1${services[0]}$3`);
    // Item 4
    content = content.replace(/(<!-- Item 4 -->[\s\S]*?<h4[^>]*>)(.*?)(<\/h4>)/, `$1${services[1]}$3`);
    // Item 5
    content = content.replace(/(<!-- Item 5 -->[\s\S]*?<h4[^>]*>)(.*?)(<\/h4>)/, `$1${services[2]}$3`);

    // 7. Ensure Lightbox HTML exists in all files
    if (!content.includes('id="lightbox"')) {
        const lightboxHTML = `
    <!-- Lightbox Modal -->
    <div id="lightbox"
        class="fixed inset-0 z-[110] bg-black/95 hidden flex-col items-center justify-center opacity-0 transition-opacity duration-300">
        <button onclick="closeLightbox()"
            class="absolute top-6 right-6 text-white hover:text-primary transition-colors p-2 z-[111]">
            <span class="material-symbols-outlined text-4xl">close</span>
        </button>
        <button onclick="prevImage(event)"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors p-4 z-[111]">
            <span class="material-symbols-outlined text-5xl">chevron_left</span>
        </button>
        <button onclick="nextImage(event)"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors p-4 z-[111]">
            <span class="material-symbols-outlined text-5xl">chevron_right</span>
        </button>

        <div class="relative w-full h-[80vh] px-4 flex items-center justify-center" onclick="closeLightbox()">
            <img id="lightbox-img" src="" class="max-w-full max-h-full object-contain shadow-2xl" alt="Portfolio Image"
                onclick="event.stopPropagation()">
            <video id="lightbox-video" src="" class="max-w-full max-h-full object-contain shadow-2xl hidden" controls
                autoplay onclick="event.stopPropagation()"></video>
        </div>
        <div
            class="absolute bottom-8 left-0 right-0 text-center text-white font-label-caps tracking-widest text-sm pointer-events-none">
            <span id="lightbox-counter">1 / 12</span>
        </div>
    </div>
`;
        content = content.replace('</body>', `${lightboxHTML}\n</body>`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Updates applied to all files!");
