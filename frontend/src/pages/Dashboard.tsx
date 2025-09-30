import { Box, Typography, Button, Stack, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useGithubStore } from '../stores/useGithubStore';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Dashboard = () => {
	const { repositories, loading, githubAppInstall, githubAppCallback, getRepositories } = useGithubStore();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get('code');
		const installationId = searchParams.get('installation_id');
		if (code && installationId) {
			githubAppCallback(code, installationId);
		}
	}, [searchParams, githubAppCallback]);

	useEffect(() => {
		console.log('Dashboard useEffect triggered');
		getRepositories();
	}, [getRepositories]);

	// Debug logs (do not render in JSX)
	console.log('Rendering repositories:', repositories);
	console.log('Repositories length:', repositories.length);

	return (
		<Box sx={{ p: 4 }}>
			<Typography
				variant='h4'
				gutterBottom>
				Your GitHub Repositories
			</Typography>

			{loading ? (
				<Typography>
					<CircularProgress
						size={20}
						sx={{ color: 'white', marginRight: 1 }}
					/>
					Loading Repositories...
				</Typography>
			) : repositories && repositories.length > 0 ? (
				<List>
					{repositories.map((repo) => (
						<ListItem key={repo.id}>
							<ListItemText
								primary={repo.name}
								secondary={repo.description || 'No description available'}
							/>
						</ListItem>
					))}
				</List>
			) : (
				<Typography>No repositories found.</Typography>
			)}

			<Stack
				direction='row'
				justifyContent='center'
				sx={{ mt: 4 }}>
				<Button
					variant='contained'
					color='secondary'
					onClick={githubAppInstall}>
					Login with GitHub
				</Button>
			</Stack>
		</Box>
	);
};

export default Dashboard;
