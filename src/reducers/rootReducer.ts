import { combineReducers } from 'redux';
import { favoritesSlice, FavoritesState } from './favoritesSlice';
import { indexedPokemonsSlice, PokemonIndexState } from './indexedPokemonsSlice';

export interface RootState {
  favorites: FavoritesState;
  pokemonIndex: PokemonIndexState;
}

const rootReducer = combineReducers({
  favorites: favoritesSlice.reducer,
  pokemonIndex: indexedPokemonsSlice.reducer,
});

export default rootReducer;
