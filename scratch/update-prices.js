const fs = require('fs');

function buildServicesSection(lang) {
  const t = {
    vi: {
      headingTop: "Bảng giá dịch vụ",
      headingMain: "DỊCH VỤ ĐẲNG CẤP",
      desc: "Chúng tôi không chỉ cắt tóc, chúng tôi kiến tạo phong thái của một quý ông hiện đại thông qua những kỹ thuật tinh xảo nhất.",
      memberTitle: "ĐĂNG KÝ THÀNH VIÊN ĐỂ NHẬN ƯU ĐÃI KHỦNG",
      bd: "Sinh nhật:",
      fs: "Cha và con trai:",
      h2w: "Cắt tóc mỗi 2 tuần:",
      pts: "Tích lũy 3 điểm, nhận 1 lần giảm giá",
      specialTitle: "ƯU ĐÃI ĐẶC BIỆT:",
      specialDesc: "Khi giới thiệu bạn bè và người thân, cả hai sẽ nhận được ưu đãi giảm giá",
      specialNote: "Áp dụng cho thành viên đã cắt trên 3 lần",
      priceTitle: "BẢNG GIÁ DỊCH VỤ",
      items: [
        { name: "Cắt tóc nam", sub: "Pánský střih", price: "499 CZK" },
        { name: "Tóc dài - Hoặc chỉ cắt bằng kéo", sub: "Dlouhé vlasy - Nebo s jenom nůžkama", price: "569 CZK" },
        { name: "Cắt tóc & Cạo râu toàn bộ (-15%)", sub: "Stříhání & úprava vousů", price: "739 CZK" },
        { name: "Cắt tóc & Cạo viền râu", sub: "Stříhání a zarovnat kontury vousů", price: "599 CZK" },
        { name: "Cạo râu cổ điển", sub: "Úprava vousů", price: "369 CZK" },
        { name: "Nhuộm râu", sub: "Barvení vousů", price: "499 CZK" },
        { name: "Cạo đầu & Cạo râu", sub: "Oholení hlavy & vousy", price: "549 CZK" },
        { name: "Uốn tóc", sub: "Trvalá ondulace", price: "1499 CZK" },
        { name: "Cắt tóc mỗi 2 tuần (-15%)", sub: "Stříhání za každé 2 týdny", price: "419 CZK" },
        { name: "Cắt tóc sinh viên (dưới 24t) (-15%)", sub: "Stříhání pro studenta", price: "419 CZK" },
      ]
    },
    en: {
      headingTop: "Menu of services",
      headingMain: "PREMIUM SERVICES",
      desc: "We don't just cut hair; we craft the demeanor of a modern gentleman through refined techniques.",
      memberTitle: "REGISTER AS A MEMBER TO RECEIVE HUGE DISCOUNTS",
      bd: "Birthday:",
      fs: "Father and son:",
      h2w: "Haircut every 2 weeks:",
      pts: "Each 3 points on card, get 1 discount",
      specialTitle: "SPECIAL OFFER:",
      specialDesc: "When you refer friends and family, both of you will receive a discount",
      specialNote: "Applicable to members who have had more than 3 cuts",
      priceTitle: "PRICE LIST",
      items: [
        { name: "Men's haircut", sub: "Pánský střih", price: "499 CZK" },
        { name: "Long hair - Or with scissors only", sub: "Dlouhé vlasy - Nebo s jenom nůžkama", price: "569 CZK" },
        { name: "Haircut & full beard trim (-15%)", sub: "Stříhání & úprava vousů", price: "739 CZK" },
        { name: "Haircut & line up contours of the beard", sub: "Stříhání a zarovnat kontury vousů", price: "599 CZK" },
        { name: "Classic beard trim", sub: "Úprava vousů", price: "369 CZK" },
        { name: "Beard dye", sub: "Barvení vousů", price: "499 CZK" },
        { name: "Head shaving & beard trim", sub: "Oholení hlavy & vousy", price: "549 CZK" },
        { name: "Long term perm", sub: "Trvalá ondulace", price: "1499 CZK" },
        { name: "Every 2 weeks Haircut (-15%)", sub: "Stříhání za každé 2 týdny", price: "419 CZK" },
        { name: "Haircut for student (under 24y) (-15%)", sub: "Stříhání pro studenta", price: "419 CZK" },
      ]
    },
    cs: {
      headingTop: "Nabídka služeb",
      headingMain: "PRÉMIOVÉ SLUŽBY",
      desc: "Nejen že stříháme vlasy; vytváříme styl moderního gentlemana skrze vytříbené techniky.",
      memberTitle: "ZAREGISTRUJTE SE JAKO ČLEN A ZÍSKEJTE OBROVSKÉ SLEVY",
      bd: "Narozeniny:",
      fs: "Otec a syn:",
      h2w: "Střih každé 2 týdny:",
      pts: "Za každé 3 body na kartě získáte 1 slevu",
      specialTitle: "SPECIÁLNÍ NABÍDKA:",
      specialDesc: "Když doporučíte přátele nebo rodinu, oba získáte slevu",
      specialNote: "Platí pro členy, kteří podstoupili více než 3 střihy",
      priceTitle: "CENÍK",
      items: [
        { name: "Pánský střih", sub: "Men's haircut", price: "499 Kč" },
        { name: "Dlouhé vlasy - Nebo s jenom nůžkama", sub: "Long hair - Or with scissors only", price: "569 Kč" },
        { name: "Stříhání & úprava vousů (-15%)", sub: "Haircut & full beard trim", price: "739 Kč" },
        { name: "Stříhání a zarovnat kontury vousů", sub: "Haircut & line up contours of the beard", price: "599 Kč" },
        { name: "Úprava vousů", sub: "Classic beard trim", price: "369 Kč" },
        { name: "Barvení vousů", sub: "Beard dye", price: "499 Kč" },
        { name: "Oholení hlavy & vousy", sub: "Head shaving & beard trim", price: "549 Kč" },
        { name: "Trvalá ondulace", sub: "Long term perm", price: "1499 Kč" },
        { name: "Stříhání za každé 2 týdny (-15%)", sub: "Every 2 weeks Haircut", price: "419 Kč" },
        { name: "Stříhání pro studenta (-15%)", sub: "Haircut for student (under 24y)", price: "419 Kč" },
      ]
    }
  };

  const data = t[lang];
  let itemsHtml = '';
  data.items.forEach((item, index) => {
    let delay = index * 50;
    let delayClass = delay > 0 ? `reveal-delay-${delay}` : '';
    itemsHtml += `
                            <!-- Item ${index + 1} -->
                            <div class="reveal ${delayClass} flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-outline-variant/30 pb-4 group hover:border-primary/50 transition-colors">
                                <div class="pr-4 flex-1 mb-2 sm:mb-0">
                                    <h4 class="font-headline-md text-lg text-on-background group-hover:text-primary transition-colors">${item.name}</h4>
                                    <p class="text-xs text-on-surface-variant font-label-caps italic mt-1 opacity-80">${item.sub}</p>
                                </div>
                                <div class="font-headline-md text-xl lg:text-2xl text-primary whitespace-nowrap">${item.price}</div>
                            </div>`;
  });

  return `        <!-- Services & Price List -->
        <section id="services" class="py-20 lg:py-28 bg-surface-container-low px-6 lg:px-12 scroll-mt-20">
            <div class="max-w-screen-2xl mx-auto">
                <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6 reveal">
                    <div>
                        <span
                            class="font-label-caps text-primary tracking-widest block mb-3 uppercase font-semibold">${data.headingTop}</span>
                        <h2
                            class="font-headline-md text-3xl lg:text-4xl relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[2px] after:bg-primary uppercase">
                            ${data.headingMain}</h2>
                    </div>
                    <p class="max-w-md text-on-surface-variant font-body-lg italic opacity-80 leading-relaxed">
                        ${data.desc}
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    <!-- Membership Box -->
                    <div class="lg:col-span-5 xl:col-span-4 reveal reveal-left">
                        <div class="bg-surface-container border border-primary/30 p-8 lg:p-10 rounded-sm relative overflow-hidden group">
                            <!-- Background decoration -->
                            <div class="absolute -top-24 -right-24 text-primary/5 pointer-events-none group-hover:text-primary/10 transition-colors duration-700">
                                <span class="material-symbols-outlined text-[200px]" style="font-variation-settings: 'FILL' 1;">content_cut</span>
                            </div>
                            
                            <h3 class="font-headline-md text-2xl text-center text-primary mb-8 uppercase tracking-widest leading-relaxed">${data.memberTitle}</h3>
                            
                            <ul class="space-y-6 mb-8 relative z-10">
                                <li class="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                                    <div class="flex items-center gap-3">
                                        <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">star</span>
                                        <span class="font-label-caps tracking-widest text-sm text-on-background">${data.bd}</span>
                                    </div>
                                    <span class="bg-primary text-on-primary font-headline-md text-lg px-3 py-1 rounded-sm">-30%</span>
                                </li>
                                <li class="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                                    <div class="flex items-center gap-3">
                                        <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">star</span>
                                        <span class="font-label-caps tracking-widest text-sm text-on-background">${data.fs}</span>
                                    </div>
                                    <span class="bg-primary text-on-primary font-headline-md text-lg px-3 py-1 rounded-sm">-15%</span>
                                </li>
                                <li class="flex justify-between items-center border-b border-outline-variant/20 pb-4">
                                    <div class="flex items-center gap-3">
                                        <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">star</span>
                                        <span class="font-label-caps tracking-widest text-sm text-on-background">${data.h2w}</span>
                                    </div>
                                    <span class="bg-primary text-on-primary font-headline-md text-lg px-3 py-1 rounded-sm">-15%</span>
                                </li>
                                <li class="flex items-center gap-3 pt-2">
                                    <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">loyalty</span>
                                    <span class="font-label-caps tracking-widest text-sm text-on-background leading-relaxed">${data.pts}</span>
                                </li>
                            </ul>
                            
                            <!-- Special Offer Box -->
                            <div class="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary p-6 rounded-sm text-center relative z-10 mt-10 shadow-[0_0_30px_rgba(197,160,89,0.15)]">
                                <span class="font-headline-md text-primary text-lg block mb-2 tracking-widest uppercase">${data.specialTitle}</span>
                                <p class="text-sm font-body-lg text-on-background mb-4">${data.specialDesc}</p>
                                <div class="font-display-lg text-5xl text-primary mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">30%</div>
                                <p class="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest opacity-80">${data.specialNote}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Price List -->
                    <div class="lg:col-span-7 xl:col-span-8 reveal reveal-right flex flex-col gap-6">
                        <h3 class="font-headline-md text-2xl mb-2 tracking-widest uppercase text-on-background border-b border-primary/20 pb-4 inline-block">${data.priceTitle}</h3>
                        <div class="flex flex-col gap-6 mt-2">
${itemsHtml}
                        </div>
                    </div>
                </div>
            </div>
        </section>`;
}

