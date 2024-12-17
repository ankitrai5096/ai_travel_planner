import React from 'react';
import './signin.css'; // Import the CSS file for styling
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { provider } from '../utils/Config'; // Ensure this is correctly configured
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const SignInPage = () => {
  const navigate = useNavigate();
  const auth = getAuth(); 

  const handleGoogleSignIn = () => {

    provider.setCustomParameters({
      prompt: 'select_account',
    });
    signInWithPopup(auth, provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User signed in: ", user);
        navigate('/'); 
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
    <>
    <Navbar/>
    <div className="signin-container">
      <div className="signin-card">
        {/* Left Side - Content */}
        <div className="signin-content">
          <h1 className="signin-title">Welcome to Travel Planner</h1>
          <p className="signin-subtitle">Explore the world with ease and convenience</p>
          <button className="google-signin-button" onClick={handleGoogleSignIn}>
          <svg className='svgicon' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
            Sign In with Google
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
        {/* Right Side - Image */}
        <div className="signin-image">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
            alt="Travel"
            className="signin-image-img"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default SignInPage;
