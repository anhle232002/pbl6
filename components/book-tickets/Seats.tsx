import { mockRows } from "@/app/book-tickets/mock-seats";
import { useState } from "react";
import { Seat, TSeat } from "./Seat";

export function Seats() {
  const [rows, setRows] = useState(mockRows);
  const [selectedSeats, setSelectedSeats] = useState<TSeat[]>([]);

  const onSelectSeat = (seat: TSeat) => {
    if (seat.status === "reserved") {
      // notify
      return;
    }

    if (!isSelectedSeat(seat.id)) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    }
  };

  const isSelectedSeat = (seatId: number) => selectedSeats.findIndex((s) => s.id === seatId) !== -1;
  return (
    <div className="flex justify-center mt-4">
      <div className="px-10 space-y-2">
        {rows.map((row) => {
          if (!row) {
            return <div key={"empty_row"} className="h-[20px]"></div>;
          }
          return (
            <div className="flex gap-8 mt-2" key={row.name}>
              <span className="text-white w-[20px]">{row.name}</span>

              <div className="flex gap-3">
                {row.seats.map((seat) => {
                  if (!seat) {
                    return <div key={"empty_seat"} className="w-[20px] h-[20px]"></div>;
                  }
                  return (
                    <Seat
                      key={seat.id}
                      seat={seat}
                      isSelected={isSelectedSeat(seat.id)}
                      onSelectSeat={() => onSelectSeat(seat)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SeatStatusNotes() {
  return (
    <div className="text-white text-center mt-8">
      <div className="flex gap-8 text-sm justify-center">
        <div className="flex gap-3">
          <div className="w-[20px] h-[20px] rounded-b-xl rounded-t border-2"></div>
          <div>
            Standard <strong>75.000đ</strong>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-[20px] h-[20px] rounded-b-xl rounded-t border-2"></div>
          <div>Available</div>
        </div>
        <div className="flex gap-3">
          <div className="w-[20px] h-[20px] rounded-b-xl rounded-t border-2 bg-red-300 border-red-300"></div>
          <div>Reserved</div>
        </div>
        <div className="flex gap-3">
          <div className="w-[20px] h-[20px] rounded-b-xl rounded-t border-2 bg-green-300 border-green-300"></div>
          <div>Selected</div>
        </div>
      </div>
    </div>
  );
}
