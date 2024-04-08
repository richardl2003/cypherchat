import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { kdc } from '../utils/';
import { ChatList, Notification, Profile, Search, Message, Summary } from '../components/';
import { useStore } from '../utils/store';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

const ChatStack = createNativeStackNavigator()

function ChatStackScreen() {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name="Chat" component={ChatList} />
            <ChatStack.Screen name="Message" component={Message} />
            <ChatStack.Screen name="Summary" component={Summary} />
        </ChatStack.Navigator>
    )

}

const Tab = createBottomTabNavigator();

const UserHomePage = () => {

    const socketConnect = useStore((state) => state.socketConnect)
    const socketClose = useStore((state) => state.socketClose)

    useEffect(() => {
        socketConnect()
        return () => {
            socketClose()
        }
    })

    return (
        <NavigationContainer>
            <Tab.Navigator
                id="tabs"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: any;

                        if (route.name === 'ChatStack') {
                            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                        } else if (route.name === 'Notifications') {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search': 'search-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="ChatStack" component={ChatStackScreen} options={{headerShown: false}} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Notifications" component={Notification} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default UserHomePage;