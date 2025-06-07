import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/png/logo.png";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [userData, setUserData] = useState({
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userEmail"),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData({ name: data.name, email: data.email });
          localStorage.setItem("userName", data.name);
          localStorage.setItem("userEmail", data.email);
        }
      } else {
        setUserData(null);
        localStorage.removeItem("userName");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserData(null);
    window.location.reload();
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar-wrapper">
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}
      <nav className="navbar container">
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li><NavLink to="/" className="nav-link">Bosh sahifa</NavLink></li>
            <li><NavLink to="/courses" className="nav-link">Kurslar</NavLink></li>
            <li><NavLink to="/about" className="nav-link">Biz haqimizda</NavLink></li>
            <li><NavLink to="/pricing" className="nav-link">Narxlar</NavLink></li>
            <li><NavLink to="/contact" className="nav-link">Bog'lanish</NavLink></li>
          </ul>
        </div>

        {userData?.name ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <div className="user-name" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {userData.name}
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p>{userData.email}</p>
                <button className="logout-btn" onClick={handleLogout}>
                  Tizimdan chiqish
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/register" className="register-btn">Ro'yxatdan o'tish</Link>
            <Link to="/login" className="login-btn">Kirish</Link>
          </div>
        )}

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
