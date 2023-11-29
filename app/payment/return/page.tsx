"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RiCheckboxCircleLine } from "react-icons/ri";

export default function SuccessPayment() {
  const params = useSearchParams();

  const paymentId = params.get("PaymentId");
  const paymentStatus = params.get("PaymentId");
  const paymentMessage = params.get("PaymentId");
  const paymentDate = params.get("PaymentId");

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-200">
      <div className="m-auto p-8 min-h-[500px] max-w-[500px] bg-white rounded shadow-xl">
        <h3 className="text-center font-semibold text-green-400  text-2xl">
          Payment succesfull
        </h3>
        <div className="mt-4 flex justify-center">
          <RiCheckboxCircleLine className="text-green-400 text-8xl " />
        </div>

        <p className="text-center">Thank you for choosing Cinephile.</p>

        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-between text-lg">
            <div className="text-accent">Payment ID</div>
            <div>{paymentId}</div>
          </div>
          <div className="flex items-center justify-between text-lg">
            <div className="text-accent">Payment Status</div>
            <div className="text-green-500">Success</div>
          </div>

          <div className="flex items-center justify-between text-lg">
            <div className="text-accent">Payment Date</div>
            <div></div>
          </div>
        </div>

        <p className="mt-8 text-center">
          Your payment was successful, and your seats are now secured. We look
          forward to providing you with an amazing cinematic experience!
        </p>
        <p className="mt-4 font-semibold">
          For any inquiries or assistance, please contact our support team.
        </p>

        <div className="flex items-center justify-center gap-10 mt-6">
          <Link href="/">
            <Button>Home page</Button>
          </Link>
          <Button>Print</Button>
        </div>
      </div>
    </div>
  );
}
