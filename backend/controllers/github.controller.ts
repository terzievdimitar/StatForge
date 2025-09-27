import type { Request, Response, RequestHandler } from 'express';
import type { AxiosError } from 'axios';
import axios from '../lib/axios.ts'; // Adjust the path as necessary

// Redirect user to GitHub for authentication
export const githubLogin: RequestHandler = (req, res) => {
	const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user user:email`;
	res.redirect(githubAuthUrl);
};

// Handle GitHub OAuth callback
export const githubCallback: RequestHandler = async (req, res) => {
	const { code } = req.query;

	if (!code) {
		console.error('Authorization code not provided');
		return res.status(400).json({ message: 'Authorization code not provided' });
	}

	console.log('Authorization code received:', code);

	try {
		// Exchange code for access token
		const tokenResponse = await axios.post(
			'https://github.com/login/oauth/access_token',
			{
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code,
			},
			{
				headers: { Accept: 'application/json' },
			}
		);

		console.log('Token response:', tokenResponse.data);

		if (!tokenResponse.data.access_token) {
			console.error('Access token not received:', tokenResponse.data);
			return res.status(500).json({ message: 'Failed to retrieve access token' });
		}

		const accessToken = tokenResponse.data.access_token;

		// Fetch user repositories from GitHub
		const reposResponse = await axios.get('https://api.github.com/user/repos', {
			headers: { Authorization: `Bearer ${accessToken}` },
		});

		// Store repositories temporarily in memory (or database/session)
		req.app.locals.repositories = reposResponse.data;

		// Redirect to the dashboard
		res.redirect(`${process.env.CLIENT_URL}/dashboard`);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response) {
			console.error('GitHub API error:', axiosError.response.data);
		} else {
			console.error('Unexpected error:', axiosError.message);
		}
		res.status(500).json({ message: 'GitHub OAuth failed', error: axiosError.message });
	}
};

export const getRepositories: RequestHandler = (req, res) => {
	const repositories = req.app.locals.repositories;
	if (!repositories) {
		return res.status(404).json({ message: 'No repositories found' });
	}
	res.json(repositories);
};
