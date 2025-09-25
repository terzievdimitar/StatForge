import { create } from 'zustand';
import axios from '../lib/axios';

interface UserStore {
	user: { name: string; email: string } | null;
	loading: boolean;
	signup: (name: string, email: string, password: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	loading: false,

	signup: async (name: string, email: string, password: string) => {
		set({ loading: true });
		try {
			// Send the correct payload structure
			const response = await axios.post('/auth/signup', { name, email, password });
			set({ user: response.data, loading: false });
			console.log('User signed up:', response.data);
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
			console.log('User logged in:', response.data);
		} catch (error) {
			set({ loading: false });
			console.error('Login error:', error);
		}
	},
}));
