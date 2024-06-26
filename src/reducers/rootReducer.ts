import { combineReducers } from 'redux';
import { favoritesSlice, FavoritesState } from './favoritesSlice';

export interface RootState {
  favorites: FavoritesState;
}

const rootReducer = combineReducers({
  favorites: favoritesSlice.reducer,
});

export default rootReducer;
