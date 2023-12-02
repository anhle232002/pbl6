"use client";

import { useUser } from "@/hooks/useUser";
import { getBookings } from "@/services/getBookings";
import { Booking } from "@/types/Booking";
import { format } from "date-fns";
import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function History() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<Booking[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getBookings(user.userId)
        .then((data) => setBookings(data))
        .catch((err) => {})
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return (
    <div>
      <div className="text-xl font-semibold">Booking History</div>

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
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>Booking Date</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {bookings.map((bk) => {
                  return (
                    <Table.Row
                      key={bk.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {bk.id}
                      </Table.Cell>
                      <Table.Cell>
                        {format(
                          new Date(bk.bookingDate),
                          "MMMM d, yyyy h:mm a",
                        )}
                      </Table.Cell>
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
          </div>
        )}
      </div>
    </div>
  );
}
