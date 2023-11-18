import { Room } from "@/types/Room";
import apiClient from "./api";

export default async function getRoomById(roomId: number) {
  const resp = await apiClient.get(`/v1/room/${roomId}`);

  return resp.data.data as Room;
}
