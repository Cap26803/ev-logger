// Import necessary Firebase modules
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBizerDII5cMagQ6k2WCvpRYmno-c5ODB8",
    authDomain: "drixxlog.firebaseapp.com",
    projectId: "drixxlog",
    storageBucket: "drixxlog.firebasestorage.app",
    messagingSenderId: "606191501331",
    appId: "1:606191501331:web:dd992d6ea2ce2ba6267fe6",
    measurementId: "G-YWSDQSPMDK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const querySnapshot = await getDocs(collection(db, "evs"));
const analytics = getAnalytics(app);

export { addDoc, auth, collection, createUserWithEmailAndPassword, db, getDocs, query, signInWithEmailAndPassword, signOut, where };

