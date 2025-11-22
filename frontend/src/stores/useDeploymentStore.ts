import { create } from 'zustand';
import axios from '../lib/axios';

interface DeploymentState {
	isDeploying: boolean;
	deploymentError: string | null;
	deploymentOutput: string | null;
	deploymentSuccess: boolean | null;
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
	deploymentOutput: null,
	deploymentSuccess: null,

	deployRepository: async (port, repoOwner, repoName, framework, buildCommand, startCommand, outputDirectory, installCommand, envVariables) => {
		set({ isDeploying: true, deploymentError: null, deploymentOutput: null, deploymentSuccess: null });

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

			const outputs: string[] = response.data?.outputs || [];
			set({ deploymentOutput: outputs.join('\n'), deploymentSuccess: true });
			console.log('Deployment response:', response.data);
		} catch (error: any) {
			console.error('Deployment error:', error);
			const serverOutputs = error?.response?.data?.outputs;
			if (Array.isArray(serverOutputs)) {
				set({ deploymentOutput: serverOutputs.join('\n'), deploymentSuccess: false });
			} else {
				set({ deploymentError: error instanceof Error ? error.message : 'Unknown error occurred', deploymentSuccess: false });
			}
		} finally {
			set({ isDeploying: false });
		}
	},
}));

export default useDeploymentStore;
