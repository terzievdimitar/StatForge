import type { Request, Response } from 'express';
import { exec, spawn } from 'child_process';
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
			port,
			repoOwner,
			repoName,
			framework,
			buildCommand,
			startCommand,
			outputDirectory,
			installCommand,
			envVariables,
		}: {
			port: string;
			repoOwner: string;
			repoName: string;
			framework: string;
			buildCommand: string;
			startCommand?: string;
			outputDirectory: string;
			installCommand: string;
			envVariables: EnvVariable[];
		} = req.body;

		// Validate inputs
		if (!repoOwner || !repoName || !framework || !buildCommand || !outputDirectory || !installCommand) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const deploymentDir = path.join(path.dirname(__dirname), '../../deployments', repoName);

		// collect command outputs to return to client
		const outputs: string[] = [];

		// Step 1: Clone the repository (or pull if exists)
		if (!fs.existsSync(deploymentDir)) {
			outputs.push(`> git clone https://github.com/${repoOwner}/${repoName}.git ${deploymentDir}`);
			const res = await execPromise(`git clone https://github.com/${repoOwner}/${repoName}.git ${deploymentDir}`);
			if (res.stdout) outputs.push(res.stdout);
			if (res.stderr) outputs.push(res.stderr);
		} else {
			outputs.push(`> git -C ${deploymentDir} pull`);
			const res = await execPromise(`git -C ${deploymentDir} pull`);
			if (res.stdout) outputs.push(res.stdout);
			if (res.stderr) outputs.push(res.stderr);
		}

		// Step 2: Verify package.json
		const packageJsonPath = path.join(deploymentDir, 'package.json');
		if (!fs.existsSync(packageJsonPath)) {
			throw new Error('package.json not found in the repository');
		}

		// Step 3: Install dependencies
		outputs.push(`> cd ${deploymentDir} && ${installCommand}`);
		{
			const res = await execPromise(`cd ${deploymentDir} && ${installCommand}`);
			if (res.stdout) outputs.push(res.stdout);
			if (res.stderr) outputs.push(res.stderr);
		}

		// Step 4: Handle environment variables
		const envFilePath = path.join(deploymentDir, '.env');
		const envContent = envVariables.map(({ key, value }) => `${key}=${value}`).join('\n');
		fs.writeFileSync(envFilePath, envContent);

		// Step 5: Run build command
		outputs.push(`> cd ${deploymentDir} && ${buildCommand}`);
		{
			const res = await execPromise(`cd ${deploymentDir} && ${buildCommand}`);
			if (res.stdout) outputs.push(res.stdout);
			if (res.stderr) outputs.push(res.stderr);
		}

		// Step 6: Verify output directory
		const outputPath = path.join(deploymentDir, outputDirectory);
		if (!fs.existsSync(outputPath)) {
			throw new Error('Output directory not found after build');
		}

		// Step 7: Start the application using the provided start command (if given)
		// Start in a detached child process so the server does not block waiting for it.
		let startInfo: { pid?: number | undefined; started?: boolean | undefined } | null = null;
		if (startCommand) {
			outputs.push(`> (start) ${startCommand} (cwd: ${deploymentDir})`);
			const child = spawn(startCommand, {
				shell: true,
				cwd: deploymentDir,
				env: {
					...process.env,
					PORT: port,
				},
				detached: true,
			});

			// collect any immediate output
			child.stdout?.on('data', (data) => {
				outputs.push(String(data));
			});
			child.stderr?.on('data', (data) => {
				outputs.push(String(data));
			});

			// give the child a short moment to surface immediate errors; then unref so it continues
			const started = await new Promise<boolean>((resolve) => {
				let settled = false;
				child.on('error', (err) => {
					outputs.push(`(start error) ${String(err)}`);
					settled = true;
					resolve(false);
				});
				child.on('close', (code) => {
					outputs.push(`(start exit) code=${code}`);
					settled = true;
					resolve(code === 0);
				});
				setTimeout(() => {
					if (!settled) {
						try {
							child.unref();
						} catch (e) {}
						resolve(true);
					}
				}, 1500);
			});

			const pidVal = typeof child.pid === 'number' ? child.pid : undefined;
			startInfo = { pid: pidVal, started };
			outputs.push(`(start) pid=${pidVal ?? 'unknown'} started=${started}`);
		}

		// Step 8: Respond with success and include collected outputs
		if (startInfo && !startInfo.started) {
			outputs.push('Start command did not remain running.');
			return res.status(500).json({ error: 'Start failed', outputs, outputPath, startInfo });
		}

		outputs.push('Successfully deployed');
		return res.status(200).json({ message: 'Deployment completed successfully', outputs, outputPath, startInfo });
	} catch (error) {
		console.error('Deployment error:', error);
		// if execPromise rejected with stdout/stderr, prefer those outputs
		const outputsFromErr = (error && (error as any).outputs) || [];
		return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error', outputs: outputsFromErr });
	}
};

const execPromise = (command: string): Promise<{ stdout: string; stderr: string }> => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			const sOut = stdout?.toString() || '';
			const sErr = stderr?.toString() || '';
			if (error) {
				console.error('Command error:', sErr);
				const err: any = new Error('Command failed');
				err.outputs = [sOut, sErr].filter(Boolean);
				return reject(err);
			}
			console.log('Command output:', sOut);
			resolve({ stdout: sOut, stderr: sErr });
		});
	});
};

export { deployRepository };
