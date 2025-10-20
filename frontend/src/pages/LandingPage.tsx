import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { colors } from '../theme/theme';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';

const LandingPage = () => {
	return (
		<Box
			sx={{
				position: 'relative',
				bgcolor: 'background.default',
				color: 'text.primary',
				overflow: 'hidden',
			}}>
			{/* Subtle radial/linear background */}
			<Box
				aria-hidden
				sx={{
					position: 'absolute',
					inset: 0,
					background: `
			radial-gradient(1200px 600px at 50% -10%, ${colors.stone} 0%, transparent 55%),
			linear-gradient(180deg, rgba(37,36,34,0) 0%, rgba(37,36,34,.75) 60%, ${colors.coal} 100%)
		  `,
					pointerEvents: 'none',
				}}
			/>

			<Container
				maxWidth='lg'
				sx={{ py: { xs: 10, md: 16 }, position: 'relative' }}>
				<Hero />
				{/* Why choose us section */}
				<WhyChooseUs />
			</Container>
		</Box>
	);
};

export default LandingPage;
