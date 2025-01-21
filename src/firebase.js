import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANpO3Dct5xCZydyUU9HmMgO_kq2zhpI5Y",
  authDomain: "burnpad-mockup-generator.firebaseapp.com",
  projectId: "burnpad-mockup-generator",
  storageBucket: "burnpad-mockup-generator.appspot.com",
  messagingSenderId: "249958522667",
  appId: "1:249958522667:web:269d82ed30a5a2c9466f6e",
  measurementId: "G-T6GXHSCZWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
export default app; 