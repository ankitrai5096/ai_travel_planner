// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA-UXX_oFGVg_fA8EBUSntgm30Zf5KMDM",
  authDomain: "ai-travel-planner-2b465.firebaseapp.com",
  projectId: "ai-travel-planner-2b465",
  storageBucket: "ai-travel-planner-2b465.appspot.com",
  messagingSenderId: "840629655342",
  appId: "1:840629655342:web:9f4f2411f40e9a5d744cbf",
};

// Initialize Firebase App
const fireApp = initializeApp(firebaseConfig);

// Export Firebase services
export const FireDB = getFirestore(fireApp); // Firestore instance
export const auth = getAuth(fireApp); // Firebase Auth instance
export const provider = new GoogleAuthProvider(); // Google Auth provider
