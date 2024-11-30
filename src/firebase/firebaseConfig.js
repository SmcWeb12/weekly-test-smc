// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  // Import Storage

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyATLls3bv7jR_hG967ih9USHOPLAME1a88",
  authDomain: "status-app-1-b0cfc.firebaseapp.com",
  databaseURL: "https://status-app-1-b0cfc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "status-app-1-b0cfc",
  storageBucket: "status-app-1-b0cfc.appspot.com",
  messagingSenderId: "649198476150",
  appId: "1:649198476150:web:2318dfb2b39d6c390fb857",
  measurementId: "G-C5MT5K2GN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);  // Initialize Storage

// Export initialized services
export { db, auth, storage };  // Make sure to export `storage`
