import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Register.css";
import sarahImg from "../../assets/png/sarah.png";
import google from "../../assets/png/google.png";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.agree) {
      console.log("Form submitted", form);
    } else {
      alert("Please agree to the Terms of Use and Privacy Policy.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="register-wrapper">
        <section className="testimonial-section">
          <div className="testimonial-header">
            <h2>Students Testimonials</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </p>
          </div>

          <div className="testimonial-box">
            <p className="testimonial-text">
              The web design course provided a solid foundation for me. The
              instructors were knowledgeable and supportive, and the interactive
              learning environment was engaging. I highly recommend it!
            </p>

            <div className="testimonial-footer">
              <div className="testimonial-user">
                <img src={sarahImg} alt="Sarah L" className="user-img" />
                <strong>Sarah L</strong>
              </div>
              <button className="read-btn">Read Full Story</button>
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

        <div className="register-container">
          <div className="register-box">
            <h2 className="register-title">Register</h2>
            <p className="register-subtitle">
              Create an account to unlock exclusive features.
            </p>

            <form onSubmit={handleSubmit} className="register-form">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your Name"
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                required
              />

              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  required
                />
                <span className="eye-icon" onClick={togglePasswordVisibility}>
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </span>
              </div>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                <span>
                  I agree with <a href="#">Terms of Use</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </span>
              </div>

              <button type="submit" className="register-button">
                Register
              </button>

              <div className="divider">
                <hr />
                <span>OR</span>
                <hr />
              </div>

              <button type="button" className="google-button">
                <img src={google} alt="Google" />
                Register with Google
              </button>

              <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Register;
