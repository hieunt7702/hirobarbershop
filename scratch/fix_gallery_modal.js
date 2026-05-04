const fs = require('fs');
const path = require('path');

const files = ['index.html', 'vi.html', 'en.html', 'de.html', 'es.html'];
const dir = path.resolve(__dirname, '..');

// ── Fix 1: Gallery images 3,4,5 – mobile layout ──────────────────────────────
// On mobile (2-col): img3 + img4 side-by-side (small), img5 full-width below
// "ngược lại" so ảnh to (full-width) ở dưới, 2 ảnh nhỏ ở trên → [3][4] / [5 full]

function fixGalleryMobile(html) {
    // Figure index 3 (reveal-delay-300, row-span-2): col-span-1 row-span-1 on mobile
    html = html.replace(
        /class="(reveal reveal-scale reveal-delay-300 )col-span-1 (sm:col-span-12 md:col-span-4 lg:col-span-3) row-span-2( relative overflow-hidden group cursor-pointer rounded-xl bg-surface-container)"/,
        'class="$1col-span-1 $2 row-span-1 sm:row-span-2$3"'
    );
    // Figure index 4 (no delay, row-span-2, col-span-8): col-span-1 row-span-1 on mobile
    html = html.replace(
        /class="(reveal reveal-scale )col-span-1 (sm:col-span-12 md:col-span-8 lg:col-span-6) row-span-2( relative overflow-hidden group cursor-pointer rounded-xl bg-surface-container)"/,
        'class="$1col-span-1 $2 row-span-1 sm:row-span-2$3"'
    );
    // Figure index 5 (reveal-delay-100, row-span-2, col-span-12): full-width on mobile col-span-2
    html = html.replace(
        /class="(reveal reveal-scale reveal-delay-100 )col-span-1 (sm:col-span-12 md:col-span-12 lg:col-span-3) row-span-2( relative overflow-hidden group cursor-pointer rounded-xl bg-surface-container)"/,
        'class="$1col-span-2 $2 row-span-1 sm:row-span-2$3"'
    );
    return html;
}

// ── Fix 2: Add product-desc-text span to plain-text descriptions ──────────────
function fixDescSpans(html) {
    // Match: <strong ...>Label:</strong> SomeText (without existing span)
    // Works for any language label (Účinek, Công dụng, Effect, Wirkung, Efecto...)
    html = html.replace(
        /(<strong[^>]+>[^<]+<\/strong>) ([^<\n][^\n]*?)(<\/div>)/g,
        (match, strong, text, closing) => {
            // Skip if already has a span
            if (text.includes('<span')) return match;
            return `${strong} <span class="product-desc-text">${text.trim()}</span>${closing}`;
        }
    );
    return html;
}

// ── Fix 3: Make modal label & booking button language-aware ───────────────────
// Add id="pm-label" and id="pm-book-btn" to modal HTML for JS to update
function fixModalHTML(html) {
    html = html.replace(
        /<strong class="text-on-background font-label-caps uppercase text-\[10px\] tracking-widest block mb-1 opacity-70">Popis:<\/strong>/g,
        '<strong id="pm-label" class="text-on-background font-label-caps uppercase text-[10px] tracking-widest block mb-1 opacity-70">Popis:</strong>'
    );
    html = html.replace(
        /(<a href="https:\/\/hirobarbershop\.setmore\.com\/" target="_blank"\s+class="mt-6 block w-full[^"]*">\s*)REZERVACE HNED(\s*<\/a>)/g,
        '$1<span id="pm-book-btn">REZERVACE HNED</span>$2'
    );
    return html;
}

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) { console.log('Skip:', file); return; }

    let html = fs.readFileSync(filePath, 'utf8');
    html = fixGalleryMobile(html);
    html = fixDescSpans(html);
    html = fixModalHTML(html);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('✓', file);
});
console.log('Done!');
