// <<<<<<< hossam
// import axios from "axios";
// const baseUrl = 'http://localhost:2000/api/v1/Authors'
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2YTNiM2U1YjU2ODc4NjlmYTEwYWI3IiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODQ3Mzc1NTcsImV4cCI6MTY4NDc2NjM1N30.olcNZe2DPKRsz4Ki0y7UGPwWb5ypyOZQ270ic5esGIc'
// const axiosInstance = axios.create({
//     baseURL: baseUrl,
//     headers: {
//         'token': `${token}`
//     }
// });
// =======
import axiosInstance from './axios';
const baseUrl = 'http://localhost:5000/api/v1/authors'
axiosInstance.defaults.baseURL = baseUrl;



const getAllAuthors = (page = 1, limit = 5) => axiosInstance.get(`${baseUrl}?page=${page}&limit=${limit}`);
const getAuthorById = (authorId) => axiosInstance.get(`${baseUrl}/${authorId}`);
const addAuthor = (author) => axiosInstance.post(baseUrl, author);
const deleteAuthor = (authorId) => axiosInstance.delete(`${baseUrl}/${authorId}`);
const editAuthor = (authorId, author) => axiosInstance.put(`${baseUrl}/${authorId}`, author);

export const authorAPI = {
    getAllAuthors,
    getAuthorById,
    editAuthor,
    deleteAuthor,
    addAuthor,
};