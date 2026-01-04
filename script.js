// Force scroll to top on page load (Aggressive fix for Safari)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
    // Double check scroll position
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Mobile Nav Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('toggle');
    
    links.forEach(link => {
        link.classList.toggle('fade');
    });
});

// Затваряне на менюто при клик на линк
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('toggle');
    });
});

// Lightbox Logic (Галерия на цял екран)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery-item img');
const closeBtn = document.querySelector('.lightbox-close');

let scrollPosition = 0;

// Функция за спиране на скрола (със запазване на позицията)
function disableScroll() {
    scrollPosition = window.scrollY; // Запомняме къде сме
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`; // Фиксираме визуално на същото място
    document.body.style.width = '100%';
}

// Функция за пускане на скрола (с връщане на позицията)
function enableScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition); // Връщаме се там, където бяхме
}

// Отваряне
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src; 
        disableScroll();
    });
});

// Затваряне при клик на X
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    enableScroll();
});

// Затваряне при клик извън снимката
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
        enableScroll();
    }
});

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});