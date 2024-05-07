// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDIqe9BnTX48dobdVYNq_HxFHMb3AujdU",
  authDomain: "iotproject-5b0c7.firebaseapp.com",
  projectId: "iotproject-5b0c7",
  storageBucket: "iotproject-5b0c7.appspot.com",
  messagingSenderId: "617336299542",
  appId: "1:617336299542:web:31dcf479645d108d37d537"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
