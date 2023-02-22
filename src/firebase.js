import { initializeApp } from "firebase/app";
import {getAuth,} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZBt0WuUyO_0YtOEAmHIom22YB3J_v6tA",
  authDomain: "chat-1f9db.firebaseapp.com",
  projectId: "chat-1f9db",
  storageBucket: "chat-1f9db.appspot.com",
  messagingSenderId: "1019790613747",
  appId: "1:1019790613747:web:f501236b1ef4fd2e0c2b86"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()