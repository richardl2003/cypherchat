import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ChatList, Summary, Profile } from '../components/';

const Tab = createBottomTabNavigator();

const UserHomePage = () => {

  return (
      <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name="Chat" component={ChatList} />
              <Tab.Screen name="Summary" component={Summary} />
              <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
      </NavigationContainer>

    );
};

export default UserHomePage;