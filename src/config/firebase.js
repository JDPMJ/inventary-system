import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCIVVDBT8syNo0Iouh1XIbUIAqsK5nFdpo",
  authDomain: "inventory-system-data-base.firebaseapp.com",
  projectId: "inventory-system-data-base",
  storageBucket: "inventory-system-data-base.appspot.com",
  messagingSenderId: "7539242526",
  appId: "1:7539242526:web:fa5c3e07085bd6de51200f"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)