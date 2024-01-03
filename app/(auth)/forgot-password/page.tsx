"use client";
import forgotPassword from "@/services/forgot-password";
import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { PiFilmReelBold } from "react-icons/pi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [isSucess, setIsSuccess] = useState(false);
  const onSubmit = async () => {
    try {
      if (email === "") return;
      await forgotPassword(email);
      setIsSuccess(true);
      setErr("");
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
            Quên mật khẩu
          </h1>

          <p className=" text-sm">
            Chúng tôi sẽ gửi đến email của bạn hướng dẫn để lấy lại mật khẩu
          </p>

          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(el) => setEmail(el.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <button
              disabled={isSucess}
              onClick={onSubmit}
              className="w-full disabled:opacity-50 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Lấy lại mật khẩu
            </button>

            {isSucess && (
              <p className="text-sm  text-center">
                Chúng tôi đã gửi đến email của bạn hướng dẫn lấy mật khẩu. Vui
                lòng kiểm tra để tiếp tục
              </p>
            )}

            {err && <div className="mt-2 text-red-500 text-center">{err}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
