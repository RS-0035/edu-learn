import React from "react";
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
  return (
    <div className="wrapper">
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
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter Last Name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your Email" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="Enter Phone Number" />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="Enter your Subject" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Enter your Message here..."></textarea>
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
              <span>
                <img src={facebook} alt="facebook" />
              </span>
              <span>
                <img src={twitter} alt="twitter" />
              </span>
              <span>
                <img src={linkedin} alt="linkedin" />
              </span>
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
