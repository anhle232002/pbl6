export type TSeat = {
  id: number;
  name: string;
  status: string;
};

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
        hover:bg-green-200
        ${seat.status === "reserved" && "bg-red-300 border-red-300 hover:bg-red-300"}
        ${
          isSelected &&
          seat.status === "available" &&
          "bg-green-300 border-green-300 hover:bg-green-300"
        }
      `}
      ></div>
    </div>
  );
}
