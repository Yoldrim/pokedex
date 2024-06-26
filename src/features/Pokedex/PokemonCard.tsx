import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { cap, getColorFromPokemonType, tdd } from '../../helpers/utils';
import PokemonTypePill from '../../components/PokemonTypePill';
import { PokemonShort } from '../../types';

interface Props {
  pokemon: PokemonShort;
  onPress: () => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, { backgroundColor: getColorFromPokemonType(pokemon.types[0]) }]}
    >
      <View style={styles.topRow}>
        <Text style={styles.nameText}>{cap(pokemon.name)}</Text>
        <Text style={styles.idText}>{tdd(pokemon.id)}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Image
          source={require('../../../assets/pokemongo-white.png')}
          style={{
            position: 'absolute',
            opacity: 0.2,
            height: 175,
            width: 175,
            bottom: -80,
            left: 40,
            resizeMode: 'contain',
          }}
        />
        <View style={styles.typesContainer}>
          <PokemonTypePill type={pokemon.types[0]} />
          {pokemon.types.length > 1 && <PokemonTypePill style={{ marginTop: 4 }} type={pokemon.types[1]} />}
        </View>
        <Image source={{ uri: pokemon.imageUrl }} style={{ height: 72, width: 72 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    margin: 6,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typesContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
  },
  nameText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
  idText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Roboto-Regular',
  },
});

export default React.memo(PokemonCard);
