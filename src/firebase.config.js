// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsX_uPsEkLgRj0GgAhVizarGTevXDCDSs",
    authDomain: "lechonk-fc8a5.firebaseapp.com",
    projectId: "lechonk-fc8a5",
    storageBucket: "lechonk-fc8a5.appspot.com",
    messagingSenderId: "44590268831",
    appId: "1:44590268831:web:551d7d62a1b6d2eb16bdaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };