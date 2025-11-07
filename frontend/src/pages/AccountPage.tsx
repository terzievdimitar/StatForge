import * as React from 'react';
import {
	Box,
	Button,
	Tabs,
	Tab,
	Typography,
	TextField,
	Paper,
	List,
	ListItem,
	ListItemText,
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import Container from '@mui/material/Container';
import axios from '../lib/axios';
import { useUserStore } from '../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`account-tabpanel-${index}`}
			aria-labelledby={`account-tab-${index}`}
			{...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `account-tab-${index}`,
		'aria-controls': `account-tabpanel-${index}`,
	};
}

export default function AccountPage() {
	const [value, setValue] = React.useState(0);
	const [email, setEmail] = React.useState('');
	const [updateOpen, setUpdateOpen] = React.useState(false);
	const [updateEmail, setUpdateEmail] = React.useState('');

	const { user, checkAuth, logout } = useUserStore();
	const navigate = useNavigate();
	const [deleteOpen, setDeleteOpen] = React.useState(false);

	// Placeholder billing data
	const subscriptions = [
		{ id: 's1', name: 'Hosting (Standard)', price: '$29/mo', status: 'active' },
		{ id: 's2', name: 'Analytics (Pro)', price: '$49/mo', status: 'active' },
	];

	const invoices = [
		{ id: 'inv-1001', desc: 'Hosting - Jan 2025', amount: '$29', date: '2025-01-01' },
		{ id: 'inv-1002', desc: 'Analytics - Jan 2025', amount: '$49', date: '2025-01-01' },
		{ id: 'inv-1003', desc: 'One-time: Dev work', amount: '$1500', date: '2025-02-15' },
	];

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleSaveEmail = async (newEmail?: string) => {
		// if called from inline (no dialog) use current email state
		const targetEmail = newEmail ?? updateEmail ?? email;
		try {
			// Call backend endpoint to update email. Endpoint should validate and return updated user profile.
			await axios.patch('/auth/email', { email: targetEmail });
			// refresh user profile
			await checkAuth();
			setUpdateOpen(false);
		} catch (err) {
			console.error('Failed to update email', err);
		}
	};

	const handleOpenDelete = () => setDeleteOpen(true);
	const handleCloseDelete = () => setDeleteOpen(false);
	const handleConfirmDelete = async () => {
		try {
			// Call backend delete endpoint (implement server-side). Using '/auth' DELETE as placeholder.
			await axios.delete('/auth');
			// logout locally and redirect
			await logout();
			navigate('/');
		} catch (err) {
			console.error('Failed to delete account', err);
		} finally {
			setDeleteOpen(false);
		}
	};

	React.useEffect(() => {
		if (user?.email) setEmail(user.email);
	}, [user]);

	return (
		<Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
			<Container maxWidth='lg'>
				<Typography
					variant='h4'
					sx={{ fontWeight: 900, mb: 2 }}>
					Account
				</Typography>
				<Typography
					variant='body2'
					sx={{ color: 'text.secondary', mb: 3 }}>
					Manage your account and billing settings.
				</Typography>

				{/* Tabs with only border-bottom and no background */}
				<Box sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label='account tabs'
						sx={{ px: 2 }}
						textColor='primary'
						indicatorColor='primary'>
						<Tab
							label='Billing'
							{...a11yProps(0)}
						/>
						<Tab
							label='Account'
							{...a11yProps(1)}
						/>
					</Tabs>
				</Box>

				<TabPanel
					value={value}
					index={0}>
					<Paper sx={{ p: 3, mb: 3 }}>
						<Typography
							variant='h6'
							sx={{ mb: 1 }}>
							Subscriptions
						</Typography>
						<Typography
							variant='body2'
							sx={{ color: 'text.secondary', mb: 2 }}>
							All subscriptions will automatically renew at the end of your current service period unless noted otherwise. Any
							discounts being applied will be reflected on your invoice.
						</Typography>
						<Typography
							variant='body2'
							sx={{ color: 'text.secondary', mb: 2 }}>
							For domain registration renewal information go to{' '}
							<Button
								variant='text'
								size='small'>
								Manage Domains
							</Button>
							.
						</Typography>

						<Divider sx={{ my: 2 }} />

						<Typography
							variant='subtitle1'
							sx={{ mb: 2 }}>
							Custom pricing
						</Typography>
						<Typography
							variant='body2'
							sx={{ color: 'text.secondary', mb: 2 }}>
							Subscriptions priced as a bundled contract or through other arrangements.
						</Typography>

						<TableContainer
							component={Paper}
							variant='outlined'
							sx={{ mt: 2 }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Applies to</TableCell>
										<TableCell>Product</TableCell>
										<TableCell>Service status</TableCell>
										<TableCell>Pricing</TableCell>
										<TableCell>Invoice status</TableCell>
										<TableCell>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{subscriptions.map((s) => (
										<TableRow key={s.id}>
											<TableCell>Your Account</TableCell>
											<TableCell>{s.name}</TableCell>
											<TableCell>
												<Typography sx={{ color: 'success.main', fontWeight: 700 }}>ACTIVE</Typography>
											</TableCell>
											<TableCell>{s.price}</TableCell>
											<TableCell>Paid</TableCell>
											<TableCell>
												<Button
													variant='text'
													size='small'>
													Cancel
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					<Paper sx={{ p: 3 }}>
						<Typography
							variant='h6'
							sx={{ mb: 2 }}>
							Invoices & One-time payments
						</Typography>
						<List>
							{invoices.map((inv) => (
								<React.Fragment key={inv.id}>
									<ListItem
										secondaryAction={
											<Button
												variant='outlined'
												size='small'>
												Download
											</Button>
										}>
										<ListItemText
											primary={`${inv.desc} — ${inv.amount}`}
											secondary={inv.date}
										/>
									</ListItem>
									<Divider />
								</React.Fragment>
							))}
						</List>
					</Paper>
				</TabPanel>

				<TabPanel
					value={value}
					index={1}>
					<Paper sx={{ p: 3, mb: 2 }}>
						<Typography
							variant='h6'
							sx={{ mb: 1 }}>
							Email
						</Typography>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<Typography
									variant='h6'
									sx={{ fontWeight: 700 }}>
									{email || 'youremail@example.com'}
								</Typography>
								<Box sx={{ bgcolor: 'text.secondary', px: 0.8, py: 0.2, borderRadius: 2 }}>
									<Typography
										variant='caption'
										sx={{ color: 'secondary.contrastText' }}>
										Verified
									</Typography>
								</Box>
							</Box>

							<Box sx={{ flex: 1 }} />

							<Button
								variant='outlined'
								onClick={() => {
									setUpdateEmail(email);
									setUpdateOpen(true);
								}}>
								Update email
							</Button>
						</Box>
					</Paper>

					<Dialog
						open={updateOpen}
						onClose={() => setUpdateOpen(false)}>
						<DialogTitle>Update email</DialogTitle>
						<DialogContent>
							<DialogContentText>Enter your new email address and confirm to update your account.</DialogContentText>
							<Box sx={{ mt: 2 }}>
								<TextField
									fullWidth
									label='Email'
									value={updateEmail}
									onChange={(e) => setUpdateEmail(e.target.value)}
								/>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setUpdateOpen(false)}>Cancel</Button>
							<Button
								onClick={() => handleSaveEmail(updateEmail)}
								variant='contained'>
								Save
							</Button>
						</DialogActions>
					</Dialog>

					<Divider sx={{ mb: 3 }} />

					<Box sx={{ mb: 2 }}>
						<Typography
							variant='h6'
							sx={{ mb: 1 }}>
							Danger zone
						</Typography>
						<Paper sx={{ p: 3 }}>
							<Typography
								variant='body2'
								sx={{ color: 'text.secondary', mb: 2 }}>
								Deleting your account will remove all data associated with it. This action is irreversible.
							</Typography>
							<Button
								variant='outlined'
								color='error'
								onClick={handleOpenDelete}>
								Delete account
							</Button>
						</Paper>
					</Box>
				</TabPanel>

				<Dialog
					open={deleteOpen}
					onClose={handleCloseDelete}>
					<DialogTitle>Delete account</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to permanently delete your account? This action cannot be undone. If you proceed, your hosting
							projects, analytics data and invoices will be removed.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDelete}>Cancel</Button>
						<Button
							color='error'
							onClick={handleConfirmDelete}>
							Delete account
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</Box>
	);
}
