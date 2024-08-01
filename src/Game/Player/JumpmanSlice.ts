import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreDispatch, RootState } from "../reduxStore";
import { checkBoundaries, checkPlatforms, Position } from "../Level/Position";
import { flipDirection, getDirection, LEFT } from "../Level/Block";
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
  Position,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>(
  "JumpmanSlice/moveJumpman",
  async (payload: Position, { getState, dispatch }) => {
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
    const platformed = checkPlatforms(bounded, platforms);
    const directioned = getDirection(x);
    const update: Jumpman = {
      ...platformed,
      ...(directioned ? { direction: directioned } : {}),
    };
    dispatch(setJumpman(update));
  }
);

export const moveJumpmanAuto = createAsyncThunk<
  void,
  Position,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>(
  "JumpmanSlice/moveJumpmanAuto",
  async (payload: Position, { getState, dispatch }) => {
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
    const platformed = checkPlatforms(bounded, platforms);

    let directioned = getDirection(x);
    if (directioned !== undefined) {
      const platformedAhead = checkPlatforms(
        { ...platformed, x: platformed.x + x },
        platforms
      );
      if (platformedAhead.isJumping) {
        directioned = flipDirection(directioned);
      }
    }

    const update: Jumpman = {
      ...platformed,
      ...(directioned ? { direction: directioned } : {}),
    };
    dispatch(setJumpman(update));
  }
);

export const { setJumpman } = slice.actions;
export default slice.reducer;
