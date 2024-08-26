import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Ladder, LadderFactory, findClosestLadder } from "./Ladder";
import { generateRandomId } from "./Block";
import { Position } from "./Position";

const initialState: LadderFactory = {
  ladders: [],
};
const slice = createSlice({
  name: "LadderSlice",
  initialState,
  reducers: {
    setLadders: (state, action: PayloadAction<Ladder[]>) => {
      state.ladders = action.payload.map((ladder) => ({
        ...ladder,
        id: generateRandomId(),
      }));
    },
    setTarget: (state, action: PayloadAction<Position>) => {
      const next = findClosestLadder(state.ladders, action.payload);
      state.ladders.forEach((ladder) => {
        ladder.target = ladder.id === next?.id;
      });
    },
    unsetTarget: (state) => {
      state.ladders.forEach((ladder) => {
        ladder.target = false;
      });
    },
  },
});
export const { setLadders, setTarget, unsetTarget } = slice.actions;
export default slice.reducer;
