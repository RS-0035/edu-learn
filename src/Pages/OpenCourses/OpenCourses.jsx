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
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const courseData = { id: docSnap.id, ...docSnap.data() };
          setCourse(courseData);

          if (courseData.curriculum?.length > 0) {
            const firstModule = courseData.curriculum[0];
            if (firstModule.videos?.length > 0) {
              setCurrentVideo(firstModule.videos[0].videoUrl);
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
  }, [id]);

  const handleVideoSelect = (moduleIdx, lessonIdx, videoURL) => {
    setActiveModuleIndex(moduleIdx);
    setActiveLessonIndex(lessonIdx);
    setCurrentVideo(videoURL);
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
              <YouTubePlayer videoUrl={currentVideo} />
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
