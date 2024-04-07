import { useLayoutEffect } from 'react';
import { SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import {useStore} from '../utils/store'

function MessageHeader({recipient}: any ) {
    const name = recipient.name
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >

        </View>
    )
}

function MessageScreen({navigation} : any) {


    const messages = useStore((state) => state.messageList)

    if (messages === null) {
        return (
            <ActivityIndicator style={{flex: 1}} />
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions()
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Message</Text>
        </SafeAreaView>
    )
}

export default MessageScreen