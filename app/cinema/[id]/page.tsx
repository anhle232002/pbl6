import { getCinemas } from "@/api/getCinemas";
import getSchedulesByCinema from "@/api/getSchedulesByCinema";
import MovieCarousel from "@/components/MovieCarousel";
import MovieDetailsCard from "@/components/MovieDetailsCard";
import NavBar from "@/components/NavBar";
import WeekDayTabs from "@/components/WeekDayTabs";

export default function CinemaMovies({ params }: { params: { id: string } }) {
  const schedules = getSchedulesByCinema(Number(params.id));

  console.log(schedules);

  return (
    <div className="bg-background text-accent">
      <NavBar />

      <MovieCarousel />

      <div className="max-w-5xl m-auto py-10">
        <WeekDayTabs />

        <div className="mt-10 space-y-16">
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
          <hr />
          <MovieDetailsCard />
        </div>
      </div>
    </div>
  );
}
