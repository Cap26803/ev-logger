// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBizerDII5cMagQ6k2WCvpRYmno-c5ODB8",
    authDomain: "drixxlog.firebaseapp.com",
    projectId: "drixxlog",
    storageBucket: "drixxlog.firebasestorage.app",
    messagingSenderId: "606191501331",
    appId: "1:606191501331:web:dd992d6ea2ce2ba6267fe6",
    measurementId: "G-YWSDQSPMDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);