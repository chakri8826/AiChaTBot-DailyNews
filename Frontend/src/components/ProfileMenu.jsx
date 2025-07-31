import React, { useState } from 'react';
import { FaUser, FaCog, FaSignOutAlt, FaMoon, FaSun, FaHistory, FaBookmark, FaBell } from 'react-icons/fa';

const ProfileMenu = ({ isDarkMode, onToggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FaUser />, label: 'Account', path: '/account' },
    { icon: <FaHistory />, label: 'History', path: '/history' },
    { icon: <FaBookmark />, label: 'Saved', path: '/saved' },
    { icon: <FaBell />, label: 'Notifications', path: '/notifications' },
    { icon: <FaCog />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-primary"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-primary"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-gray-500 dark:text-gray-400">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onToggleDarkMode}
              className="flex items-center space-x-3 w-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded px-2 py-1"
            >
              <span className="text-gray-500 dark:text-gray-400">
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </span>
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center space-x-3 w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded px-2 py-1">
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu; 