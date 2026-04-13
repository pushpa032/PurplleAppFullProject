/*import { useState } from "react"; 
import "../styles/Carousel.css";

import slide1 from "../assets/slide1.jpg"; 
import slide2 from "../assets/slide2.jpg"; 
import slide3 from "../assets/slide3.jpg"; 

const slides = [slide1, slide2, slide3];

function Carousel() { 

  const [current, setCurrent] = useState(0); 

  return ( 
    <div className="slider">

      <div className="slide-image"> 
        <img src={slides[current]} alt="banner" /> 
      </div>

      <button 
      className="arrow left" 
      onClick={() => 
      setCurrent(current === 0 ? slides.length - 1 : current - 1) } 
      > 
      <i className="fa-solid fa-angle-left"></i> 
      </button>


      <button 
      className="arrow right" 
      onClick={() => setCurrent((current + 1) % slides.length)} 
      > 
      <i className="fa-solid fa-angle-right"></i> 
      </button> 


      <div className="dots"> {slides.map((_, i) => ( 
        <span key={i} 
        className={current === i ? "dot active" : "dot"} 
        onClick={() => setCurrent(i)}
        /> 
        ))} 
      </div> 
  </div> 
); 
}

export default Carousel;*/