import apiClient from "./api";

export default async function getScheduleById(scheduleId: number) {
  const resp = await apiClient.get(`/v1/schedule/${scheduleId}`);

  return resp.data.data;
}
