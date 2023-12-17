import apiClient from "./api";

export default async function addRating(params: {
  filmId: number;
  score: number;
}) {
  const res = await apiClient.post("/v1/review", params);

  return res.data;
}
