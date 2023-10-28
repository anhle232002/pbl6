import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import MovieCard, { Movie } from "@/components/MovieCard";
import MovieCarousel from "@/components/MovieCarousel";
import NavigateToWhatsOn from "@/components/NavigateToCinema";
import TrailerCard, { Trailer } from "@/components/TrailerCard";
import Footer from "@/components/Footer";
import Trailers from "@/components/Trailers";

async function getFilms() {
  const res = await fetch(`http://cinemawebapi.ddns.net:8001/api/v1/film`);

  return res.json();
}
const movies: Movie[] = [
  {
    name: "The Marvels",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/img/import/66198bd0-d7e6-4f57-badb-5af4fbf7003d_the-marvels_posters_the_marvels_payoff_united_kingdom_1_712px.jpg?mw=240&rev=65caf8b1e3fb40298362b5af94ecc898",
  },
  {
    name: "Saw X",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/aug-2023/1-sheet-thumbnail-min.jpg?mw=240&rev=e88150aa78d043da90588eaf60726a49",
  },
  {
    name: "The Creator",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/img/import/true-love_posters_the-creator_payoff_1sht_712px.jpg?mw=240&rev=0cf131d721764309a26720ecff83012c",
  },
  {
    name: "Saw X",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/aug-2023/1-sheet-thumbnail-min.jpg?mw=240&rev=e88150aa78d043da90588eaf60726a49",
  },
  {
    name: "Saw X",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/aug-2023/1-sheet-thumbnail-min.jpg?mw=240&rev=e88150aa78d043da90588eaf60726a49",
  },
  {
    name: "The Marvels",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/img/import/66198bd0-d7e6-4f57-badb-5af4fbf7003d_the-marvels_posters_the_marvels_payoff_united_kingdom_1_712px.jpg?mw=240&rev=65caf8b1e3fb40298362b5af94ecc898",
  },
  {
    name: "Saw X",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/aug-2023/1-sheet-thumbnail-min.jpg?mw=240&rev=e88150aa78d043da90588eaf60726a49",
  },
  {
    name: "The Creator",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/img/import/true-love_posters_the-creator_payoff_1sht_712px.jpg?mw=240&rev=0cf131d721764309a26720ecff83012c",
  },
  {
    name: "Saw X",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/aug-2023/1-sheet-thumbnail-min.jpg?mw=240&rev=e88150aa78d043da90588eaf60726a49",
  },
  {
    name: "Saw X",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/aug-2023/1-sheet-thumbnail-min.jpg?mw=240&rev=e88150aa78d043da90588eaf60726a49",
  },
];

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
];

export default async function Home() {
  const { data } = await getFilms();
  console.log(data);

  return (
    <div className="mb-20">
      <NavBar />

      <MovieCarousel />

      <div className="max-w-6xl m-auto mt-4 lg:px-0 px-8">
        <NavigateToWhatsOn />

        <div className="h-[2px] bg-primary-linear mt-8 rounded-full"></div>

        <div className="mt-8 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div>
            <h4 className="relative text-2xl text-white before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
              <span className="ml-4">TOP FILMS</span>
            </h4>
          </div>

          <div className="mt-10">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10">
              {movies.map((movie) => {
                return <MovieCard key={movie.name} movie={movie}></MovieCard>;
              })}
              {data.map((movie: any) => {
                return <MovieCard key={movie.id} movie={movie}></MovieCard>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 md:px-0 px-8">
        <div className="max-w-6xl m-auto">
          <h4 className="relative text-2xl text-white before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
            <span className="ml-4">FEATURED TRAILERS</span>
          </h4>
        </div>

        <div className="mt-10 ">
          {/* <div className="grid grid-cols-7 gap-4 px-10">
            {trailers.map((trailer) => {
              return <TrailerCard trailer={trailer} key={trailer.name} />;
            })}
          </div> */}

          <Trailers />
        </div>
      </div>

      <div className="mt-10 border-t border-b border-accent p-4">
        <h4 className="text-center text-3xl text-white">CUSTOMER SERVICE</h4>
        <p className="text-center mt-4">
          To get in touch, please visit the FAQs & Contact us page and click the chat icon in the
          bottom right hand corner. Our customer service team are available from 9am-7pm, daily.
        </p>
      </div>

      <Footer></Footer>
    </div>
  );
}
