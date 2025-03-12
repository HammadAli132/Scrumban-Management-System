import React from "react";
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
} from "lucide-react";

const NavItem = ({ icon, label, count, color = "text-gray-700" }) => (
  <li className="group">
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg ${color}`}
    >
      {icon}
      <span className="flex-grow">{label}</span>
      {count !== undefined && (
        <span className="text-sm text-gray-500">{count}</span>
      )}
    </a>
  </li>
);

const ToDoSidebar = () => {
  return (
    <nav
      className="lg:w-64 lg:flex-shrink-0 bg-white lg:h-screen lg:sticky lg:top-0 lg:left-0 
                    fixed bottom-0 left-0 right-0 lg:relative z-10"
    >
      <div className="h-full p-4 flex lg:flex-col flex-row lg:gap-6 gap-4 overflow-x-auto lg:overflow-y-auto">
        {/* Main Navigation */}
        <ul className="space-y-1 lg:w-full flex lg:flex-col flex-row lg:gap-0 gap-4">
          <NavItem icon={<LayoutList size={20} />} label="All" count={9} />
          <NavItem icon={<CalendarDays size={20} />} label="Today" count={5} />
          <NavItem
            icon={<CalendarClock size={20} />}
            label="Next 7 Days"
            count={9}
          />
          <NavItem icon={<Inbox size={20} />} label="Inbox" />
          <NavItem icon={<ClipboardList size={20} />} label="Summary" />
        </ul>

        {/* Lists Section */}
        <div className="lg:w-full">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 lg:block hidden">
            Lists
          </h3>
          <ul className="space-y-1 lg:w-full flex lg:flex-col flex-row lg:gap-0 gap-4">
            <NavItem
              icon={<User size={20} className="text-red-500" />}
              label="Personal"
              color="text-red-500"
            />
            <NavItem
              icon={<Heart size={20} className="text-yellow-500" />}
              label="Health"
              count={1}
              color="text-yellow-500"
            />
            <NavItem
              icon={<GraduationCap size={20} className="text-blue-500" />}
              label="University"
              count={5}
              color="text-blue-500"
            />
            <NavItem
              icon={<CalendarClock size={20} className="text-green-500" />}
              label="Monthly Tasks"
              count={3}
              color="text-green-500"
            />
          </ul>
        </div>

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
