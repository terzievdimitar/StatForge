import React from 'react';
import { Box, Grid, Paper, Typography, Button, Avatar, List, ListItem, ListItemText, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';
import BoltIcon from '@mui/icons-material/Bolt';

const DashboardOverview = () => {
	// placeholder data
	const hosting = { sites: 3, activeDeploys: 7 };
	const analytics = { requestsToday: '12.4k', errorsToday: 4 };
	const storage = { usage: '24GB', limit: '100GB' };

	const recentDeploys = [
		{ id: 'd1', site: 'marketing', status: 'success', ts: '2 hours ago' },
		{ id: 'd2', site: 'docs', status: 'failed', ts: '1 day ago' },
		{ id: 'd3', site: 'app', status: 'success', ts: '3 days ago' },
	];

	return (
		<Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
			<Container maxWidth='lg'>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
					<Box>
						<Typography
							variant='h4'
							sx={{ fontWeight: 900 }}>
							Overview
						</Typography>
						<Typography
							variant='body2'
							sx={{ color: 'text.secondary' }}>
							A quick summary of your account, hosting and analytics.
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button
							href='/dashboard/hosting'
							variant='contained'
							color='secondary'
							startIcon={<CloudUploadIcon />}>
							New Deployment
						</Button>
					</Box>
				</Box>

				<Grid
					container
					spacing={3}>
					<Grid size={{ xs: 12, md: 3 }}>
						<StatCard
							title='Sites'
							value={`${hosting.sites}`}
							icon={<StorageIcon />}
							actions={
								<Button
									href='/dashboard/hosting'
									size='small'
									variant='outlined'>
									Manage sites
								</Button>
							}
						/>
					</Grid>

					<Grid size={{ xs: 12, md: 3 }}>
						<StatCard
							title='Active Deploys'
							value={`${hosting.activeDeploys}`}
							icon={<CloudUploadIcon />}
							actions={
								<Button
									size='small'
									variant='outlined'>
									View deployments
								</Button>
							}
						/>
					</Grid>

					<Grid size={{ xs: 12, md: 3 }}>
						<StatCard
							title='Requests (today)'
							value={analytics.requestsToday}
							icon={<BarChartIcon />}
							actions={
								<Button
									href='/dashboard/analytics'
									size='small'
									variant='outlined'>
									Open analytics
								</Button>
							}
						/>
					</Grid>

					<Grid size={{ xs: 12, md: 3 }}>
						<StatCard
							title='Storage'
							value={`${storage.usage} / ${storage.limit}`}
							icon={<BoltIcon />}
							actions={
								<Button
									size='small'
									variant='outlined'>
									Storage details
								</Button>
							}
						/>
					</Grid>

					<Grid size={{ xs: 12, md: 8 }}>
						<Paper
							elevation={2}
							sx={{ p: 3, borderRadius: 2 }}>
							<Typography
								variant='h6'
								sx={{ fontWeight: 800, mb: 2 }}>
								Recent deployments
							</Typography>
							<List>
								{recentDeploys.map((d) => (
									<React.Fragment key={d.id}>
										<ListItem
											secondaryAction={
												<Typography
													variant='caption'
													sx={{ color: d.status === 'success' ? 'success.main' : 'error.main' }}>
													{d.status}
												</Typography>
											}>
											<ListItemText
												primary={`${d.site} — ${d.id}`}
												secondary={d.ts}
											/>
										</ListItem>
										<Divider />
									</React.Fragment>
								))}
							</List>
						</Paper>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<Paper
							elevation={2}
							sx={{ p: 3, borderRadius: 2 }}>
							<Typography
								variant='h6'
								sx={{ fontWeight: 800, mb: 2 }}>
								Quick actions
							</Typography>
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
								<Button
									href='/dashboard/hosting'
									variant='contained'
									startIcon={<CloudUploadIcon />}>
									New Deployment
								</Button>
								<Button
									href='/dashboard/development'
									variant='outlined'
									startIcon={<StorageIcon />}>
									Create new site
								</Button>
								<Button
									href='/dashboard/analytics'
									variant='outlined'
									startIcon={<BarChartIcon />}>
									View analytics
								</Button>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default DashboardOverview;

const StatCard: React.FC<{ title: string; value: React.ReactNode; icon?: React.ReactNode; actions?: React.ReactNode }> = ({ title, value, icon, actions }) => (
	<Paper
		elevation={2}
		sx={{ p: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
		<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
			<Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>{icon}</Avatar>
			<Box>
				<Typography
					variant='caption'
					sx={{ color: 'text.secondary' }}>
					{title}
				</Typography>
				<Typography
					variant='h5'
					sx={{ fontWeight: 700 }}>
					{value}
				</Typography>
			</Box>
		</Box>

		{actions && <Box sx={{ mt: 2 }}>{actions}</Box>}
	</Paper>
);
