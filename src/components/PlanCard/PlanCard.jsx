import React from "react";
import "./PlanCard.css";

const PlanCard = ({ title, price, features, onSelect }) => {
  return (
    <div className="plan-card">
      <div className="plan-label">{title} Reja</div>
      <div className="price-section">
        <span className="price">${price}</span>
        <span className="per-month">/oy</span>
      </div>
      <h4 className="features-title">Mavjud xususiyatlar</h4>
      <ul className="features-list">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`feature-item ${
              feature.available ? "included" : "excluded"
            }`}
          >
            <span className="icon">{feature.available ? "✔" : "✖"}</span>
            {feature.text}
          </li>
        ))}
      </ul>
      <button className="get-started-btn" onClick={onSelect}>
      Boshlash
      </button>
    </div>
  );
};

export default PlanCard;
