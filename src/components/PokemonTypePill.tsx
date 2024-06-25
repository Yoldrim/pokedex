import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { cap, getTypeIconFromName } from '../helpers/utils';
import { PokemonType } from 'pokenode-ts';

interface Props {
  type: PokemonType;
  style?: any;
}

const PokemonTypePill: React.FC<Props> = ({ type, style }) => {
  return (
    <View style={[styles.typePill, style ? style : {}]}>
      <Image style={styles.icon} source={getTypeIconFromName(type.type.name)} />
      <Text style={styles.text}>{cap(type.type.name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  typePill: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 48,
    paddingVertical: 2,
    paddingLeft: 2,
    paddingRight: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Roboto-Medium',
  },
});

export default PokemonTypePill;
