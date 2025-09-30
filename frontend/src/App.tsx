import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage.tsx';
import Navbar from './components/Navbar.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import { useUserStore } from './stores/useUserStore.ts';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import { useGithubStore } from './stores/useGithubStore.ts';

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
		<>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<LandingPage />}
				/>
				<Route
					path='/signup'
					element={!user ? <Signup /> : <LandingPage />}
				/>
				<Route
					path='/login'
					element={!user ? <Login /> : <LandingPage />}
				/>
				<Route
					path='/dashboard'
					element={user ? <Dashboard /> : <Login />}
				/>
			</Routes>
		</>
	);
}

export default App;
