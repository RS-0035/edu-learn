import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CourseModule from "../../components/CourseModul/CourseModule";
import YouTubePlayer from "../../components/YouTubePlayer/YouTubePlayer";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./OpenCourses.css";
import Skeleton from "../../components/Skeleton/Skeleton";

function OpenCourses() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState("");
  const [hasPurchased, setHasPurchased] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [currentVideoIsFree, setCurrentVideoIsFree] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = { id: docSnap.id, ...docSnap.data() };
          setCourse(courseData);

          if (courseData.curriculum?.length > 0) {
            let firstVideoUrl = "";
            let firstVideoIsFree = false;
            let firstModuleIdx = 0;
            let firstLessonIdx = 0;

            if (hasPurchased) {
              // Agar kurs sotib olingan bo‘lsa, birinchi video
              firstVideoUrl = courseData.curriculum[0].videos[0].videoUrl;
              firstVideoIsFree = courseData.curriculum[0].videos[0].isFree;
            } else {
              // Kurs sotib olinmagan, bepul birinchi videoni topamiz
              outer: for (let m = 0; m < courseData.curriculum.length; m++) {
                const module = courseData.curriculum[m];
                for (let l = 0; l < module.videos.length; l++) {
                  if (module.videos[l].isFree) {
                    firstVideoUrl = module.videos[l].videoUrl;
                    firstVideoIsFree = true;
                    firstModuleIdx = m;
                    firstLessonIdx = l;
                    break outer; // to‘xtatamiz, birinchi bepul topildi
                  }
                }
              }
            }

            if (firstVideoUrl) {
              setCurrentVideo(firstVideoUrl);
              setCurrentVideoIsFree(firstVideoIsFree);
              setActiveModuleIndex(firstModuleIdx);
              setActiveLessonIndex(firstLessonIdx);
            }
          }
        } else {
          console.log("Course not found");
        }
      } catch (err) {
        console.error("Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, hasPurchased]);

  useEffect(() => {
    const purchasedCourses =
      localStorage.getItem("purchased_courses")?.split(",") || [];
    setHasPurchased(purchasedCourses.includes(id)); // yoki Firebase’dan tekshir
  }, [id]);

  const handleVideoSelect = (moduleIdx, lessonIdx, video) => {
    console.log(video);

    if (!video.isFree && !hasPurchased) {
      alert("Bu dars faqat to‘lovdan keyin ko‘rish mumkin.");
      return;
    }
    setActiveModuleIndex(moduleIdx);
    setActiveLessonIndex(lessonIdx);
    setCurrentVideo(video.videoUrl);
    setCurrentVideoIsFree(video.isFree);
  };

  return (
    <>
      <Navbar />
      <div className="open-courses-section container">
        {loading ? (
          <>
            <div className="open-courses-intro">
              <Skeleton height={40} width="60%" />
              <Skeleton height={20} width="90%" />
              <Skeleton height={20} width="80%" />
            </div>
            <div className="video-play-section">
              <Skeleton height={300} />
            </div>
            <div className="course-page">
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </div>
          </>
        ) : (
          <>
            <div className="open-courses-intro">
              <div className="open-courses-left">
                <h2>{course.title}</h2>
              </div>
              <div className="open-courses-right">
                <p>{course.description}</p>
              </div>
            </div>

            <div className="video-play-section">
              {hasPurchased || currentVideoIsFree ? (
                <YouTubePlayer videoUrl={currentVideo} />
              ) : (
                <div className="locked-video-message">
                  <p>
                    🚫 Ushbu videoni ko‘rish uchun avval kursni sotib oling.
                  </p>
                </div>
              )}
            </div>

            <div className="course-page">
              {course.curriculum?.map((module, idx) => (
                <CourseModule
                  key={idx}
                  module={module}
                  activeModuleIndex={activeModuleIndex}
                  activeLessonIndex={activeLessonIndex}
                  onVideoSelect={handleVideoSelect}
                  moduleIndex={idx}
                  hasPurchasedCourse={hasPurchased}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default OpenCourses;
