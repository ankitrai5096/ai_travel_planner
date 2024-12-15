import React from 'react';
import './signin.css'; // Import the CSS file for styling
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { provider } from '../utils/Config'; // Ensure this is correctly configured
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  const auth = getAuth(); 

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User signed in: ", user);
        navigate('/Booking'); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Error signing in: ", {
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate('/signin'); 
      })
      .catch((error) => {
        console.error("Error signing out: ", error.message);
      });
  };

  return (
    <div className="signin-container">
      <div className="signin-overlay">
        <div className="signin-content">
          <h1 className="signin-title">Welcome to Travel Planner</h1>
          <p className="signin-subtitle">Explore the world with ease and convenience</p>
          <button className="google-signin-button" onClick={handleGoogleSignIn}>
            <img
              src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png"
              alt="Google logo"
              className="google-logo"
            />
            Sign In with Google
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
