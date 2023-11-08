import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("userToken") || null
    config.headers.Authorization = `Bearer ${token}`
    return config
})