import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FeatureCard from './FeatureCard';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const WhyChooseUs: React.FC = () => {
	return (
		<Box sx={{ mt: 10, mb: 12 }}>
			<Typography
				align='center'
				variant='overline'
				sx={{ color: 'primary.main', display: 'block', mb: 2, fontSize: 18 }}>
				WHY CHOOSE US
			</Typography>

			<Typography
				align='center'
				variant='h4'
				sx={{ fontWeight: 800, mb: 2, fontSize: { xs: 28, sm: 32, md: 36 } }}>
				Build a Website That Your Customers Love
			</Typography>

			<Typography
				align='center'
				variant='body1'
				sx={{ maxWidth: 900, mx: 'auto', color: 'text.secondary', mb: 6 }}>
				Our templates allow for maximum customization. No technical skills required – our intuitive design tools let you get the job done
				easily.
			</Typography>

			<Box
				sx={{
					display: 'grid',
					gap: 4,
					gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
				}}>
				<Box>
					<FeatureCard
						icon={<AutoFixHighIcon sx={{ fontSize: 44, bgcolor: 'primary.main', color: '#fff', borderRadius: 1, p: 1 }} />}
						title='Customizable'>
						Tailor your landing page's look and feel, from the color scheme to the font size, to the design of the page.
					</FeatureCard>
				</Box>

				<Box>
					<FeatureCard
						icon={<ElectricBoltIcon sx={{ fontSize: 44, bgcolor: 'primary.main', color: '#fff', borderRadius: 1, p: 1 }} />}
						title='Fast Performance'>
						We build our templates for speed in mind, for super-fast load times so your customers never waver.
					</FeatureCard>
				</Box>

				<Box>
					<FeatureCard
						icon={<RocketLaunchIcon sx={{ fontSize: 44, bgcolor: 'primary.main', color: '#fff', borderRadius: 1, p: 1 }} />}
						title='Fully Featured'>
						Everything you need to succeed and launch your landing page, right out of the box. No need to install anything else.
					</FeatureCard>
				</Box>
			</Box>
		</Box>
	);
};

export default WhyChooseUs;
