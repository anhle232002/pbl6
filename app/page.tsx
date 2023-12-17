"use client";
import NavBar from "@/components/NavBar";
import MovieCarousel from "@/components/MovieCarousel";
import NavigateToWhatsOn from "@/components/NavigateToCinema";
import AppFooter from "@/components/Footer";
import Trailers from "@/components/Trailers";
import BottomBar from "@/components/BottomBar";
import MovieCards from "@/components/MovieCards";
import { Tabs } from "flowbite-react";
export default function Home() {
  return (
    <div className={`relative min-h-screen bg-background text-accent pb-36`}>
      <NavBar />

      <MovieCarousel />

      <div className="mt-8 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-10">
          <MovieCards />
        </div>
      </div>

      <div className="mt-20 md:px-0 px-8">
        <div className="max-w-6xl m-auto">
          <h4 className="relative text-2xl text-black before:absolute before:w-1 before:h-full before:bg-primary before:rounded-full">
            <span className="ml-4  uppercase">Trailer nổi bật</span>
          </h4>
        </div>

        <div className="mt-10 ">
          <Trailers />
        </div>
      </div>

      <div className="mt-10 border-t border-b border-accent p-4">
        <h4 className="text-center text-3xl text-black">Dịch vụ khách hàng</h4>
        <p className="text-center mt-4">
          Để liên hệ, vui lòng truy cập trang FAQs & Liên hệ chúng tôi. Đội ngũ
          dịch vụ khách hàng của chúng tôi sẽ sẵn sàng hỗ trợ bạn từ 9 giờ sáng
          đến 7 giờ tối hàng ngày.{" "}
        </p>
      </div>

      <AppFooter></AppFooter>

      <BottomBar />
    </div>
  );
}
