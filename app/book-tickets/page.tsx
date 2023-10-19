"use client";
import { MoviePreview } from "@/components/book-tickets/MoviePreview";
import { OrderSummary } from "@/components/book-tickets/OrderSummary";
import { Seats, SeatStatusNotes } from "@/components/book-tickets/Seats";
import NavBar from "@/components/NavBar";
import Image from "@/node_modules/next/image";
import { useState } from "react";
import { generateMockRows, mockRows } from "./mock-seats";

export default function BookTickets() {
  return (
    <div>
      <NavBar />
      <div>
        <MoviePreview />

        <BookSeatSection />
      </div>
    </div>
  );
}

function BookSeatSection() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-9 p-4">
        <div className="wrapper m-auto">
          <div className="max-w-5xl m-auto">
            <ScreenSVG />
            <div className="text-center text-white">SCREEN 4</div>
            <Seats />
          </div>

          <SeatStatusNotes />
        </div>
      </div>
      <div className=" col-span-3  text-white min-h-[700px]">
        <OrderSummary />
      </div>
    </div>
  );
}

function ScreenSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 552 100" className="seat-map__screen-image">
      <g opacity="0.91" filter="url(#filter0_f_2284_34995)">
        <path
          d="M276.5 88.5347C375.116 88.5347 441 71.2976 441 50.0347C441 28.7717 375.116 11.5347 276.5 11.5347C177.884 11.5347 112 28.7717 112 50.0347C112 71.2976 177.884 88.5347 276.5 88.5347Z"
          fill="#F3EBE8"
        ></path>
      </g>
      <path d="M64 15H488V17H64V15Z" fill="white"></path>
      <path
        d="M91.6985 45H458.171L488 18H64L91.6985 45Z"
        fill="url(#paint0_linear_2284_34995)"
      ></path>
      <g filter="url(#filter1_i_2284_34995)">
        <path d="M91.6985 45H458.171L488 18H64L91.6985 45Z" fill="#D8D8D8"></path>
      </g>
      <g opacity="0.95" filter="url(#filter2_f_2284_34995)">
        <path
          d="M92.7306 45H457.151L508 75H44L92.7306 45Z"
          fill="url(#paint1_linear_2284_34995)"
        ></path>
      </g>
      <g opacity="0.65" filter="url(#filter3_f_2284_34995)">
        <path
          d="M92.9807 45H456.903L550 75H2L92.9807 45Z"
          fill="url(#paint2_linear_2284_34995)"
        ></path>
      </g>
      <g filter="url(#filter4_f_2284_34995)">
        <path
          d="M92.5678 45H457.312L487 75H65L92.5678 45Z"
          fill="url(#paint3_linear_2284_34995)"
        ></path>
      </g>
      <path
        opacity="0.69933"
        d="M149 45.5347V44.5347H402V45.5347H149Z"
        fill="url(#paint4_linear_2284_34995)"
      ></path>
      <defs>
        <filter
          id="filter1_i_2284_34995"
          x="64"
          y="17"
          width="424"
          height="28"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          ></feColorMatrix>
          <feOffset dy="-1"></feOffset>
          <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0681612 0"
          ></feColorMatrix>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2284_34995"></feBlend>
        </filter>
        <filter
          id="filter2_f_2284_34995"
          x="42.9"
          y="43.9"
          width="466.2"
          height="32.2"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="0.55"
            result="effect1_foregroundBlur_2284_34995"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter3_f_2284_34995"
          x="0.9"
          y="43.9"
          width="550.2"
          height="32.2"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="0.55"
            result="effect1_foregroundBlur_2284_34995"
          ></feGaussianBlur>
        </filter>
        <filter
          id="filter4_f_2284_34995"
          x="63.9"
          y="43.9"
          width="424.2"
          height="32.2"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="0.55"
            result="effect1_foregroundBlur_2284_34995"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear_2284_34995"
          x1="276"
          y1="45"
          x2="276"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#9C9898"></stop>
          <stop offset="1" stop-color="#D0CCCB"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_2284_34995"
          x1="276"
          y1="75"
          x2="276"
          y2="45.8095"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D3D0D0" stop-opacity="0"></stop>
          <stop offset="1" stop-color="#C5C1C0" stop-opacity="0.340636"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_2284_34995"
          x1="276"
          y1="75"
          x2="276"
          y2="45.8095"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D3D0D0" stop-opacity="0"></stop>
          <stop offset="1" stop-color="#C5C1C0" stop-opacity="0.340636"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
