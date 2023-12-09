import { mockRows } from "@/app/book-tickets/[filmId]/[scheduleId]/mock-seats";
import { useState } from "react";
import { Seat } from "./Seat";
import { TSeat } from "@/types/TSeat";

const constructRows = (seats: TSeat[]) => {
  const rows: Record<string, TSeat[]> = {};

  seats.forEach((seat) => {
    if (!rows[seat.seatCode[0]]) {
      rows[seat.seatCode[0]] = [];
    }
    rows[seat.seatCode[0]].push(seat);
  });

  return rows;
};

export function Seats({
  onSelectSeat,
  selectedSeats,
  seats,
  ncols,
  nrows,
}: {
  nrows: number;
  ncols: number;
  seats: TSeat[];
  selectedSeats: TSeat[];
  onSelectSeat: (seat: TSeat) => void;
}) {
  const [rows, setRows] = useState(constructRows(seats));

  const isSelectedSeat = (seatId: number) =>
    selectedSeats.findIndex((s) => s.id === seatId) !== -1;

  console.log(rows);

  return (
    <div className="flex justify-center mt-4 ">
      <div className="px-10 space-y-2">
        <div className="flex gap-8 mt-2">
          <span className="text-black w-[20px] h-[20px]"></span>

          <div className="flex gap-4">
            {Array(Object.keys(rows).length)
              .fill(0)
              .map((v, index) => {
                return (
                  <span className="w-[20px] h-[20px] text-center" key={index}>
                    {index + 1}
                  </span>
                );
              })}
          </div>
        </div>

        {Object.keys(rows).map((row) => {
          if (!row) {
            return <div key={"empty_row"} className="h-[20px]"></div>;
          }

          return (
            <div className="flex gap-8 mt-2" key={row}>
              <span className="text-black w-[20px]">{row}</span>

              <div className="flex gap-4">
                {rows[row].map((seat: TSeat) => {
                  if (!seat) {
                    return (
                      <div
                        key={"empty_seat"}
                        className="w-[20px] h-[20px]"
                      ></div>
                    );
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

export function SeatStatusNotes({ price }: { price: number }) {
  return (
    <div className="text-black text-center mt-8">
      <div className="flex gap-8 text-sm justify-center">
        <div className="flex gap-3">
          <div className="w-[20px] h-[20px] rounded-b-xl rounded-t border-2"></div>
          <div>
            Tiêu chuẩn{" "}
            <strong>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </strong>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-[20px] h-[20px] rounded-b-xl rounded-t border-2"></div>
          <div>Ghế trống</div>
        </div>
        <div className="flex gap-3">
          <div className="w-[20px] h-[20px] rounded-b-xl rounded-t border-2 bg-red-600 border-red-600"></div>
          <div>Ghế đã đặt</div>
        </div>
        <div className="flex gap-3">
          <div className="w-[20px] h-[20px] rounded-b-xl rounded-t border-2 bg-green-600 border-green-600"></div>
          <div>Ghế đã chọn</div>
        </div>
      </div>
    </div>
  );
}
