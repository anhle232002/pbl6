import { getCinemas } from "@/api/getCinemas";
import getFilmById from "@/api/getFilm";
import getSchedulesByFilmId from "@/api/getSchedulesByFilmId";
import ChooseCinema from "@/components/ChooseCinema";
import MovieInfo from "@/components/movie-detail/MovieInfo";
import MovieCard, { Movie } from "@/components/MovieCard";

const movies: Movie[] = [
  {
    id: 1,
    name: "The Marvels",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/img/import/66198bd0-d7e6-4f57-badb-5af4fbf7003d_the-marvels_posters_the_marvels_payoff_united_kingdom_1_712px.jpg?mw=240&rev=65caf8b1e3fb40298362b5af94ecc898",
  },
  {
    id: 1,
    name: "Saw X",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/aug-2023/1-sheet-thumbnail-min.jpg?mw=240&rev=e88150aa78d043da90588eaf60726a49",
  },
  {
    id: 1,
    name: "The Creator",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/img/import/true-love_posters_the-creator_payoff_1sht_712px.jpg?mw=240&rev=0cf131d721764309a26720ecff83012c",
  },
  {
    id: 1,
    name: "Saw X",
    image:
      "https://www.myvue.com/-/jssmedia/vuecinemas/film-and-events/aug-2023/1-sheet-thumbnail-min.jpg?mw=240&rev=e88150aa78d043da90588eaf60726a49",
  },
];

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const schedules = await getSchedulesByFilmId(Number(params.id));
  const film = await getFilmById(Number(params.id));
  const cinemas = await getCinemas();
  if (!film) {
    return <div>Not Found</div>;
  }

  return (
    <div className="relative bg-background text-accent pb-4">
      <MovieInfo film={film} cinemas={cinemas} schedules={schedules} />
      <div className="mt-10 max-w-6xl m-auto ">
        <div className="mt-20 text-2xl">
          <div className="relative text-2xl text-white before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
            <span className="ml-4">
              ALSO SHOWINGS AT <span className="text-primary">CGV DA NANG</span>{" "}
            </span>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-4 gap-10">
              {movies.map((movie) => {
                return <MovieCard key={movie.name} movie={movie}></MovieCard>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
