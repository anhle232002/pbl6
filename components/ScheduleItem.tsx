"use client";
import { storage } from "@/utils/storage";
import { format, getHours, getMinutes } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ScheduleItem({
  startTime,
  endTime,
  price,
  filmId,
  scheduleId,
}: {
  filmId: number;
  scheduleId: number;
  startTime: Date;
  endTime: Date;
  price: number;
}) {
  const router = useRouter();
  const formattedCurrency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

  const onClickSchedule = () => {
    if (!storage.get("logged_in")) {
      // console.log(window.location.pathname);
      router.push("/login");
      return;
    }

    router.push(`/book-tickets/${filmId}/${scheduleId}`);
  };
  return (
    <div
      onClick={onClickSchedule}
      // href={`/book-tickets/${filmId}/${scheduleId}`}
      role="button"
      className="px-4 py-2 text-sm flex flex-col justify-between h-28 border border-accent/70 rounded-md hover:border-white duration-700"
    >
      <div>
        <span className="text-white">
          {format(new Date(startTime), "HH:mm")}{" "}
        </span>{" "}
        {/* <span>- {format(endTime, "HH:mm")} </span> */}
      </div>

      <div className="text-white">Giá từ {formattedCurrency}</div>
    </div>
  );
}
export default ScheduleItem;
