import React from "react";

const BannerIndicatorsTwo = ({ slides, currentIndex, switchIndex }) => {
  return (
    <div className="banner-two-indicators">
      {slides.map((_, index) => (
        <button
          key={index}
          className={`banner-two-indicator-item ${
            currentIndex === index ? "active" : ""
          }`}
          onClick={() => switchIndex(index)}
        ></button>
      ))}
    </div>
  );
};

export default BannerIndicatorsTwo;