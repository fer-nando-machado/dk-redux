import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreDispatch, RootState } from "../reduxStore";
import { checkBoundaries, checkPlatforms } from "../Level/Position";
import { getDirection, LEFT } from "../Level/Block";
import { Jumpman } from "./Jumpman";

const initialState: Jumpman = {
  x: 0,
  y: 0,
  isJumping: false,
  direction: LEFT,
};

const slice = createSlice({
  name: "JumpmanSlice",
  initialState,
  reducers: {
    setJumpman: (_, action: PayloadAction<Jumpman>) => {
      return action.payload;
    },
  },
});

export const moveJumpman = createAsyncThunk<
  void,
  Jumpman,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>(
  "JumpmanSlice/moveJumpman",
  async (payload: Jumpman, { getState, dispatch }) => {
    const state: RootState = getState();
    const platforms = state.platformFactory.platforms;
    const jumpman = state.jumpman;

    let { x, y } = payload;
    const moved = {
      ...jumpman,
      x: jumpman.x + x,
      y: jumpman.y + y,
    };
    const bounded = checkBoundaries(moved);
    const plataformed = checkPlatforms(bounded, platforms);
    const direction = getDirection(x);
    const update: Jumpman = {
      ...jumpman,
      ...plataformed,
      ...(direction ? { direction } : {}),
    };
    dispatch(setJumpman(update));
  }
);

export const { setJumpman } = slice.actions;
export default slice.reducer;
