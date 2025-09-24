import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from '../lib/axios';

const Signup = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await axios.post('/auth/signup', formData);
			setSuccess('Signup successful!');
			setError('');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Signup failed');
			setSuccess('');
		}
	};

	return (
		<Container maxWidth='sm'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					mt: 4,
				}}>
				<Typography
					variant='h4'
					component='h1'
					gutterBottom>
					Signup
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					sx={{
						width: '100%',
						mt: 2,
					}}>
					<TextField
						label='Name'
						name='name'
						value={formData.name}
						onChange={handleChange}
						fullWidth
						margin='normal'
						required
					/>
					<TextField
						label='Email'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						fullWidth
						margin='normal'
						required
					/>
					<TextField
						label='Password'
						name='password'
						type='password'
						value={formData.password}
						onChange={handleChange}
						fullWidth
						margin='normal'
						required
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						fullWidth
						sx={{ mt: 2 }}>
						Signup
					</Button>
				</Box>
				{error && (
					<Typography
						color='error'
						sx={{ mt: 2 }}>
						{error}
					</Typography>
				)}
				{success && (
					<Typography
						color='success.main'
						sx={{ mt: 2 }}>
						{success}
					</Typography>
				)}
			</Box>
		</Container>
	);
};

export default Signup;
