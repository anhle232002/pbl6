import { Modal } from "flowbite-react";

export default function TrailerModal({
  isShow,
  onClose,
  src,
}: {
  isShow: boolean;
  onClose: () => void;
  src: string;
}) {
  return (
    <Modal dismissible style={{ padding: 0 }} show={isShow} onClose={onClose}>
      <Modal.Body className="bg-black border-none outline-none">
        <iframe
          className="w-full h-96"
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Modal.Body>
    </Modal>
  );
}
