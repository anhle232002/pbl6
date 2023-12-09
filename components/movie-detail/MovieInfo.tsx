"use client";
import { Cinema } from "@/types/Cinema";
import { Film } from "@/types/Film";
import formatDate from "@/utils/format-date";
import { useEffect, useMemo, useState } from "react";
import ScheduleItem from "../ScheduleItem";
import WeekDayTabs from "../WeekDayTabs";
import { format, isSameDay } from "date-fns";
import { RiPlayCircleLine } from "react-icons/ri";
import TrailerModal from "../TrailerModal";
import getSchedules from "@/services/getSchedules";
import { Spinner } from "flowbite-react";
import MovieCard from "../MovieCard";
import { vi } from "date-fns/locale";

export default function MovieInfo({
  film,
  cinemas,
  schedules,
}: {
  film: Film;
  cinemas: Cinema[];
  schedules: any;
}) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedCinemaId, setSelectedCinemaId] = useState(cinemas[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const availableSchedules = useMemo(() => {
    const cinema = cinemas.find((c) => c.id === selectedCinemaId);

    if (!cinema) return;

    if (!Object.hasOwn(schedules, cinema.city)) {
      return [];
    }

    if (!Object.hasOwn(schedules[cinema.city], selectedCinemaId)) {
      return [];
    }

    return schedules[cinema.city][selectedCinemaId].filter((schedule: any) => {
      return isSameDay(new Date(schedule.startTime), selectedDate);
    });
  }, [selectedCinemaId, selectedDate, schedules, cinemas]);

  const selectedCinema = useMemo(() => {
    return cinemas.find((c) => c.id === selectedCinemaId);
  }, [selectedCinemaId, cinemas]);

  console.log(schedules);

  return (
    <div>
      <div className="relative">
        <div className="top-0 left-0 w-full absolute h-[675px]">
          <img
            className=" w-full h-full blur-sm"
            src={film.image && film.image[1]}
            alt="background"
          />
          <div className="absolute -bottom-10 left-0  w-full h-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>

        <div className="relative p-10">
          <div className="max-w-6xl m-auto grid grid-cols-12 gap-4">
            <div className="col-span-2">
              <div
                role="button"
                className="relative rounded-md overflow-hidden"
              >
                <img
                  className="relative h-[256px] w-full "
                  src={film.image && film.image[0]}
                  alt="img"
                />
                <div
                  onClick={() => setShowTrailer(true)}
                  className="absolute w-full h-full left-0 top-0 bg-black opacity-0 hover:opacity-60 duration-200 flex items-center justify-center"
                >
                  <RiPlayCircleLine className="text-6xl"></RiPlayCircleLine>
                </div>

                <TrailerModal
                  src={film.trailer}
                  isShow={showTrailer}
                  onClose={() => setShowTrailer(false)}
                />
              </div>
            </div>

            <div className="col-span-10 ml-10">
              <h3 className="text-white uppercase text-4xl tracking-wider">
                {film.name}
              </h3>

              <div className="mt-10">
                <p className="text-white">{film.description}</p>

                <div className="grid grid-cols-2 text-white mt-10 gap-10">
                  <div>
                    <div className="font-semibold">Ngày ra mắt</div>
                    <div className="text-white">
                      {formatDate(new Date(film.startDate))}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">Đạo diễn</div>
                    <div className="text-white">{film.director}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Thời lượng</div>
                    <div className="text-white">{film.duration} phút</div>
                  </div>
                  <div>
                    <div className="font-semibold">Dàn diễn viên</div>
                    <div className="text-white">{film.actor}</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-b border-accent">
                <select
                  value={selectedCinemaId}
                  onChange={(e) => {
                    setSelectedCinemaId(Number(e.target.value));
                  }}
                  className="text-white font-semibold border-none  text-sm rounded-lg  block w-full p-2.5  bg-transparent focus:outline-none focus:ring-0 "
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

              <div className="mt-10">
                <WeekDayTabs
                  selectedDate={selectedDate}
                  onSelectDate={onSelectDate}
                />
              </div>

              <div className="mt-10">
                <div className="text-white tracking-wider uppercase">
                  Lịch chiếu sắp tới vào
                  <span className="text-primary ml-4 text-xl">
                    {format(selectedDate, "iiii, dd MMM", { locale: vi })}
                  </span>
                </div>

                <div className="flex mt-4 gap-6">
                  {availableSchedules.length > 0 &&
                    availableSchedules.map((schedule: any) => {
                      return (
                        <ScheduleItem
                          scheduleId={schedule.id}
                          filmId={film.id}
                          startTime={new Date(schedule.startTime)}
                          price={schedule.price}
                          endTime={new Date(schedule.endTime)}
                          key={schedule.id}
                        />
                      );
                    })}
                </div>

                {availableSchedules.length <= 0 && (
                  <div className="min-h-[300px] flex items-center justify-center">
                    <p className="text-white text-center">
                      Hiện tại chưa có thông tin lịch chiếu nào sẵn có. Xin vui
                      lòng quay lại sau
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 max-w-6xl m-auto ">
        {selectedCinema && <RecommendedFilms cinema={selectedCinema} />}
      </div>
    </div>
  );
}

function RecommendedFilms({ cinema }: { cinema: Cinema }) {
  const [films, setFilms] = useState<Film[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSchedules({ cinemaId: cinema.id }).then((data) => {
      setFilms(data[0].films);
      setIsLoading(false);
    });
  }, [cinema]);

  return (
    <div className="mt-20 text-2xl">
      <div className="relative text-2xl text-white before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
        <span className="ml-4">
          Các phim đang chiếu tại
          <span className="text-primary ml-4">{cinema.name}</span>
        </span>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <div className="py-6 flex justify-center items-center">
            <Spinner></Spinner>
          </div>
        ) : (
          <div>
            {films && films.length > 0 ? (
              <div className="grid grid-cols-4 gap-10">
                {films.map((film) => {
                  return <MovieCard key={film.id} movie={film}></MovieCard>;
                })}
              </div>
            ) : (
              <div className="p-8 text-white text-center min-h-[300px] flex items-center justify-center">
                Hiện tại không có phim nào đang chiếu. Xin vui lòng quay lại
                sau.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
