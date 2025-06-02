import React, { useState, useRef } from "react";
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

  const [errors, setErrors] = useState({});
  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    subject: useRef(null),
    message: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Faqat raqamlarni qabul qilamiz
      if (!/^\d*$/.test(value)) {
        return; // Harf yozilsa umuman o'zgartirmaymiz
      }
    }

    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false }); // input to'g'irlanganda xatoni yo'qotamiz
  };

  const validate = () => {
    const newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Bo'sh qolmasligi kerak";
      }
    });

    if (form.phone && !/^\d+$/.test(form.phone)) {
      newErrors.phone = "Faqat raqam kiriting";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      inputRefs[firstErrorField].current.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

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
      setErrors({});
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xatolik yuz berdi: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />

      <section className="contact-section-class container">
        <div className="contact-intro">
          <div className="contact-left">
            <h2>Biz bilan bog'lanish</h2>
          </div>
          <div className="contact-right">
            <p>
              EduLearnning Narxlar rejasi sahifasiga xush kelibsiz, biz ikkita
              taklif qilamiz Ehtiyojlaringizni qondirish uchun keng qamrovli
              variantlar: Bepul va Pro. Biz biz uchun moslashuvchan va arzon
              narxlardagi variantlarni taqdim etishga ishonamiz xizmatlar. Siz
              o'zingizni yaxshilashga intilayotgan shaxs bo'lasizmi ko'nikmalar
              yoki kasbiy rivojlanish echimlarini izlayotgan biznes, biz sizga
              mos keladigan rejaga ega bo'ling. Quyida bizning narxlash
              variantlarini ko'rib chiqing va sizning talablaringizga eng mos
              keladiganini tanlang.
            </p>
          </div>
        </div>
      </section>

      <div className="contact-form-wrap">
        <div className="contact-form-wrapper container">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Ism</label>
                  <input
                    ref={inputRefs.firstName}
                    value={form.firstName}
                    onChange={handleChange}
                    name="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    className={errors.firstName ? "error-input" : ""}
                  />
                </div>
                <div className="form-group">
                  <label>Familiya</label>
                  <input
                    ref={inputRefs.lastName}
                    value={form.lastName}
                    onChange={handleChange}
                    name="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    className={errors.lastName ? "error-input" : ""}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    ref={inputRefs.email}
                    value={form.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    className={errors.email ? "error-input" : ""}
                  />
                </div>
                <div className="form-group">
                  <label>Telefon</label>
                  <input
                    ref={inputRefs.phone}
                    value={form.phone}
                    onChange={handleChange}
                    name="phone"
                    type="tel"
                    placeholder="Enter Phone Number"
                    className={errors.phone ? "error-input" : ""}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Fan</label>
                <input
                  ref={inputRefs.subject}
                  value={form.subject}
                  onChange={handleChange}
                  name="subject"
                  type="text"
                  placeholder="Enter your Subject"
                  className={errors.subject ? "error-input" : ""}
                />
              </div>

              <div className="form-group">
                <label className="message-textarea">Xabar</label>
                <textarea
                  ref={inputRefs.message}
                  value={form.message}
                  onChange={handleChange}
                  name="message"
                  placeholder="Enter your Message here..."
                  className={errors.message ? "error-input" : ""}
                ></textarea>
              </div>

              <button type="submit" className="send-button">
                Xabaringizni yuboring
              </button>
            </form>
          </div>

          {/* Contact Info */}
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

              <p>Ijtimoiy profillar</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
