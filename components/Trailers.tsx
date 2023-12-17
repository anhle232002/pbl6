"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import TrailerCard, { Trailer } from "./TrailerCard";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Trailers.style.css";
import { useEffect, useState } from "react";
import { Film } from "@/types/Film";
import getFilms from "@/services/getFilms";
import { Spinner } from "flowbite-react";
export default function Trailers() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getFilms().then((resp) => {
      setFilms(resp.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="ml-10">
      {isLoading ? (
        <div className="p-8 justify-center flex items-center">
          <Spinner></Spinner>
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={6}
          navigation
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper: any) => console.log(swiper)}
        >
          {films.map((film) => {
            return (
              <SwiperSlide key={film.id}>
                <TrailerCard
                  trailer={{
                    name: film.name,
                    src: film.trailer,
                    image: film.image,
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
