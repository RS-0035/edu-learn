import React, { useEffect, useState } from "react";
import "./CourseModule.css";

const CourseModule = ({
  module,
  moduleIndex,
  activeModuleIndex,
  activeLessonIndex,
  onVideoSelect,
}) => {
  return (
    <div className="course-module">
      <div className="course-number">
        {module.week.toString().padStart(2, "0")}
      </div>
      <h3 className="course-title">{module.title}</h3>
      <ul className="lessons-list">
        {module.videos?.map((video, index) => (
          <li
            key={index}
            className={`lesson ${
              activeModuleIndex === moduleIndex && activeLessonIndex === index
                ? "highlighted"
                : ""
            }`}
            onClick={() =>
              onVideoSelect(moduleIndex, index, video.videoUrl)
            }
          >
            <div>
              <p className="lesson-name">{video.title}</p>
              <span className="lesson-sub">Lesson {index + 1}</span>
            </div>
            <div className="lesson-duration">
              <span>⏱</span> {video.duration}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseModule;
