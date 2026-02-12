import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import FavoritesNavigator from './FavoritesNavigator';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GameScreen from '../features/Game/GameScreen';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FoundationIcon name={'home'} size={24} color={focused ? '#333' : '#999'} />
          ),
          tabBarLabelStyle: { fontFamily: 'Roboto-Regular', fontSize: 10 },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#999',
        }}
      />
      <Tab.Screen
        name={'Game'}
        component={GameScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcon name={'nintendo-game-boy'} size={20} color={focused ? '#333' : '#999'} />
          ),
          tabBarLabelStyle: { fontFamily: 'Roboto-Regular' },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#999',
        }}
      />
      <Tab.Screen
        name={'Favorites'}
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <FontAwesomeIcon name={focused ? 'heart' : 'heart-o'} size={20} color={focused ? '#333' : '#999'} />
          ),
          tabBarLabelStyle: { fontFamily: 'Roboto-Regular' },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#999',
        }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
