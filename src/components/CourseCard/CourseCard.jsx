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
    videos,
  }) {
    const navigate = useNavigate();

    const handleViewCourse = () => {
      navigate(`/open-courses/${id}`);
    };

    console.log(videos);

    const getYouTubeThumbnail = (videoUrl) => {
      if (!videoUrl) return "";
      const url = new URL(videoUrl);
      const videoId = url.pathname.split("/").pop(); // "live/UMFtEGTh7WU" -> "UMFtEGTh7WU"
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
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
          {videos && videos.length > 0 ? (
            videos
              .slice(0, 3)
              .map((video, index) => (
                <img
                  key={index}
                  src={getYouTubeThumbnail(video)}
                  alt={`Course Video ${index + 1}`}
                />
              ))
          ) : (
            <p>No videos available</p>
          )}
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
                <span className="curriculum-text">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default CourseCard;
