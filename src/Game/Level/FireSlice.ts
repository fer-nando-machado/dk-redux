import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkBoundaries,
  checkCollision,
  checkCollisionRound,
  checkPlatforms,
} from "./Position";
import { RootState, StoreDispatch } from "../reduxStore";
import { isDirectionLeft, LEFT } from "./Block";
import { destroyBarrel } from "./BarrelSlice";
import { addPoints } from "../System/StatusSlice";
import { Fire, FireFactory } from "./Fire";

const MAX_FIRES = 2;

const initialState: FireFactory = {
  x: 0,
  y: 0,
  onAir: false,
  direction: LEFT,
  fires: [],
};

const slice = createSlice({
  name: "FireSlice",
  initialState,
  reducers: {
    setFireFactory: (_, action: PayloadAction<FireFactory>) => {
      return action.payload;
    },
    createFire: (state, action: PayloadAction<Fire>) => {
      if (state.fires.length === MAX_FIRES) {
        state.fires.shift();
      }
      state.fires.push(action.payload);
    },
    setFire: (state, action: PayloadAction<Fire>) => {
      const fire = action.payload;
      const index = state.fires.findIndex((f) => f.id === fire.id);
      if (index === -1) return;
      state.fires[index] = fire;
    },
    destroyFire: (state, action: PayloadAction<number>) => {
      state.fires = state.fires.filter((f) => f.id !== action.payload);
    },
  },
});

export const moveFire = createAsyncThunk<
  void,
  Number,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("FireSlice/moveFire", async (payload: Number, { getState, dispatch }) => {
  const state: RootState = getState();
  const debug = state.options.debug;
  const fps = state.options.lowFPS ? 2 : 1;
  const jumpman = state.jumpman;
  const gravity = state.options.gravity;
  const platforms = state.platformFactory.platforms;
  const barrels = state.barrelFactory.barrels;
  const fires = state.fireFactory.fires;

  const index = fires.findIndex((f) => f.id === payload);
  if (index === -1) return;
  const fire = fires[index];

  const isOnJumpman = checkCollisionRound(fire, jumpman);
  if (isOnJumpman && !debug) {
    window.dispatchEvent(new CustomEvent("level:reset"));
    return;
  }

  barrels.forEach((barrel) => {
    if (
      checkCollision(fire, barrel) ||
      checkCollision(state.fireFactory, barrel)
    ) {
      dispatch(destroyBarrel(barrel.id));
      return;
    }
  });

  if (jumpman.onAir) {
    const isUnderJumpman = checkCollision(
      { x: fire.x + 13, y: fire.y + 50 },
      jumpman,
      { x: 1 * fps, y: 50 }
    );
    if (isUnderJumpman) {
      dispatch(addPoints({ position: jumpman, value: 100 }));
    }
  }

  let update = { ...fire };

  const speed = isDirectionLeft(fire.direction) ? -1 : 1;
  update = {
    ...update,
    x: update.x + speed * fps,
  };

  update = { ...update, ...checkBoundaries(update) };
  update = { ...update, ...checkPlatforms(update, platforms) };

  if (update.onAir && gravity) {
    const gravitySpeed = -2 * fps;
    update = { ...update, y: update.y + gravitySpeed };
  }

  dispatch(setFire(update));
});

export const createFire = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: StoreDispatch;
  }
>("FireSlice/createFire", async (_, { getState, dispatch }) => {
  const state: RootState = getState();
  const fire: Fire = {
    ...state.fireFactory,
    id: Date.now(),
  };
  dispatch(slice.actions.createFire(fire));
});

export const { setFireFactory, setFire, destroyFire } = slice.actions;
export default slice.reducer;
