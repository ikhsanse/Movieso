import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: replace with your own config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "react-toolkit-5e4e2.firebaseapp.com",
    databaseURL: "https://react-toolkit-5e4e2-default-rtdb.firebaseio.com",
    projectId: "react-toolkit-5e4e2",
    storageBucket: "react-toolkit-5e4e2.appspot.com",
    messagingSenderId: "615507763359",
    appId: "1:615507763359:web:7e1c86afb102c1035782aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };