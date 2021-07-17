import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Button from './components/Button';

var firebaseConfig = {
  apiKey: "AIzaSyAljRdfcOf7L8qUx0n1KLwU2MDNJcC0lmA",
  authDomain: "react-chat-app-f07fb.firebaseapp.com",
  projectId: "react-chat-app-f07fb",
  storageBucket: "react-chat-app-f07fb.appspot.com",
  messagingSenderId: "531103613635",
  appId: "1:531103613635:web:8c7b601aa990ac8d0ed876"
};

firebase.initializeApp(firebaseConfig);

const App = () => {

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </>
  );
};

export default App;