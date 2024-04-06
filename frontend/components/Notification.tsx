import { View, ActivityIndicator, FlatList } from 'react-native';
import { useStore } from '../utils/store';
import Empty from './Empty';
import NotificationRow from './NotificationRow';

function Notification() {

    const requestList = useStore((state) => state.requestList)

    if (requestList === null) {
        return (
            <ActivityIndicator style={{flex: 1}} />
        )
    }

    if (requestList.length === 0) {
        return (
            <Empty 
                name='bell'
                message='No notifications'
                centered={true}
            />
        )
    }
    
    return (
    <View style={{ flex: 1}}>
        <FlatList 
            data={requestList}
            renderItem={({ item }) => (
                <NotificationRow item={item} />
            )}
            keyExtractor={item => item.sender.username}
        />
    </View>
    );
}

export default Notification