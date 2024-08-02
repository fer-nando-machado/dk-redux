import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Ladder, LadderFactory } from "./Ladder";

const initialState: LadderFactory = {
  ladders: [],
};
const slice = createSlice({
  name: "LadderSlice",
  initialState,
  reducers: {
    setLadders: (state, action: PayloadAction<Ladder[]>) => {
      state.ladders = action.payload;
    },
  },
});
export const { setLadders } = slice.actions;
export default slice.reducer;
