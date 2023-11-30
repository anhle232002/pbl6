import apiClient from "./api";

interface GetSchedulesParams {
  cinemaId: number;
}

export default async function getSchedules(params?: GetSchedulesParams) {
  const resp = await apiClient.get(`/v1/schedule`, { params: params });

  return resp.data.data;
}
