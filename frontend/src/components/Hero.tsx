import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Hero: React.FC = () => {
	return (
		<>
			{/* Top pills */}
			<Stack
				direction='row'
				spacing={1.5}
				justifyContent='center'
				sx={{ mb: 4 }}>
				<Chip
					component='a'
					clickable
					href='https://www.producthunt.com/'
					target='_blank'
					label={
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							{/* NEW badge */}
							<Box
								sx={{
									bgcolor: 'primary.main',
									color: '#fff',
									px: 1,
									py: 0.2,
									borderRadius: 999,
									fontSize: 12,
									fontWeight: 700,
								}}>
								NEW
							</Box>

							{/* Text */}
							<Typography
								component='span'
								sx={{ fontSize: 14, fontWeight: 500, color: '#fff' }}>
								We just launched on ProductHunt!
							</Typography>

							{/* CTA */}
							<Typography
								component='span'
								sx={{ fontSize: 14, fontWeight: 600, color: 'primary.main', display: 'flex', alignItems: 'center' }}>
								View Launch <ArrowForwardIcon sx={{ fontSize: 16, ml: 0.5 }} />
							</Typography>
						</Box>
					}
					sx={{
						borderRadius: 999,
						px: 1.5,
						py: 0.5,
						bgcolor: 'linear-gradient(90deg, #2b0a3d, #3a0f2e, #1a0a1f)',
						'& .MuiChip-label': { px: 0 },
						textDecoration: 'none',
					}}
				/>
			</Stack>

			{/* Title */}
			<Typography
				variant='h1'
				align='center'
				sx={{
					fontSize: { xs: 38, sm: 52, md: 72 },
					lineHeight: 1.05,
					mb: 2,
					textShadow: '0 1px 0 rgba(0,0,0,.18)',
				}}>
				Unlock Your Digital Potential with
				<Box
					component='span'
					sx={{ color: 'primary.main' }}>
					{' '}
					StatForge
				</Box>{' '}
			</Typography>

			{/* Subtitle */}
			<Typography
				variant='h5'
				align='center'
				sx={{ maxWidth: 900, mx: 'auto', mb: 5 }}>
				StatForge provides tailored solutions for individuals, business owners, and entrepreneurs, simplifying everything from web hosting to
				advanced analytics and development.
			</Typography>

			{/* CTAs */}
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={2}
				justifyContent='center'
				alignItems='center'>
				<Button
					variant='contained'
					color='primary'
					endIcon={<ArrowForwardIcon />}
					href='/signup'
					sx={{
						boxShadow: '0 10px 24px rgba(235,94,40,.35)',
						'&:hover': { boxShadow: '0 12px 28px rgba(235,94,40,.45)' },
					}}>
					Get Started
				</Button>

				<Button
					variant='outlined'
					color='inherit'
					sx={{
						borderColor: 'rgba(255,255,255,0.18)',
						color: 'text.primary',
						bgcolor: 'rgba(255,255,255,0.04)',
						'&:hover': {
							borderColor: 'rgba(255,255,255,0.28)',
							bgcolor: 'rgba(255,255,255,0.08)',
						},
					}}>
					Learn More
				</Button>
			</Stack>
		</>
	);
};

export default Hero;
