import React from 'react';
import avatar from '../assets/avatar-659651_640.png';
import { BellDot, CircleEllipsis, Kanban, LayoutDashboard, ListTodo } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Icons = [
    { icon: LayoutDashboard, route: '/' },
    { icon: ListTodo, route: '/to-do-list' },
    { icon: Kanban, route: '/kanban-board' }, // This one will be handled conditionally
    { icon: BellDot, route: '/notifications' },
    { icon: CircleEllipsis, route: '/about-us' },
];

export default function NavigationBar() {
    const [activeIcon, setActiveIcon] = React.useState(0);
    const { projectId } = useParams();
    const projectIdState = useLocation().state?.projectId || null;

    return (
        <div className="py-3 lg:flex-shrink-0 lg:h-screen lg:sticky lg:top-0 lg:left-0 bg-[#242424]
                        flex lg:flex-col flex-row justify-between items-center border-r border-[#2e2d2d]">
            {/* Top group => Avatar + 3 icons (conditionally 3rd) */}
            <div className="flex lg:flex-col flex-row justify-between items-center gap-5">
                <div className="h-12 w-12 rounded-full cursor-pointer">
                    <img src={avatar} alt="PP" />
                </div>

                {/* Dashboard Icon */}
                <Link
                    to="/"
                    className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                    onClick={() => setActiveIcon(0)}
                >
                    <LayoutDashboard size={25} color={activeIcon === 0 ? '#fff' : '#a7a7a7'} />
                </Link>

                {/* To-Do List Icon */}
                <Link
                    to="/to-do-list"
                    state={{ projectId: projectId }}
                    className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                    onClick={() => setActiveIcon(1)}
                >
                    <ListTodo size={25} color={activeIcon === 1 ? '#fff' : '#a7a7a7'} />
                </Link>

                {/* Kanban Icon (conditionally shown) */}
                {(projectId || projectIdState) && (
                    <Link
                        to={`/kanban-board/${(projectId || projectIdState)}`}
                        className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                        onClick={() => setActiveIcon(2)}
                    >
                        <Kanban size={25} color={activeIcon === 2 ? '#fff' : '#a7a7a7'} />
                    </Link>
                )}
            </div>

            {/* Bottom group => Notification & About */}
            <div className="flex lg:flex-col flex-row justify-between items-center gap-5 mb-5">
                {[BellDot, CircleEllipsis].map((Icon, index) => (
                    <Link
                        key={index}
                        to={index === 0 ? '/notifications' : '/about-us'}
                        className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                        onClick={() => setActiveIcon(index + 3)}
                    >
                        <Icon size={25} color={activeIcon === (index + 3) ? '#fff' : '#a7a7a7'} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
