import { Text, ActivityIndicator, View, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '../utils/store'
import { summaryUtils } from '../utils/'
import { FontAwesome5 } from '@expo/vector-icons'

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
            <View style={styles.container}>
                <FontAwesome5 name="lightbulb" size={25} color="black" />
                <Text style={styles.title}>Generated by AI. Be sure to check for accuracy.</Text>
            </View>
            <ActivityIndicator animating={loading} size="large" color="black" />
            <Text style={styles.paragraph}>{summary}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    paragraph: {
        fontSize: 15,
        fontWeight: 'normal',
        lineHeight: 25,
        paddingHorizontal: 30
    }
})

export default Summary