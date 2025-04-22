import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/png/logo.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          {/* Nav Links */}
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" className="nav-link" activeclassname="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" className="nav-link">
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className="nav-link">
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/register" className="register-btn">
            Register
          </Link>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </nav>
    </>
  );
};

export default Navbar;
