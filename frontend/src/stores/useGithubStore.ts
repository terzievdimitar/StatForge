import { create } from 'zustand';
import axios from '../lib/axios';

interface GithubStore {
	user: { name: string; email: string } | null;
	repositories: any[]; // Add repositories state
	loading: boolean;
	setRepositories: (repositories: any[]) => void; // Add setRepositories function
	githubAppInstall: () => Promise<void>;
	githubAppCallback: (code: string, installationId: string) => Promise<void>;
	getRepositories: () => Promise<void>; // Modified to include installationId
}

export const useGithubStore = create<GithubStore>((set) => ({
	user: null,
	repositories: [], // Initialize repositories state
	loading: false,

	githubAppInstall: async () => {
		set({ loading: true });
		try {
			// Redirect to the GitHub App installation URL
			window.location.href = 'https://statforge-ro5u.onrender.com/api/github/app-install';
		} catch (error) {
			console.error('GitHub App installation error:', error);
		}
	},

	githubAppCallback: async (code: string, installationId: string) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/github/app-callback?code=${code}&installation_id=${installationId}&setup_action=install`);
			set({ repositories: response.data.repositories, loading: false });
		} catch (error) {
			set({ loading: false });
			console.error('Failed to handle GitHub App callback:', error);
		}
	},

	setRepositories: (repositories: any[]) => set({ repositories: repositories }), // Implement setRepositories
	getRepositories: async () => {
		set({ loading: true });
		try {
			const response = await axios.get('/github/repositories');
			set({ repositories: response.data, loading: false });
			console.log('Fetched Repositories in frontend:', response.data.repositories);
		} catch (error) {
			set({ loading: false });
			console.error('Failed to fetch repositories:', error);
		}
	},
}));
