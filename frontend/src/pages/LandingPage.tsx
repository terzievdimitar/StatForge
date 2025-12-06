import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import { colors } from '../theme/theme';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import TrustedBy from '../components/TrustedBy';
import SplitFeature from '../components/SplitFeature';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import hostingSvg from '../assets/landing-page/hosting.svg';
import developmentSvg from '../assets/landing-page/development.svg';
import analyticsSvg from '../assets/landing-page/analytics.svg';

const LandingPage = () => {
	const location = useLocation();

	useEffect(() => {
		// When navigated to with a hash (e.g. /#features or /#faq), scroll to the element accounting for fixed AppBar
		if (location.hash) {
			const id = location.hash.replace('#', '');
			const el = document.getElementById(id);
			if (el) {
				const toolbar = document.querySelector('.MuiToolbar-root') as HTMLElement | null;
				const offset = toolbar ? toolbar.offsetHeight : 64;
				const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 16;
				window.scrollTo({ top, behavior: 'smooth' });
			}
		}
	}, [location]);
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

			<Container sx={{ py: { xs: 10, md: 16 }, position: 'relative' }}>
				<Hero />
			</Container>

			{/* Full-bleed trusted logos */}
			<TrustedBy />

			<Container sx={{ py: { xs: 10, md: 12 }, position: 'relative' }}>
				{/* Why choose us section */}
				<WhyChooseUs />
				<Box id='products'></Box>
				<SplitFeature
					eyebrow='HOSTING'
					title={<>Reliable Web Hosting</>}
					description={
						<>
							We provision and manage fast, secure hosting for your sites — global CDN, automatic SSL, backups and scaling so your
							product stays reliable under load.
						</>
					}
					chips={['Global CDN', 'Automatic SSL', 'Backups & Restore', 'Autoscaling']}
					illustration={hostingSvg}
				/>

				<SplitFeature
					reverse
					eyebrow='DEVELOPMENT'
					title={<>Custom Development Services</>}
					description={
						<>
							Our engineering team builds and integrates the custom features you need: from frontend UIs to backend APIs and CI/CD
							pipelines that deploy automatically.
						</>
					}
					chips={['Frontend & Backend', 'CI/CD Pipelines', 'Third‑party Integrations']}
					illustration={developmentSvg}
				/>

				<SplitFeature
					eyebrow='ANALYTICS'
					title={<>Product Analytics & Insights</>}
					description={
						<>
							We integrate analytics, dashboards and monitoring to surface user behaviour and performance metrics so you can make
							informed decisions.
						</>
					}
					chips={['Event Tracking', 'Dashboards', 'Performance Monitoring', 'A/B Experiments']}
					illustration={analyticsSvg}
				/>

				{/* FAQ Section */}
				<FAQ />

				{/* Call to Action Section */}
				<CallToAction />
			</Container>
			{/* Footer */}
			<Footer />
		</Box>
	);
};

export default LandingPage;
