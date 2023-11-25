import apiClient from "./api";

export type ReserverSeatsParams = {
  customerId: number;
  scheduleId: number;
  numberSeats: number[];
};
export default async function reserveSeats(params: ReserverSeatsParams) {
  const res = await apiClient.post("/v1/reserve", params);

  return res.data;
}
