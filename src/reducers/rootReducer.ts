import { combineReducers } from 'redux';
import { favoritesSlice, FavoritesState } from './favoritesSlice';
import { indexedPokemonsSlice, PokemonIndexState } from './indexedPokemonsSlice';
import { highScoreSlice, HighScoreState } from './highscoreSlice';

export interface RootState {
  favorites: FavoritesState;
  pokemonIndex: PokemonIndexState;
  highScore: HighScoreState;
}

const rootReducer = combineReducers({
  favorites: favoritesSlice.reducer,
  pokemonIndex: indexedPokemonsSlice.reducer,
  highScore: highScoreSlice.reducer,
});

export default rootReducer;
