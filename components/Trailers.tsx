"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import TrailerCard, { Trailer } from "./TrailerCard";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Trailers.style.css";
const trailers: Trailer[] = [
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
  {
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/sep-2023/saw-x-bd.jpg?mw=260&rev=881be3699c454412ad5c621d12068351",
    name: "Saw X",
    src: "https://www.youtube.com/watch?v=t3PzUo4P21c",
  },
];
export default function Trailers() {
  return (
    <div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={6}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: any) => console.log(swiper)}
      >
        <span slot="wrapper-start">
          <div className="w-72"></div>
        </span>
        {trailers.map((trailer) => {
          return (
            <SwiperSlide key={trailer.name}>
              <TrailerCard trailer={trailer} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
