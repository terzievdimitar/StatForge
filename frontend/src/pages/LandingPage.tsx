import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { colors } from '../theme/theme';

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
				{/* Top pills */}
				<Stack
					direction='row'
					spacing={1.5}
					justifyContent='center'
					sx={{ mb: 4 }}>
					<Chip
						label='New snippets'
						size='small'
						sx={{
							bgcolor: 'rgba(255,255,255,0.06)',
							color: 'text.primary',
							borderRadius: 999,
							px: 1,
							'& .MuiChip-label': { fontWeight: 600 },
						}}
					/>
					<Chip
						label='Read more'
						size='small'
						sx={{
							bgcolor: 'rgba(255,255,255,0.06)',
							color: 'text.primary',
							borderRadius: 999,
							px: 1,
							'& .MuiChip-label': { fontWeight: 600 },
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
					StatForge provides tailored solutions for individuals, business owners, and entrepreneurs, simplifying everything from web hosting
					to advanced analytics and development.
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
						sx={{
							boxShadow: '0 10px 24px rgba(235,94,40,.35)',
							'&:hover': { boxShadow: '0 12px 28px rgba(235,94,40,.45)' },
						}}>
						Go to GitHub
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
			</Container>
		</Box>
	);
};

export default LandingPage;
