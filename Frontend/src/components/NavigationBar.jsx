import React from 'react';
import avatar from '../assets/avatar-659651_640.png'

export default function NavigationBar() {
    return (
        <div className="py-3 lg:flex-shrink-0 lg:h-screen lg:sticky lg:top-0 lg:left-0 bg-[#242424]
                        flex lg:flex-col flex-row justify-between items-center border-r border-[#2e2d2d]">
            {/* Top group => Profile pic, Dashboard Icon, To-Do List Icon, Kanban Board Icon */}
            <div className="flex lg:flex-col flex-row justify-between items-center">
                <div className="h-12 w-12 rounded-full cursor-pointer">
                    <img src={avatar} alt="PP" />
                </div>
            </div>

            {/* Bottom group => Notification Icon, More Icon */}
            <div className="flex lg:flex-col flex-row justify-between items-center border border-amber-50 h-[150px] w-10 mb-5">

            </div>
        </div>
    )
}
