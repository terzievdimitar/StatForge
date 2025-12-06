import type { RequestHandler } from 'express';
import { Octokit } from '@octokit/core';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from '../models/user.model.ts'; // Adjust the import based on your project structure

// Utility function to generate a GitHub App JWT
const generateGitHubAppToken = (): string => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	const privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/statforgehosting.2025-09-29.private-key.pem'), 'utf8');

	const payload = {
		iat: Math.floor(Date.now() / 1000), // Issued at time
		exp: Math.floor(Date.now() / 1000) + 10 * 60, // Expiration time (10 minutes)
		iss: process.env.GITHUB_APP_ID, // GitHub App ID
	};

	return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
};

// Initialize Octokit instance
const createOctokitInstance = (token: string) => {
	return new Octokit({
		auth: token,
	});
};

// Redirect user to GitHub App installation page
export const githubAppInstall: RequestHandler = (req, res) => {
	const { state } = req.query;
	const githubAppInstallUrl = `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new${state ? `?state=${state}` : ''}`;
	res.redirect(githubAppInstallUrl);
};

// Handle GitHub App installation callback
export const githubAppCallback: RequestHandler = async (req, res) => {
	const { code, installation_id, setup_action, state } = req.query;
	const userId = state; // Use state as userId

	console.log('GitHub App Callback Parameters:', { code, installation_id, setup_action, userId });

	if (!installation_id || !code || !setup_action || !userId) {
		return res.status(400).json({
			message: 'Required parameters not provided',
			missingParameters: {
				installation_id: !installation_id,
				code: !code,
				setup_action: !setup_action,
				userId: !userId,
			},
		});
	}

	try {
		// Save or update the installation_id in the user's profile
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		user.githubInstallationId = String(installation_id); // Assuming `githubInstallationId` is a field in the user schema
		await user.save();

		// Redirect to the dashboard
		res.redirect(`https://statforge.dimitarterziev.com/dashboard/hosting`);
	} catch (error: any) {
		console.error('Error during GitHub App callback:', error);
		res.status(500).json({ message: 'Failed to handle GitHub App callback', error: error.message });
	}
};

// Fetch repositories for a specific installation
export const getRepositories: RequestHandler = async (req, res) => {
	const userId = req.user?._id; // Assuming userId is available from authentication middleware

	if (!userId) {
		return res.status(400).json({ message: 'User ID not provided' });
	}

	try {
		// Retrieve the user's GitHub installation ID from the database
		const user = await User.findById(userId);
		if (!user || !user.githubInstallationId) {
			return res.status(404).json({ message: 'GitHub installation ID not found for user' });
		}

		const installationId = user.githubInstallationId;

		// Generate a GitHub App JWT
		const jwtToken = generateGitHubAppToken();
		const octokit = createOctokitInstance(jwtToken);

		// Generate an installation access token
		const tokenResponse = await octokit.request('POST /app/installations/{installation_id}/access_tokens', {
			installation_id: Number(installationId),
		});

		const accessToken = tokenResponse.data.token;

		// Use the installation access token to fetch repositories
		const installationOctokit = createOctokitInstance(accessToken);
		const reposResponse = await installationOctokit.request('GET /installation/repositories', {
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		res.json(reposResponse.data.repositories);
	} catch (error: any) {
		console.error('Error fetching repositories:', error);
		res.status(500).json({ message: 'Failed to fetch repositories', error: error.message });
	}
};
