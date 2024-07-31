import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, Points } from "./Status";

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
    showMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { addPoints, showMessage } = slice.actions;
export default slice.reducer;
