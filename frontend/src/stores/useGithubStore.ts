import { create } from 'zustand';
import axios from 'axios';

interface GithubStore {
	user: { name: string; email: string } | null;
	repositories: any[]; // Add repositories state
	loading: boolean;
	githubLogin: () => Promise<void>;
	checkGitHubCallback: (code: string) => Promise<void>;
	setRepositories: (repos: any[]) => void; // Add setRepositories function
	getRepositories: () => Promise<void>; // Add getRepositories function
}

export const useGithubStore = create<GithubStore>((set) => ({
	user: null,
	repositories: [], // Initialize repositories state
	loading: false,

	githubLogin: async () => {
		set({ loading: true });
		try {
			// Redirect to the backend's GitHub login endpoint
			window.location.href = 'http://localhost:3000/api/github';
		} catch (error) {
			set({ loading: false });
			console.error('GitHub login error:', error);
		}
	},

	checkGitHubCallback: async (code: string) => {
		set({ loading: true });
		try {
			const response = await axios.get(`/api/github/callback?code=${code}`);
			set({ user: response.data.user, repositories: response.data.repositories, loading: false });
		} catch (error) {
			set({ loading: false });
			console.error('GitHub callback error:', error);
		}
	},

	setRepositories: (repos: any[]) => set({ repositories: repos }), // Implement setRepositories

	getRepositories: async () => {
		set({ loading: true });
		try {
			const response = await axios.get('/api/github/repositories');
			set({ repositories: response.data, loading: false });
		} catch (error) {
			set({ loading: false });
			console.error('Failed to fetch repositories:', error);
		}
	},
}));
