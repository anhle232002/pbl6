"use client";

import { useEffect, useMemo, useState } from "react";
import MovieCard from "./MovieCard";
import getFilms from "@/services/getFilms";
import { Film } from "@/types/Film";
import { Spinner } from "flowbite-react";
import { isAfter, isBefore } from "date-fns";

export default function MovieCards() {
  const [films, setFilms] = useState<Film[]>();
  const [tab, setTab] = useState(0);
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

  const filterFilms = useMemo(() => {
    if (tab === 0) {
      return films?.filter((film) =>
        isAfter(new Date(), new Date(film.startDate)),
      );
    }
    if (tab === 1) {
      return films?.filter((film) =>
        isBefore(new Date(), new Date(film.startDate)),
      );
    }
  }, [films, tab]);

  return (
    <>
      <div className="flex items-center gap-10">
        <h4 className="relative text-xl text-gray-700 font-semibold before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
          <span className="ml-4  uppercase">phim</span>
        </h4>

        <div className="">
          <ul className="flex mb-0 list-none flex-wrap flex-row" role="tablist">
            <li
              onClick={() => setTab(0)}
              className={`
  ${tab === 0 ? "text-primary border-b-2 border-primary" : " text-gray-700"}
md:mr-8   last:mr-0 flex-auto text-center hover:text-primary/80 transition-all duration-75 ease-in-out cursor-pointer relative`}
            >
              <a
                className="text-base font-bold not-italic block leading-normal hover:text-blue-10 transition-all duration-75 ease-in-out cursor-pointer relative tab__active opacity-100"
                data-toggle="tab"
                role="tablist"
              >
                Đang chiếu
              </a>
            </li>
            <li
              onClick={() => setTab(1)}
              className={`
  ${tab === 1 ? "text-primary border-b-2 border-primary" : " text-gray-700"}
md:mr-8   last:mr-0 flex-auto text-center hover:text-primary/80 transition-all duration-75 ease-in-out cursor-pointer relative`}
            >
              <a
                className="text-base font-bold not-italic block leading-normal  transition-all duration-75 ease-in-out cursor-pointer relative opacity-100"
                data-toggle="tab"
                role="tablist"
              >
                Sắp chiếu
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-6 gap-y-10">
          {filterFilms &&
            filterFilms.map((movie: any) => {
              return <MovieCard key={movie.id} movie={movie}></MovieCard>;
            })}
        </div>

        {filterFilms && filterFilms.length === 0 && (
          <div className="min-h-[300px] py-10 flex items-center justify-center">
            <p className="text-center">
              Hiện tại chưa có phim nào sắp chiếu. Bạn vui lòng quay lại sau
            </p>
          </div>
        )}
      </div>
      {loading && (
        <div className="p-4 flex items-center justify-center min-h-[600px]">
          <Spinner></Spinner>
        </div>
      )}
    </>
  );
}
