import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Ladder, LadderFactory } from "./Ladder";
import { generateRandomId } from "./Block";

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
  },
});
export const { setLadders } = slice.actions;
export default slice.reducer;
