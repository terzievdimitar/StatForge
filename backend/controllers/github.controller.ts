import type { RequestHandler } from 'express';
import { Octokit } from '@octokit/core';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
	const githubAppInstallUrl = `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new`;
	res.redirect(githubAppInstallUrl);
};

// Handle GitHub App installation callback
export const githubAppCallback: RequestHandler = async (req, res) => {
	const { code, installation_id, setup_action } = req.query;

	if (!installation_id || !code || !setup_action) {
		return res.status(400).json({ message: 'Required parameters not provided' });
	}

	try {
		// Generate a GitHub App JWT
		const jwtToken = generateGitHubAppToken();
		const octokit = createOctokitInstance(jwtToken);

		// Generate an installation access token
		const tokenResponse = await octokit.request('POST /app/installations/{installation_id}/access_tokens', {
			installation_id: Number(installation_id),
		});

		const accessToken = tokenResponse.data.token;

		// Use the installation access token to fetch repositories
		const installationOctokit = createOctokitInstance(accessToken);
		const reposResponse = await installationOctokit.request('GET /installation/repositories', {
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		req.app.locals.repositories = reposResponse.data;
		console.log('Repositories fetched:', req.app.locals.repositories);

		// Redirect to the dashboard
		res.redirect(`${process.env.CLIENT_URL}/dashboard`);
	} catch (error: any) {
		console.error('Error during GitHub App callback:', error);
		res.status(500).json({ message: 'Failed to handle GitHub App callback', error: error.message });
	}
};

// Fetch repositories for a specific installation
export const getRepositories: RequestHandler = (req, res) => {
	const repositories = req.app.locals.repositories;
	if (!repositories) {
		console.log('No repositories found in app.locals');
		return res.status(404).json({ message: 'No repositories found' });
	}
	console.log('Fetched repositories in backend:', repositories);
	res.json(repositories);
};
