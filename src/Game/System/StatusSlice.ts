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
    clearPoints: (state) => {
      state.points = undefined;
    },
    showMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = undefined;
    },
  },
});

export const { addPoints, clearPoints, showMessage, clearMessage } =
  slice.actions;
export default slice.reducer;