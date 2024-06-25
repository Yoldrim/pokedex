import React, { useMemo } from 'react';
import { Pokemon, PokemonStat } from 'pokenode-ts';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { getColorFromPokemonType } from '../../helpers/utils';

interface StatsRowProps {
  stat: PokemonStat;
  color: string;
}

const getReadableStatName = (stat: PokemonStat) => {
  const statMap: { [key: string]: string } = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };

  return statMap[stat.stat.name] || '';
};

const StatsRow: React.FC<StatsRowProps> = ({ stat, color }) => {
  return (
    <View style={styles.statsRowContainer}>
      <Text style={styles.statNameText}>{getReadableStatName(stat)}</Text>
      <Text style={styles.statNumberText}>{stat.base_stat}</Text>
      <View style={styles.statBarContainer}>
        <Progress.Bar
          color={color}
          borderRadius={25}
          borderColor={'#ccc'}
          progress={stat.base_stat / 200}
          width={null}
          height={12}
        />
      </View>
    </View>
  );
};

interface Props {
  pokemon: Pokemon;
}

const StatsMenu: React.FC<Props> = ({ pokemon }) => {
  const statRowColor = useMemo(() => getColorFromPokemonType(pokemon.types[0]), [pokemon]);

  return (
    <ScrollView>
      {pokemon.stats.map((stat) => (
        <StatsRow key={stat.stat.name} stat={stat} color={statRowColor} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  statsRowContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    width: '100%',
  },
  statNameText: {
    flex: 2,
    textAlign: 'left',
    fontFamily: 'Roboto-Regular',
    color: '#444',
  },
  statNumberText: {
    flex: 1,
    textAlign: 'center',
    marginRight: 8,
    fontFamily: 'Roboto-Medium',
  },
  statBarContainer: {
    flex: 9,
    justifyContent: 'center',
  },
});

export default StatsMenu;
