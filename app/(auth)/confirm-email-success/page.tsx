"use client";
import Link from "next/link";
import { PiFilmReelBold } from "react-icons/pi";
import Image from 'next/image';

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
                            src="/images/icons8-confirm-64.png" // Absolute path starting with a leading slash
                            alt="Email Icon"
                            width={80}
                            height={80}
                        />
                    </div>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Xác thực email thành công
                    </h1>
                    <h3 className="text-center">Cảm ơn bạn đã xác thực email, giờ đây bạn có thể đăng nhập và đặt vé trên Cinephile</h3>
                    <p className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center " style={{ cursor: 'pointer' }}
                        onClick={() => {
                            window.location.href = '/login';
                        }}>Trở về trang đăng nhập</p>
                </div>
            </div>
        </div>
    );
}
