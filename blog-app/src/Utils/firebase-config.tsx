// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.FIREBASE_APIKEY,
  authDomain: "next-js-blog-app-accb8.firebaseapp.com",
  projectId: "next-js-blog-app-accb8",
  storageBucket: "next-js-blog-app-accb8.appspot.com",
  messagingSenderId: "45074773499",
  appId: "1:45074773499:web:110044529c34e8c848875e"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app;