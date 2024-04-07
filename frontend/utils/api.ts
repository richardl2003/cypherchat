import axios from "axios"
import { ACCESS_TOKEN } from "../constants"
import kdc from "./kdc"


// This api object with send all our requests with the access token for security
const api = axios.create({
    baseURL: `https://${process.env.EXPO_PUBLIC_API_URL}`,
})

api.interceptors.request.use(
    async (config) => {
        console.log(`config: ${config.baseURL}`)
        const token = kdc.get(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api