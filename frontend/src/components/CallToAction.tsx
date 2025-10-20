import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';

const CallToAction: React.FC = () => {
	return (
		<Box sx={{ width: '100%', my: 6 }}>
			{/* keep full-bleed on wide screens but add small horizontal padding on xs so it doesn't touch the viewport */}
			<Box sx={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
				<Box sx={{ px: { xs: 2, sm: 4, md: 0 } }}>
					<Box
						sx={(theme) => ({
							mx: 'auto',
							maxWidth: 1200,
							borderRadius: 2,
							p: { xs: 4, md: 6 },
							// brighter inner gradient: increase theme color alpha and reduce dark overlay
							background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.5)}, ${alpha(
								theme.palette.secondary.main,
								0.8
							)}, rgba(0,0,0,0.3))`,
							// use a solid border color from the theme instead of the gradient ::before
							border: `4px solid ${alpha(theme.palette.primary.main, 0.75)}`,
							backgroundClip: 'padding-box',
							position: 'relative',
							overflow: 'hidden',
						})}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', justifyContent: 'space-between' }}>
							<Box sx={{ flex: 1, minWidth: 320 }}>
								<Typography
									variant='h3'
									sx={{ fontWeight: 800, mb: 2 }}>
									Get Started Today
									<br />
									with StatForge!
								</Typography>

								<Typography
									variant='body1'
									sx={{ color: 'text.secondary', mb: 2 }}>
									Get started today with our easy-to-use platform! Whether you need hosting, development, or analytics,
									StatForge offers flexible and scalable solutions to meet your needs.
								</Typography>
							</Box>

							<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
								<Button
									variant='contained'
									color='primary'
									sx={{ px: 4, py: 1.6 }}>
									Get Started
								</Button>
								<Button
									variant='outlined'
									sx={{ px: 4, py: 1.6, color: 'text.primary', borderColor: 'rgba(255,255,255,0.08)' }}>
									Learn More
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default CallToAction;
