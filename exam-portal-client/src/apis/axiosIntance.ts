import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api/', // Change to your backend API base URL if needed
	withCredentials: true, // Send cookies with requests
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;
