import { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	Grid,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	FormControl, // Added for the selector
	InputLabel, // Added for the selector
	Select, // Added for the selector
	MenuItem, // Added for the selector
	CircularProgress, // Optional: for loading state visualization
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// --- Type Definitions ---
type SiteId = 'site1' | 'site2' | 'site3';

interface TrafficDatum {
	name: string;
	value: number;
	[key: string]: string | number; // Add index signature for recharts compatibility
}

interface PageViewDatum {
	date: string;
	views: number;
}

interface EventDatum {
	event: string;
	count: number;
}

interface AnalyticsData {
	trafficData: TrafficDatum[];
	pageViewsData: PageViewDatum[];
	eventsTable: EventDatum[];
}

// --- Mock Data for Multiple Websites ---
const mockSites: { id: SiteId; name: string }[] = [
	{ id: 'site1', name: 'StatForge.com (Primary)' },
	{ id: 'site2', name: 'Agency-Client-A.net' },
	{ id: 'site3', name: 'E-commerce-Shop.org' },
];

// Mock backend data structure grouped by site ID
const mockAnalyticsData: Record<SiteId, AnalyticsData> = {
	site1: {
		trafficData: [
			{ name: 'Desktop', value: 400 },
			{ name: 'Mobile', value: 300 },
			{ name: 'Tablet', value: 100 },
		],
		pageViewsData: [
			{ date: '2025-12-10', views: 120 },
			{ date: '2025-12-11', views: 200 },
			{ date: '2025-12-12', views: 150 },
			{ date: '2025-12-13', views: 180 },
			{ date: '2025-12-14', views: 220 },
		],
		eventsTable: [
			{ event: 'Page View', count: 870 },
			{ event: 'Button Click', count: 120 },
			{ event: 'Form Submit', count: 35 },
		],
	},
	site2: {
		trafficData: [
			{ name: 'Desktop', value: 150 },
			{ name: 'Mobile', value: 500 },
			{ name: 'Tablet', value: 50 },
		],
		pageViewsData: [
			{ date: '2025-12-10', views: 50 },
			{ date: '2025-12-11', views: 80 },
			{ date: '2025-12-12', views: 110 },
			{ date: '2025-12-13', views: 90 },
			{ date: '2025-12-14', views: 130 },
		],
		eventsTable: [
			{ event: 'Page View', count: 460 },
			{ event: 'Menu Click', count: 50 },
			{ event: 'Email Subscription', count: 15 },
		],
	},
	site3: {
		trafficData: [
			{ name: 'Desktop', value: 600 },
			{ name: 'Mobile', value: 150 },
			{ name: 'Tablet', value: 20 },
		],
		pageViewsData: [
			{ date: '2025-12-10', views: 250 },
			{ date: '2025-12-11', views: 300 },
			{ date: '2025-12-12', views: 280 },
			{ date: '2025-12-13', views: 350 },
			{ date: '2025-12-14', views: 400 },
		],
		eventsTable: [
			{ event: 'Page View', count: 1580 },
			{ event: 'Add to Cart', count: 210 },
			{ event: 'Purchase Complete', count: 45 },
		],
	},
};

const COLORS = ['#1976d2', '#43a047', '#ffa000'];

const Analytics = () => {
	// 1. State Management
	const [selectedSiteId, setSelectedSiteId] = useState<SiteId>(mockSites[0].id);
	const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(mockAnalyticsData[mockSites[0].id]);
	const [loading, setLoading] = useState(false);

	// 2. Data Fetching (Mocked)
	useEffect(() => {
		setLoading(true);
		// In a real application, you would make an API call here:
		// fetch(`/api/analytics?siteId=${selectedSiteId}`)
		//   .then(res => res.json())
		//   .then(data => {
		//     setAnalyticsData(data);
		//     setLoading(false);
		//   });

		// Mocking the fetch delay
		const siteData = mockAnalyticsData[selectedSiteId as SiteId];
		setTimeout(() => {
			setAnalyticsData(siteData);
			setLoading(false);
		}, 500); // Simulate network latency (500ms)
	}, [selectedSiteId]);

	interface SiteChangeEvent {
		target: {
			value: SiteId;
		};
	}

	const handleSiteChange = (event: SiteChangeEvent) => {
		setSelectedSiteId(event.target.value);
	};

	// Destructure current analytics data
	const { trafficData, pageViewsData, eventsTable } = analyticsData;

	return (
		<Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
			<Container maxWidth='lg'>
				{/* Site Selector and Title */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 4,
						flexWrap: 'wrap',
					}}>
					<Typography
						variant='h3'
						sx={{ fontWeight: 900, mb: { xs: 2, md: 0 } }}>
						Website Analytics (Preview)
					</Typography>

					{/* 3. Site Selector Component */}
					<FormControl sx={{ m: 1, minWidth: 250 }}>
						<InputLabel id='site-select-label'>Select Website</InputLabel>
						<Select
							labelId='site-select-label'
							id='site-select'
							value={selectedSiteId}
							label='Select Website'
							onChange={handleSiteChange}
							size='small'>
							{mockSites.map((site) => (
								<MenuItem
									key={site.id}
									value={site.id}>
									{site.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Typography
					variant='body1'
					sx={{ color: 'text.secondary', mb: 4, maxWidth: 800 }}>
					StatForge Analytics is a first-party, privacy-friendly tracking system. The metrics below are currently displayed for the selected
					site.
				</Typography>

				{/* 4. Conditional Rendering based on Loading State */}
				{loading ? (
					<Box sx={{ p: 8, textAlign: 'center' }}>
						<CircularProgress />
						<Typography
							variant='h6'
							sx={{ mt: 2 }}>
							Loading analytics for {mockSites.find((s) => s.id === selectedSiteId)?.name}...
						</Typography>
					</Box>
				) : (
					<>
						<Grid
							container
							spacing={4}>
							<Grid size={{ xs: 12, md: 4 }}>
								<Card elevation={3}>
									<CardContent>
										<Typography
											variant='h6'
											sx={{ mb: 2 }}>
											Device Breakdown
										</Typography>
										<ResponsiveContainer
											width='100%'
											height={220}>
											<PieChart>
												<Pie
													data={trafficData} // Dynamic data
													dataKey='value'
													nameKey='name'
													cx='50%'
													cy='50%'
													outerRadius={70}
													label>
													{trafficData.map((_, index) => (
														<Cell
															key={`cell-${index}`}
															fill={COLORS[index % COLORS.length]}
														/>
													))}
												</Pie>
												<Legend />
											</PieChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>
							</Grid>
							<Grid size={{ xs: 12, md: 8 }}>
								<Card elevation={3}>
									<CardContent>
										<Typography
											variant='h6'
											sx={{ mb: 2 }}>
											Page Views (Last 5 Days)
										</Typography>
										<ResponsiveContainer
											width='100%'
											height={220}>
											<BarChart data={pageViewsData}>
												{' '}
												{/* Dynamic data */}
												<XAxis dataKey='date' />
												<YAxis allowDecimals={false} />
												<Tooltip />
												<Bar
													dataKey='views'
													fill='#1976d2'
													radius={[4, 4, 0, 0]}
												/>
											</BarChart>
										</ResponsiveContainer>
									</CardContent>
								</Card>
							</Grid>
						</Grid>

						<Divider sx={{ my: 5 }} />

						<Card
							elevation={2}
							sx={{ mt: 4 }}>
							<CardContent>
								<Typography
									variant='h6'
									sx={{ mb: 2 }}>
									Event Summary
								</Typography>
								<TableContainer component={Paper}>
									<Table size='small'>
										<TableHead>
											<TableRow>
												<TableCell>Event</TableCell>
												<TableCell align='right'>Count</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{eventsTable.map(
												(
													row // Dynamic data
												) => (
													<TableRow key={row.event}>
														<TableCell>{row.event}</TableCell>
														<TableCell align='right'>{row.count}</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						</Card>
					</>
				)}
			</Container>
		</Box>
	);
};

export default Analytics;
