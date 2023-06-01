import axios from "axios";
const baseURL = 'http://localhost:5000/api/v1'

const token = localStorage.getItem('token') || ''

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'token': `${token}`
    }
});

export default  axiosInstance