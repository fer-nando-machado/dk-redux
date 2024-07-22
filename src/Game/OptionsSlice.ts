import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "./Options";

const initialState: Options = {
  paused: false,
  gravity: true,
};

const slice = createSlice({
  name: "OptionsSlice",
  initialState,
  reducers: {
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload;
    },
    togglePaused: (state) => {
      state.paused = !state.paused;
    },
    toggleGravity: (state) => {
      state.gravity = !state.gravity;
    },
  },
});

export const { setPaused, togglePaused, toggleGravity } = slice.actions;
export default slice.reducer;
