import Link from "next/link";

export interface Movie {
  id: number;
  name: string;
  image: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div role="button" className="group  hover:scale-105 duration-300">
      <Link href={`/movies/${movie.id}`}>
        <div>
          <img
            className="w-full h-80 object-cover group-hover:shadow-[0px_0px_100px_10px_#777] duration-200 rounded"
            src={movie.image}
            alt="movie-image"
          />
        </div>
        <p className="text-center mt-4  text-black   tracking-wider">
          {movie.name}
        </p>
      </Link>
    </div>
  );
}
