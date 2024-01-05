"use client";

import { useUser } from "@/hooks/useUser";
import Image from "@/node_modules/next/image";
import changePassword from "@/services/change-password";
import { getCustomer } from "@/services/getCustomer";
import updateCustomer from "@/services/updateCustomer";
import { Customer } from "@/types/Customer";
import { joiResolver } from "@hookform/resolvers/joi";
import { AxiosError } from "axios";
import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import Joi from "joi";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

const schema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string()
    .min(6)
    .message("Password must be atleast 6 characters long")
    .required(),
  confirmNewPassword: Joi.any()
    .equal(Joi.ref("newPassword"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "Confirm password does not match" }),
});

export default function AccountSetting() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);

      setIsLoading(true);
      await changePassword({
        password: data.password,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      });
      setIsSuccess(true);
      setIsLoading(false);
      setErr("");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        setErr(error.response?.data.messages[0] as string);
      }
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 text-black rounded-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold tracking-wide ">Đổi mật khẩu</h3>
      </div>

      <hr className="mt-2" />

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 mt-8 space-y-6">
        <div className="grid grid-cols-12 items-center">
          <div className="mb-2 block col-span-3">
            <Label className="text-md" value="Mật khẩu cũ" />
          </div>
          <div className="flex-1 col-span-9">
            <TextInput
              {...register("password")}
              className="flex-1 col-span-9"
              type="password"
              sizing="md"
            />
            <p className="text-sm text-red-700 mt-2">
              {errors.password && (errors.password.message as string)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 items-center">
          <div className="mb-2 block col-span-3">
            <Label className="text-md" value="Mật khẩu mới" />
          </div>

          <div className="flex-1 col-span-9">
            <TextInput
              {...register("newPassword")}
              className="flex-1 col-span-9"
              type="password"
              sizing="md"
            />
            <p className="text-sm text-red-700 mt-2">
              {errors.newPassword && (errors.newPassword.message as string)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 items-center">
          <div className="mb-2 block col-span-3">
            <Label className="text-md" value="Xác nhận mật khẩu" />
          </div>
          <div className="flex-1 col-span-9">
            <TextInput
              {...register("confirmNewPassword")}
              className="flex-1 col-span-9"
              type="password"
              sizing="md"
            />
            <p className="text-sm text-red-700 mt-2">
              {errors.confirmNewPassword &&
                (errors.confirmNewPassword.message as string)}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="text-sm border-2 px-4 py-2 rounded-md duration-200 hover:border-primary flex items-center gap-4"
          >
            Lưu
          </button>
        </div>

        <p className="text-center text-red-500">{err !== "" && err}</p>
        {isSuccess && (
          <p className="text-center text-green-500">
            Thay đổi mật khẩu thành công
          </p>
        )}
      </form>

      {isLoading && (
        <div className="py-10 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
