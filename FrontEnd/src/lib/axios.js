import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'developtment' ? "http://localhost:8001/api" : '/',
    withCredentials:true
})
