document.addEventListener('DOMContentLoaded', () => {
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
const galleryImages = document.querySelectorAll('.gallery-item img'); // Всички снимки в масив
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-nav.prev');
const nextBtn = document.querySelector('.lightbox-nav.next');

let currentIndex = 0; // Индекс на текущата отворена снимка
let scrollPosition = 0;

// Функция за отваряне на конкретна снимка по индекс
function showImage(index) {
    if (index >= galleryImages.length) {
        currentIndex = 0; // Завъртаме отначало
    } else if (index < 0) {
        currentIndex = galleryImages.length - 1; // Отиваме на последната
    } else {
        currentIndex = index;
    }
    
    // Взимаме source на новия индекс
    lightboxImg.src = galleryImages[currentIndex].src;
}

// Слушатели за стрелките
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Спира затварянето на лайтбокса
    showImage(currentIndex - 1);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
});

// Функция за спиране на скрола (със запазване на позицията)
function disableScroll() {
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.overflow = 'hidden'; // Спираме скрола на Desktop
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
}

// Функция за пускане на скрола (с връщане на позицията)
function enableScroll() {
    document.body.style.overflow = ''; // Пускаме скрола на Desktop
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
}

// Отваряне (модифицирано да запомни индекса)
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        lightbox.classList.add('active');
        currentIndex = index; // Запомняме коя снимка сме цъкнали
        showImage(currentIndex);
        disableScroll();
    });
});

// Затваряне при клик на X
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    enableScroll();
});

// Затваряне при клик извън снимката (но не и върху стрелките)
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
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