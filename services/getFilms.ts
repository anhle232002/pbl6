import apiClient from "./api";

export interface GetFilmsParams {
  Keyword?: string;
}

export default async function getFilms(params?: GetFilmsParams) {
  const resp = await apiClient.get("/v1/film", {
    params: {
      ...params,
      Enable: true,
    },
  });

  return resp.data;
}
