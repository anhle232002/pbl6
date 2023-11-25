"use client";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { RiPlayCircleLine } from "react-icons/ri";

export interface Trailer {
  image: string;
  src: string;
  name: string;
}

export default function TrailerCard({ trailer }: { trailer: Trailer }) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <>
      <div
        role="button"
        onClick={() => props.setOpenModal("dismissible")}
        className="group"
      >
        <div className="relative">
          <img
            className="rounded h-32 w-full object-cover"
            src={trailer.image}
            alt="trailer-preview"
          />
          <div className="absolute w-full h-full group-hover:bg-black/30 left-0 top-0 flex items-center justify-center duration-200">
            <RiPlayCircleLine className="text-5xl group-hover:opacity-100 opacity-0 duration-200" />
          </div>
        </div>
        <p className="mt-4 text-xl text-white uppercase font-normal tracking-wider">
          {trailer.name}
        </p>
        <div>Official Trailer</div>
      </div>

      <Modal
        dismissible
        style={{ padding: 0 }}
        show={props.openModal === "dismissible"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Body className="bg-black border-none outline-none">
          <iframe
            className="w-full h-96"
            src={trailer.src}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
}
