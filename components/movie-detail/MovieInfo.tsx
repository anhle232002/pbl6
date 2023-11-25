"use client";
import { Cinema } from "@/types/Cinema";
import { Film } from "@/types/Film";
import formatDate from "@/utils/format-date";
import { useMemo, useState } from "react";
import ScheduleItem from "../ScheduleItem";
import WeekDayTabs from "../WeekDayTabs";
import { format, isSameDay } from "date-fns";
import { RiPlayCircleLine } from "react-icons/ri";
import TrailerModal from "../TrailerModal";

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
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const availableSchedules = useMemo(() => {
    if (!Object.hasOwn(schedules, "Đà Nẵng")) {
      return [];
    }

    if (!Object.hasOwn(schedules["Đà Nẵng"], selectedCinema)) {
      return [];
    }

    return schedules["Đà Nẵng"][selectedCinema].filter((schedule: any) => {
      return isSameDay(new Date(schedule.startTime), selectedDate);
    });
  }, [selectedCinema, selectedDate, schedules]);

  console.log(availableSchedules);

  return (
    <div className="relative">
      <div className="top-0 left-0 w-full absolute h-[675px]">
        <img
          className=" w-full h-full blur-sm"
          src={film.image && film.image[1]}
          // src="https://www.myvue.com/-/media/vuecinemas/img/import/true-love_stills_tlov_trl_f_int_ov_v19_txt_scp_709_e02_cc01_20230630_00000-copy-5.jpg?rev=11f38676bd8e4ac1be7fa8ddd59cce02"
          alt="background"
        />
        <div className="absolute -bottom-10 left-0  w-full h-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </div>

      <div className="relative p-10">
        <div className="max-w-6xl m-auto grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <div role="button" className="relative rounded-md overflow-hidden">
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
                  <div>Release date</div>
                  <div className="text-accent">
                    {formatDate(new Date(film.startDate))}
                  </div>
                </div>
                <div>
                  <div>Director</div>
                  <div className="text-accent">{film.director}</div>
                </div>
                <div>
                  <div>Running time</div>
                  <div className="text-accent">{film.duration} minutes</div>
                </div>
                <div>
                  <div>Cast</div>
                  <div className="text-accent">{film.actor}</div>
                </div>
              </div>
            </div>

            <div className="mt-10">Full film details</div>

            <div className="mt-10 border-b border-accent">
              <select
                value={selectedCinema}
                onChange={(e) => {
                  setSelectedCinema(Number(e.target.value));
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
              <div className="text-white tracking-wider">
                UPCOMING SHOWINGS FOR
                <span className="text-primary ml-4 text-xl">
                  {format(selectedDate, "iiii, dd MMM")}
                </span>{" "}
              </div>

              <div className="flex mt-4 gap-6">
                {availableSchedules.map((schedule: any) => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
