import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


//Importere Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from 'react-native-paper';

//Importere vores componenter fra components mappe
import ProfileScreen from './components/ProfileScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import HomeScreen from "./components/HomeScreen";
import SettingsScreen from "./components/SettingsScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from "./components/StackNavigator";


// Firebase configuration fra egen Firebase konto
const firebaseConfig = {
  apiKey: "AIzaSyBWDwMAyKNIH2OuQiuhG5yjTKhfpB1MYPk",
  authDomain: "minapp-3b42b.firebaseapp.com",
  projectId: "minapp-3b42b",
  storageBucket: "minapp-3b42b.appspot.com",
  messagingSenderId: "531206359398",
  appId: "1:531206359398:web:979ff4983e5a76b29120a7"
};

// Initialize Firebase
export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!"); //hvis den virker
  } else {
    console.log("Firebase not on!"); //hvis den ikke virker 
  }
 
  const auth = getAuth();

  /*Hvis brugeren er logget ind (user eksisterer), oprettes et objekt med 'loggedIn' sat til 'true' og brugeroplysningerne.
    Derudover logges en besked i konsollen for at angive, at brugeren er logget ind.*/
  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        callback({loggedIn: true, user: user});
        console.log("You are logged in!");
      } else {
        callback({loggedIn: false});
      }
    });
  }

 //Heri aktiveres listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
  const GuestPage = () => {
    return(
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Opret en bruger eller log ind:
          </Text>
          
          <Card style={{padding:20, margin: 20}}>
            <SignUpForm />
          </Card>
          
          <Card style={{padding:20, margin: 20}}>
            <LoginForm />
          </Card>

        </View>
    )
  }
  return user.loggedIn ? <HomeScreen /> : <GuestPage/> ;

}
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


