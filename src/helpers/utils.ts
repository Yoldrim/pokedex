import colors from './colors';
import { NamedAPIResource, PokemonType } from 'pokenode-ts';
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

export const getIdFromNamedAPIResource = (res: NamedAPIResource) => {
  const splitUrl = res.url.split('/');
  return +splitUrl[splitUrl.length - 2];
};
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const tdd = (n: number) =>
  `#${n.toString().length < 3 ? '0'.repeat(Math.abs(n.toString().length - 3)) : ''}${n}`;
export const sanitizeString = (s: string) => s.split('\n').join(' ').split('\f').join(' ');
export const sanitizePokemonString = (s: string) => {
  const allowedCapsChars = 2;
  let capsCounter = 0;
  s = sanitizeString(s);
  let sSplit = s.split(' ').map((word) => {
    for (let c of word.split('')) {
      if (c === c.toUpperCase()) {
        capsCounter++;
      }

      if (capsCounter > allowedCapsChars) {
        capsCounter = 0;
        return cap(word.toLowerCase());
      }
    }
    capsCounter = 0;
    return word;
  });

  return sSplit.join(' ');
};
export const getPrintableMoveString = (s: string) => {
  return s
    .split('-')
    .map((x) => cap(x))
    .join(' ');
};
