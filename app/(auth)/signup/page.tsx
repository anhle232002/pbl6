"use client";
import { Metadata } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { PiFilmReelBold } from "react-icons/pi";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { AxiosError } from "axios";
import { signup } from "@/api/signup";
import { useRouter } from "next/navigation";

const schema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  name: Joi.string().min(5).required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  address: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  password: Joi.string().min(6).message("Password must be atleast 6 characters long").required(),
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
        username: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });

      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        setErr(error.response?.data.messages[0] as string);
      }
    }
  };

  return (
    <div className="bg-background flex flex-col items-center justify-center px-8 mx-auto lg:py-10">
      <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
        <PiFilmReelBold className="h-10 w-10" />
        <span className="self-center whitespace-nowrap pl-3 text-xl font-semibold text-white">
          Cinema
        </span>
      </Link>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.email && (errors.email.message as string)}
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.name && (errors.name.message as string)}
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.address && (errors.address.message as string)}
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                {...register("phoneNumber")}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0905123123"
              />

              <p className="text-sm text-red-700 mt-2">
                {errors.phoneNumber && (errors.phoneNumber.message as string)}
              </p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date of Birth
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
                Password
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
                Confirm Password
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
              Create an account
            </button>

            {err && <div className="mt-2 text-red-500 text-center">{err}</div>}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
