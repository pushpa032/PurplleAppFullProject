import React from "react";

const BannerIndicators = ({ slides, currentIndex, switchIndex }) => {
  return (
    <div className="banner-indicators">
      {slides.map((_, index) => (
        <button
          key={index}
          className={`banner-indicator-item ${
            currentIndex === index ? "active" : ""
          }`}
          onClick={() => switchIndex(index)}
        ></button>
      ))}
    </div>
  );
};

export default BannerIndicators;