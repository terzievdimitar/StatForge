import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<LandingPage />}
				/>
			</Routes>
		</>
	);
}

export default App;
