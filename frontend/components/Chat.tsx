import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { formatTime } from '../utils/dateFormatter';
import ProfilePic from '../assets/images/default_avatar.jpg'

function Chat(props: any) {
    const params = props.item

    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Image 
                    source={ProfilePic}
                    style={styles.profile}
                />
                <View style={styles.viewContainer}>
                    <Text style={styles.firstName}>{`${params.employee.first_name} ${params.employee.last_name}`}</Text>
                    <Text style={styles.username}>{params.preview}</Text>
                    <Text style={styles.username}>{formatTime(params.updated)}</Text>
                </View>
            </View>
        </TouchableOpacity>
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
    },
    profile: {
        width: 76, 
        height: 76, 
        borderRadius: 76 / 2,
        backgroundColor: '#e0e0e0'         
    }
})

export default Chat
