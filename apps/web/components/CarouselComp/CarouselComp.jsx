// Carousel.js
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselComp = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={`slide-${index}`} />
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComp;
