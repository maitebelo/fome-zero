import { initializeApp } from "firebase-admin/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDcyPWfqrDOCCr-7KXhqcxIeazzAdK9CZk",
    authDomain: "fome-zero-69759.firebaseapp.com",
    projectId: "fome-zero-69759",
    storageBucket: "fome-zero-69759.appspot.com",
    messagingSenderId: "794596924760",
    appId: "1:794596924760:web:e21714c42e6ac42f2d192d",
    measurementId: "G-BF4JP7RSFW",
});
const firestore = firebase.firestore(app);
const authentification = getAuth(app);
const storage = getStorage(app);

export { app, firestore, authentification, storage };
