import React from "react";

const BannerControlsTwo = ({ prev, next }) => {
  return (
    <div>
      <button className="banner-two-control left" onClick={prev}>
        Prev
      </button>
      <button className="banner-two-control right" onClick={next}>
        Next
      </button>
    </div>
  );
};

export default BannerControlsTwo;