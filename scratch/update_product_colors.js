const fs = require('fs');
const path = require('path');

const files = ['vi.html', 'index.html', 'es.html', 'en.html', 'de.html'];

const servicesData = {
    'vi.html': [
        'Cắt tóc & Cạo râu toàn bộ (-15%)',
        'Cắt tóc & Cạo viền râu',
        'Cạo râu cổ điển'
    ],
    'index.html': [
        'Stříhání & úprava vousů (-15%)',
        'Stříhání a zarovnat kontury vousů',
        'Úprava vousů'
    ],
    'es.html': [
        'Corte de pelo y barba completo (-15%)',
        'Corte de pelo y contornos de barba',
        'Arreglo de barba clásico'
    ],
    'en.html': [
        'Haircut & full beard trim (-15%)',
        'Haircut & beard line up contours',
        'Classic beard trim'
    ],
    'de.html': [
        'Haarschnitt & komplette Bartpflege (-15%)',
        'Haarschnitt & Bartkonturen anpassen',
        'Klassische Bartpflege'
    ]
};

const rougTranslations = {
    'vi.html': { 
        blackName: 'Sáp Roug Đen', whiteName: 'Sáp Roug Trắng',
        blackDesc: 'Dành cho tóc mềm. Giữ nếp 8-12 tiếng. Giữ nếp cực tốt, không bóng, thấm hút dầu',
        whiteDesc: 'Dành cho tóc cứng. Giữ nếp 8-12 tiếng. Giữ nếp cực tốt, không bóng, thấm hút dầu',
        useLabel: 'Công dụng:'
    },
    'index.html': { 
        blackName: 'Roug Černý Matt Clay', whiteName: 'Roug Bílý Matt Clay',
        blackDesc: 'Pro jemné vlasy. Fixace 8-12 hodin. Silná fixace, matný vzhled, absorbuje mastnotu',
        whiteDesc: 'Pro tvrdé vlasy. Fixace 8-12 hodin. Silná fixace, matný vzhled, absorbuje mastnotu',
        useLabel: 'Účinek:'
    },
    'es.html': { 
        blackName: 'Roug Negro Matt Clay', whiteName: 'Roug Blanco Matt Clay',
        blackDesc: 'Para cabello suave. Fijación de 8-12 horas. Fuerte fijación, aspecto mate, absorbe la grasa',
        whiteDesc: 'Para cabello duro. Fijación de 8-12 horas. Fuerte fijación, aspecto mate, absorbe la grasa',
        useLabel: 'Efecto:'
    },
    'en.html': { 
        blackName: 'Roug Black Matt Clay', whiteName: 'Roug White Matt Clay',
        blackDesc: 'For soft hair. 8-12 hours hold. Strong hold, matte finish, absorbs oil',
        whiteDesc: 'For hard hair. 8-12 hours hold. Strong hold, matte finish, absorbs oil',
        useLabel: 'Effect:'
    },
    'de.html': { 
        blackName: 'Roug Schwarz Matt Clay', whiteName: 'Roug Weiß Matt Clay',
        blackDesc: 'Für weiches Haar. 8-12 Stunden Halt. Starker Halt, mattes Finish, absorbiert Öl',
        whiteDesc: 'Für hartes Haar. 8-12 Stunden Halt. Starker Halt, mattes Finish, absorbiert Öl',
        useLabel: 'Effekt:'
    }
};

