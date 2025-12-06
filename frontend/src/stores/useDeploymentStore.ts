import { create } from 'zustand';
import axios from '../lib/axios';

interface DeploymentState {
	isDeploying: boolean;
	deploymentError: string | null;
	deploymentSuccess: string | null;
	deployRepository: (
		port: string,
		repoOwner: string,
		repoName: string,
		framework: string,
		buildCommand: string,
		startCommand: string,
		outputDirectory: string,
		installCommand: string,
		envVariables: Array<{ key: string; value: string }>
	) => Promise<void>;
}

const useDeploymentStore = create<DeploymentState>((set) => ({
	isDeploying: false,
	deploymentError: null,
	deploymentSuccess: null,

	deployRepository: async (port, repoOwner, repoName, framework, buildCommand, startCommand, outputDirectory, installCommand, envVariables) => {
		set({ isDeploying: true, deploymentError: null, deploymentSuccess: null });

		try {
			const response = await axios.post('/github/deploy', {
				port,
				repoOwner,
				repoName,
				framework,
				buildCommand,
				startCommand,
				outputDirectory,
				installCommand,
				envVariables,
			});

			console.log('Deployment response:', response.data);
			set({ deploymentSuccess: `Successful deployment` });
		} catch (error) {
			console.error('Deployment error:', error);
			set({ deploymentError: error instanceof Error ? error.message : 'Unknown error occurred' });
		} finally {
			set({ isDeploying: false });
		}
	},
}));

export default useDeploymentStore;
