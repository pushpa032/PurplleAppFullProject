import { useRef, useState, useEffect } from "react";
import CarouselItem from "./CarouselItem";
import CarouselControls from "./CarouselControls";
import CarouselIndicators from "./CarouselIndicators";
import "../styles/CarouselMain.css";
import axios from "axios";

//import slide1 from "../assets/slide1.jpg";
//import slide2 from "../assets/slide2.jpg";
//import slide3 from "../assets/slide3.jpg";

/*const slides = [slide1, slide2, slide3];*/

const CarouselMain = ({
  interval = 3000,
  controls = true,
  indicators = true,
  autoPlay = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  const [slides, setSlides] = useState([]);

  const prev = () => {
    startSlideTimer();
    const index =
      currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    setCurrentSlide(index);
  };

  const next = () => {
    startSlideTimer();
    const index =
      currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    setCurrentSlide(index);
  };

  const switchIndex = (index) => {
    startSlideTimer();
    setCurrentSlide(index);
  };

  const startSlideTimer = () => {
    if (autoPlay) {
      stopSlideTimer();
      slideInterval.current = setInterval(() => {
        setCurrentSlide((current) =>
          current < slides.length - 1 ? current + 1 : 0
        );
      }, interval);
    }
  };

  const stopSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {

    //this is for to fetch the carousel image from backend
    axios.get(`https://purplleappbackend.onrender.com/carousel`)
    .then(res => setSlides(res.data))
    .catch(err => console.log(err));

    //this line for to start the slides automatically
    startSlideTimer();
    return () => stopSlideTimer();
  }, []);

  return (
    <div className="carousel-main">
      <div
        className="carousel-inner"
        style={{
          transform: `translateX(${-currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <CarouselItem
            key={index}
            slide={slide.imageUrl}
            stopSlide={stopSlideTimer}
            startSlide={startSlideTimer}
          />
        ))}
      </div>

      {indicators && (
        <CarouselIndicators
          slides={slides}
          currentIndex={currentSlide}
          switchIndex={switchIndex}
        />
      )}

      {controls && <CarouselControls prev={prev} next={next} />}
    </div>
  );
};

export default CarouselMain;