import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdnQVmZ3yaUtDvpKK72MjbBJ4PNvHXgqo",
  authDomain: "saw-project-ae11a.firebaseapp.com",
  projectId: "saw-project-ae11a",
  storageBucket: "saw-project-ae11a.appspot.com",
  messagingSenderId: "696053642322",
  appId: "1:696053642322:web:41b8811c5dde5a928cdb8b",
  measurementId: "G-2B0131PNE1"
};

const fire = initializeApp(firebaseConfig);

const db = initializeFirestore(fire,
  {
    localCache:
      persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
  });

const auth = getAuth();

export { fire, auth, db }