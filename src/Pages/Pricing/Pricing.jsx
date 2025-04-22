import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Pricing.css";
import PlanCard from "../../components/PlanCard/PlanCard";
import FAQItems from "../../components/FaqItems/FaqItems";

const faqs = [
  {
    question: "Can I enroll in multiple courses at once?",
    answer:
      "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
    link: { text: "Enrollment Process for Different Courses", url: "#" },
  },
  {
    question: "What kind of support can I expect from instructors?",
    answer:
      "Instructors provide support via email, forums, and live Q&A sessions depending on the course.",
  },
  {
    question:
      "Are the courses self-paced or do they have specific start and end dates?",
    answer:
      "Most courses are self-paced, but some have scheduled cohorts with set start and end dates.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "Some advanced courses may have prerequisites, which are mentioned on the course page.",
  },
  {
    question: "Can I download the course materials for offline access?",
    answer:
      "Yes, most courses allow you to download materials for offline use.",
  },
];

function Pricing() {
  const [active, setActive] = useState("monthly");

  const freeFeatures = [
    { text: "Access to selected free courses.", included: true },
    { text: "Limited course materials and resources.", included: true },
    { text: "Basic community support.", included: true },
    { text: "No certification upon completion.", included: true },
    { text: "Ad-supported platform.", included: true },
    { text: "Access to exclusive Pro Plan community forums.", included: false },
    { text: "Early access to new courses and updates.", included: false },
  ];
  const proFeatures = [
    { text: "Unlimited access to all courses.", included: true },
    { text: "Unlimited course materials and resources.", included: true },
    { text: "Priority support from instructors.", included: true },
    { text: "Course completion certificates.", included: true },
    { text: "Ad-free experience.", included: true },
    { text: "Access to exclusive Pro Plan community forums.", included: true },
    { text: "Early access to new courses and updates.", included: true },
  ];

  return (
    <div>
      <Navbar />
      <div className="pricing-hero-section">
        <div className="pricing-intro">
          <div className="pricing-left">
            <h2>Our Pricings</h2>
          </div>
          <div className="pricing-right">
            <p>
              Welcome to SkillBridge’s Pricing Plan page, where we offer two
              comprehensive options to cater to your needs: Free and Pro. We
              believe in providing flexible and affordable pricing options for
              our services. Whether you're an individual looking to enhance your
              skills or a business seeking professional development solutions,
              we have a plan that suits you. Explore our pricing options below
              and choose the one that best fits your requirements.
            </p>
          </div>
        </div>
        <div className="pricing-options">
          <div className="toggle-container">
            <button
              className={`toggle-option ${
                active === "monthly" ? "active" : ""
              }`}
              onClick={() => setActive("monthly")}
            >
              Monthly
            </button>
            <button
              className={`toggle-option ${active === "yearly" ? "active" : ""}`}
              onClick={() => setActive("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="pricing-container">
          <PlanCard title="Free" price="0" features={freeFeatures} />
          <PlanCard title="Pro" price="79" features={proFeatures} />
        </div>

        <div className="faq-section">
          <div className="faq-wrapper">
            <div className="faq-left">
              <h2>Frequently Asked Questions</h2>
              <p>
                Still you have any questions? Contact our Team via <br />
                <strong>support@skillbridge.com</strong>
              </p>
              <button className="all-faqs-btn">See All FAQ’s</button>
            </div>
            <div className="faq-right">
              {faqs.map((faq, index) => (
                <FAQItems key={index} {...faq} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Pricing;
