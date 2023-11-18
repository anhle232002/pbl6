import getFilmById from "@/api/getFilm";
import getScheduleById from "@/api/getScheduleById";
import BookSeatSection from "@/components/book-tickets/BookSeatSection";
import { MoviePreview } from "@/components/book-tickets/MoviePreview";
import NavBar from "@/components/NavBar";
import { Roboto_Condensed } from "next/font/google";
const robo = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default async function BookTickets({
  params,
}: {
  params: { filmId: string; scheduleId: string };
}) {
  try {
    const film = await getFilmById(Number(params.filmId));
    const schedule = await getScheduleById(Number(params.scheduleId));
    console.log(schedule.price);

    return (
      <div
        className={`${robo.className} min-h-screen bg-background text-accent`}
      >
        <NavBar />
        <div className="bg-white">
          <MoviePreview film={film} schedule={schedule} />

          <BookSeatSection
            price={schedule.price}
            seats={schedule.scheduleSeats}
            roomId={schedule.roomId}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);

    return <div>Something went wrong...</div>;
  }
}
