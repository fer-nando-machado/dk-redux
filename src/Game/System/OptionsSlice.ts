import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "./Options";
import { Player } from "./PlayerSelect";

const initialState: Options = {
  player: { code: "M" },
  playerSelect: {},
  paused: false,
  gravity: true,
  filters: true,
  debug: false,
};

const slice = createSlice({
  name: "OptionsSlice",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<string>) => {
      const code = action.payload;
      if (!state.playerSelect[code]) {
        state.playerSelect[code] = { code };
      }
      state.player = state.playerSelect[code];
    },
    winPlayer: (state) => {
      const update: Player = {
        ...state.player,
        complete: true,
        highScore: Math.floor(10000 + Math.random() * 90000),
        speedRun: Math.floor(100 + Math.random() * 900),
      };
      state.player = update;
      state.playerSelect[update.code] = update;
    },
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    togglePaused: (state) => {
      state.paused = !state.paused;
    },
    toggleFilters: (state) => {
      state.filters = !state.filters;
    },
    toggleGravity: (state) => {
      state.gravity = !state.gravity;
    },
    toggleDebug: (state) => {
      state.debug = !state.debug;
    },
  },
});

export const {
  setPlayer,
  setPaused,
  winPlayer,
  togglePaused,
  toggleFilters,
  toggleGravity,
  toggleDebug,
} = slice.actions;
export default slice.reducer;
