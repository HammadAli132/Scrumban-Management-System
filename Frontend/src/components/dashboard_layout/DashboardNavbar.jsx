import React, { useEffect } from 'react';
import { Bell, Menu, X, LogOut } from 'lucide-react';
import axios from "axios"
import { useLocation } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL

function Navbar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(`${apiUrl}/reminders/${user.id}`);
        setNotifications(response.data.reminders);
      } catch (error) {
        console.error("Error fetching notifications:", error.response.data);
      }
    }

    getNotifications();
  }, [location.pathname])



  const unreadNotifications = notifications.filter(n => !n.read).length;
  const hasUnread = unreadNotifications > 0;

  const markAsRead = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/reminders/${id}`);
      if (response.status === 200) {
        setNotifications(notifications.filter(notification => notification._id !== id));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error.response.data);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/reminders/userreminders/${user.id}`);
      if (response.status === 200) {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error.response.data);
    }
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
                        key={notification._id}
                        className={`p-3 border-b border-[#2e2d2d] bg-[#1e1e1e]`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">{notification.title}</h4>
                            <p className="text-gray-400 text-sm">{notification.description}</p>
                            <p className="text-gray-500 text-xs mt-1">{notification.timestamp}</p>
                          </div>
                          <button
                            onClick={() => markAsRead(notification._id)}
                            className="text-xs text-blue-400 hover:text-blue-300"
                          >
                            Mark as read
                          </button>
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