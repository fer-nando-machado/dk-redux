import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Jumpman } from "./Jumpman";
import { assertWithinBoundaries } from "./Position";

const initialState: Jumpman = {
  x: 0,
  y: 0,
};
const slice = createSlice({
  name: "JumpmanSlice",
  initialState,
  reducers: {
    moveJumpman: (state, action: PayloadAction<Jumpman>) => {
      const { x, y } = action.payload;
      const update = assertWithinBoundaries({
        x: state.x + x,
        y: state.y + y,
      });
      state.x = update.x;
      state.y = update.y;
    },
  },
});
export const { moveJumpman } = slice.actions;
export default slice.reducer;
