import { Text, View, StyleSheet } from 'react-native';
import Button from './Button'
import { kdc } from '../utils';
import { useNavigate }  from 'react-router-native'
import { useStore } from '../utils/store';

function Profile() {

    const navigate = useNavigate()

    const currentUser = useStore((state) => state.user)
    
    function handleLogout() {
        kdc.clear()
        navigate('/home')
    }

    return (
    <View style={styles.container}>
        <Text>{currentUser.first_name}</Text>
        <Text>{currentUser.last_name}</Text>
        <Text>{currentUser.email}</Text>
        <Text>{currentUser.username}</Text>
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