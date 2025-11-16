import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLkhLeJIjbgKVDyCB5XXw36d9jloLOqLY",
  authDomain: "posturecheck-8a97d.firebaseapp.com",
  projectId: "posturecheck-8a97d",
  storageBucket: "posturecheck-8a97d.firebasestorage.app",
  messagingSenderId: "288979106544",
  appId: "1:288979106544:web:e41649f4363c48e4c12035",
  measurementId: "G-6K9WZ148M7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
