import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import sms from "../../assets/png/sms.png";
import phone from "../../assets/png/phone.png";
import facebook from "../../assets/png/facebook.png";
import twitter from "../../assets/png/twitter.png";
import linkedin from "../../assets/png/linkedin.png";
import location from "../../assets/png/location.png";
import Footer from "../../components/Footer/Footer";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        ...form,
        createdAt: Timestamp.now(),
      });
      alert("Xabaringiz yuborildi!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />

      <section className="contact-intro">
        <div className="contact-left">
          <h2>Contact Us</h2>
        </div>
        <div className="contact-right">
          <p>
            Welcome to SkillBridge’s Pricing Plan page, where we offer two
            comprehensive options to cater to your needs: Free and Pro. We
            believe in providing flexible and affordable pricing options for our
            services. Whether you're an individual looking to enhance your
            skills or a business seeking professional development solutions, we
            have a plan that suits you. Explore our pricing options below and
            choose the one that best fits your requirements.
          </p>
        </div>
      </section>

      <div className="contact-form-wrapper">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  value={form.firstName}
                  onChange={handleChange}
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  value={form.lastName}
                  onChange={handleChange}
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  value={form.phone}
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                value={form.subject}
                onChange={handleChange}
                name="subject"
                type="text"
                placeholder="Enter your Subject"
              />
            </div>

            <div className="form-group">
              <label className="message-textarea">Message</label>
              <textarea
                value={form.message}
                onChange={handleChange}
                name="message"
                placeholder="Enter your Message here..."
              ></textarea>
            </div>

            <button type="submit" className="send-button">
              Send Your Message
            </button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-box">
            <span>
              <img src={sms} alt="sms" />
            </span>
            <p>support@skillbridge.com</p>
          </div>
          <div className="info-box">
            <span>
              <img src={phone} alt="phone" />
            </span>
            <p>+91 00000 00000</p>
          </div>
          <div className="info-box">
            <span>
              <img src={location} alt="location" />
            </span>
            <p>Some Where in the World</p>
          </div>
          <div className="info-box">
            <div className="social-icons">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="facebook" />
              </a>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="twitter" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="linkedin" />
              </a>
            </div>

            <p>Social Profiles</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Contact;
