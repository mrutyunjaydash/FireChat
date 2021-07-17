import React,{useState,useEffect} from 'react';
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

const auth = firebase.auth();
const db = firebase.firestore();
const query = db.collection('messages').orderBy('createdAt').limit(100);

const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

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

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {
        user ? (
          <>
            <Button onClick={signOut}>Sign out</Button>
            <p>Welcome to the chat!</p>
          </>
        ) : <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      }
    </>
  );
};

export default App;