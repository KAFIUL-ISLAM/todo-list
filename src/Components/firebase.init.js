// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxYqiL1x-CLWhza_4rOwHwVXclKxsXSUM",
    authDomain: "todo-list-a6810.firebaseapp.com",
    projectId: "todo-list-a6810",
    storageBucket: "todo-list-a6810.appspot.com",
    messagingSenderId: "900699176211",
    appId: "1:900699176211:web:046d51f5158350cf60aee6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;