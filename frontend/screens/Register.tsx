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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleRegister() {
    console.log(`Register, ${username}, ${password}, ${firstName},${lastName},${email}`)
    setEmailError('');
    setPasswordError('');
    setLoading(true)
    
    // Validate the password
    if (password !== validPassword) {
        setPasswordError('Passwords do not match');
        setLoading(false);
        return;
      }

    // Call api to register the user
    const payload = {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        email: email,
    };

  // Call api to register the user
  try {
    await api.post("/api/user/register/", payload);
    navigate("/login");
  } catch (error) {
    // Email error
    if (error.response && error.response.data.email) {
      setEmailError(error.response.data.email[0]);
    } else {
      console.error( error);
      }
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
              title="First Name"
              value={firstName}
              setValue={setFirstName} // Assuming your Input component uses setValue
            />
            <Input
              title="Last Name"
              value={lastName}
              setValue={setLastName}
            />
            <Input
              title="Email"
              value={email}
              setValue={setEmail}
            />
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
            {emailError ?
              <Text style={{color: "red", marginTop: 20}}>{emailError}</Text>
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