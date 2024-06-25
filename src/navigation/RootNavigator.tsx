import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={'Home'} component={HomeNavigator} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
