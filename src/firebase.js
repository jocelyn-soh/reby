// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB3ZTvuFxgW8BQH6oWNYSnEIYlYLqmLVw",
  authDomain: "reby-flashcards.firebaseapp.com",
  projectId: "reby-flashcards",
  storageBucket: "reby-flashcards.appspot.com",
  messagingSenderId: "175802869346",
  appId: "1:175802869346:web:d50c424693473174ab933b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app 



