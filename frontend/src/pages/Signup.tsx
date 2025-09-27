import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { useUserStore } from '../stores/useUserStore';
import { colors } from '../theme/theme';

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
			<Paper
				elevation={3}
				sx={{
					padding: 4,
					marginTop: 8,
					borderRadius: 2,
					backgroundColor: colors.stone,
					color: colors.cream,
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Typography
						variant='h4'
						component='h1'
						gutterBottom
						sx={{
							color: colors.accent,
							fontWeight: 'bold',
						}}>
						Create an Account
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: colors.sand,
							marginBottom: 2,
						}}>
						Sign up to access all features.
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						sx={{
							width: '100%',
							marginTop: 2,
						}}>
						<TextField
							label='Full Name'
							name='name'
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							fullWidth
							margin='normal'
							variant='outlined'
						/>
						<TextField
							label='Email Address'
							name='email'
							type='email'
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							fullWidth
							margin='normal'
							variant='outlined'
						/>
						<TextField
							label='Password'
							name='password'
							type='password'
							value={formData.password}
							onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							fullWidth
							margin='normal'
							variant='outlined'
						/>

						<Button
							type='submit'
							variant='contained'
							color='primary'
							fullWidth
							sx={{
								marginTop: 3,
								paddingY: 1.5,
								fontWeight: 'bold',
								fontSize: '1rem',
							}}
							disabled={loading}>
							{loading ? (
								<>
									<CircularProgress
										size={20}
										sx={{ color: 'white', marginRight: 1 }}
									/>
									Signing Up...
								</>
							) : (
								'Sign Up'
							)}
						</Button>
					</Box>
				</Box>
			</Paper>
			<Typography
				variant='body2'
				align='center'
				sx={{
					marginTop: 2,
					color: colors.sand,
				}}>
				Already have an account?{' '}
				<a
					href='/login'
					style={{
						color: colors.accent,
						textDecoration: 'none',
						fontWeight: 'bold',
					}}>
					Login here
				</a>
			</Typography>
		</Container>
	);
};

export default Signup;
