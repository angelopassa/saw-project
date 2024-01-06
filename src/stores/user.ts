import { defineStore } from 'pinia'
import { auth, fire } from '@/api/firebase/config';
import { createUserWithEmailAndPassword, type User, signOut, signInWithEmailAndPassword, updateProfile, updatePassword, onAuthStateChanged, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { deleteAccount, addUsersInfo, updateUserDisplayName, getUsersReviews, deleteTokenDb, getTokensByIdMedia, deleteTokenDbByUser, storeToken } from '@/api/firebase/db';
import { getMessaging, isSupported, deleteToken, getToken } from 'firebase/messaging';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null as User | null,
        fcm_token: localStorage.getItem('fcm_token') ? JSON.parse(localStorage.getItem('fcm_token')!) : null as string | null
    }),
    actions: {
        async signup(email: string, password: string, username: string) {
            try {
                let res = await createUserWithEmailAndPassword(auth, email, password);
                await this.changeUsername(username);
                if (res) await addUsersInfo(res.user.uid, username);
            } catch (error: unknown) {
                if (error instanceof FirebaseError)
                    return error.code;
            }
        },
        async login(email: string, password: string) {
            try {

                await signInWithEmailAndPassword(auth, email, password);
                await getUsersReviews();

                Notification.requestPermission()
                    .then((res) => {
                        console.log("Status: ", res);
                    });

                if (!this.fcm_token)
                    this.receiveToken();

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
                await updateProfile(this.user!, { displayName: newUser });
                await updateUserDisplayName(this.user.uid, newUser);
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
                        getToken(messaging, { vapidKey: "BPwPKU_nGOjy5OCeSPtk-ETmvrPAfZL_4fmnv-vh1AWo6xQI4IMlbJdnxM736teCVrTRxmuZyYseqUyQ-VO-mWg" })
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
                const serverKey = 'AAAAohAHtFI:APA91bEkU5UgXZKqQWYq6_wnBTqJF8sTX2_hA7pVpuoxjLQnf66yiWhlff2zFvoNUMFWHphY7CvRXoi6aUrHyL-Y3gdAgDG6Aw1unLFllZXyNE3zOQEF2aofRcMsf-dIaAuGOFOcoUTM';

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