import React, { useState } from "react";
import "./FaqItems.css";

function FaqItems({ question, answer, link }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <button className="toggle-btn">{isOpen ? "✕" : "+"}</button>
      </div>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
          {link && (
            <div className="faq-link">
              <a href={link.url}>{link.text} →</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FaqItems;
