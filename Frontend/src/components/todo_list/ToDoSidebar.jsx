import React, { useState } from "react";
import {
  LayoutList,
  CalendarDays,
  User,
  Heart,
  GraduationCap,
  CalendarClock,
  CheckSquare,
  Trash2,
  HelpCircle,
  Bell,
  Plus,
} from "lucide-react";

const NavItem = ({ icon, label, count, color = "text-white" }) => (
  <li className="group">
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 hover:bg-[#232323] rounded-lg ${color}`}
    >
      {icon}
      <span className="flex-grow font-normal text-[14px]">{label}</span>
      {count !== undefined && (
        <span className="text-sm text-[#a7a7a7]">{count}</span>
      )}
    </a>
  </li>
);

const ToDoSidebar = () => {
  return (
    <nav className="lg:w-64 lg:flex-shrink-0 lg:h-screen lg:sticky lg:top-0 lg:left-0 fixed bottom-0 right-0 z-10" >
      <div className="h-full p-3 flex lg:flex-col flex-row lg:gap-6 gap-4 overflow-x-auto lg:overflow-y-auto border-r border-[#282828]">
        {/* Main Navigation */}
        <ul className="space-y-1 lg:w-full flex lg:flex-col flex-row lg:gap-0 gap-4">
          <NavItem icon={<LayoutList size={20} color="#a7a7a7" />} label="All" count={9} />
          <NavItem icon={<CalendarDays size={20} color="#a7a7a7" />} label="Today" count={5} />
          <NavItem icon={<CalendarClock size={20} color="#a7a7a7" />} label="Next 7 Days" count={9} />
        </ul>

        {/* Divider */}
        <div className="w-full h-px bg-[#282828]" />

        {/* Bottom Items */}
        <ul className="lg:mt-auto space-y-1 lg:w-full flex lg:flex-col flex-row lg:gap-0 gap-4">
          <NavItem icon={<CheckSquare size={20} color="#a7a7a7" />} label="Completed" />
          <NavItem icon={<Trash2 size={20} color="#a7a7a7" />} label="Trash" />
          <NavItem icon={<HelpCircle size={20} color="#a7a7a7" />} label="Help" />
          <NavItem icon={<Bell size={20} color="#a7a7a7" />} label="Notifications" />
        </ul>
      </div>
    </nav>
  );
};

export default ToDoSidebar;
