"use client";
import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Autoplay } from "swiper/modules";
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
  return (
    <div className="h-[700px] relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        className="h-full relative"
        autoplay={{
          delay: 3000,
        }}
        slidesPerView={1}
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.url}>
              <div className="relative w-full h-full  bg-no-repeat bg-cover">
                <img
                  className="relative w-full h-full object-cover"
                  src={slide.url}
                  alt="poster"
                ></img>
                <div className="absolute top-0 left-0 z-10  w-full h-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
                {/* <div className="absolute w-full py-6 bottom-0 text-white  z-50"> */}
                {/*   <div className="max-w-5xl m-auto flex justify-between items-center"> */}
                {/*     <div className="flex gap-4 items-center"> */}
                {/*       <button> */}
                {/*         <RiPlayCircleLine className="text-6xl" /> */}
                {/*       </button> */}
                {/*       <div> */}
                {/*         <div className="text-white text-3xl font-[isonorm]"> */}
                {/*           TIGER 3 */}
                {/*         </div> */}
                {/*       </div> */}
                {/*     </div> */}
                {/*     <div> */}
                {/*       <button className="tracking-widest border border-primary px-6 py-3 rounded hover:shadow-[0px_0px_100px_5px_#777] duration-200 "> */}
                {/*         BOOK NOW */}
                {/*       </button> */}
                {/*     </div> */}
                {/*   </div> */}
                {/* </div> */}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default App;
