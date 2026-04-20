import React from "react";

const BannerItemTwo = ({ slide, stopSlide, startSlide }) => {
  return (
    <div
      className="banner-two-item"
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
    >
      <img src={slide} alt="slide" style={{ width: "100%" }} />
    </div>
  );
};

export default BannerItemTwo;