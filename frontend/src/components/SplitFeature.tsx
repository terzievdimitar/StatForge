import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface SplitFeatureProps {
	eyebrow?: string;
	title: React.ReactNode;
	description: React.ReactNode;
	chips?: string[];
	reverse?: boolean; // show image on left when true
}

const SplitFeature: React.FC<SplitFeatureProps> = ({ eyebrow, title, description, chips = [], reverse = false }) => {
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
						sx={{
							width: { xs: '100%', md: 520 },
							height: 380,
							borderRadius: 2,
							overflow: 'hidden',
							background: 'linear-gradient(135deg, rgba(235,94,40,0.95), rgba(145,45,181,0.95))',
							boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
						}}>
						{/* insert screenshot/frame inside here if needed */}
						<Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
							<Typography sx={{ fontWeight: 700 }}>Illustration</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default SplitFeature;
