"use client";
import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Navigation, Autoplay } from "swiper/modules";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import Image from "next/image";
function App() {
  const slides = [
    {
      url: "/images/oppenheimer.jpg",
    },
    {
      url: "/images/barbie2.avif",
    },
    {
      url: "/images/marvel.jpg",
    },
    {
      url: "/images/lovereset.webp",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="h-[500px] ">
      <Slider {...settings}>
        <div className="h-[500px]">
          <img
            className="z-0 px-64 w-full h-full object-cover"
            src={slides[0].url}
            alt="slide"
          />
        </div>
      </Slider>
    </div>
  );
}
export default App;

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} text-3xl bg-black`}
      style={{ left: 0, zIndex: 1000 }}
      onClick={onClick}
    >
      <RiArrowLeftCircleFill className="text-4xl z-[10000]" />
    </button>
  );
};
