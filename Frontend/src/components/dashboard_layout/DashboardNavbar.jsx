import React from 'react';
import { Bell, Menu, X } from 'lucide-react';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-[#141414] border-b border-[#2e2d2d] py-3 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="ml-2 md:ml-0">
            <span className="text-gray-400 text-sm">Today</span>
            <h2 className="text-white font-semibold leading-tight">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center">
          <button className="relative p-2 text-gray-400 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            <span className="sr-only">View notifications</span>
            <Bell size={20} />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="ml-4 relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium cursor-pointer">
              JS
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 py-3 bg-[#1a1a1a] rounded-lg">
          <ul className="space-y-1 px-2">
            <li>
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-white bg-blue-600"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/tasks"
                className="block px-3 py-2 rounded-md text-gray-400 hover:bg-[#2e2d2d] hover:text-white"
              >
                Tasks
              </a>
            </li>
            <li>
              <a
                href="/projects"
                className="block px-3 py-2 rounded-md text-gray-400 hover:bg-[#2e2d2d] hover:text-white"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="/team"
                className="block px-3 py-2 rounded-md text-gray-400 hover:bg-[#2e2d2d] hover:text-white"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block px-3 py-2 rounded-md text-gray-400 hover:bg-[#2e2d2d] hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;