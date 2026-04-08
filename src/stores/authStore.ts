import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, type LoginCredentials } from '../services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          const { access_token } = response;
          localStorage.setItem('access_token', access_token);

          // Fetch user profile
          let user = null;
          try {
            user = await authService.getProfile();
          } catch {
            // profile fetch might fail, but login was successful
          }

          set({
            token: access_token,
            isAuthenticated: true,
            user,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const msg =
            (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
            'Login failed. Please check your credentials.';
          set({ isLoading: false, error: msg, isAuthenticated: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('access_token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      checkAuth: async () => {
        const token = get().token || localStorage.getItem('access_token');
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }
        try {
          const user = await authService.getProfile();
          set({ user, isAuthenticated: true, token });
        } catch {
          localStorage.removeItem('access_token');
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
