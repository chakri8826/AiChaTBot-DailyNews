import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
    const { user, isCheckingAuth, isSigningUp, isLoggingIn, isLoggingOut, authCheck } = useAuthStore();

    const isAuthenticated = !!user;
    const isLoading = isCheckingAuth || isSigningUp || isLoggingIn || isLoggingOut;

    return {
        user,
        isAuthenticated,
        isLoading,
        isCheckingAuth,
        isSigningUp,
        isLoggingIn,
        isLoggingOut,
        authCheck
    };
};
