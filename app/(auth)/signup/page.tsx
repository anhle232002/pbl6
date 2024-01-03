"use client";
import { Metadata } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { PiFilmReelBold } from "react-icons/pi";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { AxiosError } from "axios";
import { signup } from "@/services/signup";
import { useRouter } from "next/navigation";
import { login } from "@/services/login";
import { storage } from "@/utils/storage";

const schema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  username: Joi.string().min(1).required(),
  name: Joi.string().min(5).required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  address: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  password: Joi.string()
    .min(6)
    .message("Password must be atleast 6 characters long")
    .required(),
  repassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "Confirm password does not match" }),
});

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await signup({
        address: data.address,
        customerName: data.name,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        username: data.username,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });

      const userData = await login(data.email, data.password);

      storage.set("user", JSON.stringify(userData.data));
      storage.set("access-token", userData.data.token);
      storage.set("logged_in", "true");

      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        setErr(error.response?.data.messages[0] as string);
      }
    }
  };

  return (
    <div className="bg-background flex flex-col items-center justify-center px-8 mx-auto lg:py-10">
      <Link
        href="/"
        className="flex items-center mb-6 text-2xl font-semibold text-white"
      >
        <PiFilmReelBold className="h-10 w-10" />
        <span className="self-center whitespace-nowrap pl-3 text-xl font-semibold text-white">
          Cinema
        </span>
      </Link>

      <div className="w-full bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md shadow-[0px_0px_100px_10px_#777]  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng ký
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập email"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.email && (errors.email.message as string)}
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập username"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.username && (errors.username.message as string)}
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Họ và tên
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập họ và tên"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.name && (errors.name.message as string)}
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Địa chỉ
              </label>
              <input
                type="text"
                {...register("address")}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập địa chỉ"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.address && (errors.address.message as string)}
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Số điện thoại
              </label>
              <input
                {...register("phoneNumber")}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số điện thoại"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.phoneNumber && (errors.phoneNumber.message as string)}
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ngày sinh
              </label>
              <input
                {...register("dateOfBirth")}
                type="date"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Da Nang"
              />
              <p className="text-sm text-red-700 mt-2">
                {errors.dateOfBirth && (errors.dateOfBirth.message as string)}
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mật khẩu
              </label>
              <input
                {...register("password")}
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p className="text-sm text-red-700 mt-2">
                {errors.password && (errors.password.message as string)}
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Xác nhận mật khẩu
              </label>
              <input
                {...register("repassword")}
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <p className="text-sm text-red-700 mt-2">
                {errors.repassword && (errors.repassword.message as string)}
              </p>
            </div>
            <div className="flex items-start"></div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Tạo tài khoản
            </button>

            {err && <div className="mt-2 text-red-500 text-center">{err}</div>}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Đã có tài khoản ?{" "}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
