import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://chat-backend-xyz.onrender.com/api" ,
    withCredentials:true
})
