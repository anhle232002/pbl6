"use client";

import Image from "@/node_modules/next/image";
import { useState } from "react";

export default function AccountSetting() {
  const [editting, setEditting] = useState<boolean>(false);

  const onClickEdit = () => {
    setEditting(!editting);
  };

  return (
    <div className="bg-black">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-wide">Account Details</h3>
        <div onClick={onClickEdit} role="button">
          <span>Edit</span>
        </div>
      </div>
      <hr className="mt-2" />

      <div className="grid grid-cols-12 mt-8 px-2 space-y-4">
        <div className="col-span-7 text-xl space-y-8">
          <div className="flex items-center gap-10">
            <div className="opacity-60 min-w-[150px]">Email</div>
            <div>
              {editting ? (
                <input
                  type="text"
                  placeholder="test@gmail.com"
                  className="bg-transparent rounded-md"
                />
              ) : (
                <p>test@gmail.com</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="opacity-60 min-w-[150px]">Full Name</div>
            <div>
              {editting ? (
                <input
                  type="text"
                  placeholder="test@gmail.com"
                  className="bg-transparent rounded-md"
                />
              ) : (
                <p>John Doe</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="opacity-60 min-w-[150px]">Phone number</div>
            <div>
              {editting ? (
                <input
                  type="text"
                  placeholder="test@gmail.com"
                  className="bg-transparent rounded-md"
                />
              ) : (
                <p>0123923857</p>
              )}
            </div>
          </div>{" "}
          <div className="flex items-center gap-10">
            <div className="opacity-60 min-w-[150px]">Address</div>
            <div>
              {editting ? (
                <input
                  type="text"
                  placeholder="test@gmail.com"
                  className="bg-transparent rounded-md"
                />
              ) : (
                <p>Da Nang</p>
              )}
            </div>
          </div>{" "}
          <div className="flex items-center gap-10">
            <div className="opacity-60 min-w-[150px]">Postcode</div>
            <div>
              {editting ? (
                <input
                  type="text"
                  placeholder="test@gmail.com"
                  className="bg-transparent rounded-md"
                />
              ) : (
                <p>55000</p>
              )}
            </div>
          </div>
          <div>
            <button className="text-sm border-2 px-4 py-2 rounded-md duration-200 hover:bg-slate-900 hover:border-slate-700">
              Save changes
            </button>
          </div>
        </div>
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
}
