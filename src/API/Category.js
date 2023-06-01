// <<<<<<< hossam
// import axios from "axios";
// const baseUrl = 'http://localhost:2000/api/v1/categories'
// const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2YTNiM2U1YjU2ODc4NjlmYTEwYWI3IiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODQ3Mzc1NTcsImV4cCI6MTY4NDc2NjM1N30.olcNZe2DPKRsz4Ki0y7UGPwWb5ypyOZQ270ic5esGIc'
// const axiosInstance = axios.create({
//     baseURL: baseUrl,
//     headers: {
//         'token': `${token}`
//     }
// });
// =======
import axiosInstance from './axios';
const baseUrl = 'http://localhost:5000/api/v1/categories'
axiosInstance.defaults.baseURL = baseUrl;


const getAllCategories = (page = 1, limit = 5) => axiosInstance.get(`${baseUrl}?page=${page}&limit=${limit}`);
const getCategoryById = (categoryId) => axiosInstance.get(`${baseUrl}/${categoryId}`);
const addCategory = (category) => axiosInstance.post(baseUrl, category);
const deleteCategory = (categoryId) => axiosInstance.delete(`${baseUrl}/${categoryId}`);
const editCategory = (categoryId, category) => axiosInstance.put(`${baseUrl}/${categoryId}`, category);
const getAllCategoriesAndAuthors = () => axiosInstance.get(`${baseUrl}/dropdown`);

export const categoryAPI = {
    getAllCategories,
    getCategoryById,
    editCategory,
    deleteCategory,
    addCategory,
    getAllCategoriesAndAuthors,
};