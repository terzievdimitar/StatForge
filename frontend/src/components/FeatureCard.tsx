import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children }) => {
	return (
		<Paper
			elevation={0}
			sx={{
				bgcolor: 'rgba(255,255,255,0.02)',
				border: '1px solid rgba(255,255,255,0.03)',
				borderRadius: 2,
				p: 6,
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start',
			}}>
			<Box sx={{ mb: 3 }}>{icon}</Box>
			<Typography
				variant='h6'
				sx={{ mb: 2 }}>
				{title}
			</Typography>
			<Typography
				variant='body1'
				sx={{ textAlign: 'center', color: 'text.secondary' }}>
				{children}
			</Typography>
		</Paper>
	);
};

export default FeatureCard;
