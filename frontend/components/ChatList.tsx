import { View, ActivityIndicator, FlatList } from 'react-native';
import { useStore } from '../utils/store';
import Empty from './Empty';
import Chat from './Chat';

function ChatList({ navigation }: any) {

    // const chatList = useStore((state) => state.chatList)
    const chatList = useStore((state) => state.conversationList)

    if (chatList === null) {
        return (
            <ActivityIndicator style={{flex: 1}} />
        )
    }

    if (chatList.length === 0) {
        return (
            <Empty 
                name='inbox'
                message='No conversations'
                centered={true}
            />
        )
    }
    
    return (
    <View style={{ flex: 1}}>
        <FlatList 
            data={chatList}
            renderItem={({ item }) => (
                <Chat navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
        />
    </View>
    );
}

export default ChatList