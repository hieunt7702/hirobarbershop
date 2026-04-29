const fs = require('fs');
const files = ['index.html','vi.html','en.html','de.html','es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf-8');

    // --- HERO IMAGE FIX ---
    // Remove the previous hero image container and replace with a solid one
    // Look for the block we added in the previous turn
    const heroSearch = /<div\s+class="absolute right-0 top-0 w-full lg:w-2\/3 h-full pointer-events-none overflow-hidden">[\s\S]*?<\/div>\s*<\/div>/;
    // Wait, the previous block might have been slightly different or truncated.
    // Let's use a simpler regex to find the hero section's end.
    
    // Actually, I'll just look for src="assets/images/hero.jpg"
    c = c.replace(/<div class="absolute right-0 top-0 w-full lg:w-2\/3 h-full pointer-events-none opacity-60 lg:opacity-80">[\s\S]*?src="assets\/images\/hero\.jpg"[\s\S]*?<\/div>/g, '');
    c = c.replace(/<div class="absolute right-0 top-0 w-full lg:w-2\/3 h-full pointer-events-none overflow-hidden">[\s\S]*?src="assets\/images\/hero\.jpg"[\s\S]*?<\/div>/g, '');

    // Now insert a clean hero background div at the start of the hero section
    // Hero section starts with: <section class="relative min-h-[90vh] flex items-center px-6 lg:px-12 max-w-screen-2xl mx-auto overflow-hidden">
    c = c.replace(
        /(<section class="relative min-h-\[90vh\] flex items-center px-6 lg:px-12 max-w-screen-2xl mx-auto overflow-hidden">)/,
        `$1
            <!-- Hero Image Background -->
            <div class="absolute inset-0 z-0">
                <img src="assets/images/hero.jpg" class="w-full h-full object-cover object-right lg:object-center opacity-30 lg:opacity-50" alt="Hiro Barbershop">
                <div class="absolute inset-0 bg-gradient-to-r from-[#efeeec] via-[#efeeec]/60 to-transparent"></div>
            </div>`
    );

    // --- TEAM SECTION FIX ---
    // Change background to hardcoded light grey and ensure text is dark
    c = c.replace(/id="team" class="([^"]*?)bg-site-bg([^"]*?)"/g, 'id="team" class="$1bg-[#efeeec]$2"');
    c = c.replace(/id="team" class="([^"]*?)bg-\[#111111\]([^"]*?)"/g, 'id="team" class="$1bg-[#efeeec]$2"');
    
    // Fix team section header text
    c = c.replace(/MISTŘI HOLIČI<\/h2>/g, '<span class="text-[#1c1c1a]">MISTŘI HOLIČI</span></h2>');
    c = c.replace(/text-on-surface-variant/g, 'text-[#58574f]');

    // --- PRODUCT IMAGES FIX ---
    c = c.replace(/mix-blend-screen/g, 'mix-blend-normal');
    c = c.replace(/bg-site-bg/g, 'bg-[#efeeec]');
    c = c.replace(/bg-white-low/g, 'bg-[#efeeec]');

    fs.writeFileSync(file, c);
    console.log(`✓ Fixed ${file}`);
});
