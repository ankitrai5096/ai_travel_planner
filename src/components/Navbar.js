import React, { useState } from 'react';
import './navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Travel Planner</div>
      <ul className={isMobile ? "navbar-links-mobile" : "navbar-links"} onClick={() => setIsMobile(false)}>
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
      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <>&#10005;</> : <>&#9776;</>} {/* Close icon or hamburger icon */}
      </button>
    </nav>
  );
};

export default Navbar;
