import React, { useState } from "react";
import { Link } from "react-router-dom";  // Use Link for navigation
import "./NavBar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img
            src="https://i.pinimg.com/736x/aa/1f/64/aa1f64fe760fc84fc4bd5f8f45cc8276.jpg"
            alt="Logo"
            style={{ height: "80px" }}
          />
        </a>
      </div>

      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="login-donate-container">
        <Link to="/login">
          <button className="btn login">Login</button>
        </Link>
     <Link to='/donate'>
        <button className="btn donate">Donate</button>
      </Link>

        
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default NavBar;
