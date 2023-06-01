import axiosInstance from './axios';
const baseUrl = 'http://localhost:5000/api/v1/auth'
axiosInstance.defaults.baseURL = baseUrl;

// Modify the baseURL
// axiosInstance.defaults.baseURL = 'https://new-api.example.com';
const register = (user) => axiosInstance.get(`${baseUrl}/register`, user);
const login = (credentials) => axiosInstance.get(`${baseUrl}/login`, credentials);

export const authAPI = {
    register,
    login,
};