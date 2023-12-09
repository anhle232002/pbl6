import getFilms from "@/services/getFilms";
import { Film } from "@/types/Film";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import { RiSearch2Line, RiTicketLine } from "react-icons/ri";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const [results, setResults] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const onClickSearch = async () => {
    try {
      if (!searchStr) {
        return;
      }

      setIsLoading(true);
      setResults([]);
      const resp = await getFilms({ Keyword: searchStr });

      setResults(resp.data);
      setIsLoading(false);
    } catch (error: any) {
      setErr(error.response.message[0]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 z-50">
      <div className="relative h-full flex justify-end">
        <div
          onClick={onClose}
          className="absolute top-0 left-0 w-full h-full bg-black/50"
        ></div>
        <div
          style={{
            backgroundImage: "linear-gradient(110deg,#171717 47%,#0e0e0e 0)",
          }}
          className="relative h-full p-14 w-[550px]"
        >
          <h3 className="text-3xl underline font-[isonorm] tracking-widest bg-primary-linear bg-clip-text text-transparent uppercase">
            Tìm kiếm phim
          </h3>

          <div className="mt-10 flex gap-4 border-b-accent border-b pb-2">
            <input
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
              type="text"
              name=""
              className="bg-transparent border-none outline-none flex-1 text-white focus:ring-0"
              placeholder="Start typing the name you want to watch..."
              id=""
            />

            <button onClick={onClickSearch}>
              <RiSearch2Line className="text-accent text-3xl" />
            </button>
          </div>

          {err && <div className="text-red-500 mt-4">{err}</div>}

          {isLoading && (
            <div className="min-h-[200px] flex justify-center items-center mt-8">
              <Spinner />
            </div>
          )}

          <div className="py-6 space-y-4">
            {results &&
              results.map((film: Film) => {
                return (
                  <Link
                    href={`/movies/${film.id}`}
                    role="button"
                    className="text-white text-lg flex justify-between hover:text-primary duration-150"
                    key={film.id}
                  >
                    <div>{film.name}</div>
                    <span>
                      <RiTicketLine />
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
