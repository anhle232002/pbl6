"use client";
import { getCinemas } from "@/services/getCinemas";
import getSchedules from "@/services/getFilmByCinema";
import getFilms from "@/services/getFilms";
import { Cinema } from "@/types/Cinema";
import { Film } from "@/types/Film";
import createDays from "@/utils/create-weekdays";
import { storage } from "@/utils/storage";
import { format, isSameDay } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottomBar() {
  const [days, setDays] = useState(createDays());
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [schedules, setSchedules] = useState<any[]>();
  const [selectedCinema, setSelectedCinema] = useState<number>();
  const [selectedFilm, setSelectedFilm] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<number>();
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getSchedules().then((data) => {
      setSchedules(data);
    });
    getCinemas().then((data) => {
      setCinemas(data);
    });
    getFilms().then((data) => {
      setFilms(data.data);
    });
  }, []);

  useEffect(() => {
    if (!schedules || !selectedCinema || !selectedFilm) return;
    console.log(schedules[selectedCinema].films[selectedFilm].schedules);

    setAvailableTimes(
      schedules[selectedCinema].films[selectedFilm].schedules.filter(
        (schedule: any) =>
          isSameDay(selectedDate, new Date(schedule.startTime)),
      ),
    );
  }, [selectedDate]);

  const onSubmit = () => {
    if (!selectedSchedule || !selectedFilm) return;

    if (!storage.get("logged_in")) {
      // console.log(window.location.pathname);
      router.push("/login");
      return;
    }

    router.push(`/book-tickets/${selectedFilm}/${selectedSchedule}`);

    return;
  };

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
              onChange={(e) => setSelectedCinema(Number(e.target.value))}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={-1} disabled>
                Choose a venue
              </option>
              {cinemas.length === 0 && "loading..."}
              {cinemas.map((cinema) => {
                return (
                  <option key={cinema.id} value={cinema.id}>
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
              disabled={!selectedCinema}
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
              onChange={(e) => {
                setSelectedDate(new Date(Number(e.target.value)));
              }}
              id="countries"
              disabled={!selectedCinema || !selectedFilm}
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
              disabled={!selectedCinema || !selectedFilm || !selectedDate}
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(Number(e.target.value))}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={""}
            >
              <option value={""} disabled>
                Choose a time
              </option>

              {availableTimes.map((schedule) => {
                return (
                  <option key={schedule.id} value={schedule.id}>
                    {format(new Date(schedule.startTime), "HH:mm")}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="uppercase border-2 rounded px-4 py-4 text-black font-semibold border-primary tracking-widest"
        >
          {selectedSchedule ? "Book" : "Search"}
        </button>
      </div>
    </div>
  );
}
