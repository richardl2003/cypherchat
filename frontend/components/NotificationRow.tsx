import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useStore } from '../utils/store';

function NotifButton(props: any) {
    const requestAccept = useStore((state) => state.requestAccept)

    return(
        <TouchableOpacity 
            style={styles.button}
            onPress={() => requestAccept(props.item.sender.username)}
        >
            <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
    
    )
}


function NotificationRow(props: any) {

    const date = new Date(props.item.created).toLocaleDateString()

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Text style={styles.firstName}>{`${props.item.sender.first_name} ${props.item.sender.last_name}`}</Text>
                <Text style={styles.username}>{`Requested you on ${date}`}</Text>
            </View>
            <NotifButton item={props.item} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        height: 106
    },
    viewContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    firstName: {
        fontWeight: 'bold',
        color: '#202020',
        marginBottom: 4
    },
    username: {
        color: '#606060'
    },
    icon: {
        marginRight: 10
    },
    button: {
        backgroundColor: '#000000',
        paddingHorizontal: 14,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold'
    }
})

export default NotificationRow
