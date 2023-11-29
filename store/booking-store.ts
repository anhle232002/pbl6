import { Film } from "@/types/Film";
import { TSeat } from "@/types/TSeat";
import { create } from "zustand";

interface State {
  step: number;
  selectedSeats: TSeat[];
  selectedPaymentMethod: string;
  schedule: Schedule | null;
  film: Film | null;

  setFilm: (film: Film) => void;
  setSchedule: (schedule: Schedule) => void;
  setStep: (step: number) => void;
  setPaymentMethod: (method: string) => void;
  selectSeat: (seat: TSeat) => void;
  isSelectedSeat: (seatId: number) => boolean;
}

export const useBookingStore = create<State>((set, get) => ({
  step: 0,
  selectedSeats: [],
  selectedPaymentMethod: "VNPAY",
  schedule: null,
  film: null,

  setFilm(film: Film) {
    set((state) => ({ ...state, film: film }));
  },
  setSchedule(schedule) {
    set((state) => ({ ...state, schedule: schedule }));
  },

  setStep: (step) => {
    set((state) => ({ ...state, step: step }));
  },

  setPaymentMethod(method: string) {
    set((state) => ({ ...state, selectedPaymentMethod: method }));
  },

  isSelectedSeat(seatId) {
    return get().selectedSeats.findIndex((s) => s.id === seatId) !== -1;
  },

  selectSeat: (seat: TSeat) => {
    if (seat.status === 2 || seat.status === 3) {
      // notify
      return;
    }

    if (!get().isSelectedSeat(seat.id)) {
      set((state) => ({
        ...state,
        selectedSeats: [...state.selectedSeats, seat],
      }));
    } else {
      set((state) => ({
        ...state,
        selectedSeats: state.selectedSeats.filter((s) => s.id !== seat.id),
      }));
    }
  },
}));
