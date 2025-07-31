import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? theme.colors.background : theme.colors.background;
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#121212' : '#F0F2F5',
      card: isDarkMode ? '#1E1E2F' : '#FFFFFF',
      primary: isDarkMode ? '#FFFFFF' : '#24292F',
      secondary: isDarkMode ? '#B0B0B0' : '#57606A',
      accent: isDarkMode ? '#4F46E5' : '#007bff',
      buttonPrimaryBg: isDarkMode ? '#4F46E5' : '#007bff',
      buttonPrimaryText: '#FFFFFF',
      buttonSecondaryBg: isDarkMode ? '#23232D' : '#E0E0E0',
      buttonSecondaryText: isDarkMode ? '#FFFFFF' : '#24292F',
      border: isDarkMode ? '#30363D' : '#D0D7DE',
      hover: isDarkMode ? '#28283C' : '#F3F4F6',
      shadow: isDarkMode ? '0 4px 10px rgba(0, 0, 0, 0.4)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
      inputBg: isDarkMode ? '#23232D' : '#FFFFFF',
      inputText: isDarkMode ? '#FFFFFF' : '#24292F',
      inputPlaceholder: isDarkMode ? '#B0B0B0' : '#57606A',
      overlayCardBackground: isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1rem',
      full: '9999px',
    },
    transition: {
      default: 'all 0.3s ease-in-out',
      fast: 'all 0.15s ease-in-out',
      slow: 'all 0.45s ease-in-out',
    },
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 