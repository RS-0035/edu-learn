import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // CSS faylni chaqiramiz

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Kechirasiz, bunday sahifa topilmadi.</p>
      <Link to="/" className="not-found-button">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default NotFound;
