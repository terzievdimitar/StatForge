import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
	{
		q: 'What is StatForge?',
		a: 'StatForge is a development and hosting platform that builds, deploys and maintains landing pages and small web products for teams.',
	},
	{
		q: 'Do you provide hosting?',
		a: 'Yes — we provide global hosting with CDN, automatic SSL, backups and scaling for production traffic.',
	},
	{
		q: 'Can you integrate analytics?',
		a: 'We can integrate analytics platforms, event tracking, dashboards and custom reports tailored to your product.',
	},
	{
		q: 'What makes StatForge different from other platforms?',
		a: 'Our platform provides tailored solutions with a focus on simplicity, scalability, and robust security for web hosting, development, and analytics, all in one ecosystem.',
	},
];

const FAQ: React.FC = () => {
	return (
		<Box sx={{ py: 8 }}>
			<Box sx={{ maxWidth: 900, mx: 'auto', textAlign: 'center', px: 2 }}>
				<Typography
					variant='overline'
					sx={{ color: 'primary.main', mb: 2 }}>
					GET YOUR QUESTIONS ANSWERED
				</Typography>

				<Typography
					variant='h3'
					sx={{ fontWeight: 800, mb: 2 }}>
					Frequently Asked Questions
				</Typography>

				<Typography
					variant='body1'
					sx={{ color: 'text.secondary', mb: 4 }}>
					Find answers to common questions about us and our services.
				</Typography>
			</Box>

			<Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
				{faqData.map((item, idx) => (
					<Accordion
						key={idx}
						sx={{ bgcolor: 'secondary.main', color: 'text.primary', mb: 2 }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}>
							<Typography sx={{ fontWeight: 600 }}>{item.q}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography sx={{ color: 'text.secondary' }}>{item.a}</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Box>
		</Box>
	);
};

export default FAQ;
