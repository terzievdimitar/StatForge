import { Box, Typography, List, ListItem, ListItemText, Button, Stack } from '@mui/material';
import { useGithubStore } from '../stores/useGithubStore';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
	const { githubLogin, repositories, getRepositories, checkGitHubCallback, loading } = useGithubStore();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const code = searchParams.get('code');
		if (code) {
			checkGitHubCallback(code);
		}
	}, [searchParams, checkGitHubCallback]);

	useEffect(() => {
		getRepositories();
	}, [getRepositories]);

	return (
		<Box sx={{ p: 4 }}>
			<Typography
				variant='h4'
				gutterBottom>
				Your GitHub Repositories
			</Typography>

			{repositories.length > 0 ? (
				loading ? (
					<Typography>
						<CircularProgress
							size={20}
							sx={{ color: 'white', marginRight: 1 }}
						/>
						Loading Repositories...
					</Typography>
				) : (
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
				)
			) : (
				<Typography>No repositories found.</Typography>
			)}

			{/* GitHub Login Button */}
			<Stack
				direction='row'
				justifyContent='center'
				sx={{ mt: 4 }}>
				<Button
					variant='contained'
					color='secondary'
					onClick={githubLogin}>
					Login with GitHub
				</Button>
			</Stack>
		</Box>
	);
};

export default Dashboard;
