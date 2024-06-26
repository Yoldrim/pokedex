import React, { useMemo } from 'react';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';
import { ScrollView, View, StyleSheet, Text, Image } from 'react-native';
import { cap, getTypeIconFromName, sanitizePokemonString, sanitizeString } from '../../helpers/utils';

interface Props {
  pokemon: Pokemon;
  speciesInfo: PokemonSpecies | undefined;
}

const AboutMenu: React.FC<Props> = ({ pokemon, speciesInfo }) => {
  const descriptionText = useMemo(() => {
    const text = speciesInfo?.flavor_text_entries?.find((text) => text.language.name === 'en')?.flavor_text;
    return text ? sanitizePokemonString(text) : '';
  }, [pokemon]);

  if (speciesInfo === undefined) {
    return null;
  }

  // TODO TOMORROW
  // Språket på species, leta efter engelska
  // Fixa texterna. Plocka ner all caps ord osv.
  // loading indikator på pokemonscreen sidan

  return (
    <ScrollView>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{descriptionText}</Text>
      </View>
      <View style={styles.splitInfoContainer}>
        <View style={styles.splitInfoMember}>
          <Text style={styles.splitInfoTitle}>{(pokemon.weight / 10).toFixed(1).toString().replace('.', ',')} kg</Text>
          <Text style={styles.splitInfoSubtitle}>Weight</Text>
        </View>
        <View style={styles.splitInfoDivider} />
        <View style={styles.splitInfoMember}>
          <Text style={styles.splitInfoTitle}>{(pokemon.height * 10).toFixed(1).toString().replace('.', ',')} cm</Text>
          <Text style={styles.splitInfoSubtitle}>Height</Text>
        </View>
      </View>
      <View style={styles.splitInfoContainer}>
        <View style={styles.splitInfoMember}>
          <View style={styles.iconRow}>
            {pokemon.types.map((type) => (
              <Image key={type.type.name} style={styles.typeIcon} source={getTypeIconFromName(type.type.name)} />
            ))}
          </View>
          <Text style={styles.splitInfoSubtitle}>Type</Text>
        </View>
        <View style={styles.splitInfoDivider} />
        <View style={styles.splitInfoMember}>
          <Text style={styles.splitInfoTitle}>{pokemon.abilities.map((x) => cap(x.ability.name)).join(', ')}</Text>
          <Text style={styles.splitInfoSubtitle}>Abilities</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
  },
  infoContainer: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  pillRow: {
    flexDirection: 'row',
  },
  splitInfoContainer: {
    marginVertical: 12,
    backgroundColor: '#dadada',
    borderRadius: 16,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',

    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  splitInfoMember: {
    flex: 1,
    marginVertical: 24,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splitInfoTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  splitInfoSubtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  splitInfoDivider: {
    backgroundColor: '#bbb',
    width: 1,
    height: '80%',
    borderRadius: 2,
  },
  iconRow: {
    flexDirection: 'row',
  },
  typeIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
});

export default AboutMenu;
