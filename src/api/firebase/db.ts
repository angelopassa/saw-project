import { db } from './config';
import { Timestamp, addDoc, doc, getDoc, setDoc, collection, query, where, getDocs, type DocumentData, updateDoc, deleteDoc, orderBy, type OrderByDirection, onSnapshot, deleteField, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useUserStore } from '@/stores/user';
import { type Unsubscribe } from 'firebase/database';
import _ from "lodash";

const favCollName = 'preferiti';
const reviewCollName = 'recensioni';
const userCollName = 'utenti';
const notifyCollName = 'notifiche';

let datafromCache = true;

async function isPresentDisplayName(displayName: string): Promise<boolean> {
    let q = query(collection(db, userCollName), where("displayName", "==", displayName));
    let d = await getDocs(q);
    return !d.empty;
}

async function addUsersInfo(uid: string, displayName: string) {
    let data = {
        displayName
    }
    await setDoc(doc(db, userCollName, uid), data, { merge: true });
}

async function addToFav(idFilm: number, filmName: string, type: string, posterPath?: string, voteAverage?: number): Promise<unknown> {
    let userId: string = useUserStore().user.uid!;
    let data = {
        [idFilm]: {
            filmName,
            type,
            posterPath: posterPath ? posterPath : null,
            voteAverage: voteAverage ? voteAverage : null,
            notify: false
        }
    };
    return new Promise((res, rej) => {
        try {
            let unsubListener: Unsubscribe = onSnapshot(query(collection(db, favCollName), where("__name__", "==", userId)), {}, (snapshot) => {
                snapshot.docChanges().forEach((changes) => {
                    let data = changes.doc.data();
                    if (data[idFilm]) {
                        unsubListener();
                        res("Success");
                    }
                })
            });
            setDoc(doc(db, favCollName, userId), data, { merge: true });
        } catch (error) {
            rej(error);
        }
    });
}

async function setNotify(id: number | string, flag: boolean): Promise<{ message: string, fromCache: boolean }> {
    let userId: string = useUserStore().user.uid!;
    return new Promise((res, rej) => {
        try {
            let unsubListener: Unsubscribe = onSnapshot(query(collection(db, favCollName), where("__name__", "==", userId)), {}, (snapshot) => {
                snapshot.docChanges().forEach((changes) => {
                    let data = changes.doc.data();
                    if (data[id]) {
                        unsubListener();
                        setSubscription(id.toString(), flag)
                            .then((response) => res(response))
                            .catch((error) => rej(error));
                    }
                })
            });
            let data = {
                [id]: {
                    notify: flag
                }
            }
            setDoc(doc(db, favCollName, userId), data, { merge: true });
        } catch (error) {
            rej(error);
        }
    });
}

async function getUsersFav(): Promise<{ data: DocumentData | null, fromCache: boolean }> {
    try {
        let userId: string = useUserStore().user.uid!;
        onSnapshot(doc(db, favCollName, userId), { includeMetadataChanges: true }, (snapshot) => {
            datafromCache = snapshot.metadata.fromCache;
        });
        let docum = await getDoc(doc(db, favCollName, userId));
        if (docum.exists() && Object.keys(docum.data()).length != 0) return { data: docum.data(), fromCache: datafromCache };
        return { data: null, fromCache: datafromCache };
    } catch (error) {
        console.log(error);
        return { data: null, fromCache: datafromCache };
    }
}

async function isPresentFav(id: string): Promise<boolean> {
    let fav = await getUsersFav();
    for (let idx in fav.data)
        if (idx == id) return true;
    return false;
}

async function addReview(idPage: string, idMedia: string, titleRev: string, desc: string, dataVis: Date, vote: number, dataRev: number, posterPath: string, nameMedia: string, type: string, season: number | null = null, episode: number | null = null): Promise<unknown> {
    try {
        let utente = useUserStore().user;
        let userId: string = utente.uid!;
        let userColor: string = utente.photoURL;
        const q = query(collection(db, reviewCollName), where("idMedia", "==", idMedia), where("userId", "==", userId));
        let docum = await getDocs(q);
        let data = {
            userId,
            userColor,
            dataRev: Timestamp.fromMillis(dataRev),
            dataVis: Timestamp.fromDate(dataVis),
            idPage,
            idMedia,
            desc,
            titleRev,
            nameMedia,
            vote: +vote,
            season: season ? +season : null,
            episode: episode ? +episode : null,
            type,
            posterPath
        }
        return new Promise((res, rej) => {
            try {
                let unsubListener: Unsubscribe = onSnapshot(collection(db, reviewCollName), {}, (snapshot) => {
                    snapshot.docChanges().forEach((changes) => {
                        let dataC = changes.doc.data();
                        if (_.isEqual(dataC, data)) {
                            unsubListener();
                            res("Success");
                        }
                    })
                });
                if (docum.size != 0) {
                    let id = docum.docs[0].id;
                    updateDoc(doc(db, reviewCollName, id), data);
                }
                else addDoc(collection(db, reviewCollName), data);
            } catch (error) {
                rej(error);
            }
        });

    } catch (error) {
        return error;
    }
}

async function getReviewById(id: string): Promise<DocumentData[]> {
    try {
        let res: DocumentData[] = [];
        const q = query(collection(db, reviewCollName), where("idPage", "==", id));
        onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
            datafromCache = snapshot.metadata.fromCache;
        });
        let docum = await getDocs(q);
        docum.forEach(async (doc) => {
            const el: DocumentData = doc.data();
            res.push(el);
        });
        for (let el of res) {
            let docUser = await getDoc(doc(db, userCollName, el.userId));
            el.userName = docUser.data()!.displayName;
        }
        return res;
    } catch (error) {
        return [];
    }
}

