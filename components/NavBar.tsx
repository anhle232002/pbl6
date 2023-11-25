"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiSearch2Line, RiUser3Line } from "react-icons/ri";
import SearchModal from "./SearchModal";
import { storage } from "@/utils/storage";

export default function NavBar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [user, setUser] = useState<any>();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (localStorage) {
      setUser(JSON.parse(storage.get("user") || "null"));
    }
  }, []);

  return (
    <nav className="bg-background">
      <div className="max-w-5xl m-auto p-8">
        <div className="flex items-center gap-12">
          <Link href={"/"} className="text-primary font-semibold text-xl">
            Cinephile
          </Link>

          <div className="flex-1">
            <ul className="text-accent flex gap-4">
              <li className="hover:bg-primary-linear bg-transparent bg-clip-text hover:text-transparent">
                <Link href={"/"}>WHAT&#39;S ON</Link>
              </li>
              <li className="hover:bg-primary-linear hover:bg-clip-text hover:text-transparent">
                <Link href={"/"}>TRAILERS</Link>
              </li>
              <li className="hover:bg-primary-linear hover:bg-clip-text hover:text-transparent ">
                <Link href={"/"}>COMING SOON</Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 items-center">
            {!isLoggedIn && (
              <Link href={"/login"} className="block" role="button">
                <RiUser3Line className="text-accent text-3xl" />
              </Link>
            )}
            {isLoggedIn && (
              <div className="text-white">Hello {user?.employeeNo}</div>
            )}
            <div role="button" onClick={() => setShowNavbar(true)}>
              <RiSearch2Line className="text-accent text-3xl" />
            </div>

            {showNavbar && <SearchModal onClose={() => setShowNavbar(false)} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
