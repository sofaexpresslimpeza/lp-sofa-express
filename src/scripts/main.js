const initAOSAnimations = () => {
    if (window.AOS) {
        AOS.init({
            duration: 700,
            easing: 'ease-out-quart',
            offset: 80,
            once: false,
            mirror: false,
        });
    }
};

const refreshAOSAnimations = () => {
    if (window.AOS) {
        AOS.refresh();
    }
};

initAOSAnimations();
window.addEventListener('load', refreshAOSAnimations);

const processCarousel = document.querySelector('.process-swiper');

if (processCarousel && window.Swiper) {
    const processSwiper = new Swiper(processCarousel, {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: false,
        allowTouchMove: true,
        pagination: {
            el: '.process-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.process-button-next',
            prevEl: '.process-button-prev',
        },
        breakpoints: {
            769: {
                slidesPerView: 4,
                spaceBetween: 24,
                allowTouchMove: false,
            },
        },
    });

    const updateDesktopState = () => {
        const isDesktop = window.matchMedia('(min-width: 769px)').matches;

        if (isDesktop) {
            processSwiper.slideTo(0, 0);
        }
    };

    updateDesktopState();
    window.addEventListener('resize', () => {
        updateDesktopState();
        refreshAOSAnimations();
    });

    processSwiper.on('slideChangeTransitionEnd', refreshAOSAnimations);
    refreshAOSAnimations();

    const processCards = Array.from(document.querySelectorAll('.process-card'));
    const observedCards = new Set();

    const activateProgressAnimation = (card) => {
        if (observedCards.has(card)) return;
        observedCards.add(card);
        card.classList.add('is-progress-visible');
    };

    if ('IntersectionObserver' in window) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                    activateProgressAnimation(entry.target);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        processCards.forEach(card => progressObserver.observe(card));
    } else {
        processCards.forEach(card => activateProgressAnimation(card));
    }
}

const aboutCarousel = document.querySelector('.about-swiper');

if (aboutCarousel && window.Swiper) {
    const aboutSwiper = new Swiper(aboutCarousel, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        allowTouchMove: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.about-button-next',
            prevEl: '.about-button-prev',
        },
    });

    aboutSwiper.on('slideChangeTransitionEnd', refreshAOSAnimations);
    refreshAOSAnimations();
}

const aboutQualitiesCarousel = document.querySelector('.about-qualities-swiper');

if (aboutQualitiesCarousel && window.Swiper) {
    const aboutQualitiesSwiper = new Swiper(aboutQualitiesCarousel, {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        allowTouchMove: true,
        autoplay: {
            enabled: false,
            delay: 3500,
            disableOnInteraction: false,
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
        },
    });

    aboutQualitiesSwiper.on('slideChangeTransitionEnd', refreshAOSAnimations);

    const mobileAutoplayQuery = window.matchMedia('(max-width: 768px)');

    const toggleAboutQualitiesAutoplay = () => {
        if (!aboutQualitiesSwiper.autoplay) {
            return;
        }

        if (mobileAutoplayQuery.matches) {
            aboutQualitiesSwiper.autoplay.start();
        } else {
            aboutQualitiesSwiper.autoplay.stop();
        }
    };

    toggleAboutQualitiesAutoplay();
    if (typeof mobileAutoplayQuery.addEventListener === 'function') {
        mobileAutoplayQuery.addEventListener('change', () => {
            toggleAboutQualitiesAutoplay();
            refreshAOSAnimations();
        });
    } else if (typeof mobileAutoplayQuery.addListener === 'function') {
        mobileAutoplayQuery.addListener(() => {
            toggleAboutQualitiesAutoplay();
            refreshAOSAnimations();
        });
    }
    refreshAOSAnimations();
}

const servicesCarousel = document.querySelector('.services-swiper');

if (servicesCarousel && window.Swiper) {
    const servicesSwiper = new Swiper(servicesCarousel, {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: false,
        allowTouchMove: true,
        navigation: {
            nextEl: '.services-button-next',
            prevEl: '.services-button-prev',
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 32,
            },
        },
    });

    servicesSwiper.on('slideChangeTransitionEnd', refreshAOSAnimations);
    refreshAOSAnimations();
}

const testimonialsCarousel = document.querySelector('.testimonials-swiper');

if (testimonialsCarousel && window.Swiper) {
    const testimonialsSwiper = new Swiper(testimonialsCarousel, {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        allowTouchMove: true,
        autoplay: {
            enabled: false,
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.testimonials-button-next',
            prevEl: '.testimonials-button-prev',
        },
    });

    const testimonialsMobileQuery = window.matchMedia('(max-width: 768px)');

    const toggleTestimonialsAutoplay = () => {
        if (!testimonialsSwiper.autoplay) {
            return;
        }

        if (testimonialsMobileQuery.matches) {
            testimonialsSwiper.autoplay.start();
        } else {
            testimonialsSwiper.autoplay.stop();
        }
    };

    toggleTestimonialsAutoplay();

    if (typeof testimonialsMobileQuery.addEventListener === 'function') {
        testimonialsMobileQuery.addEventListener('change', () => {
            toggleTestimonialsAutoplay();
            refreshAOSAnimations();
        });
    } else if (typeof testimonialsMobileQuery.addListener === 'function') {
        testimonialsMobileQuery.addListener(() => {
            toggleTestimonialsAutoplay();
            refreshAOSAnimations();
        });
    }

    testimonialsSwiper.on('slideChangeTransitionEnd', refreshAOSAnimations);
    refreshAOSAnimations();
}

const promotionBanner = document.querySelector('.promotion');

if (promotionBanner) {
    const promotionTitle = promotionBanner.querySelector('.promotion-title');
    const promotionDescription = promotionBanner.querySelector('.promotion-description');
    const unlockPrize = () => {
        if (!promotionTitle || !promotionDescription) {
            return;
        }

        if (promotionBanner.dataset.unlocked === 'true') {
            return;
        }

        promotionBanner.dataset.unlocked = 'true';
        promotionBanner.classList.add('is-unlocked');
        promotionBanner.setAttribute('aria-pressed', 'true');
        promotionTitle.textContent = 'Parabéns, você ganhou!';
        promotionDescription.textContent = '1x lavagem grátis de almofada';
    };

    promotionBanner.addEventListener('click', unlockPrize);
    promotionBanner.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            unlockPrize();
        }
    });
}

const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuButton = document.querySelector('.button-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-nav a');

const openMobileMenu = () => {
    if (mobileMenu) {
        mobileMenu.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
};

const closeMobileMenu = () => {
    if (mobileMenu) {
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
    }
};

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', openMobileMenu);
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

if (mobileMenuLinks.length > 0) {
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
}

