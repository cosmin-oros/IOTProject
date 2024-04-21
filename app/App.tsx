import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes/routes';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import RegisterScreen from './screens/RegisterScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDIqe9BnTX48dobdVYNq_HxFHMb3AujdU",
  authDomain: "iotproject-5b0c7.firebaseapp.com",
  projectId: "iotproject-5b0c7",
  storageBucket: "iotproject-5b0c7.appspot.com",
  messagingSenderId: "617336299542",
  appId: "1:617336299542:web:31dcf479645d108d37d537"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<Routes>(Routes.Register);

  useEffect(() => {
    // Check if user is logged in
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInitialRoute(Routes.Home);
      } else {
        setInitialRoute(Routes.Register);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name={Routes.Register} component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={Routes.Login} component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={Routes.Home} component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={Routes.Settings} component={SettingsScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

