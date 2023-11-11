import { addDays, format, isToday, isTomorrow } from "date-fns";

export default function createDays() {
  const days = [];

  const getDayTitle = (index: number) => {
    if (index === 0) {
      return "Today";
    } else if (index === 1) {
      return "Tomorrow";
    } else {
      const currentDate = addDays(new Date(), index);
      return format(currentDate, "iiii");
    }
  };

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(new Date(), i);

    days.push({
      value: currentDate,
      title: getDayTitle(i),
    });
  }

  return days;
}
