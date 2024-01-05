import { defineStore } from 'pinia'
import { auth, fire } from '@/api/firebase/config';
import { createUserWithEmailAndPassword, type User, signOut, signInWithEmailAndPassword, updateProfile, updatePassword, onAuthStateChanged, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { deleteAccount, addUsersInfo, updateUserDisplayName, getUsersFav, getUsersReviews } from '@/api/firebase/db';
import { getMessaging, getToken, isSupported, deleteToken } from 'firebase/messaging';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null as User | null
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

                while (navigator.serviceWorker.controller?.state != "activated");
                
                isSupported()
                    .then((value) => {
                        if (value) {
                            const messaging = getMessaging(fire);
                            getToken(messaging, { vapidKey: "BPwPKU_nGOjy5OCeSPtk-ETmvrPAfZL_4fmnv-vh1AWo6xQI4IMlbJdnxM736teCVrTRxmuZyYseqUyQ-VO-mWg" })
                                .catch((error) => null);
                        }
                    });

                await signInWithEmailAndPassword(auth, email, password);
                await getUsersReviews();
                let fav = await getUsersFav();

                isSupported()
                    .then((value) => {
                        if (value) {
                            const messaging = getMessaging(fire);
                            getToken(messaging, { vapidKey: "BPwPKU_nGOjy5OCeSPtk-ETmvrPAfZL_4fmnv-vh1AWo6xQI4IMlbJdnxM736teCVrTRxmuZyYseqUyQ-VO-mWg" })
                                .then((token) => console.log("Token assegnato: ", token))
                                .catch((error) => console.log("Errore: ", error));
                        }
                    });

                for (let id in fav) {
                    if (fav[id].notify)
                        this.subToTopic(id);
                }

            } catch (error: unknown) {
                if (error instanceof FirebaseError)
                    return error.code;
            }
        },
        async logout() {
            await signOut(auth);
            isSupported()
                .then((value) => {
                    if (value) {
                        const messaging = getMessaging(fire);
                        getToken(messaging, { vapidKey: "BPwPKU_nGOjy5OCeSPtk-ETmvrPAfZL_4fmnv-vh1AWo6xQI4IMlbJdnxM736teCVrTRxmuZyYseqUyQ-VO-mWg" })
                            .then((token) => {
                                deleteToken(messaging)
                                    .then(() => {
                                        console.log("Token eliminato con successo!");
                                    })
                                    .catch((err) => {
                                        console.log("Errore durante l'eliminazione del token: ", err);
                                    })
                            })
                            .catch((errore) => {
                                console.log("Errore: ", errore);
                            });
                    }
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
        async subToTopic(id: string): Promise<string> {
            return isSupported()
                .then((supported) => {
                    if (supported) {
                        const messaging = getMessaging(fire);
                        return getToken(messaging, { vapidKey: "BPwPKU_nGOjy5OCeSPtk-ETmvrPAfZL_4fmnv-vh1AWo6xQI4IMlbJdnxM736teCVrTRxmuZyYseqUyQ-VO-mWg" });
                    } else {
                        throw new FirebaseError("messaging/not-supported", "Il browser non supporta FCM");
                    }
                })
                .then((token) => {
                    return subscribeToTopic(token, id);
                })
                .then(() => {
                    console.log("Eseguito!");
                    return 'Success';
                })
                .catch((error) => {
                    return error instanceof FirebaseError ? error.code : error;
                });
        },
        async unsubFromTopic(id: string): Promise<string> {
            return isSupported()
                .then((supported) => {
                    if (supported) {
                        const messaging = getMessaging(fire);
                        return getToken(messaging, { vapidKey: "BPwPKU_nGOjy5OCeSPtk-ETmvrPAfZL_4fmnv-vh1AWo6xQI4IMlbJdnxM736teCVrTRxmuZyYseqUyQ-VO-mWg" });
                    } else {
                        throw new FirebaseError("messaging/not-supported", "Il browser non supporta FCM");
                    }
                })
                .then((token) => {
                    return unSubscribeFromTopic(token, id);
                })
                .then(() => {
                    console.log("Eseguito!");
                    return 'Success';
                })
                .catch((error) => {
                    return error instanceof FirebaseError ? error.code : error;
                });
        },
        async notifySub(id: string, url: string) {
            const serverKey = 'AAAAohAHtFI:APA91bEkU5UgXZKqQWYq6_wnBTqJF8sTX2_hA7pVpuoxjLQnf66yiWhlff2zFvoNUMFWHphY7CvRXoi6aUrHyL-Y3gdAgDG6Aw1unLFllZXyNE3zOQEF2aofRcMsf-dIaAuGOFOcoUTM';

            const payload = {
                notification: {
                    title: 'Nuova Recensione',
                    body: "È stata aggiunta una nuova recensione ad uno dei media che hai nei preferiti",
                },
                data: {
                    url: url
                },
                to: `/topics/${id}`
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
                .then(data => console.log("Messaggio inviato con successo:", data))
                .catch(error => console.error("Errore durante l'invio del messaggio:", error));

        }
    }
});

onAuthStateChanged(auth, (user) => {
    useUserStore().user = user;
    localStorage.setItem('user', JSON.stringify(user));
});

const subscribeToTopic = async (token: any, topic: string) => {
    const response = await fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=AAAAohAHtFI:APA91bEkU5UgXZKqQWYq6_wnBTqJF8sTX2_hA7pVpuoxjLQnf66yiWhlff2zFvoNUMFWHphY7CvRXoi6aUrHyL-Y3gdAgDG6Aw1unLFllZXyNE3zOQEF2aofRcMsf-dIaAuGOFOcoUTM`,
        },
    });

    if (response.ok) {
        console.log(`Iscritto al topic: ${topic}`);
    } else {
        console.log(`Errore durante l'iscrizione al topic ${topic}:`, await response.text());
    }
};


const unSubscribeFromTopic = async (token: any, topic: string) => {
    const response = await fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=AAAAohAHtFI:APA91bEkU5UgXZKqQWYq6_wnBTqJF8sTX2_hA7pVpuoxjLQnf66yiWhlff2zFvoNUMFWHphY7CvRXoi6aUrHyL-Y3gdAgDG6Aw1unLFllZXyNE3zOQEF2aofRcMsf-dIaAuGOFOcoUTM`,
        },
    });

    if (response.ok) {
        console.log(`Disiscritto dal topic: ${topic}`);
    } else {
        console.log(`Errore durante la disiscrizione al topic ${topic}:`, await response.text());
    }
};