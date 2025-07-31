import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const theme = useTheme();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ease-in-out"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-bold mb-6"
        style={{
          fontSize: theme.fontSize['5xl'],
          color: theme.colors.primary,
        }}
      >
        Welcome to Tech World
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-medium mb-8 max-w-2xl"
        style={{
          fontSize: theme.fontSize.xl,
          color: theme.colors.secondary,
        }}
      >
        Your ultimate knowledge hub. Ask anything, explore, and organize your insights.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: theme.colors.accent,
          color: theme.colors.buttonPrimaryText,
          fontSize: theme.fontSize.lg,
          borderRadius: theme.borderRadius.full,
          boxShadow: theme.colors.shadow,
        }}
        onClick={() => window.location.href = '/login'} // Example navigation
      >
        Start Exploring
      </motion.button>
    </div>
  );
};

export default Home; 