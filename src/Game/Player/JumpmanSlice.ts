import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreDispatch, RootState } from "../reduxStore";
import {
  checkBoundaries,
  checkCollision,
  checkLadders,
  checkPlatforms,
  Position,
} from "../Level/Position";
import { flipDirection, getDirection, LEFT } from "../Level/Block";
import { winPlayer } from "../System/RosterSlice";
import { ROSTER } from "../System/Roster";
import { START_TIME } from "../System/Status";
import { Jumpman } from "./Jumpman";

const initialState: Jumpman = {
  x: 0,
  y: 0,
  onAir: false,
  climbingSpeed: 0,
  jumpingSpeed: 0,
  walkingSpeed: 0,
  direction: LEFT,
  invincible: false,
};

const slice = createSlice({
  name: "JumpmanSlice",
  initialState,
  reducers: {
    setJumpman: (_, action: PayloadAction<Jumpman>) => {
      return action.payload;
    },
    setClimbing: (state, action: PayloadAction<number>) => {
      state.climbingSpeed = action.payload;
    },
    setJumping: (state, action: PayloadAction<number>) => {
      state.jumpingSpeed = action.payload;
    },
    setWalking: (state, action: PayloadAction<number>) => {
      state.walkingSpeed = action.payload;
    },
    setInvincible: (state, action: PayloadAction<boolean>) => {
      state.invincible = action.payload;
    },
    toggleDirection: (state) => {
      state.direction = flipDirection(state.direction);
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
    const goal = state.goal;
    const { current } = state.roster;

    const { x, y } = payload;
    const moveX = x < 25 ? x * fps : x;
    const moveY = y < 25 ? y * fps : y;
    let moved = {
      ...jumpman,
      x: jumpman.x + moveX,
      y: jumpman.y + moveY,
    };

    const isOnGoal = checkCollision(moved, goal);
    if (isOnGoal) {
      const { players } = state.roster;
      const { score, time } = state.status;
      const highScore = players[current]?.highScore || 0;
      const speedRun = players[current]?.speedRun || START_TIME;
      const run = START_TIME - time;

      dispatch(
        winPlayer({
          code: current,
          highScore: score > highScore ? score : highScore,
          speedRun: run < speedRun ? run : speedRun,
        })
      );
      moved = {
        ...jumpman,
        x: goal.x + 50,
        y: goal.y,
        direction: LEFT,
        // TODO integrate Position with "W" warp
      };
    }

    const isOnLadder = checkLadders(moved, ladders);
    if (isOnLadder && y < 0) return; //disable gravity on ladders

    const bounded = checkBoundaries(moved);
    const platformed = checkPlatforms(bounded, platforms);

    let direction = getDirection(x);
    if (ROSTER[current]?.touch && direction !== undefined) {
      const boundedAhead = checkBoundaries({
        ...platformed,
        x: platformed.x + x * fps,
      });
      const platformedAhead = checkPlatforms(
        { ...platformed, x: platformed.x + x * fps },
        platforms
      );
      if (platformedAhead.onAir || boundedAhead.x === jumpman.x) {
        direction = flipDirection(direction);
      }
    }

    const update: Jumpman = {
      ...jumpman,
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
    if (isOnLadder !== null) {
      const update: Jumpman = {
        ...moved,
      };
      dispatch(setJumpman(update));
    }
  }
);

export const {
  setJumpman,
  setClimbing,
  setJumping,
  setWalking,
  setInvincible,
  toggleDirection,
} = slice.actions;
export default slice.reducer;
