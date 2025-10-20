import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import outsetaLogo from '../assets/company-logos/Outseta.svg';
import slackLogo from '../assets/company-logos/Slack.svg';
import pipedriveLogo from '../assets/company-logos/Pipedrive.svg';
import mailchimpLogo from '../assets/company-logos/Mailchimp.svg';
import makeLogo from '../assets/company-logos/Make.svg';
import mastodonLogo from '../assets/company-logos/Mastodon.svg';
import mondaycomLogo from '../assets/company-logos/Mondaycom.svg';

const logos = [slackLogo, outsetaLogo, pipedriveLogo, mailchimpLogo, makeLogo, mastodonLogo, mondaycomLogo];

const TrustedBy: React.FC = () => {
	return (
		// full-bleed wrapper (uses 100vw and negative offset to avoid container padding)
		<Box sx={{ width: '100vw', position: 'relative', left: '50%', ml: '-50vw', mr: '-50vw', bgcolor: 'secondary.main' }}>
			<Box
				sx={{
					textAlign: 'center',
					borderTop: '1px solid rgba(255,255,255,0.06)',
					borderBottom: '1px solid rgba(255,255,255,0.06)',
					pt: 6,
					pb: 6,
					width: '100%',
				}}>
				<Typography
					variant='h5'
					sx={{ fontWeight: 500, mb: 4, color: 'text.primary' }}>
					Trusted by ambitious teams and companies worldwide
				</Typography>

				<Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
					{logos.map((src, i) => (
						<Avatar
							key={i}
							variant='square'
							src={src}
							alt={`logo-${i}`}
							sx={{
								width: { xs: 80, md: 160 },
								height: { xs: 28, md: 40 },
								bgcolor: 'transparent',
								boxShadow: 'none',
							}}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default TrustedBy;
