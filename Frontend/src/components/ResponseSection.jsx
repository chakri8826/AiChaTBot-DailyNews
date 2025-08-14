import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ResponseSection = ({ response, query, category }) => {
  const theme = useTheme();

  if (!response) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div
        className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8
          transition-all ${theme.transition.default}`}
        style={{
          backgroundColor: 'rgba(26, 26, 26, 0.9)',
          borderColor: theme.colors.border,
          borderWidth: '1px',
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.colors.shadow,
        }}
      >
        <h2
          className={`font-semibold mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl`}
          style={{
            color: theme.colors.accent,
          }}
        >
          {category ? `Latest ${category.charAt(0).toUpperCase() + category.slice(1)} Updates` : `Results for: ${query}`}
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {response.split('\n').map((paragraph, index) => (
            <p
              key={index}
              className={`leading-relaxed text-sm sm:text-base lg:text-lg`}
              style={{
                color: theme.colors.primary,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ResponseSection; 