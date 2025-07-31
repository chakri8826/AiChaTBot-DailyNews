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
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: `linear-gradient(135deg, ${theme.colors.background} 60%, ${theme.colors.accent}11 100%)`,
        color: theme.colors.primary,
      }}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-dark-card rounded-3xl shadow-2xl p-8 flex flex-col items-center border"
        style={{
          boxShadow: theme.colors.shadow,
          borderColor: theme.colors.accent,
          borderWidth: 2,
        }}
      >
        <div className="relative mb-4">
          <img
            src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username || 'User'}`}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 shadow-lg"
            style={{ borderColor: theme.colors.accent }}
          />
          <div
            className="absolute bottom-2 right-2 bg-accent rounded-full p-2 shadow"
            style={{ backgroundColor: theme.colors.accent }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold mb-1 text-center" style={{ color: theme.colors.primary }}>{user.username}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 text-center">{user.email}</p>
        <div className="flex items-center gap-4 mb-8">
          <span className="font-medium">Theme:</span>
          <button
            onClick={theme.toggleTheme}
            className="px-4 py-2 rounded-full font-semibold transition-all"
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
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow"
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage; 