import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../routes/routes";
import { RouteParams } from "../routes/types";
import AnimatedLottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import { LottieAnimations } from '../constants'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Login>;

const LoginScreen: React.FC = () => {
  const auth = getAuth(); 
  const lottieRef = useRef<AnimatedLottieView|null>(null);
  const navigation = useNavigation<RoutePropType>();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); 
      // console.log("Login successful", userCredential.user);
      setEmail("");
      setPassword("");
      navigation.navigate(Routes.Home);
    } catch (error) {
      // console.error("Login error:", error);
      setPasswordError("User doesn't exist");
    }
  };

  const handleSignup = () => {
    navigation.navigate(Routes.Register);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!isValidEmail(text)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <LottieView
        ref={lottieRef}
        speed={1}
        source={LottieAnimations.lightbulb}
        autoPlay={true}
        loop={true}
        style={styles.lottie} 
      />
      </View>
      <View style={styles.formContainer}>
        <View style={[styles.inputContainer, {backgroundColor: 'white', width: '100%'}]}>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            style={styles.input}
          />
        </View>
        {emailError ? (<View style={styles.errorsContainer}><Text style={styles.errorText}>{emailError}</Text></View>) : null}
        <View style={[styles.inputContainer, {backgroundColor: 'white', width: '100%'}]}>
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={handlePasswordChange} 
              style={styles.input}
              secureTextEntry={true}
            />
        </View>
        {passwordError ? (<View style={styles.errorsContainer}><Text style={styles.errorText}>{passwordError}</Text></View>) : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signup} onPress={handleSignup}>
            <Text style={styles.signupText}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    maxHeight: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: '90%',
    borderRadius: 50,
    marginBottom: 10,
    paddingHorizontal: '5%',
  },
  input: {
    height: 50,
    fontSize: 16,
    color: 'gray',
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signup: {
    marginTop: 10,
  },
  signupText: {
    color: "gray",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorText: {
    color: 'red',
  },
  errorsContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    marginBottom: 10, 
  },
  lottie: {
    width: '100%',
    height: '80%',
  },
});

export default LoginScreen;