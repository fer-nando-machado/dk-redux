import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, Points, START_TIME } from "./Status";
import { RootState, StoreDispatch } from "../reduxStore";

const initialState: Status = {
  score: 0,
  time: START_TIME,
};

const slice = createSlice({
  name: "StatusSlice",
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<Points>) => {
      if (state.points !== action.payload) {
        state.points = action.payload;
        state.score += action.payload.value;
      }
    },
    clearPoints: (state) => {
      state.points = undefined;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    showMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = undefined;
    },
    resetScore: () => {
      return initialState;
    },
  },
});

export const tickTime = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("StatusSlice/tickTime", async (_, { getState, dispatch }) => {
  const { status }: RootState = getState();
  if (status.time === 0) {
    window.dispatchEvent(new CustomEvent("level:reset"));
  } else {
    dispatch(slice.actions.setTime(status.time - 1));
  }
});

export const { addPoints, clearPoints, showMessage, clearMessage, resetScore } =
  slice.actions;
export default slice.reducer;
