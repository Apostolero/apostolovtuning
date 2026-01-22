document.addEventListener("DOMContentLoaded", () => {
    /* --- Hamburger Menu Logic --- */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            // Toggle Nav
            navLinks.classList.toggle("open");
            hamburger.classList.toggle("toggle");

            // Animate Links
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = "";
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    /* --- Close Menu When Link Clicked (Mobile) --- */
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove("open");
                hamburger.classList.remove("toggle");
                links.forEach(l => l.style.animation = "");
            }
        });
    });

    /* --- Lightbox Logic (Gallery) --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item img'); // Select only images inside gallery items
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');

    let currentIndex = 0;
    const images = Array.from(galleryItems);

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Resume scrolling
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        // Add fade effect
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
            lightboxImg.style.opacity = 1;
        }, 200);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
            lightboxImg.style.opacity = 1;
        }, 200);
    }

    // Event Listeners for Images
    images.forEach((img, index) => {
        // Find the parent container (to verify it's a gallery item)
        const parent = img.closest('.gallery-item');
        if (parent) {
            parent.addEventListener('click', (e) => {
                // Prevent default if it's a link (though currently divs)
                e.preventDefault();
                openLightbox(index);
            });
        }
    });

    // Close Button
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Close on Outside Click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Navigation Buttons
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    /* --- FAQ Accordion Logic --- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items (optional - accordion style)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) otherItem.classList.remove('active');
            // });

            // Toggle current
            item.classList.toggle('active');
        });
    });

    /* --- REVIEWS SLIDER LOGIC --- */
    const track = document.querySelector('.reviews-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.slider-btn.next');
    const prevButton = document.querySelector('.slider-btn.prev');
    const dotsNav = document.querySelector('.slider-nav');
    const dots = Array.from(dotsNav.children);

    // Initial State
    let currentSlideIndex = 0;
    const slideIntervalTime = 6000; // 6 seconds
    let slideInterval;

    const updateSliderPosition = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (slideWidth * currentSlideIndex) + 'px)';
        
        // Update dots
        dots.forEach(d => d.classList.remove('current-dot'));
        dots[currentSlideIndex].classList.add('current-dot');
    };

    const moveToNextSlide = () => {
        currentSlideIndex++;
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        updateSliderPosition();
    };

    const moveToPrevSlide = () => {
        currentSlideIndex--;
        if (currentSlideIndex < 0) {
            currentSlideIndex = slides.length - 1;
        }
        updateSliderPosition();
    };

    const startAutoPlay = () => {
        slideInterval = setInterval(moveToNextSlide, slideIntervalTime);
    };

    const stopAutoPlay = () => {
        clearInterval(slideInterval);
    };

    // Event Listeners
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            moveToNextSlide();
            stopAutoPlay(); // Restart timer on interaction
            startAutoPlay();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            moveToPrevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            updateSliderPosition();
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Pause on Hover
    const sliderContainer = document.querySelector('.reviews-slider-wrapper');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Touch / Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (track) {
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        });
    }

    function handleSwipe() {
        const threshold = 50; // Minimum distance for swipe
        if (touchEndX < touchStartX - threshold) {
            moveToNextSlide();
        }
        if (touchEndX > touchStartX + threshold) {
            moveToPrevSlide();
        }
    }

    // Handle Window Resize (Recalculate Width)
    window.addEventListener('resize', updateSliderPosition);

    // Initialize
    startAutoPlay();
});