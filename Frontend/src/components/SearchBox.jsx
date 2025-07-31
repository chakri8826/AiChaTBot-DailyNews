import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const SearchBox = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          className={`w-full px-6 py-4 text-lg rounded-full
            focus:outline-none focus:ring-2 focus:ring-[${theme.colors.accent}] focus:border-transparent
            transition-all ${theme.transition.default}`}
          style={{
            backgroundColor: theme.colors.inputBg,
            color: theme.colors.inputText,
            borderColor: theme.colors.border,
            borderWidth: '1px',
            borderRadius: theme.borderRadius.full,
            boxShadow: theme.colors.shadow,
            fontSize: theme.fontSize.lg,
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading || !query.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center
            ${isLoading || !query.trim()
              ? 'opacity-50 cursor-not-allowed'
              : ''
            }
            transition-all ${theme.transition.default}`}
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.buttonPrimaryText,
            borderRadius: theme.borderRadius.full,
            boxShadow: theme.colors.shadow,
          }}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBox;