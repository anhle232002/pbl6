import { Film } from "@/types/Film";
import Image from "next/image";
import Link from "next/link";
import { RiStarFill, RiTicketFill } from "react-icons/ri";

export interface Movie {
  id: number;
  name: string;
  image: string;
  limitAge: number;
}

export default function MovieCard({ movie }: { movie: Film }) {
  return (
    <div className="Card_card__wrapper__RUTBs">
      <div role="button" className="relative ">
        <div className="relative">
          <img
            className="object-cover w-full h-[400px] duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0 rounded-md"
            src={movie.image}
            style={{ color: "transparent" }}
          />
          <div className="votes ">
            <p className="absolute right-[5px] bottom-10 flex gap-1 px-2 items-center bg-black/30 rounded-md ">
              <span>
                <RiStarFill className="text-primary" />
              </span>

              <span className="text-sm font-bold text-white">
                {movie.score ? movie.score : "Chưa có đánh giá"}
              </span>
            </p>
          </div>
          <div className="age__limit absolute bottom-[6px] right-[6px]">
            <span className="inline-flex items-center justify-center w-[38px] h-7 bg-primary rounded text-sm text-center text-white font-bold not-italic">
              T{movie.limitAge}
            </span>
          </div>
        </div>

        <div className="absolute rounded-md hover:opacity-100 hover:bg-black/60 duration-300 opacity-0 left-0 top-0 w-full h-full flex flex-col justify-center items-center">
          <Link
            href={`/movies/${movie.id}`}
            type="button"
            className="duration-200 text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440]
            rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
          >
            <RiTicketFill className="mr-2" /> Mua vé
          </Link>
          {/* <button */}
          {/*   type="button" */}
          {/*   className="text-white w-[120px] h-[40px] border border-white hover:bg-[#fb9440]/80 hover:border-transparent rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]" */}
          {/* > */}
          {/*   <svg */}
          {/*     aria-hidden="true" */}
          {/*     focusable="false" */}
          {/*     data-prefix="fas" */}
          {/*     data-icon="circle-play" */}
          {/*     className="svg-inline--fa fa-circle-play mr-2" */}
          {/*     role="img" */}
          {/*     xmlns="http://www.w3.org/2000/svg" */}
          {/*     viewBox="0 0 512 512" */}
          {/*   > */}
          {/*     <path */}
          {/*       fill="currentColor" */}
          {/*       d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z" */}
          {/*     ></path> */}
          {/*   </svg> */}
          {/*   Trailer */}
          {/* </button> */}
        </div>
      </div>

      <Link
        href={`/movies/${movie.id}`}
        className="mt-4 block font-semibold text-black"
      >
        <h3>{movie.name}</h3>
      </Link>
    </div>
  );
}
