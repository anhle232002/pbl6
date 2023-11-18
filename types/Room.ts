import { TSeat } from "./TSeat";

export interface Room {
  id: number;
  cinemaId: number;
  listSeats: TSeat[];
  name: string;
  numberRow: number;
  numberColumn: number;
  status: number;
}
