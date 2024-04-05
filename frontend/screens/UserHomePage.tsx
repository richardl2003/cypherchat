import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ChatList, Notification, Profile, Search } from '../components/';
import { useStore } from '../utils/store';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

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
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: any;

                        if (route.name === 'Chat') {
                            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                        } else if (route.name === 'Notification') {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search': 'search-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Chat" component={ChatList} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Notification" component={Notification} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default UserHomePage;