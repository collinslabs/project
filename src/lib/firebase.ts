import { initializeApp } from 'firebase/app'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAz-JO8SL5QAIPWMWCCJu6FWhvYqgADII8",
  authDomain: "ecom-c9468.firebaseapp.com",
  projectId: "ecom-c9468",
  storageBucket: "ecom-c9468.firebasestorage.app",
  messagingSenderId: "487788132615",
  appId: "1:487788132615:web:385cd204b5050ac030eda2",
  measurementId: "G-9H4GL19ZHN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.uid);
  } else {
    console.log("No user signed in");
  }
});

export default app;
