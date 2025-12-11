import { useEffect, useMemo, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Divider,
	InputAdornment,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Stack,
	TextField,
	Typography,
	Menu,
	MenuItem,
	ListItemIcon,
	Tooltip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useGithubStore } from '../stores/useGithubStore';

type Repo = {
	id: number | string;
	name: string;
	description?: string | null;
	private?: boolean;
	updated_at?: string;
	owner?: { login?: string; avatar_url?: string };
};

const HostingPage = () => {
	const { repositories = [], loading, githubAppInstall, getRepositories } = useGithubStore();
	const navigate = useNavigate();

	const [query, setQuery] = useState('');
	const [owner, setOwner] = useState<string>('');
	const [ownerAvatar, setOwnerAvatar] = useState<string | undefined>(undefined);

	// Dropdown anchor
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);
	const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
	const closeMenu = () => setAnchorEl(null);

	useEffect(() => {
		getRepositories();
	}, [getRepositories]);

	// Извличаме owner от първото repo (ако нямаш в store)
	useEffect(() => {
		if (repositories.length > 0) {
			const first = repositories[0] as Repo;
			setOwner((prev) => prev || first?.owner?.login || '');
			setOwnerAvatar((prev) => prev || first?.owner?.avatar_url);
		}
	}, [repositories]);

	const formatUpdated = (iso?: string) => {
		if (!iso) return '';
		const d = new Date(iso);
		const now = new Date();
		const sameYear = d.getFullYear() === now.getFullYear();
		return d.toLocaleDateString('en-US', sameYear ? { month: 'short', day: 'numeric' } : { month: 'numeric', day: 'numeric', year: '2-digit' });
	};

	const filtered: Repo[] = useMemo(() => {
		const q = query.trim().toLowerCase();
		return (repositories as Repo[]).filter((r) => {
			const hitQ = !q || r.name?.toLowerCase().includes(q) || (r.description ?? '').toLowerCase().includes(q);
			return hitQ;
		});
	}, [repositories, query]);

	const handleImport = (repo: Repo) => {
		navigate('/dashboard/import', { state: { repo } }); // Pass repository details to /import page
	};

	return (
		<Box
			sx={{
				width: '100%',
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
			}}>
			<Box>
				<Typography
					variant='h4'
					sx={{ fontWeight: 800, width: 'fit-content' }}>
					Let's forge something new.
				</Typography>
				<Typography
					variant='body1'
					sx={{ mb: 3, color: 'text.secondary' }}>
					To deploy a new Project, import an existing Git Repository.
				</Typography>
				<Card
					variant='outlined'
					sx={{
						width: 740, // <-- по-широко
						maxWidth: '95vw',
						borderRadius: 1,
						borderColor: 'divider',
						bgcolor: (t) => t.palette.background.paper,
					}}>
					<CardContent sx={{ p: 3 }}>
						{/* Header row: Title + Owner dropdown + Search */}
						<Stack spacing={2}>
							<Typography
								variant='h5'
								sx={{ fontWeight: 800, color: 'text.primary' }}>
								Import Git Repository
							</Typography>

							<Stack
								direction='row'
								spacing={1.5}
								alignItems='center'>
								{/* Owner dropdown */}
								<Tooltip title='Account menu'>
									<Button
										onClick={openMenu}
										variant='outlined'
										startIcon={
											<Avatar
												src={ownerAvatar}
												sx={{ width: 22, height: 22 }}>
												<GitHubIcon fontSize='inherit' />
											</Avatar>
										}
										endIcon={<ExpandMoreIcon />}
										aria-controls={menuOpen ? 'owner-menu' : undefined}
										aria-haspopup='true'
										aria-expanded={menuOpen ? 'true' : undefined}
										sx={{
											px: 2,
											minWidth: 180,
											borderRadius: 1,
											justifyContent: 'flex-start',
											textTransform: 'none',
											borderColor: 'text.secondary',
											color: 'text.primary',
											bgcolor: 'transparent',
											'&:hover': { borderColor: 'text.secondary', bgcolor: 'action.hover' },
										}}>
										{owner || 'owner'}
									</Button>
								</Tooltip>

								<Menu
									id='owner-menu'
									anchorEl={anchorEl}
									open={menuOpen}
									onClose={closeMenu}
									sx={{}}
									anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
									transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
									<MenuItem disabled>
										<ListItemIcon>
											<PersonIcon fontSize='small' />
										</ListItemIcon>
										{owner || 'Not signed in'}
									</MenuItem>
									<Divider />
									<MenuItem
										onClick={() => {
											closeMenu();
											// open GitHub App installation flow
											githubAppInstall();
										}}>
										<ListItemIcon>
											<AddIcon fontSize='small' />
										</ListItemIcon>
										Add from GitHub
									</MenuItem>
								</Menu>

								{/* Search */}
								<TextField
									fullWidth
									placeholder='Search…'
									size='small'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<SearchIcon fontSize='small' />
											</InputAdornment>
										),
									}}
									sx={{
										'& .MuiOutlinedInput-root': { borderRadius: 1 },
									}}
								/>
							</Stack>

							{/* Repo list box */}
							<Box
								sx={{
									border: '1px solid',
									borderColor: 'text.secondary',
									borderRadius: 1,
									overflow: 'hidden',
									bgcolor: 'background.default',
									padding: 1,
								}}>
								{loading && repositories.length === 0 ? (
									<Stack
										direction='row'
										spacing={1}
										alignItems='center'
										p={2}>
										<CircularProgress size={20} />
										<Typography>Loading Repositories…</Typography>
									</Stack>
								) : (
									<List
										disablePadding
										sx={{
											height: 320,
											overflowY: 'auto',
										}}>
										{filtered.length === 0 ? (
											<Stack
												alignItems='center'
												justifyContent='center'
												sx={{ height: '100%' }}>
												<Typography color='text.secondary'>No repositories found.</Typography>
											</Stack>
										) : (
											filtered.map((repo, idx) => (
												<Box key={repo.id}>
													<ListItem
														sx={{ px: 2, py: 2 }}
														secondaryAction={
															<Button
																variant='contained'
																size='small'
																onClick={() => handleImport(repo)}
																sx={{ borderRadius: 1, textTransform: 'none', px: 2 }}>
																Import
															</Button>
														}>
														<ListItemAvatar sx={{ minWidth: 0, mr: 1 }}>
															<Avatar
																src={repo.owner?.avatar_url}
																sx={{ width: 28, height: 28 }}>
																<GitHubIcon fontSize='small' />
															</Avatar>
														</ListItemAvatar>

														<ListItemText
															primary={
																<Stack
																	direction='row'
																	spacing={1}
																	alignItems='center'>
																	<Typography sx={{ fontWeight: 700 }}>
																		{repo.name}
																	</Typography>
																	{repo.private && (
																		<LockOutlinedIcon
																			fontSize='inherit'
																			sx={{ opacity: 0.7 }}
																		/>
																	)}
																	<Typography
																		component='span'
																		sx={{ opacity: 0.6 }}>
																		•
																	</Typography>
																	<Typography
																		component='span'
																		variant='body2'
																		color='text.secondary'>
																		{formatUpdated(repo.updated_at)}
																	</Typography>
																</Stack>
															}
															secondary={null}
														/>
													</ListItem>
													{idx < filtered.length - 1 && <Divider sx={{ borderColor: 'text.secondary' }} />}
												</Box>
											))
										)}
									</List>
								)}
							</Box>
						</Stack>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};

export default HostingPage;
