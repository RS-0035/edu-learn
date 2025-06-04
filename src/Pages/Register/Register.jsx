import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";
import sarahImg from "../../assets/png/sarah.png";
import google from "../../assets/png/google.png";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../../firebase";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

import Loader from "../../utils/Loader";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    agree: false,
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
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Full Name is required.";
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
    if (!validate()) return;

    const { displayName, email, password } = formData;
    setLoader(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore-ga saqlaymiz
      await setDoc(doc(db, "users", user.uid), {
        name: displayName,
        email: email,
      });

      // Console ga chiqaramiz
      console.log("Foydalanuvchi ma'lumotlari:", {
        name: displayName,
        email: email,
      });

      alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");

      setFormData({ displayName: "", email: "", password: "", agree: false });
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Xatolik:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        alert("Bu email allaqachon ro‘yxatdan o‘tgan.");
      } else if (error.code === "auth/weak-password") {
        alert("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      } else {
        alert("Xatolik yuz berdi: " + error.message);
      }
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert("Google orqali muvaffaqiyatli tizimga kirdingiz!");
      // console.log(user)
      // if (user) {
      //   localStorage.setItem('user', user)
      // }
      // // navigate("/account");
      // window.location.href = '/'
      // window.location.reload()
    } catch (error) {
      alert("Xatolik: " + error.message);
    }
  };

  console.log(formData);

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
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="Ismingizni kiriting..."
                  className={errors.displayName ? "error-input" : ""}
                />
                {errors.displayName && (
                  <span className="error-message">{errors.displayName}</span>
                )}

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
                  {loader ? <Loader /> : "Roʻyxatdan oʻtish"}
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
