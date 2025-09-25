import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useUserStore } from '../stores/useUserStore';

const Signup = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form data:', formData);
		signup(formData.name, formData.email, formData.password);
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
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						fullWidth
						margin='normal'
						required
					/>
					<TextField
						label='Email'
						name='email'
						type='email'
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						fullWidth
						margin='normal'
						required
					/>
					<TextField
						label='Password'
						name='password'
						type='password'
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
						{loading ? (
							<Typography
								variant='body1'
								sx={{ mt: 2 }}>
								Signing up...
							</Typography>
						) : (
							'Signup'
						)}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Signup;
