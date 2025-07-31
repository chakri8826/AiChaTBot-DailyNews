import React, { useState, useEffect } from 'react';
import api from '../config/api';

const CategoryContent = ({ category }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.post('/search/search', { category });
        if (data.success) {
          setContent(data);
        } else {
          setError(data.error || 'Failed to fetch content');
        }
      } catch (err) {
        console.error('Category content error:', err);
        setError(err.response?.data?.error || 'An error occurred while fetching content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center p-16">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-8 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-12">
      {content && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4 capitalize text-gray-900 dark:text-white">
            {category}
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.data}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryContent; 