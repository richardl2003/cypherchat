import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ChatList, Summary, Profile } from '../components/';
import { useStore } from '../utils/store';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import React = require('react');

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
                  let iconName;
                  if (route.name ==='Chat') {
                      iconName = focused ? 'chat-bubble' : 'chat-bubble-outline' ;
                  } else if (route.name === 'Notifications') {
                      iconName = focused ? 'list' : 'list-outline' ;
                  } else if (route.name === 'Profile') {
                      iconName = focused ? 'person' : 'person-outline' ;
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
              },
          })}>
            <Tab.Screen name="Chat" component={ChatList} />
            <Tab.Screen name="Summary" component={Summary} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    </NavigationContainer>

    );
};

export default UserHomePage;