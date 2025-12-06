import axios from 'axios';

const baseURL = import.meta.env.MODE === 'production' ? 'https://statforge-ro5u.onrender.com/api' : 'http://localhost:3000/api';

const axiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
