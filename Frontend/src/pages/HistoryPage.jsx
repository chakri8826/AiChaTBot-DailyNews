import React from 'react';
import { FaSearch, FaClock, FaTrash } from 'react-icons/fa';

const HistoryPage = () => {
  const historyItems = [
    {
      id: 1,
      query: 'What is artificial intelligence?',
      timestamp: '2024-02-20T10:30:00',
    },
    {
      id: 2,
      query: 'How does quantum computing work?',
      timestamp: '2024-02-19T15:45:00',
    },
    {
      id: 3,
      query: 'Best practices for React development',
      timestamp: '2024-02-18T09:15:00',
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Search History</h1>
        <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
          <FaTrash />
          <span>Clear History</span>
        </button>
      </div>
      <div className="space-y-4">
        {historyItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-dark-card rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="text-primary text-xl mt-1">
                  <FaSearch />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.query}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <FaClock className="w-3 h-3" />
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage; 