import React, { useState } from 'react';
import './YouTubePlayer.css';

const YouTubePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "dQw4w9WgXcQ"; // o'zingizning video ID

  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="youtube-wrapper">
      {isPlaying ? (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="thumbnail" onClick={() => setIsPlaying(true)}>
          <img src={thumbnail} alt="YouTube Thumbnail" />
          <div className="play-button">&#9658;</div>
        </div>
      )}
    </div>
  );
};

export default YouTubePlayer;
