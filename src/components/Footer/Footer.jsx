import React from "react";
import "./Footer.css";
import logo from "../../assets/png/logo.png";
import sms from "../../assets/png/sms.png";
import location from "../../assets/png/location.png";
import phone from "../../assets/png/phone.png";
import facebook from "../../assets/png/facebook.png";
import twitter from "../../assets/png/twitter.png";
import linkedin from "../../assets/png/linkedin.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col logo-col">
          <img src={logo} alt="Skillbridge Logo" className="footer-logo" />
          <p>
            <img width={30} src={sms} alt="sms" /> hello@skillbridge.com
          </p>
          <p>
            <img width={30} src={phone} alt="phone" /> +91 91813 23 2309
          </p>
          <p>
            <img width={30} src={location} alt="location" /> Somewhere in the
            World
          </p>
        </div>

        <div className="footer-col-wrapper">
          <div className="footer-col">
            <h4>Home</h4>
            <ul>
              <li>
                <a href="/benefits">Benefits</a>
              </li>
              <li>
                <a href="/courses">Our Courses</a>
              </li>
              <li>
                <a href="/testimonials">Our Testimonials</a>
              </li>
              <li>
                <a href="/faq">Our FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li>
                <a href="/company">Company</a>
              </li>
              <li>
                <a href="/achievements">Achievements</a>
              </li>
              <li>
                <a href="/goals">Our Goals</a>
              </li>
            </ul>
          </div>

          <div className="footer-col-social">
            <h4>Social Profiles</h4>
            <div className="social-icons-footer">
              <a href="#">
                <img width={44} src={facebook} alt="facebook" />
              </a>
              <a href="#">
                <img width={44} src={twitter} alt="twitter" />
              </a>
              <a href="#">
                <img width={44} src={linkedin} alt="linkedin" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 Skillbridge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
