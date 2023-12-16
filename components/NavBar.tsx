"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiSearch2Line, RiUser3Line } from "react-icons/ri";
import SearchModal from "./SearchModal";
import { storage } from "@/utils/storage";
import { Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(false);
  const [user, setUser] = useState<any>();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (localStorage) {
      setUser(JSON.parse(storage.get("user") || "null"));
    }
  }, []);

  const onClickLogOut = () => {
    localStorage.clear();

    router.replace("/login");
  };

  return (
    <nav className="bg-background">
      <div className="max-w-5xl m-auto p-8">
        <div className="flex items-center gap-12">
          <Link href={"/"} className="text-primary font-semibold text-xl">
            Cinephile
          </Link>

          <div className="flex-1">
            <ul className="text-accent flex gap-8">
              <li className="hover:bg-primary-linear bg-transparent bg-clip-text hover:text-transparent ">
                <Link href={"/"}>Đang chiếu</Link>
              </li>
              <li className="hover:bg-primary-linear hover:bg-clip-text hover:text-transparent ">
                <Link href={"/"}>Sắp chiếu </Link>
              </li>
              <li className="hover:bg-primary-linear hover:bg-clip-text hover:text-transparent ">
                <Link href={"/"}>Rạp phim</Link>
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
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <span
                    role="button"
                    className="text-white px-4 py-1 bg-primary rounded-md"
                  >
                    Chào {user.employeeNo.split("@")[0]}
                  </span>
                )}
              >
                <Dropdown.Item as="a" href="/profile">
                  Tài khoản
                </Dropdown.Item>
                <Dropdown.Item onClick={onClickLogOut}>Đăng xuất</Dropdown.Item>
              </Dropdown>
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
