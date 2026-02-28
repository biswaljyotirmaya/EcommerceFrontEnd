import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3Y7n67QmUKPmxLPgMyGYDi5eJW7i-Qg0",
  authDomain: "multivendorecommerce-374a7.firebaseapp.com",
  projectId: "multivendorecommerce-374a7",
  storageBucket: "multivendorecommerce-374a7.firebasestorage.app",
  messagingSenderId: "935829773387",
  appId: "1:935829773387:web:c6682daca97eabf62e41ce",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
