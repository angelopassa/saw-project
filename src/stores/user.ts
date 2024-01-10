import { defineStore } from 'pinia'
import { auth, fire } from '@/api/firebase/config';
import { createUserWithEmailAndPassword, type User, signOut, signInWithEmailAndPassword, updateProfile, updatePassword, onAuthStateChanged, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { deleteAccount, addUsersInfo, getUsersReviews, deleteTokenDb, getTokensByIdMedia, deleteTokenDbByUser, storeToken, isPresentDisplayName, getUsersFav } from '@/api/firebase/db';
import { getMessaging, isSupported, deleteToken, getToken } from 'firebase/messaging';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null as User | null,
        fcm_token: localStorage.getItem('fcm_token') ? JSON.parse(localStorage.getItem('fcm_token')!) : null as string | null
    }),
    actions: {
        async signup(email: string, password: string, username: string) {
            try {
                username = username.trim();
                if (await isPresentDisplayName(username))
                    throw new FirebaseError("auth/username-already-in-use", "Username già in uso!");

                let res = await createUserWithEmailAndPassword(auth, email, password);

                if (res) {
                    let color = colorList[Math.floor(Math.random() * colorList.length)];
                    await updateProfile(res.user, { photoURL: color });

                    await this.changeUsername(username);

                    Notification.requestPermission()
                        .then((res) => {
                            console.log("Status: ", res);
                        });

                    if (!this.fcm_token)
                        this.receiveToken();
                }

            } catch (error: unknown) {
                if (error instanceof FirebaseError)
                    return error.code;
            }
        },
        async login(email: string, password: string) {
            try {

                let res = await signInWithEmailAndPassword(auth, email, password);

                if (res) {
                    getUsersReviews();
                    getUsersFav();

                    Notification.requestPermission()
                        .then((res) => {
                            console.log("Status: ", res);
                        });

                    if (!this.fcm_token)
                        this.receiveToken();
                }

            } catch (error: unknown) {
                if (error instanceof FirebaseError)
                    return error.code;
            }
        },
        async logout() {
            isSupported()
                .then((value) => {
                    if (value) {
                        let tok = this.fcm_token;
                        this.fcm_token = null;
                        localStorage.removeItem('fcm_token');
                        const messaging = getMessaging(fire);
                        return Promise.all([
                            deleteTokenDbByUser(tok),
                            deleteToken(messaging)
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
                })
                .then(() => {
                    return signOut(auth);
                })
                .catch((error) => {
                    console.log("Errore: ", error);
                });
        },
        async changePassword(newPass: string) {
            try {
                await updatePassword(this.user!, newPass);
            }
            catch (error: unknown) {
                if (error instanceof FirebaseError)
                    return error.code;
            }
        },
        async changeUsername(newUser: string) {
            try {
                newUser = newUser.trim();
                if ((await isPresentDisplayName(newUser)) && newUser !== this.user.displayName)
                    throw new FirebaseError("auth/username-already-in-use", "Username già in uso!");
                await updateProfile(this.user!, { displayName: newUser });
                await addUsersInfo(this.user.uid, newUser);
            } catch (error: unknown) {
                if (error instanceof FirebaseError)
                    return error.code;
            }
        },
        async restorePassword(email: string) {
            try {
                await sendPasswordResetEmail(auth, email);
            } catch (error: unknown) {
                if (error instanceof FirebaseError)
                    return error.code;
            }
        },
        async deleteProfile() {
            try {
                let uid = this.user.uid;
                await deleteUser(this.user!);
                await deleteAccount(uid);
            } catch (error: unknown) {
                if (error instanceof FirebaseError)
                    return error.code;
            }
        },
        async receiveToken() {
            return isSupported()
                .then((value) => {
                    if (value) {
                        const messaging = getMessaging(fire);
                        getToken(messaging, { vapidKey: import.meta.env.VITE_FCM_VAPID_KEY })
                            .then((token) => {
                                console.log("Token assegnato: ", token);
                                storeToken(token);
                                useUserStore().fcm_token = token;
                                localStorage.setItem('fcm_token', JSON.stringify(token));
                            })
                    }
                });
        },
        async notifySub(id: string, url: string) {

            const send = async (token: string) => {
                const serverKey = import.meta.env.VITE_FCM_SERVER_KEY;

                const payload = {
                    notification: {
                        title: "Nuova Recensione",
                        body: "È stata aggiunta una nuova recensione ad uno dei media che hai nei preferiti",
                    },
                    data: {
                        url: url
                    },
                    to: token
                };

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `key=${serverKey}`
                };

                fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.failure == 1)
                            deleteTokenDb(token);
                        else
                            console.log("Messaggio inviato con successo: ", data)
                    })
                    .catch(error => console.error("Errore durante l'invio del messaggio: ", error));
            }

            getTokensByIdMedia(id)
                .then(tokens => {
                    tokens.forEach((token) => send(token));
                })
        }
    }
});

onAuthStateChanged(auth, (user) => {
    useUserStore().user = user;
    localStorage.setItem('user', JSON.stringify(user));
});

const colorList = [
    'red',
    'blue',
    'green',
    'gray',
    'emerald',
    'purple',
    'slate',
    'yellow',
    'orange',
    'zinc',
    'neutral',
    'stone',
    'amber',
    'lime',
    'teal',
    'cyan',
    'sky',
    'indigo',
    'violet',
    'fuchsia',
    'pink',
    'rose'
];