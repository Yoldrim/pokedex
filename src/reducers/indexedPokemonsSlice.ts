import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PokemonShort from '../types/PokemonShort';

// Define a type for the slice state
export interface PokemonIndexState {
  pokemons: PokemonShort[];
  maxCount: number;
  currentCount: number;
}

// Define the initial state using that type
const initialState: PokemonIndexState = {
  pokemons: [],
  maxCount: 1000,
  currentCount: 0,
};

export const indexedPokemonsSlice = createSlice({
  name: 'pokemonIndex',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addPokemonToIndex: (state, action: PayloadAction<{ pokemon: PokemonShort; maxCount: number }>) => {
      if (state.pokemons.find((pokemon) => pokemon.id === action.payload.pokemon.id) === undefined) {
        state.pokemons.push(action.payload.pokemon);
        state.currentCount = state.currentCount + 1;
      }
      state.maxCount = action.payload.maxCount;
    },
    addPokemonsToIndex: (state, action: PayloadAction<{ pokemons: PokemonShort[]; maxCount: number }>) => {
      action.payload.pokemons.forEach((pokemon) => {
        if (state.pokemons.find((p) => p.id === pokemon.id) === undefined) {
          state.pokemons.push(pokemon);
          state.currentCount = state.currentCount + 1;
        }
      });
      state.maxCount = action.payload.maxCount;
    },
    sortPokemonIndex: (state) => {
      state.pokemons.sort((a: PokemonShort, b: PokemonShort) => (a.id > b.id ? 1 : -1));
    },
  },
});

export const { addPokemonToIndex, addPokemonsToIndex, sortPokemonIndex } = indexedPokemonsSlice.actions;

export default indexedPokemonsSlice.reducer;
