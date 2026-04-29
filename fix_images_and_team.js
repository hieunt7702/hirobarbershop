const fs = require('fs');
const files = ['index.html','vi.html','en.html','de.html','es.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let c = fs.readFileSync(file, 'utf-8');

    // 1. Rename bg-background to bg-site-bg and text-on-background to text-on-background
    // (I'll keep on-background name but use the new site-bg)
    c = c.replace(/bg-background/g, 'bg-site-bg');
    c = c.replace(/to-background/g, 'to-site-bg');
    c = c.replace(/from-background/g, 'from-site-bg');
    c = c.replace(/ring-offset-background/g, 'ring-offset-site-bg');

    // 2. HERO SECTION FIX
    // Currently: 
    // <div class="absolute right-0 top-0 w-full lg:w-2/3 h-full pointer-events-none opacity-60 lg:opacity-80">
    //   <div class="absolute inset-0 bg-gradient-to-r from-site-bg via-transparent to-transparent"></div>
    //   <img src="assets/images/hero.jpg" ...>
    // </div>
    // The gradient covers the image. Let's move the gradient AFTER the image and make it subtler.
    // Actually, let's make the image full opacity and the gradient fade the LEFT side only.
    
    // Find the hero image block
    const heroBlockRegex = /<div\s+class="absolute right-0 top-0 w-full lg:w-2\/3 h-full pointer-events-none opacity-60 lg:opacity-80">[\s\S]*?<\/div>/;
    const newHeroBlock = `
            <div class="absolute right-0 top-0 w-full lg:w-2/3 h-full pointer-events-none overflow-hidden">
                <img class="w-full h-full object-cover object-right-top lg:object-center transition-all duration-1000" 
                    alt="Hiro Barbershop Hero Image" 
                    src="assets/images/hero.jpg" 
                    fetchpriority="high">
                <!-- Fade overlay to blend image into background on the left -->
                <div class="absolute inset-0 bg-gradient-to-r from-site-bg via-site-bg/40 to-transparent"></div>
            </div>`;
    c = c.replace(heroBlockRegex, newHeroBlock);

    // 3. TEAM SECTION FIX
    // Ensure bg-site-bg is used and text is dark.
    // The previous Turn already set it to bg-site-bg (via the rename).
    // But let's check for any hardcoded dark classes left in the team section.
    c = c.replace(/bg-\[#111111\]/g, 'bg-site-bg');
    c = c.replace(/bg-\[#0e0e0e\]/g, 'bg-site-bg');
    
    // Ensure team section text is dark
    // Section title
    c = c.replace(/text-3xl lg:text-4xl uppercase text-on-background/g, 'text-3xl lg:text-4xl uppercase text-primary font-headline-md');

    // 4. PRODUCT IMAGES FIX
    // Already set to opacity-100 and bg-white.
    // Let's ensure no grayscale or weird filters.
    c = c.replace(/mix-blend-screen/g, 'mix-blend-normal');

    fs.writeFileSync(file, c);
    console.log(`✓ Patched ${file}`);
});
