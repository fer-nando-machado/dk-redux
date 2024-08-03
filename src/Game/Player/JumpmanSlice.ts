import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreDispatch, RootState } from "../reduxStore";
import {
  checkBoundaries,
  checkLadders,
  checkPlatforms,
  Position,
} from "../Level/Position";
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
    const ladders = state.ladderFactory.ladders;
    const jumpman = state.jumpman;

    let { x, y } = payload;
    const moved = {
      ...jumpman,
      x: jumpman.x + x * fps,
      y: jumpman.y + y * fps,
    };

    const isOnLadder = checkLadders(moved, ladders);
    if (isOnLadder && y < 0) return; //disable gravity on ladders (TODO bring to Jumpman state)

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

export const moveJumpmanClimb = createAsyncThunk<
  void,
  Position,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>(
  "JumpmanSlice/moveJumpmanClimb",
  async (payload: Position, { getState, dispatch }) => {
    const state: RootState = getState();
    const fps = state.options.lowFPS ? 2 : 1;
    const ladders = state.ladderFactory.ladders;
    const jumpman = state.jumpman;

    let { y } = payload;
    const moved = {
      ...jumpman,
      y: jumpman.y + y * fps,
    };

    const isOnLadder = checkLadders(moved, ladders);
    if (isOnLadder === true) {
      const update: Jumpman = {
        ...moved,
      };
      dispatch(setJumpman(update));
    }
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
      const boundedAhead = checkBoundaries({
        ...platformed,
        x: platformed.x + x * fps,
      });
      const platformedAhead = checkPlatforms(
        { ...platformed, x: platformed.x + x * fps },
        platforms
      );
      if (platformedAhead.isJumping || boundedAhead.x === jumpman.x) {
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
