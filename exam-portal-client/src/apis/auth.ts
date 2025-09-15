import axiosInstance from './axiosIntance';

export async function login(username: string, password: string) {
	const response = await axiosInstance.post('/auth/login', {
		username,
		password,
	});
	return response.data;
}

export async function refreshToken() {
	const response = await axiosInstance.post('/auth/refresh-token', {}, { withCredentials: true });
	return response.data;
}





