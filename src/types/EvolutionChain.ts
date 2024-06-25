import { PokemonType } from 'pokenode-ts';

interface EvolutionChain {
  [order: string]: {
    id: number;
    imageUrl: string;
    name: string;
    minLevel: number;
    types: PokemonType[];
  };
}

export default EvolutionChain;
