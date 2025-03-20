// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { setPersistence, browserLocalPersistence } from "firebase/auth";

// After initializing auth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq3QZIBzlvsWVVtlLhEDPPYkhyquaWWgE",
  authDomain: "cheetah-app-15931.firebaseapp.com",
  projectId: "cheetah-app-15931",
  storageBucket: "cheetah-app-15931.firebasestorage.app",
  messagingSenderId: "108920460839",
  appId: "1:108920460839:web:3df63d80eb828ef851e002",
  measurementId: "G-FBT1B6G088"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

// setPersistence(auth, browserLocalPersistence);





// function userStore() {
//     let unsubscribe: () => void;
//
//     if( !auth || !globalThis.window) {
//         console.warn("Auth is not initialized or not in browser");
//         const { subscribe } = writable<User | null>(null);
//         return {
//             subscribe,
//         }
//     }
//
//     const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
//         onAuthStateChanged(auth, user => {
//             set(user);
//         });
//
//         return () => unsubscribe();
//     })
//
//     return {
//         subscribe,
//     }
//
// }
// export const user = userStore();
//
//
//
// export const userData = writable<any>(null);
//
// user.subscribe((user) => {
//
//     if (user) {
//         const docRef = doc(db, `users/${user.uid}`);
//         onSnapshot(docRef, (snapshot) => {
//             userData.set(snapshot.data());
//         });
//     }
// });
