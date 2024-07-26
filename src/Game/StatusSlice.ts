import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Points, Status } from "./Status";

const initialState: Status = {
  score: 0,
};

const slice = createSlice({
  name: "StatusSlice",
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<Points>) => {
      state.points = action.payload;
      state.score += action.payload.value;
    },
  },
});

export const { addPoints } = slice.actions;
export default slice.reducer;
