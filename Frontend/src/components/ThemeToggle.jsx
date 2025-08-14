import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 p-3 sm:p-4 rounded-full bg-white dark:bg-dark-card shadow-lg hover:shadow-xl transition-shadow duration-200 z-50"
    >
      {isDarkMode ? (
        <FaSun className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
      ) : (
        <FaMoon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      )}
    </motion.button>
  );
};

export default ThemeToggle; 