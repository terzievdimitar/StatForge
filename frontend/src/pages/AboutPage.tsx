import { Box, Card, CardContent, CardMedia } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import DimitarTerziev from '../assets/team/Dimitar-Terziev.webp';
import MarinNikolov from '../assets/team/Marin-Nikolov.webp';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const team = [
	{ name: 'Dimitar Terziev', image: DimitarTerziev, title: 'Co‑founder' },
	{ name: 'Marin Nikolov', image: MarinNikolov, title: 'Co‑founder' },
];

const values = [
	{ title: 'Reliability', desc: 'We build systems that just work — fast, secure and resilient.' },
	{ title: 'Developer-first', desc: 'APIs, tools and workflows friendly to engineers and teams.' },
	{ title: 'Privacy & Security', desc: 'We prioritize user data privacy and strong security practices.' },
	{ title: 'Transparency', desc: 'Clear pricing, honest communication and measurable SLAs.' },
];

const AboutPage = () => {
	return (
		<Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', overflowX: 'hidden' }}>
			{/* Hero */}
			<Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
				<Container maxWidth='lg'>
					<Typography
						variant='overline'
						sx={{ color: 'primary.main', mb: 2, fontSize: 18 }}>
						ABOUT US
					</Typography>
					<Typography
						variant='h2'
						sx={{ fontWeight: 900, mb: 2 }}>
						We make product-focused hosting and analytics for teams
					</Typography>
					<Typography
						variant='body1'
						sx={{ color: 'text.secondary', maxWidth: 900 }}>
						StatForge helps teams ship and run reliable web products. We combine hosting, analytics and developer services into a
						single, easy to use platform so your team can focus on building product, not infrastructure.
					</Typography>
				</Container>
			</Box>

			<Container
				maxWidth='lg'
				sx={{ py: { xs: 6, md: 10 } }}>
				{/* Mission */}
				<Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', mb: 6, flexDirection: { xs: 'column', md: 'row' } }}>
					<Box sx={{ flex: 1 }}>
						<Typography
							variant='h4'
							sx={{ fontWeight: 800, mb: 2 }}>
							Our mission
						</Typography>
						<Typography
							variant='body1'
							sx={{ color: 'text.secondary' }}>
							We empower product teams with a platform that simplifies hosting, monitoring and analytics — so teams can move faster
							and build with confidence.
						</Typography>
					</Box>

					<Box sx={{ width: { xs: '100%', md: 420 } }}>
						<Card
							elevation={3}
							sx={{ borderRadius: 2 }}>
							<CardContent>
								<Typography
									variant='h6'
									sx={{ fontWeight: 700, mb: 1 }}>
									How we work
								</Typography>
								<Typography
									variant='body2'
									sx={{ color: 'text.secondary', mb: 2 }}>
									Small cross-functional teams, short feedback loops, and an obsession with reliability and developer
									experience.
								</Typography>
								<Chip
									label='Customer first'
									sx={{ mr: 1, mb: 1 }}
								/>
								<Chip
									label='CI/CD'
									sx={{ mr: 1, mb: 1 }}
								/>
								<Chip
									label='Observability'
									sx={{ mb: 1 }}
								/>
							</CardContent>
						</Card>
					</Box>
				</Box>

				{/* Values */}
				<Box sx={{ mb: 6 }}>
					<Typography
						variant='h4'
						sx={{ fontWeight: 800, mb: 4 }}>
						What we value
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
							gap: 3,
						}}>
						{values.map((v) => (
							<Box
								key={v.title}
								sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper', height: '100%' }}>
								<Typography
									variant='h6'
									sx={{ fontWeight: 700, mb: 1 }}>
									{v.title}
								</Typography>
								<Typography
									variant='body2'
									sx={{ color: 'text.secondary' }}>
									{v.desc}
								</Typography>
							</Box>
						))}
					</Box>
				</Box>

				{/* Team */}
				<Box sx={{ mb: 6 }}>
					<Typography
						variant='h4'
						sx={{ fontWeight: 800, mb: 4 }}>
						Meet the team
					</Typography>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
							gap: 3,
						}}>
						{team.map((teamMember) => (
							<Card
								key={teamMember.name}
								elevation={2}
								sx={{ borderRadius: 2 }}>
								<CardActionArea>
									<CardMedia
										component='img'
										height='240'
										image={teamMember.image}
										alt={teamMember.name}
									/>
									<CardContent>
										<Typography
											gutterBottom
											variant='h5'
											component='div'
											sx={{ fontWeight: 700 }}>
											{teamMember.name}
										</Typography>
										<Typography
											variant='body2'
											sx={{ color: 'text.secondary' }}>
											{teamMember.title} — experienced in building and operating web applications and
											infrastructure.
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						))}
					</Box>
				</Box>

				{/* CTA */}
				<Box sx={{ mt: 4 }}>
					<CallToAction />
				</Box>
			</Container>

			<Footer />
		</Box>
	);
};

export default AboutPage;
