const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `sofa-express-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
    './',
    './index.html',
    './public/logo-sofa-express.svg',
    './src/styles/index.css',
    './src/styles/reset.css',
    './src/styles/token.css',
    './src/styles/global.css',
    './src/sections/hero.css',
    './src/sections/about.css',
    './src/sections/process.css',
    './src/sections/services.css',
    './src/sections/automotive.css',
    './src/sections/promo.css',
    './src/sections/testimonials.css',
    './src/sections/offer.css',
    './src/sections/footer.css',
    './src/sections/index.css',
    './src/components/button.css',
    './src/components/text.css',
    './src/components/patterns.css',
    './src/components/index.css',
    './src/assets/sofas/sofa-hero.png',
    './src/assets/sofas/sofa-offer.png',
    './src/assets/sofas/assessment-01.jpg',
    './src/assets/sofas/assessment-02.jpg',
    './src/assets/sofas/assessment-03.jpg',
    './src/assets/sofas/sofa-promo.png',
    './src/assets/services/sofa-clean.jpg',
    './src/assets/services/armchair-clean.jpg',
    './src/assets/services/bed-clean.jpg',
    './src/assets/services/carpet-clean.png',
    './src/assets/services/upholstered-clean.png',
    './src/assets/services/car-clean.jpg',
    './src/assets/icons/gift.svg',
    './src/assets/icons/menu.svg',
    './src/assets/icons/whatsapp.svg',
    './src/assets/icons/instagram.svg',
    './src/assets/icons/arrow-left.svg',
    './src/assets/icons/arrow-right.svg',
    './src/assets/icons/aplication.svg',
    './src/assets/icons/inspect.svg',
    './src/assets/icons/vacuum-cleaner.svg',
    './src/assets/icons/check.svg',
    './src/assets/icons/star.svg',
    './src/scripts/main.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheKeys) => Promise.all(
            cacheKeys
                .filter((cacheKey) => cacheKey.startsWith('sofa-express-') && cacheKey !== CACHE_NAME)
                .map((cacheKey) => caches.delete(cacheKey))
        ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    const requestURL = new URL(event.request.url);

    if (requestURL.origin === self.location.origin) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                const fetchAndCache = fetch(event.request)
                    .then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            const clonedResponse = networkResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedResponse));
                        }
                        return networkResponse;
                    })
                    .catch(() => cachedResponse);

                return cachedResponse || fetchAndCache;
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
