// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC-ZSbchD-l7V1cZHrMo14hzFdWXkJs4U",
  authDomain: "react-projects-1b8fb.firebaseapp.com",
  projectId: "react-projects-1b8fb",
  storageBucket: "react-projects-1b8fb.firebasestorage.app",
  messagingSenderId: "27237016317",
  appId: "1:27237016317:web:02776692343e2ab1db5494",
  measurementId: "G-2Z6VPLLBRP",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
