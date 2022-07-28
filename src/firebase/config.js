// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: 'AIzaSyBrq2AHI0AP64Ctonz6bV3r00zquxfqfUw',
 authDomain: 'chatapp-wilmer.firebaseapp.com',
 projectId: 'chatapp-wilmer',
 storageBucket: 'chatapp-wilmer.appspot.com',
 messagingSenderId: '550772219217',
 appId: '1:550772219217:web:03a2bc434763ce8c194770',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Firestore Database
const db = getFirestore(app);

// Storage (IMG)
const storage = getStorage(app);

// TimeStamp
const timestamp = new Timestamp();

export { db, auth, storage, timestamp };
