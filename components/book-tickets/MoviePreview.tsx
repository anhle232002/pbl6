import Image from "@/node_modules/next/image";
import { useBookingStore } from "@/store/booking-store";
import { Film } from "@/types/Film";
import { format, getHours, getMinutes } from "date-fns";
import { Spinner } from "flowbite-react";

export function MoviePreview({}: {}) {
  const { film, schedule } = useBookingStore();

  console.log(schedule);

  return (
    <div className="relative bg-slate-700/40 overflow-hidden py-4 ">
      {film && schedule ? (
        <>
          <div
            style={{
              backgroundImage: `url(${film.image[1].replace(/\\/g, "/")})`,
            }}
            className="absolute left-0 top-0 w-full h-full  bg-no-repeat bg-center bg-cover blur-lg "
          >
            <div className="w-full h-full bg-black/20"></div>
          </div>

          <div className="relative max-w-7xl m-auto flex  text-white gap-10 p-4">
            <div>
              <Image
                width={150}
                height={200}
                className=" object-cover"
                src={film.image[0]}
                alt="img"
              />
            </div>
            <div>
              <div className="tracking-wider text-red-600">NOW BOOKING</div>

              <h3 className="text-xl">{film.name}</h3>

              <div className="mt-4 text-sm">
                <span>CGV Đà Nẵng</span>, <span>SCREEN 4</span>
              </div>

              <p className="text-sm mt-2">
                {format(new Date(schedule.startTime), "iiii, dd MMM")},{" "}
                {format(new Date(schedule.startTime), "HH:mm")} - 11:50PM
              </p>

              <button className="mt-2 text-xs  bg-slate-900 px-4 py-1 rounded-md font-semibold uppercase">
                Change Time
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-[100px] flex items-center justify-center">
          <Spinner></Spinner>
        </div>
      )}
    </div>
  );
}
