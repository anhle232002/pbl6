import { addDays, format, isToday, isTomorrow, sub, subDays } from "date-fns";
import { vi } from "date-fns/locale";

export default function createDays() {
  const days = [];

  const getDayTitle = (index: number) => {
    if (index === 0) {
      return "Hôm nay";
    } else if (index === 1) {
      return "Ngày mai";
    } else {
      const currentDate = addDays(new Date(), index);
      return format(currentDate, "iiii", { locale: vi });
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
