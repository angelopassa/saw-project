import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './index.css';
import { useUserStore } from './stores/user';
import { isSupported, getMessaging, deleteToken } from 'firebase/messaging';
import { fire } from './api/firebase/config';
import { deleteTokenDbByUser } from './api/firebase/db';

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.mount('#app');

Notification.requestPermission()
    .then((res) => {
        console.log("Status: ", res);
    });

function registerToStateChange(registration: ServiceWorkerRegistration) {
    registration.installing!.addEventListener("statechange", () => {
        if (registration.active && registration.active.state === "activated") {
            if (useUserStore().user && !useUserStore().fcm_token)
                useUserStore().receiveToken();
        }
    });
}

navigator.serviceWorker.getRegistration("/firebase-cloud-messaging-push-scope")
    .then((registration) => {
        if (registration) {
            if (registration.installing)
                registerToStateChange(registration);
            else {
                registration.addEventListener("updatefound", () => {
                    registerToStateChange(registration);
                });
            }
        }
    });

if (Notification.permission == 'granted' && useUserStore().user && !useUserStore().fcm_token)
    useUserStore().receiveToken();

if ('permissions' in navigator) {
    navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
        notificationPerm.onchange = function () {
            console.log("Nuovo permesso: " + notificationPerm.state);
            if (notificationPerm.state == 'granted' && useUserStore().user)
                useUserStore().receiveToken();
            else if (notificationPerm.state != 'granted' && useUserStore().fcm_token) {
                isSupported()
                    .then((value) => {
                        if (value) {
                            let tok = useUserStore().fcm_token;
                            useUserStore().fcm_token = null;
                            localStorage.removeItem('fcm_token');
                            return Promise.all([
                                deleteTokenDbByUser(tok),
                                deleteToken(getMessaging(fire))
                                    .then(() => {
                                        console.log("Token eliminato con successo!");
                                    })
                                    .catch((err) => {
                                        console.log("Errore durante l'eliminazione del token: ", err);
                                    })
                            ])
                                .catch((errore) => {
                                    console.log("Errore: ", errore);
                                });
                        }
                    });
            }
        };
    });
}
