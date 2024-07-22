import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "./Game";

const initialState: Game = {
  paused: false,
};
const slice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    togglePaused: (state) => {
      state.paused = !state.paused;
    },
  },
});

export const { setPaused, togglePaused } = slice.actions;
export default slice.reducer;
