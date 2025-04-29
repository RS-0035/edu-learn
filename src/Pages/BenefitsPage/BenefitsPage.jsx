import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./BenefitsPage.css";

import arrow from '../../assets/png/arrow.png'

const benefits = [
  {
    number: "01",
    title: "Flexible Learning Schedule",
    description:
      "Fit your coursework around your existing commitments and obligations.",
  },
  {
    number: "02",
    title: "Expert Instruction",
    description:
      "Learn from industry experts who have hands-on experience in design and development.",
  },
  {
    number: "03",
    title: "Diverse Course Offerings",
    description:
      "Explore a wide range of design and development courses covering various topics.",
  },
  {
    number: "04",
    title: "Updated Curriculum",
    description:
      "Access courses with up-to-date content reflecting the latest trends and industry practices.",
  },
  {
    number: "05",
    title: "Practical Projects and Assignments",
    description:
      "Develop a portfolio showcasing your skills and abilities to potential employers.",
  },
  {
    number: "06",
    title: "Interactive Learning Environment",
    description:
      "Collaborate with fellow learners, exchanging ideas and feedback to enhance your understanding.",
  },
];

const BenefitsPage = () => {
  return (
    <>
      <Navbar />

      <div className="benefits-container-header">
        <div className="benefits-top-left">
          <h2 className="benefits-heading">All Benefits</h2>
        </div>
        <div className="benefits-top-right">
          <p className="benefits-subheading">
            Discover all the advantages of learning with us, designed to make
            your educational experience flexible, modern, and engaging.
          </p>
        </div>
      </div>

      <div className="benefits-wrapper">
        <div className="benefits-list">
          {benefits.map((item, index) => (
            <div key={index} className="benefit-item">
              <div className="benefit-index">{item.number}</div>
              <h3 className="benefit-name">{item.title}</h3>
              <p className="benefit-detail">{item.description}</p>
              <a href="#" className="arrow-container">
                <img
                  className="arrow-btn"
                  width={50}
                  height={50}
                  src={arrow}
                  alt="arrow img"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BenefitsPage;
