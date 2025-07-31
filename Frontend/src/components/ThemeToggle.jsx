import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="fixed bottom-8 right-8 p-4 rounded-full bg-white dark:bg-dark-card shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      {isDarkMode ? (
        <FaSun className="w-6 h-6 text-yellow-500" />
      ) : (
        <FaMoon className="w-6 h-6 text-gray-700" />
      )}
    </motion.button>
  );
};

export default ThemeToggle; 