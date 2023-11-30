"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import getFilms from "@/services/getFilms";
import { Film } from "@/types/Film";
import { Spinner } from "flowbite-react";

export default function MovieCards() {
  const [films, setFilms] = useState<Film[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFilms()
      .then((data) => {
        setFilms(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-10 gap-y-20">
        {films &&
          films.map((movie: any) => {
            return <MovieCard key={movie.id} movie={movie}></MovieCard>;
          })}
      </div>
      {loading && (
        <div className="p-4 flex items-center justify-center">
          <Spinner></Spinner>
        </div>
      )}
    </>
  );
}
