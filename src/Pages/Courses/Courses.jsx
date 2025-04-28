import React from "react";
import { useEffect, useState } from "react";
import "./Courses.css";

// firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CourseCard from "../../components/CourseCard/CourseCard";

// image
import first from "../../assets/png/first.png";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(courseList);

        setCourses(courseList);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchCourses();
  }, []);

  console.log(courses);

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
          {console.log(courses[0]?.imageUrls)}
          {courses.length > 0 ? (
            courses?.map((course, index) => (
              <CourseCard
                id={course.id}
                key={course.id || index}
                title={course.title}
                description={course.description}
                duration={course.duration}
                level={course.level}
                instructor={course.instructor}
                curriculum={course.curriculum}
                images={course.imageUrls || []}
                videos={course.videoURL || []}
              />
            ))
          ) : (
            <p className="no-courses">No courses found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Courses;
