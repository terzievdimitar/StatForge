import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import StatForgeLogo from '../../public/icons/statforge-logo-light.svg';

export default function CircularIndeterminate() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh', // Full viewport height
			}}>
			<Box
				component='img'
				src={StatForgeLogo}
				alt='StatForge Logo'
				sx={{ width: 100, height: 100, mb: 1 }}
			/>
			<CircularProgress />
		</Box>
	);
}
