interface Schedule {
  id: number;
  startTime: Date;
  price: number;
  endTime: Date;
  filmId?: number;
  roomId?: number;
  scheduleSeats?: any[];
}
