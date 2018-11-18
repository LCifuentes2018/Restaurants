navigator.serviceWorker.register('./sw.js').then(function (reg) {
    console.log('Sucessfull:SW has been registered.');

    if (!navigator.serviceWorker.controller) {
        return;
    }

    if (reg.waiting) {
        navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
    }

    if (reg.installing) {
        navigator.serviceWorker.addEventListener('statechange', function () {
            if (navigator.serviceWorker.controller.state == 'installed') {
                navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
            }
        });
    }

    reg.addEventListener('updatefound', function () {
        navigator.serviceWorker.addEventListener('statechange', function () {
            if (navigator.serviceWorker.controller.state == 'installed') {
                navigator.serviceWorker.controller.postMessage({ action: 'skipWaiting' });
            }
        });
    });

}).catch(function () {
    console.log('Failed:SW hasn´t been registered');
});

var refreshing;
navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
})

// Request a one-off sync:
navigator.serviceWorker.ready.then(function (swRegistration) {
    return swRegistration.sync.register('mySync');
});

function onOnline() {
    console.log('Online');
    DBHelper.submitOfflineReviews();
}

function onOffline() {
    console.log('Offline');
}

window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);