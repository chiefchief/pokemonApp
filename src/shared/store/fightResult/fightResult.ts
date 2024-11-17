import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {FightResultState, GameResult} from './types';

const initialState: FightResultState = {
  fightRecap: {},
};

export const fightResultSlice = createSlice({
  name: 'fightResult',
  initialState,
  reducers: {
    setGameResult: (state, action: PayloadAction<GameResult>) => {
      const {isPlayerWin, opponentPokemon, playerPokemon} = action.payload;
      const isFightExist = state.fightRecap[`${playerPokemon}-${opponentPokemon}`];
      if (isFightExist) {
        state.fightRecap[`${playerPokemon}-${opponentPokemon}`] = {
          you: [...isFightExist.you, Number(isPlayerWin)],
          opponent: [...isFightExist.opponent, Number(!isPlayerWin)],
        };
      } else {
        state.fightRecap[`${playerPokemon}-${opponentPokemon}`] = {
          you: [Number(isPlayerWin)],
          opponent: [Number(!isPlayerWin)],
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {setGameResult} = fightResultSlice.actions;

export default fightResultSlice.reducer;
