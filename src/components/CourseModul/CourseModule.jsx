import React from 'react';
import './CourseModule.css';

const CourseModule = ({ moduleNumber, title, lessons }) => {
  return (
    <div className="course-module">
      <div className="course-number">{moduleNumber.toString().padStart(2, '0')}</div>
      <h3 className="course-title">{title}</h3>
      <ul className="lesson-list">
        {lessons.map((lesson, index) => (
          <li key={index} className={`lesson ${lesson.highlighted ? 'highlighted' : ''}`}>
            <div>
              <p className="lesson-name">{lesson.name}</p>
              <span className="lesson-sub">Lesson {index + 1}</span>
            </div>
            <div className="lesson-duration">
              <span>⏱</span> {lesson.duration}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseModule;
