"use client";
import { Cinema } from "@/types/Cinema";
import { Modal } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";

export default function ChooseCinema({ cinemas }: { cinemas: Cinema[] }) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <div className="flex-1">
      <div role="button" onClick={() => props.setOpenModal("dismissible")}>
        <div className="border-b-2 border-accent pb-1">
          Nhấp để chọn rạp chiếu bạn muốn tìm
        </div>
      </div>

      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        size="md"
        onClose={() => props.setOpenModal(undefined)}
        className="overflow-hidden bg-black"
      >
        <div className="border-2 border-black/60 rounded-md">
          <Modal.Header className="bg-black border-b-0">
            <div className="bg-primary-linear bg-clip-text text-transparent">
              Chọn rạp chiếu bạn muốn đi đến
            </div>
          </Modal.Header>
          <Modal.Body className="bg-black text-accent ">
            <ul className="space-y-4">
              {cinemas.map((cinema) => {
                return (
                  <Link
                    key={cinema.id}
                    href={`/cinemas?cid=${cinema.id}`}
                    className="block border-b pb-2 border-accent hover:text-primary"
                  >
                    <li role="button">
                      {cinema.name} - {cinema.city}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}
