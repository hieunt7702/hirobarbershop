const fs = require('fs');
const path = require('path');

const files = ['index.html', 'vi.html', 'en.html', 'de.html', 'es.html'];
const dir = path.resolve(__dirname, '..');

// Product modal HTML to insert before </body>
const productModalHTML = `
    <!-- Product Detail Modal (Mobile) -->
    <div id="product-modal" class="fixed inset-0 z-[120] bg-black/90 hidden flex-col items-center justify-center opacity-0 transition-opacity duration-300 p-4">
        <button onclick="closeProductModal()" class="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors p-2 z-[121]">
            <span class="material-symbols-outlined text-4xl">close</span>
        </button>
        <div class="relative w-full max-w-sm bg-surface-container rounded-xl overflow-hidden shadow-2xl" onclick="event.stopPropagation()">
            <img id="pm-img" src="" class="w-full aspect-square object-contain bg-white/5 p-8" alt="">
            <div class="p-6 border-t border-outline-variant/20">
                <h3 id="pm-title" class="font-headline-md text-xl text-on-background mb-1"></h3>
                <div id="pm-price" class="text-primary font-headline-md text-lg mb-3"></div>
                <div id="pm-colors" class="flex gap-3 mb-4"></div>
                <div class="text-sm text-on-surface-variant">
                    <strong class="text-on-background font-label-caps uppercase text-[10px] tracking-widest block mb-1 opacity-70">Popis:</strong>
                    <span id="pm-desc"></span>
                </div>
                <a href="https://hirobarbershop.setmore.com/" target="_blank"
                    class="mt-6 block w-full text-center bg-primary text-on-primary py-3 font-label-caps tracking-widest font-bold hover:bg-primary-fixed transition-colors rounded-sm text-sm">
                    REZERVACE HNED
                </a>
            </div>
        </div>
    </div>
`;

function fixProducts(html) {
    // 1. Fix product grid: grid-cols-1 sm:grid-cols-2 -> grid-cols-2 sm:grid-cols-2, gap-8 -> gap-3 sm:gap-8
    html = html.replace(
        /class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"/g,
        'class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8"'
    );

    // 2. Fix each product article:
    // a) Add onclick and cursor-pointer on mobile
    html = html.replace(
        /(<article class="reveal[^"]*group bg-surface-container border border-outline-variant\/20 hover:border-primary\/50 rounded-sm overflow-hidden transition-all duration-500 flex flex-col h-full)">/g,
        '$1 sm:cursor-default cursor-pointer" onclick="openProductModal(this)">'
    );

    // b) Smaller padding on mobile for image div
    html = html.replace(
        /class="aspect-square relative overflow-hidden bg-white\/5 p-8 flex items-center justify-center"/g,
        'class="aspect-square relative overflow-hidden bg-white/5 p-4 sm:p-8 flex items-center justify-center"'
    );

    // c) Smaller padding and text for info div
    html = html.replace(
        /class="p-6 relative z-10 border-t border-outline-variant\/10 flex-1 flex flex-col"/g,
        'class="p-3 sm:p-6 relative z-10 border-t border-outline-variant/10 flex-1 flex flex-col"'
    );

    // d) Smaller h3 text on mobile + line-clamp
    html = html.replace(
        /class="font-headline-md text-xl text-on-background mb-1 group-hover:text-primary transition-colors"/g,
        'class="font-headline-md text-sm sm:text-xl text-on-background mb-1 group-hover:text-primary transition-colors line-clamp-2"'
    );

    // e) Add product-price class, smaller text on mobile
    html = html.replace(
        /class="text-primary font-headline-md text-lg mb-3"/g,
        'class="product-price text-primary font-headline-md text-sm sm:text-lg mb-2 sm:mb-3"'
    );
    html = html.replace(
        /class="text-primary font-headline-md text-lg mb-5"/g,
        'class="product-price text-primary font-headline-md text-sm sm:text-lg mb-2 sm:mb-5"'
    );

    // f) Hide color buttons on mobile
    html = html.replace(
        /class="flex gap-3 mb-4"/g,
        'class="hidden sm:flex gap-3 mb-4"'
    );

    // g) Hide description on mobile
    html = html.replace(
        /class="space-y-3 text-sm text-on-surface-variant flex-1"/g,
        'class="hidden sm:block space-y-3 text-sm text-on-surface-variant flex-1"'
    );

    // h) Prevent color buttons from triggering modal
    html = html.replace(
        /onclick="switchProduct\(this\)"/g,
        'onclick="event.stopPropagation(); switchProduct(this)"'
    );

    return html;
}

