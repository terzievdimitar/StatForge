import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const LandingPage = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: `linear-gradient(to right, rgba(79, 79, 79, 0.18) 1px, transparent 1px), 
                                          linear-gradient(to bottom, rgba(79, 79, 79, 0.18) 1px, transparent 1px)`,
				backgroundSize: '14px 24px',
				maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 140%)',
			}}>
			<Box
				sx={{
					position: 'absolute',
					top: '32%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					textAlign: 'center',
				}}>
				<Typography
					variant='h3'
					component='h1'
					gutterBottom>
					Welcome to StatForge
				</Typography>
				<Typography
					variant='h5'
					component='h2'
					gutterBottom>
					Your platform for hosting, website development, and analytics
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
					<Button
						variant='contained'
						color='primary'>
						Get Started
					</Button>
					<Button
						variant='outlined'
						color='primary'>
						Learn More
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default LandingPage;
