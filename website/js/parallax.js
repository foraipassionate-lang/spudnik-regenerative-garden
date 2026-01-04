/**
 * SPUDNIK FOREST PORTAL - Parallax System
 * Handles scroll-driven and mouse-driven parallax effects
 */

class ParallaxController {
    constructor() {
        this.layers = document.querySelectorAll('[data-parallax]');
        this.ticking = false;
        this.scrollY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.centerX = window.innerWidth / 2;
        this.centerY = window.innerHeight / 2;
        this.enabled = !this.isMobile();

        if (this.enabled) {
            this.init();
        }
    }

    isMobile() {
        return window.innerWidth < 768 || 'ontouchstart' in window;
    }

    init() {
        // Scroll parallax
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });

        // Mouse parallax
        document.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });

        // Handle resize
        window.addEventListener('resize', () => {
            this.centerX = window.innerWidth / 2;
            this.centerY = window.innerHeight / 2;
            this.enabled = !this.isMobile();
        });

        // Initial update
        this.updateScroll();
    }

    onScroll() {
        this.scrollY = window.scrollY;
        this.requestTick('scroll');
    }

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.requestTick('mouse');
    }

    requestTick(type) {
        if (!this.ticking && this.enabled) {
            requestAnimationFrame(() => {
                if (type === 'scroll') {
                    this.updateScroll();
                } else {
                    this.updateMouse();
                }
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScroll() {
        this.layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.parallax) || 0;
            const yOffset = this.scrollY * speed;
            layer.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        });
    }

    updateMouse() {
        const offsetX = (this.mouseX - this.centerX) / this.centerX;
        const offsetY = (this.mouseY - this.centerY) / this.centerY;

        this.layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.parallaxMouse) || parseFloat(layer.dataset.parallax) || 0;
            const moveX = offsetX * depth * 15;
            const moveY = offsetY * depth * 10;

            // Combine with scroll transform
            const scrollSpeed = parseFloat(layer.dataset.parallax) || 0;
            const scrollOffset = this.scrollY * scrollSpeed;

            layer.style.transform = `translate3d(${moveX}px, ${scrollOffset + moveY}px, 0)`;
        });
    }
}

// Smooth scroll for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for fade-in animations
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        if (this.elements.length > 0) {
            this.init();
        }
    }

    init() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(el => observer.observe(el));
    }
}

// Initialize all parallax systems when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.parallaxController = new ParallaxController();
    window.smoothScroll = new SmoothScroll();
    window.scrollReveal = new ScrollReveal();
});
