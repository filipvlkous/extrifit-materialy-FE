import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBCw6QLkuX9J3m4JXr4Nm41EyLBYq6rF-A",
    authDomain: "extrifitmaterials.firebaseapp.com",
    projectId: "extrifitmaterials",
    storageBucket: "extrifitmaterials.appspot.com",
    messagingSenderId: "779450563949",
    appId: "1:779450563949:web:4f5d8c115dae80837a6e64"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  
export const auth = getAuth(app);
export const db = getFirestore()
export const storage = getStorage(app);
