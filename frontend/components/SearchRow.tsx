import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useStore } from "../utils/store";
import { FontAwesome6 } from '@expo/vector-icons'

type StatusType = {
    text: 'Connect' | 'Accept'| 'Pending'| null
    disabled: boolean
    onPress: () => void
}

function SearchButton(props: any) {
    if (props.user.status === 'connected') {
        return (
            <FontAwesome6 
                name='user-check'
                size={30}
                style={styles.icon}
            />
        )
    }

    const requestConnect = useStore((state) => state.requestConnect)

    const data: StatusType = {text: null, disabled: false, onPress: () => {}}
    switch (props.user.status) {
        case 'not-connected':
            data.text = 'Connect'
            data.disabled = false
            data.onPress = () => {requestConnect(props.user.username)}
            break
        case 'pending-other':
            data.text = 'Pending'
            data.disabled = true
            data.onPress = () => {}
            break
        case 'pending-me':
            data.text = 'Accept'
            data.disabled = false
            data.onPress = () => {}
            break
        default: break
    }

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={data.onPress}
            disabled={data.disabled}
        >
            <Text style={styles.buttonText}>{data.text}</Text>
        </TouchableOpacity>
    )

}

function SearchRow(props: any) {
    return (
        <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Text style={styles.firstName}>{props.user.first_name}</Text>
                <Text style={styles.username}>@{props.user.username}</Text>
            </View>
            <SearchButton user={props.user} />
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

export default SearchRow