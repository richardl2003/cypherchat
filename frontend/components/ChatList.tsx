import { View, ActivityIndicator, FlatList } from 'react-native';
import { useStore } from '../utils/store';
import Empty from './Empty';
import Chat from './Chat';

function ChatList() {

    // const chatList = useStore((state) => state.chatList)
    const chatList: any = []

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
                <Chat item={item} />
            )}
            keyExtractor={item => item.sender.username}
        />
    </View>
    );
}

export default ChatList