import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../routes/routes";
import { RouteParams } from "../routes/types";
import AnimatedLottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import { LottieAnimations } from '../constants'

type RoutePropType = StackNavigationProp<RouteParams, Routes.Register>;

const RegisterScreen: React.FC = () => {
  const lottieRef = useRef<AnimatedLottieView|null>(null);
  const navigation = useNavigation<RoutePropType>();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);

  const handleRegister = () => {
    // ! firebase create account, go to home screen and switch isLoggedIn to true
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleLogin = () => {
    navigation.navigate(Routes.Login);
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

const handleConfirmPasswordChange = (text: string) => {
  setConfirmPassword(text);
  if (text !== password) {
    setConfirmPasswordError("Passwords do not match");
  } else {
    setConfirmPasswordError("");
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
            />
        </View>
        {passwordError ? (<View style={styles.errorsContainer}><Text style={styles.errorText}>{passwordError}</Text></View>) : null}
        <View style={[styles.inputContainer, {backgroundColor: 'white', width: '100%'}]}>
            <TextInput
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange} 
              style={styles.input}
            />
        </View>
        {confirmPasswordError ? (<View style={styles.errorsContainer}><Text style={styles.errorText}>{confirmPasswordError}</Text></View>) : null}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
            <Text style={styles.loginText}>Already have an account?</Text>
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
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  login: {
    marginTop: 10,
  },
  loginText: {
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

export default RegisterScreen;