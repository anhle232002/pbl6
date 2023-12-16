"use client";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { Footer } from "flowbite-react";

export default function AppFooter() {
  return (
    <Footer container className="bg-[#333]  p-4  pt-6 rounded-none">
      <div className="w-full m-0">
        <div className="grid max-w-7xl m-auto justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 py-10 ">
          <div>
            <div className="font-bold text-4xl text-primary">Cinephile</div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Về chúng tôi" className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link className="text-white" href="#">
                  Cinephile
                </Footer.Link>
                <Footer.Link className="text-white" href="#">
                  Rạp chiếu
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Theo dõi" className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-white">
                  Facebook
                </Footer.Link>
                <Footer.Link href="#" className="text-white">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Quy định" className="text-white" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-white">
                  Chính sách riêng tư
                </Footer.Link>
                <Footer.Link href="#" className="text-white">
                  Điều khoản và điều kiện
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div className="w-full sm:flex sm:items-center sm:justify-between border-t border-accent pt-6 px-10">
          <Footer.Copyright href="#" by="Cinephile™" year={2023} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
