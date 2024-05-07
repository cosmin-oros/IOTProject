import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import { PageRoutes } from "../routes/PageRoutes";
import lightbulbAnimation from "../assets/lightbulb.json"; 
import '../styles.css'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const lottieRef = useRef<Lottie|null>(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lightbulbAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const registerWithEmailAndPassword = async (email: string, password: string) => {
    try {
      // Call Firebase Auth function to create a new user account
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Handle registration error
      console.error('Error during registration:', error);
      throw error; // Rethrow the error for the calling function to handle
    }
  };

  const handleRegister = async () => {
    try {
      await registerWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate(PageRoutes.Main);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };


  const handleLogin = () => {
    navigate(PageRoutes.Login); 
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setEmail(text);
    if (!isValidEmail(text)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setPassword(text);
    if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
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
    <div className="container">
      <div className="imageContainer">
        <Lottie
          ref={lottieRef}
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
      <div className="formContainer">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="input"
          />
        {emailError && <div className="errorsContainer"><span className="errorText">{emailError}</span></div>}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            className="input"
          />
        {passwordError && <div className="errorsContainer"><span className="errorText">{passwordError}</span></div>}
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="input"
          />
        {confirmPasswordError && <div className="errorsContainer"><span className="errorText">{confirmPasswordError}</span></div>}
        <button className="button" onClick={handleRegister}>Register</button>
        <button className="login" onClick={handleLogin}>Already have an account?</button>
      </div>
    </div>
  );
};

export default RegisterPage;
