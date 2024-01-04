"use client";

import { useUser } from "@/hooks/useUser";
import Image from "@/node_modules/next/image";
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
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

export default function AccountSetting() {
  const { user } = useUser();
  const [customerInfo, setCustomerInfo] = useState<Customer>();
  const [isLoading, setIsLoading] = useState(true);
  const [openBeforeExitModal, setOpenBeforeExitModal] = useState(false);
  const formRef = useRef<any>(null);
  const [editting, setEditting] = useState<boolean>(false);
  const onClickEdit = () => {
    if (!editting) {
      setEditting(!editting);
    } else {
      if (formRef && formRef.current) {
        if (formRef.current.isChanged()) {
          setOpenBeforeExitModal(true);
        } else {
          setEditting(false);
        }
      }
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
          Thông tin tài khoản
        </h3>
        <div onClick={onClickEdit} role="button">
          <button className="text-sm px-4 py-2 bg-primary text-white rounded-lg font-semibold flex items-center">
            <RiEdit2Line className="mr-2 text-lg" />
            {!editting ? <span>Chỉnh sửa</span> : <span>Quay lại</span>}
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
                    <p>{customerInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="opacity-60 min-w-[150px]">Tên đầy đủ</div>
                  <div>
                    <p>{customerInfo.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="opacity-60 min-w-[150px]">Ngày sinh</div>
                  <div>
                    <p>
                      {new Date(customerInfo.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="opacity-60 min-w-[150px]">Số điện thoại</div>
                  <div>
                    <p>{customerInfo.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="opacity-60 min-w-[150px]">Địa chỉ</div>
                  <div>
                    <p>{customerInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {editting && customerInfo && (
            <EditingInformation ref={formRef} userInfo={customerInfo} />
          )}
        </>
      )}

      <Modal
        show={openBeforeExitModal}
        size="md"
        onClose={() => setOpenBeforeExitModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc chắn muốn dừng việc chỉnh sửa không? Tất cả các thay
              đổi sẽ bị mất.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenBeforeExitModal(false);
                  setEditting(false);
                }}
              >
                {"Chắc chắn"}
              </Button>
              <Button
                color="gray"
                onClick={() => setOpenBeforeExitModal(false)}
              >
                Không{" "}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        <div></div>
      </div>
    </div>
  );
}

const schema = Joi.object({
  name: Joi.string().min(5).required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  address: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  email: Joi.required(),
});

const EditingInformation = forwardRef(function EditComponent(
  { userInfo }: { userInfo: Customer },
  ref
) {
  const formRef = useRef(null);
  const [err, setErr] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      email: userInfo.email,
      name: userInfo.customerName,
      phoneNumber: userInfo.phoneNumber,
      address: userInfo.address,
      dateOfBirth: new Date(userInfo.dateOfBirth)
        .toISOString()
        .substring(0, 10),
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setIsUpdating(true);
      setErr("");
      await updateCustomer({
        id: user.userId,
        address: data.address,
        customerName: data.name,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        email: userInfo.email,
      });

      setIsUpdating(false);
      window.open("/profile", "_self");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        setErr(error.response?.data.messages[0] as string);
      }

      setIsUpdating(false);
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        isChanged() {
          return isDirty;
        },
      };
    },
    [isDirty]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 mt-8 space-y-6"
      ref={formRef}
    >
      <div className="grid grid-cols-12 items-center">
        <div className="mb-2 block col-span-2">
          <Label className="text-lg " htmlFor="small" value="Full Name" />
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
          <Label className="text-lg " htmlFor="address" value="Address" />
        </div>
        <TextInput
          {...register("address")}
          className="flex-1 col-span-10"
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

      <p className="text-center text-red-500">{err !== "" && err}</p>

      <div className="flex justify-end mt-8">
        <button className="text-sm border-2 px-4 py-2 rounded-md duration-200 hover:border-primary flex items-centerg gap-4">
          {isUpdating && <Spinner size={"sm"} className=""></Spinner>}
          <span>Save changes</span>
        </button>
      </div>
    </form>
  );
});
