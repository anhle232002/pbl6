import { TSeat } from "@/types/TSeat";

export function Seat({
  seat,
  isSelected,
  onSelectSeat,
}: {
  seat: TSeat;
  isSelected: boolean;
  onSelectSeat: () => void;
}) {
  return (
    <div>
      <div
        onClick={onSelectSeat}
        role={"button"}
        className={`w-[20px] h-[20px]  rounded-b-xl rounded-t border-2  
        hover:bg-green-300
        ${
          (seat.status === 2 || seat.status === 3) &&
          "bg-red-500 border-red-500 hover:bg-red-500"
        }
        ${
          isSelected &&
          seat.status === 1 &&
          "bg-green-500 border-green-500 hover:bg-green-400"
        }
        border-black/30
      `}
      ></div>
    </div>
  );
}
