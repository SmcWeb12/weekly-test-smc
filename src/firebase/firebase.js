 // services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCL_An-4THLfrZLu_Tv3Qv11oX1Ffw8ybM",
    authDomain: "image-upload-b6057.firebaseapp.com",
    databaseURL: "https://image-upload-b6057-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "image-upload-b6057",
    storageBucket: "image-upload-b6057.appspot.com",
    messagingSenderId: "707658232870",
    appId: "1:707658232870:web:57a57b0679e52d68b022e7",
    measurementId: "G-FT4RWZPC36"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
