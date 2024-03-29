import { useState } from "react"
import { Text, TextInput, SafeAreaView, Button, StyleSheet, View } from "react-native"
import api from "../utils/api"
import { useNavigate } from "react-router-native"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { FormProp } from "../models/FormProp"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function Form({ route, method }: FormProp) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handlePress = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        try {
            console.log(`${process.env.EXPO_PUBLIC_API_URL}${route}`) 
            console.log(`Username: ${username}`)
            console.log(`Password: ${password}`)
            const res = await api.post(route, { "username": username, "password": password })
            if (method === "login") {
                try {
                    await AsyncStorage.setItem(ACCESS_TOKEN, res.data.access_token)
                    await AsyncStorage.setItem(REFRESH_TOKEN, res.data.refresh_token)
                } catch (error) {
                    alert(`Something went wrong, Error: ${error}`)
                }
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <TextInput 
                placeholder="Username" 
                defaultValue={username}
                onChangeText={newText => setUsername(newText)}
            />
            <TextInput 
                placeholder="Password"
                defaultValue={password}
                onChangeText={newText => setPassword(newText)}
            />                        
            <Button 
                onPress={handlePress} 
                title="Submit"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
})
