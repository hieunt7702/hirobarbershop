function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    
    if (!menu || !icon) return;

    if (menu.classList.contains('opacity-0')) {
        // Open menu
        menu.classList.remove('opacity-0', 'invisible');
        menu.classList.add('opacity-100', 'visible');
        icon.innerText = 'close';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        // Close menu
        menu.classList.add('opacity-0', 'invisible');
        menu.classList.remove('opacity-100', 'visible');
        icon.innerText = 'menu';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.remove('text-neutral-400', 'border-transparent');
                        link.classList.add('text-primary', 'border-primary');
                    } else {
                        link.classList.remove('text-primary', 'border-primary');
                        link.classList.add('text-neutral-400', 'border-transparent');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -5% 0px',
            threshold: 0
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

});

// Lightbox logic
const portfolioImages = [
    "assets/images/portfolio-new-9.jpg",
    "assets/images/portfolio-new-1.jpg",
    "assets/images/portfolio-new-2.jpg",
    "assets/images/portfolio-new-3.jpg",
    "assets/images/portfolio-new-4.jpg",
    "assets/images/portfolio-new-5.jpg",
    "assets/images/portfolio-new-6.jpg",
    "assets/images/portfolio-new-7.jpg",
    "assets/images/portfolio-new-11.jpg"
];
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    updateLightboxImage();
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightboxVideo = document.getElementById('lightbox-video');
    if(lightboxVideo) lightboxVideo.pause();
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.add('opacity-0');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}

function nextImage(e) {
    if(e) e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
    updateLightboxImage();
}

function prevImage(e) {
    if(e) e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxCounter = document.getElementById('lightbox-counter');
    if (!portfolioImages || portfolioImages.length === 0) return;
    const src = portfolioImages[currentImageIndex];

    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${portfolioImages.length}`;
    }

    if (src.endsWith('.mp4')) {
        if (lightboxImg) {
            lightboxImg.classList.add('hidden');
            lightboxImg.src = '';
        }
        if (lightboxVideo) {
            lightboxVideo.classList.remove('hidden');
            lightboxVideo.src = src;
            lightboxVideo.style.opacity = '0';
            lightboxVideo.style.transition = 'opacity 0.2s ease';
            setTimeout(() => {
                lightboxVideo.style.opacity = '1';
                lightboxVideo.play().catch(e => console.log(e));
            }, 150);
        }
    } else {
        if (lightboxVideo) {
            lightboxVideo.classList.add('hidden');
            lightboxVideo.pause();
            lightboxVideo.src = '';
        }
        if (lightboxImg) {
            lightboxImg.classList.remove('hidden');
            lightboxImg.style.opacity = '0';
            lightboxImg.style.transition = 'opacity 0.2s ease';
            setTimeout(() => {
                lightboxImg.src = src;
                lightboxImg.onload = () => {
                    lightboxImg.style.opacity = '1';
                };
                if (lightboxImg.complete) lightboxImg.style.opacity = '1';
            }, 150);
        }
    }
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage(null);
    if (e.key === 'ArrowLeft') prevImage(null);
});

// Touch/swipe support for lightbox
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
document.addEventListener('touchend', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
        dx < 0 ? nextImage(null) : prevImage(null);
    }
}, { passive: true });

// Preload adjacent images for smooth navigation
function preloadAdjacentImages() {
    const prev = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    const next = (currentImageIndex + 1) % portfolioImages.length;
    [prev, next].forEach(i => {
        const img = new Image();
        img.src = portfolioImages[i];
    });
}

// Product Color Switcher
function switchProduct(btn) {
    const card = btn.closest('article');
    if (!card) return;
    const img = card.querySelector('img');
    const title = card.querySelector('h3');
    const desc = card.querySelector('.product-desc-text');
    
    // Update active button state
    const buttons = card.querySelectorAll('.color-btn');
    buttons.forEach(b => {
        b.classList.remove('ring-primary');
        b.classList.add('ring-transparent');
    });
    btn.classList.remove('ring-transparent');
    btn.classList.add('ring-primary');

    // Data for products
    const name = btn.getAttribute('data-name');
    const descText = btn.getAttribute('data-desc');
    const imgSrc = btn.getAttribute('data-img');

    if (name && title) title.textContent = name;
    if (descText && desc) desc.textContent = descText;
    if (imgSrc && img) img.src = imgSrc;
}

// i18n strings for product modal
const modalI18n = {
    cs: { label: 'Účinek:', btn: 'REZERVACE HNED' },
    vi: { label: 'Công dụng:', btn: 'ĐẶT LỊCH NGAY' },
    en: { label: 'Effect:', btn: 'BOOK NOW' },
    de: { label: 'Wirkung:', btn: 'JETZT BUCHEN' },
    es: { label: 'Efecto:', btn: 'RESERVAR AHORA' }
};

// Product Detail Modal (for mobile)
function openProductModal(articleEl) {
    // Only open on mobile (max 640px)
    if (window.innerWidth >= 640) return;

    const img = articleEl.querySelector('img');
    const title = articleEl.querySelector('h3');
    const price = articleEl.querySelector('.product-price');
    const desc = articleEl.querySelector('.product-desc-text');
    const colorBtns = articleEl.querySelectorAll('.color-btn');

    const modal = document.getElementById('product-modal');
    if (!modal) return;

    const modalImg = document.getElementById('pm-img');
    const modalTitle = document.getElementById('pm-title');
    const modalPrice = document.getElementById('pm-price');
    const modalDesc = document.getElementById('pm-desc');
    const modalColors = document.getElementById('pm-colors');
    const modalLabel = document.getElementById('pm-label');

    if (modalImg && img) modalImg.src = img.src;
    if (modalTitle && title) modalTitle.textContent = title.textContent;
    if (modalPrice && price) modalPrice.textContent = price.textContent;
    if (modalDesc && desc) modalDesc.textContent = desc.textContent;

    // Apply i18n strings
    const lang = document.documentElement.lang || 'cs';
    const i18n = modalI18n[lang] || modalI18n['cs'];
    if (modalLabel) modalLabel.textContent = i18n.label;

    // Clone color buttons into modal
    if (modalColors) {
        modalColors.innerHTML = '';
        colorBtns.forEach(btn => {
            const clone = btn.cloneNode(true);
            clone.onclick = function() {
                // Switch product in original card
                switchProduct(btn);
                // Update modal display
                const newImg = articleEl.querySelector('img');
                const newTitle = articleEl.querySelector('h3');
                const newDesc = articleEl.querySelector('.product-desc-text');
                if (modalImg && newImg) modalImg.src = newImg.src;
                if (modalTitle && newTitle) modalTitle.textContent = newTitle.textContent;
                if (modalDesc && newDesc) modalDesc.textContent = newDesc.textContent;
                // Update active state in modal
                modalColors.querySelectorAll('.color-btn').forEach(b => {
                    b.classList.remove('ring-primary');
                    b.classList.add('ring-transparent');
                });
                clone.classList.remove('ring-transparent');
                clone.classList.add('ring-primary');
            };
            modalColors.appendChild(clone);
        });
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}


