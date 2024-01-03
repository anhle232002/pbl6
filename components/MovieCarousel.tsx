"use client";
import React, { use, useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCarousel.css";
// import { Navigation, Autoplay } from "swiper/modules";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import Image from "next/image";
import { getPoster } from "@/services/getPoster";
import { Poster } from "@/types/Poster";
import Link from "next/link";
function App() {
  const [poster, setPoster] = useState<Poster[]>([]);
  useEffect(() => {
    getPoster().then((data) => {
      setPoster(data);
    });
  }, []);

  console.log(poster);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "200px",
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="bg-white h-[400px]">
      <Slider {...settings} className="h-[400px] overflow-hidden">
        {poster.map((slide) => (
          <div key={slide.linkUrl} style={{ width: 880 }}>
            <Link href={slide.linkUrl}>
              <img
                src={slide.pathImage}
                className="px-6 w-full h-full object-fill min-h-[370px]  max-h-[390px]"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default App;

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
