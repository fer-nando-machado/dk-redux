import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Goal } from "./Goal";
import { LEFT } from "./Block";

const initialState: Goal = {
  x: 0,
  y: 0,
  direction: LEFT,
  onAir: false,
};
const slice = createSlice({
  name: "GoalSlice",
  initialState,
  reducers: {
    setGoal: (_, action: PayloadAction<Goal>) => {
      return action.payload;
    },
  },
});
export const { setGoal } = slice.actions;
export default slice.reducer;
