import React, { useEffect, useRef, useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import TopBar from "../components/Topbar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteParams } from "../routes/types";
import { Routes } from "../routes/routes";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../hooks/useUserStore";
import { doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import AnimatedLottieView from 'lottie-react-native';
import LottieView from "lottie-react-native";
import { LottieAnimations } from "../constants";

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const HomeScreen: React.FC = () => {
  const db = getFirestore();
  const navigation = useNavigation<RoutePropType>();
  const auth = getAuth();
  const lottieRef = useRef<AnimatedLottieView|null>(null);
  const [displayLightBulb, setDisplayLightBulb] = useState(false);

  const handleLogOutPress = async () => {
    try {
      // Sign out the current user
      await signOut(auth);
      navigation.navigate(Routes.Register);
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle logout error
    }
  };

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);

  const handleButtonPress = async () => {
    setDisplayLightBulb(!displayLightBulb);
    
    try {
      // Get a reference to the document where you store the LED state
      const ledStateDocRef = doc(db, 'ledState', 'state');

      // Update the document with the new LED state data
      await setDoc(ledStateDocRef, {
        isOn: !displayLightBulb,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating LED state:', error);
      // Handle Firestore error
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        onLogOutPress={handleLogOutPress}
        title="LightMonitor"
      />
      <View style={styles.content}>
        {displayLightBulb && (<LottieView
        ref={lottieRef}
        speed={1}
        source={LottieAnimations.lightbulb}
        autoPlay={true}
        loop={true}
        style={styles.lottie} 
      />)}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>{displayLightBulb ? 'Turn Off' : 'Turn On'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20, 
    alignSelf: 'center', 
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  lottie: {
    width: '100%',
    height: '80%',
  },
});

export default HomeScreen;