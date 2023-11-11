"use client";
import { getCinemas } from "@/api/getCinemas";
import getFilms from "@/api/getFilms";
import getSchedulesByFilmId from "@/api/getSchedulesByFilmId";
import { Cinema } from "@/types/Cinema";
import { Film } from "@/types/Film";
import createDays from "@/utils/create-weekdays";
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function BottomBar() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [schedules, setSchedules] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(-1);
  const days = createDays();

  useEffect(() => {
    getCinemas().then((data) => {
      setCinemas(data);
    });
  }, []);

  useEffect(() => {
    getFilms().then((data) => {
      setFilms(data.data);
    });
  }, []);

  useEffect(() => {
    if (selectedFilm == -1) return;

    getSchedulesByFilmId(selectedFilm).then((data) => {
      setSchedules(data);
    });
  }, [selectedFilm]);

  useEffect(() => {
    if (selectedFilm === -1 || selectedCinema === "") {
      return;
    }

    if (!schedules || !schedules[selectedCinema]) return;
  }, [selectedFilm, selectedCinema, selectedDate, schedules]);

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white h-24 z-30
      tracking-widest 
      "
    >
      <div
        className="relative max-w-6xl m-auto  h-full flex gap-10 items-center before:absolute before:bg-primary-linear-reverse
        before:right-[90%] before:h-full before:w-1/2"
      >
        <div className="flex flex-col text-white text-xl font-[isonorm] tracking-widest  justify-center px-6 h-full z-50 font-semibold">
          <span>QUICK</span> <span>BOOK</span>
        </div>
        <div className="flex items-center  gap-10">
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Venue
            </label>
            <select
              value={selectedCinema}
              onChange={(e) => setSelectedCinema(e.target.value)}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={-1} disabled>
                Choose a venue
              </option>
              {cinemas.length === 0 && "loading..."}
              {cinemas.map((cinema) => {
                return (
                  <option key={cinema.id} value={cinema.name}>
                    {cinema.name} - {cinema.city}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Film
            </label>
            <select
              value={selectedFilm}
              onChange={(e) => setSelectedFilm(Number(e.target.value))}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="-1" disabled>
                Choose a film
              </option>
              {films.length === 0 && "loading..."}
              {films.map((film) => {
                return (
                  <option key={film.id} value={film.id}>
                    {film.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date
            </label>
            <select
              value={selectedDate.getTime()}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {days.map((day) => {
                return (
                  <option key={day.value.getTime()} value={day.value.getTime()}>
                    {format(day.value, "iiii, dd MMM")}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Time
            </label>
            <select
              id="countries"
              defaultValue={""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""} selected>
                Choose a time
              </option>
            </select>
          </div>
        </div>

        <button className="uppercase border-2 rounded px-4 py-4 text-black font-semibold border-primary tracking-widest">
          Search
        </button>
      </div>
    </div>
  );
}
