import axios from 'axios';

const baseURL = import.meta.env.MODE !== 'production' ? 'http://localhost:3000/api' : '/api';

const axiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
