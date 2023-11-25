import apiClient from "./api";

export default async function getSchedulesByFilmId(filmId: number) {
  const resp = await apiClient.get(`/v1/schedule/film/${filmId}`);

  return resp.data.data;
}
