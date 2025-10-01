import { create } from 'zustand';
import axios from '../lib/axios';
import { redirect } from 'react-router-dom';

interface UserStore {
	user: { name: string; email: string } | null;
	loading: boolean;
	checkingAuth: boolean;
	signup: (name: string, email: string, password: string) => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	refreshToken: () => Promise<any>;
}

export const useUserStore = create<UserStore>((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,

	signup: async (name: string, email: string, password: string) => {
		set({ loading: true });
		try {
			// Send the correct payload structure
			const response = await axios.post('/auth/signup', { name, email, password });
			set({ user: response.data, loading: false });
		} catch (error) {
			set({ loading: false });
			console.error('Signup error:', error);
		}
	},

	login: async (email: string, password: string) => {
		set({ loading: true });
		try {
			const response = await axios.post('/auth/login', { email, password });
			set({ user: response.data, loading: false });
			redirect('/dashboard');
		} catch (error) {
			set({ loading: false });
			console.error('Login error:', error);
		}
	},

	logout: async () => {
		set({ loading: true });
		try {
			await axios.post('/auth/logout');
			set({ user: null, loading: false });
			console.log('User logged out');
		} catch (error) {
			set({ loading: false });
			console.error('Logout error:', error);
		}
	},

	// Checks if the user is authenticated.
	// Sends a GET request to the /auth/profile endpoint.
	// Updates the user state if the user is authenticated, or clears it if not.
	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const response = await axios.get('/auth/profile');
			set({ user: response.data, checkingAuth: false });
		} catch (error) {
			set({ user: null, checkingAuth: false });
			console.log('User not authenticated');
		}
	},

	// Refreshes the authentication token
	// Updates the user state or clears it if the refresh fails.
	refreshToken: async () => {
		if (get().checkingAuth) return; // Prevent multiple simultaneous checks

		set({ checkingAuth: true });
		try {
			const response = await axios.post('/auth/refresh-token');
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}));

//! Axios interceptor to handle token refresh
// Automatically retries requests that fail with a 401 Unauthorized status after attempting to refresh the token.
// If the token refresh fails, it logs the user out.

let refreshPromise: Promise<any> | null = null;
axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is alreadfy in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh token request
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				// Retry the original request
				return axios(originalRequest);
			} catch (refreshError) {
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
