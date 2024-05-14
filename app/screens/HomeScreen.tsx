import React, { useEffect, useRef, useState } from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import TopBar from "../components/Topbar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteParams } from "../routes/types";
import { Routes } from "../routes/routes";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../hooks/useUserStore";
import { collection, addDoc, getFirestore, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
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
  const [states, setStates] = useState<any[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const statesCollectionRef = collection(db, 'ledStates');
        const q = query(statesCollectionRef, orderBy('timestamp', 'desc'), limit(10)); // Fetch last 10 states
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const statesData: any[] = [];
          querySnapshot.forEach((doc) => {
            statesData.push({ id: doc.id, ...doc.data() });
          });
          setStates(statesData);
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching LED states:', error);
      }
    };

    fetchStates();
  }, []);

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

  const handleButtonPress = async () => {
    const newState = !displayLightBulb;
    setDisplayLightBulb(newState);
    
    try {
      // Add a new state document to the collection
      await addDoc(collection(db, 'ledStates'), {
        isOn: newState,
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
