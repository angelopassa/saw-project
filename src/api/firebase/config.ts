// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdnQVmZ3yaUtDvpKK72MjbBJ4PNvHXgqo",
  authDomain: "saw-project-ae11a.firebaseapp.com",
  projectId: "saw-project-ae11a",
  storageBucket: "saw-project-ae11a.appspot.com",
  messagingSenderId: "696053642322",
  appId: "1:696053642322:web:41b8811c5dde5a928cdb8b",
  measurementId: "G-2B0131PNE1"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

const db = initializeFirestore(fire,
  {
    localCache:
      persistentLocalCache(/*settings*/{ tabManager: persistentMultipleTabManager() }),

    experimentalAutoDetectLongPolling: false
  });

const auth = getAuth();

export { fire, auth, db }