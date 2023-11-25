import apiClient from "./api"

export default async function getFilmById(id: number) {
    const resp = await apiClient.get(`/v1/film/${id}`  )

    return resp.data.data
}