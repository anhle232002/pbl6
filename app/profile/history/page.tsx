"use client";

import DetailModal from "@/components/history/DetailModal";
import { useUser } from "@/hooks/useUser";
import { getBookings } from "@/services/getBookings";
import { Booking } from "@/types/Booking";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function History() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<Booking[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (user) {
      getBookings(user.userId)
        .then((data) => setBookings(data))
        .catch((err) => {
          setErr(err.response?.data.messages[0] as string);
        })
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const onClickShowDetail = (id: string) => {
    setSelectedPayment(id);
  };

  return (
    <div>
      <div className="text-xl font-semibold">Lịch sử đặt vé</div>

      <hr className="mt-2" />

      <div className="mt-10">
        {isLoading && (
          <div className="min-h-[300px] flex items-center justify-center">
            <Spinner></Spinner>
          </div>
        )}

        {!isLoading && bookings && (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Ngày đặt</Table.HeadCell>
                <Table.HeadCell>Phim</Table.HeadCell>
                <Table.HeadCell>Rạp chiếu</Table.HeadCell>
                <Table.HeadCell>Tổng</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {bookings.map((bk) => {
                  return (
                    <Table.Row
                      role="button"
                      key={bk.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      onClick={() => onClickShowDetail(bk.bookingRefId)}
                    >
                      <Table.Cell>
                        {format(
                          new Date(bk.bookingDate),
                          "dd MMMM, yyyy h:mm a",
                          { locale: vi },
                        )}
                      </Table.Cell>
                      <Table.Cell>{bk.filmName} </Table.Cell>

                      <Table.Cell>{bk.cinemaName}</Table.Cell>

                      <Table.Cell>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(bk.totalPrice)}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>

            <DetailModal
              payment={selectedPayment}
              setPayment={setSelectedPayment}
            ></DetailModal>
          </div>
        )}
      </div>
    </div>
  );
}
