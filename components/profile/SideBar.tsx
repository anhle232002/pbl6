"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const path = usePathname();

  return (
    <div className="rounded-lg">
      <ul className="space-y-1">
        <li>
          <Link
            href={"/profile"}
            role="button"
            className="relative block text-lg font-medium hover:bg-slate-700 duration-200 p-4 bg-[#1a1a1a] shadow rounded"
          >
            {path === "/profile" && (
              <span className="absolute left-0 top-0 w-3 rounded-l bg-primary h-full"></span>
            )}
            <div className="ml-6">Your Account</div>
          </Link>
        </li>
        <li>
          <Link
            href={"/profile/history"}
            role="button"
            className="relative block text-lg font-medium hover:bg-slate-700 duration-200 p-4 bg-[#1a1a1a] shadow rounded"
          >
            {path === "/profile/history" && (
              <span className="absolute left-0 top-0 w-3 rounded-l bg-primary h-full"></span>
            )}

            <div className="ml-6">Booking History</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
