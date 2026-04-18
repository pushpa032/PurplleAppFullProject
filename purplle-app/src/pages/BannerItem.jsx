import React from "react";

const BannerItem = ({ slide, stopSlide, startSlide }) => {
  return (
    <div
      className="banner-item"
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
    >
      <img src={slide} alt="slide" style={{ width: "100%" }} />
    </div>
  );
};

export default BannerItem;