import { useState } from 'react';
import BannerMainTwo from "./BannerMainTwo";

/*import slide1 from "../assets/slide1.jpg"; 
import slide2 from "../assets/slide2.jpg"; 
import slide3 from "../assets/slide3.jpg"; 
const slides = [slide1, slide2, slide3]*/


function BannerPageTwo() {
    const slides = []


    return (
        <div className="BannerPage-two-Container">
            <BannerMainTwo slides = {slides}  controls indicators  />
            
        </div>
    )

}

export default BannerPageTwo;