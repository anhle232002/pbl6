"use client";
import { useEffect, useState } from "react";
import { getCinemas } from "@/services/getCinemas";
import getFilmById from "@/services/getFilm";
import getSchedulesByFilmId from "@/services/getSchedulesByFilmId";
import MovieInfo from "@/components/movie-detail/MovieInfo";
import MovieCard, { Movie } from "@/components/MovieCard";
import { Cinema } from "@/types/Cinema";
import { Spinner } from "flowbite-react";
import NavBar from "@/components/NavBar";

export default function MovieDetail({ params }: { params: { id: string } }) {
  const [film, setFilm] = useState();
  const [schedules, setSchedules] = useState();
  const [cinemas, setCinemas] = useState<Cinema[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSchedulesByFilmId(Number(params.id)).then((data) => setSchedules(data));
    getFilmById(Number(params.id)).then((data) => setFilm(data));
    getCinemas().then((data) => setCinemas(data));
  }, []);

  useEffect(() => {
    if (!film || !cinemas || !schedules) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [film, cinemas, schedules]);

  return (
    <div>
      <NavBar />

      <div className="relative bg-background text-accent pb-4">
        {!isLoading && film && cinemas && schedules ? (
          <MovieInfo film={film} cinemas={cinemas} schedules={schedules} />
        ) : (
          <div className="min-h-[500px] flex items-center justify-center">
            <Spinner />
          </div>
        )}

        <div className="mt-10 max-w-6xl m-auto ">
          <div className="mt-20 text-2xl">
            <div className="relative text-2xl text-white before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
              <span className="ml-4">
                ALSO SHOWINGS AT{" "}
                <span className="text-primary">CGV DA NANG</span>
              </span>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-4 gap-10">
                {/*   {movies.map((movie) => { */}
                {/*     return <MovieCard key={movie.name} movie={movie}></MovieCard>; */}
                {/*   })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
