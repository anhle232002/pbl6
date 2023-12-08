import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { getBookingById } from "@/services/getBookingById";
import { Booking } from "@/types/Booking";
import Image from "next/image";
export default function DetailModal({
  payment,
  setPayment,
}: {
  payment: string | null;
  setPayment: (payment: any) => void;
}) {
  const [show, setShow] = useState(false);
  const [booking, setBooking] = useState<Booking>();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (payment !== null) {
      setShow(true);
      setIsLoading(true);
      getBookingById(payment)
        .then((data) => setBooking(data))
        .catch((err) => {
          setErr(err.response?.data.messages[0] as string);
        })
        .finally(() => setIsLoading(false));
    } else {
      setShow(false);
      setIsLoading(false);
      setBooking(undefined);
    }
  }, [payment]);

  return (
    <Modal
      dismissible
      show={show}
      onClose={() => {
        setPayment(null);
        setShow(false);
      }}
    >
      <Modal.Header>Booking Detail</Modal.Header>
      <Modal.Body>
        {!isLoading && err !== "" && (
          <div className="min-h-[300px]">
            <p>Something went wrong... Please try again later.</p>
          </div>
        )}

        {isLoading && (
          <div className="min-h-[300px] flex items-center justify-center">
            <Spinner />
          </div>
        )}

        {!isLoading && payment && booking && (
          <>
            <div>
              <h2 className="text-2xl font-bold mb-4">{booking.filmName}</h2>
              <p>
                <strong>Customer Name:</strong> {booking.customerName}
              </p>
              <p>
                <strong>Phone Number:</strong> {booking.phoneNumber}
              </p>
              <p>
                <strong>Total Price:</strong> {booking.totalPrice}{" "}
                {booking.bookingCurrency}
              </p>
              <p>
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleString()}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {new Date(booking.startTime!).toLocaleString()}
              </p>
              <p>
                <strong>Cinema Name:</strong> {booking.cinemaName}
              </p>
              <p>
                <strong>Room Name:</strong> {booking.roomName}
              </p>
              <p>
                <strong>Seats:</strong>{" "}
                {booking.tickets &&
                  booking.tickets.map((ticket) => (
                    <span key={ticket.id}>{ticket.seatCode}, </span>
                  ))}
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Image
                alt="Embedded QR Code"
                src={`data:image/jpeg;base64,${booking.qrCode}`}
                width={300}
                height={300}
              />
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={close}>I accept</Button> */}
        {/* <Button color="gray" onClick={() => setOpenModal(false)}> */}
        {/*   Decline */}
        {/* </Button> */}
      </Modal.Footer>
    </Modal>
  );
}
