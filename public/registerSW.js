if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/'
    })
        .then((registration) => {
            console.log('Service Worker Root registrato con successo:', registration);
        })
        .catch((error) => {
            console.error('Errore durante la registrazione del Service Worker:', error);
        });
    
    navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/firebase-cloud-messaging-push-scope'
    })
        .then((registration) => {
            console.log('Service Worker FCM registrato con successo:', registration);
        })
        .catch((error) => {
            console.error('Errore durante la registrazione del Service Worker:', error);
        });
}