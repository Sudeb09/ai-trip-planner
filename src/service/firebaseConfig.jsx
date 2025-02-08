// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUFXvHgIsmJvRRgGAos3GoQ5X9Rxa2GMo",
  authDomain: "ai-travel-planner-f1e9f.firebaseapp.com",
  projectId: "ai-travel-planner-f1e9f",
  storageBucket: "ai-travel-planner-f1e9f.firebasestorage.app",
  messagingSenderId: "1000524427368",
  appId: "1:1000524427368:web:9f519d8cd64a22fd794bdd",
  measurementId: "G-T9GN1CYJ54"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);