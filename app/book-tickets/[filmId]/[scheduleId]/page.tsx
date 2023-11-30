"use client";
import getFilmById from "@/services/getFilm";
import getScheduleById from "@/services/getScheduleById";
import BookSeatSection from "@/components/book-tickets/BookSeatSection";
import { MoviePreview } from "@/components/book-tickets/MoviePreview";
import NavBar from "@/components/NavBar";
import { Roboto_Condensed } from "next/font/google";
import { useEffect, useLayoutEffect } from "react";
import { useBookingStore } from "@/store/booking-store";
const robo = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

function BookTickets({
  params,
}: {
  params: { filmId: string; scheduleId: string };
}) {
  const { setFilm, setSchedule, setInitialState } = useBookingStore();
  useLayoutEffect(() => {
    setInitialState();
  }, []);

  useEffect(() => {
    getFilmById(Number(params.filmId)).then((data) => {
      setFilm(data);
    });
    getScheduleById(Number(params.scheduleId)).then((data) => {
      setSchedule(data);
    });
  }, []);

  return (
    <div className={`${robo.className} min-h-screen bg-background text-accent`}>
      <NavBar />
      <div className="bg-white">
        <MoviePreview />

        <BookSeatSection />
      </div>
    </div>
  );
}

export default BookTickets;
