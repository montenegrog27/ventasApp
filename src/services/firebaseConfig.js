import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcvZtIM-GdjCvSSUNhVHye1MBm-3JgF-U",
  authDomain: "ventasapp-336ac.firebaseapp.com",
  projectId: "ventasapp-336ac",
  storageBucket: "ventasapp-336ac.appspot.com",
  messagingSenderId: "326788263382",
  appId: "1:326788263382:web:e90ef94f9009165219c877",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
