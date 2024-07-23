import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Jumpman } from "./Jumpman";
import { checkBoundaries, checkPlatforms, Position } from "./Position";
import { StoreDispatch, RootState } from "./Store";

const initialState: Jumpman = {
  x: 0,
  y: 0,
  direction: "left",
  skin: "M",
};

const slice = createSlice({
  name: "JumpmanSlice",
  initialState,
  reducers: {
    setJumpman: (state, action: PayloadAction<Jumpman>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setSkin: (state, action: PayloadAction<string>) => {
      state.skin = action.payload;
    },
  },
});

export const moveJumpman = createAsyncThunk<
  void,
  Position,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>(
  "JumpmanSlice/moveJumpman",
  async (payload: Position, { getState, dispatch }) => {
    const state: RootState = getState();
    const jumpman = state.jumpman;
    const platforms = state.platformFactory.platforms;

    const { x, y } = payload;
    const boundaries = checkBoundaries({
      x: jumpman.x + x,
      y: jumpman.y + y,
    });
    const touchedPlatform = checkPlatforms(boundaries, platforms);
    const direction = x < 0 ? "left" : x > 0 ? "right" : undefined;
    const update: Jumpman = {
      ...jumpman,
      ...boundaries,
      isJumping: !touchedPlatform,
      ...(direction ? { direction } : {}),
    };

    dispatch(setJumpman(update));
  }
);

export const { setJumpman, setSkin } = slice.actions;
export default slice.reducer;
