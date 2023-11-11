"use client";

import createDays from "@/utils/create-weekdays";
import { isSameDay } from "date-fns";

export default function WeekDayTabs({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}) {
  const weekDays = createDays();

  return (
    <div>
      <ul className="flex gap-4">
        {weekDays.map((day) => {
          return (
            <li key={day.value.getTime()}>
              <Tab
                onClick={() => onSelectDate(day.value)}
                title={day.title}
                isActive={isSameDay(day.value, selectedDate)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Tab({
  title,
  isActive = false,
  onClick,
}: {
  title: string;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      className={`px-4 py-1 rounded-full text-sm hover:bg-primary/70 duration-150
    ${isActive ? "bg-primary-linear  text-black" : "text-white"} 
    `}
    >
      <span>{title}</span>
    </div>
  );
}
