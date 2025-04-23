import React from 'react';
import './CourseCard.css';
import { useNavigate } from 'react-router-dom';

function CourseCard({ title, description, duration, level, instructor, curriculum, images }) {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate('/open-courses'); // sahifaga yo‘naltirish
  };
  return (
    <div className="course-card">
      <div className="course-header">
        <div className="course-header-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button className="view-btn" onClick={handleViewCourse}>View Course</button>
      </div>

      <div className="course-images">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`preview ${index + 1}`} />
        ))}
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
