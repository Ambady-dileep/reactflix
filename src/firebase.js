import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";
import { 
    addDoc, 
    getFirestore, 
    collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDsfJIHGN58PrxBxcSM5yGJWSdwSSXzLxo",
  authDomain: "reactflix-5c92c.firebaseapp.com",
  projectId: "reactflix-5c92c",
  storageBucket: "reactflix-5c92c.firebasestorage.app",
  messagingSenderId: "132410564222",
  appId: "1:132410564222:web:4db11680f38b0536bf022f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

const login = async(email, password)=>{
    try {
        signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = ()=>{
    signOut(auth);
}


export {auth, db, login, signup, logout};