import reserveSeats from "@/api/reserveSeats";
import { TSeat } from "@/types/TSeat";
import { storage } from "@/utils/storage";
import { useEffect, useMemo, useState } from "react";

export function OrderSummary({
  selectedSeats,
  price,
  nextStep,
}: {
  selectedSeats: TSeat[];
  price: number;
  nextStep: () => void;
}) {
  const [user, setUser] = useState<any>();
  const totalPrice = useMemo(() => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * selectedSeats.length);
  }, [price, selectedSeats]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (selectedSeats.length <= 0) {
      return;
    }

    nextStep();
  };

  useEffect(() => {
    if (localStorage) {
      setUser(JSON.parse(storage.get("user") || "{}"));
    }
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="relative h-full p-4 shadow-lg rounded-md bg-white/10 text-black"
    >
      <div>
        <h3
          style={{ fontFamily: "isonorm" }}
          className="text-2xl tracking-wider py-2 uppercase text-primary"
        >
          Order Summary
        </h3>

        <hr className="border-primary"></hr>
      </div>

      <div className="mt-6">
        <div>
          <ul className="flex flex-wrap gap-4">
            {selectedSeats.length > 0 ? (
              selectedSeats.map((seat: TSeat) => {
                return (
                  <li key={seat.id}>
                    <div className="w-8 h-8 rounded-b-xl bg-green-300 text-black flex flex-wrap justify-center items-center">
                      <span>{seat.seatCode}</span>
                    </div>
                  </li>
                );
              })
            ) : (
              <p>You havent chose any seats</p>
            )}
          </ul>

          {selectedSeats.length > 0 && (
            <div className="mt-4 flex justify-between">
              <div>{selectedSeats.length} Standard</div>
              <div>{totalPrice}</div>
            </div>
          )}
        </div>
        <hr className="mt-2 border-primary" />

        <div className="mt-4">
          <h4 style={{ fontFamily: "isonorm" }}>
            <span className="bg-primary-linear bg-clip-text text-lg text-transparent ">
              ADD A VOUCHER
            </span>
          </h4>
          <div className="mt-4 flex gap-6">
            <div className="flex-1">
              <input
                type="text"
                className="bg-transparent w-full rounded py-3 text-black uppercase"
                placeholder="Enter a code"
              />
            </div>
            <button className="border px-4 rounded">ADD</button>
          </div>
        </div>

        <div className="mt-6">
          <h4 style={{ fontFamily: "isonorm" }}>
            <span className="bg-primary-linear bg-clip-text text-lg text-transparent uppercase">
              Contact details
            </span>
          </h4>

          <div className="mt-4">
            <div>
              <input
                required
                type="text"
                value={user && user.employeeNo}
                className="bg-transparent w-full py-3 rounded text-black "
                placeholder="Your email address"
              />
            </div>
            <p className="mt-4">
              We&#39;ll use your email address to send you your tickets after
              checkout.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 border-t-2 font-semibold tracking-wider text-black p-4 w-full rounded-t-lg">
        <div className="text-lg flex justify-between items-center">
          <div>Total</div>
          <div>{totalPrice}</div>
        </div>

        <button
          type="submit"
          style={{ fontFamily: "isonorm" }}
          className="w-full mt-6 py-3 px-5 mr-2 mb-2 uppercase  text-xl focus:outline-none  rounded-lg bg-white/40  border-2 border-primary
          hover:border-primary 
           hover:shadow-[0px_0px_10px_1px_#f7941e]
          focus:z-10 focus:ring-4 focus:ring-gray-200  tracking-widest  duration-200"
        >
          Review and pay
        </button>
      </div>
    </form>
  );
}
