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
    window.addEventListener('resize', updateDesktopState);
}

const aboutCarousel = document.querySelector('.about-swiper');

if (aboutCarousel && window.Swiper) {
    new Swiper(aboutCarousel, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        allowTouchMove: true,
        navigation: {
            nextEl: '.about-button-next',
            prevEl: '.about-button-prev',
        },
    });
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
        mobileAutoplayQuery.addEventListener('change', toggleAboutQualitiesAutoplay);
    } else if (typeof mobileAutoplayQuery.addListener === 'function') {
        mobileAutoplayQuery.addListener(toggleAboutQualitiesAutoplay);
    }
}

const servicesCarousel = document.querySelector('.services-swiper');

if (servicesCarousel && window.Swiper) {
    new Swiper(servicesCarousel, {
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
        testimonialsMobileQuery.addEventListener('change', toggleTestimonialsAutoplay);
    } else if (typeof testimonialsMobileQuery.addListener === 'function') {
        testimonialsMobileQuery.addListener(toggleTestimonialsAutoplay);
    }
}
