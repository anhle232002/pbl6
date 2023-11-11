"use client";
import { Spinner } from "flowbite-react";

export default function PageLoading() {
  return (
    <main>
      <div className="h-screen w-screen bg-background flex items-center justify-center">
        <Spinner aria-label="Default status example" />{" "}
      </div>
    </main>
  );
}
