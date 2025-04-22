import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Courses.css";
import CourseCard from "../../components/CourseCard/CourseCard";
import first from "../../assets/png/first.png";

function Courses() {
  const courses = [
    {
      title: "Web Design Fundamentals",
      description:
        "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
      duration: "4 Weeks",
      level: "Beginner",
      instructor: "John Smith",
      curriculum: [
        "Introduction to HTML",
        "Styling with CSS",
        "Introduction to Responsive Design",
        "Design Principles for Web",
        "Building a Basic Website",
      ],
      images: [first, first, first],
    },
    {
      title: "UI/UX Design",
      description:
        "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
      duration: "6 Weeks",
      level: "Intermediate",
      instructor: "Emily Johnson",
      curriculum: [
        "Introduction to UI/UX Design",
        "User Research and Personas",
        "Wireframing and Prototyping",
        "Visual Design and Branding",
        "Usability Testing and Iteration",
      ],
      images: [first, first, first],
    },
  ];

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
        <div className="course-groups">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              duration={course.duration}
              level={course.level}
              instructor={course.instructor}
              curriculum={course.curriculum}
              images={course.images}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Courses;
