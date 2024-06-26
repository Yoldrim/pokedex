import { createStackNavigator } from '@react-navigation/stack';
import PokemonScreen from '../features/Pokemon/PokemonScreen';
import PokedexScreen from '../features/Pokedex/PokedexScreen';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { tdd } from '../helpers/utils';
import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { PokemonShort } from '../types';
import { View, Text } from 'react-native';
import FavoriteButton from '../components/FavoriteButton';

type HomeNavigatorParamList = {
  StackHome: undefined;
  PokemonScreen: { pokemon: PokemonShort };
};

export type HomeNavigatorProps = {
  StackHome: NativeStackScreenProps<HomeNavigatorParamList, 'StackHome'>;
  PokemonScreen: NativeStackScreenProps<HomeNavigatorParamList, 'PokemonScreen'>;
};

const Stack = createStackNavigator<HomeNavigatorParamList>();

const HomeNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'PokemonScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName='StackHome'>
      <Stack.Screen name={'StackHome'} component={PokedexScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={'PokemonScreen'}
        component={PokemonScreen}
        options={({ route }) => ({
          title: tdd(route.params.pokemon.id),
          headerTransparent: true,
          headerBackTitle: ' ',
          headerTintColor: '#fff',
          headerRight: () => <FavoriteButton pokemon={route.params.pokemon} />,
          headerLeftContainerStyle: { paddingLeft: 8 },
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
