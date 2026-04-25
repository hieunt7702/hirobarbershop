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
            rootMargin: '0px 0px -15% 0px',
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
    "assets/images/portfolio-new-5.jpg",
    "assets/images/portfolio-new-7.jpg",
    "assets/images/portfolio-new-11.jpg",
    "assets/images/portfolio-new-4.jpg",
    "assets/images/portfolio-new-6.jpg",
    "assets/images/portfolio-new-8.jpg",
    "assets/images/portfolio-new-10.jpg",
    "assets/images/portfolio-new-12.jpg"
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
    const lightboxCounter = document.getElementById('lightbox-counter');
    if (lightboxImg && lightboxCounter) {
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
            lightboxImg.src = portfolioImages[currentImageIndex];
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = '1';
            };
            // In case image is cached and onload doesn't fire
            if (lightboxImg.complete) lightboxImg.style.opacity = '1';
        }, 150);
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${portfolioImages.length}`;
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
