import React, { useState } from "react";
import "./Payment.css"; // mavjud style bilan moslash uchun

function Payment({ open, onClose, price }) {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ismingizni kiriting";
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "16 xonali karta raqamini to‘liq kiriting";
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry))
      newErrors.expiry = "Amal qilish muddatini MM/YY formatida kiriting";
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "3 xonali CVV kodini kiriting";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert(`To‘lov qabul qilindi! Narx: ${price} so'm`);
    onClose();
    setFormData({ name: "", cardNumber: "", expiry: "", cvv: "" });
    setErrors({});
  };

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="payment-title">To‘lovni amalga oshirish</h2>
        <p className="payment-price">Narxi: {price ? `${price} so'm` : "Bepul"}</p>

        <form onSubmit={handleSubmit} className="payment-form">
          <label className="payment-label">
            To‘lovchini ismi
            <input
              className="payment-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ismingiz"
            />
            {errors.name && <span className="payment-error">{errors.name}</span>}
          </label>

          <label className="payment-label">
            Karta raqami
            <input
              className="payment-input"
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => {
                // Formatlash har 4 raqamdan keyin bo'sh joy qo'yish
                let val = e.target.value.replace(/\D/g, "");
                val = val.match(/.{1,4}/g)?.join(" ") || "";
                setFormData((prev) => ({ ...prev, cardNumber: val }));
              }}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && (
              <span className="payment-error">{errors.cardNumber}</span>
            )}
          </label>

          <label className="payment-label">
            Amal qilish muddati (MM/YY)
            <input
              className="payment-input"
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
            />
            {errors.expiry && <span className="payment-error">{errors.expiry}</span>}
          </label>

          <label className="payment-label">
            CVV
            <input
              className="payment-input"
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVV"
              maxLength={3}
            />
            {errors.cvv && <span className="payment-error">{errors.cvv}</span>}
          </label>

          <button type="submit" className="payment-submit-btn">
            To‘lovni tasdiqlash
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
