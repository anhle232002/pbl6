"use client";
import { initCarousels } from "flowbite/lib/esm/components/carousel";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Movie from "@/components/Movie";
import MovieCarousel from "@/components/MovieCarousel";
export default function Home() {
  useEffect(() => {
    initCarousels();
  }, []);
  return (
    <div className="mb-20">
      <NavBar />
      <div className="mx-auto max-w-2xl pb-20 pt-24 lg:pt-20 lg:pb-16 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Cinema app
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            With the ticket booking feature, you can easily select showtimes,
            choose seats, and secure their reservations in seconds.
          </p>
        </div>
      </div>

      <MovieCarousel />

      <header className="mx-auto max-w-2xl mt-16 px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-bold text-white">Select movie to watch</h1>
      </header>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 mt-4 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
        </div>
      </div>

      <footer></footer>
    </div>
  );
}
