"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiArrowDownLine, RiSearch2Line, RiUser3Line } from "react-icons/ri";
import SearchModal from "./SearchModal";
import { storage } from "@/utils/storage";
import { Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import { HiChevronDown } from "react-icons/hi";
import { Cinema } from "@/types/Cinema";
import { getCinemas } from "@/services/getCinemas";

export default function NavBar() {
  const router = useRouter();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [showNavbar, setShowNavbar] = useState(false);
  const [user, setUser] = useState<any>();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (localStorage) {
      setUser(JSON.parse(storage.get("user") || "null"));
    }
  }, []);

  useEffect(() => {
    getCinemas().then((data) => {
      setCinemas(data);
    });
  }, []);

  const onClickLogOut = () => {
    localStorage.clear();

    router.replace("/login");
  };

  return (
    <nav className="bg-background">
      <div className="max-w-5xl m-auto ">
        <div className="flex items-center gap-12">
          <Link href={"/"} className="text-primary font-semibold text-xl">
            Cinephile
          </Link>

          <div className="flex-1">
            <ul className="text-accent flex gap-8">
              <li className="hover:bg-primary-linear bg-transparent bg-clip-text hover:text-transparent py-8">
                <Link href={"/"}>Đang chiếu</Link>
              </li>
              <li className="hover:bg-primary-linear hover:bg-clip-text hover:text-transparent  py-8">
                <Link href={"/"}>Sắp chiếu </Link>
              </li>
              <li role="button" className="group relative py-8 ">
                <span className="flex items-center gap-2">
                  <span className="hover:bg-primary-linear hover:bg-clip-text hover:text-transparent ">
                    Rạp phim
                  </span>
                  <HiChevronDown />
                </span>

                <div className="absolute top-[80%] -left-[45px] hidden group-hover:md:block hover:md:block z-[800] h-auto">
                  <div
                    className="bg-white min-w-[250px] text-center border border-white border-solid rounded h-auto"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px",
                    }}
                  >
                    <ul className="max-h-80 overflow-auto scroll-smooth list__item">
                      {cinemas &&
                        cinemas.length > 0 &&
                        cinemas.map((cinema) => {
                          return (
                            <li
                              key={cinema.id}
                              className="text-sm text-black hover:text-[#f26b38] hover:pl-0.5 hover:border-l-4  hover:border-[#fd841f] hover:bg-[#fb770b1a] transition-all duration-300"
                            >
                              <a
                                className="block py-2"
                                href={`/cinemas/${cinema.id}`}
                              >
                                {cinema.name}
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
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
                className="z-[1000]"
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
