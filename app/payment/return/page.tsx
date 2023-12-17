"use client";

import { getBookingById } from "@/services/getBookingById";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";

export default function SuccessPayment() {
  const params = useSearchParams();
  const paymentId = params.get("PaymentId");
  const paymentStatus = params.get("PaymentId");
  const paymentMessage = params.get("PaymentId");
  const paymentDate = params.get("PaymentId");

  const [booking, setBooking] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!paymentId) return;
    setIsLoading(true);
    getBookingById(paymentId)
      .then((data) => {
        setBooking(data);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log(error);
          if (error.response?.status === 401) {
            setErr("Bạn không có quyền truy cập");
            return;
          }

          setErr(error.response?.data.messages[0] as string);
        }
      })
      .finally(() => setIsLoading(false));
  }, [paymentId]);

  const seats = useMemo(() => {
    if (!booking || !booking.tickets) return "";

    return booking.tickets.map((t: any) => t.seatCode).join(",");
  }, [booking]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200 py-10">
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <Spinner></Spinner>
        </div>
      )}

      {!isLoading && err !== "" && (
        <div className="text-center">Đã xảy ra lỗi. Vui lòng quay lại sau.</div>
      )}

      {!isLoading && booking && (
        <div className="m-auto p-8 min-h-[500px] max-w-[500px] bg-white rounded shadow-xl">
          <h3 className="text-center font-semibold text-green-400  text-2xl">
            Thanh toán thành công
          </h3>
          <div className="mt-4 flex justify-center">
            <RiCheckboxCircleLine className="text-green-400 text-8xl " />
          </div>

          <p className="text-center">Cảm ơn quý khách đã lựa chọn Cinephile.</p>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between text-lg">
              <div className="text-accent">Phim</div>
              <div>{booking.filmName}</div>
            </div>
            <div className="flex items-center justify-between text-lg">
              <div className="text-accent">Ngày chiếu</div>
              <div>
                {format(new Date(booking.startTime), "MM-dd-yyyy HH:mm")}
              </div>
            </div>

            <div className="flex items-center justify-between text-lg">
              <div className="text-accent">Rạp phim</div>
              <div>{booking.cinemaName}</div>
            </div>

            <div className="flex items-center justify-between text-lg">
              <div className="text-accent">Phòng</div>
              <div>{booking.roomName}</div>
            </div>

            <div className="flex items-center justify-between text-lg">
              <div className="text-accent">Ghế</div>
              <div>{seats}</div>
            </div>
            <div className="flex items-center justify-between text-lg">
              <div className="text-accent">Ngày thanh toán</div>
              <div>
                {format(new Date(booking.bookingDate), "MM-dd-yyyy HH:mm")}
              </div>
            </div>

            <div className="flex items-center justify-between text-lg">
              <div className="text-accent">Tổng số tiền đã thanh toán</div>
              <div>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(booking.totalPrice)}
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                alt="Embedded QR Code"
                src={`data:image/jpeg;base64,${booking.qrCode}`}
                width={300}
                height={300}
              />
            </div>
          </div>

          <p className="mt-8 text-center">
            Thanh toán của bạn đã thành công và ghế của bạn đã được đặt chỗ.
            Chúng tôi mong đợi mang đến cho bạn một trải nghiệm điện ảnh tuyệt
            vời!
          </p>
          {/* <p className="mt-4 font-semibold"> */}
          {/*   Đối với mọi thắc mắc hoặc sự hỗ trợ, vui lòng liên hệ đội ngũ hỗ trợ */}
          {/*   của chúng tôi. */}
          {/* </p> */}

          <div className="flex items-center justify-center gap-10 mt-6">
            <Link href="/">
              <Button>Home page</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
