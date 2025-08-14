import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const theme = useTheme();
  const { user, logout, isLoggingOut } = useAuthStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 pb-20"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.background} 60%, ${theme.colors.accent}11 100%)`,
        color: theme.colors.primary,
      }}
    >
      <div
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white dark:bg-dark-card rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 flex flex-col items-center border"
        style={{
          boxShadow: theme.colors.shadow,
          borderColor: theme.colors.accent,
          borderWidth: 2,
        }}
      >
        <div className="relative mb-3 sm:mb-4 lg:mb-6">
          <img
            src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || 'User'}`}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 shadow-lg"
            style={{ borderColor: theme.colors.accent }}
          />
          <div
            className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-accent rounded-full p-1.5 sm:p-2 shadow"
            style={{ backgroundColor: theme.colors.accent }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-1 text-center" style={{ color: theme.colors.primary }}>{user.username}</h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 lg:mb-8 text-center">{user.email}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
          <span className="font-medium text-sm sm:text-base text-center">Theme:</span>
          <button
            onClick={theme.toggleTheme}
            className="px-3 sm:px-4 py-2 rounded-full font-semibold transition-all text-sm sm:text-base w-full sm:w-auto"
            style={{
              backgroundColor: theme.colors.accent,
              color: theme.colors.buttonPrimaryText,
              borderRadius: theme.borderRadius.full,
              boxShadow: theme.colors.shadow,
            }}
          >
            {theme.isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
        <button
          onClick={async () => {
            await logout();
            navigate('/login');
          }}
          disabled={isLoggingOut}
          className="w-full py-2.5 sm:py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow text-sm sm:text-base"
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage; 