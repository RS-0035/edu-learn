import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";
import sarahImg from "../../assets/png/sarah.png";
import google from "../../assets/png/google.png";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the Terms and Privacy Policy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Agar error yo'q bo'lsa true
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return; // ❗ Validationdan o'tmasa register qilmaydi

    const { email, password } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered:", user);
      alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");
      setFormData({ fullName: "", email: "", password: "", agree: false });
      navigate("/account"); // Register bo'lgandan keyin account pagega o'tkazamiz
    } catch (error) {
      console.error("Xatolik:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        alert("Bu email allaqachon ro‘yxatdan o‘tgan.");
      } else if (error.code === "auth/weak-password") {
        alert("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      } else {
        alert("Xatolik yuz berdi: " + error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google orqali tizimga kirildi:", user);
      alert("Google orqali muvaffaqiyatli tizimga kirdingiz!");
      navigate("/account");
    } catch (error) {
      console.error("Google login xatosi:", error.code, error.message);
      alert("Xatolik: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-wrap-section">
        <div className="register-wrapper container">
          {/* Left section (testimonial) */}
          <section className="testimonial-section">
            <div className="testimonial-header">
              <h2>Talabalar sharhlari</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
                eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et.
                Ac cum eget habitasse in velit fringilla feugiat senectus in.
              </p>
            </div>

            <div className="testimonial-box">
              <p className="testimonial-text">
                Veb-dizayn kursi men uchun mustahkam poydevor yaratdi. The
                o'qituvchilar bilimli va qo'llab-quvvatlovchi va interaktiv edi
                o'quv muhiti qiziqarli edi. Men buni juda tavsiya qilaman!
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-user">
                  <img src={sarahImg} alt="Sarah L" className="user-img" />
                  <strong>Sarah L</strong>
                </div>
                <button className="read-btn">To'liq hikoyani o'qing</button>
              </div>
            </div>

            <div className="testimonial-nav">
              <button className="nav-btn">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button className="nav-btn">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </section>

          {/* Right section (form) */}
          <div className="register-container">
            <div className="register-box">
              <h2 className="register-title">Roʻyxatdan oʻtish</h2>
              <p className="register-subtitle">
                Eksklyuziv xususiyatlarni ochish uchun hisob yarating.
              </p>

              <form onSubmit={handleRegister} className="register-form">
                <label>To'liq ism</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className={errors.fullName ? "error-input" : ""}
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}

                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className={errors.email ? "error-input" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}

                <label>Parol</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                    className={errors.password ? "error-input" : ""}
                  />
                  <span className="eye-icon" onClick={togglePasswordVisibility}>
                    <i
                      className={`fa-solid ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </span>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}

                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                  />
                  <span>
                    <a href="#">Foydalanish shartlari</a> va{" "}
                    <a href="#">Maxfiylik siyosati</a>ga roziman
                  </span>
                </div>

                <button type="submit" className="register-button">
                  Roʻyxatdan oʻtish
                </button>

                <div className="divider">
                  <hr />
                  <span>Yoki</span>
                  <hr />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="google-button"
                >
                  <img src={google} alt="Google" />
                  Google bilan ro'yxatdan o'ting
                </button>

                <p className="login-link">
                  Hisobingiz bormi?<Link to="/login">Kirish</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
