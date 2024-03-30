import { Navigate } from "react-router-native";
import { jwtDecode } from "jwt-decode"
import api from '../utils/api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react"
import kdc from "../utils/kdc"

function ProtectedRoute({ children }: any) {
    const [isAuthorized, setIsAuthorized] = useState(false)

    // When the protected route is loaded, check if the user is authorized
    useEffect(() => {
        auth()
    }, [])

    // check if we need to refresh
    const auth = async () => {

        // TODO: this is a little scuffed
        const token = await kdc.get(ACCESS_TOKEN)
        if (token) {
            console.log(`Token: ${token}`)
            // get expiration date of the token
            const decode = jwtDecode(token)
            const currentTime = Date.now() / 1000

            // if the token is expired, refresh it
            if (decode?.exp && decode.exp < currentTime) {
                await refreshToken()
            }            
        } else {
            setIsAuthorized(false)
            return
        }
    }
    
    const refreshToken = async () => {
        const refreshToken = await kdc.get(REFRESH_TOKEN)
        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            })
            if (response.status === 200) {
                await kdc.set(ACCESS_TOKEN, response.data.access)
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

    console.log(`isAuthorized: ${isAuthorized}`)

    return isAuthorized ? children : <Navigate to="/Home" />
}

export default ProtectedRoute