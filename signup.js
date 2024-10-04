// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHxGnXtuZX1vdflfmfXh2yFqdqcsJsGc8",
  authDomain: "signupform-7ed80.firebaseapp.com",
  projectId: "signupform-7ed80",
  storageBucket: "signupform-7ed80.appspot.com",
  messagingSenderId: "438196109597",
  appId: "1:438196109597:web:549cf7f71300053a6b61f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Handle sign-up form submission
const submit = document.getElementById('submit');

submit.addEventListener("click", function(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailid').value;
    const password = document.getElementById('password').value; 
    const phonenumber = document.getElementById('phonenumber').value;

    // Convert phone number to an integer
    const phoneNumberInt = parseInt(phonenumber, 10); // Convert to integer

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        alert("Account has been created");

        // Save the phone number and email to Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            phoneNumber: phoneNumberInt // Store as integer
        });

        window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
});
