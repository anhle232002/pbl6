import apiClient from "./api";

export async function getBookingById(id: number) {
  const resp = await apiClient.get(`/v1/booking/${id}`);

  return resp.data.data;
}
