import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBgC3Hh_mRgmRSsAqBRHS4ZzMkZ_6DspJg",
  authDomain: "retofullstack.firebaseapp.com",
  projectId: "retofullstack",
  storageBucket: "retofullstack.firebasestorage.app",
  messagingSenderId: "655839849470",
  appId: "1:655839849470:web:386c36c211450c3a99eeaf",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancias de Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);