import { TSeat } from "@/types/TSeat";
import { storage } from "@/utils/storage";
import { Button, Checkbox, Label, Radio } from "flowbite-react";
import { RiEdit2Line } from "react-icons/ri";

export default function Payment({
  selectedSeats,
  total,
  goBack,
}: {
  selectedSeats: TSeat[];
  total: number;
  goBack: () => void;
}) {
  const user = JSON.parse(storage.get("user") || "{}");
  const totalPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total);

  return (
    <div className="relative text-black h-full p-4 shadow-lg rounded-md bg-white/10 ">
      <div>
        <h3
          style={{ fontFamily: "isonorm" }}
          className="text-3xl tracking-wider py-2  uppercase text-primary "
        >
          Review & pay
        </h3>

        <hr className="border-primary"></hr>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <div className="uppercase text-primary font-[isonorm] text-lg">
            Your seats
          </div>

          <div
            role="button"
            onClick={goBack}
            className="flex opacity-70 items-center gap-2"
          >
            <RiEdit2Line />
            EDIT
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>{selectedSeats.length} Standard</div>
          <div>{totalPrice}</div>
        </div>

        <div className="space-x-2 text-accent">
          {selectedSeats &&
            selectedSeats.map((seat) => {
              return <span key={seat.id}>{seat.seatCode}</span>;
            })}
        </div>

        <hr className="mt-3"></hr>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <div className="uppercase text-primary font-[isonorm] text-lg tracking-widest">
            Your Email
          </div>

          <div
            role="button"
            onClick={goBack}
            className="flex opacity-70 items-center gap-2"
          >
            <RiEdit2Line />
            EDIT
          </div>
        </div>

        <div className="mt-2">
          <p>Your ticket will be sent to your email address at</p>
          <div className="font-semibold tracking-wider">{user.employeeNo}</div>
        </div>

        <hr className="mt-3"></hr>
      </div>

      <div className="mt-6">
        <h3 className="uppercase text-primary tracking-widest font-[isonorm] text-2xl">
          select payment method
        </h3>

        <div className="space-y-4 mt-4">
          <Label
            role="button"
            className="flex items-center gap-4 p-3 border rounded-md"
            htmlFor="credit-card"
          >
            <Radio
              id="credit-card"
              name="method"
              value="credit-card"
              defaultChecked
            />
            <div className="text-lg">Credit Card</div>
          </Label>

          <Label
            role="button"
            className="flex items-center gap-4 p-3 border rounded-md"
            htmlFor="momo"
          >
            <Radio id="momo" name="method" value="momo" defaultChecked />
            <div className="text-lg">Momo</div>
          </Label>

          <Label
            role="button"
            className="flex items-center gap-4 p-3 border rounded-md"
            htmlFor="vnpay"
          >
            <Radio id="vnpay" name="method" value="vnpay" defaultChecked />
            <div className="text-lg">VNPAY</div>
          </Label>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label htmlFor="accept" className="flex">
              I agree with the&nbsp;
              <a href="#" className=" hover:underline font-semibold text-black">
                terms and conditions
              </a>
            </Label>
          </div>
        </div>

        <p className="text-sm mt-4 text-accent">
          Please be advised that we may ask for valid photographic ID on
          arrival.{" "}
        </p>

        <hr className="mt-3"></hr>

        <div className="py-4">
          <div className="flex justify-between items-center text-accent">
            <div>Tickets</div>
            <div>{totalPrice}</div>
          </div>

          <div className="flex justify-between items-center font-semibold text-lg mt-2">
            <div>Total</div>
            <div>{totalPrice}</div>
          </div>

          <button
            type="button"
            style={{ fontFamily: "isonorm" }}
            className="w-full mt-6 py-3 px-5 mr-2 mb-2 uppercase  text-xl focus:outline-none  rounded-lg bg-white/40  border-2 border-primary 
           hover:shadow-[0px_0px_10px_1px_#f7941e] font-semibold
          hover:border-primary   focus:z-10 focus:ring-4 focus:ring-gray-200  tracking-widest  duration-200"
          >
            checkout
          </button>
        </div>
      </div>
    </div>
  );
}
