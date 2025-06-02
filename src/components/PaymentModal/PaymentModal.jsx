import React, { useState } from "react";
import "./PaymentModal.css";

const PaymentModal = ({ plan, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment completed for ${plan.title} - $${plan.price}`);
    onClose();
  };

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal-box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
          alt="Visa"
          className="payment-logo"
        />

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="payment-row">
            <div className="payment-field">
              <label>Karta raqami</label>
              <input
                type="text"
                maxLength={19}
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div className="payment-field">
              <label>CVC</label>
              <input
                type="text"
                maxLength={4}
                placeholder="XXX"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="payment-field payment-full">
            <label>Karta egasining ismi</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              required
            />
          </div>

          <div className="payment-field payment-full">
            <label>Tugash muddati</label>
            <div className="payment-expiry">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">Oy</option>
                {[
                  "01",
                  "02",
                  "03",
                  "04",
                  "05",
                  "06",
                  "07",
                  "08",
                  "09",
                  "10",
                  "11",
                  "12",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Yil</option>
                {[...Array(10)].map((_, i) => {
                  const y = new Date().getFullYear() + i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button type="submit" className="payment-submit">
            TO‘LIQ tugatish (Umumiy ${plan.price})
          </button>
          <button type="button" className="payment-cancel" onClick={onClose}>
          Bekor qilish
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
