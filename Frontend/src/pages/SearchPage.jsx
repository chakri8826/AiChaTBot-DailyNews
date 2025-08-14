import React, { useState } from 'react';
import Search from '../components/Search';
import ResponseSection from '../components/ResponseSection';  
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../config/api';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const SearchPage = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { logout, isLoggingOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSearchSubmit = async (newQuery) => {
    setQuery(newQuery);
    setHasSearched(true);
    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const result = await api.post('/search', { query: newQuery });
      setResponse(result.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while searching.');
    } finally {
      setLoading(false);
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

      {/* Logout Button - Responsive positioning */}
      <div className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50">
        <button
          onClick={async () => {
            await logout();
            navigate('/login'); 
          }}
          disabled={isLoggingOut}
          title="Logout"
          className="bg-gray-900 hover:bg-gray-700 rounded-full p-2 sm:p-3 shadow transition-colors border border-gray-800"
        >
          <LogOut className="w-5 h-5 sm:w-7 sm:h-7 text-red-200" />
        </button>
      </div>

      {/* Main Content Area - Responsive and Scrollable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-4xl mx-auto p-2 sm:p-4 overflow-y-auto hide-scrollbar"
      > 
        {!hasSearched ? (
          <>
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-lg px-4 leading-tight">
              Where Knowledge Begins
            </h1>
            <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-white opacity-80 px-4 max-w-2xl sm:max-w-3xl lg:max-w-4xl">
              Ask anything and get instant, accurate answers
            </p>
            <div className="w-full mx-auto max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl px-2 sm:px-4">
              <Search onSearchSubmit={handleSearchSubmit} initialQuery={query} />
            </div>
          </>
        ) : (
          <>
            <div className="w-full mx-auto max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl px-2 sm:px-4">
              <Search onSearchSubmit={handleSearchSubmit} initialQuery={query} />
            </div>
            <AnimatePresence mode="wait">
              {loading && (
                <div className="flex justify-center items-center py-8 sm:py-12">
                  <div 
                    className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-t-transparent rounded-full animate-spin"
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
                  className="w-full text-center py-6 sm:py-8 text-red-500 px-4"
                >
                  <p className="text-sm sm:text-base">{error}</p>
                </motion.div>
              )}
              {response && !loading && !error && (
                <motion.div
                  key="response"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full py-6 sm:py-8 px-2 sm:px-4"
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
