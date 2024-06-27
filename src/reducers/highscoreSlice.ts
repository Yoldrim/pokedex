import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PokemonShort from '../types/PokemonShort';

// Define a type for the slice state
export interface HighScoreState {
  highScore: number;
}

// Define the initial state using that type
const initialState: HighScoreState = {
  highScore: 0,
};

export const highScoreSlice = createSlice({
  name: 'highScore',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setHighScore: (state, action: PayloadAction<number>) => {
      state.highScore = action.payload;
    },
  },
});

export const { setHighScore } = highScoreSlice.actions;

export default highScoreSlice.reducer;
