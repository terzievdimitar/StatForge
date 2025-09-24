import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import Navbar from './components/Navbar.tsx';
import Signup from './pages/Signup.tsx';

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
			</Routes>
		</>
	);
}

export default App;
