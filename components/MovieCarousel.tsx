"use client";
import { Carousel } from "flowbite-react";
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function App() {
  const slides = [
    {
      url: "/images/anh1.jpg",
    },
    {
      url: "/images/anh2.jpg",
    },
    {
      url: "/images/anh3.jpg",
    },
  ];

  return (
    <div className="h-[630px] relative">
      <Carousel>
        <img alt="..." src="images/anh1.jpg" />
        <img alt="..." src="images/anh2.jpg" />
        <img alt="..." src="images/anh2.jpg" />
        <img alt="..." src="images/anh2.jpg" />
        <img alt="..." src="images/anh2.jpg" />
        <img alt="..." src="images/anh2.jpg" />
      </Carousel>

      <div className="absolute top-0 left-0  w-full h-full bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}

export default App;
