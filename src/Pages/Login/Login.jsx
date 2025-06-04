import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../../firebase";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import sarahImg from "../../assets/png/sarah.png";
import google from "../../assets/png/google.png";

import "./Login.css";
import Loader from "../../utils/Loader";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const testimonials = [
    {
      text: "Veb-dizayn kursi men uchun mustahkam poydevor yaratdi. O'qituvchilar bilimli va qo'llab-quvvatlovchi, o'quv muhiti esa qiziqarli edi. Men buni juda tavsiya qilaman!",
      user: "Sarah L",
      img: sarahImg,
    },
    {
      text: "Kurs davomida ko‘p amaliy loyihalarda qatnashdim va bu menga portfoliomi boyitishda yordam berdi.",
      user: "John D",
      img: sarahImg,
    },
    {
      text: "Ustozlarimiz o‘z ishining ustasi! Har bir darsdan zavq oldim.",
      user: "Laylo M",
      img: sarahImg,
    },
  ];
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const testimonial = testimonials[current];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const field = document.getElementsByName(firstErrorField)[0];
        if (field) field.focus();
      }
      return;
    }

    const { email, password, remember } = formData;
    setLoader(true);
    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Tizimga muvaffaqiyatli kirildi!");

      if (userCredential) {
        localStorage.setItem("username", formData.email);
      }

      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Email yoki parol noto'g'ri.");
      } else {
        alert("Xatolik yuz berdi: " + error.message);
      }
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // console.log(formData)

  return (
    <>
      <Navbar />
      <div className="login-wrap-section">
        <div className="login-wrapper container">
          {/* Testimonial Section */}
          <section className="testimonial-section">
            <div className="testimonial-header">
              <h2>Talabalar sharhlari</h2>
              <p>
                Amaliy yondashuv, tajribali o‘qituvchilar va zamonaviy darslar —
                aynan shu jihatlar bizning o‘quvchilarimizni o‘z sohasida
                muvaffaqiyatga yetaklamoqda.
              </p>
            </div>

            <div className="testimonial-box">
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-footer">
                <div className="testimonial-user">
                  <img
                    src={testimonial.img}
                    alt={testimonial.user}
                    className="user-img"
                  />
                  <strong>{testimonial.user}</strong>
                </div>
                <button className="read-btn">To'liq sharhni o'qing</button>
              </div>

              <div className="testimonial-nav">
                <button className="nav-btn" onClick={prevTestimonial}>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button className="nav-btn" onClick={nextTestimonial}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </section>

          {/* Login Section */}
          <div className="login-container">
            <div className="login-box">
              <h2 className="login-title">Kirish</h2>
              <p className="login-subtitle">
                Qaytib kelganingizdan xursandmiz! Hisobingizga kirish uchun
                tizimga kiring.
              </p>

              <form onSubmit={handleLogin} className="login-form">
                {/* Email */}
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Emailingizni kiriting..."
                  className={errors.email ? "error-input" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}

                {/* Password */}
                <label>Parol</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Parol kiriting..."
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

                {/* Remember Me */}
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <span>Meni eslaysizmi</span>
                </div>

                {/* Login Button */}
                <button type="submit" className="login-button">
                  {loader ? <Loader /> : "Tizimga kirish"}
                </button>

                {/* Divider */}
                <div className="divider">
                  <hr />
                  <span>Yoki</span>
                  <hr />
                </div>

                {/* Google Login Button */}
                <button type="button" className="google-button">
                  <img src={google} alt="Google" />
                  Google orqali kirish
                </button>

                {/* Register Link */}
                <p className="login-link">
                  Hisobingiz yo'qmi?
                  <Link to="/register">Roʻyxatdan oʻtish</Link>
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

export default Login;
