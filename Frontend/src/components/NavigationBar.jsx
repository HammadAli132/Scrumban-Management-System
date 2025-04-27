import React from 'react';
import avatar from '../assets/avatar-659651_640.png';
import { BellDot, CircleEllipsis, Kanban, LayoutDashboard, ListTodo, FolderGit2, PanelsTopLeft } from 'lucide-react';
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
    const { projectid } = useParams();
    const projectIdState = useLocation().state?.projectId || null;

    const location = useLocation();
    React.useEffect(() => {
        const currentPath = location.pathname;
        let iconIndex = 0;
        if (currentPath.includes('/to-do-list')) {
            iconIndex = 1;
        } else if (currentPath.includes('/project')) {
            if (currentPath.includes('/kanban')) {
                iconIndex = 3;
            } else if (currentPath.includes('/repository')) {
                iconIndex = 4;
            } else {
                iconIndex = 2; // Default to overview if no specific route is matched
            }
        }
        else if (currentPath.includes('/notifications')) {
            iconIndex = 5;
        } else if (currentPath.includes('/about-us')) {
            iconIndex = 6;
        }
        setActiveIcon(iconIndex);
    }, [location.pathname]);

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
                    state={{ projectId: projectid }}
                    className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                    onClick={() => setActiveIcon(1)}
                >
                    <ListTodo size={25} color={activeIcon === 1 ? '#fff' : '#a7a7a7'} />
                </Link>

                {/* Overview Icon (conditionally shown) */}
                {(projectid || projectIdState) && (
                    <Link
                        to={`/project/${(projectid || projectIdState)}`}
                        className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                        onClick={() => setActiveIcon(2)}
                    >
                        <PanelsTopLeft size={25} color={activeIcon === 2 ? '#fff' : '#a7a7a7'} />
                    </Link>
                )}
                {/* Kanban Icon (conditionally shown) */}
                {(projectid || projectIdState) && (
                    <Link
                        to={`/project/${(projectid || projectIdState)}/kanban/2`}
                        className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                        onClick={() => setActiveIcon(3)}
                    >
                        <Kanban size={25} color={activeIcon === 3 ? '#fff' : '#a7a7a7'} />
                    </Link>
                )}
                {/* Repository Icon (conditionally shown) */}
                {(projectid || projectIdState) && (
                    <Link
                        to={`/project/${(projectid || projectIdState)}/repository/2`}
                        className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                        onClick={() => setActiveIcon(4)}
                    >
                        <FolderGit2 size={25} color={activeIcon === 4 ? '#fff' : '#a7a7a7'} />
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
                        onClick={() => setActiveIcon(index + 5)}
                    >
                        <Icon size={25} color={activeIcon === (index + 5) ? '#fff' : '#a7a7a7'} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