function buildSelectOptions(lang) {
  const t = {
    vi: {
      sel: "CHỌN DỊCH VỤ",
      items: [
        "CẮT TÓC NAM", "TÓC DÀI (CHỈ CẮT KÉO)", "CẮT TÓC & CẠO RÂU", "CẮT TÓC & VIỀN RÂU", "CẠO RÂU CỔ ĐIỂN", "NHUỘM RÂU", "CẠO ĐẦU & CẠO RÂU", "UỐN TÓC", "CẮT TÓC (MỖI 2 TUẦN)", "CẮT TÓC (HỌC SINH)"
      ]
    },
    en: {
      sel: "SELECT SERVICE",
      items: [
        "MEN'S HAIRCUT", "LONG HAIR (SCISSORS ONLY)", "HAIRCUT & FULL BEARD TRIM", "HAIRCUT & BEARD CONTOURS", "CLASSIC BEARD TRIM", "BEARD DYE", "HEAD SHAVING & BEARD TRIM", "LONG TERM PERM", "HAIRCUT (EVERY 2 WKS)", "HAIRCUT (STUDENT)"
      ]
    },
    cs: {
      sel: "VYBERTE SLUŽBU",
      items: [
        "PÁNSKÝ STŘIH", "DLOUHÉ VLASY (JEN NŮŽKAMI)", "STŘÍHÁNÍ & ÚPRAVA VOUSŮ", "STŘÍHÁNÍ A KONTURY VOUSŮ", "ÚPRAVA VOUSŮ", "BARVENÍ VOUSŮ", "OHOLENÍ HLAVY & VOUSY", "TRVALÁ ONDULACE", "STŘÍHÁNÍ (KAŽDÉ 2 TÝDNY)", "STŘÍHÁNÍ PRO STUDENTA"
      ]
    }
  };
  
  const data = t[lang];
  let html = `                            <select id="service" name="service"
                                class="w-full bg-transparent border-0 border-b border-outline-variant py-4 focus:ring-0 focus:border-primary font-label-caps text-sm text-on-background cursor-pointer appearance-none rounded-none"
                                required>
                                <option value="" disabled selected class="bg-surface-container text-on-surface-variant">${data.sel}</option>\n`;
  data.items.forEach((item, idx) => {
    html += `                                <option value="s${idx+1}" class="bg-surface-container text-on-background">${item}</option>\n`;
  });
  html += `                            </select>`;
  return html;
}

const files = [
  { name: 'index.html', lang: 'vi' },
  { name: 'en.html', lang: 'en' },
  { name: 'cs.html', lang: 'cs' }
];

files.forEach(f => {
  let content = fs.readFileSync(f.name, 'utf8');

  // Replace Services Section
  // Find from <!-- Services Grid --> to <!-- Portfolio (Gallery) -->
  const regexServices = /(?:<!--\s*Services Grid\s*-->|<!--\s*Services & Price List\s*-->)[\s\S]*?(?=<!--\s*Portfolio \(Gallery\)\s*-->)/;
  content = content.replace(regexServices, buildServicesSection(f.lang) + '\n\n        ');

  // Replace Select Dropdown
  const regexSelect = /<select id="service"[\s\S]*?<\/select>/;
  content = content.replace(regexSelect, buildSelectOptions(f.lang));

  fs.writeFileSync(f.name, content, 'utf8');
  console.log('Updated ' + f.name);
});
