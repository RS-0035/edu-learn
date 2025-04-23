// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTr2G-RH2wF9cjri0zXEVlPhECw6lbAik",
  authDomain: "e-learn-3bff7.firebaseapp.com",
  projectId: "e-learn-3bff7",
  storageBucket: "e-learn-3bff7.firebasestorage.app",
  messagingSenderId: "78022198665",
  appId: "1:78022198665:web:3a46b383918ba44c570d58",
  measurementId: "G-L60VYY3JH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();