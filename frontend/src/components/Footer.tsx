import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import StatForgeLogo from '../../public/icons/statforge-logo-light.svg';

const Footer: React.FC = () => {
	return (
		<Box
			component='footer'
			sx={{
				width: '100vw',
				position: 'relative',
				left: '50%',
				ml: '-50vw',
				mr: '-50vw',
				bgcolor: 'secondary.main',
				py: 8,
				borderTop: (t) => `1px solid ${t.palette.divider}`,
			}}>
			<Container maxWidth='lg'>
				<Grid
					container
					spacing={4}
					alignItems='flex-start'>
					<Grid size={{ xs: 12, md: 4 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<Box
								component='img'
								src={StatForgeLogo}
								alt='StatForge Logo'
								sx={{ mr: 1, width: 60, height: 60 }}
							/>
							<Typography
								variant='h6'
								sx={{ fontWeight: 800 }}>
								StatForge
							</Typography>
						</Box>

						<Typography sx={{ color: 'text.secondary', mb: 4 }}>
							Building the future of web development, one project at a time.
						</Typography>

						<Typography
							variant='caption'
							sx={{ color: 'text.secondary' }}>
							© 2025 StatForge. All rights reserved.
						</Typography>
					</Grid>

					<Grid size={{ xs: 6, sm: 4, md: 2 }}>
						<Typography
							variant='overline'
							sx={{ color: 'primary.main', mb: 2, display: 'block' }}>
							PAGES
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Features
							</Link>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Pricing
							</Link>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Blog
							</Link>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								FAQ
							</Link>
						</Box>
					</Grid>

					<Grid size={{ xs: 6, sm: 4, md: 2 }}>
						<Typography
							variant='overline'
							sx={{ color: 'primary.main', mb: 2, display: 'block' }}>
							SUPPORT
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Check Uptime
							</Link>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Request Feedback
							</Link>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Submit Bugs
							</Link>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Contact Us
							</Link>
						</Box>
					</Grid>

					<Grid size={{ xs: 6, sm: 4, md: 2 }}>
						<Typography
							variant='overline'
							sx={{ color: 'primary.main', mb: 2, display: 'block' }}>
							LEGAL
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Imprint
							</Link>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Privacy Policy
							</Link>
							<Link
								href='#'
								underline='none'
								sx={{ color: 'text.secondary' }}>
								Cookies
							</Link>
						</Box>
					</Grid>

					<Grid size={{ xs: 12, sm: 12, md: 2 }}>
						<Typography
							variant='overline'
							sx={{ color: 'primary.main', mb: 2, display: 'block' }}>
							CONTACT
						</Typography>

						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
								<EmailOutlinedIcon fontSize='small' />
								<Typography sx={{ color: 'text.secondary' }}>contact@statforge.com</Typography>
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
								<TwitterIcon fontSize='small' />
								<Typography sx={{ color: 'text.secondary' }}>Twitter</Typography>
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
								<FacebookIcon fontSize='small' />
								<Typography sx={{ color: 'text.secondary' }}>Facebook</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Footer;
