const fs = require('fs');

const aboutUsText = {
  vi: 'Chính thức khai trương và đi vào hoạt động từ tháng 11 năm 2024, cùng với sức trẻ sáng tạo và kinh nghiệm tích lũy nhiều năm. Hiro Barbershop hy vọng sẽ trở thành một người bạn giúp định hình phong cách cho khách hàng, giúp bạn thể hiện cá tính riêng nhưng vẫn phù hợp với công việc và cuộc sống hàng ngày. Với gần 150 đánh giá tích cực trên Google Maps cùng mức giá hợp lý, dễ tiếp cận, Hiro Barbershop là một thương hiệu mới rất đáng để trải nghiệm ❤️❤️❤️❤️',
  en: 'Officially opening and starting operations in November 2024, along with the creativity of youth and experience gathered over many years. Hiro Barbershop hopes to become a friend that helps shape the style for customers, allowing you to express your personality while still being suitable for work and daily life. With nearly 150 positive reviews on Google Maps and reasonable, accessible prices, Hiro Barbershop is a new brand worth experiencing ❤️❤️❤️❤️',
  cs: 'Oficiálně otevíráme a zahajujeme provoz v listopadu 2024, s mladistvou kreativitou a zkušenostmi nasbíranými za mnoho let. Hiro Barbershop doufá, že se stane přítelem, který zákazníkům pomůže utvářet styl, umožní vám vyjádřit vaši osobnost, a přitom zůstane vhodný pro práci i každodenní život. S téměř 150 pozitivními recenzemi na Google Maps a rozumnými, dostupnými cenami je Hiro Barbershop novou značkou, kterou stojí za to vyzkoušet ❤️❤️❤️❤️'
};

const aboutUsOld = {
  vi: 'Nơi truyền thống kết hợp cùng sự tỉ mỉ hiện đại. Nâng tầm chuẩn mực chăm sóc sắc đẹp nam giới tại trung tâm Sài Gòn từ 2018.',
  en: 'Where tradition meets modern meticulousness. Elevating men\'s grooming standards in the heart of Saigon since 2018.',
  cs: 'Kde se tradice setkává s moderní precizností. Zvyšujeme standardy pánské péče v srdci Saigonu od roku 2018.'
};

const replaceInFile = (file, lang) => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace Brand Name
    content = content.replace(/Modern Aristocrat/g, 'Hiro Barbershop');
    content = content.replace(/MODERN ARISTOCRAT/g, 'HIRO BARBERSHOP');
    content = content.replace(/modernaristocrat/g, 'hirobarbershop'); // in URLs
    
    // Replace About Us
    if (aboutUsOld[lang] && aboutUsText[lang]) {
        content = content.replace(aboutUsOld[lang], aboutUsText[lang]);
    }
    
    fs.writeFileSync(file, content, 'utf8');
};

['index.html', 'en.html', 'cs.html'].forEach((file, idx) => {
    const langs = ['vi', 'en', 'cs'];
    replaceInFile(file, langs[idx]);
});

// Update translate.py
if (fs.existsSync('translate.py')) {
    let translatePy = fs.readFileSync('translate.py', 'utf8');
    translatePy = translatePy.replace(/Modern Aristocrat/g, 'Hiro Barbershop');
    translatePy = translatePy.replace(/MODERN ARISTOCRAT/g, 'HIRO BARBERSHOP');
    translatePy = translatePy.replace(/modernaristocrat/g, 'hirobarbershop');
    translatePy = translatePy.replace(aboutUsOld['vi'], aboutUsText['vi']);
    translatePy = translatePy.replace(aboutUsOld['en'], aboutUsText['en']);
    translatePy = translatePy.replace(aboutUsOld['cs'], aboutUsText['cs']);
    fs.writeFileSync('translate.py', translatePy, 'utf8');
}

// Update update-content.js
if (fs.existsSync('update-content.js')) {
    let updateContentJs = fs.readFileSync('update-content.js', 'utf8');
    updateContentJs = updateContentJs.replace(/MODERN ARISTOCRAT/g, 'HIRO BARBERSHOP');
    updateContentJs = updateContentJs.replace(/Modern Aristocrat/g, 'Hiro Barbershop');
    fs.writeFileSync('update-content.js', updateContentJs, 'utf8');
}

console.log('Done!');
