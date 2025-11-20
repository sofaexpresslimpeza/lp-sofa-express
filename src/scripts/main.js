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
