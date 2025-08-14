import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch, FaCompass, FaHome, FaUser } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const BottomNav = () => {
  const theme = useTheme();

  const navItems = [
    { path: '/search', icon: <FaSearch />, label: 'Search' },
    { path: '/discover', icon: <FaCompass />, label: 'Discover' },
    { path: '/profile', icon: <FaUser />, label: 'Profile' },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 border-t
        transition-all ${theme.transition.default}
        opacity-0 translate-y-8 pointer-events-none
        group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
      `}
      style={{
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        boxShadow: theme.colors.shadow,
      }}
    >
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
        <div className="flex justify-around items-center h-14 sm:h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-all duration-300
                ${isActive
                  ? 'bg-opacity-80 bg-accent rounded-lg sm:rounded-xl shadow text-accent font-bold scale-105 sm:scale-110'
                  : 'text-secondary hover:bg-gray-100/10 hover:rounded-lg sm:hover:rounded-xl'}
                `
              }
              style={({ isActive }) => ({
                fontSize: theme.fontSize.sm,
                color: isActive ? theme.colors.accent : theme.colors.secondary,
                backgroundColor: isActive ? theme.colors.accent + '22' : 'transparent',
                borderRadius: isActive ? theme.borderRadius.lg : undefined,
                boxShadow: isActive ? theme.colors.shadow : undefined,
                fontWeight: isActive ? 700 : 400,
                transform: isActive ? 'scale(1.05)' : 'none',
                transition: 'all 0.2s',
              })}
            >
              <span className="text-lg sm:text-xl">{item.icon}</span>
              <span className="text-xs sm:text-sm mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;