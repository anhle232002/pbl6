"use client";
import { useEffect, useState } from "react";
import { getCinemas } from "@/services/getCinemas";
import getFilmById from "@/services/getFilm";
import getSchedulesByFilmId from "@/services/getSchedulesByFilmId";
import MovieInfo from "@/components/movie-detail/MovieInfo";
import { Cinema } from "@/types/Cinema";
import { Spinner } from "flowbite-react";
import NavBar from "@/components/NavBar";
import AppFooter from "@/components/Footer";

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
    <div className=" bg-background">
      <NavBar />

      <div className="relative bg-background text-accent pb-4 min-h-screen">
        {!isLoading && film && cinemas && schedules ? (
          <MovieInfo film={film} cinemas={cinemas} schedules={schedules} />
        ) : (
          <div className="min-h-[500px] flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>

      <AppFooter />
    </div>
  );
}
