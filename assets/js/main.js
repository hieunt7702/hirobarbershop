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