async function getReviewByIdMediaAndUser(id: string): Promise<DocumentData> {
    let userId: string = useUserStore().user.uid!;
    let res: DocumentData[] = [];
    const q = query(collection(db, reviewCollName), where("idMedia", "==", id), where("userId", "==", userId));
    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        datafromCache = snapshot.metadata.fromCache;
    });
    let docum = await getDocs(q);
    docum.forEach(doc => res.push(doc.data()));
    return res[0];
}

async function removeFavById(id: string | number): Promise<{ message: string, fromCache: boolean }> {
    let userId: string = useUserStore().user.uid!;
    return new Promise((res, rej) => {
        try {
            let unsubListener: Unsubscribe = onSnapshot(query(collection(db, favCollName), where("__name__", "==", userId)), {}, (snapshot) => {
                snapshot.docChanges().forEach((changes) => {
                    let data = changes.doc.data();
                    if (!data[id]) {
                        unsubListener();
                        setSubscription(id.toString(), false)
                            .then((response) => res(response))
                            .catch((error) => rej(error));
                    }
                })
            });
            updateDoc(doc(db, favCollName, userId), { [id]: deleteField() });
        } catch (error: unknown) {
            rej(error);
        }
    });
}

async function getUsersReviews(order?: string, up?: OrderByDirection): Promise<{ data: DocumentData[], fromCache: boolean }> {
    let userId: string = useUserStore().user.uid!;
    let res: DocumentData[] = [];
    let q;
    if (order)
        q = query(collection(db, reviewCollName), where("userId", "==", userId), orderBy(order, up));
    else
        q = query(collection(db, reviewCollName), where("userId", "==", userId));

    onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
        datafromCache = snapshot.metadata.fromCache;
    });
    let docum = await getDocs(q);
    docum.forEach(doc => res.push(doc.data()));
    return { data: res, fromCache: datafromCache };
}

async function removeReview(id: string): Promise<unknown> {
    try {
        let userId: string = useUserStore().user.uid!;
        const q = query(collection(db, reviewCollName), where("idMedia", "==", id), where("userId", "==", userId));
        let docum = await getDocs(q);
        return new Promise((res, rej) => {
            try {
                let unsubListener: Unsubscribe = onSnapshot(q, {}, (snapshot) => {
                    snapshot.docChanges().forEach((changes) => {
                        if (changes.newIndex == -1) {
                            unsubListener();
                            res("Success");
                        }
                    })
                });
                if (docum.size != 0) {
                    let id = docum.docs[0].id;
                    deleteDoc(doc(db, reviewCollName, id));
                }
            } catch (error) {
                rej(error);
            }
        });
    }
    catch (error) {
        return error;
    }
}

async function deleteAccount(uid: string) {
    const q = query(collection(db, reviewCollName), where("userId", "==", uid));
    let docum = await getDocs(q);
    docum.forEach(async (docu) => {
        await deleteDoc(doc(db, reviewCollName, docu.id));
    });
    await deleteDoc(doc(db, favCollName, uid));
    await deleteDoc(doc(db, userCollName, uid));
    await deleteDoc(doc(db, notifyCollName, uid));
}

async function storeToken(token: string) {
    let userId: string = useUserStore().user.uid!;
    await setDoc(doc(db, notifyCollName, userId), { tokens: arrayUnion(token) }, { merge: true });
}

async function setSubscription(idMedia: string, flag: boolean): Promise<{ message: string, fromCache: boolean }> {
    let userId: string = useUserStore().user.uid!;
    let data = {
        [idMedia]: flag
    };
    return new Promise((res, rej) => {
        try {
            let unsubListener: Unsubscribe = onSnapshot(doc(db, notifyCollName, userId), {}, (snapshot) => {
                if (snapshot.data()![idMedia] == flag) {
                    unsubListener();
                    res({ message: "Success", fromCache: datafromCache });
                }
            });
            setDoc(doc(db, notifyCollName, userId), data, { merge: true });
        } catch (error) {
            rej(error);
        }
    });

}

async function getTokensByIdMedia(idMedia: string) {
    let q = query(collection(db, notifyCollName), where(idMedia, "==", true));
    let d = await getDocs(q);
    let tokens: string[] = [];

    d.docs.forEach(data => {
        tokens = tokens.concat(data.data().tokens)
    });

    return tokens;
}

async function deleteTokenDbByUser(token: string) {
    let userId: string = useUserStore().user.uid!;

    return new Promise((res, rej) => {
        try {
            let unsubListener: Unsubscribe = onSnapshot(doc(db, notifyCollName, userId), {}, (snapshot) => {
                if (!snapshot.data()!.tokens.includes(token)) {
                    unsubListener();
                    res("Success");
                }
            });
            setDoc(doc(db, notifyCollName, userId), { tokens: arrayRemove(token) }, { merge: true });
        } catch (error) {
            rej(error);
        }
    });
}

async function deleteTokenDb(token: string) {
    let q = query(collection(db, notifyCollName), where("tokens", "array-contains", token));
    let d = await getDocs(q);
    d.forEach((docum) => {
        setDoc(docum.ref, { tokens: arrayRemove(token) }, { merge: true });
    });
}

export {
    addToFav, getUsersFav, addReview, getReviewById, isPresentFav, removeFavById, getUsersReviews, getReviewByIdMediaAndUser,
    removeReview, deleteAccount, addUsersInfo, setNotify, setSubscription, getTokensByIdMedia, deleteTokenDb, storeToken,
    deleteTokenDbByUser, isPresentDisplayName
}