const cinTranslations = {
    'vi.html': { 
        blackName: 'Sáp Cinplus Đen', whiteName: 'Sáp Cinplus Trắng',
        blackDesc: 'Dành cho tóc ngắn. Giữ nếp 8-12 tiếng. Giữ nếp linh hoạt, tạo kiểu tự nhiên',
        whiteDesc: 'Dành cho tóc dài. Giữ nếp 8-12 tiếng. Giữ nếp linh hoạt, tạo kiểu tự nhiên',
        useLabel: 'Công dụng:'
    },
    'index.html': { 
        blackName: 'Cinplus Vosk Černý', whiteName: 'Cinplus Vosk Bílý',
        blackDesc: 'Pro krátké vlasy. Fixace 8-12 hodin. Flexibilní fixace, přirozený styling',
        whiteDesc: 'Pro dlouhé vlasy. Fixace 8-12 hodin. Flexibilní fixace, přirozený styling',
        useLabel: 'Účinek:'
    },
    'es.html': { 
        blackName: 'Cera Cinplus Negro', whiteName: 'Cera Cinplus Blanco',
        blackDesc: 'Para cabello corto. Fijación de 8-12 horas. Fijación flexible, peinado natural',
        whiteDesc: 'Para cabello largo. Fijación de 8-12 horas. Fijación flexible, peinado natural',
        useLabel: 'Efecto:'
    },
    'en.html': { 
        blackName: 'Cinplus Wax Black', whiteName: 'Cinplus Wax White',
        blackDesc: 'For short hair. 8-12 hours hold. Flexible hold, natural styling',
        whiteDesc: 'For long hair. 8-12 hours hold. Flexible hold, natural styling',
        useLabel: 'Effect:'
    },
    'de.html': { 
        blackName: 'Cinplus Wax Schwarz', whiteName: 'Cinplus Wax Weiß',
        blackDesc: 'Für kurzes Haar. 8-12 Stunden Halt. Flexibler Halt, natürliches Styling',
        whiteDesc: 'Für langes Haar. 8-12 Stunden Halt. Flexibler Halt, natürliches Styling',
        useLabel: 'Effekt:'
    }
};

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Localize services 3, 4, 5
    const services = servicesData[file];
    if (services) {
        content = content.replace(/(<!-- Item 3 -->[\s\S]*?<h4[^>]*>)([\s\S]*?)(<\/h4>)/, `$1\n                                        ${services[0]}$3`);
        content = content.replace(/(<!-- Item 4 -->[\s\S]*?<h4[^>]*>)([\s\S]*?)(<\/h4>)/, `$1\n                                        ${services[1]}$3`);
        content = content.replace(/(<!-- Item 5 -->[\s\S]*?<h4[^>]*>)([\s\S]*?)(<\/h4>)/, `$1\n                                        ${services[2]}$3`);
    }

    // 2. Unify Roug and add color picker
    const rougT = rougTranslations[file];
    const rougHTML = `<!-- Product 1: Roug -->
                <article class="reveal group bg-surface-container border border-outline-variant/20 hover:border-primary/50 rounded-sm overflow-hidden transition-all duration-500 flex flex-col h-full">
                    <div class="aspect-square relative overflow-hidden bg-white/5 p-8 flex items-center justify-center">
                        <img src="assets/images/product1.webp" alt="Roug Matt Clay" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100">
                    </div>
                    <div class="p-6 relative z-10 border-t border-outline-variant/10 flex-1 flex flex-col">
                        <h3 class="font-headline-md text-xl text-on-background mb-1 group-hover:text-primary transition-colors">${rougT.blackName}</h3>
                        <div class="text-primary font-headline-md text-lg mb-3">450 CZK</div>
                        <div class="flex gap-3 mb-4">
                            <button type="button" class="color-btn w-6 h-6 rounded-full bg-[#1a1a1a] border-2 border-outline-variant ring-2 ring-primary ring-offset-2 ring-offset-surface-container transition-all"
                                data-name="${rougT.blackName}"
                                data-desc="${rougT.blackDesc}"
                                data-img="assets/images/product1.webp"
                                onclick="switchProduct(this)" aria-label="Black"></button>
                            <button type="button" class="color-btn w-6 h-6 rounded-full bg-[#f0f0f0] border-2 border-outline-variant ring-2 ring-transparent ring-offset-2 ring-offset-surface-container transition-all"
                                data-name="${rougT.whiteName}"
                                data-desc="${rougT.whiteDesc}"
                                data-img="assets/images/roug_white.jpg"
                                onclick="switchProduct(this)" aria-label="White"></button>
                        </div>
                        <div class="space-y-3 text-sm text-on-surface-variant flex-1">
                            <div><strong class="text-on-background font-label-caps uppercase text-[10px] tracking-widest block mb-1 opacity-70">${rougT.useLabel}</strong> <span class="product-desc-text">${rougT.blackDesc}</span></div>
                        </div>
                    </div>
                </article>`;

    // Replace the entire Product 1 and Product 1.2 blocks
    const rougRegex = /<!-- Product 1: Roug Black -->[\s\S]*?<!-- Product 2: Cinplus Black -->/i;
    content = content.replace(rougRegex, rougHTML + '\n\n                <!-- Product 2: Cinplus Black -->');

    // 3. Unify Cinplus and add color picker
    const cinT = cinTranslations[file];
    const cinHTML = `<!-- Product 2: Cinplus -->
                <article class="reveal reveal-delay-100 group bg-surface-container border border-outline-variant/20 hover:border-primary/50 rounded-sm overflow-hidden transition-all duration-500 flex flex-col h-full">
                    <div class="aspect-square relative overflow-hidden bg-white/5 p-8 flex items-center justify-center">
                        <img src="assets/images/product2.webp" alt="Cinplus Wax" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100">
                    </div>
                    <div class="p-6 relative z-10 border-t border-outline-variant/10 flex-1 flex flex-col">
                        <h3 class="font-headline-md text-xl text-on-background mb-1 group-hover:text-primary transition-colors">${cinT.blackName}</h3>
                        <div class="text-primary font-headline-md text-lg mb-3">450 CZK</div>
                        <div class="flex gap-3 mb-4">
                            <button type="button" class="color-btn w-6 h-6 rounded-full bg-[#1a1a1a] border-2 border-outline-variant ring-2 ring-primary ring-offset-2 ring-offset-surface-container transition-all"
                                data-name="${cinT.blackName}"
                                data-desc="${cinT.blackDesc}"
                                data-img="assets/images/product2.webp"
                                onclick="switchProduct(this)" aria-label="Black"></button>
                            <button type="button" class="color-btn w-6 h-6 rounded-full bg-[#f0f0f0] border-2 border-outline-variant ring-2 ring-transparent ring-offset-2 ring-offset-surface-container transition-all"
                                data-name="${cinT.whiteName}"
                                data-desc="${cinT.whiteDesc}"
                                data-img="assets/images/cinplus_white.png"
                                onclick="switchProduct(this)" aria-label="White"></button>
                        </div>
                        <div class="space-y-3 text-sm text-on-surface-variant flex-1">
                            <div><strong class="text-on-background font-label-caps uppercase text-[10px] tracking-widest block mb-1 opacity-70">${cinT.useLabel}</strong> <span class="product-desc-text">${cinT.blackDesc}</span></div>
                        </div>
                    </div>
                </article>`;

    const cinRegex = /<!-- Product 2: Cinplus Black -->[\s\S]*?<!-- Product 3: Reuzel Tonic -->/i;
    content = content.replace(cinRegex, cinHTML + '\n\n                <!-- Product 3: Reuzel Tonic -->');

    fs.writeFileSync(filePath, content, 'utf8');
});

// 4. Update assets/js/main.js to include switchProduct
const jsPath = path.join(__dirname, '..', 'assets/js/main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

if (!jsContent.includes('switchProduct')) {
    const jsAdd = `
// Product Color Switcher
function switchProduct(btn) {
    const card = btn.closest('article');
    if (!card) return;
    const img = card.querySelector('img');
    const title = card.querySelector('h3');
    const desc = card.querySelector('.product-desc-text');
    
    // Update active button state
    const buttons = card.querySelectorAll('.color-btn');
    buttons.forEach(b => {
        b.classList.remove('ring-primary');
        b.classList.add('ring-transparent');
    });
    btn.classList.remove('ring-transparent');
    btn.classList.add('ring-primary');

    // Data for products
    const name = btn.getAttribute('data-name');
    const descText = btn.getAttribute('data-desc');
    const imgSrc = btn.getAttribute('data-img');

    if (name && title) title.textContent = name;
    if (descText && desc) desc.textContent = descText;
    if (imgSrc && img) img.src = imgSrc;
}
`;
    fs.writeFileSync(jsPath, jsContent + jsAdd, 'utf8');
}

console.log("Product colors and services updated successfully.");
