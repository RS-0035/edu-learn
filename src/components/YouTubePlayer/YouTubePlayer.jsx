import React, { useState } from "react";
import "./YouTubePlayer.css";

const YouTubePlayer = ({ videoUrl }) => {
  if (!videoUrl) {
    return <div className="youtube-player">No video selected</div>;
  }

  const getYouTubeEmbedUrl = (url) => {
    try {
      const videoId = new URL(url).pathname.split("/").pop();
      console.log(videoUrl);
      
      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return "";
    }
  };
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="youtube-wrapper">
      <div className="video-container">
        <iframe
          width="100%"
          height="450"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

///eferferfefrkgnrkgnrkgrklgn
export default YouTubePlayer;
