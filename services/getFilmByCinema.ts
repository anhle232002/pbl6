import apiClient from "./api";

export default async function getSchedules() {
  const resp = await apiClient.get(`/v1/schedule`);

  return resp.data.data;
}
