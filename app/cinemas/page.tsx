"use client";
import { getCinemas } from "@/services/getCinemas";
import MovieCarousel from "@/components/MovieCarousel";
import MovieDetailsCard from "@/components/MovieDetailsCard";
import NavBar from "@/components/NavBar";
import { Cinema } from "@/types/Cinema";
import { Spinner } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import getSchedules from "@/services/getSchedules";

export default function CinemaMovies() {
  const [schedules, setSchedules] = useState<any>();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getSchedules().then((data: any) => {
      setSchedules(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getCinemas().then((data) => {
      setCinemas(data);
    });

    const cinemaId = searchParams.get("cid");
    if (cinemaId && !Number.isNaN(Number(cinemaId))) {
      setSelectedCinema(Number(cinemaId));
    }
  }, []);

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary
    current.set("cid", event.target.value);
    setSelectedCinema(Number(event.target.value));

    // cast to string
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const films = useMemo(() => {
    if (!schedules || !selectedCinema) return [];
    console.log(schedules);

    const cinema = schedules.find((c: any) => c.cinemaId === selectedCinema);

    if (!cinema) {
      return;
    }

    return cinema.films;
    // return Object.keys(schedules[selectedCinema].films).map((k) => {
    //   return { ...schedules[selectedCinema].films[k], id: k };
    // });
  }, [selectedCinema, cinemas, schedules]);

  console.log(films);

  return (
    <div className="bg-background text-accent">
      <NavBar />

      <MovieCarousel />

      <div className="max-w-5xl m-auto py-10 ">
        <div className="mt-10 flex items-center gap-10">
          <h3 className="text-xl  font-semibold font-[isonorm] tracking-widest text-primary">
            Cinema
          </h3>
          <div className="border-b border-accent  flex-1">
            <select
              value={selectedCinema}
              onChange={onSelect}
              className="text-white font-semibold border-none text-lg  rounded-lg  block w-full p-2.5  bg-transparent focus:outline-none focus:ring-0 "
            >
              {cinemas.map((cinema) => {
                return (
                  <option
                    key={cinema.id}
                    className="text-black"
                    value={cinema.id}
                  >
                    {cinema.name} - {cinema.city}
                  </option>
                );
              })}
            </select>
          </div>

          {/* <WeekDayTabs /> */}
        </div>

        <div className="mt-10 space-y-16">
          {isLoading && (
            <div className="flex items-center justify-center min-h-[300px]">
              <Spinner />
            </div>
          )}
          {films.length > 0 &&
            films.map((film) => {
              return <MovieDetailsCard key={film.id} film={film} />;
            })}
          {films.length === 0 && (
            <div className="mt-4 text-center py-10">
              <p className="text-lg text-white max-w-4xl m-auto">
                We apologize, but there are currently no movies scheduled for
                screening at this cinema. Please check back later for updates on
                upcoming showtimes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
