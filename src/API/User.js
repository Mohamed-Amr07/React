import axiosInstance from './axios';
const baseUrl = 'http://localhost:5000/api/v1/users'
axiosInstance.defaults.baseURL = baseUrl;

// Modify the baseURL
// axiosInstance.defaults.baseURL = 'https://new-api.example.com';
const getAllUsers = (page = 1, limit = 5) => axiosInstance.get(`${baseUrl}?page=${page}&limit=${limit}`);
const getUserById = (authorId) => axiosInstance.get(`${baseUrl}/${authorId}`);
const addUser = (author) => axiosInstance.post(baseUrl, author);
const deleteUser = (authorId) => axiosInstance.delete(`${baseUrl}/${authorId}`);
const editUser = (authorId, author) => axiosInstance.put(`${baseUrl}/${authorId}`, author);

export const authorAPI = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    editUser,
};