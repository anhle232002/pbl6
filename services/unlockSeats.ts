import apiClient from "./api";

export type UnlockSeatsParams = {
  customerId: number;
  scheduleId: number;
  numberSeats: number[];
};

export default async function unlockSeats(params: UnlockSeatsParams) {
  const res = await apiClient.post("/v1/reserve/unlock", params);

  return res.data;
}
