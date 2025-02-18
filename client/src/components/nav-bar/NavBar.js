import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Use Link for navigation
import "./NavBar.css";

const NavBar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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

      {user?.role !== 'admin' &&
        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>
          {
            user?.role &&
            <Link to="/events">Events</Link>
          }
          <Link to="/about">About</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/contact">Contact</Link>
        </div>
      }

      {
        user?.role === 'admin' &&
        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/admin/volunteers">Volunteers</Link>
        </div>
      }

      <div className="login-donate-container">
        {!user &&
          <Link to="/login">
            <button className="btn login">Login</button>
          </Link>
        }
        {/* {!user &&

          <Link to="/register">
            <button className="btn login">Register</button>
          </Link>
        } */}
        {user && <button onClick={handleLogout}>Logout</button>}
        {/* <Link to='/donate'>
          <button className="btn donate">Donate</button>
        </Link> */}
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
