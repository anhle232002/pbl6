import { Dropdown, Navbar, Avatar } from "flowbite-react";
import Image from "next/image";
import { PiFilmReelBold } from "react-icons/pi";

export default function NavBar() {
  return (
    <Navbar
      fluid
      rounded
      className="sticky top-0 z-10 rounded-none bg-slate-900"
    >
      <Navbar.Brand href="/">
        <PiFilmReelBold className="h-10 w-10 text-white" />
        <span className="self-center whitespace-nowrap pl-3 text-xl font-semibold text-white">
          Cinema
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 text-white">
        <Dropdown
          inline
          label={<h1>Hello, Quy</h1>}
          className="bg-slate-900 border-current"
        >
          <Dropdown.Header>
            <span className="block text-sm text-white">Phan Phu Quy</span>
            <span className="block truncate text-sm font-medium text-white">
              quy@gmail.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item className="text-white">Details</Dropdown.Item>
          <Dropdown.Item className="text-white">Manage</Dropdown.Item>

          <Dropdown.Divider />
          <Dropdown.Item className="text-white">Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse></Navbar.Collapse>
    </Navbar>
  );
}
