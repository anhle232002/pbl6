"use client";
import NavBar from "@/components/NavBar";
import { useUser } from "@/hooks/useUser";
import Link from "@/node_modules/next/link";
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Profile ",
//   description: "User profile",
// };

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  return (
    <section className="bg-black min-h-screen">
      <NavBar />
      <div className="max-w-7xl m-auto p-4 text-white grid grid-cols-12 gap-10 mt-10">
        <div className="col-span-3">
          <SideBar />
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </section>
  );
}

function SideBar() {
  return (
    <div className="rounded-lg">
      <ul className="space-y-1">
        <li>
          <Link
            href={"/profile"}
            role="button"
            className="relative block text-lg font-medium hover:bg-slate-700 duration-200 p-4 bg-slate-900 shadow rounded"
          >
            <span className="absolute left-0 top-0 w-3 rounded-l bg-slate-600 h-full"></span>
            <div className="ml-6">Your Account</div>
          </Link>{" "}
        </li>
        <li>
          <Link
            href={"/profile/history"}
            role="button"
            className="relative block text-lg font-medium hover:bg-slate-700 duration-200 p-4 bg-slate-900 shadow rounded"
          >
            {/* <span className="absolute left-0 top-0 w-3 rounded-l bg-slate-600 h-full"></span> */}
            <div className="ml-6">Booking History </div>
          </Link>
        </li>
        <li
          role="button"
          className="relative text-lg font-medium hover:bg-slate-700 duration-200 p-4 bg-slate-900 shadow rounded"
        >
          {/* <span className="absolute left-0 top-0 w-3 rounded-l bg-slate-600 h-full"></span> */}
          <div className="ml-6">Reminders</div>
        </li>
      </ul>
    </div>
  );
}
