const CACHE_NAME = 'nhanhchitieu-v2' // Increment version to force update
const urlsToCache = [
    '/manifest.json',
]

// Install event - cache essential files
self.addEventListener('install', (event) => {
    // Skip waiting to activate immediately
    self.skipWaiting()

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName)
                        return caches.delete(cacheName)
                    }
                })
            )
        }).then(() => self.clients.claim())
    )
})

// Fetch event - Network first, fallback to cache (better for development)
self.addEventListener('fetch', (event) => {
    // Don't cache API calls or hot-reload
    if (event.request.url.includes('/_next/') ||
        event.request.url.includes('/api/') ||
        event.request.method !== 'GET') {
        return event.respondWith(fetch(event.request))
    }

    event.respondWith(
        // Network first strategy
        fetch(event.request)
            .then((response) => {
                // Clone and cache the response
                if (response && response.status === 200) {
                    const responseToCache = response.clone()
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache)
                    })
                }
                return response
            })
            .catch(() => {
                // Fallback to cache if network fails
                return caches.match(event.request)
            })
    )
})
