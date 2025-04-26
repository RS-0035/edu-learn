import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

function CourseCard({
  id,
  title,
  description,
  duration,
  level,
  instructor,
  curriculum,
  images,
}) {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/open-courses/${id}`);
  };
  return (
    <div className="course-card">
      {/* Course header */}

      <div className="course-header">
        <div className="course-header-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button className="view-btn" onClick={handleViewCourse}>
          View Course
        </button>
      </div>

      <div className="course-images">
        {images?.map((url, index) => {
          return <img key={index} src={url} alt={`preview ${index + 1}`} />;
        })}
      </div>

      <div className="course-meta">
        <span className="meta-item">{duration}</span>
        <span className="meta-item">{level}</span>
        <span className="instructor">By {instructor}</span>
      </div>

      <div className="curriculum-section">
        <h3>Curriculum</h3>
        <div className="curriculum-list">
          {curriculum.map((item, index) => (
            <div key={index} className="curriculum-item">
              <span className="curriculum-number">{`0${index + 1}`}</span>
              <span className="curriculum-text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
