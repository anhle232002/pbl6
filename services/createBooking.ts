import apiClient from "./api";

interface CreateBookingParams {
  customerId: number;
  scheduleId: number;
  numberSeats: number[];
  paymentDestinationId: string;
}

export default async function createBooking(params: CreateBookingParams) {
  const res = await apiClient.post("/v1/booking", params);

  return res.data;
}
