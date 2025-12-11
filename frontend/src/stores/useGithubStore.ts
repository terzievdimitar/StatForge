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

	githubAppInstall: async () => {
		set({ loading: true });
		try {
			// 1. Първо питаме backend-а "Къде да отида?" чрез защитена API заявка
			// Тук бисквитките ще се изпратят коректно заради axios config-а
			const response = await axios.get('/github/install-url');

			// 2. Взимаме URL-а от отговора
			const { url } = response.data;

			// 3. Сега Frontend-ът прави пренасочването директно към GitHub
			window.location.href = url;
		} catch (error) {
			console.error('GitHub App installation error:', error);
			set({ loading: false });
		}
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
