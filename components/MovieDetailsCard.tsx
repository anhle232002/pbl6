import { Film } from "@/types/Film";
import ScheduleItem from "./ScheduleItem";
import formatDate from "@/utils/format-date";
import formatHourMinute from "@/utils/formatHourMinute";

export default function MovieDetailsCard({ film }: { film: Film }) {
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

        {/* <p className="mt-4 text-white"> */}
        {/*   After true friendship and relentless flirting, Poppy and Branch are */}
        {/*   now officially, finally, a couple! As they grow closer, Poppy */}
        {/*   discovers that Branch has a secret past. */}
        {/* </p> */}

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
            {film &&
              film.schedules &&
              film.schedules.map((schedule) => {
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

          <div
            role="button"
            className="uppercase tracking-wider mt-8 text-white"
          >
            Show all film times
          </div>
        </div>
      </div>
    </div>
  );
}
