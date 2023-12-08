import { TSeat } from "./TSeat";

export interface Booking {
  id: number;
  bookingRefId: string;
  bookingDate: Date;
  totalPrice: number;
  filmName: string;
  cinemaName: string;
  phoneNumber?: string;
  customerName?: string;
  roomName?: string;
  startTime?: Date;
  bookingCurrency?: string;
  tickets?: TSeat[];
  qrCode?: string;
}
