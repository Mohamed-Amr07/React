// <<<<<<< hossam
// import axios from "axios";
// const baseUrl = 'http://localhost:2000/api/v1/books'
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2YTNiM2U1YjU2ODc4NjlmYTEwYWI3IiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODQ3Mzc1NTcsImV4cCI6MTY4NDc2NjM1N30.olcNZe2DPKRsz4Ki0y7UGPwWb5ypyOZQ270ic5esGIc'
// const axiosInstance = axios.create({
//     baseURL: baseUrl,
//     headers: {
//         'token': `${token}`
//     }
// });
// =======
import axiosInstance from './axios';
const baseUrl = 'http://localhost:5000/api/v1/books'
axiosInstance.defaults.baseURL = baseUrl;


const getAllBooks = (page = 1, limit = 5, category = "", author = "") =>
    axiosInstance.get(`${baseUrl}?page= ${page}&limit=${limit}&category=${category}&author=${author}`);


const getBookById = (bookId) => axiosInstance.get(`${baseUrl}/${bookId}`);
const addBook = (book) => axiosInstance.post(baseUrl, book);
const deleteBook = (bookId) => axiosInstance.delete(`${baseUrl}/${bookId}`);
const editBook = (bookId, book) => axiosInstance.put(`${baseUrl}/${bookId}`, book);

export const bookAPI = {
    getAllBooks,
    getBookById,
    editBook,
    deleteBook,
    addBook,
};