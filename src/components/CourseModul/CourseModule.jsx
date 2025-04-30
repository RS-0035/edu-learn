import React from "react";
import "./CourseModule.css";

const CourseModule = ({
  module,
  moduleIndex,
  activeModuleIndex,
  activeLessonIndex,
  onVideoSelect,
}) => {
  const isActiveLesson = (index) =>
    activeModuleIndex === moduleIndex && activeLessonIndex === index;

  const handleLessonClick = (index, videoUrl) => {
    onVideoSelect(moduleIndex, index, videoUrl);
  };

  return (
    <div className="course-module">
      <div className="course-number">
        {String(module.week).padStart(2, "0")}
      </div>

      <h3 className="course-title">{module.title}</h3>

      <ul className="lessons-list">
        {module.videos?.map((video, index) => (
          <li
            key={index}
            className={`lesson ${isActiveLesson(index) ? "highlighted" : ""}`}
            onClick={() => handleLessonClick(index, video.videoUrl)}
          >
            <div>
              <p className="lesson-name">{video.title}</p>
              <span className="lesson-sub">Lesson {index + 1}</span>
            </div>
            <div className="lesson-duration">
              <span role="img" aria-label="duration">
                ⏱
              </span>{" "}
              {video.duration}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseModule;
