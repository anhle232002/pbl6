import { getHours, getMinutes } from "date-fns";
import Link from "next/link";

export default function ScheduleItem({
  startTime,
  price,
  duration,
}: {
  startTime: Date;
  price: number;
  duration: number;
}) {
  const { startHours, startMinutes } = {
    startHours: getHours(startTime),
    startMinutes: getMinutes(startTime),
  };

  const formattedCurrency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return (
    <Link
      href={"/book-tickets/"}
      role="button"
      className="px-4 py-2 text-sm flex flex-col justify-between h-28 border border-accent/70 rounded-md hover:border-white duration-700"
    >
      <div>
        <span className="text-white">
          {startHours}:{startMinutes} PM
        </span>{" "}
        <span>- 7:50 PM</span>
      </div>

      <div className="text-white">FROM {formattedCurrency}</div>
    </Link>
  );
}
