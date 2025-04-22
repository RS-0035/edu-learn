import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Courses() {
  return (
    <>
      <Navbar />
      <div className="courses-section">
        <div className="courses-intro">
          <div className="courses-left">
            <h2>Online Courses on Design and Development</h2>
          </div>
          <div className="courses-right">
            <p>
              Welcome to our online course page, where you can enhance your
              skills in design and development. Choose from our carefully
              curated selection of 10 courses designed to provide you with
              comprehensive knowledge and practical experience. Explore the
              courses below and find the perfect fit for your learning journey.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Courses;
