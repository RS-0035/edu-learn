import React from "react";
import "./Skeleton.css"; // Stil qo'shish uchun CSS

const Skeleton = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-item skeleton-header"></div>
      <div className="skeleton-item skeleton-price"></div>
      <div className="skeleton-item skeleton-features"></div>
    </div>
  );
};

export default Skeleton;
