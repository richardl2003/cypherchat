import { 
  SafeAreaView, 
  StyleSheet, 
  View,
  ActivityIndicator,
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback
} from 'react-native';
import {
  Title,
  Input,
  Button
} from '../components';
import { useState } from "react"
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from "react-router-native"
import { kdc, api } from "../utils"
import { useStore } from '../utils/store';

const Login = () => {

  const setUser = useStore(state => state.setUser)

  // TODO: Handle error state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin() {
    console.log(`Login, ${username}, ${password}`)
    setLoading(true)

    // Call backend to get the access and refresh token
    try {
      const response = await api.post("/api/token/", { username, password })
      kdc.set(ACCESS_TOKEN, response.data.tokens.access)
      kdc.set(REFRESH_TOKEN, response.data.tokens.refresh)

      // Save user information to data store
      setUser(response.data.user)
      navigate("/")
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
          <Title text="CypherChat" color="black" />

          <Input 
            title="Username" 
            value={username}
            setValue={setUsername}
          />
          <Input 
            title="Password" 
            secureTextEntry={true} 
            value={password}
            setValue={setPassword}
          />
          {loading && <ActivityIndicator size="large" color="black" />}
          <Button title="Login" onPress={handleLogin} />
          <Button title="Register" onPress={() => navigate("/register")} />
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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

export default Login;