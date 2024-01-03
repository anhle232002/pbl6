"use client";
import Link from "next/link";
import { PiFilmReelBold } from "react-icons/pi";
import Image from "next/image";

export default function ConfirmEmailpage() {
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
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/icons8-email-64.png" // Absolute path starting with a leading slash
              alt="Email Icon"
              width={80}
              height={80}
            />
          </div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Kiểm tra email của bạn
          </h1>
          <h3 className="text-center">
            Vui lòng kiểm tra email và nhấn nút xác nhận được gửi trong email để
            xác thực email của bạn
          </h3>
          {/* <h3 className="text-center">Nếu đã xác thực email thành công, giờ bạn có thể đăng nhập: </h3> */}
          <p className="text-center">
            Nếu đã xác thực email thành công, giờ bạn có thể{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Đăng nhập
            </Link>
            hoặc trở về
            <Link
              href="/"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Trang chủ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
