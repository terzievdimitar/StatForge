import { create } from 'zustand';
import axios from '../lib/axios';

interface GithubStore {
	user: { name: string; email: string } | null;
	repositories: any[];
	loading: boolean;
	setRepositories: (repositories: any[]) => void;
	githubAppInstall: () => void;
	getRepositories: () => Promise<void>;
}

export const useGithubStore = create<GithubStore>((set) => ({
	user: null,
	repositories: [],
	loading: false,

	githubAppInstall: () => {
		set({ loading: true });
		// Redirect to backend endpoint to start GitHub App installation
		window.location.href = 'https://statforge-ro5u.onrender.com/api/github/app-install';
	},

	setRepositories: (repositories: any[]) => set({ repositories: repositories }),

	// When called, fetches the list of repositories from the backend
	getRepositories: async () => {
		set({ loading: true });
		try {
			const response = await axios.get('/github/repositories');
			set({ repositories: response.data, loading: false });
			console.log('Fetched Repositories:', response.data);
		} catch (error) {
			set({ loading: false });
			console.error('Failed to fetch repositories:', error);
		}
	},
}));
