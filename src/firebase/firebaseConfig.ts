import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASP00W_iX0uAT4FPJljOkGypruhgLkKkc",

  authDomain: "advanced-ecommerce-store.firebaseapp.com",

  projectId: "advanced-ecommerce-store",

  storageBucket: "advanced-ecommerce-store.firebasestorage.app",

  messagingSenderId: "499764254997",

  appId: "1:499764254997:web:589b30037fd9cfc69c711c",
};

export const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);