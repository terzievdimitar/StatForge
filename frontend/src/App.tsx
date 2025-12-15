import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage.tsx';
import Navbar from './components/Navbar.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import HostingPage from './pages/HostingPage.tsx';
import { useUserStore } from './stores/useUserStore.ts';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import { useGithubStore } from './stores/useGithubStore.ts';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.ts';
import AboutPage from './pages/AboutPage.tsx';
import DashboardOverview from './pages/DashboardOverview.tsx';
import AccountPage from './pages/AccountPage.tsx';
import PricingPage from './pages/PricingPage.tsx';
import ImportRepo from './pages/ImportRepo.tsx';
import Analytics from './pages/Analytics.tsx';
import ContactSalesPage from './pages/ContactSalesPage.tsx';

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getRepositories } = useGithubStore();

	// Check authentication status on app load
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;
		getRepositories();
	}, [getRepositories, user]);

	if (checkingAuth) {
		return <LoadingSpinner />;
	}
	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={!user ? <LandingPage /> : <DashboardOverview />}
				/>
				<Route
					path='/signup'
					element={!user && <Signup />}
				/>
				<Route
					path='/login'
					element={!user && <Login />}
				/>
				<Route
					path='/pricing'
					element={!user && <PricingPage />}
				/>
				<Route
					path='/about'
					element={!user && <AboutPage />}
				/>
				<Route
					path='/contact/sales'
					element={!user && <ContactSalesPage />}
				/>
				{/* Dashboard routes */}
				<Route
					path='/dashboard/overview'
					element={!user ? <Login /> : <DashboardOverview />}
				/>
				<Route
					path='/dashboard/hosting'
					element={!user ? <Login /> : <HostingPage />}
				/>
				<Route
					path='/dashboard/account'
					element={!user ? <Login /> : <AccountPage />}
				/>
				<Route
					path='/dashboard/import'
					element={!user ? <Login /> : <ImportRepo />}
				/>
				<Route
					path='/dashboard/analytics'
					element={!user ? <Login /> : <Analytics />}
				/>
				<Route
					path='/dashboard/development'
					element={!user ? <Login /> : <ContactSalesPage />}
				/>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
