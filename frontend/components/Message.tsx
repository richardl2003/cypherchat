import { useLayoutEffect, useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TextInput, Platform, FlatList, TouchableOpacity, KeyboardAvoidingView, InputAccessoryView } from 'react-native';
import {useStore} from '../utils/store'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane'
import { FontAwesome5 } from '@expo/vector-icons';

function MessageHeader(user: any) {

    const first_name = user.recipient.first_name
    const last_name = user.recipient.last_name
    return (
        <View>
            <Text style={{color: '#202020', marginLeft: 10, fontSize: 18, fontWeight: 'bold'}}>{first_name} {last_name}</Text>
        </View>
    )
}

function MessageBubbleMe({text}: any) {
    return (
        <View style={{flexDirection: 'row', padding: 4, paddingRight: 12}} >
            <View style={{flex: 1}} />
            <View style = {{
                backgroundColor: '#303040',
                borderRadius: 21,
                maxWidth: '75%',
                paddingHorizontal: 16,
                paddingVertical: 12,
                justifyContent: 'center',
                marginRight: 8,
                minHeight: 42
            }}
            >
                <Text style={{color: 'white', fontSize: 16, lineHeight: 18}}>{text}</Text>
            </View>
        </View>
    )
}

function MessageBubbleRecipient({text='', recipient, typing=false}: any) {
    return (
        <View style={{flexDirection: 'row', padding: 4, paddingLeft: 16}} >
            <View style={{
                backgroundColor: '#d0d2db',
                borderRadius: 21,
                maxWidth: '75%',
                paddingHorizontal: 16,
                paddingVertical: 12,
                justifyContent: 'center',
                marginLeft: 8,
                minHeight: 42
            }}
            >
                {typing ? (
                    <View style={{flexDirection: 'row'}}>
                        <Text>typing</Text>
                    </View>    
                ) : (
                    <Text style ={{color: '#202020', fontSize: 16, lineHeight: 18}}>{text}</Text>
                )}
            </View>
            <View style={{flex: 1}}/>
        </View>
    )
}

function MessageBubble({index, message, recipient}: any) {

    const [showTyping, setShowTyping] = useState(false)

    const messagesTyping = useStore((state) => state.messagesTyping)

    useEffect(() => {
        if (index !== 0) return
        if (messagesTyping === null) {
            setShowTyping(false)
            return
        }
        setShowTyping(true)
        const check = setInterval(() => {
            const now = new Date()
            const ms = now.getTime() - messagesTyping.getTime()
            if (ms > 10000) {
                setShowTyping(false)
            }
        }, 1000)
        return () => clearInterval(check)
    }, [messagesTyping])

    if (index === 0) {
        if (showTyping) {
            return <MessageBubbleRecipient recipient={recipient} typing={true} />
        }
        return
    }

    return message.is_me ? (
        <MessageBubbleMe text={message.message} />
    ) : (
        <MessageBubbleRecipient text={message.message} recipient={recipient} />
    )
}

function MessageInput({message, setMessage, onSend}: any) {
    return (
        <View style={{
            paddingHorizontal: 10,
			paddingBottom: 10,
			flexDirection: 'row',
			alignItems: 'center'
        }}
        >
            <TextInput 
                placeholder="Message..."
                placeholderTextColor='#909090'
                value={message}
                onChangeText={setMessage}
                style={{
                    flex: 1,
					paddingHorizontal: 18,
					borderWidth: 1,
					borderRadius: 30,
					borderColor: '#d0d0d0',
					backgroundColor: 'white',
					height: 50
                }}
            />
            <TouchableOpacity onPress={onSend}>
                <FontAwesomeIcon 
                    icon={faPaperPlane}
                    size={22}
                    color='#303040'
                    style={{
                        marginHorizontal: 12
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

function MessageScreen({ navigation, route } : any) {

    useEffect(() => {
        navigation.getParent('tabs').setOptions({ tabBarStyle: { display: 'none'}})
        
        return () => {
            navigation.getParent('tabs').setOptions({ tabBarStyle: { display: {} }})
        }
    }, [])

    const item = route.params.item

    const [message, setMessage] = useState('')

    var messagesList = useStore((state) => state.messagesList)
    if (messagesList === null) {
        messagesList = []
    }
    const messagesNext = useStore((state) => state.messagesNext)

    const messageList = useStore((state) => state.messageList)
    const messageSend = useStore((state) => state.messageSend)
    const messageType = useStore((state) => state.messageType)

    const connectionId = item.id
    const recipient = item.employee

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                    <MessageHeader recipient={recipient} />
            ),
            headerRight: () => (
                <FontAwesome5 
                    name='brain'
                    size={24}
                    onPress={() => navigation.navigate('Summary')}
                />
            ),
            headerBackTitle: 'Back'
        })
    }, [])

    useEffect(() => {
        console.log("getting messages")
        messageList(connectionId)
    }, [])

    function onSend() {
        const cleaned = message.replace(/\s+/g, ' ').trim()
        if (cleaned.length === 0) return
        console.log(cleaned)
        messageSend(connectionId, cleaned)
        setMessage('')
    }

    function onType(value: any) {
        setMessage(value)
        messageType(recipient.username)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{flex: 1, marginBottom: Platform.OS === 'ios' ? 60 : 0}}>
                <FlatList 
                    automaticallyAdjustKeyboardInsets={true}
                    data={[{id: -1}, ...messagesList]}
                    inverted={true}
                    keyExtractor={item => item.id}
                    onEndReached={() => {
                        if (messagesNext) {
                            messageList(connectionId, messagesNext)
                        }
                    }}
                    renderItem={({item, index}: any) => (
                        <MessageBubble index={index} message={item} recipient={recipient} />
                    )}
                />                                                        
            </View>         
            {Platform.OS === 'ios' ? (
                    <InputAccessoryView>
                        <MessageInput message={message} setMessage={onType} onSend={onSend} />
                    </InputAccessoryView>
                ) : (
                    <MessageInput message={message} setMessage={onType} onSend={onSend} />
            )}                                                         
        </SafeAreaView>
    )
}

export default MessageScreen