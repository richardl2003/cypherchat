import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Chat(props: any) {

    const date = new Date(props.item.created).toLocaleDateString()

    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Text>Hello</Text>
            </View>
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

export default Chat
