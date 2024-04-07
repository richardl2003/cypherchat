import { 
  SafeAreaView, 
  StyleSheet, 
  View,
  ActivityIndicator,
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { useNavigate } from "react-router-native";
import { Button } from '../components';


const LoginError = () => {
  const navigate = useNavigate()
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.viewContainer}>
            <Text style={styles.title}>Invalid Login Attempt</Text>
            <Button title="Try Again" onPress={() => navigate("/login")} />
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

export default LoginError;