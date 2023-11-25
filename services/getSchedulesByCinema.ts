import apiClient from "./api"

export default async function getSchedulesByCinema(cinemaId : number) {
    const resp = await apiClient.get(`/v1/schedule/cinema/${cinemaId}`)

    return resp.data.data
}