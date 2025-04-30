import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

/**
 * CourseCard Component
 * Props:
 * - id, title, description, duration, level
 * - instructor, curriculum, images (unused), videos
 */

function CourseCard({
  id,
  title,
  description,
  duration,
  level,
  instructor,
  curriculum,
  videos,
}) {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/open-courses/${id}`);
  };

  /**
   * Extract YouTube video thumbnail from a video URL.
   * Supports URLs like: https://youtube.com/live/UMFtEGTh7WU
   */
  const getYouTubeThumbnail = (videoUrl) => {
    if (!videoUrl) return "";
    try {
      const url = new URL(videoUrl);
      const videoId = url.pathname.split("/").pop();
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } catch (err) {
      console.error("Invalid video URL:", videoUrl);
      return "";
    }
  };

  return (
    <div className="course-card">
      {/* Header: Title + Description + Button */}
      <div className="course-header">
        <div className="course-header-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button className="view-btn" onClick={handleViewCourse}>
          View Course
        </button>
      </div>

      {/* Video Thumbnails */}
      <div className="course-images">
        {videos?.length > 0 ? (
          videos.slice(0, 3).map((video, index) => (
            <img
              key={index}
              src={getYouTubeThumbnail(video)}
              alt={`Course Video ${index + 1}`}
              className="course-thumbnail"
            />
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>

      {/* Meta Information */}
      <div className="course-meta">
        <span className="meta-item">{duration}</span>
        <span className="meta-item">{level}</span>
        <span className="instructor">By {instructor}</span>
      </div>

      {/* Curriculum Section */}
      {curriculum?.length > 0 && (
        <div className="curriculum-section">
          <h3>Curriculum</h3>
          <div className="curriculum-list">
            {curriculum.map((item, index) => (
              <div key={index} className="curriculum-item">
                <span className="curriculum-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="curriculum-text">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
