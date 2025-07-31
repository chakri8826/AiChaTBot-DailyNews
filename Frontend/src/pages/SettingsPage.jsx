import React from 'react';
import { FaMoon, FaSun, FaBell, FaGlobe, FaShieldAlt } from 'react-icons/fa';

const SettingsPage = () => {
  const settings = [
    {
      title: 'Appearance',
      icon: <FaMoon />,
      items: [
        { label: 'Dark Mode', type: 'toggle' },
        { label: 'Font Size', type: 'select', options: ['Small', 'Medium', 'Large'] },
      ],
    },
    {
      title: 'Notifications',
      icon: <FaBell />,
      items: [
        { label: 'Push Notifications', type: 'toggle' },
        { label: 'Email Notifications', type: 'toggle' },
      ],
    },
    {
      title: 'Language',
      icon: <FaGlobe />,
      items: [
        { label: 'Interface Language', type: 'select', options: ['English', 'Spanish', 'French'] },
      ],
    },
    {
      title: 'Privacy',
      icon: <FaShieldAlt />,
      items: [
        { label: 'Search History', type: 'toggle' },
        { label: 'Data Collection', type: 'toggle' },
      ],
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-6">
        {settings.map((section) => (
          <div key={section.title} className="bg-white dark:bg-dark-card rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-primary">{section.icon}</span>
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                  {item.type === 'toggle' ? (
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
                      <span className="sr-only">Enable {item.label}</span>
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                    </button>
                  ) : (
                    <select className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800">
                      {item.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage; 