"use client";

import { Cinema } from "@/types/Cinema";
import { useEffect, useState } from "react";
import ChooseCinema from "./ChooseCinema";
import { getCinemas } from "@/services/getCinemas";

export default function NavigateToWhatsOn() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);

  useEffect(() => {
    getCinemas().then((data) => {
      setCinemas(data);
    });
  }, []);

  return (
    <div className="flex gap-10 items-center">
      <p className="text-black text-2xl">Xem lịch chiếu tại</p>

      <ChooseCinema cinemas={cinemas} />

      <button className="font-semibold border-2 border-accent w-24 rounded text-black py-2 hover:shadow-[0px_0px_100px_10px_#777] duration-200">
        Tìm
      </button>
    </div>
  );
}
