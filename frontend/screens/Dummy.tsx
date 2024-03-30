import { 
  KeyboardAvoidingView, 
  SafeAreaView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  StyleSheet, 
  View 
} from 'react-native';
import { Button } from '../components';
import { useNavigate } from 'react-router-native';
import { kdc } from '../utils';

const Dummy = () => {

  const navigate = useNavigate()

  function logout() {
    kdc.clear()
    navigate('/home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='height' style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.viewContainer}>
            <Button title='Log Out' onPress={logout} />
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

export default Dummy;