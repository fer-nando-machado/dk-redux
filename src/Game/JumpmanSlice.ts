import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Jumpman } from "./Jumpman";
import { checkBoundaries, checkPlatforms } from "./Position";
import { Dispatch, RootState } from "./Store";

const initialState: Jumpman = {
  x: 0,
  y: 0,
  isJumping: false,
  skin: "M",
};

const slice = createSlice({
  name: "JumpmanSlice",
  initialState,
  reducers: {
    setJumpman: (_, action: PayloadAction<Jumpman>) => {
      return action.payload;
    },
    setSkin: (state, action: PayloadAction<string>) => {
      state.skin = action.payload;
    },
  },
});

export const moveJumpman = createAsyncThunk<
  void,
  Jumpman,
  {
    state: RootState;
    dispatch: Dispatch;
  }
>(
  "JumpmanSlice/moveJumpman",
  async (payload: Jumpman, { getState, dispatch }) => {
    const state: RootState = getState();
    const jumpman = state.jumpman;
    const platforms = state.platformFactory.platforms;

    const { x, y } = payload;
    const boundaries = checkBoundaries({
      x: jumpman.x + x,
      y: jumpman.y + y,
    });
    const touchedPlatform = checkPlatforms(boundaries, platforms);
    const update: Jumpman = {
      ...jumpman,
      ...boundaries,
      isJumping: !touchedPlatform,
    };
    dispatch(setJumpman(update));
  }
);

export const { setJumpman, setSkin } = slice.actions;
export default slice.reducer;
