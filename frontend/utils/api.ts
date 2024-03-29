import axios from "axios"
import { ACCESS_TOKEN } from "../constants"


// This api object with send all our requests with the access token for security
const api = axios.create({
    baseURL: process.env.EXPO_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api