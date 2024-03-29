import { Navigate } from "react-router-native";
import { jwtDecode } from "jwt-decode"
import api from '../utils/api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react"

function ProtectedRoute({ children }: any) {
    const [isAuthorized, setIsAuthorized] = useState(false)

    // When the protected route is loaded, check if the user is authorized
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // check if we need to refresh
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        // get expiration date of the token
        const decode = jwtDecode(token)
        const currentTime = Date.now() / 1000

        // if the token is expired, refresh it
        if (decode?.exp && decode.exp < currentTime) {
            await refreshToken()
        }
    }
    
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            })
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    if (isAuthorized == null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute