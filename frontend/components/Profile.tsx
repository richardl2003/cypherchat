import { Text, View, StyleSheet } from 'react-native';
import Button from './Button'
import { kdc } from '../utils';
import { useNavigate }  from 'react-router-native'

function Profile() {

    const navigate = useNavigate()
    
    function handleLogout() {
        kdc.clear()
        navigate('/home')
    }

    return (
    <View style={styles.container}>
        <Button 
            title="Logout"
            onPress={handleLogout}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Profile