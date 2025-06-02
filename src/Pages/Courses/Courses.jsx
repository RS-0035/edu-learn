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
            <h2>Dizayn va rivojlanish bo'yicha onlayn kurslar</h2>
          </div>
          <div className="courses-right">
            <p>
            Onlayn kurs sahifamizga xush kelibsiz, u yerda siz o'z mahoratingizni oshirishingiz mumkin
              dizayn va ishlab chiqish ko'nikmalari. Bizdan ehtiyotkorlik bilan tanlang
              sizga taqdim etish uchun mo'ljallangan 10 ta kurslarning tanlangan tanlovi
              keng qamrovli bilim va amaliy tajriba ni o'rganing
              Quyidagi kurslarni o'qing va o'rganish sayohatingiz uchun eng mos variantni toping.
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
            <p className="no-courses">Hech qanday kurs topilmadi.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Courses;
