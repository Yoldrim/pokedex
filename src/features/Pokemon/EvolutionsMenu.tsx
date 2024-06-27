import React, { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EvolutionChain } from '../../types';
import { cap, tdd } from '../../helpers/utils';
import PokemonTypePill from '../../components/PokemonTypePill';

interface Props {
  evolutionChain: EvolutionChain;
  navigation: any;
}

const EvolutionsMenu: React.FC<Props> = ({ evolutionChain, navigation }) => {
  const chainArray = useMemo(
    () =>
      Object.keys(evolutionChain)
        .map((order) => {
          return { order: +order, chain: evolutionChain[order] };
        })
        .sort((a, b) => (a.order > b.order ? 1 : -1)),
    [evolutionChain],
  );

  return (
    <ScrollView>
      {chainArray.map((item, index) => (
        <View key={item.order} style={index === chainArray.length - 1 ? { marginBottom: 24 } : null}>
          <View style={styles.pokemonRow}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <TouchableOpacity
                style={styles.imageContainer}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.push('PokemonScreen', {
                    pokemon: {
                      id: item.chain.id,
                      name: item.chain.name,
                      imageUrl: item.chain.imageUrl,
                      types: item.chain.types,
                    },
                  });
                }}
              >
                <Image source={{ uri: item.chain.imageUrl }} height={96} width={96} style={{ resizeMode: 'contain' }} />
              </TouchableOpacity>
              {index < chainArray.length - 1 && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <View
                    style={[
                      styles.levelLine,
                      chainArray[index + 1].chain.minLevel !== 0 ? { marginLeft: 24, marginRight: 8 } : {},
                    ]}
                  />
                  {chainArray[index + 1].chain.minLevel !== 0 && (
                    <Text style={styles.levelText}>Level {chainArray[index + 1].chain.minLevel}</Text>
                  )}
                </View>
              )}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.idText}>{tdd(item.chain.id)}</Text>
              <Text style={styles.nameText}>{cap(item.chain.name)}</Text>
              <View style={styles.pillContainer}>
                {item.chain.types.map((type) => (
                  <PokemonTypePill key={type.type.name + item.chain.name} type={type} style={{ marginRight: 4 }} />
                ))}
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pokemonRow: {
    flexDirection: 'row',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 16,
    marginRight: 32,

    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  infoContainer: {
    flex: 1,
  },
  levelLine: {
    marginRight: 32,
    marginVertical: 18,
    height: 60,
    width: 1,
    backgroundColor: '#ccc',
  },
  levelText: {
    fontFamily: 'Roboto-Regular',
    color: '#999',
    fontSize: 13,
  },
  idText: {
    fontFamily: 'Roboto-Regular',
    color: '#999',
    fontSize: 18,
    marginBottom: 12,
  },
  nameText: {
    fontFamily: 'Roboto-Medium',
    color: '#333',
    fontSize: 20,
    marginBottom: 16,
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default EvolutionsMenu;
