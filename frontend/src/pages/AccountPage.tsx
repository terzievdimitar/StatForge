import { useState, useEffect, Fragment } from 'react';
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
	Snackbar,
	Alert,
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
	const [value, setValue] = useState(0);
	const [email, setEmail] = useState('');
	const [updateOpen, setUpdateOpen] = useState(false);
	const [updateEmail, setUpdateEmail] = useState('');
	const [deleting, setDeleting] = useState(false);

	// saving & snackbar state for email updates
	const [savingEmail, setSavingEmail] = useState(false);
	const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
		open: false,
		message: '',
		severity: 'success',
	});

	const { user } = useUserStore();
	const navigate = useNavigate();
	const [deleteOpen, setDeleteOpen] = useState(false);

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

	const handleSaveEmail = async (newEmailParam?: string) => {
		const targetEmail = newEmailParam ?? updateEmail ?? email;

		// basic validation
		const emailIsValid = typeof targetEmail === 'string' && /^\S+@\S+\.\S+$/.test(targetEmail);
		if (!emailIsValid) {
			setSnackbar({ open: true, message: 'Invalid email format', severity: 'error' });
			console.error('Invalid email:', targetEmail);
			return;
		}

		try {
			setSavingEmail(true);
			// send payload key the server expects
			await axios.put('/auth/update-email', { newEmail: targetEmail });
			// reset/close UI
			setUpdateOpen(false);
			setUpdateEmail(''); // clear input
			useUserStore.setState({ user: { ...user!, email: targetEmail } });
			// show success snackbar
			setSnackbar({ open: true, message: 'Email updated', severity: 'success' });
		} catch (err) {
			console.error('Failed to update email', err);
			setSnackbar({ open: true, message: 'Failed to update email', severity: 'error' });
		} finally {
			setSavingEmail(false);
		}
	};

	const handleOpenDelete = () => setDeleteOpen(true);
	const handleCloseDelete = () => setDeleteOpen(false);
	const handleConfirmDelete = async () => {
		setDeleting(true);
		try {
			// call protected backend endpoint
			await axios.delete('/auth/delete');

			// optionally: server may already clear cookies and return 200
			// make sure the client clears local user state
			useUserStore.setState({ user: null });

			// show success snackbar, then redirect
			setSnackbar({ open: true, message: 'Account deleted', severity: 'success' });
			navigate('/');
		} catch (err: any) {
			// show server-provided message if available
			const msg = err?.response?.data?.message ?? 'Failed to delete account';
			console.error('Failed to delete account', err);
			setSnackbar({ open: true, message: msg, severity: 'error' });
		} finally {
			setDeleting(false);
			setDeleteOpen(false);
		}
	};

	const handleCloseSnackbar = (_event?: Event | React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') return;
		setSnackbar((s) => ({ ...s, open: false }));
	};

	useEffect(() => {
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
								<Fragment key={inv.id}>
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
								</Fragment>
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
								variant='contained'
								disabled={savingEmail}>
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

				{/* Global snackbars for success / error feedback */}
				<Snackbar
					open={snackbar.open}
					autoHideDuration={6000}
					onClose={handleCloseSnackbar}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
					<Alert
						onClose={handleCloseSnackbar}
						severity={snackbar.severity}
						sx={{ width: '100%' }}>
						{snackbar.message}
					</Alert>
				</Snackbar>

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
							onClick={() => handleConfirmDelete()}
							disabled={deleting}>
							{deleting ? 'Deleting...' : 'Delete account'}
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</Box>
	);
}
