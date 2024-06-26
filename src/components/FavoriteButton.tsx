import React from 'react';
import { PokemonShort } from '../types';
import { useDispatch, useSelector } from 'react-redux';

import { addFavorite, removeFavorite } from '../reducers/favoritesSlice';
import { RootState } from '../reducers/rootReducer';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
  pokemon: PokemonShort;
}

const FavoriteButton: React.FC<Props> = ({ pokemon }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => {
    return state.favorites.favorites.find((p) => p.id === pokemon.id) !== undefined;
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => (!isFavorite ? dispatch(addFavorite(pokemon)) : dispatch(removeFavorite(pokemon)))}
    >
      <Icon name={isFavorite ? 'heart' : 'hearto'} size={28} color={isFavorite ? '#e00' : '#fff'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
});

export default FavoriteButton;
