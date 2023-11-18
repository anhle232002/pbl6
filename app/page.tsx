import NavBar from "@/components/NavBar";
import MovieCard, { Movie } from "@/components/MovieCard";
import MovieCarousel from "@/components/MovieCarousel";
import NavigateToWhatsOn from "@/components/NavigateToCinema";
import TrailerCard, { Trailer } from "@/components/TrailerCard";
import Footer from "@/components/Footer";
import Trailers from "@/components/Trailers";
import { Roboto_Condensed } from "next/font/google";
import BottomBar from "@/components/BottomBar";
import getFilms from "@/api/getFilms";

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
  return (
    <div className={`relative min-h-screen bg-background text-accent`}>
      <NavBar />

      <MovieCarousel />

      <div className="max-w-6xl m-auto mt-4 lg:px-0 px-8">
        <NavigateToWhatsOn />

        <div className="h-[2px] bg-primary-linear mt-8 rounded-full"></div>

        <div className="mt-8 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div>
            <h4 className="relative text-2xl text-white before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
              <span className="ml-4 font-[isonorm]">TOP FILMS</span>
            </h4>
          </div>

          <div className="mt-10">
            <MovieCards />{" "}
          </div>
        </div>
      </div>

      <div className="mt-20 md:px-0 px-8">
        <div className="max-w-6xl m-auto">
          <h4 className="relative text-2xl text-white before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
            <span className="ml-4 font-[isonorm]">FEATURED TRAILERS</span>
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
          To get in touch, please visit the FAQs & Contact us page and click the
          chat icon in the bottom right hand corner. Our customer service team
          are available from 9am-7pm, daily.
        </p>
      </div>

      <Footer></Footer>

      <BottomBar />
    </div>
  );
}

async function MovieCards() {
  try {
    const { data } = await getFilms();

    console.log(data);

    return (
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10">
        {data &&
          data.map((movie: any) => {
            return <MovieCard key={movie.id} movie={movie}></MovieCard>;
          })}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6">
        <div>Something went wrong...</div>
      </div>
    );
  }
}
