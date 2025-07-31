import React, { useState } from 'react';
import Search from '../components/Search';
import ResponseSection from '../components/ResponseSection';  
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../config/api'; // Import the API
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const SearchPage = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state
  const { logout, isLoggingOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSearchSubmit = async (newQuery) => {
    setQuery(newQuery);
    setHasSearched(true);
    setLoading(true); // Set loading to true on search
    setError(''); // Clear previous errors
    setResponse(null); // Clear previous response

    try {
      const result = await api.post('/search', { query: newQuery });
      setResponse(result.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while searching.');
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <div
      className="fixed inset-0 min-h-screen w-screen flex flex-col justify-center text-white overflow-hidden"
      style={{
        backgroundImage: 'url("/images/earth_bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={async () => {
            await logout();
            navigate('/login'); 
          }}
          disabled={isLoggingOut}
          title="Logout"
          className="bg-gray-900 hover:bg-gray-700 rounded-full p-2 shadow transition-colors border border-gray-800"
        >
          <LogOut className="w-7 h-7 text-red-200" />
        </button>
      </div>

      {/* Main Content Area - Centered and Scrollable if results overflow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-4xl mx-auto p-2 overflow-y-auto hide-scrollbar"
      > 
        {!hasSearched ? (
          <>
            <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-6xl text-white drop-shadow-lg">
              Where Knowledge Begins
            </h1>
            <p className="text-center text-lg md:text-xl lg:text-2xl text-white opacity-80">
              Ask anything and get instant, accurate answers
            </p>
            <div className="w-full mx-auto max-w-4xl">
              <Search onSearchSubmit={handleSearchSubmit} initialQuery={query} />
            </div>
          </>
        ) : (
          <>
            <div className="w-full mx-auto max-w-4xl">
              <Search onSearchSubmit={handleSearchSubmit} initialQuery={query} />
            </div>
            <AnimatePresence mode="wait">
              {loading && (
                <div className="flex justify-center items-center py-12">
                <div 
                  className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: theme.colors.accent }}
                />
              </div>
              )}
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full text-center py-8 text-red-500"
                >
                  <p>{error}</p>
                </motion.div>
              )}
              {response && !loading && !error && (
                <motion.div
                  key="response"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full py-8"
                >
                  <ResponseSection response={response} query={query} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SearchPage;
