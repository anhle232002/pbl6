"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import ChooseCinema from "./ChooseCinema";

export default function NavigateToWhatsOn() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  return (
    <div className="flex gap-10 items-center">
      <p className="text-white text-3xl">SEE WHAT&#39;S ON AT</p>

      <ChooseCinema />

      <button className="font-semibold border-2 border-accent w-24 rounded text-white py-2 hover:shadow-[0px_0px_100px_10px_#777] duration-200">
        GO
      </button>
    </div>
  );
}
