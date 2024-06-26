import React from 'react';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { tdd } from '../helpers/utils';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { PokemonShort } from '../types';
import PokemonScreen from '../features/Pokemon/PokemonScreen';
import FavoriteButton from '../components/FavoriteButton';
import FavoritesScreen from '../features/Favorites/FavoritesScreen';

type FavoritesNavigatorParamList = {
  StackFavorites: undefined;
  FavoritesPokemonScreen: { pokemon: PokemonShort };
};

export type FavoritesNavigatorProps = {
  StackFavorites: NativeStackScreenProps<FavoritesNavigatorParamList, 'StackFavorites'>;
  FavoritesPokemonScreen: NativeStackScreenProps<FavoritesNavigatorParamList, 'FavoritesPokemonScreen'>;
};

const Stack = createStackNavigator<FavoritesNavigatorProps>();

const FavoritesNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'FavoritesPokemonScreen') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName='StackFavorites'>
      <Stack.Screen name={'StackFavorites'} component={FavoritesScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={'FavoritesPokemonScreen'}
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

export default FavoritesNavigator;
