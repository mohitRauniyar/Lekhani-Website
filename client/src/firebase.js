// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lekhani-website.firebaseapp.com",
  projectId: "lekhani-website",
  storageBucket: "lekhani-website.appspot.com",
  messagingSenderId: "208112634139",
  appId: "1:208112634139:web:4def930ecf262a957b2bbe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

