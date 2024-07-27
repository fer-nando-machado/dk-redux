import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "./Options";

const initialState: Options = {
  player: { code: "M" },
  players: {},
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
      state.player = { code };
      if (state.players[code]) return;
      state.players[code] = { code };
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
  togglePaused,
  toggleFilters,
  toggleGravity,
  toggleDebug,
} = slice.actions;
export default slice.reducer;
