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
      className="flex items-center justify-center w-full max-w-[90%] mx-auto p-6 bg-[#1f1f1f] rounded-2xl shadow-lg gap-6"
    >
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Ask anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#2a2a2a] text-white placeholder-gray-400 px-6 py-4 rounded-xl border-none outline-none transition-all duration-300 hover:bg-[#333] focus:bg-[#2a2a2a] text-base"
        />
      </div>
      <button
        type="submit"
        disabled={!searchQuery.trim()}
        className="min-w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <SearchIcon className="w-6 h-6" />
      </button>
    </form>
  );
}

export default Search;