function fixGallery(html) {
    // Change grid from 12-col to 2-col on mobile
    html = html.replace(
        /class="grid grid-cols-12 auto-rows-\[150px\] md:auto-rows-\[180px\] lg:auto-rows-\[220px\] gap-3 lg:gap-4"/g,
        'class="grid grid-cols-2 sm:grid-cols-12 auto-rows-[150px] md:auto-rows-[180px] lg:auto-rows-[220px] gap-3 lg:gap-4"'
    );

    // First figure (full width on mobile): col-span-12 md:col-span-8 -> col-span-2 sm:col-span-12 md:col-span-8
    html = html.replace(
        /class="reveal reveal-scale col-span-12 md:col-span-8 lg:col-span-8 row-span-2/g,
        'class="reveal reveal-scale col-span-2 sm:col-span-12 md:col-span-8 lg:col-span-8 row-span-2'
    );

    // Other figures: col-span-6 -> col-span-1 sm:col-span-6 (for half-width items)
    html = html.replace(
        /class="reveal reveal-scale reveal-delay-100 col-span-6 md:col-span-4 lg:col-span-4 row-span-1/g,
        'class="reveal reveal-scale reveal-delay-100 col-span-1 sm:col-span-6 md:col-span-4 lg:col-span-4 row-span-1'
    );
    html = html.replace(
        /class="reveal reveal-scale reveal-delay-200 col-span-6 md:col-span-4 lg:col-span-4 row-span-1/g,
        'class="reveal reveal-scale reveal-delay-200 col-span-1 sm:col-span-6 md:col-span-4 lg:col-span-4 row-span-1'
    );
    html = html.replace(
        /class="reveal reveal-scale reveal-delay-300 col-span-6 md:col-span-4 lg:col-span-4 row-span-1/g,
        'class="reveal reveal-scale reveal-delay-300 col-span-1 sm:col-span-6 md:col-span-4 lg:col-span-4 row-span-1'
    );
    html = html.replace(
        /class="reveal reveal-scale col-span-6 md:col-span-4 lg:col-span-4 row-span-1/g,
        'class="reveal reveal-scale col-span-1 sm:col-span-6 md:col-span-4 lg:col-span-4 row-span-1'
    );

    // Full-width items on mobile (col-span-12): col-span-12 md:col-span-4 -> col-span-1 sm:col-span-12 md:col-span-4
    html = html.replace(
        /class="reveal reveal-scale reveal-delay-300 col-span-12 md:col-span-4 lg:col-span-3 row-span-2/g,
        'class="reveal reveal-scale reveal-delay-300 col-span-1 sm:col-span-12 md:col-span-4 lg:col-span-3 row-span-2'
    );
    html = html.replace(
        /class="reveal reveal-scale col-span-12 md:col-span-8 lg:col-span-6 row-span-2/g,
        'class="reveal reveal-scale col-span-1 sm:col-span-12 md:col-span-8 lg:col-span-6 row-span-2'
    );
    html = html.replace(
        /class="reveal reveal-scale reveal-delay-100 col-span-12 md:col-span-12 lg:col-span-3 row-span-2/g,
        'class="reveal reveal-scale reveal-delay-100 col-span-1 sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-2'
    );
    html = html.replace(
        /class="reveal reveal-scale reveal-delay-200 col-span-12 md:col-span-4 lg:col-span-4 row-span-1/g,
        'class="reveal reveal-scale reveal-delay-200 col-span-1 sm:col-span-12 md:col-span-4 lg:col-span-4 row-span-1'
    );

    return html;
}

function fixMap(html) {
    // Fix map embed URL to use place name for correct location
    html = html.replace(
        /src="https:\/\/maps\.google\.com\/maps\?q=50\.06886,14\.42284&t=&z=16&ie=UTF8&iwloc=&output=embed"/g,
        'src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1250.8!2d14.42284!3d50.06886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b9500165d1229%3A0xd0f3ba759452c438!2sHIRO%20barbershop!5e0!3m2!1scs!2scz!4v1"'
    );
    return html;
}

function addProductModal(html) {
    if (html.includes('product-modal')) return html; // already added
    html = html.replace('</body>', productModalHTML + '\n</body>');
    return html;
}

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${file} - not found`);
        return;
    }
    let html = fs.readFileSync(filePath, 'utf8');
    html = fixProducts(html);
    html = fixGallery(html);
    html = fixMap(html);
    html = addProductModal(html);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Fixed: ${file}`);
});

console.log('\nAll done!');
