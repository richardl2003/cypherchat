import { View, Text, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '../utils/store'
import { summaryUtils, openaiUtils } from '../utils/'

function Summary({ route }: any) {

    const messageList = useStore(state => state.messagesList)
    const recipient = route.params.recipient
    const summary = useStore((state) => state.summary)
    const getSummary = useStore((state) => state.getSummary)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const query = summaryUtils.generateConversation(messageList, recipient)
        getSummary(query)
        setLoading(false)
    }, [])

    return (
        <SafeAreaView>
            <ActivityIndicator animating={loading} size="large" color="black" />
            <Text>{summary}</Text>
        </SafeAreaView>
    )
}

export default Summary