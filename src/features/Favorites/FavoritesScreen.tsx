import React from 'react';
import { View } from 'react-native';
import PokemonList from '../../components/PokemonList';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';

interface Props {
  navigation: any;
}

const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const pokemons = useSelector((state: RootState) => state.favorites.favorites);

  return (
    <View style={{ flex: 1 }}>
      <PokemonList
        pokemons={pokemons}
        navigation={navigation}
        onPokemonPressed={(pokemon) =>
          navigation.push('FavoritesPokemonScreen', {
            pokemon,
          })
        }
      />
    </View>
  );
};

export default FavoritesScreen;
