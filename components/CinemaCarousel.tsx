"use client";
import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCarousel.css";
// import { Navigation, Autoplay } from "swiper/modules";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import Image from "next/image";
const CinemaCarousel: React.FC<{ slides: string[] }> = ({ slides }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "200px",
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 1000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="bg-white h-[350px]">
      <Slider {...settings} className="h-[350px] overflow-hidden">
        {slides.map((slide) => (
          <div key={slide} style={{ width: 880 }}>
            <img
              src={slide}
              className="px-6 w-full h-full object-cover max-h-[330px]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default CinemaCarousel;

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    ></div>
  );
}
