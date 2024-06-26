import { PokemonType } from 'pokenode-ts';

interface PokemonShort {
  id: number;
  name: string;
  imageUrl: string;
  types: PokemonType[];
}

export default PokemonShort;
