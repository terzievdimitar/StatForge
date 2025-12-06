import { Box, Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const StillInDevelopment = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: '100vh',
			p: 4,
		}}>
		<ConstructionIcon sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
		<Typography
			variant='h4'
			sx={{ fontWeight: 700, mb: 1 }}>
			Still in Development
		</Typography>
		<Typography
			variant='body1'
			sx={{ color: 'text.secondary' }}>
			This feature is coming soon. Stay tuned!
		</Typography>
	</Box>
);

export default StillInDevelopment;
