import {
  Keyboard, 
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Button, Input } from "../components";
import { api, kdc } from "../utils";
import { useState } from "react";
import { useNavigate } from "react-router-native"


const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleRegister() {
    console.log(`Register, ${username}, ${password}, ${validPassword}`)
    setLoading(true)
    
    // Validate the password
    if (password !== validPassword) {
      setPasswordError('Passwords do not match')
    } else {
      setPasswordError('')
    }

    // Call api to register the user
    try {
      const response = await api.post("/api/user/register/", { username, password })
      console.log(`Response: ${response.data}`)
      navigate("/login")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }


  }
 
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.viewContainer}>
            <Input 
              title="Username" 
              value={username}
              setValue={setUsername}
            />
            <Input 
              title="Password" 
              value={password}
              secureTextEntry={true} 
              setValue={setPassword}
            />
            <Input 
              title="Confirm Password" 
              value={validPassword}
              secureTextEntry={true} 
              setValue={setValidPassword}
            />
            <Button 
              title="Register"
              onPress={handleRegister}
            />
            {passwordError ? 
              <Text style={{color: "red", marginTop: 20}}>{passwordError}</Text>
              : null
            }
            {loading && <ActivityIndicator size="large" color="black" />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default Register;