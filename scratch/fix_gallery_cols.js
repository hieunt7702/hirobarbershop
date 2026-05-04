const fs = require('fs');
const path = require('path');
const files = ['index.html','vi.html','en.html','de.html','es.html'];
const dir = path.resolve(__dirname, '..');

// Gallery grid container: already grid-cols-2 sm:grid-cols-12 ✓
// Rules:
//   Figure 0 (first): col-span-2 sm:col-span-12  md:col-span-8  lg:col-span-8  row-span-2 (kept as-is, full width on mobile)
//   Figures 1-8 (rest): col-span-1 on mobile, row-span-1 on mobile, keep sm/md/lg col-span, keep sm:row-span-2 if needed for desktop

// We identify figures by their unique desktop lg:col-span / md:col-span combos and rebuild mobile prefix cleanly.

// Pattern map: [search regex] -> mobile col-span on mobile
// All non-first figures must have col-span-1 and row-span-1 on mobile

function fixGallery(html) {
    // Figures 1,2 — currently correct: col-span-1 sm:col-span-6 row-span-1
    // Figure 3 — col-span-1 sm:col-span-12 md:col-span-4 lg:col-span-3 row-span-1 sm:row-span-2 ✓
    // Figure 4 — col-span-1 sm:col-span-12 md:col-span-8 lg:col-span-6 row-span-1 sm:row-span-2 ✓
    // Figure 5 — col-span-2 (WRONG, should be col-span-1) sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-1 sm:row-span-2
    // Figure 6 — col-span-1 sm:col-span-12 md:col-span-4 lg:col-span-4 row-span-1 ✓
    // Figures 7,8 — col-span-1 sm:col-span-6 md:col-span-4 lg:col-span-4 row-span-1 ✓

    // Fix Figure 5: col-span-2 → col-span-1
    html = html.replace(
        /class="(reveal reveal-scale reveal-delay-100 )col-span-2( sm:col-span-12 md:col-span-12 lg:col-span-3 row-span-1 sm:row-span-2)( relative)/g,
        'class="$1col-span-1$2$3'
    );

    return html;
}

files.forEach(file => {
    const fp = path.join(dir, file);
    if (!fs.existsSync(fp)) { console.log('skip', file); return; }
    let html = fs.readFileSync(fp, 'utf8');
    html = fixGallery(html);
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✓', file);
});
console.log('Done!');
