"use client";
import React, { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
function App() {
  const slides = [
    {
      url: "/images/anh1.jpg",
    },
    {
      url: "/images/anh2.jpg",
    },
    {
      url: "/images/anh3.jpg",
    },
  ];

  return (
    <div className="h-[630px] relative">
      <Swiper
        modules={[Navigation]}
        navigation
        className="h-full relative"
        // spaceBetween={50}
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper: any) => console.log(swiper)}
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.url}>
              <img className="w-full h-full object-cover" src={slide.url}></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute top-0 left-0 z-10  w-full h-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}

export default App;
