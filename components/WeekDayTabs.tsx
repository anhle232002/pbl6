"use client";
import { CustomFlowbiteTheme, FlowbiteTabTheme, Tabs } from "flowbite-react";

export default function WeekDayTabs() {
  return (
    <div>
      <ul className="flex gap-4">
        <li>
          <Tab title="Today" isActive />
        </li>
        <li>
          <Tab title="Tomorrow" />
        </li>
        <li>
          <Tab title="Sun" />
        </li>
        <li>
          <Tab title="Mon" />
        </li>
        <li>
          <Tab title="Tue" />
        </li>

        <li>
          <Tab title="Wed" />
        </li>

        <li>
          <Tab title="Thu" />
        </li>
      </ul>
    </div>
  );
}

function Tab({ title, isActive = false }: { title: string; isActive?: boolean }) {
  return (
    <div
      role="button"
      className={`px-4 py-1 rounded-full text-sm hover:bg-primary/70 duration-150
    ${isActive ? "bg-primary-linear  text-black" : "text-white"} 
    `}
    >
      <span>{title}</span>
    </div>
  );
}
