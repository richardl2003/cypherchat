import { Navigate } from "react-router-native";
import { Text } from "react-native";
import { jwtDecode } from "jwt-decode"
import api from '../utils/api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react"
import { useStore } from "../utils/store"
import kdc from "../utils/kdc"
import "core-js/stable/atob"

function ProtectedRoute({ children }: any) {
    const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null)
    const user = useStore((state) => state.user)

    // When the protected route is loaded, check if the user is authorized
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // check if we need to refresh
    const auth = async () => {
        const token = kdc.get(ACCESS_TOKEN)
        if (!token) {
            console.log("No token")
            setIsAuthorized(false)
            return 
        } 
        // get expiration date of the token
        const decode = jwtDecode(token)
        const currentTime = Date.now() / 1000

        // if the token is expired, refresh it
        if (decode.exp !== undefined && decode.exp < currentTime) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }       
    }
    
    const refreshToken = async () => {
        const refreshToken =  kdc.get(REFRESH_TOKEN)
        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            })
            if (response.status === 200) {
                kdc.set(ACCESS_TOKEN, response.data.access)
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
        return <Text>Loading...</Text>
    }

    return (isAuthorized && user !== null) ? children : <Navigate to="/home" />
}

export default ProtectedRoute