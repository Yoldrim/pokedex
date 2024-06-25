import colors from './colors';
import { PokemonType } from 'pokenode-ts';
import { ImageSourcePropType } from 'react-native';

const icons: { [key: string]: ImageSourcePropType } = {
  bug: require('../../assets/pokemonTypes/bug.png'),
  dark: require('../../assets/pokemonTypes/dark.png'),
  dragon: require('../../assets/pokemonTypes/dragon.png'),
  electric: require('../../assets/pokemonTypes/electric.png'),
  fairy: require('../../assets/pokemonTypes/fairy.png'),
  fighting: require('../../assets/pokemonTypes/fighting.png'),
  fire: require('../../assets/pokemonTypes/fire.png'),
  flying: require('../../assets/pokemonTypes/flying.png'),
  ghost: require('../../assets/pokemonTypes/ghost.png'),
  grass: require('../../assets/pokemonTypes/grass.png'),
  ground: require('../../assets/pokemonTypes/ground.png'),
  ice: require('../../assets/pokemonTypes/ice.png'),
  normal: require('../../assets/pokemonTypes/normal.png'),
  poison: require('../../assets/pokemonTypes/poison.png'),
  psychic: require('../../assets/pokemonTypes/psychic.png'),
  rock: require('../../assets/pokemonTypes/rock.png'),
  steel: require('../../assets/pokemonTypes/steel.png'),
  water: require('../../assets/pokemonTypes/water.png'),
};

export const getTypeIconFromName = (name: string) => {
  return icons[name];
};

export const getColorFromPokemonType = (type: PokemonType) => {
  return colors.pokemonTypeColors[type.type.name] || '#fff';
};

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const tdd = (n: number) => `#${'0'.repeat(Math.abs(n.toString().length - 3))}${n}`;
export const sanitizeString = (s: string) => s.split('\n').join(' ').split('\f').join(' ');
