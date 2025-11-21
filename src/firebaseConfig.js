// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuYQNY43ahOT1eN0Gm0IjuciEwp5REUXE",
  authDomain: "cyberpinnacle-344fd.firebaseapp.com",
  projectId: "cyberpinnacle-344fd",
  storageBucket: "cyberpinnacle-344fd.firebasestorage.app",
  messagingSenderId: "990414288886",
  appId: "1:990414288886:web:cb37c3999a8a0f37ee39d7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);   // <-- ADD THIS
