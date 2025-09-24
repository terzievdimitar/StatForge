import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from '../lib/axios';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await axios.post('/auth/login', formData);
			setSuccess('Login successful!');
			setError('');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Login failed');
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
					Login
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit}
					sx={{
						width: '100%',
						mt: 2,
					}}>
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
						Login
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

export default Login;
