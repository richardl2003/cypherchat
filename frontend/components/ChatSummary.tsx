import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '../utils/store'
import { summaryUtils } from '../utils/'

function Summary({ route }: any) {

    const messageList = useStore(state => state.messagesList)
    const recipient = route.params.recipient
    const [conversation, setConversation] = useState('')

    useEffect(() => {
        setConversation(summaryUtils.generateConversation(messageList, recipient))
    }, [])

    return (
        <SafeAreaView>
            <Text>{conversation}</Text>
        </SafeAreaView>
    )
}

export default Summary