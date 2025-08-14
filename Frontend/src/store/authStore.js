import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Ensure axios sends cookies for all requests
axios.defaults.withCredentials = true;


export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isSigningUp: false,
  isCheckingAuth: false, // Start as false since we have user from localStorage
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/signup`, credentials);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.log(error.response?.data?.message);
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/login`, credentials);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData, isLoggingIn: false });
      toast.success("Login successfull");
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/logout`);
      localStorage.removeItem('user');
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
  authCheck: async () => {
    // If we already have a user in localStorage, don't show loading
    const existingUser = JSON.parse(localStorage.getItem('user'));
    if (existingUser) {
      set({ isCheckingAuth: false });
    } else {
      set({ isCheckingAuth: true });
    }

    try {
      console.log("Auth check started");
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/authCheck`);
      console.log("Auth check response:", response.data);
      if (response.data?.user) {
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        set({ user: userData, isCheckingAuth: false });
      } else {
        localStorage.removeItem('user');
        set({ user: null, isCheckingAuth: false });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      // If auth check fails but we have user in localStorage, keep the user
      // This prevents logout on network errors
      const existingUser = JSON.parse(localStorage.getItem('user'));
      if (existingUser) {
        set({ user: existingUser, isCheckingAuth: false });
      } else {
        localStorage.removeItem('user');
        set({ user: null, isCheckingAuth: false });
      }
    }
  },
})); 