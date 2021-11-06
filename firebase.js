import  firebase  from "firebase/compat/app";
import "firebase/compat/firestore"
import "firebase/compat/auth"

export const firebaseConfig = {
    apiKey: "AIzaSyDdkQ8MFnlephP0yqEzHIvOHwA5lCEcQz4",
    authDomain: "fir-chat-550bd.firebaseapp.com",
    projectId: "fir-chat-550bd",
    storageBucket: "fir-chat-550bd.appspot.com",
    messagingSenderId: "610280916982",
    appId: "1:610280916982:web:ecb15c8e4674110792e9d7"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore()
export const auth=app.auth()
