import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Jumpman } from "./Jumpman";
import { isWithinBoundaries } from "./Position";

const initialState: Jumpman = {
  x: 0,
  y: 0,
};

const slice = createSlice({
  name: "jumpman",
  initialState,
  reducers: {
    moveJumpman: (state, action: PayloadAction<Jumpman>) => {
      const { x, y } = action.payload;
      const update: Jumpman = {
        x: state.x + x,
        y: state.y + y,
      };
      if (!isWithinBoundaries(update)) return;

      state.x = update.x;
      state.y = update.y;
    },
  },
});
export const { moveJumpman } = slice.actions;
export default slice.reducer;
