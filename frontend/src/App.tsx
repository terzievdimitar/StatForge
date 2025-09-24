import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import Navbar from './components/Navbar.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';

function App() {
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
					element={<Signup />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
			</Routes>
		</>
	);
}

export default App;
