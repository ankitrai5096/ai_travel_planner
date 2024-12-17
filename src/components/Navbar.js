import React, { useEffect, useState } from 'react';
import './navbar.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import UserProfileImage from './Innitials';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state
    });

    return () => unsubscribe(); // Clean up the listener
  }, [auth]);


  const navigateToSignin = () => {
    navigate('/signin'); 
  };

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("User signed out.");
  //       navigate('/signin');
  //     })
  //     .catch((error) => {
  //       console.error("Error signing out:", error);
  //     });
  // };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Travel Planner</div>
      <ul
        className={isMobile ? "navbar-links-mobile" : "navbar-links"}
        onClick={() => setIsMobile(false)}
      >
        <li>
          <a href="#home" className="nav-link">Home</a>
        </li>
        <li>
          <a href="#features" className="nav-link">Features</a>
        </li>
        <li>
          <a href="#contact" className="nav-link">Contact</a>
        </li>
        <li>
          <a href="#help" className="nav-link">Help</a>
        </li>
      </ul>
      <div className="navbar-actions">
        {user ? (
          <div onClick={navigateToSignin} className="user-menu">
              <UserProfileImage name={user.email} />
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate('/signin')}>
            Login
          </button>
        )}
        <button
          className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <>&#10005;</> : <>&#9776;</>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
