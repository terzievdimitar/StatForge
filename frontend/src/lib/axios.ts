import axios from 'axios';

const baseURL = 'https://statforge-ro5u.onrender.com/api';

const axiosInstance = axios.create({
	baseURL: baseURL,
	withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
