import React, { useEffect, useState } from "react";
import "./Courses.css";

// firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// components
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CourseCard from "../../components/CourseCard/CourseCard";

// image
import Skeleton from "../../components/Skeleton/Skeleton";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("Hamma kurslar");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Kategoriyalarni har doim quyidagicha yozamiz (example)
  const categories = [
    { label: "Hamma kurslar", value: "all" },
    { label: "IT va Dizayn", value: "IT" },
    { label: "Tillar", value: "Languages" },
    { label: "Hayotiy ko‘nikmalar", value: "LifeSkills" },
    { label: "Kasblar", value: "Profession" },
    { label: "Marketing", value: "Marketing" },
    { label: "Dasturlash", value: "Development" },
    { label: "Fanlar", value: "Subjects" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courseList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCourses(courseList);
        setIsLoading(false);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchCourses();
  }, []);

  // Filterlangan kurslar (agar "Hamma kurslar" bo'lsa, hammasi chiqadi)
  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);
  return (
    <>
      <Navbar />
      <div className="courses-section container">
        <div className="courses-intro">
          <div className="courses-left">
            <h2>Dizayn va rivojlanish bo'yicha onlayn kurslar</h2>
          </div>
          <div className="courses-right">
            <p>
              Onlayn kurs sahifamizga xush kelibsiz, u yerda siz o'z
              mahoratingizni oshirishingiz mumkin dizayn va ishlab chiqish
              ko'nikmalari. Bizdan ehtiyotkorlik bilan tanlang sizga taqdim
              etish uchun mo'ljallangan 10 ta kurslarning tanlangan tanlovi keng
              qamrovli bilim va amaliy tajriba ni o'rganing. Quyidagi kurslarni
              o'qing va o'rganish sayohatingiz uchun eng mos variantni toping.
            </p>
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="course-filter">
          {categories.map((cat) => (
            <div
              key={cat.value}
              className={`filter-btn ${
                selectedCategory === cat.value ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.value)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") selectedCategory(cat.value);
              }}
            >
              {cat.label}
            </div>
          ))}
        </div>

        {/* COURSE LIST */}
        <div className="course-groups">
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard
                id={course.id}
                key={course.id || index}
                title={course.title}
                description={course.description}
                duration={course.duration}
                level={course.level}
                instructor={course.instructor}
                price={course.price}
                curriculum={course.curriculum}
                images={course.imageUrls || []}
                videos={course.videoURL || []}
                category={course.category} // agar kerak bo'lsa
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
