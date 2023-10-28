import MovieCarousel from "@/components/MovieCarousel";
import MovieDetailsCard from "@/components/MovieDetailsCard";
import NavBar from "@/components/NavBar";
import WeekDayTabs from "@/components/WeekDayTabs";

export default function CinemaMovies() {
  return (
    <div className="">
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
