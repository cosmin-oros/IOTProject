import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import { PageRoutes } from "../routes/PageRoutes";
import lightbulbAnimation from "../assets/lightbulb.json"; 
import '../styles.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const lottieRef = useRef<Lottie|null>(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lightbulbAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate(PageRoutes.Main);
    } catch (error) {
      console.error('Error during login:', error);
      setPasswordError("User doesn't exist");
    }
  };


  const handleRegister = () => {
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
        <button className="button" onClick={handleLogin}>Login</button>
        <button className="login" onClick={handleRegister}>Don't have an account?</button>
      </div>
    </div>
  );
};

export default LoginPage;