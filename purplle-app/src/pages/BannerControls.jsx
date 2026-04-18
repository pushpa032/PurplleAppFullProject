import React from "react";

const BannerControls = ({ prev, next }) => {
  return (
    <div>
      <button className="banner-control left" onClick={prev}>
        Prev
      </button>
      <button className="banner-control right" onClick={next}>
        Next
      </button>
    </div>
  );
};

export default BannerControls;