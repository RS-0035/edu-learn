import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./OpenCourses.css";
import Footer from "../../components/Footer/Footer";
import CourseModule from "../../components/CourseModul/CourseModule";
import YoutubePlayer from "../../components/YoutubePlayer/YoutubePlayer";

function OpenCourses() {
  const modules = [
    {
      moduleNumber: 1,
      title: "Introduction to UI/UX Design",
      lessons: [
        {
          name: "Understanding UI/UX Design Principles",
          duration: "45 Minutes",
        },
        {
          name: "Importance of User-Centered Design",
          duration: "1 Hour",
          highlighted: true,
        },
        {
          name: "The Role of UI/UX Design in Product Development",
          duration: "45 Minutes",
        },
      ],
    },
    {
      moduleNumber: 2,
      title: "User Research and Analysis",
      lessons: [
        { name: "Conducting User Research and Interviews", duration: "1 Hour" },
        { name: "Analyzing User Needs and Behavior", duration: "1 Hour" },
        {
          name: "Creating User Personas and Scenarios",
          duration: "45 Minutes",
        },
      ],
    },
    {
      moduleNumber: 3,
      title: "Wireframing and Prototyping",
      lessons: [
        {
          name: "Introduction to Wireframing Tools and Techniques",
          duration: "1 Hour",
        },
        { name: "Creating Low-Fidelity Wireframes", duration: "1 Hour" },
        { name: "Prototyping and Interactive Mockups", duration: "1 Hour" },
      ],
    },
    {
      moduleNumber: 4,
      title: "Visual Design and Branding",
      lessons: [
        {
          name: "Color Theory and Typography in UI Design",
          duration: "1 Hour",
        },
        { name: "Visual Hierarchy and Layout Design", duration: "1 Hour" },
        { name: "Creating a Strong Brand Identity", duration: "45 Minutes" },
      ],
    },
    {
      moduleNumber: 5,
      title: "Usability Testing and Iteration",
      lessons: [
        {
          name: "Usability Testing Methods and Techniques",
          duration: "1 Hour",
        },
        { name: "Analyzing Usability Test Results", duration: "45 Minutes" },
        { name: "Iterating and Improving UX Designs", duration: "45 Minutes" },
      ],
    },
  ];
  return (
    <>
      <Navbar />
      <div className="open-courses-section">
        <div className="open-courses-intro">
          <div className="open-courses-left">
            <h2>UI/UX Design Course</h2>
          </div>
          <div className="open-courses-right">
            <p>
              Welcome to our UI/UX Design course! This comprehensive program
              will equip you with the knowledge and skills to create exceptional
              user interfaces (UI) and enhance user experiences (UX). Dive into
              the world of design thinking, wireframing, prototyping, and
              usability testing. Below is an overview of the curriculum
            </p>
          </div>
        </div>
        <div className="video-play-section">
          <YoutubePlayer />
        </div>
        <div className="course-page">
          {modules.map((mod, idx) => (
            <CourseModule key={idx} {...mod} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default OpenCourses;
