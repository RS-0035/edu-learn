import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Login.css";
import sarahImg from "../../assets/png/sarah.png";
import Footer from "../../components/Footer/Footer";

function Login() {
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

  return (
    <>
      <Navbar />
      <div className="login-wrapper">
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

        <div className="login-container">
          <div className="login-box">
            <h2 className="login-title">Login</h2>
            <p className="login-subtitle">
            Welcome back! Please log in to access your account.
            </p>

            <form onSubmit={handleSubmit} className="login-form">

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
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  required
                />
                <span className="eye-icon">
                  <i className="fa-solid fa-eye-slash"></i>
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
                  Remember Me
                </span>
              </div>

              <button type="submit" className="login-button">
                Login
              </button>

              <div className="divider">
                <hr />
                <span>OR</span>
                <hr />
              </div>

              <button type="button" className="google-button">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Google__G__Logo.svg"
                  alt="Google"
                />
                Login with Google
              </button>

              <p className="login-link">
                Don't have an account? <a href="#">Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
