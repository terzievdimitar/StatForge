import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { alpha } from '@mui/material/styles';

interface SplitFeatureProps {
	eyebrow?: string;
	title: React.ReactNode;
	description: React.ReactNode;
	chips?: string[];
	reverse?: boolean; // show image on left when true
	illustration?: string;
}

const SplitFeature: React.FC<SplitFeatureProps> = ({ eyebrow, title, description, chips = [], reverse = false, illustration }) => {
	return (
		<Box sx={{ py: 8 }}>
			<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: reverse ? '1fr 560px' : '560px 1fr' }, gap: 6, alignItems: 'center' }}>
				{/* Left column (content) or right depending on reverse */}
				<Box sx={{ order: reverse ? 2 : 1 }}>
					{eyebrow && (
						<Typography
							variant='overline'
							sx={{ color: 'primary.main', mb: 1, fontSize: 18 }}>
							{eyebrow}
						</Typography>
					)}

					<Typography
						variant='h3'
						sx={{ fontWeight: 800, mb: 2 }}>
						{title}
					</Typography>

					<Typography
						variant='body1'
						sx={{ color: 'text.secondary', mb: 3 }}>
						{description}
					</Typography>

					<Stack
						direction='row'
						spacing={1}
						flexWrap='wrap'
						sx={{ mb: 3 }}>
						{chips.map((c) => (
							<Chip
								key={c}
								label={c}
								clickable
								size='small'
								sx={{ mr: 1, mb: 1 }}
							/>
						))}
					</Stack>

					<Button
						variant='contained'
						color='primary'
						endIcon={<ArrowForwardIcon />}
						href='/signup'>
						Get Started
					</Button>
				</Box>

				{/* Right column - gradient card placeholder */}
				<Box sx={{ order: reverse ? 1 : 2, display: 'flex', justifyContent: 'center' }}>
					<Box
						sx={(theme) => ({
							width: { xs: '100%', md: 520 },
							height: 380,
							borderRadius: 2,
							overflow: 'hidden',
							background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.5)},  rgba(28, 15, 8, 1))`,
							boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
						})}>
						{/* insert screenshot/frame inside here if needed */}
						<Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
							<img
								src={illustration ? illustration : ''}
								alt='Solution screenshot'
								style={{ width: '80%', objectFit: 'contain' }}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default SplitFeature;
