import React, { useState } from "react";
import {
  LayoutList,
  CalendarDays,
  Inbox,
  ClipboardList,
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
        <span className="text-sm text-gray-500">{count}</span>
      )}
    </a>
  </li>
);

const ToDoSidebar = () => {
  const [addListColor, setAddListColor] = useState("#6a7282");

  return (
    <nav className="lg:w-64 lg:flex-shrink-0 lg:h-screen lg:sticky lg:top-0 lg:left-0 fixed bottom-0 right-0 z-10" >
      <div className="h-full p-3 flex lg:flex-col flex-row lg:gap-6 gap-4 overflow-x-auto lg:overflow-y-auto border-r border-[#282828]">
        {/* Main Navigation */}
        <ul className="space-y-1 lg:w-full flex lg:flex-col flex-row lg:gap-0 gap-4">
          <NavItem icon={<LayoutList size={20} />} label="All" count={9} />
          <NavItem icon={<CalendarDays size={20} />} label="Today" count={5} />
          <NavItem icon={<CalendarClock size={20} />} label="Next 7 Days" count={9} />
          <NavItem icon={<Inbox size={20} />} label="Inbox" />
          <NavItem icon={<ClipboardList size={20} />} label="Summary" />
        </ul>

        {/* Divider */}
        <div className="w-full h-px bg-[#282828]" />

        {/* Lists Section */}
        <div className="lg:w-full">
          <div className="flex items-center justify-between py-2 px-3 hover:bg-[#232323] rounded-lg mb-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider lg:block hidden">
              Lists
            </h3>
            <div className="hover:bg-[#2f2f2f] rounded-sm cursor-pointer"
                onMouseOver={() => setAddListColor("#fff")}
                onMouseOut={() => setAddListColor("#6a7282")}
            >
              <Plus size={18} color={addListColor} />
            </div>
          </div>
          <ul className="space-y-1 lg:w-full flex lg:flex-col flex-row lg:gap-0 gap-4">
            <NavItem
              icon={<User size={20} className="text-red-500" />}
              label="Personal"
            />
            <NavItem
              icon={<Heart size={20} className="text-yellow-500" />}
              label="Health"
              count={1}
            />
            <NavItem
              icon={<GraduationCap size={20} className="text-blue-500" />}
              label="University"
              count={5}
            />
            <NavItem
              icon={<CalendarClock size={20} className="text-green-500" />}
              label="Monthly Tasks"
              count={3}
            />
          </ul>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#282828]" />

        {/* Bottom Items */}
        <ul className="lg:mt-auto space-y-1 lg:w-full flex lg:flex-col flex-row lg:gap-0 gap-4">
          <NavItem icon={<CheckSquare size={20} />} label="Completed" />
          <NavItem icon={<Trash2 size={20} />} label="Trash" />
          <NavItem icon={<HelpCircle size={20} />} label="Help" />
          <NavItem icon={<Bell size={20} />} label="Notifications" />
        </ul>
      </div>
    </nav>
  );
};

export default ToDoSidebar;
