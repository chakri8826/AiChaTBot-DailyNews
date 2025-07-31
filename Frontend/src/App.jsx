import React, {useEffect} from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Discover from './pages/Discover';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import { useAuthStore } from './store/authStore';
import {Loader} from 'lucide-react';
import { Toaster } from "react-hot-toast";
import NewsDetailPage from "./pages/NewsDetailPage";


// Simple ProtectedRoute implementation
function ProtectedRoute({ children }) {
  const { user, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  if (isCheckingAuth) return null; // or a loading spinner
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}



function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    authCheck();
    // eslint-disable-next-line
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-violet-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen min-h-screen">
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to="/search" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/search" />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/search" />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to="/login" />} />
        <Route path="/discover" element={user ? <Discover /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/account" element={user ? <AccountPage /> : <Navigate to="/login" />} />
        <Route path="/history" element={user ? <HistoryPage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/news-detail" element={user ? <NewsDetailPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
      {/* Hover group for BottomNav */}
      <div className="group">
        {/* Invisible hover zone at the bottom */}
        <div className="fixed bottom-0 left-0 right-0 h-8 z-40 cursor-pointer" />
        <BottomNav />
      </div>
    </div>
  );
}

export default App;

 