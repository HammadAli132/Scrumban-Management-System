import React from 'react';
import avatar from '../assets/avatar-659651_640.png'
import { BellDot, CircleEllipsis, Kanban, LayoutDashboard, ListTodo } from 'lucide-react';
import { Link } from 'react-router-dom';

const Icons = [
    LayoutDashboard,
    ListTodo,
    Kanban,
    BellDot,
    CircleEllipsis
];

export default function NavigationBar() {
    const [activeIcon, setActiveIcon] = React.useState(0);

    return (
        <div className="py-3 lg:flex-shrink-0 lg:h-screen lg:sticky lg:top-0 lg:left-0 bg-[#242424]
                        flex lg:flex-col flex-row justify-between items-center border-r border-[#2e2d2d]">
            {/* Top group => Profile pic, Dashboard Icon, To-Do List Icon, Kanban Board Icon */}
            <div className="flex lg:flex-col flex-row justify-between items-center gap-5">
                <div className="h-12 w-12 rounded-full cursor-pointer">
                    <img src={avatar} alt="PP" />
                </div>
                {Icons.slice(0, 3).map((Icon, index) => (
                    <Link
                        key={index}
                        to={index === 0 ? '/' : index === 1 ? '/to-do-list' : '/kanban-board'}
                        className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                        onClick={() => setActiveIcon(index)}
                    >
                        <Icon size={25} color={activeIcon === index ? '#fff' : '#a7a7a7'} />
                    </Link>
                ))}

            </div>

            {/* Bottom group => Notification Icon, More Icon */}
            <div className="flex lg:flex-col flex-row justify-between items-center gap-5 mb-5">
                {Icons.slice(3).map((Icon, index) => (
                    <div key={index} className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1">
                        <Icon
                            size={25}
                            color={activeIcon === (index + 3) ? '#fff' : '#a7a7a7'}
                            onClick={() => setActiveIcon(index + 3)}
                        />  
                    </div>
                ))}
                {/* {Icons.slice(3).map((Icon, index) => (
                    <Link
                        key={index}
                        to={index === 0 ? '/notifications' : '/about-us'} // Change these paths as needed
                        className="cursor-pointer hover:bg-[#2f2f2f] rounded-lg p-1 flex items-center justify-center"
                        onClick={() => setActiveIcon(index + 3)}
                    >
                        <Icon size={25} color={activeIcon === (index + 3) ? '#fff' : '#a7a7a7'} />
                    </Link>
                ))} */}
            </div>
        </div>
    )
}
