"use client";
import { login } from "@/services/login";
import { storage } from "@/utils/storage";
import { AxiosError } from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PiFilmReelBold } from "react-icons/pi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const resp = await login(username, password);
      if (resp.data.role !== "Customer") {
        setErr("You are not allow to login");
        return;
      }

      storage.set("user", JSON.stringify(resp.data));
      storage.set("access-token", resp.data.token);
      storage.set("logged_in", "true");

      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        setErr(error.response?.data.messages[0] as string);
      }
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-background">
      <Link
        href="/"
        className="flex items-center mb-6 text-2xl font-semibold text-primary text-tr "
      >
        <PiFilmReelBold className="h-10 w-10" />
        <span className="self-center whitespace-nowrap pl-3 text-xl font-semibold ">
          Cinephile
        </span>
      </Link>
      <div className="w-full bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md shadow-[0px_0px_100px_10px_#777]  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng nhập
          </h1>
          <form
            onSubmit={(e) => onSubmit(e)}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={username}
                onChange={(el) => setUsername(el.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(el) => setPassword(el.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Đăng nhập
            </button>

            {err && <div className="mt-2 text-red-500 text-center">{err}</div>}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Chưa có tài khoản ?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
