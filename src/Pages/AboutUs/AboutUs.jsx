import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./AboutUS.css";
import toj from "../../assets/png/toj.png";
import medal from "../../assets/png/medal.png";
import comic from "../../assets/png/comic.png";
import shield from "../../assets/png/shield.png";
import bag from "../../assets/png/bag.png";
import book from "../../assets/png/book.png";
import puzzle from "../../assets/png/puzzle.png";
import lamp from "../../assets/png/lamp.png";

function AboutUs() {
  const achievements = [
    {
      icon: toj,
      title: "Trusted by Thousands",
      description:
        "We have successfully served thousands of students, helping them unlock their potential and achieve their career goals.",
    },
    {
      icon: medal,
      title: "Award-Winning Courses",
      description:
        "Our courses have received recognition and accolades in the industry for their quality, depth of content, and effective teaching methodologies.",
    },
    {
      icon: comic,
      title: "Positive Student Feedback",
      description:
        "We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials.",
    },
    {
      icon: shield,
      title: "Industry Partnerships",
      description:
        "We have established strong partnerships with industry leaders, enabling us to provide our students with access to the latest tools and technologies.",
    },
  ];
  const goals = [
    {
      icon: bag,
      title: "Provide Practical Skills",
      description:
        "We focus on delivering practical skills that are relevant to the current industry demands. Our courses are designed to equip learners with the knowledge and tools needed to excel in their chosen field.",
    },
    {
      icon: book,
      title: "Faster Creative Problem-Solving",
      description:
        "We encourage creative thinking and problem-solving abilities, allowing our students to tackle real-world challenges with confidence and innovation.",
    },
    {
      icon: puzzle,
      title: "Promote Collaboration and Community",
      description:
        "We believe in the power of collaboration and peer learning. Our platform fosters a supportive and inclusive community where learners can connect, share insights, and grow together.",
    },
    {
      icon: lamp,
      title: "Stay Ahead of the Curve",
      description:
        "The digital landscape is constantly evolving, and we strive to stay at the forefront of industry trends. We regularly update our course content to ensure our students receive the latest knowledge and skills.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="about-us-section" id="company">
        <div className="about-us-intro">
          <div className="about-us-left">
            <h2>About Skillbridge</h2>
          </div>
          <div className="about-us-right">
            <p>
              Welcome to our platform, where we are passionate about empowering
              individuals to master the world of design and development. We
              offer a wide range of online courses designed to equip learners
              with the skills and knowledge needed to succeed in the
              ever-evolving digital landscape.
            </p>
          </div>
        </div>
      </div>
      <div className="ag-section-wrapper">
        <section className="ag-achievements-section" id="achievements">
          <h2 className="ag-section-title">Achievements</h2>
          <p className="ag-section-subtitle">
            Our commitment to excellence has led us to achieve significant
            milestones along our journey. Here are some of our notable
            achievements.
          </p>
          <div className="ag-card-container">
            {achievements.map((item, idx) => (
              <div className="ag-card" key={idx}>
                <div className="ag-card-icon">
                  <img width={56} src={item.icon} alt="Image" />
                </div>
                <h3 className="ag-card-title">{item.title}</h3>
                <p className="ag-card-text">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="ag-goals-section" id="goals">
          <h2 className="ag-section-title">Our Goals</h2>
          <p className="ag-section-subtitle">
            At SkillBridge, our goal is to empower individuals from all
            backgrounds to thrive in the world of design and development. We
            believe that education should be accessible and transformative,
            enabling learners to pursue their passions and make a meaningful
            impact. Through our carefully crafted courses, we aim to
          </p>
          <div className="ag-card-container">
            {goals.map((item, idx) => (
              <div className="ag-card" key={idx}>
                <div className="ag-card-icon">
                  <img width={56} src={item.icon} alt="Image" />
                </div>
                <h3 className="ag-card-title">{item.title}</h3>
                <p className="ag-card-text">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
export default AboutUs;
