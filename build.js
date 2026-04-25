const fs = require('fs');

const translations = JSON.parse(fs.readFileSync('translations.json', 'utf8'));
const templateHtml = fs.readFileSync('template.html', 'utf8');

const languages = {
    'vi': { file: 'vi.html', code: 'vi', short: 'VI', flag: 'vn' },
    'en': { file: 'en.html', code: 'en', short: 'EN', flag: 'gb' },
    'cs': { file: 'index.html', code: 'cs', short: 'CS', flag: 'cz' },
    'de': { file: 'de.html', code: 'de', short: 'DE', flag: 'de' },
    'es': { file: 'es.html', code: 'es', short: 'ES', flag: 'es' }
};

for (const [langKey, langInfo] of Object.entries(languages)) {
    let outHtml = templateHtml;

    // 1. Replace translation keys
    const dict = translations[langKey];
    for (const [key, value] of Object.entries(dict)) {
        const placeholder = `{{${key}}}`;
        // Replace all occurrences
        outHtml = outHtml.split(placeholder).join(value);
    }

    // 2. Fix the HTML lang attribute (only the first one)
    outHtml = outHtml.replace('<html lang="vi"', `<html lang="${langInfo.code}"`);

    // 3. Update the Current Language display in the button
    outHtml = outHtml.replace(
        /<span id="current-lang"([^>]*)>VI<\/span>/,
        `<span id="current-lang"$1>${langInfo.short}</span>`
    );
    outHtml = outHtml.replace(
        /<img id="current-flag" src="https:\/\/flagcdn\.com\/w20\/vn\.png" alt="VI"([^>]*)>/,
        `<img id="current-flag" src="https://flagcdn.com/w20/${langInfo.flag}.png" alt="${langInfo.short}"$1>`
    );

    // 4. Handle the Dropdown Active State
    const activeClasses = 'text-primary bg-primary/10 hover:text-primary hover:bg-primary/20 transition-colors';
    const inactiveClasses = 'text-on-surface-variant hover:text-primary hover:bg-primary/20 transition-colors';

    const fileTargets = ['vi.html', 'en.html', 'index.html', 'de.html', 'es.html'];
    
    for (let target of fileTargets) {
        // Strip active state from all items first
        let regexActive = new RegExp(`(<a href="${target}"[\\s\\S]*?class="[^"]*)(${activeClasses})([^"]*")`, 'g');
        outHtml = outHtml.replace(regexActive, `$1${inactiveClasses}$3`);
    }

    // Now set the current language to active
    let regexInactive = new RegExp(`(<a href="${langInfo.file}"[\\s\\S]*?class="[^"]*)(${inactiveClasses})([^"]*")`, 'g');
    outHtml = outHtml.replace(regexInactive, `$1${activeClasses}$3`);

    // Save the file
    fs.writeFileSync(langInfo.file, outHtml, 'utf8');
    console.log(`Generated ${langInfo.file}`);
}

console.log('Build completed successfully!');
