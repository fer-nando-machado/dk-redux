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
    const fps = state.options.lowFPS ? 2 : 1;
    const platforms = state.platformFactory.platforms;
    const jumpman = state.jumpman;

    let { x, y } = payload;
    const moved = {
      ...jumpman,
      x: jumpman.x + x * fps,
      y: jumpman.y + y * fps,
    };
    const bounded = checkBoundaries(moved);
    const platformed = checkPlatforms(bounded, platforms);
    const direction = getDirection(x);
    const update: Jumpman = {
      ...platformed,
      ...(direction ? { direction } : {}),
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
    const fps = state.options.lowFPS ? 2 : 1;
    const platforms = state.platformFactory.platforms;
    const jumpman = state.jumpman;

    let { x, y } = payload;
    const moved = {
      ...jumpman,
      x: jumpman.x + x * fps,
      y: jumpman.y + y * fps,
    };
    const bounded = checkBoundaries(moved);
    const platformed = checkPlatforms(bounded, platforms);

    let direction = getDirection(x);
    if (direction !== undefined) {
      const platformedAhead = checkPlatforms(
        { ...platformed, x: platformed.x + x * fps },
        platforms
      );
      if (platformedAhead.isJumping) {
        direction = flipDirection(direction);
      }
    }

    const update: Jumpman = {
      ...platformed,
      ...(direction ? { direction } : {}),
    };
    dispatch(setJumpman(update));
  }
);

export const { setJumpman } = slice.actions;
export default slice.reducer;
