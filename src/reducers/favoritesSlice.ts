import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PokemonShort from '../types/PokemonShort';

// Define a type for the slice state
export interface FavoritesState {
  favorites: PokemonShort[];
}

// Define the initial state using that type
const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<PokemonShort>) => {
      if (state.favorites.find((pokemon) => pokemon.id === action.payload.id) === undefined) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<PokemonShort>) => {
      const index = state.favorites.findIndex((item) => item.id === action.payload.id);
      if (index > -1) {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
