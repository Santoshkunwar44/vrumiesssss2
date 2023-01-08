
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBfddpKyxqeKyDUdUOirVW1WUhMlR9JSU",
    authDomain: "vrumies-1f269.firebaseapp.com",
    projectId: "vrumies-1f269",
    storageBucket: "vrumies-1f269.appspot.com",
    messagingSenderId: "1029905510120",
    appId: "1:1029905510120:web:b4be2f6286781471f7e35d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

