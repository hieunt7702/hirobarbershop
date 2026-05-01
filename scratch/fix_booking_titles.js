const fs = require('fs');
const path = require('path');

const files = ['vi.html', 'index.html', 'es.html', 'en.html', 'de.html'];

const replacements = {
    'vi.html': { oldSpan: 'GIỮ\n                        CHỖ', newSpan: 'ĐẶT LỊCH' },
    'index.html': { oldSpan: 'VYTVOŘIT\n                        REZERVACI', newSpan: 'REZERVACE' },
    'es.html': { oldSpan: 'HACER UNA\n                        RESERVA', newSpan: 'RESERVAS' },
    'en.html': { oldSpan: 'MAKE A\n                        RESERVATION', newSpan: 'BOOKING' },
    'de.html': { oldSpan: 'RESERVIERUNG\n                        VORNEHMEN', newSpan: 'BUCHUNG' }
};

// Also try without newline just in case
const replacementsInline = {
    'vi.html': { oldSpan: 'GIỮ CHỖ', newSpan: 'ĐẶT LỊCH' },
    'index.html': { oldSpan: 'VYTVOŘIT REZERVACI', newSpan: 'REZERVACE' },
    'es.html': { oldSpan: 'HACER UNA RESERVA', newSpan: 'RESERVAS' },
    'en.html': { oldSpan: 'MAKE A RESERVATION', newSpan: 'BOOKING' },
    'de.html': { oldSpan: 'RESERVIERUNG VORNEHMEN', newSpan: 'BUCHUNG' }
};

files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the span inside the booking section
    // <span class="font-label-caps text-primary tracking-[0.3em] uppercase block mb-4 text-sm">...</span>
    
    const r = replacements[file];
    const ri = replacementsInline[file];
    
    if (r && ri) {
        // Try replacing newline version
        let modified = false;
        const regex1 = new RegExp(`(<span class="font-label-caps text-primary tracking-\\[0\\.3em\\] uppercase block mb-4 text-sm">)${r.oldSpan}(</span>)`);
        if (regex1.test(content)) {
            content = content.replace(regex1, `$1${r.newSpan}$2`);
            modified = true;
        } else {
            // Try inline version
            const regex2 = new RegExp(`(<span class="font-label-caps text-primary tracking-\\[0\\.3em\\] uppercase block mb-4 text-sm">)${ri.oldSpan}(</span>)`);
            if (regex2.test(content)) {
                content = content.replace(regex2, `$1${ri.newSpan}$2`);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
