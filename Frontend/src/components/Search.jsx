import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function Search({ onSearchSubmit, initialQuery }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const theme = useTheme();

  useEffect(() => {
    setSearchQuery(initialQuery || '');
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onSearchSubmit(searchQuery.trim());
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center w-full max-w-full mx-auto p-3 sm:p-4 lg:p-6 bg-[#1f1f1f] rounded-xl sm:rounded-2xl shadow-lg gap-3 sm:gap-4 lg:gap-6"
    >
      <div className="flex-1 relative w-full">
        <input
          type="text"
          placeholder="Ask anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#2a2a2a] text-white placeholder-gray-400 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-none outline-none transition-all duration-300 hover:bg-[#333] focus:bg-[#2a2a2a] text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={!searchQuery.trim()}
        className="w-full sm:w-auto min-w-12 h-12 sm:h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </form>
  );
}

export default Search;
