import { useState } from 'react';
import {
	Box,
	Container,
	Typography,
	Tabs,
	Tab,
	Card,
	CardContent,
	CardHeader,
	Button,
	Chip,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ToggleButton,
	ToggleButtonGroup,
	Divider,
	Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

type Billing = 'monthly' | 'yearly';

type Tier = {
	id: string;
	name: string;
	description: string;
	priceMonthly: number;
	priceYearly: number;
	cta: string;
	href: string;
	features: string[];
	highlighted?: boolean;
};

// Hosting / platform tiers (StatForge)
const HOSTING_TIERS: Tier[] = [
	{
		id: 'essential-hosting',
		name: 'Essential Hosting',
		description: 'For small agencies that want simple, reliable client hosting.',
		priceMonthly: 15, // billed monthly
		priceYearly: 12, // per month when billed annually (~€180/year)
		cta: 'Start Essential',
		href: '/signup',
		features: [
			'1 client site',
			'Git-based deployments (GitHub)',
			'Shared infrastructure & basic monitoring',
			'Free SSL & DDoS protection via Cloudflare',
			'Email support during business hours',
		],
	},
	{
		id: 'growth-hosting',
		name: 'Growth Hosting',
		description: 'For growing agencies that need staging, more sites, and smoother workflows.',
		priceMonthly: 29,
		priceYearly: 24, // per month when billed annually
		cta: 'Start Growth',
		href: '/signup',
		features: [
			'Up to 10 client sites',
			'Staging & production environments',
			'Custom domains per client project',
			'Automated backups',
			'Priority email support',
		],
		highlighted: true,
	},
	{
		id: 'agency-hosting',
		name: 'Agency Hosting',
		description: 'For established agencies that need scale, SLAs, and white-label options.',
		priceMonthly: 59,
		priceYearly: 48, // per month when billed annually
		cta: 'Contact Sales',
		href: '/contact',
		features: [
			'Unlimited client sites',
			'SLA, uptime guarantees & onboarding support',
			'Advanced deployment configuration',
			'Dedicated support channel',
		],
	},
];

// Custom development service (project-based, contract only)
export const DEVELOPMENT_PLANS: Tier[] = [
	{
		id: 'custom-development',
		name: 'Custom Development',
		description: 'Bespoke web development for complex client projects, built on top of StatForge.',
		priceMonthly: 0,
		priceYearly: 0,
		cta: 'Contact Sales',
		href: '/contact/sales?partnership=development',
		features: [
			'Custom frontends and API integrations',
			'Custom dashboards and client portals',
			'Performance optimisation and security hardening',
			'Migration from existing hosting providers',
			'Project-based contracts tailored to each agency',
		],
	},
];

// Analytics add-on tiers (sold separately from hosting)
const ANALYTICS_TIERS: Tier[] = [
	{
		id: 'essential-analytics',
		name: 'Essential Analytics',
		description: 'Privacy-friendly analytics for smaller portfolios.',
		priceMonthly: 10,
		priceYearly: 8, // per month when billed annually (~€96/year)
		cta: 'Add Analytics',
		href: '/signup',
		features: [
			'Up to 50k events per month',
			'3 dashboards per agency',
			'Basic traffic & device reports',
			'6 months data retention',
			'GDPR-friendly first-party tracking',
		],
	},
	{
		id: 'growth-analytics',
		name: 'Growth Analytics',
		description: 'Deeper insights for growing agencies and recurring clients.',
		priceMonthly: 25,
		priceYearly: 20,
		cta: 'Add Growth Analytics',
		href: '/signup',
		features: [
			'Up to 250k events per month',
			'Up to 10 dashboards',
			'Funnels & conversion tracking',
			'12 months data retention',
			'CSV export & API access',
		],
		highlighted: true,
	},
	{
		id: 'agency-analytics',
		name: 'Agency Analytics',
		description: 'Full analytics stack for high-traffic clients and premium agencies.',
		priceMonthly: 60,
		priceYearly: 48,
		cta: 'Talk to Sales',
		href: '/contact',
		features: [
			'1M+ events per month',
			'Unlimited dashboards',
			'Custom data retention & warehousing',
			'Advanced segmentation & reporting',
			'Priority support & onboarding workshop',
		],
	},
];

// White-label / partner program (rebrand StatForge)
export const WHITE_LABEL_PLANS: Tier[] = [
	{
		id: 'white-label-partner',
		name: 'White-Label Partner',
		description: 'Rebrand StatForge as your own infrastructure and offer it to your clients under your agency name.',
		priceMonthly: 0,
		priceYearly: 0,
		cta: 'Contact Sales',
		href: '/contact/sales?partnership=rebranding',
		features: [
			'Custom domain and agency branding on dashboard',
			'Co-branded or fully white-label client views',
			'Partner onboarding and technical consultation',
			'Volume-based pricing and revenue-sharing options',
			'Priority roadmap input for strategic partners',
		],
	},
];

const formatPrice = (amount: number) => (amount === 0 ? 'Free' : `$${amount}`);

function a11yProps(index: number) {
	return {
		id: `pricing-tab-${index}`,
		'aria-controls': `pricing-tabpanel-${index}`,
	};
}

const PricingPage = () => {
	const [billing, setBilling] = useState<Billing>('monthly');
	const [tabValue, setTabValue] = useState(0);

	const handleBilling = (_: unknown, value: Billing | null) => {
		if (value) setBilling(value);
	};

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.default',
				color: 'text.primary',
				minHeight: '100vh',
				overflowX: 'hidden',
			}}>
			{/* Header */}
			<Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
				<Container maxWidth='lg'>
					<Typography
						variant='overline'
						sx={{ color: 'primary.main', mb: 2, fontSize: 18 }}>
						PRICING
					</Typography>
					<Typography
						variant='h2'
						sx={{ fontWeight: 900, mb: 2 }}>
						Simple, transparent pricing
					</Typography>
					<Typography
						variant='body1'
						sx={{ color: 'text.secondary', maxWidth: 900 }}>
						Choose a plan that grows with you. Upgrade, downgrade, or cancel anytime.
					</Typography>

					{/* Service Tabs */}
					<Box sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							value={tabValue}
							onChange={handleTabChange}
							aria-label='pricing service tabs'
							sx={{ px: 2 }}
							textColor='primary'
							indicatorColor='primary'>
							<Tab
								label='Hosting'
								{...a11yProps(0)}
							/>
							<Tab
								label='Development'
								{...a11yProps(1)}
							/>
							<Tab
								label='Analytics'
								{...a11yProps(2)}
							/>
							<Tab
								label='Rebranding'
								{...a11yProps(3)}
							/>
						</Tabs>
					</Box>

					{/* Billing toggle */}
					<Stack
						direction='row'
						spacing={2}
						alignItems='center'
						sx={{ mt: 4 }}>
						<Typography
							variant='body2'
							sx={{ color: 'text.secondary' }}>
							Billing:
						</Typography>
						<ToggleButtonGroup
							exclusive
							value={billing}
							onChange={handleBilling}
							size='small'
							color='primary'>
							<ToggleButton value='monthly'>Monthly</ToggleButton>
							<ToggleButton value='yearly'>Yearly · Save 20%</ToggleButton>
						</ToggleButtonGroup>
					</Stack>
				</Container>
			</Box>

			{/* Plans - show for Hosting and Analytics tabs */}
			{tabValue === 0 && (
				<Container
					maxWidth='lg'
					sx={{ py: { xs: 6, md: 10 } }}>
					<Grid
						container
						spacing={3}>
						{HOSTING_TIERS.map((tier) => {
							const isYearly = billing === 'yearly';
							const price = isYearly ? tier.priceYearly : tier.priceMonthly;
							const subLabel = tier.priceMonthly === 0 ? '' : isYearly ? 'per month, billed yearly' : 'per month';
							return (
								<Grid
									key={tier.id}
									size={{ xs: 12, md: 4 }}>
									<Card
										elevation={tier.highlighted ? 6 : 2}
										sx={{ height: '100%', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
										{tier.highlighted && (
											<Chip
												label='Most Popular'
												color='primary'
												size='small'
												sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700 }}
											/>
										)}
										<CardHeader
											title={tier.name}
											subheader={tier.description}
											sx={{ '& .MuiCardHeader-title': { fontWeight: 800 } }}
										/>
										<CardContent>
											<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
												<Typography
													variant='h3'
													sx={{ fontWeight: 900 }}>
													{formatPrice(price)}
												</Typography>
												{subLabel && (
													<Typography
														variant='body2'
														sx={{ color: 'text.secondary' }}>
														{subLabel}
													</Typography>
												)}
											</Box>
											<Button
												fullWidth
												variant={tier.highlighted ? 'contained' : 'outlined'}
												color={tier.highlighted ? 'primary' : 'inherit'}
												href={tier.href}
												endIcon={<ArrowForwardIcon />}
												sx={{ mb: 2 }}>
												{tier.cta}
											</Button>
											<Divider sx={{ my: 2 }} />
											<List dense>
												{tier.features.map((f) => (
													<ListItem
														key={f}
														sx={{ py: 0.5 }}>
														<ListItemIcon sx={{ minWidth: 36 }}>
															<CheckCircleIcon
																color='primary'
																fontSize='small'
															/>
														</ListItemIcon>
														<ListItemText
															primaryTypographyProps={{ variant: 'body2' }}
															primary={f}
														/>
													</ListItem>
												))}
											</List>
										</CardContent>
									</Card>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			)}

			{tabValue === 1 && (
				<Container
					maxWidth='md'
					sx={{ py: { xs: 6, md: 10 } }}>
					<Card
						sx={{ borderRadius: 2 }}
						elevation={3}>
						<CardHeader
							title='Custom Development Services'
							subheader='Bespoke web development for complex client projects, built on top of StatForge.'
							sx={{ '& .MuiCardHeader-title': { fontWeight: 800 } }}
						/>
						<CardContent>
							<List dense>
								{DEVELOPMENT_PLANS[0].features.map((f) => (
									<ListItem
										key={f}
										sx={{ py: 0.5 }}>
										<ListItemIcon sx={{ minWidth: 36 }}>
											<CheckCircleIcon
												color='primary'
												fontSize='small'
											/>
										</ListItemIcon>
										<ListItemText
											primaryTypographyProps={{ variant: 'body2' }}
											primary={f}
										/>
									</ListItem>
								))}
							</List>
							<Button
								variant='contained'
								color='primary'
								href={DEVELOPMENT_PLANS[0].href}
								endIcon={<ArrowForwardIcon />}
								sx={{ mt: 3 }}>
								{DEVELOPMENT_PLANS[0].cta}
							</Button>
						</CardContent>
					</Card>
				</Container>
			)}

			{tabValue === 2 && (
				<Container
					maxWidth='lg'
					sx={{ py: { xs: 6, md: 10 } }}>
					<Grid
						container
						spacing={3}>
						{ANALYTICS_TIERS.map((tier) => {
							const isYearly = billing === 'yearly';
							const price = isYearly ? tier.priceYearly : tier.priceMonthly;
							const subLabel = tier.priceMonthly === 0 ? '' : isYearly ? 'per month, billed yearly' : 'per month';
							return (
								<Grid
									key={tier.id}
									size={{ xs: 12, md: 4 }}>
									<Card
										elevation={tier.highlighted ? 6 : 2}
										sx={{ height: '100%', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
										{tier.highlighted && (
											<Chip
												label='Most Popular'
												color='primary'
												size='small'
												sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700 }}
											/>
										)}
										<CardHeader
											title={tier.name}
											subheader={tier.description}
											sx={{ '& .MuiCardHeader-title': { fontWeight: 800 } }}
										/>
										<CardContent>
											<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
												<Typography
													variant='h3'
													sx={{ fontWeight: 900 }}>
													{formatPrice(price)}
												</Typography>
												{subLabel && (
													<Typography
														variant='body2'
														sx={{ color: 'text.secondary' }}>
														{subLabel}
													</Typography>
												)}
											</Box>
											<Button
												fullWidth
												variant={tier.highlighted ? 'contained' : 'outlined'}
												color={tier.highlighted ? 'primary' : 'inherit'}
												href={tier.href}
												endIcon={<ArrowForwardIcon />}
												sx={{ mb: 2 }}>
												{tier.cta}
											</Button>
											<Divider sx={{ my: 2 }} />
											<List dense>
												{tier.features.map((f) => (
													<ListItem
														key={f}
														sx={{ py: 0.5 }}>
														<ListItemIcon sx={{ minWidth: 36 }}>
															<CheckCircleIcon
																color='primary'
																fontSize='small'
															/>
														</ListItemIcon>
														<ListItemText
															primaryTypographyProps={{ variant: 'body2' }}
															primary={f}
														/>
													</ListItem>
												))}
											</List>
										</CardContent>
									</Card>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			)}

			{tabValue === 3 && (
				<Container
					maxWidth='md'
					sx={{ py: { xs: 6, md: 10 } }}>
					<Card
						sx={{ borderRadius: 2 }}
						elevation={3}>
						<CardHeader
							title='White-Label Partner Program'
							subheader='Rebrand StatForge as your own infrastructure and offer it to your clients under your agency name.'
							sx={{ '& .MuiCardHeader-title': { fontWeight: 800 } }}
						/>
						<CardContent>
							<List dense>
								{WHITE_LABEL_PLANS[0].features.map((f) => (
									<ListItem
										key={f}
										sx={{ py: 0.5 }}>
										<ListItemIcon sx={{ minWidth: 36 }}>
											<CheckCircleIcon
												color='primary'
												fontSize='small'
											/>
										</ListItemIcon>
										<ListItemText
											primaryTypographyProps={{ variant: 'body2' }}
											primary={f}
										/>
									</ListItem>
								))}
							</List>
							<Button
								variant='contained'
								color='primary'
								href={WHITE_LABEL_PLANS[0].href}
								endIcon={<ArrowForwardIcon />}
								sx={{ mt: 3 }}>
								{WHITE_LABEL_PLANS[0].cta}
							</Button>
						</CardContent>
					</Card>
				</Container>
			)}

			{/* FAQ */}
			<Container maxWidth='lg'>
				<FAQ />
			</Container>

			{/* CTA */}
			<Container maxWidth='lg'>
				<CallToAction />
			</Container>

			{/* Footer */}
			<Footer />
		</Box>
	);
};

export default PricingPage;
