import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, CircularProgress } from '@mui/material';
import { colors } from '../theme/theme';
import { useUserStore } from '../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const { login, loading } = useUserStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null); // Reset error before attempting login
		try {
			await login(formData.email, formData.password);
			navigate('/dashboard/overview');
		} catch (err: any) {
			setError(err.message || 'An error occurred during login'); // Display error message
		}
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
						Login
					</Typography>
					<Typography
						variant='body1'
						sx={{
							color: colors.sand,
							marginBottom: 2,
						}}>
						Sign in to continue.
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						sx={{
							width: '100%',
							marginTop: 2,
						}}>
						<TextField
							label='Email Address'
							name='email'
							type='email'
							value={formData.email}
							onChange={handleChange}
							fullWidth
							margin='normal'
							variant='outlined'
						/>
						<TextField
							label='Password'
							name='password'
							type='password'
							value={formData.password}
							onChange={handleChange}
							fullWidth
							margin='normal'
							variant='outlined'
						/>
						{error && (
							<Typography
								variant='body2'
								color='error'
								sx={{ marginTop: 2, textAlign: 'center' }}>
								{error}
							</Typography>
						)}
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
									Logging In...
								</>
							) : (
								'Login'
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
				Don't have an account?{' '}
				<a
					href='/signup'
					style={{
						color: colors.accent,
						textDecoration: 'none',
						fontWeight: 'bold',
					}}>
					Sign up here
				</a>
			</Typography>
		</Container>
	);
};

export default Login;
