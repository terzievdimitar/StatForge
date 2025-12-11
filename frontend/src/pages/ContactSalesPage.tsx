import { Box, Container, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Stack, Alert } from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const jobLevels = ['Owner/Founder', 'Executive', 'Manager', 'Senior', 'Junior', 'Other'];
const jobFunctions = ['Developer', 'Product', 'Marketing', 'Sales', 'Operations', 'Other'];
const countries = ['Bulgaria', 'Denmark', 'Germany', 'France', 'Netherlands', 'Sweden', 'Other'];

const ContactSalesPage = () => {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		company: '',
		jobLevel: '',
		jobFunction: '',
		country: '',
		newsletter: false,
	});
	const [success, setSuccess] = useState(false);
	const [searchParams] = useSearchParams();
	const partnershipType = searchParams.get('partnership') || '';

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
		const { name, value, type, checked } = e.target as HTMLInputElement;
		setForm((prev) => ({
			...prev,
			[name as string]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }> | (Event & { target: { value: string; name: string } })) => {
		const target = event.target as HTMLInputElement | { name: string; value: string };
		const { name, value } = target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Integrate with backend API
		setSuccess(true);
	};

	return (
		<Box sx={{ py: 8 }}>
			<Container maxWidth='sm'>
				<Typography
					variant='h3'
					sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
					Contact us for the StatForge {partnershipType} partnership
				</Typography>
				<form onSubmit={handleSubmit}>
					<Stack spacing={2}>
						<Stack
							direction='row'
							spacing={2}>
							<TextField
								label='First Name'
								name='firstName'
								required
								fullWidth
								value={form.firstName}
								onChange={handleChange}
							/>
							<TextField
								label='Last Name'
								name='lastName'
								required
								fullWidth
								value={form.lastName}
								onChange={handleChange}
							/>
						</Stack>
						<TextField
							label='Phone'
							name='phone'
							required
							fullWidth
							value={form.phone}
							onChange={handleChange}
						/>
						<TextField
							label='Work Email'
							name='email'
							required
							fullWidth
							value={form.email}
							onChange={handleChange}
						/>
						<TextField
							label='Company'
							name='company'
							required
							fullWidth
							value={form.company}
							onChange={handleChange}
						/>
						<FormControl
							fullWidth
							required>
							<InputLabel>Select Your Job Level...</InputLabel>
							<Select
								name='jobLevel'
								value={form.jobLevel}
								label='Select Your Job Level...'
								onChange={handleSelectChange}>
								{jobLevels.map((level) => (
									<MenuItem
										key={level}
										value={level}>
										{level}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl
							fullWidth
							required>
							<InputLabel>Select Your Job Function...</InputLabel>
							<Select
								name='jobFunction'
								value={form.jobFunction}
								label='Select Your Job Function...'
								onChange={handleSelectChange}>
								{jobFunctions.map((func) => (
									<MenuItem
										key={func}
										value={func}>
										{func}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl
							fullWidth
							required>
							<InputLabel>Select Your Country...</InputLabel>
							<Select
								name='country'
								value={form.country}
								label='Select Your Country...'
								onChange={handleSelectChange}>
								{countries.map((c) => (
									<MenuItem
										key={c}
										value={c}>
										{c}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						{success && <Alert severity='success'>Success! We'll be in touch soon.</Alert>}
						<Button
							type='submit'
							variant='contained'
							color='primary'
							size='large'
							sx={{ mt: 2 }}>
							Submit
						</Button>
					</Stack>
				</form>
			</Container>
		</Box>
	);
};

export default ContactSalesPage;
