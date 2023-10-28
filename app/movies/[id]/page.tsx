import ChooseCinema from "@/components/ChooseCinema";
import MovieCard, { Movie } from "@/components/MovieCard";
import ScheduleItem from "@/components/ScheduleItem";
import WeekDayTabs from "@/components/WeekDayTabs";
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
async function getFilm(id: number) {
  const res = await fetch(`http://cinemawebapi.ddns.net:8001/api/v1/film/${id}`);

  return res.json();
}

export default async function MovieDetail({ params }: { params: { id: string } }) {
  const film = await getFilm(Number(params.id));
  console.log(film);

  return (
    <div className="relative">
      <div className="top-0 left-0 w-full absolute h-[675px]">
        <img
          className=" w-full h-full blur-sm"
          src="https://www.myvue.com/-/media/vuecinemas/img/import/true-love_stills_tlov_trl_f_int_ov_v19_txt_scp_709_e02_cc01_20230630_00000-copy-5.jpg?rev=11f38676bd8e4ac1be7fa8ddd59cce02"
          alt="background"
        />
        <div className="absolute -bottom-10 left-0  w-full h-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>

      <div className="relative p-10">
        <div className="max-w-6xl m-auto grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <div>
              <img
                className="h-[256px] w-full"
                src="https://www.myvue.com/-/jssmedia/vuecinemas/img/import/true-love_posters_the-creator_payoff_1sht_712px.jpg?mw=150&rev=0cf131d721764309a26720ecff83012c"
                alt="img"
              />
            </div>
          </div>

          <div className="col-span-10 ml-10">
            <h3 className="text-white uppercase text-4xl tracking-wider">The Creator</h3>

            <p className="text-white tracking-wide mt-10">
              From writer/director Gareth Edwards (“Rogue One,” “Godzilla”) comes an epic sci-fi
              action thriller set amidst a future war between the human race and the forces of AI.
            </p>

            <div className="mt-10">
              <p className="text-white">
                From writer/director Gareth Edwards (“Rogue One,” “Godzilla”) comes an epic sci-fi
                action thriller set amidst a future war between the human race and the forces of
                artificial intelligence. Joshua (John David Washington, Tenet), a hardened
                ex-special forces agent grieving the disappearance of his wife (Gemma Chan,
                Eternals), is recruited to hunt down and kill the Creator, the elusive architect of
                advanced AI who has developed a mysterious weapon with the power to end the war… and
                mankind itself. Joshua and his team of elite operatives journey across enemy lines,
                into the dark heart of AI-occupied territory… only to discover the world-ending
                weapon he’s been instructed to destroy is an AI in the form of a young child
                (newcomer Madeleine Yuna Voyles).
              </p>

              <div className="grid grid-cols-2 text-white mt-10 gap-10">
                <div>
                  <div>Release date</div>
                  <div className="text-accent">28th Sept 2023</div>
                </div>
                <div>
                  <div>Director</div>
                  <div className="text-accent">Gareth Edwards</div>
                </div>
                <div>
                  <div>Running time</div>
                  <div className="text-accent">2hr 13mins</div>
                </div>
                <div>
                  <div>Cast</div>
                  <div className="text-accent">
                    John David Washington, Ken Watanabe, Gemma Chan, Benedict Wong
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">Full film details</div>

            <div className="mt-10">
              <ChooseCinema />
            </div>

            <div className="mt-10">
              <WeekDayTabs />
            </div>

            <div className="mt-10">
              <div className="text-white tracking-wider">
                UPCOMING SHOWINGS FOR <span className="text-primary">SUNDAY, 15 OCT</span>{" "}
              </div>

              <div className="flex mt-4 gap-6">
                <ScheduleItem />
                <ScheduleItem />
                <ScheduleItem />
                <ScheduleItem />
              </div>

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
        </div>
      </div>
    </div>
  );
}
