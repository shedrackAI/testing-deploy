import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYKM72NbmC2omBr5xCozlrYgtsxRiXT3c",
  authDomain: "fund-a-friend-58fc6.firebaseapp.com",
  projectId: "fund-a-friend-58fc6",
  storageBucket: "fund-a-friend-58fc6.appspot.com",
  messagingSenderId: "334931179364",
  appId: "1:334931179364:web:deff138fe852bf41f76c71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)