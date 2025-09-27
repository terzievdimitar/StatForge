import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage.tsx';
import Navbar from './components/Navbar.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import { useUserStore } from './stores/useUserStore.ts';
import LoadingSpinner from './components/LoadingSpinner.tsx';

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();

	// Check authentication status on app load
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;
	}, [user]);

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
			</Routes>
		</>
	);
}

export default App;
