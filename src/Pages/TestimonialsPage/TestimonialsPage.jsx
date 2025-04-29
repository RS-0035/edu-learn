import React from "react";

import "./TestimonialsPage.css";

// components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

// img
import sarahImg from "../../assets/png/sarah.png";

function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah L",
      text: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
      image: sarahImg,
    },
    {
      id: 2,
      name: "Jason M",
      text: "The UI/UX design course exceeded my expectations. The instructor’s expertise and practical assignments helped me improve my design skills. I feel more confident in my career now. Thank you!",
      image: sarahImg,
    },
    {
      id: 3,
      name: "Emily R",
      text: "The mobile app development course was fantastic! The step-by-step tutorials and hands-on projects helped me grasp the concepts easily. I’m now building my own app. Great course!",
      image: sarahImg,
    },
    {
      id: 4,
      name: "Michael K",
      text: "I enrolled in the graphic design course as a beginner, and it was the perfect starting point. The instructor’s guidance and feedback improved my design abilities significantly. I’m grateful for this course!",
      image: sarahImg,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="testimonials-wrapper">
        <div className="testimonials-intro">
          <div className="testimonials-left">
            <h2>All Testimonials</h2>
          </div>
          <div className="testimonials-right">
            <p>
              Welcome to our online course page, where you can enhance your
              skills in design and development. Choose from our carefully
              curated selection of 10 courses designed to provide you with
              comprehensive knowledge and practical experience. Explore the
              courses below and find the perfect fit for your learning journey.
            </p>
          </div>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <p>{t.text}</p>
              <div className="testimonial-footer">
                <div className="testimonial-user">
                  <img src={t.image} alt={t.name} className="user-img" />
                  <strong>{t.name}</strong>
                </div>
                <button className="read-btn">Read Full Story</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TestimonialsPage;
