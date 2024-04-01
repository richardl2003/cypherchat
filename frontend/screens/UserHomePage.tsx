  import { View, Text } from 'react-native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { NavigationContainer } from '@react-navigation/native';
  import Dummy from './Dummy';

  const Tab = createBottomTabNavigator();


  function ChatScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Chats!</Text>
      </View>
    );
  }

  function ContactScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Contacts!</Text>
      </View>
    );
  }

  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }

  
  const UserHomePage = () => {
  
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Contacts" component={ContactScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>

      );
  };
  
  export default UserHomePage;