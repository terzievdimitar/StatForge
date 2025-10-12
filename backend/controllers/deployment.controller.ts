import type { Request, Response } from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(import.meta.url);

interface EnvVariable {
	key: string;
	value: string;
}

// Mock deployment logic
const deployRepository = async (req: Request, res: Response) => {
	try {
		const {
			repoOwner,
			repoName,
			framework,
			buildCommand,
			outputDirectory,
			installCommand,
			envVariables,
		}: {
			repoOwner: string;
			repoName: string;
			framework: string;
			buildCommand: string;
			outputDirectory: string;
			installCommand: string;
			envVariables: EnvVariable[];
		} = req.body;

		// Validate inputs
		if (!repoOwner || !repoName || !framework || !buildCommand || !outputDirectory || !installCommand) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const deploymentDir = path.join(path.dirname(__dirname), '../../deployments', repoName);

		// Step 1: Clone the repository
		if (!fs.existsSync(deploymentDir)) {
			await execPromise(`git clone https://github.com/${repoOwner}/${repoName}.git ${deploymentDir}`);
		}

		// Step 2: Verify package.json
		const packageJsonPath = path.join(deploymentDir, 'package.json');
		if (!fs.existsSync(packageJsonPath)) {
			throw new Error('package.json not found in the repository');
		}

		// Step 3: Install dependencies
		await execPromise(`cd ${deploymentDir} && ${installCommand}`);

		// Step 4: Handle environment variables
		const envFilePath = path.join(deploymentDir, '.env');
		const envContent = envVariables.map(({ key, value }) => `${key}=${value}`).join('\n');
		fs.writeFileSync(envFilePath, envContent);

		// Step 5: Run build command
		await execPromise(`cd ${deploymentDir} && ${buildCommand}`);

		// Step 6: Verify output directory
		const outputPath = path.join(deploymentDir, outputDirectory);
		if (!fs.existsSync(outputPath)) {
			throw new Error('Output directory not found after build');
		}

		return res.status(200).json({ message: 'Deployment completed successfully', outputPath });
	} catch (error) {
		console.error('Deployment error:', error);
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
	}
};

const execPromise = (command: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error('Command error:', stderr);
				return reject(error);
			}
			console.log('Command output:', stdout);
			resolve();
		});
	});
};

export { deployRepository };
