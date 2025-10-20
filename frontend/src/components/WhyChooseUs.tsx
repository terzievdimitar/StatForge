import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FeatureCard from './FeatureCard';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { alpha } from '@mui/material/styles';

const WhyChooseUs: React.FC = () => {
	return (
		<Box>
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
					gridAutoRows: '1fr',
				}}>
				<Box sx={{ height: '100%' }}>
					<FeatureCard
						icon={<AutoFixHighIcon sx={{ fontSize: 44, bgcolor: 'primary.main', color: '#fff', borderRadius: 1, p: 1 }} />}
						title='Customizable'>
						Our developers customize layouts, styles, and interactions to match your brand and product requirements — we implement the
						design so you don't have to.
					</FeatureCard>
				</Box>

				<Box sx={{ height: '100%' }}>
					<FeatureCard
						icon={<ElectricBoltIcon sx={{ fontSize: 44, bgcolor: 'primary.main', color: '#fff', borderRadius: 1, p: 1 }} />}
						title='Fast Performance'>
						Our team optimizes performance and implements best practices for fast load times, caching and reliability so your users have
						a smooth experience.
					</FeatureCard>
				</Box>

				<Box sx={{ height: '100%' }}>
					<FeatureCard
						icon={<RocketLaunchIcon sx={{ fontSize: 44, bgcolor: 'primary.main', color: '#fff', borderRadius: 1, p: 1 }} />}
						title='Fully Featured'>
						Everything you need to succeed and launch your landing page, right out of the box. No need to install anything else.
					</FeatureCard>
				</Box>
			</Box>

			{/* Decorative gradient at the end of the section (full-bleed) */}
			<Box sx={{ width: '100vw', position: 'relative', left: '50%', ml: '-50vw' }}>
				<Box
					aria-hidden
					sx={(theme) => ({
						mt: 2,
						height: { xs: 60, md: 120 },
						width: '100%',
						background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${alpha(theme.palette.secondary.main, 0.12)} 45%, ${alpha(
							theme.palette.primary.main,
							0.8
						)} 100%)`,
					})}
				/>
			</Box>
		</Box>
	);
};

export default WhyChooseUs;
