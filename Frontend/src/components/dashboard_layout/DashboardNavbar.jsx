import React from 'react';
import { Bell, Menu, X, LogOut } from 'lucide-react';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: 'New task assigned',
      message: 'You have been assigned a new project task',
      read: false,
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Meeting reminder',
      message: 'Team sync meeting in 15 minutes',
      read: false,
      time: '30 minutes ago'
    },
    {
      id: 3,
      title: 'System update',
      message: 'New features available in dashboard',
      read: true,
      time: '1 day ago'
    }
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const hasUnread = unreadNotifications > 0;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/';
  };

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
          {/* Notifications dropdown */}
          <div className="relative">
            <button
              className="relative p-2 text-gray-400 hover:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <span className="sr-only">View notifications</span>
              <Bell size={20} />
              {hasUnread && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1a1a1a] border border-[#2e2d2d] rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-[#2e2d2d] flex justify-between items-center">
                  <h3 className="text-white font-medium">Notifications</h3>
                  {hasUnread && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">No notifications</div>
                  ) : (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-[#2e2d2d] ${!notification.read ? 'bg-[#1e1e1e]' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">{notification.title}</h4>
                            <p className="text-gray-400 text-sm">{notification.message}</p>
                            <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-400 hover:text-blue-300"
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left mx-2 p-2 rounded-xl text-gray-400 hover:bg-[#2e2d2d] hover:text-white flex items-center"
          >
            <LogOut className='text-red-500' size={20} />
          </button>
          {/* User dropdown */}
          <div className="ml-4 relative flex-shrink-0">
            <div className="group relative">
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium cursor-pointer">
                JS
              </div>
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
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-gray-400 hover:bg-[#2e2d2d] hover:text-white flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;