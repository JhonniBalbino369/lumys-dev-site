// firebase-config.js

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBafuRXUlnPBpM97sTvsnfSpCbNQaLugPw",
  authDomain: "lumys-eternum.firebaseapp.com",
  projectId: "lumys-eternum",
  storageBucket: "lumys-eternum.appspot.com",
  messagingSenderId: "215688794007",
  appId: "1:215688794007:web:fa8e5d747af7dd56c7bed2",
  measurementId: "G-SS84XJ70XZ"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
