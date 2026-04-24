const fs = require('fs');

const moveSwitcher = (html) => {
    const switcherRegex = /[\s]*<!-- Language Switcher -->[\s\S]*?<\/div>\s*<\/div>\n/;
    const switcherMatch = html.match(switcherRegex);
    if (!switcherMatch) return html;
    const switcher = switcherMatch[0];
    
    html = html.replace(switcherRegex, '\n');
    
    const targetRegex = /(<!-- CTA & Mobile Toggle -->\s*<div class="flex items-center gap-4">)/;
    html = html.replace(targetRegex, `$1\n${switcher}`);
    return html;
};

const translateVi = (html) => {
    const reps = {
        '">SERVICES</a>': '">DỊCH VỤ</a>',
        '">PORTFOLIO</a>': '">THƯ VIỆN</a>',
        '">TEAM</a>': '">ĐỘI NGŨ</a>',
        '">BOOKING</a>': '">ĐẶT LỊCH</a>',
        '">BOOK NOW</a>': '">ĐẶT LỊCH NGAY</a>',
        'Tradition Refined</span>': 'Nét Truyền Thống Tinh Tế</span>',
        'RESERVE SEAT': 'GIỮ CHỖ NGAY',
        'WATCH THE EXPERIENCE': 'XEM TRẢI NGHIỆM',
        'Menu of services</span>': 'Bảng giá dịch vụ</span>',
        'Gallery</span>': 'Thư viện ảnh</span>',
        'The Masters</span>': 'Những Nghệ Nhân</span>',
        'Reservation</span>': 'Đặt Lịch Hẹn</span>',
        'HIRO BARBERSHOP. TRADITION REFINED.': 'HIRO BARBERSHOP. NÉT TRUYỀN THỐNG TINH TẾ.',
        'Address</span>': 'Địa chỉ</span>',
        'Opening Hours</span>': 'Giờ mở cửa</span>',
    };
    for (let [k, v] of Object.entries(reps)) {
        html = html.split(k).join(v);
    }
    return html;
};

const translateCs = (html) => {
    const reps = {
        '">SERVICES</a>': '">SLUŽBY</a>',
        '">PORTFOLIO</a>': '">GALERIE</a>',
        '">TEAM</a>': '">TÝM</a>',
        '">BOOKING</a>': '">REZERVACE</a>',
        '">BOOK NOW</a>': '">REZERVUJTE NYNÍ</a>',
        'Tradition Refined</span>': 'Zušlechtěná Tradice</span>',
        'RESERVE SEAT': 'REZERVUJTE SI MÍSTO',
        'WATCH THE EXPERIENCE': 'ZHLÉDNOUT ZÁŽITEK',
        'Menu of services</span>': 'Nabídka služeb</span>',
        'Gallery</span>': 'Galerie</span>',
        'The Masters</span>': 'Mistři</span>',
        'Reservation</span>': 'Rezervace</span>',
        'HIRO BARBERSHOP. TRADITION REFINED.': 'HIRO BARBERSHOP. ZUŠLECHTĚNÁ TRADICE.',
        'Address</span>': 'Adresa</span>',
        'Opening Hours</span>': 'Otevírací Doba</span>',
    };
    for (let [k, v] of Object.entries(reps)) {
        html = html.split(k).join(v);
    }
    return html;
};

['index.html', 'en.html', 'cs.html'].forEach(file => {
    let html = fs.readFileSync(file, 'utf-8');
    html = moveSwitcher(html);
    if (file === 'index.html') html = translateVi(html);
    if (file === 'cs.html') html = translateCs(html);
    fs.writeFileSync(file, html, 'utf-8');
});

console.log('Update complete.');
