const fs = require('fs');
const files = ['index.html','vi.html','en.html','de.html','es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf-8');

    // 1. FIX HERO IMAGE: Remove the covering gradient or make it lighter, and ensure image visibility
    // The previous turn added a z-10 div that covers the image.
    // Let's remove that z-10 div and use a simpler approach.
    c = c.replace(/<div class="absolute inset-0 bg-gradient-to-l from-transparent to-background\/80 z-10"><\/div>/g, '');
    
    // Adjust the image container to have better visibility on light bg
    c = c.replace(
        /class="absolute right-0 top-0 w-full lg:w-2\/3 h-full pointer-events-none"/g,
        'class="absolute right-0 top-0 w-full lg:w-2/3 h-full pointer-events-none opacity-60 lg:opacity-80"'
    );
    // Add a very subtle gradient to fade the edge
    c = c.replace(
        /class="absolute right-0 top-0 w-full lg:w-2\/3 h-full pointer-events-none opacity-60 lg:opacity-80">/g,
        'class="absolute right-0 top-0 w-full lg:w-2/3 h-full pointer-events-none opacity-60 lg:opacity-80"><div class="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent"></div>'
    );

    // 2. FIX TEAM SECTION: Background should be light grey per the theme
    // Currently it might be bg-surface-container-high or bg-[#111111]
    c = c.replace(/id="team" class="([^"]*?)bg-\[#111111\]([^"]*?)"/g, 'id="team" class="$1bg-background$2"');
    c = c.replace(/id="team" class="([^"]*?)bg-surface-container-high([^"]*?)"/g, 'id="team" class="$1bg-background$2"');
    
    // Fix text colors in Team section (change text-white to text-on-background for names)
    // But barber names are currently text-white. Let's keep them white IF they are over the dark image overlay.
    // However, the section title and description should be dark.
    // The previous check showed h2 and p were text-on-background/text-on-surface-variant. That's fine.
    
    // 3. FIX PRODUCT IMAGES: Ensure they are sharp.
    // The mix-blend-screen was already removed. Let's ensure they have proper contrast.
    // Also, some product images might have had a white background in the source, so bg-white is good.
    c = c.replace(/bg-surface-container/g, 'bg-white');

    fs.writeFileSync(file, c);
    console.log(`✓ Fixed ${file}`);
});
