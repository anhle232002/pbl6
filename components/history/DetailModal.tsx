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
      <Modal.Header>Thông tin đặt vé</Modal.Header>
      <Modal.Body>
        {!isLoading && err !== "" && (
          <div className="min-h-[300px]">
            <p>Đã xảy ra lỗi... Vui lòng thử lại sau.</p>
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
                <strong>Tên người đặt:</strong> {booking.customerName}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {booking.phoneNumber}
              </p>
              <p>
                <strong>Số tiền đã thanh toán:</strong> {booking.totalPrice}
                {booking.bookingCurrency}
              </p>
              <p>
                <strong>Ngày đặt:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleString()}
              </p>
              <p>
                <strong>Phim:</strong> {booking.filmName}
              </p>
              <p>
                <strong>Giờ chiếu:</strong>{" "}
                {new Date(booking.startTime!).toLocaleString()}
              </p>
              <p>
                <strong>Rạp chiếu phim:</strong> {booking.cinemaName}
              </p>
              <p>
                <strong>Phòng:</strong> {booking.roomName}
              </p>
              <p>
                <strong>Ghế:</strong>{" "}
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
