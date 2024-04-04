import { Text, View, StyleSheet } from 'react-native';
import Button from './Button'
import { kdc } from '../utils';
import { useNavigate }  from 'react-router-native'
import { useStore } from '../utils/store';

function Profile() {

    const navigate = useNavigate()

    const currentUser = useStore((state) => state.user)
    const setUser = useStore((state) => state.setUser)
    
    function handleLogout() {
        // Reset the user state and clear the token
        kdc.clear()
        setUser({id: 0, username: "", first_name: "", last_name: "", email: ""})
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