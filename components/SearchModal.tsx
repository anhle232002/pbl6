import { RiSearch2Line } from "react-icons/ri";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed w-full h-full top-0 left-0 z-50">
      <div className="relative h-full flex justify-end">
        <div onClick={onClose} className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div
          style={{ backgroundImage: "linear-gradient(110deg,#171717 47%,#0e0e0e 0)" }}
          className="relative h-full p-14 w-[550px]"
        >
          <h3 className="text-3xl underline font-[isonorm] tracking-widest bg-primary-linear bg-clip-text text-transparent uppercase">
            Search
          </h3>

          <div className="mt-10 flex gap-4 border-b-accent border-b pb-2">
            <input
              type="text"
              name=""
              className="bg-transparent border-none outline-none flex-1"
              placeholder="Start typing the name you want to watch..."
              id=""
            />

            <button>
              <RiSearch2Line className="text-accent text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
