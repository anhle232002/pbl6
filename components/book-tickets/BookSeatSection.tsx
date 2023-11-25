"use client";
import { useEffect, useState } from "react";
import { SeatStatusNotes, Seats } from "./Seats";
import { OrderSummary } from "./OrderSummary";
import Payment from "./Payment";
import getRoomById from "@/api/getRoomById";
import { Room } from "@/types/Room";
import { TSeat } from "@/types/TSeat";
import reserveSeats from "@/api/reserveSeats";
import { useUser } from "@/hooks/useUser";
import { Button, Modal, Toast } from "flowbite-react";
import { HiOutlineExclamationCircle, HiX } from "react-icons/hi";
export default function BookSeatSection({
  scheduleId,
  roomId,
  seats,
  price,
}: {
  scheduleId: number;
  roomId: number;
  seats: TSeat[];
  price: number;
}) {
  const [room, setRoom] = useState<Room>();
  const [step, setStep] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<TSeat[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    getRoomById(roomId).then((data) => {
      setRoom(data);
    });
  }, [roomId]);

  const onSelectSeat = (seat: TSeat) => {
    if (seat.status === 2) {
      // notify
      return;
    }

    if (!isSelectedSeat(seat.id)) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    }
  };

  const onClickReviewAndPay = async () => {
    try {
      const numberSeats = selectedSeats.map((seat) => {
        return seat.numberSeat;
      });
      await reserveSeats({
        scheduleId: scheduleId,
        customerId: user.userId,
        numberSeats: numberSeats,
      });

      setStep(step + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const isSelectedSeat = (seatId: number) =>
    selectedSeats.findIndex((s) => s.id === seatId) !== -1;
  return (
    <div className="lg:grid lg:grid-cols-12 px-4">
      <div className="col-span-9 p-4">
        <div
          className={`wrapper m-auto w-full ${
            step === 1 && "opacity-30 pointer-events-none"
          } `}
        >
          <div className="max-w-5xl m-auto md:overflow-auto overflow-x-scroll md:px-0">
            <ScreenSVG />
            {room && (
              <>
                <div className="text-center text-black">{room?.name}</div>
                <Seats
                  seats={seats}
                  nrows={room.numberRow}
                  ncols={room.numberColumn}
                  onSelectSeat={onSelectSeat}
                  selectedSeats={selectedSeats}
                />
              </>
            )}
          </div>

          <SeatStatusNotes price={price} />
        </div>
      </div>
      <div className=" col-span-3  text-white min-h-[700px] md:mt-0 mt-20">
        {step === 0 && (
          <OrderSummary
            nextStep={onClickReviewAndPay}
            price={price}
            selectedSeats={selectedSeats}
          />
        )}
        {step === 1 && (
          <Payment
            goBack={() => setStep(step - 1)}
            selectedSeats={selectedSeats}
            total={selectedSeats.length * price}
          />
        )}
      </div>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              The selected seats are already reserved. Please choose different
              seats.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Go back
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

function ScreenSVG() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 552 100"
      className="seat-map__screen-image"
    >
      <g opacity="0.91" filter="url(#filter0_f_2284_34995)"></g>
      <path d="M64 15H488V17H64V15Z" fill="white"></path>
      <path
        d="M91.6985 45H458.171L488 18H64L91.6985 45Z"
        fill="url(#paint0_linear_2284_34995)"
      ></path>
      <g filter="url(#filter1_i_2284_34995)">
        <path
          d="M91.6985 45H458.171L488 18H64L91.6985 45Z"
          fill="#D8D8D8"
        ></path>
      </g>
      <g opacity="0.95" filter="url(#filter2_f_2284_34995)">
        <path
          d="M92.7306 45H457.151L508 75H44L92.7306 45Z"
          fill="url(#paint1_linear_2284_34995)"
        ></path>
      </g>
      <g opacity="0.65" filter="url(#filter3_f_2284_34995)">
        <path
          d="M92.9807 45H456.903L550 75H2L92.9807 45Z"
          fill="url(#paint2_linear_2284_34995)"
        ></path>
      </g>
      <g filter="url(#filter4_f_2284_34995)">
        <path
          d="M92.5678 45H457.312L487 75H65L92.5678 45Z"
          fill="url(#paint3_linear_2284_34995)"
        ></path>
      </g>
      <path
        opacity="0.69933"
        d="M149 45.5347V44.5347H402V45.5347H149Z"
        fill="url(#paint4_linear_2284_34995)"
      ></path>
      <defs>
        <filter
          id="filter1_i_2284_34995"
          x="64"
          y="17"
          width="424"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="-1"></feOffset>
          <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
          <feComposite
            in2="hardAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
          ></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0681612 0"
          ></feColorMatrix>
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2284_34995"
          ></feBlend>
        </filter>
        <filter
          id="filter2_f_2284_34995"
          x="42.9"
          y="43.9"
          width="466.2"
          height="32.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="0.55"
            result="effect1_foregroundBlur_2284_34995"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter3_f_2284_34995"
          x="0.9"
          y="43.9"
          width="550.2"
          height="32.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="0.55"
            result="effect1_foregroundBlur_2284_34995"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter4_f_2284_34995"
          x="63.9"
          y="43.9"
          width="424.2"
          height="32.2"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="0.55"
            result="effect1_foregroundBlur_2284_34995"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_2284_34995"
          x1="276"
          y1="45"
          x2="276"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9C9898"></stop>
          <stop offset="1" stopColor="#D0CCCB"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_2284_34995"
          x1="276"
          y1="75"
          x2="276"
          y2="45.8095"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D3D0D0" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#C5C1C0" stopOpacity="0.340636"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_2284_34995"
          x1="276"
          y1="75"
          x2="276"
          y2="45.8095"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D3D0D0" stopOpacity="0"></stop>
          <stop offset="1" stopColor="#C5C1C0" stopOpacity="0.340636"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
