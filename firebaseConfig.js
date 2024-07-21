// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAScqGXieqGcMB1faHFGr1SNKoALi1ZRZs",
  authDomain: "reactfinalproject-489c7.firebaseapp.com",
  projectId: "reactfinalproject-489c7",
  storageBucket: "reactfinalproject-489c7.appspot.com",
  messagingSenderId: "140953777808",
  appId: "1:140953777808:web:ad863c3a0f54dd1aba4a15",
  measurementId: "G-R1JMEKGCB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);


export { auth, db, analytics };