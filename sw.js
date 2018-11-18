const cacheName = 'restaurant1';
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(cacheName).then(function (cache) {
			return cache.addAll([
				'/',
				'index.html',
				'restaurant.html',
				'css/styles.css',
				'js/dbhelper.js',
				'js/main.js',
				'js/restaurant_info.js',
				'js/service_worker_register.js',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg',
			]);
		})
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName.startsWith('restaurant-') && cacheName != cacheName;
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', (event) => {
	console.log(event.request);
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {
				return response;
			}
			console.log('Network request for ', event.request.url);
			return fetch(event.request).then(networkResponse => {
				if (networkResponse.status === 404) {
					return;
				}
				return caches.open(cacheName).then(cache => {
					cache.put(event.request.url, networkResponse.clone());
					return networkResponse;
				})
			})
		}).catch(error => {
			console.log('Error:', error);
			return;
		})
	);
});

self.addEventListener('message', (event) => {
	console.log(event);

	if (event.data.action === 'skipWaiting') {
		self.skipWaiting();
	}
});

self.addEventListener('sync', function (event) {
	if (event.tag == 'mySync') {
		const DBOpenRequest = indexedDB.open('restaurants', 1);
		DBOpenRequest.onsuccess = function (e) {
			db = DBOpenRequest.result;
			let tx = db.transaction('offline-reviews', 'readwrite');
			let store = tx.objectStore('offline-reviews');
			let request = store.getAll();
			request.onsuccess = function () {
				for (let i = 0; i < request.result.length; i++) {
					fetch(`http://localhost:8000/`, {
						body: JSON.stringify(request.result[i]),
						cache: 'no-cache',
						credentials: 'same-origin',
						headers: {
							'content-type': 'application/json'
						},
						method: 'POST',
						mode: 'cors',
						redirect: 'follow',
						referrer: 'no-referrer',
					})
						.then(response => {
							return response.json();
						})
						.then(data => {
							let tx = db.transaction('all-reviews', 'readwrite');
							let store = tx.objectStore('all-reviews');
							let request = store.add(data);
							request.onsuccess = function (data) {
								let tx = db.transaction('offline-reviews', 'readwrite');
								let store = tx.objectStore('offline-reviews');
								let request = store.clear();
								request.onsuccess = function () { };
								request.onerror = function (error) {
									console.log('Offline reviews objectStore', error);
								}
							};
							request.onerror = function (error) {
								console.log('Add objectStore to IDB', error);
							}
						})
						.catch(error => {
							console.log('Unable to make a POST fetch', error);
						})
				}
			}
			request.onerror = function (e) {
				console.log(e);
			}
		}
		DBOpenRequest.onerror = function (e) {
			console.log(e);
		}
	}
});