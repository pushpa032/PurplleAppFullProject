import { useRef, useState, useEffect } from "react";
import BannerItemTwo from "./BannerItemTwo";
import BannerControlsTwo from "./BannerControlsTwo";
import BannerIndicatorsTwo from "./BannerIndicatorsTwo";
import "../styles/BannerMainTwo.css";
import axios from "axios";

//import slide1 from "../assets/slide1.jpg";
//import slide2 from "../assets/slide2.jpg";
//import slide3 from "../assets/slide3.jpg";

/*const slides = [slide1, slide2, slide3];*/

const BannerMainTwo = ({
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
    axios.get(`https://purplleappbackend.onrender.com/bannerTwo`)
    .then(res => setSlides(res.data))
    .catch(err => console.log(err));

    //this line for to start the slides automatically
    startSlideTimer();
    return () => stopSlideTimer();
  }, []);

  return (
    <div className="banner-two-main">
      <div
        className="banner-two-inner"
        style={{
          transform: `translateX(${-currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <BannerItemTwo
            key={index}
            slide={slide.imageUrl}
            stopSlide={stopSlideTimer}
            startSlide={startSlideTimer}
          />
        ))}
      </div>

      {indicators && (
        <BannerIndicatorsTwo
          slides={slides}
          currentIndex={currentSlide}
          switchIndex={switchIndex}
        />
      )}

      {controls && <BannerControlsTwo prev={prev} next={next} />}
    </div>
  );
};

export default BannerMainTwo;