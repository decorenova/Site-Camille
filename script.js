// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Header Scroll Effect =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'white';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Card Hover Animation =====
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.card, .value-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Mobile Menu Toggle (optionnel) =====
// Si vous souhaitez ajouter un menu burger pour mobile plus tard
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Créer le bouton burger uniquement sur mobile
    if (window.innerWidth <= 768) {
        const burger = document.createElement('div');
        burger.classList.add('burger');
        burger.innerHTML = '☰';
        burger.style.cssText = `
            font-size: 1.8rem;
            cursor: pointer;
            color: var(--gold);
            display: none;
        `;
        
        if (window.innerWidth <= 768) {
            burger.style.display = 'block';
            nav.appendChild(burger);
            
            burger.addEventListener('click', () => {
                navLinks.classList.toggle('nav-active');
            });
        }
    }
};

// Initialiser au chargement
window.addEventListener('load', () => {
    console.log('Site Ovation Bijoux chargé avec succès !');
});

// ===== Performance: Lazy Loading des images (si vous ajoutez des images) =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback pour les navigateurs qui ne supportent pas le lazy loading natif
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}
