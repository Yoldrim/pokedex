import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import FavoritesNavigator from './FavoritesNavigator';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => <EntypoIcon name={'home'} size={20} color={focused ? '#333' : '#999'} />,
          tabBarLabelStyle: { fontFamily: 'Roboto-Regular', fontSize: 10 },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#999',
        }}
      />
      <Tab.Screen
        name={'Favorites'}
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => <AntIcon name={'heart'} size={20} color={focused ? '#333' : '#999'} />,
          tabBarLabelStyle: { fontFamily: 'Roboto-Regular' },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#999',
        }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
