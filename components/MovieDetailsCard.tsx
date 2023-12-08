import { Film } from "@/types/Film";
import ScheduleItem from "./ScheduleItem";
import formatDate from "@/utils/format-date";
import formatHourMinute from "@/utils/formatHourMinute";
import { useMemo } from "react";
import { isSameDay } from "date-fns";
import { RiCalendarCloseLine } from "react-icons/ri";

export default function MovieDetailsCard({
  film,
  filterDate,
}: {
  film: Film;
  filterDate?: Date;
}) {
  const schedules = useMemo(() => {
    if (!film) return [];

    if (filterDate) {
      return film.schedules?.filter((s) =>
        isSameDay(new Date(s.startTime), filterDate),
      );
    } else {
      return film.schedules;
    }
  }, [filterDate, film]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 ">
        <div>
          <img
            src={film.image}
            className="w-full object-cover h-64 rounded shadow-[0px_0px_50px_1px_#777] "
            alt=""
          />
        </div>
      </div>
      <div className="col-span-10 ml-10">
        <h3
          style={{ fontFamily: "isonorm" }}
          className="text-2xl tracking-widest text-white"
        >
          {film.name}
        </h3>

        <div className="mt-6">
          <span className="text-white mr-4">Starring</span>
          <span>{film.actor} </span>
        </div>

        <div className="mt-6">
          <span className="text-white mr-4">Start Date</span>
          <span>{formatDate(new Date(film.startDate))} </span>
        </div>

        <div className="mt-6">
          <span className="text-white mr-4">Running time</span>

          <span>{formatHourMinute(film.duration)}</span>
        </div>

        <hr className="mt-10 border-accent " />

        <div className="mt-10">
          <div className="grid grid-cols-5 gap-5">
            {schedules &&
              schedules.length > 0 &&
              schedules.map((schedule) => {
                return (
                  <ScheduleItem
                    key={schedule.id}
                    price={schedule.price}
                    startTime={schedule.startTime}
                    scheduleId={schedule.id}
                    filmId={film.id}
                    endTime={schedule.startTime}
                  />
                );
              })}
          </div>
          {schedules && schedules.length <= 0 && (
            <div className="text-white">
              <div className="flex  justify-center">
                <RiCalendarCloseLine className="text-7xl " />
              </div>
              <p className="text-center mt-4">
                There are no schedules right now
              </p>
            </div>
          )}
          {/* <div */}
          {/*   role="button" */}
          {/*   className="uppercase tracking-wider mt-8 text-white" */}
          {/* > */}
          {/*   Show all film times */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
