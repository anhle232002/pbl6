"use client";

import { useUser } from "@/hooks/useUser";
import Image from "@/node_modules/next/image";
import { getCustomer } from "@/services/getCustomer";
import updateCustomer from "@/services/updateCustomer";
import { Customer } from "@/types/Customer";
import { joiResolver } from "@hookform/resolvers/joi";
import { AxiosError } from "axios";
import { Datepicker, Label, Spinner, TextInput } from "flowbite-react";
import Joi from "joi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiEdit2Line } from "react-icons/ri";

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  address: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
});


export default function AccountSetting() {
  const router = useRouter();
  const { user } = useUser();
  const [customerInfo, setCustomerInfo] = useState<Customer>();
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [editting, setEditting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onClickEdit = () => {
    setEditting(!editting);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsUpdating(true);
      await updateCustomer({
        id: user.userId,
        address: data.address,
        customerName: data.name,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
      });

      setIsUpdating(false);
      router.replace("/profile");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        setErr(error.response?.data.messages[0] as string);
      }

      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      getCustomer(Number(user.userId))
        .then((data) => setCustomerInfo(data.data))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return (
    <div className="bg-white p-10 text-black rounded-lg overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold tracking-wide font-[isonorm]">
          Account Details
        </h3>
        <div onClick={onClickEdit} role="button">
          <button className="text-sm px-4 py-2 bg-primary text-white rounded-lg font-semibold flex items-center">
            <RiEdit2Line className="mr-2 text-lg" />
            <span>Edit</span>
          </button>
        </div>
      </div>
      <hr className="mt-2" />

      {isLoading && (
        <div className="min-h-[300px] flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {!isLoading && user && customerInfo && (
        <>
          {!editting && (
            <div className="grid grid-cols-12 mt-8 px-2 space-y-4">
              <div className="col-span-7 text-xl space-y-8">
                <div className="flex items-center gap-10">
                  <div className="opacity-60 min-w-[150px]">Email</div>
                  <div>
                    <p>{user.employeeNo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="opacity-60 min-w-[150px]">Full Name</div>
                  <div>
                    <p>{customerInfo.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="opacity-60 min-w-[150px]">Phone number</div>
                  <div>
                    <p>{customerInfo.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="opacity-60 min-w-[150px]">Address</div>
                  <div>
                    <p>{customerInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {editting && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 mt-8 space-y-6"
            >
              <div className="grid grid-cols-12 items-center">
                <div className="mb-2 block col-span-2">
                  <Label
                    className="text-lg "
                    htmlFor="small"
                    value="Full Name"
                  />
                </div>
                <TextInput
                  {...register("name")}
                  className="flex-1 col-span-10"
                  id="small"
                  type="text"
                  sizing="md"
                />
              </div>

              <div className="grid grid-cols-12 items-center">
                <div className="mb-2 block col-span-2">
                  <Label
                    className="text-lg "
                    htmlFor="address"
                    value="Address"
                  />
                </div>
                <TextInput
                  {...register("address")}
                  className="flex-1 col-span-10"
                  id="addres"
                  type="text"
                  sizing="md"
                />
              </div>

              <div className="grid grid-cols-12 items-center">
                <div className="mb-2 block col-span-2">
                  <Label className="text-lg" value="Date of birth" />
                </div>
                <div className="col-span-10">
                  <input
                    {...register("dateOfBirth")}
                    type="date"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Da Nang"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 items-center">
                <div className="mb-2 block col-span-2">
                  <Label
                    className="text-lg w-[150px]"
                    htmlFor="phoneNumber"
                    value="Phone number"
                  />
                </div>
                <TextInput
                  {...register("phoneNumber")}
                  className="flex-1 col-span-10"
                  id="phoneNumber"
                  type="text"
                  sizing="md"
                />
              </div>

              <div className="flex justify-end mt-8">
                <button className="text-sm border-2 px-4 py-2 rounded-md duration-200 hover:border-primary">
                  Save changes
                </button>
              </div>
            </form>
          )}
        </>
      )}

      <div>
        <div></div>
      </div>
    </div>
  );
}
