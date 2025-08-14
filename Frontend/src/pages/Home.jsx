import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const theme = useTheme();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-in-out"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-bold mb-4 sm:mb-6 lg:mb-8 responsive-heading leading-tight"
        style={{
          color: theme.colors.primary,
        }}
      >
        Welcome to Tech World
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-medium mb-6 sm:mb-8 lg:mb-10 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl px-2 sm:px-4 responsive-text leading-relaxed"
        style={{
          color: theme.colors.secondary,
        }}
      >
        Your ultimate knowledge hub. Ask anything, explore, and organize your insights.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold hover:shadow-lg transition-all duration-300 ease-in-out text-sm sm:text-base lg:text-lg w-full max-w-xs sm:max-w-sm md:max-w-md"
        style={{
          backgroundColor: theme.colors.accent,
          color: theme.colors.buttonPrimaryText,
          borderRadius: theme.borderRadius.full,
          boxShadow: theme.colors.shadow,
        }}
        onClick={() => window.location.href = '/login'}
      >
        Start Exploring
      </motion.button>
    </div>
  );
};

export default Home; 