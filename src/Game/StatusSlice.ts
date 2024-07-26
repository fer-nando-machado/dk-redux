import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "./Status";

const initialState: Status = {
  score: 0,
};

const slice = createSlice({
  name: "StatusSlice",
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
  },
});

export const { addScore } = slice.actions;
export default slice.reducer;
