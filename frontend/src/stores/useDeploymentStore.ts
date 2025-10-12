import { create } from 'zustand';
import axios from '../lib/axios';

interface DeploymentState {
	isDeploying: boolean;
	deploymentError: string | null;
	deployRepository: (
		repoOwner: string,
		repoName: string,
		framework: string,
		buildCommand: string,
		outputDirectory: string,
		installCommand: string,
		envVariables: Array<{ key: string; value: string }>
	) => Promise<void>;
}

const useDeploymentStore = create<DeploymentState>((set) => ({
	isDeploying: false,
	deploymentError: null,

	deployRepository: async (repoOwner, repoName, framework, buildCommand, outputDirectory, installCommand, envVariables) => {
		set({ isDeploying: true, deploymentError: null });

		try {
			const response = await axios.post('/github/deploy', {
				repoOwner,
				repoName,
				framework,
				buildCommand,
				outputDirectory,
				installCommand,
				envVariables,
			});

			console.log('Deployment response:', response.data);
		} catch (error) {
			console.error('Deployment error:', error);
			set({ deploymentError: error instanceof Error ? error.message : 'Unknown error occurred' });
		} finally {
			set({ isDeploying: false });
		}
	},
}));

export default useDeploymentStore;
