// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBGETOaHMUafJe-WjQB6qhKWZgyGRaOHn0",
    authDomain: "chatapplication-8bb74.firebaseapp.com",
    projectId: "chatapplication-8bb74",
    storageBucket: "chatapplication-8bb74.appspot.com",
    messagingSenderId: "1046160435358",
    appId: "1:1046160435358:web:fe98e52703415d593c738f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);


export { app, auth, storage }