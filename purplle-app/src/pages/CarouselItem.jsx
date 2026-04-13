import React from "react";

const CarouselItem = ({ slide, stopSlide, startSlide }) => {
  return (
    <div
      className="carousel-item"
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
    >
      <img src={slide} alt="slide" style={{ width: "100%" }} />
    </div>
  );
};

export default CarouselItem;